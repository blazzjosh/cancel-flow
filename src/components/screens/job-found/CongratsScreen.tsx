'use client';

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
    return (
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
                                onClick={() => onSurveyAnswerChange('foundJobWithMigrateMate', option)}
                                className={`px-3 py-2 text-sm rounded-lg border transition-colors shadow-sm ${surveyAnswers.foundJobWithMigrateMate === option
                                    ? 'bg-[#8952fc] text-white border-[#8952fc]'
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
                                onClick={() => onSurveyAnswerChange('rolesApplied', option)}
                                className={`px-3 py-2 text-sm rounded-lg border transition-colors shadow-sm ${surveyAnswers.rolesApplied === option
                                    ? 'bg-[#8952fc] text-white border-[#8952fc]'
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
                                onClick={() => onSurveyAnswerChange('companiesEmailed', option)}
                                className={`px-3 py-2 text-sm rounded-lg border transition-colors shadow-sm ${surveyAnswers.companiesEmailed === option
                                    ? 'bg-[#8952fc] text-white border-[#8952fc]'
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
                                onClick={() => onSurveyAnswerChange('companiesInterviewed', option)}
                                className={`px-3 py-2 text-sm rounded-lg border transition-colors shadow-sm ${surveyAnswers.companiesInterviewed === option
                                    ? 'bg-[#8952fc] text-white border-[#8952fc]'
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
                onClick={() => {
                    if (surveyAnswers.foundJobWithMigrateMate === 'No') {
                        // If "No" is selected, go to feedback screen
                        onContinue('feedback');
                    } else {
                        // If "Yes" is selected, continue with normal flow
                        onContinue(surveyAnswers.foundJobWithMigrateMate === 'Yes');
                    }
                }}
                disabled={!isFormValid}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors shadow-sm ${isFormValid
                    ? 'bg-[#8952fc] text-white hover:bg-[#7b40fc]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                Continue
            </button>
        </div>
    );
}
