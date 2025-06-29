
import React from 'react';

export const QuickActions = () => {
  const actions = [
    {
      label: 'Export Notes',
      icon: '📤',
      description: 'PDF, Word, Markdown',
      color: 'blue'
    },
    {
      label: 'Create Study Set',
      icon: '📚',
      description: 'Flashcards & Quiz',
      color: 'green'
    },
    {
      label: 'Share Session',
      icon: '👥',
      description: 'With classmates',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
      green: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full p-3 rounded-lg border transition-colors text-left ${getColorClasses(action.color)}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{action.icon}</span>
              <div>
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-75">{action.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
