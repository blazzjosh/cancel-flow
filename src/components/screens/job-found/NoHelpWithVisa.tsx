'use client';

interface CancellationCompleteScreenProps {
    onFinish: () => void;
}

export default function CancellationCompleteScreen({ onFinish }: CancellationCompleteScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    All done, your cancellation&apos;s
                    <br />
                    been processed.
                </h2>
            </div>

            {/* Message */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    We&apos;re stoked to hear you&apos;ve landed a job and sorted your visa.
                    <br />
                    Big congrats from the team. 🙌
                </p>
            </div>

            {/* Finish button */}
            <div className="mt-auto">
                <button
                    onClick={onFinish}
                    className="w-full h-[52px] px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold text-base hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans"
                >
                    Finish
                </button>
            </div>
        </div>
    );
}