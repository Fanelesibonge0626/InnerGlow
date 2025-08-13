
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/auth';
import ProtectedRoute from '../../components/ProtectedRoute';
import JournalEntry from './JournalEntry';
import EntryForm from './EntryForm';
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

function JournalContent() {
  const { user, logout } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const addEntry = async (newEntry: any) => {
    try {
      const entry = {
        ...newEntry,
        userId: user?.id,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: new Date()
      };
      
      await addDoc(collection(db, 'journalEntries'), entry);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to save journal entry. Please try again.');
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'journalEntries', id));
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete journal entry. Please try again.');
    }
  };

  // Load entries from Firebase
  useEffect(() => {
    if (!user?.id) return;

    const q = query(
      collection(db, 'journalEntries'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntries(entriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="font-[\'Pacifico\'] text-2xl text-purple-600 dark:text-purple-400">InnerGlow</h1>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/journal" className="text-purple-600 dark:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Journal</Link>
              <Link href="/voice-journal" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Voice Journal</Link>
              <Link href="/tracker" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Emotion Tracker</Link>
              <Link href="/rituals" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Daily Rituals</Link>
              <Link href="/resources" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Resources</Link>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user?.firstName}</span>
                <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">
                  <i className="ri-user-line mr-1"></i>
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-logout-circle-line mr-1"></i>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Sacred Journal</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Express your thoughts and emotions in this safe, private space</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              Write New Entry
            </button>
          )}
        </div>

        {/* Emotion Guide */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">How are you feeling today?</h3>
          <div className="flex flex-wrap gap-3">
            {emotions.map((emotion) => (
              <div key={emotion.name} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${emotion.color}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{emotion.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entry Form */}
        {showForm && (
          <EntryForm
            onSave={addEntry}
            onCancel={() => setShowForm(false)}
            emotions={emotions}
          />
        )}

        {/* Journal Entries */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Entries</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-purple-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-loader-4-line text-4xl text-purple-500 dark:text-gray-400 animate-spin"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Loading your journal...</h3>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-purple-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-edit-line text-4xl text-purple-500 dark:text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No entries yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Start your healing journey by writing your first entry</p>
            </div>
          ) : (
            entries.map((entry) => (
              <JournalEntry key={entry.id} entry={entry} emotions={emotions} onDelete={deleteEntry} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function Journal() {
  return (
    <ProtectedRoute>
      <JournalContent />
    </ProtectedRoute>
  );
}
