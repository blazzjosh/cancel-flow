'use client';

import { CancellationFlowButton } from '@/components/ui';
import { SurveyAnswers } from '../types';

interface CongratsScreenProps {
    surveyAnswers: SurveyAnswers;
    onSurveyAnswerChange: (question: keyof SurveyAnswers, value: string) => void;
    onContinue: (foundJobWithMM: boolean | 'feedback') => void;
    isFormValid: boolean;
}

export default function CongratsScreen({
    surveyAnswers,
    onSurveyAnswerChange,
    onContinue,
    isFormValid
}: CongratsScreenProps) {
    const handleContinue = () => {
        // Always go to feedback screen first, regardless of Yes/No selection
        onContinue('feedback');
    };

    const canContinue = isFormValid && surveyAnswers.foundJobWithMigrateMate !== '';

    return (
        <div className="flex flex-col w-full p-4 md:p-5">
            {/* Main heading */}
            <div className="mb-5 md:mb-6">
                <h2 className="text-[28px] md:text-[32px] font-semibold leading-[32px] md:leading-[36px] tracking-[-0.5px] md:tracking-[-0.8px] text-[#41403D] font-dm-sans mb-3 md:mb-4">
                    Congrats on the new role! 🎉
                </h2>

            </div>

            {/* Survey Questions */}
            <div className="space-y-6 md:space-y-8 mb-6 md:mb-8">
                {/* Question 1: Did you find this job with MigrateMate? */}
                <div>
                    <p className="text-[15px] md:text-base font-medium text-gray-700 font-dm-sans mb-3 md:mb-4 leading-[20px] md:leading-[24px]">
                        Did you find this job with MigrateMate?*
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('foundJobWithMigrateMate', option)}
                                className={`h-[40px] md:h-[44px] px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-[14px] md:text-base transition-all duration-200 font-dm-sans ${surveyAnswers.foundJobWithMigrateMate === option
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Question 2: How many roles did you apply for? */}
                <div>
                    <p className="text-[15px] md:text-base font-medium text-gray-700 font-dm-sans mb-3 md:mb-4 leading-[20px] md:leading-[24px]">
                        How many roles did you <span className="underline">apply</span> for through Migrate Mate?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['0', '1 - 5', '6 - 20', '20+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('rolesApplied', option)}
                                className={`h-[40px] md:h-[44px] px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-[14px] md:text-base transition-all duration-200 font-dm-sans ${surveyAnswers.rolesApplied === option
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Question 3: How many companies did you email? */}
                <div>
                    <p className="text-[15px] md:text-base font-medium text-gray-700 font-dm-sans mb-3 md:mb-4 leading-[20px] md:leading-[24px]">
                        How many companies did you <span className="underline">email</span> directly?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['0', '1-5', '6-20', '20+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('companiesEmailed', option)}
                                className={`h-[40px] md:h-[44px] px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-[14px] md:text-base transition-all duration-200 font-dm-sans ${surveyAnswers.companiesEmailed === option
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Question 4: How many companies did you interview with? */}
                <div>
                    <p className="text-[15px] md:text-base font-medium text-gray-700 font-dm-sans mb-3 md:mb-4 leading-[20px] md:leading-[24px]">
                        How many different companies did you <span className="underline">interview</span> with?*
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        {['0', '1-2', '3-5', '5+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('companiesInterviewed', option)}
                                className={`h-[40px] md:h-[44px] px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-semibold text-[14px] md:text-base transition-all duration-200 font-dm-sans ${surveyAnswers.companiesInterviewed === option
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Continue button */}
            <div className="mt-auto">
                <CancellationFlowButton
                    variant="primary"
                    onClick={handleContinue}
                    disabled={!canContinue}
                >
                    Continue
                </CancellationFlowButton>
            </div>
        </div>
    );
}
