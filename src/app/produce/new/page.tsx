'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { CreateListingWizard } from '@/components/produce/CreateListingWizard';

export default function NewProduceListingPage() {
  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/produce"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Produce Listing
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Broadcast your verified crop to 450+ institutional & food processor buyers
            </p>
          </div>
        </div>

        <CreateListingWizard />
      </div>
    </FarmerPortalLayout>
  );
}
