import React, { useState } from 'react';
import CommonLayout from '../components/CommonLayout';
import { Image } from 'lucide-react';

const CourseCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

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

  return (
    <CommonLayout>
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row gap-6 items-stretch h-full">
          {/* Image Upload */}
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

          {/* Title + Description */}
          <div className="flex-1 flex flex-col h-full">
            {/* Title */}
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

            {/* Description fills exact remaining height */}
            <textarea
              placeholder="Course description"
              className="w-full px-4 pt-3 pb-10 rounded border bg-neutral-100 dark:bg-neutral-800 resize-none flex-1"
              style={{ minHeight: '0' }} // ensures flex-1 fills space precisely
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default CourseCreate;
