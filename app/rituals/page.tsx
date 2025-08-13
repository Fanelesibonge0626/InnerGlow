
'use client';

import { useState } from 'react';
import RitualCard from './RitualCard';
import ActiveRitual from './ActiveRitual';

export default function RitualsPage() {
  const [activeRitual, setActiveRitual] = useState<any>(null);

  const rituals = [
    {
      id: 1,
      category: 'Breathwork',
      title: '4-7-8 Calming Breath',
      description: 'A powerful breathing technique to reduce anxiety and promote deep relaxation',
      duration: '5 min',
      icon: 'ri-heart-pulse-line',
      color: 'bg-gradient-to-br from-blue-100 to-indigo-200',
      borderColor: 'border-blue-300',
      steps: [
        'Sit comfortably with your back straight',
        'Exhale completely through your mouth',
        'Close your mouth and inhale through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat this cycle 4 times'
      ]
    },
    {
      id: 2,
      category: 'Affirmations',
      title: 'Self-Love Morning Practice',
      description: 'Gentle affirmations to start your day with self-compassion and confidence',
      duration: '7 min',
      icon: 'ri-heart-3-line',
      color: 'bg-gradient-to-br from-pink-100 to-rose-200',
      borderColor: 'border-pink-300',
      affirmations: [
        'I am worthy of love and kindness, especially from myself',
        'My feelings are valid and deserve to be honored',
        'I choose to treat myself with the same compassion I show others',
        'I am growing and learning with each passing day',
        'My voice matters and my story is important',
        'I trust my inner wisdom and intuition',
        'I am enough, exactly as I am right now',
        'I deserve peace, joy, and healing in my life'
      ]
    },
    {
      id: 3,
      category: 'Mindfulness',
      title: 'Body Scan Meditation',
      description: 'Release tension and reconnect with your body through gentle awareness',
      duration: '10 min',
      icon: 'ri-leaf-line',
      color: 'bg-gradient-to-br from-green-100 to-emerald-200',
      borderColor: 'border-green-300',
      steps: [
        'Lie down comfortably or sit with your back supported',
        'Close your eyes and take three deep breaths',
        'Start by noticing the top of your head',
        'Slowly move your attention down through your face and neck',
        'Continue scanning through your shoulders, arms, and hands',
        'Notice your chest, heart, and breathing',
        'Move through your torso, hips, and legs',
        'End at your feet, then take a moment to feel your whole body'
      ]
    },
    {
      id: 4,
      category: 'Journaling',
      title: 'Gratitude & Release Practice',
      description: 'A guided writing practice to acknowledge blessings and let go of burdens',
      duration: '12 min',
      icon: 'ri-quill-pen-line',
      color: 'bg-gradient-to-br from-amber-100 to-orange-200',
      borderColor: 'border-amber-300',
      prompts: [
        'Write down 3 things you\'re grateful for today, no matter how small',
        'Describe one person who made you smile recently',
        'What is one thing your body did well for you today?',
        'Write about a moment when you felt truly peaceful',
        'What is one worry you\'re ready to release right now?',
        'How did you show kindness to yourself or others today?',
        'What is one hope you\'re holding for tomorrow?'
      ]
    },
    {
      id: 5,
      category: 'Movement',
      title: 'Gentle Energy Flow',
      description: 'Simple movements to release stagnant energy and invite flow',
      duration: '8 min',
      icon: 'ri-palette-line',
      color: 'bg-gradient-to-br from-purple-100 to-violet-200',
      borderColor: 'border-purple-300',
      movements: [
        'Stand with feet hip-width apart, arms at your sides',
        'Slowly roll your shoulders back and forward 5 times each',
        'Gently rotate your head left and right, then up and down',
        'Reach your arms up to the sky, then sweep them down',
        'Twist gently from side to side, letting your arms swing',
        'Take 5 deep breaths while swaying like a tree in the wind',
        'End by placing hands on your heart and taking 3 gratitude breaths'
      ]
    },
    {
      id: 6,
      category: 'Visualization',
      title: 'Safe Space Journey',
      description: 'Create a mental sanctuary where you feel completely protected and peaceful',
      duration: '15 min',
      icon: 'ri-home-heart-line',
      color: 'bg-gradient-to-br from-teal-100 to-cyan-200',
      borderColor: 'border-teal-300',
      visualization: [
        'Close your eyes and take several deep, calming breaths',
        'Imagine yourself in a place where you feel completely safe and at peace',
        'This might be a cozy room, a beautiful garden, or by the ocean',
        'Notice all the details - what do you see, hear, smell, and feel?',
        'Who or what is with you in this space? Feel their loving presence',
        'Create a protective boundary around this space - maybe light or energy',
        'Know that you can return to this sanctuary anytime you need comfort',
        'Take a few more breaths, then slowly open your eyes'
      ]
    }
  ];

  if (activeRitual) {
    return <ActiveRitual ritual={activeRitual} onClose={() => setActiveRitual(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mx-auto mb-6">
            <i className="ri-heart-3-line text-3xl text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Daily Rituals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nurture your soul with gentle self-care practices designed to bring peace, 
            clarity, and healing to your day
          </p>
        </div>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rituals.map((ritual) => (
            <RitualCard
              key={ritual.id}
              ritual={ritual}
              onStart={() => setActiveRitual(ritual)}
            />
          ))}
        </div>

        {/* Daily Wisdom */}
        <div className="mt-16 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-pink-200">
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-4">
              <i className="ri-sun-line text-2xl text-white"></i>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's Gentle Reminder</h2>
            <blockquote className="text-lg text-gray-700 italic max-w-2xl mx-auto leading-relaxed">
              "Healing isn't about erasing your story, but about learning to hold it with compassion. 
              Every small act of self-care is a love letter to your future self."
            </blockquote>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How Your Rituals Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4">
                <i className="ri-heart-pulse-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Choose Your Practice</h3>
              <p className="text-gray-600">Select a ritual that resonates with your current needs and emotional state</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4">
                <i className="ri-time-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Follow the Guidance</h3>
              <p className="text-gray-600">Let our gentle instructions guide you through each step at your own pace</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4">
                <i className="ri-heart-3-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Feel the Peace</h3>
              <p className="text-gray-600">Experience deeper connection with yourself and lasting inner calm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
