'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  FileCheck, 
  AlertTriangle, 
  MapPin
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockOrders } from '@/data/mockData';

export default function OrderInspectionPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = (params?.id as string) || 'order-89410';

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const [isApproving, setIsApproving] = useState(false);

  const handleApproveAndSettle = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      router.push(`/orders/${order.id}/settlement`);
    }, 900);
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/orders/${order.id}`}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Depot Delivery & Quality Inspection
              </h1>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} • Electronic Weighbridge Handover
              </p>
            </div>
          </div>

          <Badge variant="emerald" size="md" dot>
            Weighbridge Passed
          </Badge>
        </div>

        {/* Hero Hub Arrival Notice */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Truck Arrived: AgroStar Pune Procurement Hub</h3>
              <p className="text-xs text-emerald-200">
                Bay 4 Unloading Yard • Unloading & Moisture Assay Complete
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-emerald-100 bg-black/20 px-3 py-1 rounded-lg">
            28 Oct, 02:45 PM
          </span>
        </div>

        {/* Quality Officer Inspection Card */}
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Inspection Certificate by Buyer Quality Officer</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-5 text-xs">
            {/* Inspection Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Net Weight Recorded</span>
                <span className="text-base font-black text-emerald-950 font-mono">25.10 Qtl</span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">Matched (99.6% accurate)</span>
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Quality Grade Assay</span>
                <span className="text-base font-black text-emerald-950">Grade A</span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">Firm, 0% Rot Damage</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-semibold">Inspecting Officer</span>
                <span className="text-sm font-bold text-slate-900">Sunil Shinde</span>
                <span className="text-[10px] text-slate-500 block font-mono">ID: AS-QC-992</span>
              </div>
            </div>

            {/* Photo Evidence of Inspection */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-800 block text-[11px]">
                Quality Officer Photo Evidence (जांच फोटो):
              </span>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative aspect-video sm:aspect-2/1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
                  alt="Quality Officer Crate Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[11px] font-bold px-2 py-1 rounded-lg">
                  Crate Cross-Section Inspection: Uniform Color & Zero Bruising
                </div>
              </div>
            </div>

            {/* Financial Settlement Trigger Summary */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 text-xs">
                  Remaining 70% Balance to be Released:
                </span>
                <span className="text-lg font-black text-emerald-950 font-mono">
                  ₹{order.deliveryBalanceAmount.toLocaleString('en-IN')}.00
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                By confirming handover, the KrishiSetu Trust Escrow will instantly initiate the final <strong>₹{order.deliveryBalanceAmount.toLocaleString('en-IN')}</strong> direct transfer to your Bank of Maharashtra account.
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href={`/orders/${order.id}/dispute`}
              className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report Weight or Quality Discrepancy</span>
            </Link>

            <Button
              variant="primary"
              size="md"
              isLoading={isApproving}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleApproveAndSettle}
            >
              Approve Delivery & Trigger 70% Balance Release
            </Button>
          </CardFooter>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
