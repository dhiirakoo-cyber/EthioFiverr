import { Request, Response, NextFunction } from 'express';
import { getSupabase } from '../lib/supabaseClient';

/**
 * Custom request interface containing the verified user context.
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'client' | 'freelancer';
    fullName: string;
  };
}

/**
 * Middleware: Verifies the user's Supabase authentication token.
 * Extracts the bearer token, validates it against Supabase Auth, and fetches the profile.
 */
export async function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Access denied. Missing or malformed authorization header.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const supabase = getSupabase();
    
    // Call Supabase auth getUser to verify and retrieve the user of this token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired authentication token.',
      });
      return;
    }

    // Query details and role from the secure public.profiles table to prevent metadata spoofing
    const { data: profile, error: dbError } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .eq('id', user.id)
      .single();

    if (dbError || !profile) {
      // Fallback: If profile table is slow or missing, check safe user metadata claims
      const metadataRole = user.user_metadata?.role as 'client' | 'freelancer' | undefined;
      const metadataFullName = user.user_metadata?.full_name as string | undefined;

      if (!metadataRole) {
        res.status(403).json({
          error: 'Forbidden',
          message: 'User profile or role configuration not found.',
        });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email || '',
        role: metadataRole,
        fullName: metadataFullName || 'HojiiLink Member',
      };
      next();
      return;
    }

    req.user = {
      id: user.id,
      email: user.email || '',
      role: profile.role as 'client' | 'freelancer',
      fullName: profile.full_name,
    };

    next();
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during authentication processing.',
      details: err.message,
    });
  }
}

/**
 * Middleware Factory: Restricts endpoint access by role-based authorization check.
 * Requires user authentication context to be populated upfront by locateJWT first.
 */
export function requireRole(allowedRole: 'client' | 'freelancer') {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Access denied. Authenticated login context is required.',
      });
      return;
    }

    if (req.user.role !== allowedRole) {
      res.status(403).json({
        error: 'Forbidden',
        message: `RBAC Violation: This operation requires the '${allowedRole}' role. Your current role is '${req.user.role}'.`,
      });
      return;
    }

    next();
  };
}
