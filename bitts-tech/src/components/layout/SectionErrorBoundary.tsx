"use client";

import { Component, ReactNode } from "react";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  label: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="bg-surface px-6 py-12">
          <div className="mx-auto max-w-container rounded-xl border border-border bg-background p-6 text-center text-text-secondary">
            {this.props.label} is temporarily unavailable.
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
