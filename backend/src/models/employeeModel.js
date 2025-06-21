
import pool from '../config/db.js';

export async function createEmployee({ positionid, employeename, contactnumber, email }) {
  const query = `
    INSERT INTO Employee
      (PositionID, EmployeeName, ContactNumber, Email)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;
  const values = [positionid, employeename, contactnumber, email];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getAllEmployees() {
  const query = `
    SELECT
      e.EmployeeID    AS employeeid,
      e.PositionID    AS positionid,
      p.PositionName  AS positionname,
      e.EmployeeName  AS employeename,
      e.ContactNumber AS contactnumber,
      e.Email         AS email
    FROM Employee e
    LEFT JOIN Position p
      ON e.PositionID = p.PositionID
    ORDER BY e.EmployeeID;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

const updateEmployee = async (id, { positionid, employeename, contactnumber, email }) => {
  const result = await pool.query(
    `UPDATE Employee
     SET positionid = $1,
         employeename = $2,
         contactnumber = $3,
         email         = $4
     WHERE employeeid = $5
     RETURNING *`,
    [positionid, employeename, contactnumber, email, id]
  );
  return result.rows[0];
};

const deleteEmployee = async (id) => {
  await pool.query(
    `DELETE FROM Employee WHERE employeeid = $1`,
    [id]
  );
};

export default {
  createEmployee,
  getAllEmployees
  , updateEmployee, deleteEmployee
};





















// const createProject = async ({ projectName, managedBy, startDate }) => {
//   const query = `
//     INSERT INTO Project (ProjectName, ManagedBy, StartDate)
//     VALUES ($1, $2, $3)
//     RETURNING *
//   `;
//   const values = [projectName, managedBy, startDate];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// };

// const getAllProjects = async () => {
//   const query = `SELECT * FROM Project`;
//   const { rows } = await pool.query(query);
//   return rows;
// };

// export default { createProject, getAllProjects };
