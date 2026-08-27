'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Download, 
  Home, 
  Star, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockOrders } from '@/data/mockData';

export default function OrderSettlementReceiptPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'order-89410';

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const [rating, setRating] = useState(5);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const handleRateBuyer = (stars: number) => {
    setRating(stars);
    setRatingSubmitted(true);
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center space-y-1.5 pt-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            🎉 Deal Completed & Payment Settled!
          </h1>
          <p className="text-xs text-slate-500">
            Order #{order.orderNumber} • 100% Escrow and Handover DBT Transferred
          </p>
        </div>

        {/* Digital Payment Receipt Card */}
        <Card className="border-2 border-emerald-300 shadow-xl overflow-hidden bg-gradient-to-b from-white via-emerald-50/10 to-white">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                🌿 KRISHISETU OFFICIAL DIGITAL PAYMENT RECEIPT
              </span>
            </div>
            <p className="text-[10px] text-emerald-200 mt-0.5 font-mono">
              SETTLEMENT VOUCHER: SETT-MH-20261028-00994
            </p>
          </div>

          <CardContent className="p-6 space-y-6 text-xs">
            {/* Total Paid Hero */}
            <div className="text-center bg-slate-50 p-6 rounded-2xl border-2 border-emerald-200 relative space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                TOTAL TRANSACTION AMOUNT CREDITED
              </span>
              <p className="text-3xl sm:text-4xl font-black text-emerald-950 font-mono">
                ₹{order.totalDealAmount.toLocaleString('en-IN')}.00
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>CREDITED VIA DIRECT BENEFIT TRANSFER (DBT)</span>
              </div>
            </div>

            {/* Split Breakdown */}
            <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 bg-white">
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-600">30% Escrow Advance Released:</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{order.escrowAdvanceAmount.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-600">70% Delivery Handover Settlement:</span>
                <span className="font-mono font-bold text-slate-900">
                  ₹{order.deliveryBalanceAmount.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="p-3.5 flex items-center justify-between bg-slate-50">
                <span className="text-slate-700 font-semibold">Credited Bank Account:</span>
                <span className="font-mono font-bold text-slate-900">Bank of Maharashtra (A/C ****4092)</span>
              </div>
              <div className="p-3.5 flex items-center justify-between bg-slate-50">
                <span className="text-slate-700 font-semibold">NEFT / RTGS UTR Number:</span>
                <span className="font-mono font-bold text-emerald-800">MAHB26301988210</span>
              </div>
              <div className="p-3.5 flex items-center justify-between text-slate-500 text-[11px]">
                <span>Settlement Date & Time:</span>
                <span className="font-semibold text-slate-800">28 Oct 2026, 03:45 PM</span>
              </div>
            </div>

            {/* Reputation Bonus Award Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs">Reputation Bonus Awarded!</h4>
                  <p className="text-[11px] text-emerald-800">
                    Successful on-time delivery added <strong>+2 points</strong> to your KrishiSetu Trust Score.
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                className="text-xs font-bold text-emerald-800 underline shrink-0"
              >
                View Score →
              </Link>
            </div>

            {/* Rate Buyer Section */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">
                How was your experience trading with {order.buyerCompany}?
              </span>
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRateBuyer(star)}
                    className="p-1 hover:scale-110 transition cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {ratingSubmitted && (
                <span className="text-[11px] text-emerald-800 font-bold block animate-in fade-in">
                  ✓ Feedback submitted! Thank you for strengthening the farmer community.
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => {
                if (typeof window !== 'undefined') window.print();
              }}
            >
              Print / Save Tax Invoice (PDF)
            </Button>

            <Link
              href="/orders"
              className="inline-flex items-center justify-center font-bold text-xs px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition select-none active:scale-[0.98] gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to Orders Hub</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
