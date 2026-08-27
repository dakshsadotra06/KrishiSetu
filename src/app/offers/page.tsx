'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  X
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockBuyerOffers } from '@/data/mockData';
import { BuyerOffer } from '@/types';

export default function BuyerOffersPage() {
  const router = useRouter();
  const [offers] = useState<BuyerOffer[]>(mockBuyerOffers);
  const [selectedOfferForAccept, setSelectedOfferForAccept] = useState<BuyerOffer | null>(null);
  const [counterOffer, setCounterOffer] = useState<BuyerOffer | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(3750);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleAcceptDeal = () => {
    if (!selectedOfferForAccept) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSelectedOfferForAccept(null);
      router.push('/orders/order-89410');
    }, 800);
  };

  const handleSendCounter = () => {
    if (!counterOffer) return;
    alert(`Counter offer of ₹${counterPrice}/Qtl sent to ${counterOffer.buyerName} (${counterOffer.buyerCompany}). You will receive an SMS when they respond.`);
    setCounterOffer(null);
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                Direct Marketplace Bids
              </span>
              <span className="text-xs text-slate-500">• 30% Escrow Protected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
              <ShoppingBag className="w-7 h-7 text-emerald-600" />
              <span>Buyer Offers & Negotiations</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review and negotiate wholesale purchase bids with guaranteed advance escrow
            </p>
          </div>

          <Link
            href="/orders"
            className="inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition select-none active:scale-[0.98] self-start sm:self-auto gap-1.5"
          >
            <span>View Active Orders →</span>
          </Link>
        </div>

        {/* Escrow Guarantee Highlight */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Zero Risk Wholesale Selling</h3>
              <p className="text-xs text-emerald-100/80">
                When you accept an offer, the buyer is required to fund 30% into digital escrow before you load your truck.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-200 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/40 shrink-0">
            Backed by ICICI & SBI Agri-Desks
          </span>
        </div>

        {/* Offers List */}
        <div className="space-y-4">
          {offers.map((offer, index) => {
            const isBestOffer = index === 0;
            const escrowAdvance = Math.round(offer.totalOfferValue * (offer.escrowAdvancePercent / 100));
            const deliveryBalance = offer.totalOfferValue - escrowAdvance;

            return (
              <Card
                key={offer.id}
                className={`border transition-all ${
                  isBestOffer
                    ? 'border-amber-400 shadow-md ring-2 ring-amber-400/20 bg-gradient-to-br from-white via-amber-50/15 to-white'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {isBestOffer && (
                  <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-black flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>TOP RECOMMENDATION: HIGHEST VERIFIED BID</span>
                    </div>
                    <span>Expires in {offer.expiresInHours} hrs</span>
                  </div>
                )}

                <CardContent className="p-5 space-y-4 text-xs">
                  {/* Top Row: Buyer & Crop */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-base text-slate-900">
                          {offer.buyerCompany}
                        </span>
                        <Badge variant="emerald" size="sm">
                          KYC Verified
                        </Badge>
                        <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                          ⭐ {offer.buyerRating} (142 deals)
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">
                        Sourcing for: <strong>{offer.listingTitle}</strong> • Contact: {offer.buyerName}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold">Offered Price</span>
                      <p className="text-xl sm:text-2xl font-black text-emerald-700">
                        ₹{offer.offeredPricePerUnit.toLocaleString('en-IN')}{' '}
                        <span className="text-xs text-slate-500 font-semibold">/{offer.unit}</span>
                      </p>
                    </div>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-semibold">Quantity Bid</span>
                      <span className="font-bold text-slate-900 text-sm">
                        {offer.quantityRequested} {offer.unit}
                      </span>
                    </div>

                    <div className="p-2 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-400 block font-semibold">Total Deal Value</span>
                      <span className="font-bold text-slate-900 text-sm">
                        ₹{offer.totalOfferValue.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-300">
                      <span className="text-[10px] text-emerald-800 block font-bold">
                        Guaranteed 30% Escrow Advance
                      </span>
                      <span className="font-black text-emerald-950 text-sm">
                        ₹{escrowAdvance.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-600 gap-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Remaining 70% (₹{deliveryBalance.toLocaleString('en-IN')}) released on weighbridge delivery</span>
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      Pickup: Buyer will arrange truck to your farm shed
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="bg-slate-50/80 border-t border-slate-100 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Link
                    href="/buyer/buyer-01"
                    className="text-xs font-bold text-slate-600 hover:text-emerald-700 underline self-start sm:self-auto"
                  >
                    View Buyer Track Record & Reviews →
                  </Link>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCounterOffer(offer);
                        setCounterPrice(offer.offeredPricePerUnit + 100);
                      }}
                    >
                      Counter Offer
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      onClick={() => setSelectedOfferForAccept(offer)}
                    >
                      Accept Offer
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Modal: Confirm Accept Offer */}
        {selectedOfferForAccept && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-lg border-emerald-300 shadow-2xl bg-white animate-in fade-in zoom-in-95 duration-150">
              <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>Confirm Sale Agreement</span>
                  </CardTitle>
                  <button
                    onClick={() => setSelectedOfferForAccept(null)}
                    className="p-1 rounded-lg text-emerald-200 hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">
                      {selectedOfferForAccept.buyerCompany}
                    </span>
                    <span className="font-mono text-emerald-700 font-extrabold text-base">
                      ₹{selectedOfferForAccept.offeredPricePerUnit.toLocaleString('en-IN')}/{selectedOfferForAccept.unit}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Lot: {selectedOfferForAccept.listingTitle} ({selectedOfferForAccept.quantityRequested} {selectedOfferForAccept.unit})
                  </p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">Total Transaction Amount:</span>
                    <strong className="text-slate-900 text-sm">
                      ₹{selectedOfferForAccept.totalOfferValue.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-emerald-800 font-bold">
                    <span>30% Advance Escrow Required:</span>
                    <span>
                      ₹{Math.round(selectedOfferForAccept.totalOfferValue * 0.3).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                  <p className="font-bold">Next Steps Upon Acceptance:</p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-900">
                    <li>A legally binding purchase order will be generated.</li>
                    <li>The buyer will be notified via SMS to deposit 30% into KrishiSetu Escrow.</li>
                    <li>Do NOT load or dispatch your truck until escrow is marked green.</li>
                  </ol>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
                <Button variant="outline" size="md" onClick={() => setSelectedOfferForAccept(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  isLoading={isProcessing}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  onClick={handleAcceptDeal}
                >
                  Confirm & Generate Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Modal: Counter Offer */}
        {counterOffer && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-amber-300 shadow-2xl bg-white">
              <CardHeader className="bg-amber-500 text-slate-950 rounded-t-2xl pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">Counter Offer Negotiation</CardTitle>
                  <button onClick={() => setCounterOffer(null)} className="p-1 rounded-lg hover:bg-black/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Buyer&apos;s Current Offer</span>
                  <p className="text-lg font-bold text-slate-800">
                    ₹{counterOffer.offeredPricePerUnit.toLocaleString('en-IN')} / {counterOffer.unit}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">
                    Your Proposed Counter Price (₹ / {counterOffer.unit})
                  </label>
                  <input
                    type="number"
                    value={counterPrice}
                    onChange={(e) => setCounterPrice(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-base font-black text-slate-950 focus:outline-emerald-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    New Total Value: ₹{(counterPrice * counterOffer.quantityRequested).toLocaleString('en-IN')}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
                <Button variant="outline" size="md" onClick={() => setCounterOffer(null)}>
                  Cancel
                </Button>
                <Button variant="amber" size="md" onClick={handleSendCounter}>
                  Send Counter Offer
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </FarmerPortalLayout>
  );
}
