
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { RecordingControls } from '@/components/RecordingControls';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { NotesDisplay } from '@/components/NotesDisplay';
import { QuickActions } from '@/components/QuickActions';
import { RecentSessions } from '@/components/RecentSessions';

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasNotes, setHasNotes] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log('Recording started');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    setProcessingStep('Saving audio file...');
    
    // Simulate processing steps
    setTimeout(() => setProcessingStep('Transcribing with Whisper AI...'), 1000);
    setTimeout(() => setProcessingStep('Generating notes with Phi-3...'), 3000);
    setTimeout(() => setProcessingStep('Creating summary and quiz...'), 5000);
    setTimeout(() => {
      setIsProcessing(false);
      setHasNotes(true);
      setProcessingStep('');
    }, 7000);
  };

  const handleFileUpload = (file: File) => {
    console.log('Processing uploaded file:', file.name);
    setIsProcessing(true);
    setProcessingStep('Processing uploaded audio...');
    
    setTimeout(() => setProcessingStep('Transcribing audio...'), 1000);
    setTimeout(() => setProcessingStep('Generating intelligent notes...'), 3000);
    setTimeout(() => {
      setIsProcessing(false);
      setHasNotes(true);
      setProcessingStep('');
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
                  Start recording your class or upload an audio file to generate intelligent notes and summaries.
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
