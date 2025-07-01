
import { useState, useEffect, useCallback } from 'react';

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

  // Check if extension is available
  const checkExtensionConnection = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    try {
      const connected = !!(window as any).chrome?.storage?.local && !!(window as any).chrome?.runtime;
      setIsExtensionConnected(connected);
      return connected;
    } catch (error) {
      console.log('Extension not available, running in test mode');
      setIsExtensionConnected(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkExtensionConnection();
    
    const interval = setInterval(() => {
      if (checkExtensionConnection()) {
        // Check for recordings from actual extension
        try {
          (window as any).chrome.storage.local.get(['lastRecording'], (result: any) => {
            if ((window as any).chrome.runtime.lastError) {
              console.error('Chrome storage error:', (window as any).chrome.runtime.lastError);
              return;
            }

            if (result.lastRecording && result.lastRecording.processed) {
              const recording = result.lastRecording;
              
              if (!lastRecording || recording.timestamp > lastRecording.timestamp) {
                console.log('New recording detected from extension:', recording);
                setLastRecording(recording);
                setHasNewRecording(true);
                
                (window as any).chrome.storage.local.set({
                  lastRecording: { ...recording, processed: false }
                });
              }
            }
          });
        } catch (error) {
          console.error('Error checking for recordings:', error);
        }
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [checkExtensionConnection, lastRecording]);

  const clearNewRecording = useCallback(() => {
    setHasNewRecording(false);
  }, []);

  // Simulate extension recording for testing
  const simulateExtensionRecording = useCallback(() => {
    const mockRecording: ExtensionRecording = {
      timestamp: Date.now(),
      transcript: "Today we discussed the fundamentals of React hooks, including useState and useEffect. We covered how to manage component state and side effects properly. The key takeaway is that hooks allow us to use state and other React features in functional components.",
      notes: "# React Hooks Lesson\n\n## Key Topics:\n- useState for state management\n- useEffect for side effects\n- Component lifecycle\n\n## Important Points:\n- Always use hooks at the top level\n- Don't call hooks conditionally\n- Clean up effects to prevent memory leaks\n\n## Best Practices:\n- Keep effects focused and specific\n- Use multiple useEffect hooks for different concerns\n- Always include cleanup functions when needed",
      processed: true
    };
    
    console.log('🎬 Simulating extension recording:', mockRecording);
    setLastRecording(mockRecording);
    setHasNewRecording(true);
  }, []);

  return {
    hasNewRecording,
    lastRecording,
    isExtensionConnected,
    clearNewRecording,
    simulateExtensionRecording
  };
};
