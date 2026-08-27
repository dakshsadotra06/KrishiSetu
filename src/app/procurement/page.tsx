'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Search, 
  Activity, 
  QrCode, 
  ShieldCheck
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { CenterCard } from '@/components/procurement/CenterCard';
import { mockProcurementCenters, mockCurrentDigitalToken } from '@/data/mockData';

export default function ProcurementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState<'ALL' | 'OPEN'>('ALL');

  const filteredCenters = mockProcurementCenters.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.acceptedCrops.some((crop) => crop.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = filterState === 'ALL' || c.status === 'OPEN';

    return matchesSearch && matchesFilter;
  });

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Active Token Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-600/50 uppercase">
                  Upcoming Appointment
                </span>
                <span className="font-mono text-xs text-emerald-100 font-bold">
                  {mockCurrentDigitalToken.tokenNumber}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold mt-0.5">
                {mockCurrentDigitalToken.centerName}
              </h2>
              <p className="text-xs text-emerald-100/80">
                {mockCurrentDigitalToken.date} • {mockCurrentDigitalToken.timeSlot} • 4 Farmers Ahead
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <Link
              href="/procurement/queue"
              className="inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-xl select-none active:scale-[0.98] cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-xs border border-amber-500 text-xs px-3.5 py-2 gap-1.5"
            >
              <Activity className="w-4 h-4 text-slate-900 animate-pulse" />
              <span>Track Live Queue</span>
            </Link>
            <Link
              href={`/procurement/token/${mockCurrentDigitalToken.tokenNumber}`}
              className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl select-none active:scale-[0.98] cursor-pointer bg-white/10 hover:bg-white/20 text-white border border-emerald-600/60 text-xs px-3.5 py-2"
            >
              <span>View Pass</span>
            </Link>
          </div>
        </div>

        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-7 h-7 text-emerald-600" />
              <span>APMC Procurement Centers</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Official government Mandi yards near Karnal, Haryana (within 40 km)
            </p>
          </div>

          {/* Search bar & Open Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search center or crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-emerald-600"
              />
            </div>

            <button
              onClick={() => setFilterState(filterState === 'ALL' ? 'OPEN' : 'ALL')}
              className={`text-xs px-3 py-2 rounded-xl border font-semibold transition ${
                filterState === 'OPEN'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {filterState === 'OPEN' ? '✓ Showing Open Only' : 'All Centers'}
            </button>
          </div>
        </div>

        {/* Procurement Centers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredCenters.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>

        {/* Informational Guidance Footer */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Zero Waiting at Mandi:</strong> Guaranteed slot reservations eliminate overnight tractor queues. Electronic weighbridge receipts are synced with direct benefit transfer (DBT).
            </span>
          </div>
          <span className="font-semibold text-emerald-800 shrink-0">
            Helpline: 1800-KRISHI-SETU
          </span>
        </div>
      </div>
    </FarmerPortalLayout>
  );
}
