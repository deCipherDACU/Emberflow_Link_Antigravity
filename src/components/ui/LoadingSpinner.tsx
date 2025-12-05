'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { LiquidGlassCard } from './LiquidGlassCard';

const spinnerVariants = cva(
  'animate-spin rounded-full border-solid border-t-transparent',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 border-2',
        md: 'w-12 h-12 border-4',
        lg: 'w-16 h-16 border-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  message,
  className,
  fullScreen = false
}) => {
  const spinnerElement = (
    <motion.div
      className={cn('flex flex-col items-center justify-center gap-4', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={cn(
            spinnerVariants({ size }),
            'border-primary'
        )}
      />
      {message && <p className="text-muted-foreground font-medium">{message}</p>}
    </motion.div>
  );

  if (fullScreen) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <LiquidGlassCard className="p-8">
                {spinnerElement}
            </LiquidGlassCard>
        </div>
    )
  }

  return spinnerElement;
};
