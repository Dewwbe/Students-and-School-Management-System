import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="title">Student Management System</h1>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Student</Link>
          <Link to="/about" className="nav-link">About us</Link>
         <Link to="/teacher/teacherlogin" className="nav-link">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
