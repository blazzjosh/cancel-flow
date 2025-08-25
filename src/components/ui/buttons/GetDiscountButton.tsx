'use client';

import React from 'react';
import CancellationFlowButton from '../CancellationFlowButton';

export interface GetDiscountButtonProps {
    onClick: () => void;
    discountedPrice: string;
    originalPrice: string;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

/**
 * Specialized button for "Get 50% off" offers
 * Maintains consistent styling and pricing display
 */
const GetDiscountButton: React.FC<GetDiscountButtonProps> = ({
    onClick,
    discountedPrice,
    originalPrice,
    disabled = false,
    loading = false,
    className
}) => {
    return (
        <CancellationFlowButton
            variant="success"
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            className={className}
        >
            Get 50% off | {discountedPrice} <span className="line-through text-green-200">{originalPrice}</span>
        </CancellationFlowButton>
    );
};

export default GetDiscountButton;
