'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CancellationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  userId: string;
}

type FlowStep = 'initial' | 'congrats' | 'downsell';
type JobFoundAnswer = 'yes' | 'no' | null;
type DownsellVariant = 'A' | 'B';

interface SurveyAnswers {
  foundJobWithMigrateMate: string;
  rolesApplied: string;
  companiesEmailed: string;
  companiesInterviewed: string;
}

export default function CancellationFlow({ isOpen, onClose, subscriptionId, userId }: CancellationFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('initial');
  const [jobFoundAnswer, setJobFoundAnswer] = useState<JobFoundAnswer>(null);
  const [downsellVariant, setDownsellVariant] = useState<DownsellVariant>('A');
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({
    foundJobWithMigrateMate: '',
    rolesApplied: '',
    companiesEmailed: '',
    companiesInterviewed: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Determine downsell variant on first load
  useEffect(() => {
    if (isOpen && currentStep === 'initial') {
      // Simple A/B testing - assign variant based on user ID hash
      const hash = userId.split('').reduce((a, b) => {
        a = ((a << 5) - a + b.charCodeAt(0)) & 0xffffffff;
        return a;
      }, 0);
      setDownsellVariant(hash % 2 === 0 ? 'A' : 'B');
    }
  }, [isOpen, currentStep, userId]);

  // Validate form completion
  useEffect(() => {
    if (currentStep === 'congrats') {
      const isValid = Object.values(surveyAnswers).every(answer => answer !== '');
      setIsFormValid(isValid);
    }
  }, [surveyAnswers, currentStep]);

  const handleJobFoundAnswer = (answer: JobFoundAnswer) => {
    setJobFoundAnswer(answer);
    if (answer === 'yes') {
      setCurrentStep('congrats');
    } else {
      setCurrentStep('downsell');
    }
  };

  const handleSurveyAnswerChange = (question: keyof SurveyAnswers, value: string) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const handleContinue = async () => {
    if (currentStep === 'congrats') {
      // Save survey answers and proceed to downsell
      try {
        await supabase
          .from('cancellations')
          .insert({
            user_id: userId,
            subscription_id: subscriptionId,
            downsell_variant: downsellVariant,
            reason: JSON.stringify(surveyAnswers)
          });
        
        setCurrentStep('downsell');
      } catch (error) {
        console.error('Error saving survey answers:', error);
      }
    }
  };

  const handleDownsellResponse = async (accepted: boolean) => {
    try {
      if (accepted) {
        // Update cancellation record to show downsell was accepted
        await supabase
          .from('cancellations')
          .update({ accepted_downsell: true })
          .eq('user_id', userId)
          .eq('subscription_id', subscriptionId);
      }
      
      // Close the flow
      onClose();
    } catch (error) {
      console.error('Error handling downsell response:', error);
    }
  };

  const handleBack = () => {
    if (currentStep === 'congrats') {
      setCurrentStep('initial');
      setJobFoundAnswer(null);
    } else if (currentStep === 'downsell') {
      setCurrentStep('initial');
      setJobFoundAnswer(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {currentStep !== 'initial' && (
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          
          <h1 className="text-xl font-semibold text-gray-900 mx-auto">
            Subscription Cancellation
          </h1>
          
          {/* Progress indicator */}
          {currentStep !== 'initial' && (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className={`w-2 h-2 rounded-full ${currentStep === 'congrats' ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                <div className={`w-2 h-2 rounded-full ${currentStep === 'downsell' ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              <span className="text-sm text-gray-500">
                Step {currentStep === 'congrats' ? '1' : '2'} of 3
              </span>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex">
          {/* Left Content */}
          <div className="flex-1 p-6">
            {currentStep === 'initial' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Hey mate,</h2>
                  <h3 className="text-xl font-bold text-gray-900">Quick one before you go.</h3>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-gray-900 italic mb-4">
                    Have you found a job yet?
                  </p>
                  <p className="text-gray-600 text-lg">
                    Whatever your answer, we just want to help you take the next step. 
                    With visa support, or by hearing how we can do better.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleJobFoundAnswer('yes')}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900 font-medium"
                  >
                    Yes, I've found a job
                  </button>
                  <button
                    onClick={() => handleJobFoundAnswer('no')}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900 font-medium"
                  >
                    Not yet - I'm still looking
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'congrats' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Congrats on the new role! 🎉
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Did you find this job with MigrateMate?*
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Yes', 'No'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSurveyAnswerChange('foundJobWithMigrateMate', option)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            surveyAnswers.foundJobWithMigrateMate === option
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      How many roles did you apply for through Migrate Mate?*
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {['0', '1-5', '6-20', '20+'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSurveyAnswerChange('rolesApplied', option)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            surveyAnswers.rolesApplied === option
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      How many companies did you email directly?*
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {['0', '1-5', '6-20', '20+'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSurveyAnswerChange('companiesEmailed', option)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            surveyAnswers.companiesEmailed === option
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      How many different companies did you interview with?*
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {['0', '1-2', '3-5', '5+'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSurveyAnswerChange('companiesInterviewed', option)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                            surveyAnswers.companiesInterviewed === option
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleContinue}
                  disabled={!isFormValid}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                    isFormValid
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            )}

            {currentStep === 'downsell' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    We built this to help you land the job, this makes it a little easier.
                  </h2>
                  <p className="text-gray-600 text-lg">
                    We've been there and we're here to help you.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Here's {downsellVariant === 'A' ? '50% off' : '$10 off'} until you find a job.
                  </h3>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ${downsellVariant === 'A' ? '12.50' : '15'}/month
                    </span>
                    <span className="text-gray-500 line-through">
                      ${downsellVariant === 'A' ? '25' : '25'}/month
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleDownsellResponse(true)}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mb-3"
                  >
                    Get {downsellVariant === 'A' ? '50% off' : '$10 off'}
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    You won't be charged until your next billing date.
                  </p>
                </div>
                
                <button
                  onClick={() => handleDownsellResponse(false)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  No thanks
                </button>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="w-1/3 bg-cover bg-center" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 600\'%3E%3Cdefs%3E%3ClinearGradient id=\'sky\' x1=\'0%25\' y1=\'0%25\' x2=\'0%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23003366;stop-opacity:1\' /%3E%3Cstop offset=\'50%25\' style=\'stop-color:%23663399;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23cc6699;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\'400\' height=\'600\' fill=\'url(%23sky)\'/%3E%3Crect x=\'150\' y=\'200\' width=\'100\' height=\'300\' fill=\'%23ffcc00\'/%3E%3Crect x=\'170\' y=\'220\' width=\'60\' height=\'60\' fill=\'%23ffffff\'/%3E%3Crect x=\'200\' y=\'250\' width=\'100\' height=\'250\' fill=\'%23cccccc\'/%3E%3Crect x=\'220\' y=\'270\' width=\'60\' height=\'60\' fill=\'%23ffffff\'/%3E%3C/svg%3E")'
          }}>
            {/* NYC Skyline placeholder - in production this would be an actual image */}
          </div>
        </div>
      </div>
    </div>
  );
}
