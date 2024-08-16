import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/courseService';

const CourseDetails = () => {
  const { code } = useParams(); // Extract the course code from the URL
  const [course, setCourse] = useState(null); // State to store course details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage any errors

  useEffect(() => {
    async function loadCourse() {
      try {
        if (code) {
          const data = await fetchCourseDetails(code); // Fetch course details by code
          setCourse(data); // Store the fetched course details in state
        } else {
          throw new Error("Course code is undefined"); // Handle case where code is undefined
        }
      } catch (err) {
        console.error("Error fetching course details:", err); // Log any errors to console
        setError(err.message || "An error occurred while fetching course details."); // Store error message in state
      } finally {
        setLoading(false); // Set loading state to false after the request completes
      }
    }
    loadCourse(); // Call the function to load course details
  }, [code]);

  if (loading) return <p>Loading...</p>; // Display loading message while data is being fetched
  if (error) return <p>Error: {error}</p>; // Display error message if there's an error

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{course?.title}</h1> {/* Display course title */}
      <p className="text-gray-600">{course?.description}</p> {/* Display course description */}
      <p className="mt-4">Course Code: {course?.code}</p> {/* Display course code */}
    </div>
  );
};

export default CourseDetails;
