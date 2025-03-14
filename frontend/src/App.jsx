import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTasks from './pages/CreateTasks';
import ShowTask from './pages/ShowTask';
import EditTask from './pages/EditTask';
import DeleteTasks from './pages/DeleteTasks';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateTerm from './pages/CreateTerm';
import TeacherRegister from './pages/TeacherRegister';
import TeacherLogin from './pages/TeacherLogin';
import TeacherHome from './pages/TeacherHome';
import Todohome from './pages/Todohome';
import About from './pages/About';
import TeacherEdit from './pages/TeacherEdit';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Home />} />
      <Route path='/tasks/create' element={<CreateTasks/>} />
      <Route path='/tasks/details/:id' element={<ShowTask />} />
      <Route path='/tasks/edit/:id' element={<EditTask />} />
      <Route path='/tasks/delete/:id' element={<DeleteTasks />} />
      <Route path='/terms/create' element={<CreateTerm />} />
    

      <Route path='/teacherregister' element={<TeacherRegister />} />
      <Route path='/teacher/teacherlogin' element={<TeacherLogin />} />
      <Route path='teacher-dashboard' element={<TeacherHome/>} />
    
      <Route path='/edit/:id' element={<TeacherEdit/>} />
    
      <Route path='/about' element={< About/>} />
      <Route path='/todoHome' element={<Todohome/>} />
    
    </Routes>
  );
};

export default App;