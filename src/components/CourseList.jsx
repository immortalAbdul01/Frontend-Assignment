import { useEffect, useState } from 'react';
import { fetchCourses, deleteCourse } from '../services/courseService';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    loadCourses();
  }, []);

  const handleDelete = async (code) => {
    try {
      await deleteCourse(code);
      setCourses(courses.filter(course => course.code !== code));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Course List</h1>
        <div className="flex justify-end mb-4">
          <Link
            to="/create-course"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Create New Course
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.code} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/course/${course.code}`}
                  className="text-blue-500 hover:text-blue-600 font-medium transition duration-300"
                >
                  View Details
                </Link>
                <Link
                  to={`/course/${course.code}/instances`}
                  className="text-blue-500 hover:text-blue-600 font-medium transition duration-300"
                >
                  View Instances
                </Link>
              </div>
              <button
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                onClick={() => handleDelete(course.code)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
