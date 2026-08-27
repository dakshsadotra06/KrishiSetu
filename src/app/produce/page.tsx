'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  Plus, 
  TrendingUp, 
  Wheat, 
  Sparkles, 
  Building2
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { ProduceCard } from '@/components/produce/ProduceCard';
import { mockProduceListings, mockFarmerStats } from '@/data/mockData';

export default function MyProducePage() {
  const [filterTab, setFilterTab] = useState<'ALL' | 'ACTIVE' | 'OFFERS'>('ALL');

  const filteredListings = mockProduceListings.filter((item) => {
    if (filterTab === 'ACTIVE') return item.status === 'ACTIVE';
    if (filterTab === 'OFFERS') return item.offersCount > 0;
    return true;
  });

  const totalLotValue = mockProduceListings.reduce(
    (acc, curr) => acc + curr.quantityAvailable * curr.expectedPricePerUnit,
    0
  );

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Header with Title and Create Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Store className="w-7 h-7 text-emerald-600" />
              <span>My Produce Inventory & Listings</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage harvested stock, track marketplace buyer bids, and post new produce
            </p>
          </div>

          <Link
            href="/produce/new"
            className="inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-xl select-none active:scale-[0.98] cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs text-xs sm:text-sm px-4 py-2.5 gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ List New Harvest</span>
          </Link>
        </div>

        {/* 3 Metric Stat Strips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-semibold block">Total Harvest Stock</span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {mockProduceListings.reduce((acc, c) => acc + c.quantityAvailable, 0)} Quintals
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold">5 active commodities</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Wheat className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-semibold block">Marketplace Lot Value</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">
                ₹{(totalLotValue / 100000).toFixed(2)} Lakhs
              </p>
              <span className="text-[11px] text-slate-500">Across verified buyer network</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-amber-800 text-xs font-semibold block">Pending Buyer Offers</span>
              <p className="text-xl sm:text-2xl font-black text-amber-900 mt-0.5">
                {mockFarmerStats.pendingOffersCount} Active Offers
              </p>
              <span className="text-[11px] text-amber-700 font-bold">Up to +₹120/Qtl above floor</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
              filterTab === 'ALL'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Produce ({mockProduceListings.length})
          </button>
          <button
            onClick={() => setFilterTab('ACTIVE')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
              filterTab === 'ACTIVE'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Active on Marketplace (4)
          </button>
          <button
            onClick={() => setFilterTab('OFFERS')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
              filterTab === 'OFFERS'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Has Buyer Offers (4)
          </button>
        </div>

        {/* Produce Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((item) => (
            <ProduceCard key={item.id} produce={item} isOwner />
          ))}
        </div>

        {/* APMC Integration Reminder Callout */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Dual Channel Selling:</strong> Unsold marketplace produce can be diverted directly to the nearest APMC Mandi under guaranteed MSP anytime.
            </span>
          </div>
          <Link
            href="/procurement"
            className="text-xs font-bold text-emerald-700 hover:underline shrink-0"
          >
            View APMC Mandi Centers →
          </Link>
        </div>
      </div>
    </FarmerPortalLayout>
  );
}
