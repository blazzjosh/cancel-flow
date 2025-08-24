'use client';

interface OfferAccept1ScreenProps {
    variant: 'A' | 'B';
    daysLeft?: number;
    nextBillingDate?: string;
    onComplete: () => void;
}

export default function OfferAccept1Screen({ 
    variant, 
    daysLeft = 28, 
    nextBillingDate = "XX date",
    onComplete 
}: OfferAccept1ScreenProps) {
    // Pricing based on variant
    const discountedPrice = variant === 'B' ? '$12.50' : '$19.50';

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Great choice, mate!
                </h2>
            </div>

            {/* Success message */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-2">
                    You&apos;re still on the path to your dream role.{' '}
                    <span className="text-purple-600 font-semibold">Let&apos;s make it happen together!</span>
                </p>
            </div>

            {/* Plan details */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-1">
                    You&apos;ve got <strong>{daysLeft} days</strong> left on your current plan.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    Starting from <strong>{nextBillingDate}</strong>, your monthly payment will be <strong>{discountedPrice}</strong>.
                </p>
                <p className="text-sm text-gray-600 font-dm-sans italic">
                    You can cancel anytime before then.
                </p>
            </div>

            {/* Call to action button */}
            <div className="mt-auto">
                <button
                    onClick={onComplete}
                    className="w-full h-[52px] px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold text-base hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans"
                >
                    Land your dream role
                </button>
            </div>
        </div>
    );
}