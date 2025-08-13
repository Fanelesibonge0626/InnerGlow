
'use client';

import { useState, useEffect } from 'react';

interface ActiveRitualProps {
  ritual: any;
  onClose: () => void;
}

export default function ActiveRitual({ ritual, onClose }: ActiveRitualProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const getContent = () => {
    if (ritual.steps) return ritual.steps;
    if (ritual.affirmations) return ritual.affirmations;
    if (ritual.prompts) return ritual.prompts;
    if (ritual.movements) return ritual.movements;
    if (ritual.visualization) return ritual.visualization;
    return [];
  };

  const content = getContent();
  const isLastStep = currentStep >= content.length - 1;

  const nextStep = () => {
    if (isLastStep) {
      setIsCompleted(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-pink-200">
            <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-6">
              <i className="ri-check-line text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Practice Complete</h1>
            <p className="text-xl text-gray-600 mb-2">You spent {formatTime(timer)} in self-care</p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Beautiful work taking this time for yourself. Notice how you feel right now - 
              this sense of calm and presence is always available to you.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentStep(0);
                  resetTimer();
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Practice Again
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Return to Rituals
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span>Back to Rituals</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">{ritual.title}</h1>
            <p className="text-gray-600">{ritual.category}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono text-gray-800 bg-white/70 px-4 py-2 rounded-lg">
              {formatTime(timer)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {content.length}</span>
            <span>{Math.round(((currentStep + 1) / content.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / content.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-200 mb-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 flex items-center justify-center ${ritual.color} rounded-full mx-auto mb-4`}>
              <i className={`${ritual.icon} text-2xl text-gray-700`}></i>
            </div>
            {ritual.category === 'Affirmations' && (
              <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                "{content[currentStep]}"
              </p>
            )}
            {ritual.category !== 'Affirmations' && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {content[currentStep]}
              </p>
            )}
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            {!isTimerRunning && timer === 0 && (
              <button
                onClick={startTimer}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-play-line"></i>
                <span>Start Practice</span>
              </button>
            )}
            {!isTimerRunning && timer > 0 && (
              <button
                onClick={startTimer}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-play-line"></i>
                <span>Resume</span>
              </button>
            )}
            {isTimerRunning && (
              <button
                onClick={pauseTimer}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-pause-line"></i>
                <span>Pause</span>
              </button>
            )}
            {timer > 0 && (
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-refresh-line"></i>
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <i className="ri-arrow-left-line"></i>
              <span>Previous</span>
            </button>
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-md text-white px-6 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer"
            >
              <span>{isLastStep ? 'Complete' : 'Next'}</span>
              <i className={isLastStep ? "ri-check-line" : "ri-arrow-right-line"}></i>
            </button>
          </div>
        </div>

        {/* Breathing Guide for Breathwork */}
        {ritual.category === 'Breathwork' && (
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Breathing Guide</h3>
              <p className="text-blue-700 text-sm">
                Follow the rhythm: Inhale for 4, Hold for 7, Exhale for 8
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
