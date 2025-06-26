import React, { useState } from 'react';
import CommonLayout from '../components/CommonLayout';
import { Image } from 'lucide-react';
import ModuleEditor from '../components/course/ModuleEditor';
import SparkAIButton from '../components/SparkAIButton';
import axios from '../api/axiosInstance';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const initialSuggestions = [
  'Introduction to AI',
  'Machine Learning Basics',
  'Deep Learning Overview',
  'Ethics in AI',
  'Applications of AI'
];

const CourseCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [modules, setModules] = useState([]);
  const [availableSuggestions, setAvailableSuggestions] = useState(initialSuggestions);
  const [loadingDesc, setLoadingDesc] = useState(false);

  const token = useSelector((state) => state.auth.user?.token);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById('thumbnail-upload').click();
  };

  const handleGenerateDescription = async () => {
    if (!title.trim()) {
      return toast.error('Please enter a course title first');
    }
    setLoadingDesc(true);
    try {
      const res = await axios.post(
        '/api/ai/generate-description',
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescription(res.data.description);
    } catch (err) {
      toast.error('Failed to generate description');
    } finally {
      setLoadingDesc(false);
    }
  };

  const handleAddModule = () => {
    setModules((prev) => [
      ...prev,
      { title: '', content: '', resources: [], quizzes: [] }
    ]);
  };

  const handleUpdateModule = (index, updated) => {
    const clone = [...modules];
    clone[index] = updated;
    setModules(clone);
  };

  const handleRemoveModule = (index) => {
    const removedTitle = modules[index].title;
    if (initialSuggestions.includes(removedTitle) && !availableSuggestions.includes(removedTitle)) {
      setAvailableSuggestions((prev) => [...prev, removedTitle]);
    }

    const clone = [...modules];
    clone.splice(index, 1);
    setModules(clone);
  };

  const handleUseSuggestion = (title) => {
    setAvailableSuggestions((prev) => prev.filter((s) => s !== title));
  };

  const handleReleaseSuggestion = (title) => {
    if (initialSuggestions.includes(title) && !availableSuggestions.includes(title)) {
      setAvailableSuggestions((prev) => [...prev, title]);
    }
  };

  const canAddModule =
    modules.length === 0 || modules[modules.length - 1].title.trim() !== '';

  return (
    <CommonLayout>
      <div className="max-w-4xl mx-auto mt-12 px-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          Create Course
        </h1>

        <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-stretch h-full">
            <div
              className="aspect-[7/4] w-full md:w-1/3 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={triggerFileInput}
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 space-y-1">
                  <Image className="mx-auto" size={36} />
                  <p className="text-sm font-medium">Add Image</p>
                </div>
              )}
              <input
                type="file"
                id="thumbnail-upload"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 flex flex-col h-full">
              <div className="flex flex-col gap-1 mb-4">
                <label className="text-sm font-medium sr-only">Title</label>
                <input
                  type="text"
                  placeholder="Course Title"
                  className="w-full px-4 py-2 h-12 rounded border bg-neutral-100 dark:bg-neutral-800"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="relative w-full">
                <textarea
                  placeholder="Course description"
                  className="w-full px-4 pt-3 pb-10 rounded border bg-neutral-100 dark:bg-neutral-800 resize-none flex-1"
                  style={{ minHeight: '0' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <SparkAIButton
                  onClick={handleGenerateDescription}
                  loading={loadingDesc}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Modules
            </h2>

            {modules.map((mod, i) => (
              <ModuleEditor
                key={i}
                module={mod}
                onChange={(updated) => handleUpdateModule(i, updated)}
                onRemove={() => handleRemoveModule(i)}
                suggestions={availableSuggestions}
                onUseSuggestion={handleUseSuggestion}
                onReleaseSuggestion={handleReleaseSuggestion}
              />
            ))}

            <button
              onClick={handleAddModule}
              disabled={!canAddModule}
              className={`text-sm px-4 py-2 rounded ${
                canAddModule
                  ? 'bg-primary text-white hover:bg-primary-hover'
                  : 'bg-gray-300 dark:bg-neutral-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              + Add Module
            </button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default CourseCreate;
