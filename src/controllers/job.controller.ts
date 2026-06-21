import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { getSupabase } from '../lib/supabaseClient';

/**
 * Validates the core bilingual job properties.
 */
function validateBilingualJobInput(body: any): string | null {
  const {
    title_en,
    title_om,
    description_en,
    description_om,
    category,
    budget,
    budget_type,
    estimated_duration,
    experience_level,
  } = body;

  if (!title_en || typeof title_en !== 'string' || title_en.trim().length < 5) {
    return 'English Title is required and must be at least 5 characters.';
  }
  if (!title_om || typeof title_om !== 'string' || title_om.trim().length < 5) {
    return 'Afaan Oromo Title is required and must be at least 5 characters.';
  }
  if (!description_en || typeof description_en !== 'string' || description_en.trim().length < 20) {
    return 'English Description is required and must be at least 20 characters.';
  }
  if (!description_om || typeof description_om !== 'string' || description_om.trim().length < 20) {
    return 'Afaan Oromo Description is required and must be at least 20 characters.';
  }
  if (!category || typeof category !== 'string') {
    return 'Category is required.';
  }
  if (budget === undefined || isNaN(Number(budget)) || Number(budget) <= 0) {
    return 'Budget must be a valid positive number.';
  }
  if (!['fixed', 'hourly'].includes(budget_type)) {
    return 'Budget type must be either "fixed" or "hourly".';
  }
  if (!estimated_duration || typeof estimated_duration !== 'string') {
    return 'Estimated duration description is required.';
  }
  if (!['entry', 'intermediate', 'expert'].includes(experience_level)) {
    return 'Experience level must be "entry", "intermediate", or "expert".';
  }

  return null;
}

/**
 * Creates a new job posting (Client-only action).
 */
export async function createJob(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user || req.user.role !== 'client') {
      res.status(403).json({ error: 'Forbidden', message: 'Only clients are authorized to create job postings.' });
      return;
    }

    const validationMessage = validateBilingualJobInput(req.body);
    if (validationMessage) {
      res.status(400).json({ error: 'Bad Request', message: validationMessage });
      return;
    }

    const {
      title_en,
      title_om,
      description_en,
      description_om,
      category,
      skills_required,
      budget,
      budget_type,
      estimated_duration,
      experience_level,
    } = req.body;

    const supabase = getSupabase();
    
    const { data: job, error } = await supabase
      .from('jobs')
      .insert({
        client_id: req.user.id,
        title_en: title_en.trim(),
        title_om: title_om.trim(),
        description_en: description_en.trim(),
        description_om: description_om.trim(),
        category,
        skills_required: Array.isArray(skills_required) ? skills_required : [],
        budget: Number(budget),
        budget_type,
        estimated_duration,
        experience_level,
        status: 'open',
      })
      .select()
      .single();

    if (error) {
      res.status(500).json({ error: 'Database Error', message: 'Could not create job posting.', details: error.message });
      return;
    }

    res.status(201).json({
      message: 'Job posting created successfully.',
      job,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: 'Server Error', message: 'An internal error occurred.', details: err.message });
  }
}

/**
 * Retrieves list of active jobs with pagination and robust search filters.
 */
export async function getJobs(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const {
      category,
      search,
      budget_type,
      experience_level,
      min_budget,
      max_budget,
      page = 1,
      limit = 10,
    } = req.query;

    const supabase = getSupabase();
    let query = supabase.from('jobs').select('*, profiles(full_name, avatar_url, rating)', { count: 'exact' });

    // Filter only open jobs by default
    query = query.eq('status', 'open');

    // Category Filter
    if (category && typeof category === 'string' && category.trim() !== '') {
      query = query.eq('category', category);
    }

    // Budget Type Filter
    if (budget_type && ['fixed', 'hourly'].includes(budget_type as string)) {
      query = query.eq('budget_type', budget_type);
    }

    // Experience Level Filter
    if (experience_level && ['entry', 'intermediate', 'expert'].includes(experience_level as string)) {
      query = query.eq('experience_level', experience_level);
    }

    // Budget range filters
    if (min_budget && !isNaN(Number(min_budget))) {
      query = query.gte('budget', Number(min_budget));
    }
    if (max_budget && !isNaN(Number(max_budget))) {
      query = query.lte('budget', Number(max_budget));
    }

    // Smart bilingual search filter (Matches English or Afaan Oromo elements)
    if (search && typeof search === 'string' && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      query = query.or(
        `title_en.ilike.${searchTerm},title_om.ilike.${searchTerm},description_en.ilike.${searchTerm},description_om.ilike.${searchTerm}`
      );
    }

    // Pagination offset & limit calculation
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const offset = (pageNum - 1) * limitNum;

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limitNum - 1);

    const { data: jobs, error, count } = await query;

    if (error) {
      res.status(500).json({ error: 'Database Error', message: 'Could not fetch job listings.', details: error.message });
      return;
    }

    res.status(200).json({
      jobs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalJobs: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: 'Server Error', message: 'An internal error occurred.', details: err.message });
  }
}

/**
 * Retrieves details for a specific job posting.
 */
export async function getJobById(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const supabase = getSupabase();

    const { data: job, error } = await supabase
      .from('jobs')
      .select('*, profiles(full_name, avatar_url, bio_en, bio_om, rating)')
      .eq('id', id)
      .single();

    if (error || !job) {
      res.status(404).json({ error: 'Not Found', message: 'Job posting not found.' });
      return;
    }

    res.status(200).json({ job });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: 'Server Error', message: 'An internal error occurred.', details: err.message });
  }
}

/**
 * Updates an existing job posting (Client-only, owner verification).
 */
export async function updateJob(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    
    if (!req.user || req.user.role !== 'client') {
      res.status(403).json({ error: 'Forbidden', message: 'Only clients are authorized to update job postings.' });
      return;
    }

    const validationMessage = validateBilingualJobInput(req.body);
    if (validationMessage) {
      res.status(400).json({ error: 'Bad Request', message: validationMessage });
      return;
    }

    const supabase = getSupabase();

    // Verify ownership first
    const { data: existingJob, error: viewError } = await supabase
      .from('jobs')
      .select('client_id, status')
      .eq('id', id)
      .single();

    if (viewError || !existingJob) {
      res.status(404).json({ error: 'Not Found', message: 'Job posting not found.' });
      return;
    }

    if (existingJob.client_id !== req.user.id) {
      res.status(403).json({ error: 'Forbidden', message: 'RBAC Policy: You do not own this job posting.' });
      return;
    }

    if (existingJob.status !== 'open') {
      res.status(400).json({ error: 'Bad Request', message: 'Jobs in progress or closed cannot be updated.' });
      return;
    }

    const {
      title_en,
      title_om,
      description_en,
      description_om,
      category,
      skills_required,
      budget,
      budget_type,
      estimated_duration,
      experience_level,
      status, // Client might also want to change status to completed / cancelled
    } = req.body;

    const { data: updatedJob, error: updateError } = await supabase
      .from('jobs')
      .update({
        title_en: title_en.trim(),
        title_om: title_om.trim(),
        description_en: description_en.trim(),
        description_om: description_om.trim(),
        category,
        skills_required: Array.isArray(skills_required) ? skills_required : [],
        budget: Number(budget),
        budget_type,
        estimated_duration,
        experience_level,
        status: status || 'open',
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      res.status(500).json({ error: 'Database Error', message: 'Could not update job posting.', details: updateError.message });
      return;
    }

    res.status(200).json({
      message: 'Job posting updated successfully.',
      job: updatedJob,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: 'Server Error', message: 'An internal error occurred.', details: err.message });
  }
}

/**
 * Cancels or deletes a job posting (Client-only, owner verification).
 */
export async function deleteJob(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== 'client') {
      res.status(403).json({ error: 'Forbidden', message: 'Only clients are authorized to delete job postings.' });
      return;
    }

    const supabase = getSupabase();

    // Verify ownership
    const { data: existingJob, error: viewError } = await supabase
      .from('jobs')
      .select('client_id, status')
      .eq('id', id)
      .single();

    if (viewError || !existingJob) {
      res.status(404).json({ error: 'Not Found', message: 'Job posting not found.' });
      return;
    }

    if (existingJob.client_id !== req.user.id) {
      res.status(403).json({ error: 'Forbidden', message: 'RBAC Policy: You do not own this job posting.' });
      return;
    }

    // Proceeding to delete from Supabase
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (deleteError) {
      res.status(500).json({ error: 'Database Error', message: 'Could not delete job posting.', details: deleteError.message });
      return;
    }

    res.status(200).json({
      message: 'Job posting deleted successfully from the platform.',
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: 'Server Error', message: 'An internal error occurred.', details: err.message });
  }
}
