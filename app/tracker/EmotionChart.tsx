
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function EmotionChart() {
  const { user } = useAuth();
  const [emotionData, setEmotionData] = useState<any[]>([]);
  const [emotionSummary, setEmotionSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch journal and voice entries for tracking
  useEffect(() => {
    if (!user?.id) return;

    let journalUnsubscribe: (() => void) | null = null;
    let voiceUnsubscribe: (() => void) | null = null;

    // Fetch journal entries
    journalUnsubscribe = onSnapshot(
      query(
        collection(db, 'journalEntries'),
        where('userId', '==', user.id),
        orderBy('createdAt', 'desc')
      ),
      (snapshot) => {
        const journalEntries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'journal'
        }));

        // Fetch voice entries
        voiceUnsubscribe = onSnapshot(
          query(
            collection(db, 'voiceEntries'),
            where('userId', '==', user.id),
            orderBy('createdAt', 'desc')
          ),
          (voiceSnapshot) => {
            const voiceEntries = voiceSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              type: 'voice'
            }));

            // Combine and process all entries
            const allEntries = [...journalEntries, ...voiceEntries];
            const processedData = processEmotionData(allEntries);
            setEmotionData(processedData.lineData);
            setEmotionSummary(processedData.pieData);
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

  const processEmotionData = (entries: any[]) => {
    // Group entries by date and emotion
    const dailyEmotions: Record<string, Record<string, number>> = {};
    const emotionCounts: Record<string, number> = {};

    entries.forEach(entry => {
      const date = entry.date || new Date(entry.createdAt?.toDate()).toLocaleDateString();
      const emotion = entry.emotion;

      if (!dailyEmotions[date]) {
        dailyEmotions[date] = {};
      }
      if (!dailyEmotions[date][emotion]) {
        dailyEmotions[date][emotion] = 0;
      }
      dailyEmotions[date][emotion]++;

      if (!emotionCounts[emotion]) {
        emotionCounts[emotion] = 0;
      }
      emotionCounts[emotion]++;
    });

    // Convert to line chart format
    const lineData = Object.entries(dailyEmotions).map(([date, emotions]) => ({
      date,
      grateful: emotions.grateful || 0,
      happy: emotions.happy || 0,
      anxious: emotions.anxious || 0,
      sad: emotions.sad || 0,
      calm: emotions.calm || 0,
      angry: emotions.angry || 0,
      confused: emotions.confused || 0,
      excited: emotions.excited || 0,
      hopeful: emotions.hopeful || 0
    }));

    // Convert to pie chart format
    const totalEntries = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0);
    const pieData = Object.entries(emotionCounts).map(([emotion, count]) => ({
      name: emotion,
      value: totalEntries > 0 ? Math.round((count / totalEntries) * 100) : 0,
      color: getEmotionColor(emotion)
    }));

    return { lineData, pieData };
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      grateful: '#ec4899',
      happy: '#a855f7',
      calm: '#3b82f6',
      anxious: '#f59e0b',
      sad: '#6b7280',
      angry: '#ef4444',
      confused: '#8b5cf6',
      excited: '#ec4899',
      hopeful: '#10b981'
    };
    return colors[emotion] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
          <div className="flex items-center justify-center h-80">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-loader-4-line text-4xl text-purple-500 animate-spin"></i>
              </div>
              <p className="text-gray-600">Loading your emotional journey...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-6 h-6 flex items-center justify-center mr-3">
            <i className="ri-line-chart-line text-pink-500 text-xl"></i>
          </div>
          Your Emotional Journey
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={emotionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #f1f5f9',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="grateful" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="happy" 
                stroke="#a855f7" 
                strokeWidth={3}
                dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#a855f7', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="anxious" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="sad" 
                stroke="#6b7280" 
                strokeWidth={3}
                dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#6b7280', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-3">
              <i className="ri-pie-chart-line text-purple-500 text-lg"></i>
            </div>
            Emotion Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionSummary}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {emotionSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #f1f5f9',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {emotionSummary.map((emotion, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: emotion.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">{emotion.name}</span>
                </div>
                <span className="text-sm text-gray-500">{emotion.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-3">
              <i className="ri-heart-pulse-line text-pink-500 text-lg"></i>
            </div>
            Wellness Insights
          </h3>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-arrow-up-line text-green-500 text-sm"></i>
                </div>
                <span className="text-sm font-semibold text-green-600">Positive Trend</span>
              </div>
              <p className="text-xs text-gray-600">Your gratitude levels have increased by 25% this week</p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-alert-line text-orange-500 text-sm"></i>
                </div>
                <span className="text-sm font-semibold text-orange-600">Watch Out</span>
              </div>
              <p className="text-xs text-gray-600">Anxiety peaked on Dec 11th - consider self-care practices</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-lightbulb-line text-purple-500 text-sm"></i>
                </div>
                <span className="text-sm font-semibold text-purple-600">Insight</span>
              </div>
              <p className="text-xs text-gray-600">Your happiest days align with gratitude journal entries</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-star-line text-blue-500 text-sm"></i>
                </div>
                <span className="text-sm font-semibold text-blue-600">Goal Progress</span>
              </div>
              <p className="text-xs text-gray-600">12 journal entries this month - you're on track!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
