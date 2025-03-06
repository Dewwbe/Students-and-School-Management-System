import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTasks from './pages/CreateTasks';
import ShowTask from './pages/ShowTask';
import EditTask from './pages/EditTask';
import DeleteTasks from './pages/DeleteTasks';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Home />} />
      <Route path='/tasks/create' element={<CreateTasks />} />
      <Route path='/tasks/details/:id' element={<ShowTask />} />
      <Route path='/tasks/edit/:id' element={<EditTask />} />
      <Route path='/tasks/delete/:id' element={<DeleteTasks />} />
    </Routes>
  );
};

export default App;