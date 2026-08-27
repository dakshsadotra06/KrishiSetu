'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CalendarClock, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  ShieldCheck
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { NextProcurementCard } from '@/components/farmer/NextProcurementCard';
import { MyListingsCard } from '@/components/farmer/MyListingsCard';
import { ProcurementStatusCard } from '@/components/farmer/ProcurementStatusCard';
import { BuyerOffersCard } from '@/components/farmer/BuyerOffersCard';
import { MandiRatesCard } from '@/components/farmer/MandiRatesCard';
import { 
  mockFarmerProfile, 
  mockUpcomingSlot, 
  mockProduceListings, 
  mockBuyerOffers,
  mockFarmerStats
} from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export default function FarmerDashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showQuickBookModal, setShowQuickBookModal] = useState(false);

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Welcome & Overview Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-600/50 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  {t('dash.verified_badge', 'PM-Kisan & Mandi Verified Farmer')}
                </span>
                <span className="text-xs text-emerald-200/90 font-mono">
                  {t('dash.kisan_id_label', 'Kisan ID:')} {mockFarmerProfile.kisanId}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {t('dash.greeting_prefix', 'Good Morning')}, {mockFarmerProfile.name.split(' ')[0]} {t('dash.greeting_suffix', 'Ji!')}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 flex items-center gap-2 flex-wrap">
                <span>{t('dash.today_date', 'Today: Wed, 28 Oct 2026')}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-200 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('dash.mandi_status', 'Karnal Central APMC: Open Today (Normal Inflow)')}
                </span>
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <Link
                href="/procurement/book"
                className="inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition select-none active:scale-[0.98] shadow-xs gap-1.5 cursor-pointer"
              >
                <CalendarClock className="w-4 h-4 text-slate-900" />
                <span>{t('dash.btn_book_slot', 'Book Mandi Slot')}</span>
              </Link>
              <Link
                href="/produce/new"
                className="inline-flex items-center justify-center font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-emerald-600/60 transition select-none active:scale-[0.98] gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>{t('dash.btn_post_produce', 'Post Produce')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Metric Summary StatCards (Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/procurement/token/KS-HR-20261029-0042" className="block group">
            <StatCard
              title={t('stat.active_token_title', 'Active APMC Token')}
              value={t('stat.active_token_value', '1 Active')}
              subtitle={t('stat.active_token_sub', 'Tomorrow 09:30 AM (Gate 2)')}
              icon={<CalendarClock className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />}
              trend={{ value: t('stat.active_token_trend', 'Token TK-8842 →'), isPositive: true }}
              accentColor="emerald"
            />
          </Link>
          <Link href="/produce" className="block group">
            <StatCard
              title={t('stat.produce_stock_title', 'My Produce Stock')}
              value={`${mockFarmerStats.totalStockListedQuintals} ${t('common.qtl', 'Qtl')}`}
              subtitle={t('stat.produce_stock_sub', 'Across 3 listed commodities')}
              icon={<Store className="w-5 h-5 text-sky-600 group-hover:scale-110 transition" />}
              trend={{ value: t('stat.produce_stock_trend', 'Manage Stock →'), isPositive: true }}
              accentColor="blue"
            />
          </Link>
          <Link href="/offers" className="block group">
            <StatCard
              title={t('stat.buyer_offers_title', 'New Buyer Offers')}
              value={`${mockFarmerStats.pendingOffersCount} ${t('stat.offers_unit', 'Offers')}`}
              subtitle={t('stat.buyer_offers_sub', 'Highest: ₹3,720/Qtl')}
              icon={<ShoppingBag className="w-5 h-5 text-amber-600 group-hover:scale-110 transition" />}
              trend={{ value: t('stat.buyer_offers_trend', 'Review Bids →'), isPositive: true }}
              accentColor="amber"
            />
          </Link>
          <Link href="/orders" className="block group">
            <StatCard
              title={t('stat.payouts_title', 'Season Mandi Payouts')}
              value={`₹${mockFarmerStats.totalEarningsThisSeason.toLocaleString('en-IN')}`}
              subtitle={t('stat.payouts_sub', '100% DBT Transferred')}
              icon={<TrendingUp className="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />}
              trend={{ value: t('stat.payouts_trend', 'View Settlement →'), isPositive: true }}
              accentColor="purple"
            />
          </Link>
        </div>

        {/* 2-Column Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Mandi & Procurement Focus */}
          <div className="space-y-6">
            {/* Requirement 6: Next Procurement Card */}
            <NextProcurementCard slot={mockUpcomingSlot} />

            {/* Requirement 8: Procurement Status Card */}
            <ProcurementStatusCard />
          </div>

          {/* Right Column: Marketplace & Direct Buyer Trade Focus */}
          <div className="space-y-6">
            {/* Requirement 9: New Buyer Offers Card */}
            <BuyerOffersCard offers={mockBuyerOffers} />

            {/* Requirement 7: My Listings Card */}
            <MyListingsCard listings={mockProduceListings} />
          </div>
        </div>

        {/* Bottom Section: Mandi Benchmark Rates Ticker */}
        <div>
          <MandiRatesCard />
        </div>
      </div>

      {/* Quick Slot Booking Modal Simulation */}
      {showQuickBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-left relative animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Book APMC Procurement Slot</h3>
              </div>
              <button
                onClick={() => setShowQuickBookModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Select Procurement Mandi</label>
                <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-emerald-600">
                  <option>Karnal Central APMC Mandi (Gate 2) — 6.4 km</option>
                  <option>Taraori Grain Mandi Center — 14.2 km</option>
                  <option>Nilokheri APMC Sub-Yard — 21.0 km</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Commodity</label>
                  <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-emerald-600">
                    <option>Wheat (Sharbati A-Grade)</option>
                    <option>Basmati Paddy (PB 1121)</option>
                    <option>Mustard (Pusa-25)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Quantity (Quintals)</label>
                  <input
                    type="number"
                    defaultValue="120"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Available Date & 2-Hr Slot</label>
                <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-emerald-600">
                  <option>Tomorrow: 08:00 AM - 10:00 AM (8 slots left)</option>
                  <option>Tomorrow: 10:00 AM - 12:00 PM (14 slots left)</option>
                  <option>Day After: 08:00 AM - 10:00 AM (20 slots left)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-950 text-[11px]">
                🌾 <strong>Guaranteed Digital Token:</strong> Instant token generation with live queue tracking prevents waiting at Mandi gate.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickBookModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowQuickBookModal(false);
                  router.push('/procurement/token/KS-HR-20261029-0042');
                }}
              >
                Confirm & Generate Token
              </Button>
            </div>
          </div>
        </div>
      )}
    </FarmerPortalLayout>
  );
}
