import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { RecordingControls } from '@/components/RecordingControls';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { NotesDisplay } from '@/components/NotesDisplay';
import { QuickActions } from '@/components/QuickActions';
import { RecentSessions } from '@/components/RecentSessions';
import { ExtensionIntegration } from '@/components/ExtensionIntegration';
import { processAudioFromExtension, simulateExtensionRecording } from '@/api/audioProcessor';

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasNotes, setHasNotes] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [currentNotes, setCurrentNotes] = useState('');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [processingError, setProcessingError] = useState<string | null>(null);

  // Handle recordings from Chrome extension
  const handleExtensionRecording = async (transcript: string, notes: string) => {
    console.log('🎯 New recording from extension received');
    
    try {
      setIsProcessing(true);
      setProcessingError(null);
      setHasNotes(false);
      
      // If we have actual transcript and notes from extension, use them directly
      if (transcript && notes && transcript.trim() && notes.trim()) {
        console.log('📝 Using provided transcript and notes from extension');
        setProcessingStep('Processing extension recording...');
        
        // Add a brief delay to show processing state
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCurrentTranscript(transcript);
        setCurrentNotes(notes);
        setHasNotes(true);
        setIsProcessing(false);
        setProcessingStep('');
        
        console.log('✅ Extension recording processed successfully');
      } else {
        // Otherwise simulate processing
        console.log('🔄 Simulating audio processing...');
        setProcessingStep('Analyzing audio content...');
        
        const result = await simulateExtensionRecording();
        
        setCurrentTranscript(result.transcript);
        setCurrentNotes(result.notes);
        setHasNotes(true);
        setIsProcessing(false);
        setProcessingStep('');
        
        console.log('✅ Simulated processing completed');
      }
    } catch (error) {
      console.error('❌ Error processing extension recording:', error);
      setProcessingError('Failed to process extension recording. Please try again.');
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  // Set up API endpoint for extension
  useEffect(() => {
    // Create a simple API endpoint that the extension can call
    const handleExtensionAPI = async (request: any) => {
      if (request.url?.includes('/api/process-audio')) {
        try {
          const formData = await request.formData();
          const audioFile = formData.get('audio') as File;
          
          if (audioFile) {
            const result = await processAudioFromExtension(audioFile);
            return new Response(JSON.stringify(result), {
              headers: { 'Content-Type': 'application/json' }
            });
          }
        } catch (error) {
          console.error('API Error:', error);
          return new Response(JSON.stringify({ error: 'Processing failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    };

    // This is a simple way to handle API calls - in production you'd use a proper server
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleExtensionAPI);
    }

    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleExtensionAPI);
      }
    };
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    setProcessingError(null);
    setHasNotes(false);
    console.log('🎤 Recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    setProcessingError(null);
    setProcessingStep('Saving audio file...');
    
    console.log('⏹️ Recording stopped, starting processing...');
    
    // Simulate processing steps with more realistic timing
    setTimeout(() => {
      setProcessingStep('Transcribing with Whisper AI...');
      console.log('🎯 Transcription phase started');
    }, 1000);
    
    setTimeout(() => {
      setProcessingStep('Generating notes with Phi-3...');
      console.log('📝 Note generation phase started');
    }, 3000);
    
    setTimeout(() => {
      setProcessingStep('Creating summary and quiz...');
      console.log('📊 Final processing phase');
    }, 5000);
    
    setTimeout(() => {
      setIsProcessing(false);
      setHasNotes(true);
      setProcessingStep('');
      // Set some mock content for live recording
      setCurrentTranscript('This is a mock transcript from your live recording session. The audio was captured successfully and processed using AI transcription.');
      setCurrentNotes('# Live Recording Notes\n\n## Summary:\n- Successfully recorded audio session\n- AI transcription completed\n- Notes generated automatically\n\n## Key Points:\n- Recording quality was good\n- Processing completed in real-time\n- Ready for review and editing');
      console.log('✅ Live recording processing completed');
    }, 7000);
  };

  const handleFileUpload = (file: File) => {
    console.log('📁 Processing uploaded file:', file.name, 'Size:', file.size);
    setIsProcessing(true);
    setProcessingError(null);
    setHasNotes(false);
    setProcessingStep('Processing uploaded audio...');
    
    setTimeout(() => {
      setProcessingStep('Transcribing audio content...');
      console.log('🎯 File transcription started');
    }, 1000);
    
    setTimeout(() => {
      setProcessingStep('Generating intelligent notes...');
      console.log('📝 Note generation from file');
    }, 3000);
    
    setTimeout(() => {
      setIsProcessing(false);
      setHasNotes(true);
      setProcessingStep('');
      // Set some mock content for uploaded file
      setCurrentTranscript('This is a mock transcript generated from your uploaded audio file. The file was successfully processed and converted to text.');
      setCurrentNotes('# Uploaded File Notes\n\n## File Information:\n- Successfully uploaded and processed\n- Audio quality detected and optimized\n- Transcription completed\n\n## Content Summary:\n- Main topics identified\n- Key concepts extracted\n- Notes formatted for easy reading');
      console.log('✅ File upload processing completed');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your AI Class Companion
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Record lectures, generate intelligent notes, and create study materials with the power of AI
          </p>
        </div>

        {/* Extension Integration Status */}
        <ExtensionIntegration onNewRecording={handleExtensionRecording} />

        {/* Error Display */}
        {processingError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-red-800 font-medium">Processing Error</span>
            </div>
            <p className="text-red-700 text-sm mt-2">{processingError}</p>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <RecordingControls
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
              onFileUpload={handleFileUpload}
            />
            
            <QuickActions />
            
            <RecentSessions />
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {isProcessing && (
              <ProcessingStatus
                step={processingStep}
                progress={processingStep.includes('Saving') ? 20 : 
                         processingStep.includes('Transcribing') ? 50 : 
                         processingStep.includes('Generating') ? 80 : 95}
              />
            )}
            
            {hasNotes && !isProcessing && <NotesDisplay />}
            
            {!isRecording && !isProcessing && !hasNotes && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-3">Ready to get started?</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Start recording your class, upload an audio file, or use the Chrome extension to generate intelligent notes and summaries.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={handleStartRecording}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Start Recording
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
