'use client';

import React from 'react';
import CancellationFlowButton from '../CancellationFlowButton';

export interface ContinueButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    className?: string;
}

/**
 * Specialized button for "Continue" actions
 * Maintains consistent styling and behavior
 */
const ContinueButton: React.FC<ContinueButtonProps> = ({
    onClick,
    disabled = false,
    loading = false,
    children = "Continue",
    className
}) => {
    return (
        <CancellationFlowButton
            variant="primary"
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            className={className}
        >
            {children}
        </CancellationFlowButton>
    );
};

export default ContinueButton;
