'use client';

interface DownsellOfferScreenProps {
    variant: 'A' | 'B';
    onNavigateToOfferAccept1: () => void;
    onNavigateToOfferDeclined: () => void;
}

export default function DownsellOfferScreen({ variant, onNavigateToOfferAccept1, onNavigateToOfferDeclined }: DownsellOfferScreenProps) {
    // Pricing based on variant
    const pricing = variant === 'B'
        ? { discounted: '$12.50', original: '$25' }
        : { discounted: '$19.50', original: '$39' }; // Variant A pricing (if different)

    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    We built this to help you land the
                    <br />
                    job, this makes it a little easier.
                </h2>
            </div>

            {/* Subtitle */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    We&apos;ve been there and we&apos;re here to help you.
                </p>
            </div>

            {/* Offer card */}
            <div className="mb-6 p-6 bg-purple-50 border-2 border-purple-200 rounded-xl">
                {/* Offer heading */}
                <div className="text-center mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 font-dm-sans mb-2">
                        Here&apos;s 50% off until you find a job.
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-purple-600 font-dm-sans">
                            {pricing.discounted}<span className="text-lg font-medium">/month</span>
                        </span>
                        <span className="text-xl text-gray-500 line-through font-dm-sans">
                            {pricing.original}<span className="text-sm">/month</span>
                        </span>
                    </div>
                </div>

                {/* Accept button */}
                <button
                    onClick={onNavigateToOfferAccept1}
                    className="w-full h-[52px] px-6 py-3 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans mb-3"
                >
                    Get 50% off
                </button>

                {/* Fine print */}
                <p className="text-sm text-gray-600 text-center font-dm-sans italic">
                    You won&apos;t be charged until your next billing date.
                </p>
            </div>

            {/* Decline button */}
            <div className="mt-auto">
                <button
                    onClick={onNavigateToOfferDeclined}
                    className="w-full h-[52px] px-6 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-semibold text-base hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans"
                >
                    No thanks
                </button>
            </div>
        </div>
    );
}