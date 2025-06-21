
import pool from '../config/db.js';

const createProject = async ({ projectName, managedBy, startDate }) => {
  const query = `
    INSERT INTO Project (ProjectName, ManagedBy, StartDate)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [projectName, managedBy, startDate];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllProjects = async () => {
  const query = `SELECT ProjectID AS id, ProjectName AS projectName, ManagedBy AS managedBy, StartDate AS startDate FROM Project`;
  const { rows } = await pool.query(query);
  return rows;
};

const updateProject = async (id, { projectName, managedBy, startDate }) => {
  const query = `
    UPDATE Project
    SET ProjectName = $1, ManagedBy = $2, StartDate = $3
    WHERE ProjectID = $4
    RETURNING *
  `;
  const values = [projectName, managedBy, startDate, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteProject = async (id) => {
  const query = `DELETE FROM Project WHERE ProjectID = $1`;
  await pool.query(query, [id]);
};


export default { createProject, getAllProjects , updateProject, deleteProject };
