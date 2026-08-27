import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'emerald' | 'amber';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/10',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-300 ring-emerald-600/20',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 ring-amber-600/10',
    amber: 'bg-amber-100 text-amber-900 border-amber-300 ring-amber-600/20',
    info: 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-600/10',
    error: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/10',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-600/10',
  };

  const dotColors = {
    success: 'bg-emerald-500',
    emerald: 'bg-emerald-600',
    warning: 'bg-amber-500',
    amber: 'bg-amber-600',
    info: 'bg-sky-500',
    error: 'bg-rose-500',
    neutral: 'bg-slate-500',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border ring-1 font-medium tracking-tight whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
