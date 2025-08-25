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
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    Wait! Before you go...
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    We&apos;d love to keep helping you find your dream role.
                </p>
            </div>

            {/* Offer details */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
                    <h3 className="text-2xl font-bold text-gray-800 font-dm-sans mb-4">
                        Special Offer: 50% Off Your Next Month
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-green-600 font-dm-sans">
                            {discountedPrice}
                        </span>
                        <span className="text-xl text-gray-500 font-dm-sans line-through">
                            {originalPrice}
                        </span>
                        <span className="text-lg text-gray-600 font-dm-sans">
                            /month
                        </span>
                    </div>
                    <p className="text-base text-gray-700 font-dm-sans mb-4">
                        Get continued access to our job search tools, company database, and personalized support.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 font-dm-sans">
                        <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Unlimited job applications
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Direct company contact information
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Personalized job recommendations
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            Expert support team
                        </li>
                    </ul>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-8">
                <p className="text-sm text-gray-500 font-dm-sans text-center">
                    *This offer is valid for one month only. You can cancel anytime before your next billing date.
                </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-4 mt-auto">
                {/* Get discount button */}
                <GetDiscountButton
                    onClick={onNavigateToOfferAccept1}
                    discountedPrice={discountedPrice}
                    originalPrice={originalPrice}
                />

                {/* No thanks button */}
                <CancellationFlowButton
                    variant="outline"
                    onClick={onNavigateToOfferDeclined}
                >
                    No thanks, I&apos;d like to continue with cancellation
                </CancellationFlowButton>
            </div>
        </div>
    );
}