import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateTerm = () => {
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [subjects, setSubjects] = useState({
    science: '',
    maths: '',
    sinhala: '',
    religion: '',
    english: '',
    history: '',
    selectiveSub1: '',
    selectiveSub2: '',
    selectiveSub3: '',
  });
  const [totalMarks, setTotalMarks] = useState(0);
  const [averageMarks, setAverageMarks] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Calculate total and average marks based on subjects
  const calculateTotalAndAverage = () => {
    const subjectValues = Object.values(subjects).map(Number);
    const total = subjectValues.reduce((acc, curr) => acc + curr, 0);
    const average = total / subjectValues.length;

    setTotalMarks(total);
    setAverageMarks(average);
  };

  // Handle changes to the subjects' input fields
  const handleSubjectChange = (e) => {
    const { name, value } = e.target;
    setSubjects((prevSubjects) => {
      const updatedSubjects = { ...prevSubjects, [name]: value };
      return updatedSubjects;
    });
  };

  // Handle form submission
  const handleSaveTerm = () => {
    const data = {
      grade,
      term,
      subjects,
      totalMarks,
      averageMarks,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/tasks', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Term Created successfully', { variant: 'success' });
        navigate('/terms'); // Redirect to terms page after success
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating term', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/terms" />
      <h1 className="text-3xl my-4">Create Term</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Grade</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="">Select Term</option>
            <option value="1">Term 1</option>
            <option value="2">Term 2</option>
          </select>
        </div>

        {/* Subjects Input */}
        {Object.keys(subjects).map((subject) => (
          <div className="my-4" key={subject}>
            <label className="text-xl mr-4 text-gray-500">{subject.charAt(0).toUpperCase() + subject.slice(1)}</label>
            <input
              type="number"
              name={subject}
              value={subjects[subject]}
              onChange={handleSubjectChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
        ))}

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Total Marks</label>
          <input
            type="number"
            value={totalMarks}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Average Marks</label>
          <input
            type="number"
            value={averageMarks}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button
          className="p-2 bg-sky-300 m-8"
          onClick={() => {
            calculateTotalAndAverage();
            handleSaveTerm();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateTerm;
