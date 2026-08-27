'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { ProduceCard } from '@/components/produce/ProduceCard';
import { mockProduceListings } from '@/data/mockData';

export default function PublicMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  const categories = ['All', 'Grains', 'Oilseeds', 'Pulses', 'Vegetables'];

  const filtered = mockProduceListings.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchGrade = selectedGrade === 'All' || item.grade === selectedGrade;

    return matchSearch && matchCategory && matchGrade;
  });

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Marketplace Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold tracking-wider uppercase border border-emerald-400/30">
                Direct Farmer-to-Buyer Portal
              </span>
              <span className="text-xs text-emerald-200 font-semibold">• 100% Escrow Backed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              KrishiSetu National Produce Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              Source harvest lots directly from verified farmers without APMC commission agent cuts. Advance funds protected in digital escrow.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/produce/new"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition select-none active:scale-[0.98] shadow-sm gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Post Your Crop Lot</span>
            </Link>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search wheat, basmati, mustard, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grade Selector */}
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-700 focus:outline-emerald-600"
          >
            <option value="All">All Grades</option>
            <option value="Grade A+">Grade A+ Only</option>
            <option value="Grade A">Grade A Only</option>
          </select>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <ProduceCard key={item.id} produce={item} isOwner={false} />
          ))}
        </div>

        {/* Escrow Guarantee Notice */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Buyer Protection:</strong> 30% advance escrow deposit is locked until gate inspection. No funds transferred until you confirm electronic weighment and moisture standards.
            </span>
          </div>
          <span className="font-bold text-emerald-800 shrink-0">
            Escrow Partner: ICICI Bank / SBI Agri-Desk
          </span>
        </div>
      </div>
    </FarmerPortalLayout>
  );
}
