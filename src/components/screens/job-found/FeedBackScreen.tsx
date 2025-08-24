'use client';

import { useState } from 'react';

interface FeedbackScreenProps {
    onContinue: (feedback: string) => void;
}

export default function FeedbackScreen({ onContinue }: FeedbackScreenProps) {
    const [feedback, setFeedback] = useState('');
    const minCharacters = 25;
    const maxCharacters = 25; // Based on the display showing "Min 25 characters (0/25)"
    
    const characterCount = feedback.length;
    const isValid = characterCount >= minCharacters;

    const handleContinue = () => {
        if (isValid) {
            onContinue(feedback);
        }
    };

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    What&apos;s one thing you wish we
                    <br />
                    could&apos;ve helped you with?
                </h2>
            </div>

            {/* Subtitle */}
            <div className="mb-6">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    We&apos;re always looking to improve, your thoughts can help us
                    <br />
                    make Migrate Mate more useful for others.*
                </p>
            </div>

            {/* Textarea */}
            <div className="mb-6 relative">
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                    placeholder=""
                />
                
                {/* Character counter */}
                <div className="absolute bottom-3 right-3 text-sm text-gray-500 font-dm-sans">
                    Min {minCharacters} characters ({characterCount}/{maxCharacters})
                </div>
            </div>

            {/* Continue button */}
            <div className="mt-auto">
                <button
                    onClick={handleContinue}
                    disabled={!isValid}
                    className={`w-full h-[52px] px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${
                        isValid
                            ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}