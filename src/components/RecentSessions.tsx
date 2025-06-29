
import React from 'react';

export const RecentSessions = () => {
  const sessions = [
    {
      title: "Machine Learning Basics",
      date: "March 15, 2024",
      duration: "1h 23m",
      status: "completed"
    },
    {
      title: "Data Structures & Algorithms",
      date: "March 14, 2024",
      duration: "2h 15m",
      status: "completed"
    },
    {
      title: "Web Development Frameworks",
      date: "March 13, 2024",
      duration: "1h 45m",
      status: "completed"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Sessions</h2>
      
      <div className="space-y-3">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-slate-800 text-sm">{session.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{session.date}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-600">{session.duration}</span>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Complete</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
        View All Sessions →
      </button>
    </div>
  );
};
