'use client';

import { GetDiscountButton, CancellationFlowButton } from '@/components/ui';

interface DownsellScreenProps {
    variant: 'A' | 'B';
    onNavigateToOfferAccept1: () => void;
    onNavigateToOfferDeclined: () => void;
}

export default function DownsellScreen({
    variant,
    onNavigateToOfferAccept1,
    onNavigateToOfferDeclined
}: DownsellScreenProps) {
    const discountedPrice = variant === 'B' ? '$12.50' : '$19.50';
    const originalPrice = variant === 'B' ? '$25' : '$39';

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-5">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-0.03em] text-[#41403D] font-dm-sans">
                    We built this to help you land the job, this makes it a little easier.
                </h2>
                <p className="text-[24px] font-semibold text-[#62605c] font-dm-sans mt-5">
                    We&apos;ve been there and we&apos;re here to help you.
                </p>
            </div>

            {/* Offer details */}
            <div className="mb-5">
                <div className="bg-[#EBE1FE] p-3 rounded-xl border border-[#9A6FFF] text-center">
                    <h3 className="text-[26px] font-semibold text-[#41403D] font-dm-sans mb-2">
                        Here&apos;s <span className="underline">50% off</span> until you find a job.
                    </h3>
                    <div className="flex items-end justify-center gap-2.5 mb-4">
                        <span className="text-[24px] font-semibold text-[#9a6fff] font-dm-sans">
                            {discountedPrice}/month
                        </span>
                        <span className="text-[16px] text-[#62605c] font-dm-sans line-through">
                            {originalPrice} /month
                        </span>


                    </div>

                    {/* Get discount button - inside the offer box */}
                    <div className="mb-1">
                        <GetDiscountButton
                            onClick={onNavigateToOfferAccept1}

                        />
                    </div>

                    <p className="text-xs italic text-[#62605c] font-dm-sans">
                        You won&apos;t be charged until your next billing date.
                    </p>
                </div>
            </div>

            <div className="h-px bg-[#EBE1FE] w-full "></div>

            {/* No thanks button */}
            <div className="mt-5">
                <CancellationFlowButton
                    variant="outline"
                    onClick={onNavigateToOfferDeclined}
                >
                    No thanks
                </CancellationFlowButton>
            </div>
        </div>
    );
}