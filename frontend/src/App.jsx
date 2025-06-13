// frontend/src/App.jsx
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonLayout from './components/CommonLayout';

const App = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <CommonLayout>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl">Home</h1>} />
        <Route path="/dashboard" element={<h1 className="text-2xl">Dashboard</h1>} />
      </Routes>
    </CommonLayout>
  );
};

export default App;