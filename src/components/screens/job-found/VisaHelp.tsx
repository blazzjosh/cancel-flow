'use client';

import { CancellationFlowButton } from '@/components/ui';

interface VisaHelpProps {
    onFinish: () => void;
}

export default function VisaHelp({ onFinish }: VisaHelpProps) {
    return (
        <div className="flex flex-col w-full p-5">
            {/* Main heading */}
            <div className="mb-6">
                <h2 className="text-[36px] font-semibold leading-[36px] tracking-[-1.08px] text-[#41403D] font-dm-sans mb-4">
                    We&apos;re here to help! 🛂
                </h2>
                <p className="text-base font-medium text-gray-700 font-dm-sans">
                    Visa and immigration processes can be complex, but we&apos;ve got your back.
                </p>
            </div>

            {/* Help information */}
            <div className="mb-8">
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-800 font-dm-sans mb-4">
                        What we can help you with:
                    </h3>
                    <ul className="space-y-3 text-base text-gray-700 font-dm-sans">
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3 mt-1">✓</span>
                            <div>
                                <strong>Visa Application Guidance:</strong> Step-by-step assistance with visa applications
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3 mt-1">✓</span>
                            <div>
                                <strong>Document Preparation:</strong> Help with required documents and forms
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3 mt-1">✓</span>
                            <div>
                                <strong>Legal Consultation:</strong> Connect you with immigration experts
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3 mt-1">✓</span>
                            <div>
                                <strong>Timeline Planning:</strong> Help you understand processing times and deadlines
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Next steps */}
            <div className="mb-8">
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans mb-4">
                    Our team will reach out to you within 24 hours to discuss your specific visa needs and create a personalized plan.
                </p>
                <p className="text-base font-medium leading-[24px] text-gray-700 font-dm-sans">
                    In the meantime, your cancellation will be processed, but you&apos;ll still have access to our visa assistance services.
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