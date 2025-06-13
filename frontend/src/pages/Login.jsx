import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const fakeUser = { username };
    dispatch(login(fakeUser));
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-secondary text-black dark:bg-dark dark:text-white">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          className="border px-4 py-2 w-full mb-4 rounded"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;