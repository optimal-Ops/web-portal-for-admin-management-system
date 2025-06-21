import pool from '../config/db.js';

const createApplicant = async ({ positionId, name, email, contactNumber, resume }) => {
  const query = `
    INSERT INTO JobApplicant (PositionID, Name, Email, ContactNumber, Resume)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [positionId, name, email, contactNumber, resume];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllApplicants = async () => {
  const query = `SELECT * FROM JobApplicant`;
  const { rows } = await pool.query(query);
  return rows;
};

export default { createApplicant, getAllApplicants };
