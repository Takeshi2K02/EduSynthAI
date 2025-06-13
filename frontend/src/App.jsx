// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-secondary text-black dark:bg-dark dark:text-white">
      <Routes>
        <Route path="/" element={<h1 className="text-3xl p-4">Welcome to EduSynthAI</h1>} />
        <Route path="/dashboard" element={<h1 className="text-2xl p-4">Dashboard</h1>} />
      </Routes>
    </div>
  );
};

export default App;