import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import CommonLayout from '../components/CommonLayout';
import Spinner from '../components/Spinner';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      dispatch(login(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div className="flex items-center justify-center py-12 w-full">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all"
        >
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">Sign In</h1>

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
          />

          <div className="relative mb-2">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-primary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <p
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary text-right mb-4 cursor-pointer hover:underline transition-all"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition-all flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>

          {error && <p className="text-sm text-red-500 mt-3 text-center">{error}</p>}

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <span className="text-primary cursor-pointer" onClick={() => navigate('/register')}>
              Register
            </span>
          </p>
        </form>
      </div>
    </CommonLayout>
  );
};

export default Login;