import express from "express";
import { Teacher } from "../models/teacherModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Teacher Registration
router.post("/register", async (request, response) => {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response.status(400).send({
        message: "All fields are required: username, email, password",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = {
      username,
      email,
      password: hashedPassword,
    };

    const teacher = await Teacher.create(newTeacher);
    return response.status(201).send({
      message: "Teacher registered successfully",
      teacher: {
        username: teacher.username,
        email: teacher.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Teacher Login
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({ message: "Email and password are required" });
    }

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return response.status(404).send({ message: "Teacher not found" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return response.status(401).send({ message: "Invalid credentials" });
    }

    response.status(200).send({
      message: "Login successful",
      teacher: {
        username: teacher.username,
        email: teacher.email,
      },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
