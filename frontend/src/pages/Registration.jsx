import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../components/CommonLayout';
import Spinner from '../components/Spinner';

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout>
      <div className="flex items-center justify-center py-12 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 w-full max-w-md transition-all"
        >
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Account</h1>

          {['username', 'email', 'password'].map((field, i) => (
            <input
              key={i}
              type={field === 'password' ? 'password' : 'text'}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-800 dark:border-neutral-700"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition-all flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Register'}
          </button>

          {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <span className="text-primary cursor-pointer" onClick={() => navigate('/login')}>
              Login
            </span>
          </p>
        </form>
      </div>
    </CommonLayout>
  );
};

export default Registration;