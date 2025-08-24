'use client';

interface CancellationCompletedScreenProps {
    endDate?: string;
    onBackToJobs: () => void;
}

export default function CancellationCompletedScreen({ 
    endDate = "XX date",
    onBackToJobs 
}: CancellationCompletedScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-5">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Sorry to see you go, mate.
                </h2>
            </div>

            {/* Farewell message */}
            <div className="mb-5">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Thanks for being with us, and you&apos;re
                    <br />
                    always welcome back.
                </p>
            </div>

            {/* Subscription details */}
            <div className="mb-5">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Your subscription is set to end on <strong>{endDate}</strong>.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    You&apos;ll still have full access until then. No further charges after that.
                </p>
                <br />
                <p className="text-base font-medium leading-[24px] text-gray-600 font-dm-sans">
                    Changed your mind? You can reactivate anytime before your end date.
                </p>
            </div>

            {/* Back to Jobs button */}
            <div className="mt-auto">
                <button
                    onClick={onBackToJobs}
                    className="w-full h-[52px] px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold text-base hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans"
                >
                    Back to Jobs
                </button>
            </div>
        </div>
    );
}