
'use client';

import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="font-['Pacifico'] text-2xl text-purple-600 dark:text-purple-400">InnerGlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium whitespace-nowrap cursor-pointer">Sign In</Link>
              <Link href="/register" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap cursor-pointer">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-purple-100/50 dark:from-gray-800/50 dark:to-gray-700/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Journey to
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"> Inner Peace</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              A safe, private space for emotional healing through journaling, voice recording, mood tracking, and gentle self-care rituals. Begin your wellness journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
                Start Your Healing Journey
              </Link>
              <Link href="/login" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Healing Tools for Your Wellness</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover powerful features designed to support your emotional well-being and personal growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-800 dark:to-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-edit-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Sacred Journal</h3>
              <p className="text-gray-600 dark:text-gray-300">Express your thoughts and emotions in a private, secure space designed for healing</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-mic-fill text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Voice Journal</h3>
              <p className="text-gray-600 dark:text-gray-300">Sometimes speaking feels more natural - record your thoughts and feelings in your own voice</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-800 dark:to-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-line-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Emotion Tracker</h3>
              <p className="text-gray-600 dark:text-gray-300">Visualize your emotional patterns and discover insights about your mental wellness journey</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-3-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Daily Rituals</h3>
              <p className="text-gray-600 dark:text-gray-300">Nurture your soul with guided self-care practices for peace, clarity, and healing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose InnerGlow */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose InnerGlow?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Your mental health deserves the best care and attention</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-purple-600 dark:text-purple-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">100% Private & Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">Your thoughts, feelings, and personal data are completely private and encrypted for your safety</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-pulse-line text-pink-600 dark:text-pink-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Evidence-Based Approach</h3>
              <p className="text-gray-600 dark:text-gray-300">Our tools are rooted in proven therapeutic techniques and mental health best practices</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-24-hours-line text-green-600 dark:text-green-400 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Available 24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">Your healing journey doesn't follow a schedule - access support whenever you need it most</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Begin Your Healing Journey?</h2>
          <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto">
            Join thousands who have found peace, clarity, and emotional wellness through InnerGlow. 
            Your mental health matters, and you deserve support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg">
              Create Free Account
            </Link>
            <Link href="/login" className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer border-2 border-purple-500">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="font-['Pacifico'] text-2xl text-purple-400 mb-4">InnerGlow</h3>
              <p className="text-gray-400 max-w-md">
                Supporting your mental wellness journey with compassionate, evidence-based tools for emotional healing and personal growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:support@innerglow.com" className="hover:text-white transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="mailto:support@innerglow.com" className="hover:text-white transition-colors cursor-pointer">Contact Us</a></li>
                <li><Link href="/resources" className="hover:text-white transition-colors cursor-pointer">Crisis Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InnerGlow. Made with 💜 for your mental wellness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
