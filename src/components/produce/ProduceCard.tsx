'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Eye, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProduceListing } from '@/types';

interface ProduceCardProps {
  produce: ProduceListing;
  isOwner?: boolean;
}

export function ProduceCard({ produce, isOwner = true }: ProduceCardProps) {
  const router = useRouter();
  const lotValue = produce.quantityAvailable * produce.expectedPricePerUnit;
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidPrice, setBidPrice] = useState(produce.expectedPricePerUnit);
  const [bidQty, setBidQty] = useState(produce.quantityAvailable);
  const [bidSuccess, setBidSuccess] = useState(false);

  const totalBidValue = bidPrice * bidQty;
  const advanceEscrowValue = Math.round(totalBidValue * 0.3);

  return (
    <>
      <Card className="border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all overflow-hidden flex flex-col justify-between">
        <div>
          {/* Top Image Banner with Grade & Category Badges */}
          <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={produce.imageUrl}
              alt={produce.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-lg bg-emerald-900/80 backdrop-blur-xs text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                {produce.category}
              </span>
              {produce.grade && (
                <span className="px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold">
                  {produce.grade}
                </span>
              )}
            </div>

            <div className="absolute bottom-2.5 right-2.5">
              <Badge
                variant={
                  produce.status === 'ACTIVE'
                    ? 'success'
                    : produce.status === 'PENDING_OFFERS'
                    ? 'amber'
                    : 'neutral'
                }
                size="sm"
              >
                {produce.status === 'ACTIVE' ? 'Active' : produce.status === 'PENDING_OFFERS' ? 'Under Offer' : 'Sold Out'}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Title & Variety */}
            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-tight truncate">
                {produce.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Variety: <span className="font-semibold text-slate-700">{produce.variety}</span>
              </p>
            </div>

            {/* Price & Quantity Grid */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Quantity</span>
                <span className="font-bold text-slate-900 text-sm">
                  {produce.quantityAvailable} {produce.unit}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Asking Price</span>
                <span className="font-black text-emerald-700 text-sm">
                  ₹{produce.expectedPricePerUnit.toLocaleString('en-IN')}/{produce.unit === 'Quintals' ? 'Qtl' : produce.unit}
                </span>
              </div>
            </div>

            {/* Total Lot Value & Views */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <span className="text-slate-600">
                Lot Value: <strong className="text-slate-900">₹{lotValue.toLocaleString('en-IN')}</strong>
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{produce.viewsCount} Buyers Viewed</span>
              </span>
            </div>

            {/* Buyer Offers Notification Callout */}
            {produce.offersCount > 0 && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="font-bold">{produce.offersCount} Active Buyer Bids</span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  Action Needed
                </span>
              </div>
            )}
          </CardContent>
        </div>

        {/* Footer Actions */}
        <CardFooter className="bg-slate-50/70 border-t border-slate-100 p-3 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[120px]">{produce.location}</span>
          </span>

          <div className="flex items-center gap-2">
            {isOwner ? (
              produce.offersCount > 0 ? (
                <Link
                  href="/offers"
                  className="inline-flex items-center justify-center font-bold text-xs px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition select-none active:scale-[0.98] gap-1 shadow-2xs cursor-pointer"
                >
                  <span>Compare Offers ({produce.offersCount})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href="/produce/new"
                  className="inline-flex items-center justify-center font-semibold text-xs px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition select-none active:scale-[0.98] cursor-pointer"
                >
                  <span>Edit Details</span>
                </Link>
              )
            ) : (
              <button
                type="button"
                onClick={() => setShowBidModal(true)}
                className="inline-flex items-center justify-center font-bold text-xs px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition select-none active:scale-[0.98] gap-1 shadow-2xs cursor-pointer"
              >
                <span>Make Buyer Bid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Quick Buyer Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-left relative animate-in fade-in zoom-in duration-150">
            {!bidSuccess ? (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Place Corporate Purchase Bid</h3>
                      <p className="text-[11px] text-slate-500">{produce.title} • {produce.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBidModal(false)}
                    className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-4 space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Bid Rate (₹/Quintal) *</label>
                      <input
                        type="number"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(Number(e.target.value))}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:outline-emerald-600"
                      />
                      <span className="text-[10px] text-slate-400">Asking: ₹{produce.expectedPricePerUnit}</span>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Quantity Needed (Qtl) *</label>
                      <input
                        type="number"
                        value={bidQty}
                        onChange={(e) => setBidQty(Number(e.target.value))}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:outline-emerald-600"
                      />
                      <span className="text-[10px] text-slate-400">Available: {produce.quantityAvailable} Qtl</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Total Purchase Commitment:</span>
                      <span className="font-black text-slate-900 font-mono">₹{totalBidValue.toLocaleString('en-IN')}.00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-800 font-bold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" /> Required 30% Escrow Deposit:
                      </span>
                      <span className="font-black text-emerald-800 font-mono">₹{advanceEscrowValue.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    By submitting, a legally binding purchase offer is forwarded to the farmer. Your 30% advance escrow is held safely in KrishiSetu Trust till delivery.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBidModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setBidSuccess(true);
                      setTimeout(() => {
                        setShowBidModal(false);
                        router.push('/offers');
                      }, 1200);
                    }}
                  >
                    Confirm & Deposit Escrow
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Bid Placed Successfully!</h3>
                <p className="text-xs text-slate-500">
                  Redirecting to Buyer Offers negotiation desk...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
