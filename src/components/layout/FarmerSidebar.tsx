'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Store, 
  ShoppingBag, 
  QrCode,
  Settings,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { mockFarmerProfile } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

interface FarmerSidebarProps {
  currentPath?: string;
  onItemClick?: () => void;
}

export function FarmerSidebar({ currentPath = '/', onItemClick }: FarmerSidebarProps) {
  const { t } = useLanguage();

  const navigationItems = [
    {
      title: t('sidebar.dashboard', 'Farmer Dashboard'),
      href: '/',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      title: t('sidebar.slot_booking', 'Slot Booking & Tokens'),
      href: '/procurement',
      icon: CalendarClock,
      badge: { label: t('sidebar.badge_active', '1 Active'), variant: 'success' as const },
    },
    {
      title: t('sidebar.my_produce', 'My Produce Listings'),
      href: '/produce',
      icon: Store,
      badge: { label: t('sidebar.badge_listed', '5 Listed'), variant: 'neutral' as const },
    },
    {
      title: t('sidebar.marketplace', 'Direct Marketplace'),
      href: '/marketplace',
      icon: ShoppingBag,
      badge: { label: t('sidebar.badge_hot', 'Hot'), variant: 'amber' as const },
    },
    {
      title: t('sidebar.orders', 'Orders & Escrow'),
      href: '/orders',
      icon: ShieldCheck,
      badge: { label: t('sidebar.badge_orders_active', 'Active'), variant: 'success' as const },
    },
    {
      title: t('sidebar.trust_profile', 'Farmer Trust Profile'),
      href: '/profile',
      icon: LayoutDashboard,
      badge: { label: 'Score: 92', variant: 'emerald' as const },
    },
    {
      title: t('sidebar.admin_trust', 'Admin Trust Desk'),
      href: '/admin/trust',
      icon: Settings,
      badge: { label: t('sidebar.badge_oversight', 'Oversight'), variant: 'neutral' as const },
    },
  ];

  return (
    <aside className="w-64 bg-slate-50/70 border-r border-slate-200/80 flex flex-col justify-between min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        {/* Farmer ID Cardlet */}
        <Link
          href="/profile"
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs block hover:border-emerald-300 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              {mockFarmerProfile.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {mockFarmerProfile.name}
                </p>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 truncate font-mono">
                ID: {mockFarmerProfile.kisanId}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-semibold">{t('sidebar.trust_score_label', 'Trust Score:')}</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {t('sidebar.highly_trusted', '🟢 92 Highly Trusted')}
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {t('sidebar.main_menu', 'Farmer Main Menu')}
          </div>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
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

        {/* Quick Token Bar */}
        <Link
          href="/procurement/token/KS-HR-20261029-0042"
          className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-2xl p-3.5 text-white shadow-sm relative overflow-hidden block hover:opacity-95 transition"
        >
          <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-white/5 rounded-full blur-xs pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-300">
              {t('sidebar.active_token_title', 'Active Digital Token')}
            </span>
            <QrCode className="w-4 h-4 text-emerald-300" />
          </div>
          <div className="mt-1 text-lg font-black tracking-tight font-mono text-white">
            {t('sidebar.token_number', '#TK-8842')}
          </div>
          <div className="text-[11px] text-emerald-100/80 mt-0.5">
            {t('sidebar.token_slot_desc', 'Slot: Tomorrow 09:30 AM (Wheat)')}
          </div>
          <div className="mt-2.5 pt-2 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-200">
            <span>{t('sidebar.karnal_hub', 'Karnal APMC Hub')}</span>
            <span className="font-semibold text-emerald-400 underline">
              {t('sidebar.show_qr', 'Show QR →')}
            </span>
          </div>
        </Link>
      </div>

      {/* Bottom Support / Helpline card */}
      <div className="pt-4 border-t border-slate-200/80 space-y-2">
        <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-emerald-900">{t('sidebar.toll_free_title', 'Kisan Toll-Free Help')}</p>
            <p className="text-[10px] text-emerald-700 font-mono">{t('sidebar.toll_free_number', '1800-180-1551 (24x7)')}</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 text-[11px] text-slate-500 font-medium">
          <Link href="/landing" className="flex items-center gap-1 hover:text-emerald-700 transition">
            {t('sidebar.public_landing', '🌐 Public Landing')}
          </Link>
          <Link href="/login" className="flex items-center gap-1 hover:text-rose-700 transition">
            {t('sidebar.logout', '🚪 Logout')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
