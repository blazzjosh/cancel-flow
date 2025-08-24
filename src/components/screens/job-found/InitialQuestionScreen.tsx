'use client';

import { JobFoundAnswer } from '../types';

interface InitialQuestionScreenProps {
    onJobFoundAnswer: (answer: JobFoundAnswer) => void;
}

export default function InitialQuestionScreen({ onJobFoundAnswer }: InitialQuestionScreenProps) {
    return (
        <div className="flex flex-col w-full">
            {/* Main heading - Hey mate, Quick one before you go. */}
            <div className="mb-4">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Hey mate,
                    <br />
                    Quick one before you go.
                </h2>
            </div>

            {/* Italic question */}
            <div className="mb-6">
                <p className="text-[40px] font-semibold italic leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Have you found a job yet?
                </p>
            </div>

            {/* Subtitle text */}
            <div className="mb-8">
                <p className="text-base font-semibold leading-[24px] tracking-[-0.32px] text-gray-700 font-dm-sans max-w-[469px]">
                    Whatever your answer, we just want to help you take the next step.
                    With visa support, or by hearing how we can do better.
                </p>
            </div>

            {/* Button options */}
            <div className="flex flex-col gap-4 w-full">
                <button
                    onClick={() => onJobFoundAnswer('yes')}
                    className="flex items-center justify-center h-[52px] px-6 py-3 w-full rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    type="button"
                >
                    <span className="text-base font-semibold leading-4 tracking-[-0.32px] text-gray-700 font-dm-sans">
                        Yes, I&apos;ve found a job
                    </span>
                </button>

                <button
                    onClick={() => onJobFoundAnswer('no')}
                    className="flex items-center justify-center h-[52px] px-6 py-3 w-full rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    type="button"
                >
                    <span className="text-base font-semibold leading-4 tracking-[-0.32px] text-gray-700 font-dm-sans">
                        Not yet - I&apos;m still looking
                    </span>
                </button>
            </div>
        </div>
    );
}