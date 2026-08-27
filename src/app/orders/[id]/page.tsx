'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Check
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockOrders } from '@/data/mockData';

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'order-89410';

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const [truckNumber, setTruckNumber] = useState('MH-15-AB-1020');
  const [driverPhone, setDriverPhone] = useState('+91 98220 11994');
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchDone, setDispatchDone] = useState(false);

  const handleSimulateDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatchDone(true);
    }, 800);
  };

  const steps = [
    {
      step: 1,
      title: 'Deal Agreed & Contract Signed',
      subtitle: `${order.createdAt}`,
      completed: true,
    },
    {
      step: 2,
      title: '30% Escrow Advance Secured',
      subtitle: `₹${order.escrowAdvanceAmount.toLocaleString('en-IN')} held in ICICI Agri-Desk (${order.escrowTransactionId})`,
      completed: true,
      current: !dispatchDone,
    },
    {
      step: 3,
      title: 'Produce Dispatched from Farm',
      subtitle: dispatchDone ? `Tractor ${truckNumber} dispatched with bilty pass` : `Pending dispatch by ${order.dispatchDeadline}`,
      completed: dispatchDone,
      current: dispatchDone,
    },
    {
      step: 4,
      title: 'Weighbridge & Moisture Inspection',
      subtitle: 'Electronic gross tare recorded; sample tested for Grade A moisture standard',
      completed: order.status === 'COMPLETED',
    },
    {
      step: 5,
      title: '70% Balance DBT Released',
      subtitle: `₹${order.deliveryBalanceAmount.toLocaleString('en-IN')} transferred direct to your bank account`,
      completed: order.status === 'COMPLETED',
    },
  ];

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/orders"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500">#{order.orderNumber}</span>
                <Badge variant={order.status === 'COMPLETED' ? 'emerald' : 'amber'} size="sm">
                  {order.status === 'COMPLETED' ? 'Completed' : 'Advance Escrow Locked'}
                </Badge>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Order Tracking & Fulfillment
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/orders/${order.id}/dispatch`}
              className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition select-none active:scale-[0.98] gap-1.5"
            >
              <Truck className="w-4 h-4 text-amber-700" />
              <span>Step 3: Dispatch</span>
            </Link>
            <Link
              href={`/orders/${order.id}/escrow`}
              className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition select-none active:scale-[0.98] gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Escrow Certificate</span>
            </Link>
          </div>
        </div>

        {/* Hero Escrow Safety Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-200">
                ESCROW PROTECTION ACTIVE
              </span>
            </div>
            <span className="font-mono text-xs text-emerald-100">
              {order.escrowTransactionId}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold">
            ₹{order.escrowAdvanceAmount.toLocaleString('en-IN')} (30% Advance) Safely Locked
          </h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            The buyer cannot withdraw this money. It is guaranteed by KrishiSetu Trust Escrow. You are 100% protected to load crates and dispatch to destination.
          </p>
        </div>

        {/* Contract Summary Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900">
              Contract Terms & Price Breakdown
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Buyer Information</span>
                <p className="font-bold text-slate-900 text-sm">{order.buyerCompany}</p>
                <p className="text-slate-500">Contact: {order.buyerName} ({order.buyerPhone})</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block text-[11px]">Produce Details</span>
                <p className="font-bold text-slate-900 text-sm">{order.cropTitle}</p>
                <p className="text-slate-500">{order.variety} • {order.grade}</p>
              </div>
            </div>

            {/* Price Table */}
            <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 bg-white">
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-600">Contract Quantity:</span>
                <span className="font-bold text-slate-900">{order.quantityQuintals} {order.unit}</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-600">Agreed Floor Rate:</span>
                <span className="font-bold text-emerald-700">₹{order.agreedPricePerUnit.toLocaleString('en-IN')} / {order.unit}</span>
              </div>
              <div className="p-3 flex items-center justify-between bg-slate-50">
                <span className="font-bold text-slate-800">Total Purchase Value:</span>
                <span className="font-extrabold text-slate-950 text-sm">₹{order.totalDealAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 flex items-center justify-between bg-emerald-50 text-emerald-950">
                <span className="font-bold">30% Escrow Advance (Held in Safe):</span>
                <span className="font-black text-sm">₹{order.escrowAdvanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 flex items-center justify-between text-slate-700">
                <span>Remaining 70% Balance (Upon Delivery Weighment):</span>
                <span className="font-bold">₹{order.deliveryBalanceAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Stage Stepper Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50 pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900">
              Delivery & Settlement Lifecycle
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-5 text-xs">
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.step} className="flex items-start gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      s.completed
                        ? 'bg-emerald-600 text-white'
                        : s.current
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-200'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s.completed ? <Check className="w-4 h-4" /> : s.step}
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <p
                      className={`text-xs font-bold ${
                        s.completed ? 'text-slate-900' : s.current ? 'text-amber-950' : 'text-slate-400'
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dispatch Action Box if pending dispatch */}
            {!dispatchDone && order.status !== 'COMPLETED' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-700" />
                  <span className="font-bold text-amber-950 text-xs">
                    Ready to Dispatch Lot: {order.cropTitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-600 block font-semibold">
                      Vehicle / Tractor Plate Number
                    </label>
                    <input
                      type="text"
                      value={truckNumber}
                      onChange={(e) => setTruckNumber(e.target.value)}
                      className="w-full border border-amber-300 rounded-xl px-3 py-2 text-xs bg-white uppercase font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block font-semibold">
                      Driver Contact Mobile
                    </label>
                    <input
                      type="text"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="w-full border border-amber-300 rounded-xl px-3 py-2 text-xs bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-amber-800">
                    Pickup Shed: {order.pickupLocation}
                  </span>
                  <Button
                    variant="amber"
                    size="sm"
                    isLoading={isDispatching}
                    leftIcon={<Truck className="w-4 h-4" />}
                    onClick={handleSimulateDispatch}
                  >
                    Confirm Dispatch & Send Bilty
                  </Button>
                </div>
              </div>
            )}

            {dispatchDone && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Dispatch Confirmed:</strong> Truck {truckNumber} is on its way. Buyer alerted via SMS.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" size="sm">In Transit</Badge>
                  <Link
                    href={`/orders/${order.id}/inspection`}
                    className="font-bold text-xs px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Depot Inspection →
                  </Link>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-slate-50/80 border-t border-slate-100 p-3.5 flex items-center justify-between text-xs text-slate-500">
            <span>Helpline: 1800-KRISHI-SETU (Dispute Protection Available)</span>
            <Link
              href="/orders"
              className="text-emerald-700 font-bold hover:underline"
            >
              Back to All Orders →
            </Link>
          </CardFooter>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
