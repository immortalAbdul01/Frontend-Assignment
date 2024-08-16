import { useEffect, useState } from 'react';
import { fetchCourses, deleteCourse } from '../services/courseService';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const data = await fetchCourses();
      setCourses(data);
    }
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    await deleteCourse(id);
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <Link to={`/course/${course.id}`} className="text-blue-500 mt-4 block">View Details</Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => handleDelete(course.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
