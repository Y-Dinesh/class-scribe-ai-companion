
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
  const [isExtensionConnected, setIsExtensionConnected] = useState(false);

  useEffect(() => {
    // Check if extension is available
    const checkExtensionConnection = () => {
      const connected = typeof window !== 'undefined' && 
                       window.chrome && 
                       window.chrome.storage && 
                       window.chrome.runtime;
      setIsExtensionConnected(!!connected);
      return !!connected;
    };

    // Check for new recordings from extension
    const checkForRecordings = () => {
      if (checkExtensionConnection()) {
        try {
          window.chrome!.storage.local.get(['lastRecording'], (result) => {
            if (window.chrome!.runtime.lastError) {
              console.error('Chrome storage error:', window.chrome!.runtime.lastError);
              return;
            }

            if (result.lastRecording && result.lastRecording.processed) {
              const recording = result.lastRecording;
              
              // Check if this is a new recording
              if (!lastRecording || recording.timestamp > lastRecording.timestamp) {
                console.log('New recording detected from extension:', recording);
                setLastRecording(recording);
                setHasNewRecording(true);
                
                // Clear the processed flag to avoid re-processing
                window.chrome!.storage.local.set({
                  lastRecording: { ...recording, processed: false }
                });
              }
            }
          });
        } catch (error) {
          console.error('Error checking for recordings:', error);
        }
      }
    };

    // Initial check
    checkExtensionConnection();
    
    // Set up interval to check for recordings
    const interval = setInterval(checkForRecordings, 2000);
    
    // Check immediately
    checkForRecordings();
    
    return () => clearInterval(interval);
  }, [lastRecording]);

  const clearNewRecording = () => {
    setHasNewRecording(false);
  };

  // Simulate extension recording for testing
  const simulateExtensionRecording = () => {
    const mockRecording: ExtensionRecording = {
      timestamp: Date.now(),
      transcript: "Today we discussed the fundamentals of React hooks, including useState and useEffect. We covered how to manage component state and side effects properly.",
      notes: "# React Hooks Lesson\n\n## Key Topics:\n- useState for state management\n- useEffect for side effects\n- Component lifecycle\n\n## Important Points:\n- Always use hooks at the top level\n- Don't call hooks conditionally\n- Clean up effects to prevent memory leaks",
      processed: true
    };
    
    console.log('Simulating extension recording:', mockRecording);
    setLastRecording(mockRecording);
    setHasNewRecording(true);
  };

  return {
    hasNewRecording,
    lastRecording,
    isExtensionConnected,
    clearNewRecording,
    simulateExtensionRecording
  };
};
