import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLayout from './components/CommonLayout';

import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <CommonLayout>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl">Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<h1 className="text-2xl">Dashboard</h1>} />
      </Routes>
    </CommonLayout>
  );
};

export default App;