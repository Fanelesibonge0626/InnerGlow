
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/auth';
import { useTheme } from '../../lib/theme';
import ThemeToggle from '../../components/ThemeToggle';

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyInsights: true,
    journalPrompts: false,
    goalUpdates: true
  });
  const [reminderTime, setReminderTime] = useState('20:00');
  const [exportLoading, setExportLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    timezone: 'UTC-5',
    language: 'English'
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Profile update logic would go here
    alert('Profile updated successfully!');
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDataExport = async (type: string) => {
    setExportLoading(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = {
      journalEntries: [],
      voiceEntries: [],
      emotionData: []
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `innerglow-${type}-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportLoading(false);
  };

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
              <Link href="/journal" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Journal</Link>
              <Link href="/voice-journal" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Voice Journal</Link>
              <Link href="/tracker" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Emotion Tracker</Link>
              <Link href="/rituals" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Daily Rituals</Link>
              <Link href="/resources" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Resources</Link>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <span className="text-gray-700 dark:text-gray-300">Welcome, {user?.firstName}</span>
                <Link href="/profile" className="text-purple-600 dark:text-purple-400 font-medium whitespace-nowrap cursor-pointer">Profile</Link>
                <button 
                  onClick={() => logout()}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium whitespace-nowrap cursor-pointer"
                >
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
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-user-line text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Profile</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[ 
              { id: 'profile', label: 'Profile', icon: 'ri-user-line' },
              { id: 'notifications', label: 'Notifications', icon: 'ri-notification-line' },
              { id: 'export', label: 'Data Export', icon: 'ri-download-line' },
              { id: 'preferences', label: 'Preferences', icon: 'ri-settings-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-3 pr-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-7">Mountain Time (UTC-7)</option>
                      <option value="UTC-6">Central Time (UTC-6)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                    <select
                      value={profileData.language}
                      onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 pr-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  Update Profile
                </button>
              </form>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {[ 
                    { key: 'dailyReminder' as const, label: 'Daily Check-in Reminder', description: 'Get reminded to record your daily emotions and thoughts' },
                    { key: 'weeklyInsights' as const, label: 'Weekly Insights', description: 'Receive weekly summaries of your emotional patterns' },
                    { key: 'journalPrompts' as const, label: 'Journal Prompts', description: 'Get inspiring prompts when you haven\'t journaled in a while' },
                    { key: 'goalUpdates' as const, label: 'Goal Progress Updates', description: 'Notifications about your wellness goals and achievements' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(item.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          notifications[item.key] ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-800 transition-transform ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Daily Reminder Time</h4>
                  <div className="flex items-center space-x-4">
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">We'll send you a gentle reminder at this time each day</span>
                  </div>
                </div>
              </div>
            )}

            {/* Data Export Tab */}
            {activeTab === 'export' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Export Your Data</h3>
                  <p className="text-gray-600 dark:text-gray-400">Download your journal entries, voice recordings, and emotion data</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-pink-500 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-file-text-line text-white dark:text-gray-300 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Journal Entries</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Export all your written journal entries as JSON or PDF</p>
                    <button
                      onClick={() => handleDataExport('journal')}
                      disabled={exportLoading}
                      className="bg-pink-500 dark:bg-gray-600 hover:bg-pink-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {exportLoading ? 'Exporting...' : 'Export Journal'}
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-mic-line text-white dark:text-gray-300 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Voice Entries</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Download your voice recordings and metadata</p>
                    <button
                      onClick={() => handleDataExport('voice')}
                      disabled={exportLoading}
                      className="bg-purple-500 dark:bg-gray-600 hover:bg-purple-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {exportLoading ? 'Exporting...' : 'Export Voice'}
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-bar-chart-line text-white dark:text-gray-300 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Emotion Data</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Export your mood tracking and emotional insights</p>
                    <button
                      onClick={() => handleDataExport('emotions')}
                      disabled={exportLoading}
                      className="bg-blue-500 dark:bg-gray-600 hover:bg-blue-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {exportLoading ? 'Exporting...' : 'Export Data'}
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-gray-900/20 border border-yellow-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-start">
                    <i className="ri-information-line text-yellow-600 dark:text-gray-300 mt-1 mr-3"></i>
                    <div className="text-sm text-yellow-800 dark:text-gray-400">
                      <p className="font-medium mb-1">Data Export Information</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Exported data includes all entries from your account creation date</li>
                        <li>Voice recordings are exported as audio files with metadata</li>
                        <li>All data is exported in standard formats for easy import elsewhere</li>
                        <li>Your data remains private and is never shared with third parties</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">App Theme</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[ 
                      { value: 'light', label: 'Light Mode', icon: 'ri-sun-line' },
                      { value: 'dark', label: 'Dark Mode', icon: 'ri-moon-line' }
                    ].map((themeOption) => (
                      <button
                        key={themeOption.value}
                        onClick={() => setTheme(themeOption.value as 'light' | 'dark')}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          theme === themeOption.value
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                        }`}
                      >
                        <i className={`${themeOption.icon} text-xl ${theme === themeOption.value ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}></i>
                        <span className={`font-medium ${theme === themeOption.value ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'}`}>{themeOption.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <h4 className="font-medium text-red-900 dark:text-red-400 mb-4">Danger Zone</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-red-800 dark:text-red-300 mb-2">Delete All Data</h5>
                      <p className="text-sm text-red-700 dark:text-red-400 mb-3">Permanently delete all your journal entries, voice recordings, and emotional data. This action cannot be undone.</p>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
                        Delete All Data
                      </button>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-800 dark:text-red-300 mb-2">Delete Account</h5>
                      <p className="text-sm text-red-700 dark:text-red-400 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
