'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Store, 
  Plus, 
  Eye, 
  Sparkles 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProduceListing } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface MyListingsCardProps {
  listings: ProduceListing[];
}

export function MyListingsCard({ listings }: MyListingsCardProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Card className="border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <CardTitle className="text-lg text-slate-900 font-bold">
                {t('listings.title', 'My Active Produce Listings')}
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              {t('listings.subtitle', 'Direct marketplace stock visible to 450+ verified buyers')}
            </CardDescription>
          </div>
          <Badge variant="emerald" size="md">
            {listings.length} {t('listings.badge', 'Listed')}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          {listings.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 hover:border-slate-200 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              {/* Left Details */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder if image fails to load
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.variety}</p>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className="font-bold text-emerald-700">
                      {item.quantityAvailable} {item.unit === 'Quintals' ? t('common.quintals', 'Quintals') : item.unit}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-slate-700">
                      ₹{item.expectedPricePerUnit.toLocaleString('en-IN')}/{item.unit === 'Quintals' ? t('common.qtl', 'Qtl') : item.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Metrics / Quick Stats */}
              <div className="flex items-center gap-2 sm:flex-col sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" /> {item.viewsCount} {t('listings.views', 'views')}
                  </span>
                  {item.offersCount > 0 ? (
                    <Badge variant="amber" size="sm" dot>
                      {item.offersCount} {t('listings.offers', 'Offers')}
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      {t('listings.active', 'Active')}
                    </Badge>
                  )}
                </div>
                <Link
                  href="/produce"
                  className="text-[11px] font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer"
                >
                  {t('listings.manage', 'Manage All Listings →')}
                </Link>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex items-center justify-between bg-slate-50/50 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Total Available Stock: <strong>265 Quintals</strong>
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/produce/new"
              className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition select-none active:scale-[0.98] shadow-xs gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t('dash.btn_post_produce', 'Post Produce')}</span>
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Add Produce Demo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-left relative animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Post New Produce for Sale</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Connect directly with verified corporate and institutional buyers across India with protected advance payment.
              </p>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Crop / Commodity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sharbati Wheat, Basmati Rice, Mustard"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-emerald-600"
                  defaultValue="Kinner Kinnow Oranges (Grade A)"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Available Quantity (Qtl)</label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-emerald-600"
                    defaultValue="80"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Expected Price (₹/Qtl)</label>
                  <input
                    type="number"
                    placeholder="e.g. 3500"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-emerald-600"
                    defaultValue="4200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Mandatory Produce Photo</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition cursor-pointer">
                  <p className="text-slate-500 font-medium">📸 Tap to take photo with camera</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">High-quality photos increase buyer bid speed by 3x</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowAddModal(false);
                  router.push('/produce');
                }}
              >
                Publish to Marketplace
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
