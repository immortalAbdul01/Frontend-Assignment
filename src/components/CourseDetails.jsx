// src/components/CourseDetails.jsx
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{course?.title}</h1>
      <p className="text-gray-600">{course?.description}</p>
      <p className="mt-4">Course Code: {course?.code}</p>
    </div>
  );
};

export default CourseDetails;
