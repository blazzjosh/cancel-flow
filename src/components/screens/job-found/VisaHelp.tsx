'use client';

interface VisaHelpCompleteScreenProps {
    onFinish: () => void;
}

export default function VisaHelpCompleteScreen({ onFinish }: VisaHelpCompleteScreenProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-1.08px] text-gray-800 font-dm-sans">
                    Your cancellation&apos;s all sorted, mate,
                    <br />
                    no more charges.
                </h2>
            </div>

            {/* Personal message card */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {/* Profile section */}
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex-shrink-0 overflow-hidden">
                        <img 
                            src="/profile-placeholder.jpg" 
                            alt="Mihailo Bozic profile"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling!.classList.remove('hidden');
                            }}
                        />
                        <div className="hidden w-full h-full bg-gray-400 flex items-center justify-center text-white font-semibold text-lg">
                            MB
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800 font-dm-sans">Mihailo Bozic</p>
                        <p className="text-sm text-gray-600 font-dm-sans">&lt;mihailo@migratemate.co&gt;</p>
                    </div>
                </div>

                {/* Personal message */}
                <div className="space-y-4 text-base text-gray-700 font-dm-sans leading-[24px]">
                    <p>I&apos;ll be reaching out soon to help with the visa side of things.</p>
                    
                    <p>We&apos;ve got your back, whether it&apos;s questions, paperwork, or just figuring out your options.</p>
                    
                    <p className="font-medium">Keep an eye on your inbox, I&apos;ll be in touch shortly.</p>
                </div>
            </div>

            {/* Finish button */}
            <div className="mt-auto">
                <button
                    onClick={onFinish}
                    className="w-full h-[52px] px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold text-base hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-dm-sans"
                >
                    Finish
                </button>
            </div>
        </div>
    );
}