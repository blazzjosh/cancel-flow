'use client';

import { CancellationFlowButton } from '@/components/ui';

interface NoHelpWithVisaScreenProps {
    onFinish: () => void;
}

export default function NoHelpWithVisaScreen({ onFinish }: NoHelpWithVisaScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    Perfect! You&apos;re all set. 🎯
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    It sounds like you have everything you need to move forward with your new role.
                </p>
            </div>

            {/* Success message */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    We&apos;re thrilled that MigrateMate could help you on your journey to finding your dream job.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Best of luck with your new role, and remember - you&apos;re always welcome back if you need anything in the future!
                </p>
            </div>

            {/* Action button */}
            <div className="mt-auto">
                <CancellationFlowButton
                    variant="primary"
                    onClick={onFinish}
                >
                    Finish
                </CancellationFlowButton>
            </div>
        </div>
    );
}


