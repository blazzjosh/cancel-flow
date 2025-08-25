'use client';

import { useState } from 'react';
import { GetDiscountButton, ContinueButton } from '@/components/ui';

interface OfferDeclinedSurveyScreenProps {
    variant: 'A' | 'B';
    onGetDiscount: () => void;
    onNavigateToCancelReason: () => void;
}

interface SurveyData {
    rolesApplied: string;
    companiesEmailed: string;
    companiesInterviewed?: string;
}

export default function OfferDeclinedSurveyScreen({
    variant,
    onGetDiscount,
    onNavigateToCancelReason
}: OfferDeclinedSurveyScreenProps) {
    const [surveyData, setSurveyData] = useState<SurveyData>({
        rolesApplied: '',
        companiesEmailed: '',
        companiesInterviewed: ''
    });

    const discountedPrice = variant === 'B' ? '$12.50' : '$19.50';
    const originalPrice = variant === 'B' ? '$25' : '$39';

    const isFormValid = surveyData.rolesApplied !== '' && surveyData.companiesEmailed !== '';

    const handleSurveyChange = (field: keyof SurveyData, value: string) => {
        setSurveyData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    Help us understand how you
                    <br />
                    were using Migrate Mate.
                </h2>

                {/* Mobile-specific error message */}
                <div className="block md:hidden mb-4">
                    <p className="text-sm text-red-600 font-dm-sans">
                        Mind letting us know why you&apos;re cancelling?
                        <br />
                        It helps us understand your experience and
                        <br />
                        improve the platform.*
                    </p>
                </div>
            </div>

            {/* Survey Questions */}
            <div className="space-y-8 mb-8">
                {/* Question 1: Roles applied */}
                <div>
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        How many roles did you <span className="underline">apply</span> for through Migrate Mate?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['0', '1 - 5', '6 - 20', '20+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSurveyChange('rolesApplied', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyData.rolesApplied === option
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Question 2: Companies emailed */}
                <div>
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        How many companies did you <span className="underline">email</span> directly?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['0', '1-5', '6-20', '20+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSurveyChange('companiesEmailed', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyData.companiesEmailed === option
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Question 3: Companies interviewed (desktop only) */}
                <div className="hidden md:block">
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        How many different companies did you <span className="underline">interview</span> with?
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                        {['0', '1-2', '3-5', '5+'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSurveyChange('companiesInterviewed', option)}
                                className={`h-12 px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${surveyData.companiesInterviewed === option
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

            {/* Action buttons */}
            <div className="space-y-4 mt-auto">
                {/* Get discount button */}
                <GetDiscountButton
                    onClick={onGetDiscount}
                    discountedPrice={discountedPrice}
                    originalPrice={originalPrice}
                />

                {/* Continue button */}
                <ContinueButton
                    onClick={onNavigateToCancelReason}
                    disabled={!isFormValid}
                >
                    Continue
                </ContinueButton>
            </div>
        </div>
    );
}