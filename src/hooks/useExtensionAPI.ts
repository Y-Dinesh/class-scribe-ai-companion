
import { useState, useEffect } from 'react';

interface ExtensionRecording {
  timestamp: number;
  transcript: string;
  notes: string;
  processed: boolean;
}

export const useExtensionAPI = () => {
  const [hasNewRecording, setHasNewRecording] = useState(false);
  const [lastRecording, setLastRecording] = useState<ExtensionRecording | null>(null);

  useEffect(() => {
    // Check for new recordings from extension every 2 seconds
    const checkForRecordings = () => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['lastRecording'], (result) => {
          if (result.lastRecording && result.lastRecording.processed) {
            const recording = result.lastRecording;
            
            // Check if this is a new recording
            if (!lastRecording || recording.timestamp > lastRecording.timestamp) {
              setLastRecording(recording);
              setHasNewRecording(true);
              
              // Clear the processed flag to avoid re-processing
              chrome.storage.local.set({
                lastRecording: { ...recording, processed: false }
              });
            }
          }
        });
      }
    };

    const interval = setInterval(checkForRecordings, 2000);
    
    // Check immediately
    checkForRecordings();
    
    return () => clearInterval(interval);
  }, [lastRecording]);

  const clearNewRecording = () => {
    setHasNewRecording(false);
  };

  return {
    hasNewRecording,
    lastRecording,
    clearNewRecording
  };
};
