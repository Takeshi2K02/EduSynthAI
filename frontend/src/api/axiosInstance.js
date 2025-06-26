import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default instance;
