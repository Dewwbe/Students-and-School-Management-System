import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate addresses
    },
    profilePicture: {
      type: String, // Stores the image path or URL
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method to get user by ID including profile picture and all details
userSchema.statics.getUserByIdWithDetails = async function (id) {
  try {
    return await this.findById(id, "-password");  // Excluding password
  } catch (error) {
    throw new Error('User not found');
  }
};

export const User = mongoose.model('User', userSchema);
