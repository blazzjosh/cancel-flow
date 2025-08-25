'use client';

import { CancellationFlowButton } from '@/components/ui';

interface NoHelpWithVisaScreenProps {
    onFinish: () => void;
}

export default function NoHelpWithVisaScreen({ onFinish }: NoHelpWithVisaScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-5">
                <h2 className="text-[32px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans">
                    All done, your cancellation&apos;s been processed.
                </h2>
            </div>

            {/* Success message */}
            <div className="mb-5">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    We&apos;re stoked to hear you&apos;ve landed a job and sorted your visa. Big congrats from the team. 👋
                </p>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200"></div>

            {/* Action button */}
            <div className="mt-5">
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


