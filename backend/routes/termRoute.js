import express from 'express';
import { Term } from '../models/termModel.js'

const router = express.Router();


// Route for saving a new term
router.post('/', async (request, response) => {
    try {
      const { grade, term, subjects } = request.body;
  
      // Check if required fields are present
      if (!grade || !term || !subjects) {
        return response.status(400).send({
          message: 'Send all required fields: grade, term, subjects',
        });
      }
  
      // Calculate totalMarks and averageMarks
      const totalMarks = Object.values(subjects).reduce((sum, value) => sum + value, 0);
      const numSubjects = Object.keys(subjects).length;
      const averageMarks = totalMarks / numSubjects;
  
      // Create the new term object
      const newTerm = {
        grade,
        term,
        subjects,
        totalMarks,
        averageMarks,
      };
  
      // Create and save the term in the database
      const createdTerm = await Term.create(newTerm); // Renamed variable to 'createdTerm'
      return response.status(201).send(createdTerm);  // Returning 'createdTerm'
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

// Route for getting one term from the database by ID
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

// Route for updating a term by ID
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.grade || !request.body.term || !request.body.subjects) {
      return response.status(400).send({
        message: 'Send all required fields: grade, term, subjects',
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

// Route for deleting a term by ID
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
