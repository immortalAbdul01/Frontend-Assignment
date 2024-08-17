import { useEffect, useState } from 'react';
import { fetchAllInstances, fetchInstances, fetchInstancesByCourseIdYearAndSemester, fetchCourses, deleteInstance } from '../services/courseService';

const InstanceList = () => {
  const [instances, setInstances] = useState([]);
  const [courses, setCourses] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseCode, setCourseCode] = useState('');

  useEffect(() => {
    async function loadCourses() {
      try {
        const courseData = await fetchCourses();
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    loadCourses();
  }, []);

  useEffect(() => {
    async function loadInstances() {
      try {
        let data;
        if (year && semester && courseCode) {
          data = await fetchInstancesByCourseIdYearAndSemester(year, semester, courseCode);
        } else if (year && semester) {
          data = await fetchInstances(year, semester);
        } else {
          data = await fetchAllInstances();
        }
        setInstances(data);
      } catch (error) {
        console.error("Error fetching instances:", error);
      }
    }

    loadInstances();
  }, [year, semester, courseCode]);

  const getCourseDetails = (courseId) => {
    const course = courses.find(c => c.code === courseId);
    return course ? { title: course.title, description: course.description, code: course.code } : { title: 'Unknown', description: '', code: 'Unknown' };
  };

  const handleDelete = async (year, semester, courseId) => {
    if (window.confirm(`Are you sure you want to delete the instance for course ${courseId}, year ${year}, semester ${semester}?`)) {
      try {
        await deleteInstance(year, semester, courseId);
        // Refresh the instance list after deletion
        let updatedInstances = instances.filter(instance => !(instance.year === year && instance.semester === semester && instance.courseId === courseId));
        setInstances(updatedInstances);
      } catch (error) {
        console.error("Error deleting instance:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">All Course Instances</h1>

        {/* Filter Form */}
        <div className="mb-6 flex space-x-4">
          <div>
            <label className="block text-gray-700">Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              placeholder="Enter year"
            />
          </div>

          <div>
            <label className="block text-gray-700">Semester:</label>
            <input
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              placeholder="Enter semester"
            />
          </div>

          <div>
            <label className="block text-gray-700">Course Code:</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg"
              placeholder="Enter course code"
            />
          </div>
        </div>

        {/* Instance Table */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Course Code</th>
              <th className="py-2 px-4 border-b">Course Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.map(instance => {
              const courseDetails = getCourseDetails(instance.courseId);
              return (
                <tr key={instance.id}>
                  <td className="py-2 px-4 border-b">{courseDetails.code}</td>
                  <td className="py-2 px-4 border-b">{courseDetails.title}</td>
                  <td className="py-2 px-4 border-b">{courseDetails.description}</td>
                  <td className="py-2 px-4 border-b">{instance.year}</td>
                  <td className="py-2 px-4 border-b">{instance.semester}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(instance.year, instance.semester, instance.courseId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstanceList;
