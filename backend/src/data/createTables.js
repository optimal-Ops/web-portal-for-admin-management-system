import pool from "../config/db.js";
 
const createTables = async () => {
  try {
   
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Position (
        PositionID SERIAL PRIMARY KEY,
        PositionName VARCHAR(100) NOT NULL
      );
    `);
    console.log("Position table created.");
 
   
    await pool.query(`
      CREATE TABLE IF NOT EXISTS JobApplicant (
        JobID SERIAL PRIMARY KEY,
        PositionID INT NOT NULL,
        Name VARCHAR(100) NOT NULL,
        Email VARCHAR(100),
        ContactNumber VARCHAR(15),
        Resume TEXT,
        FOREIGN KEY (PositionID) REFERENCES Position(PositionID) ON DELETE CASCADE
      );
    `);
    console.log("JobApplicant table created.");
 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Employee (
  EmployeeID SERIAL PRIMARY KEY,
  PositionID INT REFERENCES Position(PositionID),
  EmployeeName VARCHAR(100),
  ContactNumber VARCHAR(15),
  Email VARCHAR(100)
);

    `);
    console.log("Employee table created.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Admin (
        AdminID INT PRIMARY KEY,
        Username VARCHAR(50) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        FOREIGN KEY (AdminID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE
      );
    `);
    console.log("Admin table created.");
 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Project (
        ProjectID SERIAL PRIMARY KEY,
        ProjectName VARCHAR(100) NOT NULL,
        ManagedBy INT,
        StartDate DATE,
        FOREIGN KEY (ManagedBy) REFERENCES Employee(EmployeeID) ON DELETE SET NULL
      );
    `);
    console.log("Project table created.");
 
   
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Work (
        EmployeeID INT,
        ProjectID INT,
        PRIMARY KEY (EmployeeID, ProjectID),
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE,
        FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID) ON DELETE CASCADE
      );
    `);
    console.log("Work table created.");
 
    console.log("All tables created successfully.");
 
  } catch (err) {
    console.error(" Error creating tables:", err);
  }
};
 
export default createTables;
 
 