'use client';

import { useState } from 'react';
import Link from 'next/link';

const crisisResources = [
  {
    id: 1,
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "24/7 free and confidential support for people in distress and crisis prevention",
    type: "crisis",
    available: "24/7"
  },
  {
    id: 2,
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, 24/7 support via text message for anyone in crisis",
    type: "crisis", 
    available: "24/7"
  },
  {
    id: 3,
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    description: "Confidential support for domestic violence survivors and their loved ones",
    type: "crisis",
    available: "24/7"
  },
  {
    id: 4,
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service for mental health and substance abuse",
    type: "support",
    available: "24/7"
  }
];

const professionalResources = [
  {
    id: 1,
    name: "Psychology Today",
    description: "Find therapists, support groups, and treatment centers in your area",
    website: "psychologytoday.com",
    category: "therapy",
    icon: "ri-user-heart-line"
  },
  {
    id: 2,
    name: "BetterHelp",
    description: "Online counseling and therapy services with licensed professionals",
    website: "betterhelp.com",
    category: "therapy",
    icon: "ri-video-chat-line"
  },
  {
    id: 3,
    name: "Open Path Collective",
    description: "Affordable mental health services with sessions starting at $30-$60",
    website: "openpathcollective.org",
    category: "affordable",
    icon: "ri-heart-line"
  },
  {
    id: 4,
    name: "Mental Health America",
    description: "Mental health screening tools and educational resources",
    website: "mhanational.org",
    category: "education",
    icon: "ri-brain-line"
  },
  {
    id: 5,
    name: "NAMI (National Alliance on Mental Illness)",
    description: "Support groups, education, and advocacy for mental health",
    website: "nami.org",
    category: "support",
    icon: "ri-team-line"
  },
  {
    id: 6,
    name: "Therapy for Black Girls",
    description: "Mental health resources specifically for Black women and girls",
    website: "therapyforblackgirls.com",
    category: "specialized",
    icon: "ri-women-line"
  }
];

const selfCareApps = [
  {
    id: 1,
    name: "Headspace",
    description: "Guided meditation and mindfulness exercises",
    category: "meditation",
    icon: "ri-leaf-line"
  },
  {
    id: 2,
    name: "Calm", 
    description: "Sleep stories, meditation, and relaxation tools",
    category: "meditation",
    icon: "ri-moon-line"
  },
  {
    id: 3,
    name: "Sanvello",
    description: "Mood tracking, guided journeys, and anxiety support",
    category: "mood",
    icon: "ri-heart-pulse-line"
  },
  {
    id: 4,
    name: "Youper",
    description: "AI-powered emotional health assistant",
    category: "ai",
    icon: "ri-robot-line"
  }
];

const emergencyContacts = [
  {
    location: "United States",
    emergency: "911",
    crisis: "988"
  },
  {
    location: "Canada",
    emergency: "911", 
    crisis: "1-833-456-4566"
  },
  {
    location: "United Kingdom",
    emergency: "999",
    crisis: "116 123 (Samaritans)"
  },
  {
    location: "Australia",
    emergency: "000",
    crisis: "13 11 14 (Lifeline)"
  }
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('crisis');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="font-['Pacifico'] text-2xl text-purple-600">InnerGlow</h1>
            </Link>
            <div className="flex space-x-8">
              <Link href="/journal" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Journal</Link>
              <Link href="/voice-journal" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Voice Journal</Link>
              <Link href="/tracker" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Emotion Tracker</Link>
              <Link href="/rituals" className="text-gray-700 hover:text-purple-600 font-medium whitespace-nowrap cursor-pointer">Daily Rituals</Link>
              <Link href="/resources" className="text-purple-600 font-medium whitespace-nowrap cursor-pointer">Resources</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-heart-pulse-fill text-white text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You are not alone in your journey. Find professional support, crisis resources, and helpful tools to support your mental wellness.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <i className="ri-alert-fill text-red-500 text-lg"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Need immediate help?</h3>
              <p className="text-red-700 mb-3">If you're having thoughts of suicide or self-harm, please reach out for help right now.</p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:988" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Call 988 (Crisis Lifeline)
                </a>
                <button className="bg-red-100 hover:bg-red-200 text-red-800 px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  Text HOME to 741741
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm mb-8 p-2">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'crisis', label: 'Crisis Support', icon: 'ri-alarm-warning-line' },
              { id: 'therapy', label: 'Professional Help', icon: 'ri-user-heart-line' },
              { id: 'apps', label: 'Self-Care Apps', icon: 'ri-smartphone-line' },
              { id: 'emergency', label: 'Emergency Contacts', icon: 'ri-phone-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Crisis Support Tab */}
        {activeTab === 'crisis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-alarm-warning-line text-red-500 text-2xl mr-3"></i>
                Crisis Support Resources
              </h2>
              <p className="text-gray-600 mb-8">These resources provide immediate, confidential support when you need it most. All services are free and available 24/7.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {crisisResources.map((resource) => (
                  <div key={resource.id} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-400">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">{resource.available}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-600">{resource.phone}</span>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-phone-line mr-2"></i>
                        Call Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">💜 Remember</h3>
              <ul className="space-y-2 text-purple-800">
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-purple-600 mt-1"></i>
                  <span>You are not alone - help is available and people care about you</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-purple-600 mt-1"></i>
                  <span>Crisis feelings are temporary - you can get through this difficult time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="ri-check-line text-purple-600 mt-1"></i>
                  <span>Asking for help is a sign of strength, not weakness</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Professional Help Tab */}
        {activeTab === 'therapy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-user-heart-line text-purple-500 text-2xl mr-3"></i>
                Professional Mental Health Services
              </h2>
              <p className="text-gray-600 mb-8">Connect with licensed therapists, counselors, and mental health professionals who can provide ongoing support.</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionalResources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-xl p-6 border-2 border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <i className={`${resource.icon} text-purple-600 text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-600 font-medium capitalize">{resource.category}</span>
                      <button className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer whitespace-nowrap">
                        Visit Site <i className="ri-arrow-right-line ml-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <i className="ri-money-dollar-circle-line text-green-600 mr-2"></i>
                  Affordable Options
                </h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Community mental health centers</li>
                  <li>• University training clinics</li>
                  <li>• Sliding scale fee therapists</li>
                  <li>• Insurance-covered services</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <i className="ri-question-line text-blue-600 mr-2"></i>
                  How to Choose a Therapist
                </h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Check their credentials and specialties</li>
                  <li>• Consider therapy approach and style</li>
                  <li>• Verify insurance acceptance</li>
                  <li>• Trust your comfort level</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Self-Care Apps Tab */}
        {activeTab === 'apps' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-smartphone-line text-pink-500 text-2xl mr-3"></i>
                Mental Wellness Apps & Tools
              </h2>
              <p className="text-gray-600 mb-8">Support your mental health journey with these helpful apps and digital tools designed for self-care and emotional wellness.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {selfCareApps.map((app) => (
                  <div key={app.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                        <i className={`${app.icon} text-pink-600 text-xl`}></i>
                      </div>
                      <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full capitalize">{app.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{app.name}</h3>
                    <p className="text-gray-700 mb-4">{app.description}</p>
                    <div className="flex space-x-3">
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
                        <i className="ri-google-play-line mr-1"></i>
                        Google Play
                      </button>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
                        <i className="ri-app-store-line mr-1"></i>
                        App Store
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                <i className="ri-lightbulb-line text-amber-600 mr-2"></i>
                Digital Wellness Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-amber-800">
                <div>
                  <h4 className="font-medium mb-2">App Usage Guidelines:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Start with 5-10 minutes daily</li>
                    <li>• Be consistent with your practice</li>
                    <li>• Try different apps to find your fit</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Remember:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Apps complement but don't replace therapy</li>
                    <li>• Choose evidence-based tools</li>
                    <li>• Listen to your needs and preferences</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <i className="ri-phone-line text-red-500 text-2xl mr-3"></i>
                Emergency Contact Numbers
              </h2>
              <p className="text-gray-600 mb-8">Important phone numbers for emergencies and crisis situations by country. Save these numbers in your phone for quick access.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-400">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <i className="ri-map-pin-line text-red-500 mr-2"></i>
                      {contact.location}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Emergency Services</span>
                          <div className="text-2xl font-bold text-red-600">{contact.emergency}</div>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-phone-line mr-1"></i>
                          Call
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Crisis Support</span>
                          <div className="text-lg font-bold text-purple-600">{contact.crisis}</div>
                        </div>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                          <i className="ri-phone-line mr-1"></i>
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <i className="ri-information-line text-blue-700 mr-2"></i>
                When to Call Emergency Services
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">Call Emergency (911/999/000):</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Immediate threat to life</li>
                    <li>• Severe injury or medical emergency</li>
                    <li>• Active suicide attempt</li>
                    <li>• Violent behavior toward self or others</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Call Crisis Support:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Suicidal thoughts or feelings</li>
                    <li>• Emotional crisis or overwhelm</li>
                    <li>• Need someone to talk to</li>
                    <li>• Mental health support needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white mt-12">
          <h2 className="text-2xl font-bold mb-4">You Matter. Your Mental Health Matters.</h2>
          <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
            Taking care of your mental health is not selfish - it's necessary. Whether you need crisis support, 
            professional help, or just someone to listen, resources are available to help you through difficult times.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal" className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors cursor-pointer whitespace-nowrap">
              Continue Journaling
            </Link>
            <Link href="/rituals" className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap">
              Try Daily Rituals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}