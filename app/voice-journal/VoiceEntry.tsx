'use client';

// Force new deployment - Vercel needs to pick up latest changes
interface VoiceEntryProps {
  entry: {
    id: string;
    title: string;
    audioDownloadURL?: string;
    audioBlob?: Blob;
    audioUrl?: string;
    emotion: string;
    affirmation?: {
      text: string;
      category: string;
      intensity: string;
    };
    date: string;
    time: string;
    duration: string;
  };
  emotions: Array<{
    name: string;
    color: string;
    icon: string;
  }>;
  onDelete?: (id: string) => void;
}

export default function VoiceEntry({ entry, emotions, onDelete }: VoiceEntryProps) {
  const getEmotionStyle = (emotionName: string) => {
    const emotion = emotions.find(e => e.name === emotionName);
    return emotion ? emotion.color : 'bg-gray-500';
  };

  const getEmotionIcon = (emotionName: string) => {
    const emotion = emotions.find(e => e.name === emotionName);
    return emotion ? emotion.icon : 'ri-emotion-normal-line';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{entry.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{entry.date}</span>
            <span>{entry.time}</span>
            <div className="flex items-center space-x-2">
              <i className="ri-time-line"></i>
              <span>{entry.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getEmotionStyle(entry.emotion)}`}></div>
              <span className="capitalize">{entry.emotion}</span>
            </div>
          </div>
        </div>
        <div className={`w-12 h-12 ${getEmotionStyle(entry.emotion)} rounded-full flex items-center justify-center`}>
          <i className={`${getEmotionIcon(entry.emotion)} text-white text-xl`}></i>
        </div>
      </div>
      
      {/* Affirmation Display */}
      {entry.affirmation && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-heart-2-fill text-blue-500 text-sm"></i>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-medium text-blue-700 capitalize">
                  {entry.affirmation.category} • {entry.affirmation.intensity}
                </span>
              </div>
              <p className="text-blue-800 text-sm leading-relaxed">
                "{entry.affirmation.text}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Audio Player */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <i className="ri-volume-up-fill text-white text-xl"></i>
          </div>
          <div className="flex-1">
            {entry.audioDownloadURL ? (
              <audio controls className="w-full">
                <source src={entry.audioDownloadURL} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            ) : entry.audioBlob ? (
              <audio controls className="w-full">
                <source src={URL.createObjectURL(entry.audioBlob)} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            ) : entry.audioUrl ? (
              <audio controls className="w-full">
                <source src={entry.audioUrl} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <i className="ri-error-warning-line text-2xl mb-2"></i>
                <p>Audio not available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button className="text-gray-400 hover:text-purple-500 p-2 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
          <i className="ri-edit-line"></i>
        </button>
        <button 
          onClick={() => onDelete?.(entry.id)}
          className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
        >
          <i className="ri-delete-bin-line"></i>
        </button>
      </div>
    </div>
  );
}