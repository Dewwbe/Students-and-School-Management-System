import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTerm = () => {
  const [formData, setFormData] = useState({
    grade: '',
    term: '',
    marks: {
      Science: '',
      Maths: '',
      Sinhala: '',
      Religion: '',
      English: '',
      History: '',
      selectiveSub1: { subject: '', marks: '' },
      selectiveSub2: { subject: '', marks: '' },
      selectiveSub3: { subject: '', marks: '' },
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectiveChange = (e, subIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      marks: {
        ...prevData.marks,
        [`selectiveSub${subIndex}`]: {
          ...prevData.marks[`selectiveSub${subIndex}`],
          [name]: value,
        },
      },
    }));
  };

  const handleSaveTerm = () => {
    const data = formData;
    setLoading(true);
    axios
      .post('http://localhost:5555/terms', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Term Created successfully', { variant: 'success' });
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination="/dashboard" />

      <h1 className="text-3xl my-4">Create Term</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* Grade */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Grade</label>
          <input
            type="number"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>

        {/* Term */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Term</label>
          <div>
            <input
              type="radio"
              name="term"
              value="1"
              checked={formData.term === '1'}
              onChange={handleChange}
              className="mr-2"
              required
            />
            1
            <input
              type="radio"
              name="term"
              value="2"
              checked={formData.term === '2'}
              onChange={handleChange}
              className="ml-4"
              required
            />
            2
          </div>
        </div>

        {/* Core Subjects */}
        {['Science', 'Maths', 'Sinhala', 'Religion', 'English', 'History'].map((subject) => (
          <div key={subject} className="my-4">
            <label className="text-xl mr-4 text-gray-500">{subject}</label>
            <input
              type="number"
              name={subject}
              value={formData.marks[subject]}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  marks: { ...prevData.marks, [subject]: e.target.value },
                }))
              }
              className="border-2 border-gray-500 px-4 py-2 w-full"
              required
            />
          </div>
        ))}

        {/* Selective Subject 1 */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Selective Sub 1</label>
          <select
            name="subject"
            value={formData.marks.selectiveSub1.subject}
            onChange={(e) => handleSelectiveChange(e, 1)}
            className="border-2 border-gray-500 px-4 py-2 w-full mb-2"
            required
          >
            <option value="">Select a subject</option>
            <option value="Geography">Geography</option>
            <option value="Civics">Civics</option>
            <option value="Handcrafts">Handcrafts</option>
          </select>
          <input
            type="number"
            name="marks"
            value={formData.marks.selectiveSub1.marks}
            onChange={(e) => handleSelectiveChange(e, 1)}
            placeholder="Marks"
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>

        {/* Selective Subject 2 */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Selective Sub 2</label>
          <select
            name="subject"
            value={formData.marks.selectiveSub2.subject}
            onChange={(e) => handleSelectiveChange(e, 2)}
            className="border-2 border-gray-500 px-4 py-2 w-full mb-2"
            required
          >
            <option value="">Select a subject</option>
            <option value="English Literature">English Literature</option>
            <option value="Music">Music</option>
            <option value="Dancing">Dancing</option>
            <option value="Sinhala Literature">Sinhala Literature</option>
            <option value="Art">Art</option>
          </select>
          <input
            type="number"
            name="marks"
            value={formData.marks.selectiveSub2.marks}
            onChange={(e) => handleSelectiveChange(e, 2)}
            placeholder="Marks"
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>

        {/* Selective Subject 3 */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Selective Sub 3</label>
          <select
            name="subject"
            value={formData.marks.selectiveSub3.subject}
            onChange={(e) => handleSelectiveChange(e, 3)}
            className="border-2 border-gray-500 px-4 py-2 w-full mb-2"
            required
          >
            <option value="">Select a subject</option>
            <option value="Health">Health</option>
            <option value="Information Technology">Information Technology</option>
          </select>
          <input
            type="number"
            name="marks"
            value={formData.marks.selectiveSub3.marks}
            onChange={(e) => handleSelectiveChange(e, 3)}
            placeholder="Marks"
            className="border-2 border-gray-500 px-4 py-2 w-full"
            required
          />
        </div>

        {/* Save Button */}
        <button
          className="p-2 bg-sky-300 m-8"
          onClick={handleSaveTerm}
          disabled={loading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateTerm;