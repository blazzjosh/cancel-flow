'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant = 'primary',
        size = 'lg',
        fullWidth = true,
        loading = false,
        disabled,
        children,
        ...props
    }, ref) => {
        const baseClasses = "inline-flex items-center justify-center font-semibold text-base transition-all duration-200 font-dm-sans focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
            secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
            success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
            danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
            outline: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
            ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400"
        };

        const sizes = {
            sm: "h-10 px-4 py-2 rounded-md text-sm",
            md: "h-12 px-5 py-3 rounded-lg text-base",
            lg: "h-[52px] px-6 py-3 rounded-lg text-base",
            xl: "h-16 px-8 py-4 rounded-lg text-lg"
        };

        const widthClass = fullWidth ? "w-full" : "";

        return (
            <button
                className={cn(
                    baseClasses,
                    variants[variant],
                    sizes[size],
                    widthClass,
                    className
                )}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {loading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
