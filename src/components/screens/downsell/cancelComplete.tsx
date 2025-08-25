'use client';

import { CancellationFlowButton } from '@/components/ui';

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
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans">
                    Sorry to see you go, mate.
                </h2>
            </div>

            {/* Farewell message */}
            <div className="mb-6">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Thanks for being with us, and you&apos;re
                    <br />
                    always welcome back.
                </p>
            </div>

            {/* Subscription details */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-2">
                    Your subscription is set to end on <strong>{endDate}</strong>.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    You&apos;ll still have full access until then. No further charges after that.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-600 font-dm-sans">
                    Changed your mind? You can reactivate anytime before your end date.
                </p>
            </div>

            {/* Back to Jobs button */}
            <div className="mt-auto">
                <CancellationFlowButton
                    variant="primary"
                    onClick={onBackToJobs}
                >
                    Back to Jobs
                </CancellationFlowButton>
            </div>
        </div>
    );
}