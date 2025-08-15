'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VoiceEntry from './VoiceEntry';
import VoiceRecorder from './VoiceRecorder';
import { useAuth } from '../../lib/auth';
import ThemeToggle from '../../components/ThemeToggle';
import { db } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const emotions = [
  { name: 'grateful', color: 'bg-green-500', icon: 'ri-heart-3-fill' },
  { name: 'happy', color: 'bg-yellow-500', icon: 'ri-emotion-happy-fill' },
  { name: 'calm', color: 'bg-blue-500', icon: 'ri-leaf-fill' },
  { name: 'anxious', color: 'bg-orange-500', icon: 'ri-emotion-unhappy-fill' },
  { name: 'sad', color: 'bg-purple-500', icon: 'ri-drop-fill' },
  { name: 'angry', color: 'bg-red-500', icon: 'ri-fire-fill' },
  { name: 'confused', color: 'bg-gray-500', icon: 'ri-question-fill' },
  { name: 'excited', color: 'bg-pink-500', icon: 'ri-sparkling-fill' }
];

export default function VoiceJournal() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRecorder, setShowRecorder] = useState(false);

  const addEntry = async (newEntry: any) => {
    try {
      console.log('Adding voice entry...');
      console.log('User:', user);
      console.log('User ID:', user?.id);
      
      if (!user?.id) {
        console.error('No user ID available');
        alert('Please log in to save voice entries');
        return;
      }

      const entry = {
        ...newEntry,
        userId: user.id,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: new Date()
      };

      console.log('Voice entry to save:', entry);

      await addDoc(collection(db, 'voiceEntries'), entry);
      console.log('Voice entry saved successfully');
      setShowRecorder(false);
    } catch (error) {
      console.error('Error adding voice entry:', error);
      alert('Failed to save voice entry. Please try again.');
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'voiceEntries', id));
    } catch (error) {
      console.error('Error deleting voice entry:', error);
      alert('Failed to delete voice entry. Please try again.');
    }
  };

  // Load voice entries from Firebase
  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'voiceEntries'),
        where('userId', '==', user.id)
        // Note: orderBy removed to avoid Firebase index requirement
      ),
      (snapshot) => {
        const entriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort entries by createdAt on the client side
        const sortedEntries = entriesData.sort((a: any, b: any) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toDate() - a.createdAt.toDate();
          }
          return 0;
        });
        
        setEntries(sortedEntries);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading voice entries:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="font-['Pacifico'] text-2xl text-purple-600 dark:text-purple-400">InnerGlow</h1>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/journal" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Journal</Link>
              <Link href="/voice-journal" className="text-purple-600 dark:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Voice Journal</Link>
              <Link href="/tracker" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Emotion Tracker</Link>
              <Link href="/rituals" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Daily Rituals</Link>
              <Link href="/resources" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Resources</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-mic-fill text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Speak Your Truth</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Sometimes speaking feels more natural than writing. Record your thoughts and feelings in your own voice.</p>
          
          {!showRecorder && (
            <button
              onClick={() => setShowRecorder(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-mic-fill mr-2"></i>
              Record Voice Entry
            </button>
          )}
        </div>

        {/* Features Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-mic-fill text-purple-600 dark:text-purple-400 text-xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Easy Recording</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">One-click recording with your device microphone</p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-emotion-fill text-pink-600 dark:text-pink-400 text-xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Emotion Tagging</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tag each recording with your current feeling</p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-check-fill text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Private & Secure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your voice entries are stored securely and privately</p>
          </div>
        </div>

        {/* Voice Recorder */}
        {showRecorder && (
          <VoiceRecorder 
            onSave={addEntry} 
            onCancel={() => setShowRecorder(false)}
            emotions={emotions}
          />
        )}

        {/* Voice Entries */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Voice Entries</h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-loader-4-line text-4xl text-purple-500 dark:text-purple-400 animate-spin"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading your voice entries...</h3>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-mic-line text-4xl text-purple-500 dark:text-purple-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No voice entries yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Start by recording your first voice entry to begin your speaking journey</p>
            </div>
          ) : (
            entries.map((entry) => (
              <VoiceEntry key={entry.id} entry={entry} emotions={emotions} onDelete={deleteEntry} />
            ))
          )}
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Voice Journal Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <i className="ri-check-fill text-green-500 mt-1"></i>
              <span>Find a quiet, comfortable space where you feel safe to speak openly</span>
            </li>
            <li className="flex items-start space-x-2">
              <i className="ri-check-fill text-green-500 mt-1"></i>
              <span>Speak as if you're talking to your most trusted friend</span>
            </li>
            <li className="flex items-start space-x-2">
              <i className="ri-check-fill text-green-500 mt-1"></i>
              <span>Don't worry about perfect words - focus on expressing your authentic feelings</span>
            </li>
            <li className="flex items-start space-x-2">
              <i className="ri-check-fill text-green-500 mt-1"></i>
              <span>Listen back to your entries later to track your emotional journey</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}