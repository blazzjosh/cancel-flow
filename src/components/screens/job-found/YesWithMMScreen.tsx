'use client';

import { CancellationFlowButton } from '@/components/ui';

interface YesWithMMScreenProps {
    onCompleteCancellation: (hasImmigrationLawyer: boolean) => void;
    onNavigateToNoHelpWithVisa: () => void;
    onNavigateToVisaHelp: () => void;
}

export default function YesWithMMScreen({
    onCompleteCancellation,
    onNavigateToNoHelpWithVisa,
    onNavigateToVisaHelp
}: YesWithMMScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    That&apos;s fantastic! 🎉
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    We&apos;re so glad MigrateMate helped you find your dream role!
                </p>
            </div>

            {/* Success message */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    Since you found your job through our platform, we&apos;d love to help you with the next steps.
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
