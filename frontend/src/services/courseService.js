// src/services/courseService.js
import api from '../api/axiosInstance'; // Adjust path if needed

// Fetch courses grouped by status: pending, current, completed
export const getGroupedCourses = async () => {
  try {
    const response = await api.get('/courses/grouped');
    return response.data; // { pending: [...], current: [...], completed: [...] }
  } catch (error) {
    console.error('Failed to fetch grouped courses:', error);
    throw error;
  }
};

// Fetch progress for a specific course and user
export const getCourseProgress = async (courseId, userId) => {
  try {
    const res = await api.get(`/progress/${courseId}`, {
      params: { userId }
    });
    return res.data.progress; // e.g., 0.65
  } catch (error) {
    console.error(`Failed to fetch progress for course ${courseId}:`, error);
    return 0; // fallback to 0%
  }
};