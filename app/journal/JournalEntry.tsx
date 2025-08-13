
'use client';

interface JournalEntryProps {
  entry: {
    id: string;
    title: string;
    content: string;
    emotion: string;
    date: string;
    time: string;
  };
  emotions: Array<{
    name: string;
    color: string;
    icon: string;
  }>;
  onDelete?: (id: string) => void;
}

export default function JournalEntry({ entry, emotions, onDelete }: JournalEntryProps) {
  const getEmotionStyle = (emotionName: string) => {
    const emotion = emotions.find(e => e.name === emotionName);
    return emotion ? emotion.color : 'bg-gray-500';
  };

  const getEmotionIcon = (emotionName: string) => {
    const emotion = emotions.find(e => e.name === emotionName);
    return emotion ? emotion.icon : 'ri-emotion-normal-line';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{entry.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{entry.date}</span>
            <span>{entry.time}</span>
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
      
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
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
