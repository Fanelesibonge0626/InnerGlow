
'use client';

import { useState, useRef, useEffect } from 'react';
import { getRandomAffirmation, Affirmation } from '../../lib/affirmations';

interface VoiceRecorderProps {
  onSave: (entry: any) => void;
  onCancel: () => void;
  emotions: Array<{
    name: string;
    color: string;
    icon: string;
  }>;
}

export default function VoiceRecorder({ onSave, onCancel, emotions }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [title, setTitle] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);
  const [duration, setDuration] = useState(0);
  const [recordingError, setRecordingError] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    setRecordingError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      streamRef.current = stream;

      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        throw new Error('Audio recording is not supported in this browser');
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setRecordingError('Recording failed. Please try again.');
        stopRecording();
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setDuration(0);

      intervalRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      let errorMessage = 'Could not access microphone. ';

      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            errorMessage += 'Please allow microphone access and try again.';
            break;
          case 'NotFoundError':
            errorMessage += 'No microphone found. Please connect a microphone.';
            break;
          case 'NotSupportedError':
            errorMessage += 'Audio recording is not supported in this browser.';
            break;
          default:
            errorMessage += 'Please check your permissions and try again.';
        }
      } else {
        errorMessage += (error instanceof Error && error.message) ? error.message : 'Unknown error occurred.';
      }

      setRecordingError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl('');
    setDuration(0);
    setRecordingError('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateAffirmation = (emotion: string) => {
    const affirmation = getRandomAffirmation(emotion);
    setCurrentAffirmation(affirmation);
  };

  const refreshAffirmation = () => {
    if (selectedEmotion) {
      updateAffirmation(selectedEmotion);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedEmotion || !audioBlob) return;

    onSave({
      title: title.trim(),
      audioUrl,
      audioBlob,
      emotion: selectedEmotion,
      affirmation: currentAffirmation,
      duration: formatTime(duration),
      timestamp: Date.now()
    });

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setTitle('');
    setSelectedEmotion('');
    setAudioBlob(null);
    setAudioUrl('');
    setDuration(0);
    setRecordingError('');
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">New Voice Entry</h3>

      {recordingError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <i className="ri-error-warning-line text-red-500 mt-1 mr-3"></i>
            <div className="text-sm text-red-700">
              <p className="font-medium mb-1">Recording Error</p>
              <p>{recordingError}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entry Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your voice entry a meaningful title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emotions.map((emotion) => (
              <button
                key={emotion.name}
                type="button"
                onClick={() => {
                  setSelectedEmotion(emotion.name);
                  updateAffirmation(emotion.name);
                }}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedEmotion === emotion.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${emotion.color}`}></div>
                <span className="text-sm font-medium capitalize">{emotion.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Affirmation Display */}
        {selectedEmotion && currentAffirmation && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <i className="ri-heart-2-fill text-blue-500"></i>
                  <span className="text-sm font-medium text-blue-700 capitalize">
                    {currentAffirmation.category} • {currentAffirmation.intensity}
                  </span>
                </div>
                <p className="text-blue-800 text-lg font-medium leading-relaxed">
                  "{currentAffirmation.text}"
                </p>
              </div>
              <button
                type="button"
                onClick={refreshAffirmation}
                className="ml-4 p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                title="Get another affirmation"
              >
                <i className="ri-refresh-line text-lg"></i>
              </button>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
          <div className="text-center">
            {!audioBlob ? (
              <div className="space-y-4">
                {!isRecording ? (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={startRecording}
                      disabled={!!recordingError}
                      className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-300 mx-auto shadow-lg cursor-pointer"
                    >
                      <i className="ri-mic-fill text-3xl"></i>
                    </button>
                    <div className="space-y-2">
                      <p className="text-gray-600 font-medium">Ready to Record</p>
                      <p className="text-sm text-gray-500">Click the microphone to start recording</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <i className="ri-stop-fill text-3xl"></i>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                    </div>
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-stop-line mr-2"></i>
                      Stop Recording
                    </button>
                    <div className="space-y-2">
                      <div className="text-2xl font-mono text-red-600 font-semibold">
                        {formatTime(duration)}
                      </div>
                      <p className="text-red-600 font-medium">Recording in progress...</p>
                      <p className="text-sm text-gray-500">Speak clearly into your microphone</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <i className="ri-check-fill text-3xl"></i>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-mono text-green-600 font-semibold">
                    {formatTime(duration)}
                  </div>
                  <p className="text-green-600 font-medium">Recording completed!</p>
                  <p className="text-sm text-gray-500">Review your recording below</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center space-x-4">
                    <audio controls className="w-full max-w-md" preload="metadata">
                      <source src={audioUrl} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={deleteRecording}
                  className="text-red-500 hover:text-red-600 font-medium cursor-pointer whitespace-nowrap inline-flex items-center"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Record Again
                </button>
              </div>
            )}
          </div>

          {!isRecording && !audioBlob && (
            <div className="mt-6 bg-white/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                <i className="ri-lightbulb-line mr-2"></i>
                Recording Tips
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Find a quiet space for the best audio quality</li>
                <li>• Speak clearly and at a normal pace</li>
                <li>• Keep your device's microphone unobstructed</li>
                <li>• Take your time - there's no rush</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!title.trim() || !selectedEmotion || !audioBlob}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-save-line mr-2"></i>
            Save Voice Entry
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
