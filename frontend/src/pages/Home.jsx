import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdEdit, MdDelete } from 'react-icons/md';
import bgImage from '../assets/bgpic.jpg';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/tasks')
      .then((response) => {
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Tasks List</h1>
          <Link to="/tasks/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">Task Name</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Priority</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Due Date</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="border-b">
                    <td className="py-2 px-4">{task.taskName}</td>
                    <td className="py-2 px-4">{task.taskDescription}</td>
                    <td className="py-2 px-4">{task.priority}</td>
                    <td className="py-2 px-4">{task.status}</td>
                    <td className="py-2 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <Link to={`/tasks/edit/${task._id}`} className="text-blue-500">
                        <MdEdit />
                      </Link>
                      <button onClick={() => handleDelete(task._id)} className="text-red-500">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
