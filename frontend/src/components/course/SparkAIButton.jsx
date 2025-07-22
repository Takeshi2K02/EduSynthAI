import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function SparkAIButton({
  onClick,
  loading = false,
  className = '',
  iconSize = 18,
  title = 'Generate with AI'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={loading}
      className={`absolute bottom-2 right-2 bg-primary text-white rounded-full p-1 hover:bg-primary-hover transition disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : (
        <Sparkles size={iconSize} />
      )}
    </button>
  );
}