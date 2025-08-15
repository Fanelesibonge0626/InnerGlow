
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const moodColors: Record<string, string> = {
  grateful: 'bg-pink-400',
  happy: 'bg-purple-400', 
  calm: 'bg-blue-400',
  anxious: 'bg-amber-400',
  sad: 'bg-gray-400',
  angry: 'bg-red-400',
  confused: 'bg-purple-400',
  excited: 'bg-pink-400',
  hopeful: 'bg-green-400'
};

const moodEmojis: Record<string, string> = {
  grateful: '🙏',
  happy: '😊',
  calm: '😌',
  anxious: '😰', 
  sad: '😢',
  angry: '😠',
  confused: '😕',
  excited: '🤩',
  hopeful: '✨'
};

export default function MoodCalendar() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moodData, setMoodData] = useState<Record<string, { mood: string; intensity: number; hasVoice: boolean }>>({});
  const [loading, setLoading] = useState(true);
  
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

  // Fetch journal and voice entries for mood tracking
  useEffect(() => {
    if (!user?.id) return;

    let journalUnsubscribe: (() => void) | null = null;
    let voiceUnsubscribe: (() => void) | null = null;

    // Fetch journal entries
    journalUnsubscribe = onSnapshot(
      query(
        collection(db, 'journalEntries'),
        where('userId', '==', user.id)
        // Note: orderBy removed to avoid Firebase index requirement
      ),
      (snapshot) => {
        const journalEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];

        // Fetch voice entries
        voiceUnsubscribe = onSnapshot(
          query(
            collection(db, 'voiceEntries'),
            where('userId', '==', user.id)
            // Note: orderBy removed to avoid Firebase index requirement
          ),
          (voiceSnapshot) => {
            const voiceEntries = voiceSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as any[];

            // Process mood data for calendar
            const processedMoodData: Record<string, { mood: string; intensity: number; hasVoice: boolean }> = {};
            
            // Process journal entries
            journalEntries.forEach((entry: any) => {
              const date = entry.date || new Date(entry.createdAt?.toDate()).toLocaleDateString();
              const emotion = entry.emotion;
              
              if (emotion) {
                processedMoodData[date] = {
                  mood: emotion,
                  intensity: entry.intensity || 5,
                  hasVoice: false
                };
              }
            });

            // Process voice entries
            voiceEntries.forEach((entry: any) => {
              const date = entry.date || new Date(entry.createdAt?.toDate()).toLocaleDateString();
              const emotion = entry.emotion;
              
              if (emotion) {
                if (processedMoodData[date]) {
                  // If date already has an entry, mark it as having voice
                  processedMoodData[date].hasVoice = true;
                } else {
                  // Create new entry for this date
                  processedMoodData[date] = {
                    mood: emotion,
                    intensity: entry.intensity || 5,
                    hasVoice: true
                  };
                }
              }
            });

            // Sort entries by date (most recent first)
            const sortedDates = Object.keys(processedMoodData).sort((a, b) => {
              return new Date(b).getTime() - new Date(a).getTime();
            });

            // Reorder the mood data by sorted dates
            const sortedMoodData: Record<string, { mood: string; intensity: number; hasVoice: boolean }> = {};
            sortedDates.forEach(date => {
              sortedMoodData[date] = processedMoodData[date];
            });

            setMoodData(sortedMoodData);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching voice entries:', error);
            setLoading(false);
          }
        );
      },
      (error) => {
        console.error('Error fetching journal entries:', error);
        setLoading(false);
      }
    );

    return () => {
      if (journalUnsubscribe) journalUnsubscribe();
      if (voiceUnsubscribe) voiceUnsubscribe();
    };
  }, [user?.id]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-loader-4-line text-4xl text-purple-500 animate-spin"></i>
            </div>
            <p className="text-gray-600">Loading your mood calendar...</p>
          </div>
        </div>
      </div>
    );
  }

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
