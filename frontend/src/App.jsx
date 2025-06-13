import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLayout from './components/CommonLayout';
import ResetPassword from './pages/ResetPassword';
import Registration from './pages/Registration';
import Login from './pages/Login';


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
        <Route path="/dashboard" element={<h1 className="text-2xl">Dashboard</h1>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </CommonLayout>
  );
};

export default App;