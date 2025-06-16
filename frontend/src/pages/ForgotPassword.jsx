import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all"
      >
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition-all"
        >
          Send Reset Link
        </button>

        {message && <p className="text-sm text-center mt-4 text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;