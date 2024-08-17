import axios from 'axios';


const BASE_URL = 'http://localhost:2000/api';

// Fetch all courses
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Fetch details for a specific course
export const fetchCourseDetails = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course details for code ${code}:`, error);
    throw error;
  }
};

// Create a new course
export const createCourse = async (course) => {
  try {
    await axios.post(`${BASE_URL}/courses`, course);
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (code) => {
  try {
    await axios.delete(`${BASE_URL}/courses/${code}`);
  } catch (error) {
    console.error(`Error deleting course with code ${code}:`, error);
    throw error;
  }
};


// Fetch instances for a specific year and semester
// Fetch instances with year and semester
export const fetchInstances = async (year, semester) => {
  try {
    const response = await axios.get(`${BASE_URL}/instances/${year}/${semester}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instances:', error);
    throw error;
  }
};

// Fetch instances with year, semester, and course code
export const fetchInstancesByCourseIdYearAndSemester = async (year, semester, courseCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/instances/${year}/${semester}/${courseCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instances:', error);
    throw error;
  }
};

export const fetchAllInstances = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/instances`);
    return response.data;
  } catch (error) {
    console.error('Error fetching instances:', error);
    throw error;
  }
};


export const fetchInstanceDetails = async (year, semester, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/instances/${year}/${semester}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching instance details for id ${id}:`, error);
    throw error;
  }
};


// Delete an instance by year, semester, and courseId
export const deleteInstance = async (year, semester, courseId) => {
  try {
    await axios.delete(`${BASE_URL}/instances/${year}/${semester}/${courseId}`);
  } catch (error) {
    console.error(`Error deleting instance for course ${courseId}, year ${year}, semester ${semester}:`, error);
    throw error;
  }
};

// Create a new course instance
export const createInstance = async (instance) => {
  try {
    await axios.post(`${BASE_URL}/instances`, instance);
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
};
