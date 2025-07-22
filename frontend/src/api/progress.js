// src/api/progress.js
export async function markItemComplete({ userId, courseId, itemType, itemId }) {
  const res = await fetch('/api/progress/mark-complete', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include' // send cookies if using auth
    },
    body: JSON.stringify({
      userId,
      courseId,
      itemType, // 'lesson' | 'resource' | 'quiz'
      itemId
    })
  });

  if (!res.ok) {
    console.error('❌ Failed to mark item complete');
  }

  return res.json();
}