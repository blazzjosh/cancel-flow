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
        if (surveyAnswers.foundJobWithMigrateMate === 'Yes') {
            onContinue(true);
        } else if (surveyAnswers.foundJobWithMigrateMate === 'No') {
            onContinue('feedback');
        }
    };

    const canContinue = isFormValid && surveyAnswers.foundJobWithMigrateMate !== '';

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    Congrats on the new role! 🎉
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    We&apos;re so happy for you! Let us know a bit more about your experience.
                </p>
            </div>

            {/* Survey Questions */}
            <div className="space-y-8 mb-8">
                {/* Question 1: Did you find this job with MigrateMate? */}
                <div>
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        Did you find this job with MigrateMate?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('foundJobWithMigrateMate', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyAnswers.foundJobWithMigrateMate === option
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
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        How many roles did you <span className="underline">apply</span> for through Migrate Mate?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['0', '1 - 5', '6 - 20', '20+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('rolesApplied', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyAnswers.rolesApplied === option
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
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        How many companies did you <span className="underline">email</span> directly?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['0', '1-5', '6-20', '20+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('companiesEmailed', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyAnswers.companiesEmailed === option
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
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        How many different companies did you <span className="underline">interview</span> with?
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        {['0', '1-2', '3-5', '5+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => onSurveyAnswerChange('companiesInterviewed', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyAnswers.companiesInterviewed === option
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
