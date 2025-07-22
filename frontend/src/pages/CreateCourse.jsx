import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import CourseTitleInput from '../components/course/CourseTitleInput';
import CourseDescriptionInput from '../components/course/CourseDescriptionInput';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descLoading, setDescLoading] = useState(false);

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

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Create a New Course</h1>

      <CourseTitleInput value={title} onChange={setTitle} />

      <CourseDescriptionInput
        value={description}
        onChange={setDescription}
        onSparkClick={handleGenerateDescription}
        loading={descLoading}
      />
    </div>
  );
};

export default CreateCourse;
