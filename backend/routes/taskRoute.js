import express from 'express';
import { Term } from '../models/termModel.js';

const router = express.Router();

// Route for saving a new term
router.post('/', async (request, response) => {
  try {
    // Check if all required fields are provided
    if (
      !request.body.grade ||
      !request.body.term ||
      !request.body.subjects ||
      !request.body.subjects.science ||
      !request.body.subjects.maths ||
      !request.body.subjects.sinhala ||
      !request.body.subjects.religion ||
      !request.body.subjects.english ||
      !request.body.subjects.history
    ) {
      return response.status(400).send({
        message: 'Send all required fields: grade, term, and subjects with individual subject scores',
      });
    }

    const newTerm = {
      grade: request.body.grade,
      term: request.body.term,
      subjects: request.body.subjects,
    };

    const term = await Term.create(newTerm);
    return response.status(201).send(term);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all terms from the database
router.get('/', async (request, response) => {
  try {
    const terms = await Term.find({});
    return response.status(200).json({
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one term from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const term = await Term.findById(id);
    if (!term) {
      return response.status(404).json({ message: 'Term not found' });
    }
    return response.status(200).json(term);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a term
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.grade ||
      !request.body.term ||
      !request.body.subjects ||
      !request.body.subjects.science ||
      !request.body.subjects.maths ||
      !request.body.subjects.sinhala ||
      !request.body.subjects.religion ||
      !request.body.subjects.english ||
      !request.body.subjects.history
    ) {
      return response.status(400).send({
        message: 'Send all required fields: grade, term, and subjects with individual subject scores',
      });
    }

    const { id } = request.params;
    const result = await Term.findByIdAndUpdate(id, request.body, { new: true });
    if (!result) {
      return response.status(404).json({ message: 'Term not found' });
    }
    return response.status(200).send({ message: 'Term updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a term
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Term.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Term not found' });
    }
    return response.status(200).send({ message: 'Term deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
