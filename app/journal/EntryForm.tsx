
'use client';

import { useState, useEffect } from 'react';
import { getRandomAffirmation, type Affirmation } from '../../lib/affirmations';

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
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);

  // Update affirmation when emotion changes
  useEffect(() => {
    if (selectedEmotion) {
      const affirmation = getRandomAffirmation(selectedEmotion);
      setCurrentAffirmation(affirmation);
    } else {
      setCurrentAffirmation(null);
    }
  }, [selectedEmotion]);

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

        {/* Affirmation Display */}
        {currentAffirmation && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-heart-3-fill text-white text-sm"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-800 mb-1">A gentle reminder for you:</h4>
                  <p className="text-purple-700 text-sm leading-relaxed italic">
                    "{currentAffirmation.text}"
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {currentAffirmation.category}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {currentAffirmation.intensity}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newAffirmation = getRandomAffirmation(selectedEmotion);
                  setCurrentAffirmation(newAffirmation);
                }}
                className="ml-3 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                title="Get another affirmation"
              >
                <i className="ri-refresh-line text-lg"></i>
              </button>
            </div>
          </div>
        )}

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
