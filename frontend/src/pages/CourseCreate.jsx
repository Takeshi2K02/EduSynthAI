import React, { useState } from 'react';
import CommonLayout from '../components/CommonLayout';

const CourseCreate = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [modules, setModules] = useState([]);
  const userId = '661d3a98c12f4f3b2eae45aa'; // Replace with actual context later

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        title: '',
        summary: '',
        content: '',
        weight: 0,
        resources: [],
        quizzes: [],
      },
    ]);
  };

  const updateModule = (index, field, value) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const addToModule = (index, type) => {
    const updated = [...modules];
    const item = type === 'quizzes' ? { title: '', type: 'single' } : { title: '', videoUrl: '' };
    updated[index][type].push(item);
    setModules(updated);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnailFile);
      formData.append('modules', JSON.stringify(modules));
      formData.append('createdBy', userId);

      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Course created successfully!');
        console.log('Course ID:', data.courseId);
      } else {
        alert(data.error || 'Failed to create course');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred.');
    }
  };

  return (
    <CommonLayout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-primary">Create New Course</h1>

        {step === 1 && (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Course Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800 border"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 rounded bg-neutral-100 dark:bg-neutral-800 border"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                <input type="file" accept="image/*" onChange={handleThumbnailChange} />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div className="pt-4">
              <button
                className="bg-primary text-white px-6 py-2 rounded-xl hover:opacity-90"
                onClick={() => setStep(2)}
              >
                Next: Add Modules
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="space-y-4">
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className="border border-neutral-300 dark:border-neutral-700 p-4 rounded-xl space-y-3 bg-neutral-50 dark:bg-neutral-800"
                >
                  <input
                    type="text"
                    placeholder="Module Title"
                    className="w-full px-4 py-2 rounded border"
                    value={mod.title}
                    onChange={(e) => updateModule(i, 'title', e.target.value)}
                  />
                  <textarea
                    placeholder="Module Summary"
                    className="w-full px-4 py-2 rounded border"
                    value={mod.summary}
                    onChange={(e) => updateModule(i, 'summary', e.target.value)}
                  />
                  <textarea
                    placeholder="Module Content"
                    className="w-full px-4 py-2 rounded border"
                    value={mod.content}
                    onChange={(e) => updateModule(i, 'content', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Module Weight"
                    className="w-full px-4 py-2 rounded border"
                    value={mod.weight}
                    onChange={(e) => updateModule(i, 'weight', parseFloat(e.target.value))}
                  />

                  {/* Resources */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">YouTube Resources</h4>
                    {mod.resources.map((r, idx) => (
                      <input
                        key={idx}
                        type="text"
                        className="w-full px-2 py-1 rounded border"
                        placeholder="Video URL"
                        value={r.videoUrl}
                        onChange={(e) => {
                          const updated = [...modules];
                          updated[i].resources[idx].videoUrl = e.target.value;
                          setModules(updated);
                        }}
                      />
                    ))}
                    <button
                      className="text-xs px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded"
                      onClick={() => addToModule(i, 'resources')}
                    >
                      + Add Resource
                    </button>
                  </div>

                  {/* Quizzes */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Quizzes</h4>
                    {mod.quizzes.map((q, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <select
                          value={q.type}
                          onChange={(e) => {
                            const updated = [...modules];
                            updated[i].quizzes[idx].type = e.target.value;
                            setModules(updated);
                          }}
                          className="px-2 py-1 rounded border"
                        >
                          <option value="single">Single Answer</option>
                          <option value="multiple">Multiple Answer</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Quiz Question"
                          value={q.title}
                          onChange={(e) => {
                            const updated = [...modules];
                            updated[i].quizzes[idx].title = e.target.value;
                            setModules(updated);
                          }}
                          className="px-2 py-1 rounded border w-full"
                        />
                      </div>
                    ))}
                    <button
                      className="text-xs px-2 py-1 bg-neutral-300 dark:bg-neutral-700 rounded"
                      onClick={() => addToModule(i, 'quizzes')}
                    >
                      + Add Quiz
                    </button>
                  </div>
                </div>
              ))}

              <button
                className="mt-2 bg-primary text-white px-4 py-2 rounded"
                onClick={handleAddModule}
              >
                + Add Module
              </button>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                className="bg-neutral-400 text-white px-4 py-2 rounded"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit Course
              </button>
            </div>
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default CourseCreate;
