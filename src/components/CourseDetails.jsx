import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/courseService';

const CourseDetails = () => {
  const { code } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCourse() {
      try {
        if (code) {
          const data = await fetchCourseDetails(code);
          setCourse(data);
        } else {
          throw new Error("Course code is undefined");
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError(err.message || "An error occurred while fetching course details.");
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Course Details</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <tbody>
          <tr className="border-b">
            <td className="py-4 px-6 font-semibold bg-gray-100">Course Title</td>
            <td className="py-4 px-6">{course?.title}</td>
          </tr>
          <tr className="border-b">
            <td className="py-4 px-6 font-semibold bg-gray-100">Course Code</td>
            <td className="py-4 px-6">{course?.code}</td>
          </tr>
          <tr className="border-b">
            <td className="py-4 px-6 font-semibold bg-gray-100">Description</td>
            <td className="py-4 px-6">{course?.description}</td>
          </tr>
          <tr className="border-b">
            <td className="py-4 px-6 font-semibold bg-gray-100">Credits</td>
            <td className="py-4 px-6">{course?.credits || "N/A"}</td>
          </tr>
          <tr>
            <td className="py-4 px-6 font-semibold bg-gray-100">Instructor</td>
            <td className="py-4 px-6">{course?.instructor || "Not Available"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CourseDetails;
