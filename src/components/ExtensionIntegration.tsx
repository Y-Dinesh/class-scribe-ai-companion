
import React from 'react';
import { useExtensionAPI } from '@/hooks/useExtensionAPI';

interface ExtensionIntegrationProps {
  onNewRecording: (transcript: string, notes: string) => void;
}

export const ExtensionIntegration: React.FC<ExtensionIntegrationProps> = ({ onNewRecording }) => {
  const { hasNewRecording, lastRecording, clearNewRecording } = useExtensionAPI();

  React.useEffect(() => {
    if (hasNewRecording && lastRecording) {
      onNewRecording(lastRecording.transcript, lastRecording.notes);
      clearNewRecording();
    }
  }, [hasNewRecording, lastRecording, onNewRecording, clearNewRecording]);

  const isExtensionConnected = typeof chrome !== 'undefined' && chrome.storage;

  return (
    <div className="mb-6">
      <div className={`p-4 rounded-lg border ${
        isExtensionConnected 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isExtensionConnected ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <span className={`text-sm font-medium ${
            isExtensionConnected ? 'text-green-800' : 'text-yellow-800'
          }`}>
            {isExtensionConnected 
              ? '✅ Chrome Extension Connected' 
              : '⚠️ Install Chrome Extension for Quick Recording'
            }
          </span>
        </div>
        {!isExtensionConnected && (
          <p className="text-xs text-yellow-700 mt-2">
            The Chrome extension allows you to record from any webpage and automatically sync notes here.
          </p>
        )}
      </div>
    </div>
  );
};
