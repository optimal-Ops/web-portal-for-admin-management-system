import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import createTables from "./data/createTables.js";
import bcrypt from 'bcrypt'; 
import loginRoutes from "./routes/loginRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import positionRoutes from "./routes/positionRoutes.js"; 
import errorHandler from "./middleware/errorHandler.js";


dotenv.config();


const app = express();
const PORT =  3001;
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})); 
const insertInitialData = async () => {
  try {
    const { rows } = await pool.query(`SELECT COUNT(*)::int AS cnt FROM Position`);
    if (rows[0].cnt === 0) {
      await pool.query(`
        INSERT INTO Position (PositionName) VALUES
          ('Product Designer'),
          ('Engineering Manager'),
          ('Customer Success Manager'),
          ('Frontend Developer'),
          ('UX Researcher')
        ON CONFLICT (PositionName) DO NOTHING;
      `);
    }

    await pool.query(`
      INSERT INTO Employee (EmployeeID, PositionID, EmployeeName, ContactNumber, Email)
      VALUES (1, 1, 'Admin User', '1234567890', 'admin@example.com')
      ON CONFLICT (EmployeeID) DO NOTHING;
    `);

    const hashedPassword = await bcrypt.hash('adminpass', 10);

    await pool.query(`
      INSERT INTO Admin (AdminID, Username, Password)
      VALUES (1, 'admin1', $1)
      ON CONFLICT (AdminID) DO NOTHING;
    `, [hashedPassword]);

    console.log("Initial data inserted.");
  } catch (err) {
    console.error("Error inserting initial data:", err);
  }
};

const initializeDatabase = async () => {
  try {
    await createTables();
    console.log("Database tables created successfully.");

    await insertInitialData();
    console.log("Initial data inserted successfully.");
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
};


app.use('/api/auth', loginRoutes);        
app.use('/api/employees', employeeRoutes);  
app.use('/api/projects', projectRoutes);     
app.use('/api/jobs', jobRoutes);            
app.use('/api/positions', positionRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
  } catch (error) {
    res.status(500).send("Error connecting to the database");
  }
});

app.use(errorHandler);

const startServer = async () => {
  try {
  
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();
