import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner'; // Assuming you have a spinner component
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdEdit, MdDelete } from 'react-icons/md';
import bgImage from '../assets/bgpic.jpg';
import Navbar from '../components/Navbar'; // Adjust the path as needed

const Home = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/terms')
      .then((response) => {
        setTerms(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/terms/${id}`)
      .then(() => {
        setTerms(terms.filter((term) => term._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Terms List</h1>
          <Link to="/tasks/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : terms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left">Grade</th>
                  <th className="py-2 px-4 text-left">Term</th>
                  <th className="py-2 px-4 text-left">Science</th>
                  <th className="py-2 px-4 text-left">Maths</th>
                  <th className="py-2 px-4 text-left">Sinhala</th>
                  <th className="py-2 px-4 text-left">Religion</th>
                  <th className="py-2 px-4 text-left">English</th>
                  <th className="py-2 px-4 text-left">History</th>
                  <th className="py-2 px-4 text-left">Selective Sub 1</th>
                  <th className="py-2 px-4 text-left">Selective Sub 2</th>
                  <th className="py-2 px-4 text-left">Selective Sub 3</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term) => (
                  <tr key={term._id} className="border-b">
                    <td className="py-2 px-4">{term.grade}</td>
                    <td className="py-2 px-4">{term.term}</td>
                    <td className="py-2 px-4">{term.subjects.science}</td>
                    <td className="py-2 px-4">{term.subjects.maths}</td>
                    <td className="py-2 px-4">{term.subjects.sinhala}</td>
                    <td className="py-2 px-4">{term.subjects.religion}</td>
                    <td className="py-2 px-4">{term.subjects.english}</td>
                    <td className="py-2 px-4">{term.subjects.history}</td>
                    <td className="py-2 px-4">{term.subjects.selectiveSub1 || 'N/A'}</td>
                    <td className="py-2 px-4">{term.subjects.selectiveSub2 || 'N/A'}</td>
                    <td className="py-2 px-4">{term.subjects.selectiveSub3 || 'N/A'}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <Link to={`/terms/edit/${term._id}`} className="text-blue-500">
                        <MdEdit />
                      </Link>
                      <button onClick={() => handleDelete(term._id)} className="text-red-500">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No terms available</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;
