// src/routes/positionRoutes.js
import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT PositionID AS positionid, PositionName AS positionname FROM Position');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
