'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { SlotBookingForm } from '@/components/procurement/SlotBookingForm';

function BookingContent() {
  const searchParams = useSearchParams();
  const centerId = searchParams.get('center') || undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/procurement"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Schedule APMC Appointment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Book an unloading window and receive an instant digital QR token pass
          </p>
        </div>
      </div>

      <SlotBookingForm initialCenterId={centerId} />
    </div>
  );
}

export default function BookSlotPage() {
  return (
    <FarmerPortalLayout>
      <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading booking form...</div>}>
        <BookingContent />
      </Suspense>
    </FarmerPortalLayout>
  );
}
