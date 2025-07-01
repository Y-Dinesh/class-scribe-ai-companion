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
      setProcessingStep('Processing extension recording...');
      
      // Simulate processing time to show the UI working
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep('Analyzing transcript...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep('Generating smart notes...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set the actual content from the extension
      setCurrentTranscript(transcript);
      setCurrentNotes(notes);
      setHasNotes(true);
      setIsProcessing(false);
      setProcessingStep('');
      
      console.log('✅ Extension recording processed successfully');
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
    setCurrentTranscript('');
    setCurrentNotes('');
    console.log('🎤 Recording started');
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);
    setProcessingError(null);
    setProcessingStep('Saving audio file...');
    
    console.log('⏹️ Recording stopped, starting processing...');
    
    try {
      // Simulate processing steps
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep('Transcribing with Whisper AI...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessingStep('Generating notes with AI...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessingStep('Creating summary and quiz...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set mock content for live recording
      setCurrentTranscript('Welcome to today\'s lesson on advanced React patterns. We\'ll be covering several important concepts including component composition, render props, and higher-order components. These patterns help us write more reusable and maintainable React code. Component composition allows us to build complex UIs from simpler building blocks by combining components together. This approach promotes code reuse and makes our applications more modular and easier to understand.');
      
      setCurrentNotes('# Advanced React Patterns - Live Recording\n\n## Key Topics Covered:\n\n### Component Composition\n- Building complex UIs from simple components\n- Promotes code reuse and modularity\n- Makes applications easier to understand\n\n### Render Props Pattern\n- Sharing code between components using function props\n- Provides flexibility in component behavior\n- Enables cross-cutting concerns\n\n### Higher-Order Components (HOCs)\n- Functions that enhance components with additional functionality\n- Useful for authentication, logging, and data fetching\n- Should be used sparingly in modern React\n\n## Best Practices:\n- Keep components small and focused\n- Use composition over inheritance\n- Document component APIs clearly\n- Test components in isolation\n\n## Next Steps:\n- Practice implementing these patterns\n- Review provided code examples\n- Complete homework assignment on component refactoring');
      
      setIsProcessing(false);
      setHasNotes(true);
      setProcessingStep('');
      
      console.log('✅ Live recording processing completed');
    } catch (error) {
      console.error('❌ Error processing live recording:', error);
      setProcessingError('Failed to process recording. Please try again.');
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleFileUpload = async (file: File) => {
    console.log('📁 Processing uploaded file:', file.name, 'Size:', file.size);
    setIsProcessing(true);
    setProcessingError(null);
    setHasNotes(false);
    setProcessingStep('Processing uploaded audio...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep('Transcribing audio content...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setProcessingStep('Generating intelligent notes...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set mock content for uploaded file
      setCurrentTranscript('This is a comprehensive lecture on machine learning fundamentals. We begin with an introduction to supervised learning algorithms, focusing on linear regression as our primary example. Linear regression is a statistical method that models the relationship between a dependent variable and one or more independent variables using a linear equation. The process involves collecting data, preparing it for analysis, selecting an appropriate model, training the model using our dataset, and finally evaluating its performance on new, unseen data.');
      
      setCurrentNotes('# Machine Learning Fundamentals - Uploaded File\n\n## Core Concepts:\n\n### Supervised Learning\n- Uses labeled training data to make predictions\n- Includes regression and classification problems\n- Requires ground truth data for training\n\n### Linear Regression\n- Models relationships using linear equations\n- Formula: y = mx + b (slope-intercept form)\n- Finds best-fitting line through data points\n\n### Model Training Process\n1. **Data Collection**: Gather relevant dataset\n2. **Data Preparation**: Clean and preprocess data\n3. **Model Selection**: Choose appropriate algorithm\n4. **Training Phase**: Learn from training data\n5. **Evaluation**: Test on validation set\n6. **Prediction**: Apply to new data\n\n## Key Metrics:\n- Mean Squared Error (MSE) for evaluation\n- R-squared for goodness of fit\n- Cross-validation for robust testing\n\n## Important Notes:\n- Always split data into train/validation/test sets\n- Watch out for overfitting and underfitting\n- Feature selection impacts model performance\n- Regular validation prevents memorization of training data');
      
      setIsProcessing(false);
      setHasNotes(true);
      setProcessingStep('');
      
      console.log('✅ File upload processing completed');
    } catch (error) {
      console.error('❌ Error processing uploaded file:', error);
      setProcessingError('Failed to process uploaded file. Please try again.');
      setIsProcessing(false);
      setProcessingStep('');
    }
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
            
            {hasNotes && !isProcessing && (
              <NotesDisplay 
                transcript={currentTranscript}
                notes={currentNotes}
                title="AI Generated Notes"
              />
            )}
            
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
