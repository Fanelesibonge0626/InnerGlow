
'use client';

import { useState } from 'react';

interface EntryFormProps {
  onSave: (entry: any) => void;
  onCancel: () => void;
  emotions: Array<{
    name: string;
    color: string;
    icon: string;
  }>;
}

export default function EntryForm({ onSave, onCancel, emotions }: EntryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !selectedEmotion) return;

    onSave({
      title: title.trim(),
      content: content.trim(),
      emotion: selectedEmotion
    });

    setTitle('');
    setContent('');
    setSelectedEmotion('');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">New Journal Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entry Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a meaningful title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                type="button"
                onClick={() => setSelectedEmotion(emotion.name)}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedEmotion === emotion.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${emotion.color}`}></div>
                <span className="text-sm font-medium capitalize">{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Thoughts
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Pour your heart out... Write about what's on your mind, how your day went, or anything you'd like to express."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors resize-none text-sm"
            rows={8}
            maxLength={500}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {content.length}/500 characters
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || !selectedEmotion}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Save Entry
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
