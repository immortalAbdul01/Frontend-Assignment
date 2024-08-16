import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/courseService';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function loadCourse() {
      const data = await fetchCourseDetails(id);
      setCourse(data);
    }
    loadCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>
      <p className="mt-4">Course Code: {course.code}</p>
      {/* Add more course details if available */}
    </div>
  );
};

export default CourseDetails;
