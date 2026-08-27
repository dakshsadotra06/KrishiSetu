'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockOrders } from '@/data/mockData';

export default function FarmerOrdersPage() {
  const [filterTab, setFilterTab] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const filtered = mockOrders.filter((ord) => {
    if (filterTab === 'ACTIVE') return ord.status !== 'COMPLETED';
    if (filterTab === 'COMPLETED') return ord.status === 'COMPLETED';
    return true;
  });

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <ShoppingBag className="w-7 h-7 text-emerald-600" />
              <span>Purchase Orders & Deliveries</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track binding wholesale contracts, advance escrow deposits, and DBT balance settlements
            </p>
          </div>

          <Link
            href="/offers"
            className="inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition select-none active:scale-[0.98] shadow-xs gap-1.5 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Review New Offers</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setFilterTab('ALL')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
              filterTab === 'ALL'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Contracts ({mockOrders.length})
          </button>
          <button
            onClick={() => setFilterTab('ACTIVE')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
              filterTab === 'ACTIVE'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Active In-Progress (1)
          </button>
          <button
            onClick={() => setFilterTab('COMPLETED')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
              filterTab === 'COMPLETED'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Completed & Settled (1)
          </button>
        </div>

        {/* Orders Grid */}
        <div className="space-y-4">
          {filtered.map((order) => (
            <Card
              key={order.id}
              className="border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-slate-900 text-sm">
                    #{order.orderNumber}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{order.createdAt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={order.status === 'COMPLETED' ? 'emerald' : 'amber'}
                    size="sm"
                    dot
                  >
                    {order.status === 'COMPLETED' ? 'Settled & Completed' : '30% Advance In Escrow'}
                  </Badge>
                  <span className="text-slate-400 text-[10px]">•</span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {order.escrowBankPartner}
                  </span>
                </div>
              </div>

              <CardContent className="p-5 space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {order.cropTitle}
                    </h3>
                    <p className="text-slate-500 mt-0.5">
                      Buyer: <strong>{order.buyerCompany}</strong> ({order.buyerName}) • Pickup: {order.pickupLocation}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Contract Value</span>
                    <span className="text-xl font-black text-slate-950">
                      ₹{order.totalDealAmount.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[11px] text-emerald-700 font-bold">
                      ₹{order.agreedPricePerUnit.toLocaleString('en-IN')}/{order.unit}
                    </p>
                  </div>
                </div>

                {/* Progress Mini-Bar */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">Contract Lifecycle:</span>
                    <span className="font-bold text-emerald-800">
                      {order.status === 'COMPLETED' ? 'Step 5 of 5 (100% Settled)' : 'Step 2 of 5 (Advance Escrow Funded)'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: order.status === 'COMPLETED' ? '100%' : '40%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>1. Deal Agreed</span>
                    <span className="font-bold text-emerald-700">2. 30% Escrow Locked</span>
                    <span>3. Dispatched</span>
                    <span>4. Gate Weighed</span>
                    <span>5. DBT Settled</span>
                  </div>
                </div>

                {/* Escrow Details */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      <strong>Escrow Advance:</strong> ₹{order.escrowAdvanceAmount.toLocaleString('en-IN')} locked safely ({order.escrowTransactionId})
                    </span>
                  </div>
                  <span className="text-emerald-800 font-bold text-[11px]">
                    Remaining Balance: ₹{order.deliveryBalanceAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50/80 border-t border-slate-100 p-3.5 flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">
                  Dispatch Deadline: <strong>{order.dispatchDeadline}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/orders/${order.id}/escrow`}
                    className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition select-none active:scale-[0.98]"
                  >
                    Escrow Receipt
                  </Link>

                  <Link
                    href={order.status === 'COMPLETED' ? `/orders/${order.id}/settlement` : `/orders/${order.id}`}
                    className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition select-none active:scale-[0.98] gap-1.5 cursor-pointer"
                  >
                    <span>{order.status === 'COMPLETED' ? 'View Settlement Voucher' : 'Track Order Progress'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </FarmerPortalLayout>
  );
}
