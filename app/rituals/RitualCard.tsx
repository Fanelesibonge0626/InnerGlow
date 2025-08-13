
'use client';

interface Ritual {
  id: number;
  category: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  borderColor: string;
}

interface RitualCardProps {
  ritual: Ritual;
  onStart: () => void;
}

export default function RitualCard({ ritual, onStart }: RitualCardProps) {
  return (
    <div className={`${ritual.color} backdrop-blur-sm rounded-2xl p-6 border ${ritual.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 flex items-center justify-center bg-white/70 rounded-full">
            <i className={`${ritual.icon} text-2xl text-gray-700`}></i>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full">
              {ritual.category}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700 bg-white/60 px-3 py-1 rounded-full">
            {ritual.duration}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900">
        {ritual.title}
      </h3>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        {ritual.description}
      </p>

      <button
        onClick={onStart}
        className="w-full bg-white/70 hover:bg-white text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-md whitespace-nowrap cursor-pointer"
      >
        Begin Practice
      </button>
    </div>
  );
}
