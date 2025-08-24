'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  InitialQuestionScreen,
  CongratsScreen,
  DownsellScreen,
  SurveyAnswers,
  DownsellVariant,
  FlowStep,
  JobFoundAnswer,
  YesWithMMScreen
} from './screens';

interface CancellationFlowProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  userId: string;
}

export default function CancellationFlow({ isOpen, onClose, subscriptionId, userId }: CancellationFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('initial');
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
    if (isOpen && currentStep === 'initial' && typeof window !== 'undefined') {
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

  const handleContinue = async (foundJobWithMM: boolean) => {
    if (currentStep === 'congrats') {
      // Save survey answers first
      try {
        await supabase
          .from('cancellations')
          .insert({
            user_id: userId,
            subscription_id: subscriptionId,
            downsell_variant: downsellVariant,
            reason: JSON.stringify(surveyAnswers)
          });

        // Navigate based on whether they found job with MigrateMate
        if (foundJobWithMM) {
          setCurrentStep('yesWithMM');
        } else {
          setCurrentStep('downsell');
        }
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

  const handleCompleteCancellation = async (hasImmigrationLawyer: boolean) => {
    try {
      // Update cancellation record with immigration lawyer info
      await supabase
        .from('cancellations')
        .update({
          has_immigration_lawyer: hasImmigrationLawyer,
          completed: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Close the flow
      onClose();
    } catch (error) {
      console.error('Error completing cancellation:', error);
    }
  };

  const handleBack = () => {
    if (currentStep === 'congrats') {
      setCurrentStep('initial');
    } else if (currentStep === 'yesWithMM') {
      setCurrentStep('congrats');
    } else if (currentStep === 'downsell') {
      setCurrentStep('initial');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50">
      <main
        className="bg-white rounded-[20px] w-full max-w-[1000px] mx-4 overflow-hidden shadow-xl"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <header className="flex w-full h-[60px] items-center justify-center gap-2.5 px-4 py-[18px] relative border-b border-gray-300">
          {currentStep !== 'initial' && (
            <button
              onClick={handleBack}
              className="absolute left-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          <h1
            id="modal-title"
            className="text-base font-semibold text-gray-800 font-dm-sans"
          >
            Subscription Cancellation
          </h1>

          {/* Progress indicator */}
          {currentStep !== 'initial' && (
            <div className="absolute right-16 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className={`w-2 h-2 rounded-full ${currentStep === 'congrats' ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                <div className={`w-2 h-2 rounded-full ${currentStep === 'yesWithMM' || currentStep === 'downsell' ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              <span className="text-sm text-gray-500 font-dm-sans">
                Step {currentStep === 'congrats' ? '1' : currentStep === 'yesWithMM' || currentStep === 'downsell' ? '2' : '3'} of 3
              </span>
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute right-4 w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex items-center justify-center gap-5 p-5 relative">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-5 flex-1">
            {currentStep === 'initial' && (
              <InitialQuestionScreen onJobFoundAnswer={handleJobFoundAnswer} />
            )}

            {currentStep === 'congrats' && (
              <CongratsScreen
                surveyAnswers={surveyAnswers}
                onSurveyAnswerChange={handleSurveyAnswerChange}
                onContinue={handleContinue}
                isFormValid={isFormValid}
              />
            )}

            {currentStep === 'yesWithMM' && (
              <YesWithMMScreen onCompleteCancellation={handleCompleteCancellation} />
            )}

            {currentStep === 'downsell' && (
              <DownsellScreen
                downsellVariant={downsellVariant}
                onDownsellResponse={handleDownsellResponse}
              />
            )}
          </div>

          {/* Right Image */}
          <div className="relative w-[450px] h-[400px] rounded-lg overflow-hidden">
            <Image
              className="object-cover"
              alt="City skyline illustration"
              src="/bg.jpg"
              fill
            />
          </div>
        </div>
      </main>
    </div>
  );
}