'use client';

interface InitialQuestionScreenProps {
    onJobFoundAnswer: (answer: 'yes' | 'no') => void;
}

export default function InitialQuestionScreen({ onJobFoundAnswer }: InitialQuestionScreenProps) {
    return (
        <div className="flex flex-col w-full p-4 md:p-5">
            {/* Main heading */}
            <div className="mb-4 md:mb-6">
                <h2 className="text-[28px] md:text-[40px] font-semibold leading-[32px] md:leading-[48px] tracking-[-0.05em] md:tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Hey mate,
                    <br />
                    Quick one before you go.
                </h2>
            </div>

            {/* Italic question */}
            <div className="mb-5 md:mb-8">
                <p className="text-[28px] md:text-[40px] font-semibold italic leading-[32px] md:leading-[48px] tracking-[-0.05em] md:tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Have you found a job yet?
                </p>
            </div>

            {/* Subtitle text */}
            <div className="mb-8 md:mb-10">
                <p className="text-[14px] md:text-base font-medium leading-[20px] md:leading-[24px] tracking-[-0.02em] md:tracking-[-0.32px] text-gray-600 md:text-gray-700 font-dm-sans">
                    Whatever your answer, we just want to help you take the next step.
                    With visa support, or by hearing how we can do better.
                </p>
            </div>

            {/* Button options */}
            <div className="flex flex-col gap-3 md:gap-4 w-full">
                <button
                    onClick={() => onJobFoundAnswer('yes')}
                    className="flex items-center justify-center h-[48px] md:h-[52px] px-4 md:px-6 py-2 md:py-3 w-full rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    type="button"
                >
                    <span className="text-[15px] md:text-base font-semibold text-gray-700 font-dm-sans">
                        Yes, I&apos;ve found a job
                    </span>
                </button>

                <button
                    onClick={() => onJobFoundAnswer('no')}
                    className="flex items-center justify-center h-[48px] md:h-[52px] px-4 md:px-6 py-2 md:py-3 w-full rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    type="button"
                >
                    <span className="text-[15px] md:text-base font-semibold text-gray-700 font-dm-sans">
                        Not yet - I&apos;m still looking
                    </span>
                </button>
            </div>
        </div>
    );
}