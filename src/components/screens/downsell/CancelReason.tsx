'use client';

import { useState } from 'react';

interface CancellationReasonScreenProps {
    variant: 'A' | 'B';
    onGetDiscount: (reason: string, details?: string) => void;
    onCompleteCancellation: (reason: string, details?: string) => void;
}

type CancellationReason = 'too-expensive' | 'platform-not-helpful' | 'not-enough-relevant-jobs' | 'decided-not-to-move' | 'other' | '';

export default function CancellationReasonScreen({ 
    variant, 
    onGetDiscount, 
    onCompleteCancellation 
}: CancellationReasonScreenProps) {
    const [selectedReason, setSelectedReason] = useState<CancellationReason>('');
    const [detailsText, setDetailsText] = useState('');
    const [showError, setShowError] = useState(false);
    
    const discountedPrice = variant === 'B' ? '$12.50' : '$19.50';
    const originalPrice = variant === 'B' ? '$25' : '$39';
    
    const reasons = [
        { value: 'too-expensive', label: 'Too expensive' },
        { value: 'platform-not-helpful', label: 'Platform not helpful' },
        { value: 'not-enough-relevant-jobs', label: 'Not enough relevant jobs' },
        { value: 'decided-not-to-move', label: 'Decided not to move' },
        { value: 'other', label: 'Other' }
    ] as const;

    // Check if reason needs additional details
    const needsDetails = (reason: CancellationReason): boolean => {
        return ['platform-not-helpful', 'not-enough-relevant-jobs', 'decided-not-to-move', 'other'].includes(reason);
    };

    // Get appropriate follow-up question based on selected reason
    const getFollowUpQuestion = (reason: CancellationReason): string => {
        switch (reason) {
            case 'too-expensive':
                return 'What would be the maximum you would be willing to pay?*';
            case 'platform-not-helpful':
                return 'What can we change to make the platform more helpful?*';
            case 'not-enough-relevant-jobs':
                return 'In which way can we make the jobs more relevant?*';
            case 'decided-not-to-move':
                return 'What changed for you to decide to not move?*';
            case 'other':
                return 'What would have helped you the most?*';
            default:
                return '';
        }
    };

    // Check if form is valid for completion
    const isFormValid = selectedReason !== '' && (
        !needsDetails(selectedReason) || detailsText.trim().length >= 25
    );

    // Handle reason selection
    const handleReasonSelect = (reason: CancellationReason) => {
        setSelectedReason(reason);
        setShowError(false);
        if (!needsDetails(reason)) {
            setDetailsText('');
        }
    };

    // Handle get discount button
    const handleGetDiscount = () => {
        if (selectedReason === '') {
            setShowError(true);
            return;
        }
        onGetDiscount(selectedReason, detailsText);
    };

    // Handle complete cancellation button  
    const handleCompleteCancellation = () => {
        if (!isFormValid) {
            if (selectedReason === '') {
                setShowError(true);
            }
            return;
        }
        onCompleteCancellation(selectedReason, detailsText);
    };

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans mb-4">
                    What&apos;s the main reason for cancelling?
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    Please take a minute to let us know why:
                </p>
            </div>

            {/* Error message */}
            {showError && (
                <div className="mb-6">
                    <p className="text-red-600 font-medium font-dm-sans">
                        To help us understand your experience, please select a reason for cancelling*
                    </p>
                </div>
            )}

            {/* Reason options */}
            <div className="space-y-4 mb-8">
                {reasons.map((reason) => (
                    <label key={reason.value} className="flex items-center cursor-pointer">
                        <div className="relative mr-3">
                            <input
                                type="radio"
                                name="cancellation-reason"
                                value={reason.value}
                                checked={selectedReason === reason.value}
                                onChange={() => handleReasonSelect(reason.value)}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedReason === reason.value 
                                    ? 'border-gray-800 bg-gray-800' 
                                    : 'border-gray-400 bg-white'
                            }`}>
                                {selectedReason === reason.value && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                            </div>
                        </div>
                        <span className="text-base font-medium text-gray-700 font-dm-sans">
                            {reason.label}
                        </span>
                    </label>
                ))}
            </div>

            {/* Conditional follow-up input */}
            {selectedReason && (needsDetails(selectedReason) || selectedReason === 'too-expensive') && (
                <div className="mb-8">
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        {getFollowUpQuestion(selectedReason)}
                    </p>
                    
                    {/* Error message for insufficient characters */}
                    {selectedReason === 'platform-not-helpful' && detailsText.length > 0 && detailsText.length < 25 && (
                        <p className="text-red-600 text-sm font-dm-sans mb-2">
                            Please enter at least 25 characters so we can understand your feedback*
                        </p>
                    )}
                    
                    {selectedReason === 'too-expensive' ? (
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-dm-sans">
                                $
                            </span>
                            <input
                                type="text"
                                value={detailsText}
                                onChange={(e) => setDetailsText(e.target.value)}
                                className="w-full h-12 pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                                placeholder=""
                            />
                        </div>
                    ) : (
                        <div className="relative">
                            <textarea
                                value={detailsText}
                                onChange={(e) => setDetailsText(e.target.value)}
                                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                                placeholder=""
                            />
                            <div className="absolute bottom-3 right-3 text-sm text-gray-500 font-dm-sans">
                                Min 25 characters ({detailsText.length}/25)
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Action buttons */}
            <div className="space-y-4 mt-auto">
                {/* Get discount button */}
                <button
                    onClick={handleGetDiscount}
                    className="w-full h-[52px] px-6 py-3 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans"
                >
                    Get 50% off | {discountedPrice} <span className="line-through text-green-200">{originalPrice}</span>
                </button>

                {/* Complete cancellation button */}
                <button
                    onClick={handleCompleteCancellation}
                    disabled={!isFormValid}
                    className={`w-full h-[52px] px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${
                        isFormValid
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Complete cancellation
                </button>
            </div>
        </div>
    );
}