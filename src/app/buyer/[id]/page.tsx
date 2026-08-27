'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrustDetailsModal } from '@/components/trust/TrustDetailsModal';
import { mockBuyerProfiles } from '@/data/mockData';
import { getUserTrustProfile } from '@/lib/trustService';

export default function BuyerProfilePage() {
  const params = useParams();
  const buyerId = (params?.id as string) || 'buyer-01';

  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);

  const buyer = mockBuyerProfiles.find((b) => b.id === buyerId) || mockBuyerProfiles[0];
  const trustProfile = getUserTrustProfile(buyerId, buyer.companyName, 'BUYER');

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/offers"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Verified Buyer Profile
              </h1>
              <p className="text-xs text-slate-500">
                Institutional creditworthiness & historical reputation
              </p>
            </div>
          </div>

          <button
            onClick={() => alert('Report dialogue opened for compliance review')}
            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Buyer</span>
          </button>
        </div>

        {/* Hero Profile Card */}
        <Card className="border-slate-200 shadow-md">
          <CardContent className="p-6 space-y-6">
            {/* Buyer Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {buyer.companyName}
                    </h2>
                    <span className="font-mono text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      {buyer.gstin}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{buyer.location} • Member Since {buyer.memberSince}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Contact: <strong>{buyer.contactPerson}</strong> ({buyer.phone})
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-black text-slate-950 text-base">{buyer.rating}</span>
                  <span className="text-[11px] text-slate-500 font-semibold">/ 5.0</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">142 Farmer Ratings</span>
              </div>
            </div>

            {/* DYNAMIC TRUST SCORE BOX */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                    KRISHISETU TRUST & REPUTATION
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-950 font-mono">
                    {trustProfile.score}
                  </span>
                  <span className="text-slate-500 font-bold text-sm">/ 100</span>
                  <span className="text-emerald-800 font-extrabold text-xs sm:text-sm ml-1">
                    🟢 Highly Trusted
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<ShieldCheck className="w-4 h-4" />}
                onClick={() => setIsTrustModalOpen(true)}
              >
                View Trust Details
              </Button>
            </div>

            {/* Trust & Verification Badges */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>✓ Mobile Verified</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>✓ Business Verified</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>✓ Payment Verified</span>
              </span>
            </div>

            {/* Performance Record Matrix */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Transaction Performance Record
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Completed Orders</span>
                  <span className="text-base font-black text-slate-900">{trustProfile.completedOrders}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Disputes</span>
                  <span className="text-base font-black text-slate-700">{trustProfile.totalDisputes}</span>
                  <span className="text-[9px] text-emerald-700 block font-semibold">(Resolved Fairly)</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Success Rate</span>
                  <span className="text-base font-black text-emerald-700">{trustProfile.successRatePercent}%</span>
                  <span className="text-[9px] text-slate-500 block">Prompt Settlements</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">On-Time Escrow</span>
                  <span className="text-base font-black text-emerald-700">{buyer.onTimePaymentRatePercent}%</span>
                </div>
              </div>
            </div>

            {/* Recent Farmer Feedback */}
            <div className="space-y-2.5 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                Recent Farmer Reviews
              </span>
              <div className="space-y-2">
                {buyer.farmerReviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{rev.farmerName}</span>
                        <span className="text-slate-400 text-[11px]">({rev.location})</span>
                      </div>
                      <span className="text-amber-600 font-bold text-xs">★ {rev.rating}</span>
                    </div>
                    <p className="text-slate-600 text-xs italic">&ldquo;{rev.comment}&rdquo;</p>
                    <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <Link
              href="/offers"
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              ← Back to Offers
            </Link>

            <Link
              href="/offers"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition select-none active:scale-[0.98] gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Accept Offer from {buyer.companyName}</span>
            </Link>
          </CardFooter>
        </Card>

        {/* Trust Details Modal */}
        <TrustDetailsModal
          userId={buyerId}
          isOpen={isTrustModalOpen}
          onClose={() => setIsTrustModalOpen(false)}
        />
      </div>
    </FarmerPortalLayout>
  );
}
