'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  MapPin
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrustDetailsModal } from '@/components/trust/TrustDetailsModal';

export default function FarmerProfilePage() {
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);

  // Farmer details per requirements
  const farmer = {
    name: 'RAJESH PATIL',
    kisanId: 'MH-NSK-2024-9142',
    phone: '+91 98765 43210',
    location: 'Mohadi Village, Dindori, Nashik, Maharashtra',
    memberSince: 'March 2023',
    rating: 4.7,
    trustScore: 92,
    trustLevel: 'HIGHLY_TRUSTED' as const,
    completedOrders: 27,
    disputes: 1,
    successfulTransactionsPercent: 96,
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <User className="w-7 h-7 text-emerald-600" />
              <span>Farmer Profile & Trust Credentials</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified identity, APMC accreditation, and marketplace reputation
            </p>
          </div>

          <Link
            href="/admin/trust"
            className="text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto"
          >
            Admin Trust Portal →
          </Link>
        </div>

        {/* Profile Card */}
        <Card className="border-slate-200 shadow-md overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 text-white flex items-center justify-center font-bold text-2xl border border-white/20">
                RP
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {farmer.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 bg-emerald-900/60 border border-emerald-400/40 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>✓ Verified Farmer</span>
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{farmer.location}</span>
                </p>
                <p className="text-[11px] text-emerald-200/80 font-mono mt-0.5">
                  Kisan Pass ID: {farmer.kisanId}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/20 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end gap-1 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="font-black text-white text-lg">{farmer.rating}</span>
                <span className="text-xs text-emerald-200 font-semibold">/ 5</span>
              </div>
              <span className="text-[10px] text-emerald-200 block">Based on 27 Completed Orders</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-6 text-xs">
            {/* Dynamic Trust Score Hero Section */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                    DYNAMIC TRUST & REPUTATION
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-950 font-mono">
                    {farmer.trustScore}
                  </span>
                  <span className="text-slate-500 font-bold text-sm">/ 100</span>
                  <span className="text-emerald-800 font-extrabold text-sm ml-1">
                    🟢 Highly Trusted
                  </span>
                </div>
                <p className="text-slate-600 text-xs">
                  Reflects verified weighbridge deliveries, quality standards, and prompt communications.
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<ShieldCheck className="w-4 h-4" />}
                  onClick={() => setIsTrustModalOpen(true)}
                >
                  View Trust Details
                </Button>
                <span className="text-[10px] text-slate-400">
                  Updated after every verified delivery
                </span>
              </div>
            </div>

            {/* Reputation Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Completed Orders</span>
                <span className="text-lg font-black text-slate-900">{farmer.completedOrders}</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Disputes</span>
                <span className="text-lg font-black text-slate-800">{farmer.disputes}</span>
                <span className="text-[9px] text-emerald-700 block font-semibold">(Resolved Fairly)</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Success Rate</span>
                <span className="text-lg font-black text-emerald-700">{farmer.successfulTransactionsPercent}%</span>
                <span className="text-[9px] text-slate-500 block">On-Time Deliveries</span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Farmer Status</span>
                <span className="text-sm font-black text-emerald-800 block mt-1">Verified</span>
                <span className="text-[9px] text-emerald-700 block">Aadhaar & Land Record</span>
              </div>
            </div>

            {/* Trust Assurance Statement */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-slate-700">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Fairness Guarantee for All Farmers:</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Raising an electronic weighbridge discrepancy or moisture issue NEVER reduces your Trust Score. KrishiSetu protects honest producers against unfair deductions.
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50/80 border-t border-slate-100 p-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-emerald-700"
            >
              ← Back to Farmer Dashboard
            </Link>

            <Link
              href="/orders"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View Order History →
            </Link>
          </CardFooter>
        </Card>

        {/* Modal */}
        <TrustDetailsModal
          userId="farmer-01"
          isOpen={isTrustModalOpen}
          onClose={() => setIsTrustModalOpen(false)}
        />
      </div>
    </FarmerPortalLayout>
  );
}
