'use client';

import { useState } from 'react';
import { ContinueButton } from '@/components/ui';

interface FeedbackScreenProps {
    onContinue: (feedback: string) => void;
}

export default function FeedbackScreen({ onContinue }: FeedbackScreenProps) {
    const [feedback, setFeedback] = useState('');

    const handleContinue = () => {
        if (feedback.trim()) {
            onContinue(feedback);
        }
    };

    const isFormValid = feedback.trim().length > 0;

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    We&apos;d love your feedback! 💭
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    Since you found a job without using MigrateMate, we&apos;d love to know how we can improve.
                </p>
            </div>

            {/* Feedback input */}
            <div className="mb-8">
                <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                    What could we have done better to help you find your role?*
                </p>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                    placeholder="Share your thoughts on how we can improve our service..."
                />
            </div>

            {/* Continue button */}
            <div className="mt-auto">
                <ContinueButton
                    onClick={handleContinue}
                    disabled={!isFormValid}
                >
                    Continue
                </ContinueButton>
            </div>
        </div>
    );
}