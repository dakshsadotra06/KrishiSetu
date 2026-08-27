'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { DigitalTokenPass } from '@/components/procurement/DigitalTokenPass';
import { mockCurrentDigitalToken } from '@/data/mockData';

export default function TokenPassPage() {
  const params = useParams();
  const tokenId = (params?.id as string) || mockCurrentDigitalToken.tokenNumber;

  const tokenData = {
    ...mockCurrentDigitalToken,
    tokenNumber: tokenId,
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/procurement"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>SLOT RESERVATION CONFIRMED</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Digital Procurement Gate Pass
              </h1>
            </div>
          </div>

          <Link
            href="/procurement/queue"
            className="inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-xl select-none active:scale-[0.98] cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-xs border border-amber-500 text-xs px-3.5 py-2"
          >
            Live Queue Tracker →
          </Link>
        </div>

        <DigitalTokenPass token={tokenData} />
      </div>
    </FarmerPortalLayout>
  );
}
