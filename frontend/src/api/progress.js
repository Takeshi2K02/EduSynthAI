import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getCourseProgress = async (courseId, userId) => {
  const res = await axios.get(`${API_BASE}/progress/${courseId}`, {
    params: { userId },
  });
  return res.data.progress;
};

export const markItemComplete = async ({ userId, courseId, itemType, itemId }) => {
  const res = await axios.patch(`${API_BASE}/progress/mark-complete`, {
    userId,
    courseId,
    itemType,
    itemId,
  });
  return res.data;
};
