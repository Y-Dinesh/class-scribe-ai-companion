
import React from 'react';
import { useExtensionAPI } from '@/hooks/useExtensionAPI';

interface ExtensionIntegrationProps {
  onNewRecording: (transcript: string, notes: string) => void;
}

export const ExtensionIntegration: React.FC<ExtensionIntegrationProps> = ({ onNewRecording }) => {
  const { hasNewRecording, lastRecording, isExtensionConnected, clearNewRecording, simulateExtensionRecording } = useExtensionAPI();

  React.useEffect(() => {
    if (hasNewRecording && lastRecording) {
      console.log('📥 Processing new recording from extension');
      onNewRecording(lastRecording.transcript, lastRecording.notes);
      clearNewRecording();
    }
  }, [hasNewRecording, lastRecording, onNewRecording, clearNewRecording]);

  return (
    <div className="mb-6">
      <div className={`p-4 rounded-lg border ${
        isExtensionConnected 
          ? 'bg-green-50 border-green-200' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isExtensionConnected ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              isExtensionConnected ? 'text-green-800' : 'text-blue-800'
            }`}>
              {isExtensionConnected 
                ? '✅ Chrome Extension Connected' 
                : '🧪 Demo Mode - Test Extension Features'
              }
            </span>
          </div>
          
          <button
            onClick={simulateExtensionRecording}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            Test Recording
          </button>
        </div>
        
        <div className="mt-3">
          <p className="text-xs text-blue-700 mb-2">
            {isExtensionConnected 
              ? 'Extension is ready to receive recordings. Use the extension popup to start recording on any webpage.'
              : 'Click "Test Recording" to simulate a recording from the Chrome extension and see how notes are generated.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};
