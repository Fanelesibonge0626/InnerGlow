
'use client';

import Link from 'next/link';
import { useAuth } from '../../lib/auth';
import ProtectedRoute from '../../components/ProtectedRoute';
import EmotionChart from './EmotionChart';
import MoodCalendar from './MoodCalendar';

function TrackerContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="font-[('Pacifico')] text-2xl text-purple-600">InnerGlow</h1>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/journal" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Journal</Link>
              <Link href="/voice-journal" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Voice Journal</Link>
              <Link href="/tracker" className="text-purple-600 font-medium whitespace-nowrap cursor-pointer">Emotion Tracker</Link>
              <Link href="/rituals" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Daily Rituals</Link>
              <Link href="/resources" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Resources</Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-logout-circle-line mr-1"></i>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Emotional Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your emotions over time and discover patterns in your mental wellness. 
            Understanding your emotional rhythms is a powerful step toward healing and self-awareness.
          </p>
        </div>

        <div className="space-y-12">
          <EmotionChart />
          <MoodCalendar />
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <i className="ri-heart-line text-pink-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Total Entries</h3>
              <div className="text-3xl font-bold text-pink-500 mb-2">47</div>
              <p className="text-sm text-gray-600">Journal & voice entries this month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="ri-calendar-check-line text-purple-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Days</h3>
              <div className="text-3xl font-bold text-purple-500 mb-2">18</div>
              <p className="text-sm text-gray-600">Days with emotional check-ins</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <i className="ri-trophy-line text-amber-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Longest Streak</h3>
              <div className="text-3xl font-bold text-amber-500 mb-2">7</div>
              <p className="text-sm text-gray-600">Consecutive days of journaling</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <i className="ri-lightbulb-line text-yellow-500 text-xl"></i>
              </div>
              Personalized Insights
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-plant-line text-green-600 text-sm"></i>
                    </div>
                    Growth Pattern
                  </h4>
                  <p className="text-sm text-green-700">
                    Your gratitude entries have steadily increased, showing remarkable emotional growth over the past two weeks.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-time-line text-blue-600 text-sm"></i>
                    </div>
                    Best Time to Journal
                  </h4>
                  <p className="text-sm text-blue-700">
                    You tend to write more positive entries in the evening. Consider making this your regular reflection time.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-mic-line text-purple-600 text-sm"></i>
                    </div>
                    Voice Preference
                  </h4>
                  <p className="text-sm text-purple-700">
                    You use voice entries more on anxious days. Speaking your feelings seems to help process difficult emotions.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4">
                  <h4 className="font-semibold text-rose-800 mb-2 flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-heart-pulse-line text-rose-600 text-sm"></i>
                    </div>
                    Wellness Tip
                  </h4>
                  <p className="text-sm text-rose-700">
                    Your mood improves significantly after gratitude journaling. Try dedicating 5 minutes daily to what you're thankful for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackerPage() {
  return (
    <ProtectedRoute>
      <TrackerContent />
    </ProtectedRoute>
  );
}
