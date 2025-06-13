import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      dispatch(login(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-secondary to-primary/20 dark:from-dark dark:to-dark m-0 p-0">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign In</h1>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
        />

        <p
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary text-right mb-4 cursor-pointer hover:underline transition-all"
        >
          Forgot Password?
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition-all"
        >
          Login
        </button>

        {error && <p className="text-sm text-red-500 mt-3 text-center">{error}</p>}

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <span className="text-primary cursor-pointer" onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;