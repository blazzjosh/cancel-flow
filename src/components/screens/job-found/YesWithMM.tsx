'use client';

import { useState } from 'react';

interface YesWithMMScreenProps {
    onCompleteCancellation: (hasImmigrationLawyer: boolean) => void;
}

export default function YesWithMMScreen({ onCompleteCancellation }: YesWithMMScreenProps) {
    const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

    const handleSubmit = () => {
        if (selectedOption !== null) {
            onCompleteCancellation(selectedOption);
        }
    };

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    We helped you land the job, now
                    <br />
                    let&apos;s help you secure your visa.
                </h2>
            </div>

            {/* Question */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
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
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === true 
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
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOption === false 
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
                        className="w-full h-12 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base font-dm-sans"
                        placeholder=""
                    />
                </div>
            )}

            {/* Complete cancellation button */}
            <div className="mt-auto">
                <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className={`w-full h-[52px] px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                        selectedOption !== null
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