import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import CreateCourse from './pages/CreateCourse';
import CourseDetail from './pages/CourseDetail';
import { getCourseById } from './services/courseService'; // ✅ Make sure this exists

// ✅ Wrapper that fetches course and passes it to CourseDetail
const CourseDetailWrapper = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getCourseById(id).then(setCourse).catch(console.error);
  }, [id]);

  if (!course) return <p className="p-4">Loading course...</p>;

  return <CourseDetail course={course} userId={user?._id} />;
};

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/create-course" element={
          <PrivateRoute>
            <CreateCourse />
          </PrivateRoute>
        } 
      />
      <Route
        path="/courses/:id"
        element={
          <PrivateRoute>
            <CourseDetailWrapper />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;