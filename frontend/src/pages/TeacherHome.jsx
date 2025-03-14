import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEnvelope } from "react-icons/fa"; // Added envelope icon for email
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../assets/bgpic.jpg"; // Ensure correct path
import Navbar from "../components/Navbar"; // Import Navbar component
import emailjs from "emailjs-com"; // Import emailjs

const TeacherHome = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5555/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error fetching users!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5555/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  // Function to send email
  const handleSendEmail = (user) => {
    const templateParams = {
      to_email: user.email,
      subject: "Message from Teacher Dashboard",
      message: "Hello, this is a test email from the Teacher Dashboard!",
    };

    emailjs
      .send(
        "your_service_id",  // Replace with your EmailJS service ID
        "your_template_id",  // Replace with your EmailJS template ID
        templateParams,
        "your_user_id" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          toast.success("Email sent successfully!");
        },
        (error) => {
          toast.error("Failed to send email!");
        }
      );
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Centering content vertically
        }}
      >
        {/* Include the Navbar component */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-4 text-center">Teacher Dashboard</h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {loading ? (
            <p>Loading...</p>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Profile Picture</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Age</th>
                    <th className="py-2 px-4 text-left">Address</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="py-2 px-4">
                        <img
                          src={`http://localhost:5555/${user.profilePicture}`}
                          alt={user.firstName}
                          className="w-20 h-20 rounded-full" // Increased size of profile picture
                        />
                      </td>
                      <td className="py-2 px-4">{user.firstName} {user.lastName}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{user.age}</td>
                      <td className="py-2 px-4">{user.address}</td>
                      <td className="py-2 px-4 flex gap-4">
                        <button
                          onClick={() => navigate(`/edit/${user._id}`)}
                          className="text-blue-500 flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                        <button
                          onClick={() => handleSendEmail(user)}
                          className="text-green-500 flex items-center gap-1"
                        >
                          <FaEnvelope /> Send Email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
