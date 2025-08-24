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
  YesWithMMScreen,
  NoHelpWithVisaScreen,
  FeedbackScreen,
  NoWithoutMMScreen,
  VisaHelp,
  OfferAccept1,
  CancelReason,
  CancelComplete,
  OfferDeclined
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

  const handleContinue = async (foundJobWithMM: boolean | 'feedback') => {
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

        // Navigate based on the response
        if (foundJobWithMM === 'feedback') {
          setCurrentStep('feedback');
        } else if (foundJobWithMM) {
          setCurrentStep('yesWithMM');
        } else {
          setCurrentStep('downsell');
        }
      } catch (error) {
        console.error('Error saving survey answers:', error);
      }
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

  const handleNavigateToNoHelpWithVisa = () => {
    setCurrentStep('noHelpWithVisa');
  };

  const handleNoHelpWithVisaComplete = () => {
    // For NoHelpWithVisa screen, we assume they need help (false for hasImmigrationLawyer)
    handleCompleteCancellation(false);
  };

  const handleFeedbackComplete = async (feedback: string) => {
    try {
      // Update cancellation record with feedback
      await supabase
        .from('cancellations')
        .update({
          feedback: feedback
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Navigate to NoWithoutMM screen instead of completing
      setCurrentStep('noWithoutMM');
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const handleNoWithoutMMComplete = async (hasImmigrationLawyer: boolean) => {
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

  const handleNavigateToNoHelpWithVisaFromNoWithoutMM = () => {
    setCurrentStep('noHelpWithVisa');
  };

  const handleNavigateToVisaHelpFromNoWithoutMM = () => {
    setCurrentStep('visaHelp');
  };

  const handleNavigateToVisaHelpFromYesWithMM = () => {
    setCurrentStep('visaHelp');
  };

  const handleVisaHelpComplete = async () => {
    try {
      // Update cancellation record to mark as completed
      await supabase
        .from('cancellations')
        .update({
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
    } else if (currentStep === 'noHelpWithVisa') {
      // Go back to the previous step - could be either yesWithMM or noWithoutMM
      // For now, we'll go back to congrats and let the user choose again
      setCurrentStep('congrats');
    } else if (currentStep === 'feedback') {
      setCurrentStep('congrats');
    } else if (currentStep === 'noWithoutMM') {
      setCurrentStep('feedback');
    } else if (currentStep === 'visaHelp') {
      // Go back to congrats since visaHelp can come from multiple screens
      setCurrentStep('congrats');
    } else if (currentStep === 'offerAccept1') {
      setCurrentStep('downsell');
    } else if (currentStep === 'offerDeclined') {
      setCurrentStep('downsell');
    } else if (currentStep === 'cancelReason') {
      setCurrentStep('offerDeclined');
    } else if (currentStep === 'cancelComplete') {
      setCurrentStep('cancelReason');
    } else if (currentStep === 'downsell') {
      setCurrentStep('initial');
    }
  };

  const handleNavigateToOfferAccept1 = () => {
    setCurrentStep('offerAccept1');
  };

  const handleNavigateToOfferDeclined = () => {
    setCurrentStep('offerDeclined');
  };

  const handleOfferDeclinedGetDiscount = async () => {
    try {
      // Navigate to offer accept screen
      setCurrentStep('offerAccept1');
    } catch (error) {
      console.error('Error handling discount request:', error);
    }
  };



  const handleOfferAccept1Complete = () => {
    handleVisaHelpComplete();
  };

  const handleNavigateToCancelReason = () => {
    setCurrentStep('cancelReason');
  };

  const handleCancelReasonGetDiscount = async (reason: string, details?: string) => {
    try {
      // Update cancellation record with reason and details
      await supabase
        .from('cancellations')
        .update({
          cancellation_reason: reason,
          cancellation_details: details,
          accepted_downsell: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Navigate to offer accept screen
      setCurrentStep('offerAccept1');
    } catch (error) {
      console.error('Error handling discount request:', error);
    }
  };

  const handleCancelReasonComplete = async (reason: string, details?: string) => {
    try {
      // Update cancellation record with reason and details
      await supabase
        .from('cancellations')
        .update({
          cancellation_reason: reason,
          cancellation_details: details,
          completed: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Navigate to cancelComplete screen
      setCurrentStep('cancelComplete');
    } catch (error) {
      console.error('Error completing cancellation:', error);
    }
  };

  const handleCancelCompleteBackToJobs = () => {
    // Close the flow when user clicks "Back to Jobs"
    onClose();
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
                <div className={`w-2 h-2 rounded-full ${currentStep === 'yesWithMM' || currentStep === 'downsell' || currentStep === 'feedback' ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                <div className={`w-2 h-2 rounded-full ${currentStep === 'noHelpWithVisa' || currentStep === 'noWithoutMM' || currentStep === 'visaHelp' || currentStep === 'offerAccept1' || currentStep === 'offerDeclined' || currentStep === 'cancelReason' || currentStep === 'cancelComplete' ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
              </div>
              <span className="text-sm text-gray-500 font-dm-sans">
                Step {currentStep === 'congrats' ? '1' : currentStep === 'yesWithMM' || currentStep === 'downsell' || currentStep === 'feedback' ? '2' : currentStep === 'noHelpWithVisa' || currentStep === 'noWithoutMM' || currentStep === 'visaHelp' || currentStep === 'offerAccept1' || currentStep === 'offerDeclined' || currentStep === 'cancelReason' ? '3' : currentStep === 'cancelComplete' ? '4' : '3'} of {currentStep === 'cancelComplete' ? '4' : '3'}
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
              <YesWithMMScreen
                onCompleteCancellation={handleCompleteCancellation}
                onNavigateToNoHelpWithVisa={handleNavigateToNoHelpWithVisa}
                onNavigateToVisaHelp={handleNavigateToVisaHelpFromYesWithMM}
              />
            )}

            {currentStep === 'noHelpWithVisa' && (
              <NoHelpWithVisaScreen onFinish={handleNoHelpWithVisaComplete} />
            )}

            {currentStep === 'feedback' && (
              <FeedbackScreen onContinue={handleFeedbackComplete} />
            )}

            {currentStep === 'noWithoutMM' && (
              <NoWithoutMMScreen
                onCompleteCancellation={handleNoWithoutMMComplete}
                onNavigateToNoHelpWithVisa={handleNavigateToNoHelpWithVisaFromNoWithoutMM}
                onNavigateToVisaHelp={handleNavigateToVisaHelpFromNoWithoutMM}
              />
            )}

            {currentStep === 'visaHelp' && (
              <VisaHelp onFinish={handleVisaHelpComplete} />
            )}

            {currentStep === 'downsell' && (
              <DownsellScreen
                variant={downsellVariant}
                onNavigateToOfferAccept1={handleNavigateToOfferAccept1}
                onNavigateToOfferDeclined={handleNavigateToOfferDeclined}
              />
            )}

            {currentStep === 'offerAccept1' && (
              <OfferAccept1
                variant={downsellVariant}
                onComplete={handleOfferAccept1Complete}
              />
            )}

            {currentStep === 'offerDeclined' && (
              <OfferDeclined
                variant={downsellVariant}
                onGetDiscount={handleOfferDeclinedGetDiscount}
                onNavigateToCancelReason={handleNavigateToCancelReason}
              />
            )}

            {currentStep === 'cancelReason' && (
              <CancelReason
                variant={downsellVariant}
                onGetDiscount={handleCancelReasonGetDiscount}
                onCompleteCancellation={handleCancelReasonComplete}
              />
            )}

            {currentStep === 'cancelComplete' && (
              <CancelComplete
                endDate="December 31, 2024"
                onBackToJobs={handleCancelCompleteBackToJobs}
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