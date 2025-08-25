'use client';

import { CancellationFlowButton } from '@/components/ui';

interface NoWithoutMMScreenProps {
    onCompleteCancellation: (hasImmigrationLawyer: boolean) => void;
    onNavigateToNoHelpWithVisa: () => void;
    onNavigateToVisaHelp: () => void;
}

export default function NoWithoutMMScreen({
    onCompleteCancellation,
    onNavigateToNoHelpWithVisa,
    onNavigateToVisaHelp
}: NoWithoutMMScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    Thanks for the feedback! 📝
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    We&apos;ll use your input to make MigrateMate even better for future users.
                </p>
            </div>

            {/* Message */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    Even though you found your job through other means, we&apos;d still love to help you with the next steps.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    Do you need any assistance with visa applications or immigration processes?
                </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-4 mt-auto">
                {/* Complete cancellation button */}
                <CancellationFlowButton
                    variant="secondary"
                    onClick={() => onCompleteCancellation(false)}
                >
                    Complete cancellation
                </CancellationFlowButton>

                {/* No help with visa button */}
                <CancellationFlowButton
                    variant="outline"
                    onClick={onNavigateToNoHelpWithVisa}
                >
                    No help with visa needed
                </CancellationFlowButton>

                {/* Visa help button */}
                <CancellationFlowButton
                    variant="primary"
                    onClick={onNavigateToVisaHelp}
                >
                    Yes, I need visa help
                </CancellationFlowButton>
            </div>
        </div>
    );
}
