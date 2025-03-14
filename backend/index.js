import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Task } from './models/taskModel.js';
import taskRoute from './routes/taskRoute.js';
import { User } from './models/userModel.js';
import userRoute from './routes/userRoute.js';
import { Term } from './models/termModel.js';
import teacherRoute from './routes/teacherRoute.js';
import cors from 'cors';
import termRoute from './routes/termRoute.js';
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from 'path'; // Make sure you import path as well

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Derive the current directory from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware for handling CORS POLICY
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // <-- Correct this line

// Routes
app.use('/tasks', taskRoute);
app.use('/users', userRoute);
app.use('/terms', termRoute);
app.use('/teachers', teacherRoute);

// Database connection and app start
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
