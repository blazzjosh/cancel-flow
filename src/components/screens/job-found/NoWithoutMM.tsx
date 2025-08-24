'use client';

import { useState } from 'react';

interface JobNotThroughMMScreenProps {
    onCompleteCancellation: (hasImmigrationLawyer: boolean, visaType?: string) => void;
    onNavigateToNoHelpWithVisa: () => void;
    onNavigateToVisaHelp: () => void;
}

export default function JobNotThroughMMScreen({ onCompleteCancellation, onNavigateToNoHelpWithVisa, onNavigateToVisaHelp }: JobNotThroughMMScreenProps) {
    const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
    const [visaType, setVisaType] = useState('');

    const handleSubmit = () => {
        if (selectedOption === true && visaType.trim() !== '') {
            // If "Yes" is selected and visa input is filled, navigate to NoHelpWithVisa
            onNavigateToNoHelpWithVisa();
        } else if (selectedOption === false && visaType.trim() !== '') {
            // If "No" is selected and visa input is filled, navigate to VisaHelp
            onNavigateToVisaHelp();
        } else if (selectedOption !== null) {
            // For other cases, complete cancellation normally
            onCompleteCancellation(selectedOption, visaType);
        }
    };

    const isFormValid = selectedOption !== null && visaType.trim() !== '';

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    You landed the job!
                    <br />
                    <span className="italic">That&apos;s what we live for.</span>
                </h2>
            </div>

            {/* Subtitle */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Even if it wasn&apos;t through Migrate Mate,
                    <br />
                    let us help get your visa sorted.
                </p>
            </div>

            {/* Question */}
            <div className="mb-6">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    Is your company providing an immigration lawyer to help with your visa?
                </p>
            </div>

            {/* Radio options */}
            <div className="flex flex-col gap-4 mb-8">
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
                <div className="mb-8">
                    <label className="block mb-2">
                        <span className="text-base font-medium text-gray-700 font-dm-sans">
                            What visa will you be applying for?*
                        </span>
                    </label>
                    <input
                        type="text"
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="w-full h-12 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                        placeholder=""
                    />
                </div>
            )}

            {selectedOption === false && (
                <div className="mb-8">
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-2">
                        We can connect you with one of our trusted partners.
                    </p>
                    <p className="text-base font-medium text-gray-700 font-dm-sans mb-4">
                        Which visa would you like to apply for?*
                    </p>
                    <input
                        type="text"
                        value={visaType}
                        onChange={(e) => setVisaType(e.target.value)}
                        className="w-full h-12 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                        placeholder=""
                    />
                </div>
            )}

            {/* Complete cancellation button */}
            <div className="mt-auto">
                <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full h-[52px] px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 font-dm-sans ${isFormValid
                        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    Complete cancellation
                </button>
            </div>
        </div>
    );
}