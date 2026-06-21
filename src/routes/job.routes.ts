import { Router } from 'express';
import { authenticateJWT, requireRole } from '../middleware/auth';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from '../controllers/job.controller';

const router = Router();

/**
 * @route   GET /api/jobs
 * @desc    Get all open jobs with pagination, language-aware search, and skill filtering
 * @access  Public
 */
router.get('/', getJobs);

/**
 * @route   GET /api/jobs/:id
 * @desc    Get detailed specifications for a specific job (including client ratings)
 * @access  Public
 */
router.get('/:id', getJobById);

/**
 * @route   POST /api/jobs
 * @desc    Create a new bilingual job posting on the platform
 * @access  Private (Clients only)
 */
router.post('/', authenticateJWT, requireRole('client'), createJob);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update/edit billing, description, title, or status of owned open job
 * @access  Private (Clients only)
 */
router.put('/:id', authenticateJWT, requireRole('client'), updateJob);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Permanently delete or cancel a job posting
 * @access  Private (Clients only)
 */
router.delete('/:id', authenticateJWT, requireRole('client'), deleteJob);

export default router;
