
'use client';

import { useState } from 'react';

const moodData: Record<string, { mood: string; intensity: number; hasVoice: boolean }> = {
  '2023-12-01': { mood: 'grateful', intensity: 8, hasVoice: true },
  '2023-12-03': { mood: 'anxious', intensity: 5, hasVoice: false },
  '2023-12-05': { mood: 'happy', intensity: 9, hasVoice: true },
  '2023-12-07': { mood: 'grateful', intensity: 7, hasVoice: false },
  '2023-12-09': { mood: 'happy', intensity: 8, hasVoice: true },
  '2023-12-11': { mood: 'sad', intensity: 6, hasVoice: false },
  '2023-12-13': { mood: 'grateful', intensity: 9, hasVoice: true },
  '2023-12-15': { mood: 'happy', intensity: 8, hasVoice: false },
};

const moodColors: Record<string, string> = {
  grateful: 'bg-pink-400',
  happy: 'bg-purple-400', 
  anxious: 'bg-amber-400',
  sad: 'bg-gray-400',
};

const moodEmojis: Record<string, string> = {
  grateful: '🙏',
  happy: '😊',
  anxious: '😰', 
  sad: '😢',
};

export default function MoodCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long' });
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push({ type: 'empty', index: i });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ type: 'day', value: day });
  }

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDayMood = (day: number) => {
    const dateStr = formatDate(day);
    return moodData[dateStr];
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            <i className="ri-calendar-line text-pink-500 text-xl"></i>
          </div>
          HerVoice Tracker
        </h3>
        <div className="text-lg font-medium text-gray-600">{monthName} {year}</div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <div key={dayName} className="text-center text-sm font-semibold text-gray-500 py-2">
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((dayItem, index) => {
          if (dayItem.type === 'empty') {
            return <div key={`empty-${dayItem.index}`} className="h-12"></div>;
          }

          const day = dayItem.value;
          if (day === undefined) return null;
          const mood = getDayMood(day);
          const dateStr = formatDate(day);
          
          return (
            <button
              key={`day-${day}`}
              onClick={() => setSelectedDate(selectedDate === dateStr ? null : dateStr)}
              className={`relative h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center ${
                selectedDate === dateStr 
                  ? 'border-pink-400 ring-2 ring-pink-200' 
                  : 'border-gray-100 hover:border-pink-200'
              } ${mood ? moodColors[mood.mood] : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <span className={`text-sm font-semibold ${mood ? 'text-white' : 'text-gray-600'}`}>
                {day}
              </span>
              
              {mood && (
                <>
                  <div className="absolute top-1 right-1">
                    <span className="text-xs">{moodEmojis[mood.mood]}</span>
                  </div>
                  {mood.hasVoice && (
                    <div className="absolute bottom-1 left-1">
                      <div className="w-2 h-2 flex items-center justify-center">
                        <i className="ri-mic-fill text-white text-xs"></i>
                      </div>
                    </div>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && moodData[selectedDate] && (
        <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{moodEmojis[moodData[selectedDate].mood]}</span>
              <div>
                <div className="font-semibold text-gray-800 capitalize">
                  {moodData[selectedDate].mood}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-gray-600 mr-2">Intensity:</div>
              <div className="flex">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`intensity-${i}`}
                    className={`w-2 h-2 mx-0.5 rounded-full ${
                      i < moodData[selectedDate].intensity 
                        ? moodColors[moodData[selectedDate].mood]
                        : 'bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-edit-line"></i>
              </div>
              Journal entry recorded
            </div>
            {moodData[selectedDate].hasVoice && (
              <div className="flex items-center text-gray-600">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-mic-line"></i>
                </div>
                Voice entry available
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(moodColors).map(([mood, colorClass]) => (
          <div key={mood} className="flex items-center">
            <div className={`w-4 h-4 rounded ${colorClass} mr-2`}></div>
            <span className="text-sm text-gray-600 capitalize">{mood}</span>
            <span className="text-xs ml-1">{moodEmojis[mood]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
