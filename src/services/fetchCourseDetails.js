export const fetchCourseDetails = async (id) => {
  try {
    const response = await fetch(`/api/courses/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch course details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    return null;
  }
};
