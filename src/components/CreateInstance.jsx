import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createInstance } from '../services/courseService';

const CreateInstance = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInstance({ courseId: code, year: parseInt(year), semester: parseInt(semester) });
      navigate(`/course-instances`); 
    } catch (error) {
      console.error("Error creating instance:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Course Instance</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Year</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Semester</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Create Instance
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInstance;
