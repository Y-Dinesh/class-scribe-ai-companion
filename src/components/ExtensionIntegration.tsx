
import React from 'react';
import { useExtensionAPI } from '@/hooks/useExtensionAPI';

interface ExtensionIntegrationProps {
  onNewRecording: (transcript: string, notes: string) => void;
}

export const ExtensionIntegration: React.FC<ExtensionIntegrationProps> = ({ onNewRecording }) => {
  const { hasNewRecording, lastRecording, isExtensionConnected, clearNewRecording, simulateExtensionRecording } = useExtensionAPI();

  React.useEffect(() => {
    if (hasNewRecording && lastRecording) {
      console.log('Processing new recording from extension');
      onNewRecording(lastRecording.transcript, lastRecording.notes);
      clearNewRecording();
    }
  }, [hasNewRecording, lastRecording, onNewRecording, clearNewRecording]);

  return (
    <div className="mb-6">
      <div className={`p-4 rounded-lg border ${
        isExtensionConnected 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isExtensionConnected ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              isExtensionConnected ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {isExtensionConnected 
                ? '✅ Chrome Extension Connected' 
                : '⚠️ Chrome Extension Not Detected'
              }
            </span>
          </div>
          
          {/* Test button for development */}
          <button
            onClick={simulateExtensionRecording}
            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
          >
            Test Extension
          </button>
        </div>
        
        {!isExtensionConnected && (
          <div className="mt-3">
            <p className="text-xs text-yellow-700 mb-2">
              The Chrome extension allows you to record from any webpage and automatically sync notes here.
            </p>
            <p className="text-xs text-yellow-600">
              📝 <strong>For testing:</strong> Click "Test Extension" to simulate a recording from the extension.
            </p>
          </div>
        )}
        
        {isExtensionConnected && (
          <p className="text-xs text-green-700 mt-2">
            Extension is ready to receive recordings. Use the extension popup to start recording on any webpage.
          </p>
        )}
      </div>
    </div>
  );
};
