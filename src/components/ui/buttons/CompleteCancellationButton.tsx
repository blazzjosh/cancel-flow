'use client';

import React from 'react';
import CancellationFlowButton from '../CancellationFlowButton';

export interface CompleteCancellationButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    className?: string;
}

/**
 * Specialized button for "Complete cancellation" actions
 * Maintains consistent styling and behavior
 */
const CompleteCancellationButton: React.FC<CompleteCancellationButtonProps> = ({
    onClick,
    disabled = false,
    loading = false,
    children = "Complete cancellation",
    className
}) => {
    return (
        <CancellationFlowButton
            variant="secondary"
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            className={className}
        >
            {children}
        </CancellationFlowButton>
    );
};

export default CompleteCancellationButton;
