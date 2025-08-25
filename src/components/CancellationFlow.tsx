'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { sanitizeInput, validateUUID } from '@/lib/utils';
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

// FlowStepConfig class for managing step configuration
class FlowStepConfig {
  constructor(
    public name: string,
    public stepNumber: number,
    public totalSteps: number,
    public isCompletion: boolean = false,
    public imageHeight: '400px' | '600px' = '400px',
    public hideProgress: boolean = false,
    public hideBackButton: boolean = false,
    public headerText: string = 'Subscription Cancellation'
  ) { }

  getProgressState(): {
    firstPill: 'completed' | 'active' | 'pending';
    secondPill: 'completed' | 'active' | 'pending';
    thirdPill: 'completed' | 'active' | 'pending';
    stepText: string;
  } {
    if (this.isCompletion) {
      return {
        firstPill: 'completed',
        secondPill: 'completed',
        thirdPill: 'completed',
        stepText: 'Completed'
      };
    }

    switch (this.stepNumber) {
      case 1:
        return {
          firstPill: 'active',
          secondPill: 'pending',
          thirdPill: 'pending',
          stepText: `Step ${this.stepNumber} of ${this.totalSteps}`
        };
      case 2:
        return {
          firstPill: 'completed',
          secondPill: 'active',
          thirdPill: 'pending',
          stepText: `Step ${this.stepNumber} of ${this.totalSteps}`
        };
      case 3:
        return {
          firstPill: 'completed',
          secondPill: 'completed',
          thirdPill: 'active',
          stepText: `Step ${this.stepNumber} of ${this.totalSteps}`
        };
      case 4:
        return {
          firstPill: 'completed',
          secondPill: 'completed',
          thirdPill: 'completed',
          stepText: `Step ${this.stepNumber} of ${this.totalSteps}`
        };
      default:
        return {
          firstPill: 'pending',
          secondPill: 'pending',
          thirdPill: 'pending',
          stepText: `Step ${this.stepNumber} of ${this.totalSteps}`
        };
    }
  }
}

// Flow configuration
const FLOW_STEPS = {
  initial: new FlowStepConfig('initial', 1, 3),
  congrats: new FlowStepConfig('congrats', 1, 3, false, '600px'),
  feedback: new FlowStepConfig('feedback', 2, 3),
  yesWithMM: new FlowStepConfig('yesWithMM', 3, 3),
  noWithoutMM: new FlowStepConfig('noWithoutMM', 3, 3),
  noHelpWithVisa: new FlowStepConfig('noHelpWithVisa', 3, 3, true, '600px'),
  visaHelp: new FlowStepConfig('visaHelp', 3, 3, true, '600px'),
  downsell: new FlowStepConfig('downsell', 1, 3),
  offerAccept1: new FlowStepConfig('offerAccept1', 2, 3, false, '400px', true, true, 'Subscription'),
  offerDeclined: new FlowStepConfig('offerDeclined', 2, 3),
  cancelReason: new FlowStepConfig('cancelReason', 3, 3),
  cancelComplete: new FlowStepConfig('cancelComplete', 4, 4, true, '600px')
};

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

  // Check for existing variant or assign new one
  const checkAndAssignDownsellVariant = useCallback(async () => {
    try {
      // Validate input parameters
      if (!validateUUID(userId) || !validateUUID(subscriptionId)) {
        console.error('Invalid UUID format for userId or subscriptionId');
        setDownsellVariant('A');
        return;
      }

      // First, check if user already has a variant assigned
      const { data: existingCancellation } = await supabase
        .from('cancellations')
        .select('downsell_variant')
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId)
        .single();

      if (existingCancellation?.downsell_variant) {
        // User already has a variant assigned, use it
        setDownsellVariant(existingCancellation.downsell_variant);
      } else {
        // New user, assign variant based on user ID hash
        const hash = userId.split('').reduce((a, b) => {
          a = ((a << 5) - a + b.charCodeAt(0)) & 0xffffffff;
          return a;
        }, 0);
        const newVariant: DownsellVariant = hash % 2 === 0 ? 'A' : 'B';
        setDownsellVariant(newVariant);

        // Mark subscription as pending_cancellation when user starts the flow
        await supabase
          .from('subscriptions')
          .update({ status: 'pending_cancellation' })
          .eq('id', subscriptionId)
          .eq('user_id', userId);

        // Persist the variant assignment immediately
        await supabase
          .from('cancellations')
          .insert({
            user_id: userId,
            subscription_id: subscriptionId,
            downsell_variant: newVariant
          });
      }
    } catch (error) {
      console.error('Error checking/assigning downsell variant:', error);
      // Fallback to default variant A if there's an error
      setDownsellVariant('A');
    }
  }, [userId, subscriptionId]);

  // Determine downsell variant on first load or check for existing variant
  useEffect(() => {
    if (isOpen && currentStep === 'initial' && typeof window !== 'undefined') {
      checkAndAssignDownsellVariant();
    }
  }, [isOpen, currentStep, userId, subscriptionId, checkAndAssignDownsellVariant]);

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
    // Sanitize input before storing
    const sanitizedValue = sanitizeInput(value);

    setSurveyAnswers(prev => ({
      ...prev,
      [question]: sanitizedValue
    }));
  };

  const handleContinue = async (foundJobWithMM: boolean | 'feedback') => {
    if (currentStep === 'congrats') {
      // Save survey answers first
      try {
        await supabase
          .from('cancellations')
          .upsert({
            user_id: userId,
            subscription_id: subscriptionId,
            downsell_variant: downsellVariant,
            reason: JSON.stringify(surveyAnswers)
          }, {
            onConflict: 'user_id,subscription_id'
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
      // Sanitize feedback input before storing
      const sanitizedFeedback = sanitizeInput(feedback);

      // Update cancellation record with feedback
      await supabase
        .from('cancellations')
        .update({
          feedback: sanitizedFeedback
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Route based on the original survey answer
      if (surveyAnswers.foundJobWithMigrateMate === 'Yes') {
        // User found job with MigrateMate, go to YesWithMM screen
        setCurrentStep('yesWithMM');
      } else {
        // User found job without MigrateMate, go to NoWithoutMM screen
        setCurrentStep('noWithoutMM');
      }
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
      setCurrentStep('feedback');
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

  const handleNavigateToOfferAccept1 = async () => {
    try {
      // Update cancellation record to mark downsell as accepted
      await supabase
        .from('cancellations')
        .update({
          accepted_downsell: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Mark subscription as active again since user accepted downsell
      await supabase
        .from('subscriptions')
        .update({ status: 'active' })
        .eq('id', subscriptionId)
        .eq('user_id', userId);

      // Navigate to offer accept screen
      setCurrentStep('offerAccept1');
    } catch (error) {
      console.error('Error updating downsell acceptance:', error);
      // Still navigate even if database update fails
      setCurrentStep('offerAccept1');
    }
  };

  const handleNavigateToOfferDeclined = () => {
    setCurrentStep('offerDeclined');
  };

  const handleOfferDeclinedGetDiscount = async () => {
    try {
      // Update cancellation record to mark downsell as accepted
      await supabase
        .from('cancellations')
        .update({
          accepted_downsell: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Mark subscription as active again since user accepted downsell
      await supabase
        .from('subscriptions')
        .update({ status: 'active' })
        .eq('id', subscriptionId)
        .eq('user_id', userId);

      // Navigate to offer accept screen
      setCurrentStep('offerAccept1');
    } catch (error) {
      console.error('Error updating downsell acceptance:', error);
      // Still navigate even if database update fails
      setCurrentStep('offerAccept1');
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
      // Sanitize inputs before storing
      const sanitizedReason = sanitizeInput(reason);
      const sanitizedDetails = details ? sanitizeInput(details) : undefined;

      // Update cancellation record with reason and details
      await supabase
        .from('cancellations')
        .update({
          cancellation_reason: sanitizedReason,
          cancellation_details: sanitizedDetails,
          accepted_downsell: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Mark subscription as active again since user accepted downsell
      await supabase
        .from('subscriptions')
        .update({ status: 'active' })
        .eq('id', subscriptionId)
        .eq('user_id', userId);

      // Navigate to offer accept screen
      setCurrentStep('offerAccept1');
    } catch (error) {
      console.error('Error handling discount request:', error);
    }
  };

  const handleCancelReasonComplete = async (reason: string, details?: string) => {
    try {
      // Sanitize inputs before storing
      const sanitizedReason = sanitizeInput(reason);
      const sanitizedDetails = details ? sanitizeInput(details) : undefined;

      // Update cancellation record with reason and details
      await supabase
        .from('cancellations')
        .update({
          cancellation_reason: sanitizedReason,
          cancellation_details: sanitizedDetails,
          completed: true
        })
        .eq('user_id', userId)
        .eq('subscription_id', subscriptionId);

      // Mark subscription as cancelled
      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', subscriptionId)
        .eq('user_id', userId);

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
    <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <main
        className="bg-white rounded-[20px] w-full max-w-[1000px] max-h-[90vh] overflow-y-auto shadow-xl"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <header className="flex w-full h-[60px] items-center justify-center gap-2.5 px-4 py-[18px] relative border-b border-gray-300">
          {currentStep !== 'initial' && !FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.hideBackButton && (
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

          <div className="flex items-center justify-center gap-[24px] ">
            <h1
              id="modal-title"
              className="text-base text-gray-800 font-dm-sans"
            >
              {FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.headerText || 'Subscription Cancellation'}
            </h1>

            {/* Progress indicator - pill style */}
            {currentStep !== 'initial' && !FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.hideProgress && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className={`w-6 h-3 rounded-full transition-colors ${FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().firstPill === 'completed'
                    ? 'bg-[#4abf71]'
                    : FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().firstPill === 'active'
                      ? 'bg-gray-400'
                      : 'bg-gray-300'
                    }`}>
                  </div>
                  <div className={`w-6 h-3 rounded-full transition-colors ${FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().secondPill === 'completed'
                    ? 'bg-[#4abf71]'
                    : FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().secondPill === 'active'
                      ? 'bg-gray-400'
                      : 'bg-gray-300'
                    }`}>
                  </div>
                  <div className={`w-6 h-3 rounded-full transition-colors ${FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().thirdPill === 'completed'
                    ? 'bg-[#4abf71]'
                    : FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().thirdPill === 'active'
                      ? 'bg-gray-400'
                      : 'bg-gray-300'
                    }`}>
                  </div>
                  {currentStep === 'cancelComplete' && (
                    <div className="w-6 h-3 rounded-full bg-gray-400">
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500 font-dm-sans">
                  {FLOW_STEPS[currentStep as keyof typeof FLOW_STEPS]?.getProgressState().stepText || 'Step 1 of 3'}
                </span>
              </div>
            )}
          </div>

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


        <div className="flex flex-col md:flex-row gap-5 p-5 relative">
          {/* Mobile Image - shows on top for mobile */}
          <div className="block md:hidden relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
            <Image
              className="object-cover"
              alt="City skyline illustration"
              src="/bg.jpg"
              fill
            />
          </div>

          {/* Content */}
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

          {/* Desktop Image - shows on right on desktop */}
          <div className={`hidden md:block relative w-[450px] rounded-lg overflow-hidden ${currentStep === 'congrats' ? 'h-[600px]' : 'h-[400px]'}`}>
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