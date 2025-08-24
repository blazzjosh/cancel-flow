'use client';

import { DownsellVariant } from '../types';

interface DownsellScreenProps {
    downsellVariant: DownsellVariant;
    onDownsellResponse: (accepted: boolean) => void;
}

export default function DownsellScreen({ downsellVariant, onDownsellResponse }: DownsellScreenProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    We built this to help you land the job, this makes it a little easier.
                </h2>
                <p className="text-gray-600 text-lg">
                    We&apos;ve been there and we&apos;re here to help you.
                </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Here&apos;s {downsellVariant === 'A' ? '50% off' : '$10 off'} until you find a job.
                </h3>

                <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-green-600">
                        ${downsellVariant === 'A' ? '12.50' : '15'}/month
                    </span>
                    <span className="text-gray-500 line-through">
                        ${downsellVariant === 'A' ? '25' : '25'}/month
                    </span>
                </div>

                <button
                    onClick={() => onDownsellResponse(true)}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors mb-3"
                >
                    Get {downsellVariant === 'A' ? '50% off' : '$10 off'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                    You won&apos;t be charged until your next billing date.
                </p>
            </div>

            <button
                onClick={() => onDownsellResponse(false)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm"
            >
                No thanks
            </button>
        </div>
    );
}
