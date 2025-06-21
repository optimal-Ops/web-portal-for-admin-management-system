
import express from 'express';
import {
  createProject,
  getAllProjects,
  updateProject,   
  deleteProject    
} from '../controller/projectController.js';
import inputValidator from '../middleware/inputValidator.js';
import Joi from 'joi';

const router = express.Router();

const projectSchema = Joi.object({
  projectName: Joi.string().max(100).required(),
  managedBy: Joi.number().optional(),
  startDate: Joi.date().optional()
});

router.post('/', inputValidator(projectSchema), createProject);
router.get('/', getAllProjects);
router.put('/:id', updateProject);     
router.delete('/:id', deleteProject);  
export default router;
