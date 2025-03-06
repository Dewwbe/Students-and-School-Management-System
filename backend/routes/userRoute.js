import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

// User Registration
router.post("/", async (request, response) => {
  try {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
      return response.status(400).send({
        message: "Send all required fields: username, email, password",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const user = await User.create(newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get All Users (Only username and email)
router.get("/", async (request, response) => {
  try {
    const users = await User.find({}, "username email"); // Exclude passwords
    response.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// User Login
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).send({ message: "Invalid credentials" });
    }

    response.status(200).send({ message: "Login successful", user: { username: user.username, email: user.email } });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
