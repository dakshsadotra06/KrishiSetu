import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';
import { TrustLevel, TrustAccountStatus } from '@/types';

interface TrustBadgeProps {
  score: number;
  level?: TrustLevel;
  status?: TrustAccountStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function TrustBadge({
  score,
  size = 'md',
  showLabel = true,
}: TrustBadgeProps) {
  // Determine badge styling based on score and level
  let colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let badgeIcon = <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />;
  let labelText = 'Highly Trusted';

  if (score >= 80) {
    colorClass = 'bg-emerald-50 text-emerald-900 border-emerald-300';
    badgeIcon = <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />;
    labelText = 'Highly Trusted';
  } else if (score >= 65) {
    colorClass = 'bg-teal-50 text-teal-800 border-teal-300';
    badgeIcon = <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />;
    labelText = 'Trusted';
  } else if (score >= 50) {
    colorClass = 'bg-amber-50 text-amber-900 border-amber-300';
    badgeIcon = <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
    labelText = 'Average';
  } else if (score >= 30) {
    colorClass = 'bg-orange-50 text-orange-950 border-orange-300';
    badgeIcon = <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />;
    labelText = 'Low Trust';
  } else {
    colorClass = 'bg-rose-50 text-rose-950 border-rose-300';
    badgeIcon = <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />;
    labelText = 'Under Review';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  };

  return (
    <div
      className={`inline-flex items-center rounded-xl border font-bold ${colorClass} ${sizeClasses[size]}`}
      title={`Trust Score: ${score}/100 (${labelText})`}
    >
      {badgeIcon}
      <span className="font-black font-mono">{score}</span>
      {showLabel && (
        <>
          <span className="opacity-40">•</span>
          <span className="font-semibold">{labelText}</span>
        </>
      )}
    </div>
  );
}
