import express from 'express';
import { Task } from '../models/taskModel.js';


const router = express.Router();

// Route for saving a new task
router.post('/', async (request, response) => {
  try {
    if (!request.body.taskName || !request.body.taskDescription || !request.body.priority || !request.body.dueDate) {
      return response.status(400).send({
        message: 'Send all required fields: taskName, taskDescription, priority, dueDate',
      });
    }
    const newTask = {
      taskName: request.body.taskName,
      taskDescription: request.body.taskDescription,
      priority: request.body.priority,
      status:request.body.priority,
      dueDate: request.body.dueDate,
    };

    const task = await Task.create(newTask);
    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all tasks from the database
router.get('/', async (request, response) => {
  try {
    const tasks = await Task.find({});
    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting one task from the database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findById(id);
    if (!task) {
      return response.status(404).json({ message: 'Task not found' });
    }
    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a task
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.taskName || !request.body.taskDescription || !request.body.priority || !request.body.dueDate) {
      return response.status(400).send({
        message: 'Send all required fields: taskName, taskDescription, priority, dueDate',
      });
    }
    const { id } = request.params;
    const result = await Task.findByIdAndUpdate(id, request.body, { new: true });
    if (!result) {
      return response.status(404).json({ message: 'Task not found' });
    }
    return response.status(200).send({ message: 'Task updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for deleting a task
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Task.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Task not found' });
    }
    return response.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
