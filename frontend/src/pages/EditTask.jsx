import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/tasks/${id}`)
      .then((response) => {
        setTaskName(response.data.taskName);
        setTaskDescription(response.data.taskDescription);
        setPriority(response.data.priority);
        setStatus(response.data.status);
        setDueDate(response.data.dueDate);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching task details', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditTask = () => {
    const data = { taskName, taskDescription, priority, status, dueDate };
    setLoading(true);
    axios.put(`http://localhost:5555/tasks/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Task Edited Successfully', { variant: 'success' });
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating task', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination="/dashboard" />
      <h1 className='text-3xl my-4'>Edit Task</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Task Name</label>
          <input type='text' value={taskName} onChange={(e) => setTaskName(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Description</label>
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></textarea>
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'>
            <option value='high'>High</option>
            <option value='intermediary'>Intermediary</option>
            <option value='low'>Low</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Status</label>
          <div>
            <input type='radio' id='done' name='status' value='done' checked={status === 'done'} onChange={(e) => setStatus(e.target.value)} />
            <label htmlFor='done' className='ml-2'>Done</label>
            <input type='radio' id='pending' name='status' value='pending' checked={status === 'pending'} onChange={(e) => setStatus(e.target.value)} className='ml-4' />
            <label htmlFor='pending' className='ml-2'>Pending</label>
          </div>
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Due Date</label>
          <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' min={new Date().toISOString().split('T')[0]} />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditTask}>Save</button>
      </div>
    </div>
  );
};

export default EditTask;
