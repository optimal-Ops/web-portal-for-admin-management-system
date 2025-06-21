import express from 'express';
import employeeController from '../controller/employeeController.js';
import inputValidator from '../middleware/inputValidator.js';
import Joi from 'joi';
import { authenticateAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.use(authenticateAdmin);

const employeeSchema = Joi.object({
  positionid:     Joi.number().required(),
  employeename:   Joi.string().max(100).required(),
  contactnumber:  Joi.string().max(15).optional(),
  email:          Joi.string().email().optional()
});

router.post('/', inputValidator(employeeSchema), employeeController.create);

router.get('/', employeeController.getAll);

router.put('/:id', inputValidator(employeeSchema), employeeController.update);
router.delete('/:id', employeeController.remove);


export default router;
