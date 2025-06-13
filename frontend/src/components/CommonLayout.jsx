import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { logout } from '../redux/slices/authSlice';

export default function CommonLayout({ children }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDark = useSelector((state) => state.theme.dark);
  const { user } = useSelector((state) => state.auth);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    const newTheme = !isDark;
    document.documentElement.classList.toggle('dark', newTheme);
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-[var(--bg-subtle)] border-r border-[var(--border)]
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4">
          <Link to="/dashboard" className="text-3xl font-extrabold text-[var(--primary)] tracking-tight">
            EduSynth AI
          </Link>
        </div>
        <nav className="px-4 space-y-4 text-sm">
          <Link to="/dashboard" className="block py-2 px-3 rounded hover:bg-[var(--primary)]/10">Dashboard</Link>
          <Link to="/quiz" className="block py-2 px-3 rounded hover:bg-[var(--primary)]/10">Quiz</Link>

          <p className="mt-6 text-xs uppercase text-[var(--text-muted)]">Filters</p>
          {['All', 'Recent', 'Popular', 'Trending'].map(item => (
            <a
              key={item}
              href="#"
              className="block py-2 px-3 rounded hover:bg-[var(--primary)]/10"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${open ? 'ml-64' : 'ml-0'}`}>
        {/* Top bar */}
        <header className="flex items-center justify-between bg-[var(--bg-subtle)] px-6 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="text-[var(--primary)] p-2 rounded-md focus:outline-none"
            >
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <div
              className={`text-3xl font-extrabold text-[var(--primary)] tracking-tight leading-none transition-opacity duration-300 ${
                open ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              EduSynth AI
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--primary)] hover:text-white transition"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <span className="text-sm font-medium text-[var(--text-muted)]">
              {user?.username || 'Guest'}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 flex items-center justify-center rounded-md bg-[var(--primary)] text-white text-sm font-medium shadow hover:bg-[var(--primary-hover)] transition leading-none"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}