
import React, { useState } from 'react';

interface NotesDisplayProps {
  transcript?: string;
  notes?: string;
  title?: string;
}

export const NotesDisplay: React.FC<NotesDisplayProps> = ({ 
  transcript = '', 
  notes = '', 
  title = 'AI Generated Notes'
}) => {
  const [activeTab, setActiveTab] = useState('notes');

  // Parse the notes content to extract structured information
  const parsedNotes = React.useMemo(() => {
    if (!notes) return { sections: [], summary: '', quiz: [] };
    
    const lines = notes.split('\n');
    const sections: { section: string; points: string[] }[] = [];
    let currentSection = '';
    let currentPoints: string[] = [];
    
    lines.forEach(line => {
      if (line.startsWith('## ') || line.startsWith('### ')) {
        if (currentSection) {
          sections.push({ section: currentSection, points: currentPoints });
        }
        currentSection = line.replace(/^#{2,3}\s/, '');
        currentPoints = [];
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        currentPoints.push(line.replace(/^[-*]\s/, ''));
      } else if (line.match(/^\d+\./)) {
        currentPoints.push(line.replace(/^\d+\.\s/, ''));
      }
    });
    
    if (currentSection) {
      sections.push({ section: currentSection, points: currentPoints });
    }
    
    return { sections, summary: notes.split('\n').slice(0, 3).join(' '), quiz: [] };
  }, [notes]);

  const tabs = [
    { id: 'notes', label: 'Smart Notes', icon: '📝' },
    { id: 'summary', label: 'Summary', icon: '📋' },
    { id: 'transcript', label: 'Transcript', icon: '📄' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
              <span>{new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span>AI Generated</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {parsedNotes.sections.length > 0 ? (
              parsedNotes.sections.map((section, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{section.section}</h3>
                  <ul className="space-y-2">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                {notes || 'No notes available yet. Start a recording or upload an audio file to generate notes.'}
              </div>
            )}
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="prose max-w-none">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">📚 Content Summary</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {notes ? 
                notes.split('\n').slice(0, 5).join(' ').replace(/#{1,6}\s/g, '') : 
                'No summary available yet. Process some audio content to generate a summary.'
              }
            </p>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="prose max-w-none">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">📄 Full Transcript</h3>
              <p className="text-slate-600 text-sm">Auto-generated transcription</p>
            </div>
            <div className="whitespace-pre-line text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
              {transcript || 'No transcript available yet. Start a recording or upload an audio file to generate a transcript.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
