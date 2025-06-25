import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CommonLayout from '../components/CommonLayout';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout>
      <div className="w-full min-h-screen overflow-y-auto no-scrollbar bg-gradient-to-br from-white to-slate-100 dark:from-neutral-900 dark:to-black px-6 py-12 pb-24">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Learn Smarter with <span className="text-primary">EduSynth AI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              An AI-powered modular learning platform that creates, manages, and tracks personalized learning journeys.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
            >
              Get Started <ArrowRight className="ml-2" size={18} />
            </button>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'AI-Generated Courses', desc: 'Build intelligent courses with Gemini API assistance.' },
              { title: 'YouTube Video Integration', desc: 'Curated educational videos with Data API support.' },
              { title: 'Interactive Quizzes', desc: 'Auto-generated or manual MCQs with evaluation and PDF export.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-800 shadow-xl rounded-2xl p-6 border dark:border-neutral-700">
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* How it works */}
          <section className="text-center space-y-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Create or Join Courses', text: 'Generate or enroll in AI-powered modular courses.' },
                { step: '2', title: 'Learn & Watch', text: 'Engage with AI materials and embedded videos.' },
                { step: '3', title: 'Test & Track', text: 'Take quizzes, get evaluated, and track your growth.' },
              ].map((s, i) => (
                <div key={i} className="p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border dark:border-neutral-700">
                  <div className="text-4xl font-bold text-primary mb-2">{s.step}</div>
                  <h4 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{s.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{s.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <footer className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Ready to start your intelligent learning journey?</h3>
            <button
              onClick={() => navigate('/register')}
              className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
            >
              Join Now
            </button>
          </footer>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Landing;
