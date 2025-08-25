'use client';

import { CancellationFlowButton } from '@/components/ui';

interface VisaHelpProps {
    onFinish: () => void;
}

export default function VisaHelp({ onFinish }: VisaHelpProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-4">
                <h2 className="text-[32px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans">
                    Your cancellation's all sorted, mate, no more charges.
                </h2>
            </div>

            {/* Message from Mihailo */}
            <div className="mb-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                src="/mihailo-profile.jpeg"
                                alt="Mihailo Bozic"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col space-y-1 mb-4">
                                <span className="font-semibold text-gray-800 font-dm-sans">Mihailo Bozic</span>
                                <span className="text-sm text-gray-500 font-dm-sans">&lt;mihailo@migratemate.co&gt;</span>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700 font-dm-sans">
                                <p className='font-bold'>I'll be reaching out soon to help with the visa side of things.</p>
                                <p className='mb-2'>We've got your back, whether it's questions, paperwork, or just figuring out your options.</p>
                                <p className='mb-2 font-bold'>Keep an eye on your inbox, I'll be in touch shortly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action button */}
            <div className="mt-4">
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