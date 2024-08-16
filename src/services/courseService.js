import axios from 'axios';

// Set the base URL for your backend API
const BASE_URL = 'http://localhost:2000/api';

// Fetch all courses
export const fetchCourses = async () => {
  const response = await axios.get(`${BASE_URL}/courses`);
  return response.data;
};

// Fetch details for a specific course
export const fetchCourseDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/courses/${id}`);
  return response.data;
};

// Create a new course
export const createCourse = async (course) => {
  await axios.post(`${BASE_URL}/courses`, course);
};

// Delete a course
export const deleteCourse = async (id) => {
  await axios.delete(`${BASE_URL}/courses/${id}`);
};

// Fetch instances for a specific year and semester
export const fetchInstances = async (year, semester) => {
  const response = await axios.get(`${BASE_URL}/instances/${year}/${semester}`);
  return response.data;
};

// Fetch details of a specific instance
export const fetchInstanceDetails = async (year, semester, id) => {
  const response = await axios.get(`${BASE_URL}/instances/${year}/${semester}/${id}`);
  return response.data;
};
