'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Clock, 
  Check, 
  Star, 
  Lock,
  TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BuyerOffer } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface BuyerOffersCardProps {
  offers: BuyerOffer[];
}

export function BuyerOffersCard({ offers }: BuyerOffersCardProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedOffer, setSelectedOffer] = useState<BuyerOffer | null>(null);
  const [showAcceptSuccess, setShowAcceptSuccess] = useState(false);

  return (
    <>
      <Card className="border-amber-200/80 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <CardTitle className="text-lg text-slate-900 font-bold">
                {t('offers.title', 'New Buyer Offers')}
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              {t('offers.subtitle', 'Direct bids on your produce with verified protected advance escrow')}
            </CardDescription>
          </div>
          <Badge variant="amber" size="md" dot>
            {offers.length} {t('offers.new_bids', 'New Bids')}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          {/* Best Offer Highlight Banner */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-amber-500/15 border border-amber-300 text-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <p className="text-xs font-semibold">
                <strong>{t('offers.highest_offer_prefix', 'Highest Offer:')}</strong> {t('offers.highest_offer_desc', '₹3,720/Qtl for Basmati Paddy')}
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" /> {t('offers.above_asking', '₹70 above asking')}
            </span>
          </div>

          {/* Offers List */}
          <div className="space-y-3">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-xs transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  {/* Buyer Identity */}
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{offer.buyerCompany}</span>
                      <Badge variant="success" size="sm">
                        <ShieldCheck className="w-3 h-3 text-emerald-600 mr-0.5" /> {t('offers.verified', 'Verified')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{t('offers.rep', 'Rep:')} {offer.buyerName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {offer.buyerRating}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">{offer.createdAt}</span>
                    </div>
                  </div>

                  {/* Target Commodity */}
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 self-start sm:self-auto">
                    {t('offers.for', 'For:')} {offer.listingTitle}
                  </span>
                </div>

                {/* Offer Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">{t('offers.offered_rate', 'Offered Rate')}</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      ₹{offer.offeredPricePerUnit.toLocaleString('en-IN')}/{offer.unit === 'Quintals' ? t('common.qtl', 'Qtl') : offer.unit}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">{t('offers.requested_qty', 'Requested Qty')}</span>
                    <span className="font-bold text-slate-800">
                      {offer.quantityRequested} {offer.unit === 'Quintals' ? t('common.quintals', 'Quintals') : offer.unit}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">{t('offers.total_value', 'Total Deal Value')}</span>
                    <span className="font-bold text-slate-900">
                      ₹{offer.totalOfferValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">{t('offers.advance_escrow', 'Advance Escrow')}</span>
                    <span className="font-bold text-sky-700 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-sky-600" /> {offer.escrowAdvancePercent}% {t('offers.protected', 'Protected')}
                    </span>
                  </div>
                </div>

                {/* Action CTA row */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[11px] text-amber-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('offers.expires_in', 'Expires in')} {offer.expiresInHours} {t('offers.hours', 'hours')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/offers"
                      className="inline-flex items-center justify-center font-semibold text-xs px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                    >
                      {t('offers.counter_price', 'Counter Price')}
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs cursor-pointer"
                      onClick={() => {
                        setSelectedOffer(offer);
                        setShowAcceptSuccess(true);
                      }}
                    >
                      {t('offers.accept_offer', 'Accept Offer')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="bg-amber-50/40 border-t border-amber-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Lock className="w-3.5 h-3.5 text-sky-600" />
            <span>KrishiSetu Escrow holds advance payment safely before you ship produce.</span>
          </div>
          <Link
            href="/offers"
            className="inline-flex items-center justify-center font-bold text-xs px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 transition cursor-pointer"
          >
            Compare All Offers ({offers.length}) →
          </Link>
        </CardFooter>
      </Card>

      {/* Accept Offer Simulation Modal */}
      {showAcceptSuccess && selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center relative animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Offer Accepted!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Order generated for <span className="font-bold text-slate-800">{selectedOffer.buyerCompany}</span>
            </p>

            <div className="my-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Deal Amount:</span>
                <span className="font-bold text-slate-900">₹{selectedOffer.totalOfferValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Protected Escrow (35%):</span>
                <span className="font-bold text-emerald-700">₹{((selectedOffer.totalOfferValue * selectedOffer.escrowAdvancePercent) / 100).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Next Action:</span>
                <span className="font-semibold text-slate-800">Buyer depositing advance</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              You will receive an SMS alert as soon as the advance is locked in escrow. Do not dispatch goods until advance status shows CONFIRMED.
            </p>

            <div className="mt-5">
              <Button
                variant="primary"
                className="w-full text-xs cursor-pointer"
                onClick={() => {
                  setShowAcceptSuccess(false);
                  router.push('/orders/order-89410');
                }}
              >
                Go to Orders & Tracking →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
