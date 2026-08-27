'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Scale, 
  AlertTriangle, 
  Search, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Activity
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function AdminMacroDashboardPage() {
  const [districtScope, setDistrictScope] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const mandiCenters = [
    {
      id: 'karnal-01',
      name: 'Karnal Central APMC Mandi (Gate 2)',
      district: 'Karnal',
      activeBays: 3,
      capacityQtl: 5000,
      bookedQtl: 4620,
      queueLength: 14,
      status: 'ACTIVE' as const,
      avgWaitMins: 18,
    },
    {
      id: 'taraori-02',
      name: 'Taraori Grain Mandi Yard',
      district: 'Karnal',
      activeBays: 2,
      capacityQtl: 3200,
      bookedQtl: 3100,
      queueLength: 22,
      status: 'LIMITED_CAPACITY' as const,
      avgWaitMins: 35,
    },
    {
      id: 'panipat-01',
      name: 'Panipat APMC Hub (Sector 25)',
      district: 'Panipat',
      activeBays: 3,
      capacityQtl: 4500,
      bookedQtl: 2800,
      queueLength: 6,
      status: 'ACTIVE' as const,
      avgWaitMins: 12,
    },
    {
      id: 'kurukshetra-01',
      name: 'Thanesar Sub-Yard Complex',
      district: 'Kurukshetra',
      activeBays: 2,
      capacityQtl: 2800,
      bookedQtl: 1950,
      queueLength: 9,
      status: 'ACTIVE' as const,
      avgWaitMins: 15,
    },
    {
      id: 'ambala-01',
      name: 'Ambala Cantt Grain Terminal',
      district: 'Ambala',
      activeBays: 0,
      capacityQtl: 2000,
      bookedQtl: 0,
      queueLength: 0,
      status: 'CLOSED' as const,
      avgWaitMins: 0,
    },
  ];

  const filteredCenters = mandiCenters.filter((m) => {
    const matchesDistrict = districtScope === 'ALL' || m.district.toUpperCase() === districtScope.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        {/* Top Command Bar */}
        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Scope & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                State Scope:
              </span>
              <select
                value={districtScope}
                onChange={(e) => setDistrictScope(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-400 focus:outline-emerald-500"
              >
                <option value="ALL">Haryana (All 22 Districts)</option>
                <option value="Karnal">Karnal District</option>
                <option value="Panipat">Panipat District</option>
                <option value="Kurukshetra">Kurukshetra District</option>
                <option value="Ambala">Ambala District</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>APMC Network: Online • SMS Gateway: 99.82% Delivery</span>
            </div>
          </div>

          {/* Right: Global Admin Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Farmers, Buyers, Tokens, Orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* 5 Macro KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Farmers */}
          <Link href="/admin/users" className="block group">
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/80 rounded-2xl p-4 transition shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Registered Farmers</span>
                <Users className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              </div>
              <div className="mt-2 text-2xl font-black text-white font-mono">24,850</div>
              <span className="text-[11px] font-bold text-emerald-400 block mt-0.5">
                +320 this week (Kisan ID)
              </span>
            </div>
          </Link>

          {/* Card 2: Verified Buyers */}
          <Link href="/admin/users" className="block group">
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-sky-500/80 rounded-2xl p-4 transition shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Verified Buyers</span>
                <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition" />
              </div>
              <div className="mt-2 text-2xl font-black text-white font-mono">1,420</div>
              <span className="text-[11px] font-bold text-amber-400 block mt-0.5">
                38 pending KYC review
              </span>
            </div>
          </Link>

          {/* Card 3: Active Orders & Escrow */}
          <Link href="/admin/orders" className="block group">
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/80 rounded-2xl p-4 transition shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Active Escrow Value</span>
                <CreditCard className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
              </div>
              <div className="mt-2 text-2xl font-black text-white font-mono">₹4.28 Cr</div>
              <span className="text-[11px] font-bold text-purple-300 block mt-0.5">
                312 active trades
              </span>
            </div>
          </Link>

          {/* Card 4: Mandi Procurement */}
          <Link href="/admin/procurement" className="block group">
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/80 rounded-2xl p-4 transition shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Today&apos;s Procurement</span>
                <Scale className="w-4 h-4 text-teal-400 group-hover:scale-110 transition" />
              </div>
              <div className="mt-2 text-2xl font-black text-white font-mono">18,450 Qtl</div>
              <span className="text-[11px] font-bold text-teal-300 block mt-0.5">
                92% daily target achieved
              </span>
            </div>
          </Link>

          {/* Card 5: Open Disputes */}
          <Link href="/admin/disputes" className="block group">
            <div className="bg-slate-800/80 border border-slate-700/80 hover:border-rose-500/80 rounded-2xl p-4 transition shadow-md">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Open Disputes</span>
                <AlertTriangle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
              </div>
              <div className="mt-2 text-2xl font-black text-rose-400 font-mono">4 Urgent</div>
              <span className="text-[11px] font-bold text-rose-300 block mt-0.5">
                Avg resolution: 2.4 hrs
              </span>
            </div>
          </Link>
        </div>

        {/* 2-Column Responsive Layout: Mandi Status Matrix & Right Rail Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Table: Mandi Procurement Center Status Matrix (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Procurement Center Real-Time Capacity & Queue Matrix</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Live weighbridge scale telemetry and active token gate lengths
                </p>
              </div>
              <Link
                href="/admin/procurement"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Manage All Centers</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-700 text-[11px] uppercase tracking-wider">
                      <th className="p-3.5 font-bold">Mandi Center</th>
                      <th className="p-3.5 font-bold">District</th>
                      <th className="p-3.5 font-bold">Bays</th>
                      <th className="p-3.5 font-bold">Daily Quota Filled</th>
                      <th className="p-3.5 font-bold">Queue / Wait</th>
                      <th className="p-3.5 font-bold">Status</th>
                      <th className="p-3.5 font-bold text-right">Console</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredCenters.map((mandi) => {
                      const percent = Math.round((mandi.bookedQtl / (mandi.capacityQtl || 1)) * 100);
                      return (
                        <tr key={mandi.id} className="hover:bg-slate-700/40 transition">
                          <td className="p-3.5 font-bold text-white">
                            <div>{mandi.name}</div>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {mandi.id}</span>
                          </td>
                          <td className="p-3.5 text-slate-300 font-medium">{mandi.district}</td>
                          <td className="p-3.5 text-slate-200 font-bold font-mono">
                            {mandi.activeBays} Active
                          </td>
                          <td className="p-3.5">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono font-semibold">
                                <span>{mandi.bookedQtl.toLocaleString('en-IN')} Qtl</span>
                                <span>{percent}%</span>
                              </div>
                              <div className="w-28 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    percent >= 90
                                      ? 'bg-rose-500'
                                      : percent >= 75
                                      ? 'bg-amber-400'
                                      : 'bg-emerald-500'
                                  }`}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-white font-mono">{mandi.queueLength} trucks</div>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              ~{mandi.avgWaitMins} mins
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                mandi.status === 'ACTIVE'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                                  : mandi.status === 'LIMITED_CAPACITY'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                                  : 'bg-slate-900 text-slate-400 border-slate-700'
                              }`}
                            >
                              {mandi.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <Link
                              href="/admin/queue"
                              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline"
                            >
                              Open Scale →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Rail: Operational Action Panel */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Priority Supervisor Queue</span>
            </h2>

            <Card className="bg-slate-800/90 border-slate-700 text-slate-200 shadow-lg">
              <CardHeader className="pb-3 border-b border-slate-700">
                <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Action Items Requiring State Officer Sign-off
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 space-y-4 text-xs">
                {/* Item 1: KYC */}
                <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-sky-400" />
                      <span>Farmer Land Record KYC</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded">
                      14 Pending
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Aadhaar and Haryana Jamabandi land records submitted for Karnal & Panipat tehsils.
                  </p>
                  <Link
                    href="/admin/users"
                    className="inline-block text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    Review Document Queue →
                  </Link>
                </div>

                {/* Item 2: Disputes */}
                <div className="p-3 bg-slate-900/90 border border-rose-900/50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Active Escrow Disputes</span>
                    </span>
                    <span className="text-[10px] font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded">
                      4 Urgent
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Weight discrepancy reported on Basmati shipment #ORD-9912. Escrow ₹3,72,000 on hold.
                  </p>
                  <Link
                    href="/admin/disputes"
                    className="inline-block text-[11px] font-bold text-rose-400 hover:text-rose-300 underline"
                  >
                    Open Evidence Comparator →
                  </Link>
                </div>

                {/* Item 3: Escrow High Value Releases */}
                <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>High-Value Escrow Releases</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded">
                      2 Awaiting
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Deals exceeding ₹10 Lakhs requiring dual officer key sign-off before DBT trigger.
                  </p>
                  <Link
                    href="/admin/orders"
                    className="inline-block text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    Authorize DBT Payouts →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminPortalLayout>
  );
}
