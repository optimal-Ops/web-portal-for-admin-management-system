import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const login = async (username, password) => {
  const result = await pool.query(
    `SELECT a.AdminID, a.Username, a.Password, e.EmployeeName, e.Email
     FROM Admin a
     JOIN Employee e ON a.AdminID = e.EmployeeID
     WHERE a.Username = $1`,
    [username]
  );

  const user = result.rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
   
    delete user.password;
    return user;
  }
  return null;
};

export default { login };
