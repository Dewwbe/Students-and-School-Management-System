import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTasks = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveTask = () => {
    const data = {
      taskName,
      taskDescription,
      priority,
      status,
      dueDate,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/tasks', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Created successfully', { variant: 'success' });
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination="/dashboard" />

      <h1 className='text-3xl my-4'>Create Task</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task Name</label>
          <input
            type='text'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Task Description</label>
          <input
            type='text'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value='high'>High</option>
            <option value='intermediary'>Intermediary</option>
            <option value='low'>Low</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Status</label>
          <div>
            <input
              type='radio'
              name='status'
              value='done'
              checked={status === 'done'}
              onChange={() => setStatus('done')}
            /> Done
            <input
              type='radio'
              name='status'
              value='pending'
              checked={status === 'pending'}
              onChange={() => setStatus('pending')}
              className='ml-4'
            /> Pending
          </div>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Due Date</label>
          <input
            type='date'
            value={dueDate}
            min={new Date().toISOString().split('T')[0]} // Freezes past dates
            onChange={(e) => setDueDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTask}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateTasks;
