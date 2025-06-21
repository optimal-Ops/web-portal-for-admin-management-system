import express from 'express';
import jobController from '../controller/jobController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', jobController.createJobApplicant);

router.get('/', authenticateAdmin, jobController.getAllApplicants);

export default router;
