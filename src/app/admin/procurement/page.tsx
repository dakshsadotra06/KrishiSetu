'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ArrowLeft, 
  Plus, 
  Sliders, 
  Calendar, 
  CheckCircle2
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function AdminProcurementManagementPage() {
  const [centers, setCenters] = useState([
    {
      id: 'karnal-01',
      name: 'Karnal Central APMC Mandi (Gate 2)',
      district: 'Karnal',
      status: 'OPEN' as 'OPEN' | 'PAUSED' | 'CLOSED',
      slotIntervalMins: 60,
      maxTrucksPerWindow: 15,
      commodities: [
        { name: 'Wheat (Sharbati)', capacity: 2500, booked: 2350 },
        { name: 'Basmati Paddy', capacity: 1500, booked: 1420 },
        { name: 'Mustard (Pusa)', capacity: 1000, booked: 850 },
      ],
    },
    {
      id: 'taraori-02',
      name: 'Taraori Grain Mandi Center',
      district: 'Karnal',
      status: 'OPEN' as 'OPEN' | 'PAUSED' | 'CLOSED',
      slotIntervalMins: 60,
      maxTrucksPerWindow: 12,
      commodities: [
        { name: 'Basmati Paddy', capacity: 2000, booked: 1950 },
        { name: 'Wheat', capacity: 1200, booked: 1150 },
      ],
    },
    {
      id: 'panipat-01',
      name: 'Panipat APMC Yard (Sector 25)',
      district: 'Panipat',
      status: 'PAUSED' as 'OPEN' | 'PAUSED' | 'CLOSED',
      slotIntervalMins: 60,
      maxTrucksPerWindow: 14,
      commodities: [
        { name: 'Cotton', capacity: 2000, booked: 1200 },
        { name: 'Wheat', capacity: 2500, booked: 1600 },
      ],
    },
  ]);

  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideNotice, setOverrideNotice] = useState<string | null>(null);

  const toggleCenterStatus = (id: string) => {
    setCenters((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'OPEN' ? 'PAUSED' : c.status === 'PAUSED' ? 'CLOSED' : 'OPEN';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleApplyQuotaOverride = () => {
    setCenters((prev) =>
      prev.map((c) => {
        if (c.id === 'karnal-01') {
          return {
            ...c,
            commodities: c.commodities.map((item) =>
              item.name.includes('Wheat') ? { ...item, capacity: item.capacity + 200 } : item
            ),
          };
        }
        return c;
      })
    );
    setShowOverrideModal(false);
    setOverrideNotice('Emergency Shift Added: Karnal Mandi Wheat Quota expanded by +200 Quintals.');
  };

  const scheduleDays = [
    { date: '29 Oct (Thu)', utilization: 94, status: 'RED', label: 'Near Capacity' },
    { date: '30 Oct (Fri)', utilization: 88, status: 'AMBER', label: 'Filling Fast' },
    { date: '31 Oct (Sat)', utilization: 72, status: 'AMBER', label: 'Moderate' },
    { date: '01 Nov (Sun)', utilization: 45, status: 'GREEN', label: 'Slots Open' },
    { date: '02 Nov (Mon)', utilization: 30, status: 'GREEN', label: 'Ample Quota' },
  ];

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Mandi Centers & Procurement Quotas (Screen A2)
              </h1>
              <p className="text-xs text-slate-400">
                Configure Mandi intake capacities, 60-minute window limits, and schedule heatmaps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sliders className="w-3.5 h-3.5" />}
              onClick={() => setShowOverrideModal(true)}
            >
              Emergency Quota Override
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => alert('Add New Procurement Center modal initialized.')}
            >
              + Add Procurement Center
            </Button>
          </div>
        </div>

        {overrideNotice && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{overrideNotice}</span>
            </div>
            <button onClick={() => setOverrideNotice(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* 7-Day Schedule Heatmap */}
        <Card className="bg-slate-800/90 border-slate-700 text-slate-200 shadow-md">
          <CardHeader className="pb-3 border-b border-slate-700">
            <CardTitle className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Statewide 5-Day Capacity Heatmap & Booking Saturation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {scheduleDays.map((day) => (
                <div
                  key={day.date}
                  className={`p-3 rounded-xl border text-center space-y-1 ${
                    day.status === 'RED'
                      ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                      : day.status === 'AMBER'
                      ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                      : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  }`}
                >
                  <span className="text-[11px] font-bold block">{day.date}</span>
                  <p className="text-xl font-black font-mono">{day.utilization}%</p>
                  <span className="text-[10px] font-semibold opacity-90 block">{day.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mandi Directory & Quota Control Cards */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Active Mandi Hubs & Quota Allocations</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {centers.map((center) => (
              <Card key={center.id} className="bg-slate-800/90 border-slate-700 text-slate-200 shadow-lg flex flex-col justify-between">
                <CardHeader className="pb-3 border-b border-slate-700">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{center.name}</h3>
                      <span className="text-[11px] text-slate-400 font-medium">{center.district} District</span>
                    </div>
                    <button
                      onClick={() => toggleCenterStatus(center.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${
                        center.status === 'OPEN'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : center.status === 'PAUSED'
                          ? 'bg-amber-950 text-amber-300 border-amber-700'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {center.status} (Click to toggle)
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3.5 text-xs">
                  {/* Slot Configuration */}
                  <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-700 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Intake Windows:</span>
                    <span className="font-bold text-white font-mono">
                      {center.slotIntervalMins}m / max {center.maxTrucksPerWindow} trucks
                    </span>
                  </div>

                  {/* Commodity Quotas */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Commodity Quotas:
                    </span>
                    {center.commodities.map((comm) => {
                      const commPercent = Math.round((comm.booked / comm.capacity) * 100);
                      return (
                        <div key={comm.name} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-300 font-medium">{comm.name}</span>
                            <span className="font-mono text-slate-400">
                              {comm.booked} / {comm.capacity} Qtl ({commPercent}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                commPercent >= 90
                                  ? 'bg-rose-500'
                                  : commPercent >= 75
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${commPercent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Override Modal */}
        {showOverrideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-700 shadow-2xl text-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Mandi Quota & Emergency Shift Override</span>
                </h3>
                <button onClick={() => setShowOverrideModal(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  Heavy wheat harvest inflow reported in Karnal district. Authorize an extra weighbridge shift and expand daily quota by +200 Quintals.
                </p>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Center Target</span>
                  <p className="font-bold text-white">Karnal Central APMC Mandi (Gate 2)</p>
                  <p className="text-emerald-400 font-bold">+200 Qtl Daily Shift Expansion</p>
                </div>
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowOverrideModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleApplyQuotaOverride}>
                  Confirm & Expand Quota
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPortalLayout>
  );
}
