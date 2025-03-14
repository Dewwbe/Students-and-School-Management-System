import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Ensure the uploads directory exists
const uploadDirectory = "uploads/";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// User Registration
router.post("/", upload.single("profilePicture"), async (request, response) => {
  try {
    const { username, firstName, lastName, email, password, age, address } = request.body;

    if (!username || !firstName || !lastName || !email || !password || !age || !address || !request.file) {
      return response.status(400).send({
        message: "All fields are required: username, firstName, lastName, email, password, age, address, profilePicture",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get image path
    const profilePicturePath = request.file.path.replace("uploads/", "");

    const newUser = {
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      address,
      profilePicture: profilePicturePath,
    };

    const user = await User.create(newUser);
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get All Users (Exclude passwords, include new fields)
router.get("/", async (request, response) => {
  try {
    const users = await User.find({}, "username firstName lastName email age address profilePicture");
    response.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get User By ID (Including Profile Picture)
router.get("/:id/details", async (request, response) => {
  try {
    const { id } = request.params;

    // Use the newly created method to get all details including the profile picture
    const user = await User.getUserByIdWithDetails(id);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Get User By ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const user = await User.findById(id, "username firstName lastName email age address profilePicture");

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    response.status(200).json(user);
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

    response.status(200).send({
      message: "Login successful",
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        address: user.address,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update User
router.put("/:id", upload.single("profilePicture"), async (request, response) => {
  try {
    const { id } = request.params;
    const { username, firstName, lastName, email, password, age, address } = request.body;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Hash new password if provided
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Get image path if a new profile picture is uploaded
    let profilePicturePath = user.profilePicture;
    if (request.file) {
      profilePicturePath = request.file.path.replace("uploads/", "");
    }

    const updatedUser = {
      username: username || user.username,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      password: hashedPassword,
      age: age || user.age,
      address: address || user.address,
      profilePicture: profilePicturePath,
    };

    const updatedUserData = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    response.status(200).send({
      message: "User updated successfully",
      user: updatedUserData,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete User
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Delete profile picture from uploads folder if it exists
    if (user.profilePicture) {
      const profilePicturePath = `uploads/${user.profilePicture}`;
      if (fs.existsSync(profilePicturePath)) {
        fs.unlinkSync(profilePicturePath);
      }
    }

    await User.findByIdAndDelete(id);
    response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
