import mongoose from 'mongoose';

const termSchema = new mongoose.Schema(
  {
    // Auto-generated ID is by default provided by Mongoose
    grade: {
      type: Number,
      required: true,
    },
    term: {
      type: String, // Radio button selection (1 or 2)
      required: true,
    },
    subjects: {
      science: {
        type: Number,
        required: true,
      },
      maths: {
        type: Number,
        required: true,
      },
      sinhala: {
        type: Number,
        required: true,
      },
      religion: {
        type: Number,
        required: true,
      },
      english: {
        type: Number,
        required: true,
      },
      history: {
        type: Number,
        required: true,
      },
      selectiveSub1: {
        type: Number,
        required: false,
      },
      selectiveSub2: {
        type: Number,
        required: false,
      },
      selectiveSub3: {
        type: Number,
        required: false,
      },
    }, // Closing the subjects field
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

export const Term = mongoose.model('Term', termSchema);
