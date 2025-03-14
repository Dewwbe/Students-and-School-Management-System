import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditTerm = () => {
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('1');
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/terms/${id}`)
      .then((response) => {
        const termData = response.data;
        setGrade(termData.grade);
        setTerm(termData.term);
        setSubjects(termData.subjects);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching term details', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditTerm = () => {
    const data = { grade, term, subjects };
    setLoading(true);
    axios.put(`http://localhost:5555/terms/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Term Edited Successfully', { variant: 'success' });
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating term', { variant: 'error' });
        console.log(error);
      });
  };

  const handleSubjectChange = (subject, value) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subject]: value,
    }));
  };

  return (
    <div className='p-4'>
      <BackButton destination="/dashboard" />
      <h1 className='text-3xl my-4'>Edit Term</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl text-gray-500'>Grade</label>
          <input type='number' value={grade} onChange={(e) => setGrade(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl text-gray-500'>Term</label>
          <select value={term} onChange={(e) => setTerm(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'>
            <option value='1'>Term 1</option>
            <option value='2'>Term 2</option>
          </select>
        </div>

        <div className='my-4'>
          <label className='text-xl text-gray-500'>Subjects</label>
          {['science', 'maths', 'sinhala', 'religion', 'english', 'history', 'selectiveSub1', 'selectiveSub2', 'selectiveSub3'].map((subject) => (
            <div key={subject} className='my-2'>
              <label className='text-lg text-gray-500 capitalize'>{subject}</label>
              <input 
                type='number' 
                value={subjects[subject]} 
                onChange={(e) => handleSubjectChange(subject, e.target.value)} 
                className='border-2 border-gray-500 px-4 py-2 w-full'
                min="0" 
              />
            </div>
          ))}
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditTerm}>Save</button>
      </div>
    </div>
  );
};

export default EditTerm;
