import { useState } from 'react';
import YouTube from 'react-youtube';
import { markItemComplete } from '../api/progress';

export default function YouTubeResourcePlayer({ resource, userId, courseId, onComplete = () => {} }) {
  const [completed, setCompleted] = useState(false);

  const handleEnd = async () => {
    if (completed) return;

    try {
      await markItemComplete({
        userId,
        courseId,
        itemType: 'resource',
        itemId: resource._id
      });

      setCompleted(true);
      onComplete();
    } catch (err) {
      console.error('Failed to mark resource complete:', err);
    }
  };

  const videoId = new URL(resource.videoUrl).searchParams.get('v');

  return (
    <div className="space-y-2">
      <YouTube
        videoId={videoId}
        opts={{ width: '100%', height: '360' }}
        onEnd={handleEnd}
      />
      {completed ? (
        <p className="text-green-600">✓ Resource completed</p>
      ) : (
        <p className="text-gray-500">Watch until the end to complete</p>
      )}
    </div>
  );
}
