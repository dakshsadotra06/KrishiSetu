'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sprout, 
  Bell, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronDown
} from 'lucide-react';
import { mockFarmerProfile } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function Navbar({ onMobileMenuToggle, isMobileMenuOpen }: NavbarProps) {
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeRole, setActiveRole] = useState<'FARMER' | 'BUYER' | 'ADMIN'>('FARMER');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            {onMobileMenuToggle && (
              <button
                type="button"
                onClick={onMobileMenuToggle}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-150">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                    {t('brand.name', 'KrishiSetu')}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 tracking-wide uppercase">
                    {t('nav.beta', 'Beta')}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 -mt-0.5 hidden sm:inline-block">
                  {t('brand.subtitle', 'Direct Mandi & Fair Buyer Gateway')}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Live MSP / Mandi Benchmark ticker on large screens */}
          <div className="hidden xl:flex items-center gap-2 bg-emerald-50/70 border border-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-emerald-800">{t('nav.msp_live', 'MSP Live:')}</span>
            <span>{t('nav.msp_wheat', 'Wheat: ₹2,275/Qtl')}</span>
            <span className="text-emerald-300">|</span>
            <span>{t('nav.msp_basmati', 'Basmati: ₹3,725/Qtl (+3.4%)')}</span>
          </div>

          {/* Right: Actions, Language, Role Switcher, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              title={language === 'EN' ? 'Switch to Hindi (हिंदी में देखें)' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'EN' ? 'English' : 'हिंदी'}</span>
            </button>

            {/* Role Switcher Demo Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>
                  {t('nav.portal_prefix', 'Portal:')} {activeRole === 'FARMER' ? t('nav.farmer', 'Farmer') : activeRole === 'BUYER' ? t('nav.buyer', 'Buyer') : t('nav.admin', 'Admin')}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {t('nav.switch_portal', 'Switch Active Portal')}
                  </div>
                  <button
                    type="button"
                    onClick={() => { 
                      setActiveRole('FARMER'); 
                      setShowRoleMenu(false);
                      router.push('/');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 font-medium text-emerald-900 flex items-center justify-between cursor-pointer"
                  >
                    <span>{t('nav.farmer_portal', '🌾 Farmer Portal (Dashboard)')}</span>
                    {activeRole === 'FARMER' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => { 
                      setActiveRole('BUYER'); 
                      setShowRoleMenu(false);
                      router.push('/marketplace');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <span>{t('nav.buyer_portal', '🏢 Buyer Portal (Marketplace)')}</span>
                    {activeRole === 'BUYER' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => { 
                      setActiveRole('ADMIN'); 
                      setShowRoleMenu(false);
                      router.push('/admin/trust');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <span>{t('nav.admin_portal', '🛡️ Mandi Admin Desk')}</span>
                    {activeRole === 'ADMIN' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs space-y-2 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">{t('nav.alerts', 'Platform Alerts')}</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {t('nav.new_alerts', '2 New')}
                    </span>
                  </div>
                  <Link
                    href="/orders/order-89410"
                    onClick={() => setShowNotifications(false)}
                    className="block p-2 rounded-xl hover:bg-slate-50 border border-slate-100 text-left transition"
                  >
                    <p className="font-bold text-slate-900 text-[11px]">{t('nav.advance_funded', '30% Escrow Funded (₹2,07,200)')}</p>
                    <p className="text-[10px] text-slate-500">{t('nav.advance_funded_desc', 'AgroStar deposited advance for Basmati Paddy')}</p>
                  </Link>
                  <Link
                    href="/procurement/token/KS-HR-20261029-0042"
                    onClick={() => setShowNotifications(false)}
                    className="block p-2 rounded-xl hover:bg-slate-50 border border-slate-100 text-left transition"
                  >
                    <p className="font-bold text-slate-900 text-[11px]">{t('nav.slot_confirmed', 'Mandi Slot Confirmed')}</p>
                    <p className="text-[10px] text-slate-500">{t('nav.slot_confirmed_desc', 'Karnal APMC Gate 2: Tomorrow 09:30 AM')}</p>
                  </Link>
                </div>
              )}
            </div>

            {/* Farmer Profile Avatar */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-90 transition cursor-pointer"
              title="View Farmer Profile & Trust Score"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {mockFarmerProfile.name.charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {mockFarmerProfile.name.split(' ')[0]}
                  </span>
                  {mockFarmerProfile.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500">
                  {mockFarmerProfile.location}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
