import React from 'react';
import Navbar from '../components/Navbar';
import bgImage from '../assets/bgpic.jpg';

const About = () => {
  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-8 text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-black bg-opacity-60 p-8 mt-16 rounded-lg shadow-lg w-3/4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-left leading-relaxed">
            A <strong>Student Management System (SMS)</strong> is a software application designed to streamline 
            and automate the administrative tasks of educational institutions, such as schools, colleges, and 
            universities. It serves as a centralized platform for managing student-related data, ensuring efficient 
            record-keeping, communication, and reporting.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Key Features:</h2>
          <ul className="list-disc list-inside text-left">
            <li><strong>Student Enrollment & Registration:</strong> Automates the process of student admissions, course registration, and personal data management.</li>
            <li><strong>Attendance Management:</strong> Tracks student attendance, generates reports, and integrates with biometric or RFID systems.</li>
            <li><strong>Grade & Examination Management:</strong> Stores academic performance, generates report cards, and calculates GPA/CGPA.</li>
            <li><strong>Course & Class Scheduling:</strong> Manages timetables, assigns teachers to courses, and avoids scheduling conflicts.</li>
            <li><strong>Fee Management:</strong> Tracks tuition fees, generates invoices, and processes online payments.</li>
            <li><strong>Communication Module:</strong> Sends notifications, announcements, and updates to students, parents, and faculty via email or SMS.</li>
            <li><strong>Library & Resource Management:</strong> Maintains book records, issues and returns books, and tracks library usage.</li>
            <li><strong>Reports & Analytics:</strong> Generates insights on student performance, attendance trends, and institutional growth.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-3">Benefits:</h2>
          <ul className="list-disc list-inside text-left">
            <li>Improves administrative efficiency and reduces paperwork.</li>
            <li>Enhances communication between students, faculty, and parents.</li>
            <li>Ensures secure and organized data storage.</li>
            <li>Saves time through automation of routine tasks.</li>
            <li>Provides real-time access to student records.</li>
          </ul>

          <p className="text-lg mt-6">
            A <strong>Student Management System</strong> is essential for modern educational institutions, 
            enabling smooth operations and improved decision-making through data-driven insights. 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
