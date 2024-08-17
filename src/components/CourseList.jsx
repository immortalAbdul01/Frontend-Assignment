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
        <div className="flex justify-between mb-4">
          <Link
            to="/create-course"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Create New Course
          </Link>
          <Link
            to="/course-instances"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            View All Instances
          </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Course Title</th>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.code}>
                <td className="py-2 px-4 border-b">{course.title}</td>
                <td className="py-2 px-4 border-b">{course.code}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/course/${course.code}`}
                    className="text-blue-500 hover:text-blue-600 font-medium transition duration-300 mr-4"
                  >
                    View
                  </Link>
                  <Link
                    to={`/course/${course.code}/create-instance`}
                    className="text-green-500 hover:text-green-600 font-medium transition duration-300 mr-4"
                  >
                    Create Instance
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-600 font-medium transition duration-300"
                    onClick={() => handleDelete(course.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
