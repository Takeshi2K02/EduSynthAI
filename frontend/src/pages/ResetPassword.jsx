import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState(null);

  const handleReset = async () => {
    if (password !== confirm) {
      return setMessage('Passwords do not match');
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-primary/20 dark:from-dark dark:to-dark">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Reset Password</h1>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
        />
        <button
          onClick={handleReset}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition-all"
        >
          Reset Password
        </button>
        {message && <p className="text-sm text-center mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;