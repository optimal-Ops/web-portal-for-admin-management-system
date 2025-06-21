import pool from '../config/db.js'; // Add this line
import express from 'express';
import loginController from '../controller/loginController.js';
import inputValidator from '../middleware/inputValidator.js';
import Joi from 'joi';

const router = express.Router();

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});


router.post('/login', loginController.login);

 router.get('/all', async (req, res) => {
   const result = await pool.query('SELECT * FROM Admin');
   res.json(result.rows);
 });
export default router;
