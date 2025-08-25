'use client';

import { useState } from 'react';
import { CancellationFlowButton } from '@/components/ui';

interface YesWithMMScreenProps {
    onCompleteCancellation: (hasImmigrationLawyer: boolean) => void;
    onNavigateToNoHelpWithVisa: () => void;
    onNavigateToVisaHelp: () => void;
}

export default function YesWithMMScreen({ onCompleteCancellation, onNavigateToNoHelpWithVisa, onNavigateToVisaHelp }: YesWithMMScreenProps) {
    const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
    const [visaInput, setVisaInput] = useState('');

    const handleSubmit = () => {
        if (selectedOption === true && visaInput.trim() !== '') {
            // If "Yes" is selected and visa input is filled, navigate to NoHelpWithVisa
            onNavigateToNoHelpWithVisa();
        } else if (selectedOption === false && visaInput.trim() !== '') {
            // If "No" is selected and visa input is filled, navigate to VisaHelp
            onNavigateToVisaHelp();
        } else if (selectedOption !== null && visaInput.trim() === '') {
            // For cases where radio is selected but no visa input, complete cancellation normally
            onCompleteCancellation(selectedOption);
        }
    };

    const isFormValid = selectedOption !== null && visaInput.trim() !== '';

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-5">
                <h2 className="text-[32px] font-semibold leading-[36px] tracking-[-0.03em] text-[#41403d] font-dm-sans">
                    We helped you land the job, now let&apos;s help you secure your visa.
                </h2>
            </div>

            {/* Question */}
            <div className="mb-5">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Is your company providing an immigration lawyer to help with your visa?
                </p>
            </div>

            {/* Radio options */}
            <div className="flex flex-col gap-3 mb-5">
                <label className="flex items-center cursor-pointer">
                    <div className="relative mr-3">
                        <input
                            type="radio"
                            name="immigration-lawyer"
                            value="yes"
                            checked={selectedOption === true}
                            onChange={() => setSelectedOption(true)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === true
                            ? 'border-gray-800 bg-gray-800'
                            : 'border-gray-400 bg-white'
                            }`}>
                            {selectedOption === true && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                        </div>
                    </div>
                    <span className="text-base font-medium text-gray-700 font-dm-sans">
                        Yes
                    </span>
                </label>

                <label className="flex items-center cursor-pointer">
                    <div className="relative mr-3">
                        <input
                            type="radio"
                            name="immigration-lawyer"
                            value="no"
                            checked={selectedOption === false}
                            onChange={() => setSelectedOption(false)}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === false
                            ? 'border-gray-800 bg-gray-800'
                            : 'border-gray-400 bg-white'
                            }`}>
                            {selectedOption === false && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                        </div>
                    </div>
                    <span className="text-base font-medium text-gray-700 font-dm-sans">
                        No
                    </span>
                </label>
            </div>

            {/* Conditional content based on selection */}
            {selectedOption === true && (
                <div className="mb-6">
                    <label className="block mb-3">
                        <span className="text-base font-medium text-gray-700 font-dm-sans">
                            What visa will you be applying for?*
                        </span>
                    </label>
                    <input
                        type="text"
                        value={visaInput}
                        onChange={(e) => setVisaInput(e.target.value)}
                        className="w-full h-12 px-4 py-3 border-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans text-gray-800 placeholder-gray-400"
                        placeholder="Type your visa type here..."
                    />
                </div>
            )}

            {selectedOption === false && (
                <div className="mb-6">
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-3">
                        We can connect you with one of our trusted partners.
                    </p>
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-3">
                        Which visa would you like to apply for?*
                    </p>
                    <input
                        type="text"
                        value={visaInput}
                        onChange={(e) => setVisaInput(e.target.value)}
                        className="w-full h-12 px-4 py-3 border-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans text-gray-800 placeholder-gray-400"
                        placeholder="Type your visa type here..."
                    />
                </div>
            )}

            {/* Separator */}
            <div className="border-t border-gray-200"></div>

            {/* Complete cancellation button */}
            <div className="mt-5">
                <CancellationFlowButton
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Complete cancellation
                </CancellationFlowButton>
            </div>
        </div>
    );
}