'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Scale, 
  Users, 
  ShieldAlert, 
  CreditCard, 
  MessageSquare, 
  Award,
  ArrowLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface AdminSidebarProps {
  onItemClick?: () => void;
}

export function AdminSidebar({ onItemClick }: AdminSidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: 'Operations Overview',
      href: '/admin',
      icon: LayoutDashboard,
      badge: { label: 'Live', variant: 'emerald' as const },
    },
    {
      title: 'Mandi Centers & Quotas',
      href: '/admin/procurement',
      icon: Building2,
      badge: { label: '22 Mandis', variant: 'neutral' as const },
    },
    {
      title: 'Weighbridge Queue Console',
      href: '/admin/queue',
      icon: Scale,
      badge: { label: 'Active Bays', variant: 'success' as const },
    },
    {
      title: 'User KYC & Registry',
      href: '/admin/users',
      icon: Users,
      badge: { label: '52 Pending', variant: 'amber' as const },
    },
    {
      title: 'Orders & Escrow Ledger',
      href: '/admin/orders',
      icon: CreditCard,
      badge: { label: '₹4.28 Cr', variant: 'neutral' as const },
    },
    {
      title: 'Dispute Arbitration',
      href: '/admin/disputes',
      icon: ShieldAlert,
      badge: { label: '4 Urgent', variant: 'error' as const },
    },
    {
      title: 'Trust & Reputation Desk',
      href: '/admin/trust',
      icon: Award,
      badge: { label: 'Fairness', variant: 'emerald' as const },
    },
    {
      title: 'SMS Gateway Logs',
      href: '/admin/sms',
      icon: MessageSquare,
      badge: { label: '99.82%', variant: 'neutral' as const },
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6">
        {/* Admin Station Header */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              🏛️
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-black text-white truncate">
                  Haryana APMC Desk
                </p>
              </div>
              <p className="text-[10px] text-emerald-400 truncate font-mono">
                Operator: Shri R.K. Deshmukh
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">System Gateway:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              99.8% Online
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Mandi Command Console
          </div>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge
                    size="sm"
                    variant={isActive ? 'emerald' : item.badge.variant}
                    className={isActive ? 'bg-white/20 text-white border-white/20 ring-0' : ''}
                  >
                    {item.badge.label}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Return Action */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Farmer Portal</span>
        </Link>
      </div>
    </aside>
  );
}
