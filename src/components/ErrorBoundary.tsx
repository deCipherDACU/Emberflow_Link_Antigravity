'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { LiquidGlassCard } from './ui/LiquidGlassCard';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
        console.error('Uncaught error:', error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <LiquidGlassCard className="max-w-lg w-full text-center p-8">
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
                <h1 className="text-2xl font-headline font-bold text-white mb-2">Something went wrong</h1>
                <p className="text-muted-foreground mb-6">
                    An unexpected error occurred. Please try again.
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="text-left bg-black/20 p-4 rounded-lg mb-4">
                        <summary className="cursor-pointer font-semibold text-white">Error Details</summary>
                        <pre className="mt-2 text-xs text-destructive whitespace-pre-wrap">
                            <code>{this.state.error.stack}</code>
                        </pre>
                    </details>
                )}
                <Button onClick={this.handleRetry}>Retry</Button>
            </LiquidGlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
