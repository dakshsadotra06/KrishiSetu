'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Download, 
  Lock, 
  Truck
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockOrders } from '@/data/mockData';

export default function EscrowStatusPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'order-89410';

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Navigation */}
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
                Escrow Payment Certificate
              </h1>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} • ICICI Bank Agri-Trust Desk
              </p>
            </div>
          </div>

          <Badge variant="emerald" size="md" dot>
            Escrow Active
          </Badge>
        </div>

        {/* Certificate Card */}
        <Card className="border-emerald-300 shadow-xl overflow-hidden bg-gradient-to-b from-white via-emerald-50/15 to-white">
          {/* Certificate Banner */}
          <div className="bg-emerald-800 text-white p-4 text-center border-b border-emerald-900">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                KRISHISETU ESCROW TRUST SAFE RECEIPT
              </span>
            </div>
            <p className="text-[11px] text-emerald-200 mt-0.5 font-mono">
              CERTIFICATE REF: {order.escrowTransactionId}
            </p>
          </div>

          <CardContent className="p-6 space-y-6 text-xs">
            {/* Amount Hero */}
            <div className="text-center bg-slate-50 p-6 rounded-2xl border-2 border-emerald-200 relative space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                30% ADVANCE PAYMENT SAFELY LOCKED
              </span>
              <p className="text-3xl sm:text-4xl font-black text-emerald-950 font-mono">
                ₹{order.escrowAdvanceAmount.toLocaleString('en-IN')}.00
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>HELD IN ESCROW TRUST BY {order.escrowBankPartner.toUpperCase()}</span>
              </div>
            </div>

            {/* Escrow Terms & Protections Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 bg-white">
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-mono font-bold text-slate-900">#{order.orderNumber}</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-500">Produce Lot:</span>
                <span className="font-bold text-slate-900">{order.cropTitle} ({order.quantityQuintals} {order.unit})</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-500">Buyer Depositor:</span>
                <span className="font-bold text-slate-900">{order.buyerCompany}</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="text-slate-500">Beneficiary Farmer:</span>
                <span className="font-bold text-emerald-800">{order.farmerName}</span>
              </div>
              <div className="p-3.5 flex items-center justify-between bg-slate-50">
                <span className="text-slate-600 font-semibold">Total Purchase Amount:</span>
                <span className="font-extrabold text-slate-950 text-sm">₹{order.totalDealAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3.5 flex items-center justify-between bg-emerald-50 text-emerald-950 font-bold">
                <span>Advance Amount (30% in Escrow):</span>
                <span className="text-sm">₹{order.escrowAdvanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3.5 flex items-center justify-between text-slate-600">
                <span>Final Balance on Handover (70%):</span>
                <span className="font-bold">₹{order.deliveryBalanceAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* How KrishiSetu Protects You */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 text-slate-700">
              <h3 className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>How Your Payment is Legally Guaranteed:</span>
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-600 list-disc list-inside">
                <li>The buyer cannot withdraw or reverse this escrow deposit without formal dispute mediation.</li>
                <li>You are 100% authorized to pack crates and dispatch produce to the designated destination.</li>
                <li>Remaining ₹{order.deliveryBalanceAmount.toLocaleString('en-IN')} will be transferred directly to your DBT bank account upon electronic weight confirmation.</li>
              </ul>
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
              Print / Save Certificate (PDF)
            </Button>

            <Link
              href={`/orders/${order.id}/dispatch`}
              className="inline-flex items-center justify-center font-bold text-xs px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition select-none active:scale-[0.98] gap-1.5 w-full sm:w-auto"
            >
              <Truck className="w-4 h-4" />
              <span>Proceed to Dispatch Screen →</span>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
