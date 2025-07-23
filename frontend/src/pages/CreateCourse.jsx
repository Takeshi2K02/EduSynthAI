import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import CourseTitleInput from '../components/course/CourseTitleInput';
import CourseDescriptionInput from '../components/course/CourseDescriptionInput';
import CourseModuleList from '../components/course/CourseModuleList';
import CommonLayout from '../components/CommonLayout';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descLoading, setDescLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [suggestionPool, setSuggestionPool] = useState([]);
  const [usedSuggestions, setUsedSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!title.trim() || !description.trim()) return;

      try {
        const res = await axios.post('/ai/generate-modules', {
          title,
          description,
        });

        setSuggestionPool(res.data.modules || []);
        setUsedSuggestions([]);
        setModules([]);
      } catch (err) {
        console.error('❌ Failed to fetch module suggestions:', err?.response?.data || err.message);
      }
    };

    fetchSuggestions();
  }, [title, description]);

  const handleGenerateDescription = async () => {
    if (!title.trim()) return alert('Please enter a course title first.');
    setDescLoading(true);

    try {
      const res = await axios.post('/ai/generate-description', { title });
      if (res?.data?.description) {
        setDescription(res.data.description);
      } else {
        alert('Failed to generate description.');
        console.warn('Empty response:', res);
      }
    } catch (err) {
      console.error('AI Description Error:', err?.response?.data || err.message);
      alert(err?.response?.data?.error || 'Something went wrong while generating description.');
    } finally {
      setDescLoading(false);
    }
  };

  const handleAddModule = () => {
    const remaining = suggestionPool.filter(s => !usedSuggestions.includes(s));
    const nextSuggestion = remaining[0] || '';

    const newModule = {
      id: Date.now().toString(),
      title: nextSuggestion,
      content: '',
      quizzes: [],
      resources: []
    };

    setModules([...modules, newModule]);
    if (nextSuggestion) {
      setUsedSuggestions([...usedSuggestions, nextSuggestion]);
    }
  };

  const handleUpdateModule = (index, updatedModule) => {
    const updated = [...modules];
    updated[index] = updatedModule;
    setModules(updated);
  };

  const handleRemoveModule = (index) => {
    const removed = modules[index];
    const updatedModules = modules.filter((_, i) => i !== index);
    const updatedUsed = usedSuggestions.filter(s => s !== removed.title);

    setModules(updatedModules);
    setUsedSuggestions(updatedUsed);
  };

  const handleSubmit = async () => {
  try {
    const payload = {
      title,
      description,
      modules: JSON.stringify(
        modules.map(({ title, content, quizzes, resources }) => ({
          title,
          content,
          quizzes,
          resources: (resources || []).map(r => ({
            title: r.title,
            videoUrl: r.videoUrl || r.url,         // ✅ match schema
            thumbnail: r.thumbnail,  // ✅ optional
            source: 'YouTube'        // ✅ optional but valid
          }))
        }))
      )
    };

    // 📦 Log payload before sending
    console.log('📤 Submitting payload:', JSON.stringify(payload, null, 2));

    const res = await axios.post('/courses', payload);
    alert('✅ Course created successfully!');
    console.log('✅ Saved response:', res.data);
  } catch (err) {
    console.error('❌ Submit Error:', err?.response?.data || err.message);
    alert(err?.response?.data?.error || 'Failed to submit course.');
  }
};



  return (
  <CommonLayout>
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-2">Create a New Course</h1>

      <CourseTitleInput value={title} onChange={setTitle} />

      <CourseDescriptionInput
        value={description}
        onChange={setDescription}
        onSparkClick={handleGenerateDescription}
        loading={descLoading}
      />

      <CourseModuleList
        modules={modules}
        onAdd={handleAddModule}
        onUpdate={handleUpdateModule}
        onRemove={handleRemoveModule}
        canAdd={title.trim() && description.trim()}
        courseTitle={title}
        courseDescription={description}
        suggestions={suggestionPool.filter(s => !usedSuggestions.includes(s))}
      />

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
        >
          Submit Course
        </button>
      </div>
    </div>
  </CommonLayout>
  );
};

export default CreateCourse;
