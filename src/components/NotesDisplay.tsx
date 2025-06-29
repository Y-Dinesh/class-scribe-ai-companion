
import React, { useState } from 'react';

export const NotesDisplay = () => {
  const [activeTab, setActiveTab] = useState('notes');

  const sampleNotes = {
    title: "Introduction to Machine Learning - Lecture 5",
    date: "March 15, 2024",
    duration: "1h 23m",
    transcript: `Today we're going to dive deep into supervised learning algorithms. We'll start with linear regression, which is one of the most fundamental algorithms in machine learning.

Linear regression attempts to model the relationship between two variables by fitting a linear equation to observed data. The steps to perform linear regression are:

1. Collect and prepare the data
2. Choose a linear model
3. Train the model using the training data
4. Evaluate the model performance
5. Make predictions on new data

The key concept here is that we're trying to find the best line that fits through our data points. This line is defined by the equation y = mx + b, where m is the slope and b is the y-intercept.`,
    
    notes: [
      {
        section: "Key Concepts",
        points: [
          "Supervised learning uses labeled training data",
          "Linear regression models relationships between variables",
          "Goal is to find the best-fitting line through data points",
          "Equation format: y = mx + b (slope-intercept form)"
        ]
      },
      {
        section: "Implementation Steps",
        points: [
          "Data collection and preprocessing",
          "Model selection (linear in this case)",
          "Training phase using training dataset",
          "Performance evaluation with test data",
          "Prediction on new, unseen data"
        ]
      },
      {
        section: "Important Formulas",
        points: [
          "Linear equation: y = mx + b",
          "Cost function: Mean Squared Error (MSE)",
          "Gradient descent for optimization"
        ]
      }
    ],
    
    summary: "This lecture introduced supervised learning with a focus on linear regression. Linear regression is a fundamental ML algorithm that models relationships between variables using a straight line equation (y = mx + b). The process involves data collection, model training, evaluation, and prediction. Key takeaway: Linear regression finds the best-fitting line through data points to make predictions on new data.",
    
    quiz: [
      {
        question: "What is the standard form of a linear equation in machine learning?",
        options: ["y = mx + b", "y = ax² + bx + c", "y = e^x", "y = log(x)"],
        correct: 0
      },
      {
        question: "What type of learning does linear regression fall under?",
        options: ["Unsupervised learning", "Reinforcement learning", "Supervised learning", "Semi-supervised learning"],
        correct: 2
      },
      {
        question: "What is the main goal of linear regression?",
        options: ["Classify data into categories", "Find the best-fitting line through data", "Cluster similar data points", "Generate new data"],
        correct: 1
      }
    ]
  };

  const tabs = [
    { id: 'notes', label: 'Smart Notes', icon: '📝' },
    { id: 'summary', label: 'Summary', icon: '📋' },
    { id: 'quiz', label: 'Practice Quiz', icon: '🧠' },
    { id: 'transcript', label: 'Transcript', icon: '📄' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{sampleNotes.title}</h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
              <span>{sampleNotes.date}</span>
              <span>•</span>
              <span>{sampleNotes.duration}</span>
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
            {sampleNotes.notes.map((section, index) => (
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
            ))}
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="prose max-w-none">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">📚 Lecture Summary</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">{sampleNotes.summary}</p>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">🧠 Practice Quiz</h3>
              <p className="text-green-700">Test your understanding of today's lecture</p>
            </div>
            
            {sampleNotes.quiz.map((question, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-3">
                  {index + 1}. {question.question}
                </h4>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-slate-50">
                      <input type="radio" name={`question-${index}`} className="text-blue-600" />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="prose max-w-none">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">📄 Full Transcript</h3>
              <p className="text-slate-600 text-sm">Auto-generated using Whisper AI</p>
            </div>
            <div className="whitespace-pre-line text-slate-700 leading-relaxed font-mono text-sm bg-slate-50 p-4 rounded-lg">
              {sampleNotes.transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
