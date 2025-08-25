'use client';

import { useState } from 'react';
import { ContinueButton } from '@/components/ui';

interface FeedbackScreenProps {
    onContinue: (feedback: string) => void;
}

export default function FeedbackScreen({ onContinue }: FeedbackScreenProps) {
    const [feedback, setFeedback] = useState('');

    const handleContinue = () => {
        if (feedback.trim().length >= 25) {
            onContinue(feedback);
        }
    };

    const isFormValid = feedback.trim().length >= 25;

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    What’s one thing you wish we could’ve helped you with?
                </h2>

            </div>

            {/* Feedback input */}
            <div className="mb-8">
                <p className="text-base  text-gray-700 font-dm-sans mb-4">
                    We're always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*

                </p>
                <div className="relative">
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full h-32 p-4 pr-24 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans text-gray-800 placeholder-gray-400"
                        placeholder="Type your feedback here..."
                    />
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500 font-dm-sans pointer-events-none">
                        Min 25 characters ({feedback.length}/25)
                    </div>
                </div>
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