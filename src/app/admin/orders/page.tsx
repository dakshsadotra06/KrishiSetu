'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Button } from '@/components/ui/Button';

interface AdminMilestone {
  time: string;
  label: string;
}

interface AdminOrderItem {
  id: string;
  farmer: string;
  location: string;
  buyer: string;
  commodity: string;
  qty: string;
  totalAmount: number;
  escrowAdvance: number;
  escrowBank: string;
  escrowStatus: string;
  deliveryStatus: string;
  payoutStatus: string;
  createdAt: string;
  milestones: AdminMilestone[];
}

export default function AdminOrdersEscrowLedgerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderItem | null>(null);

  const ordersLedger = [
    {
      id: 'ORD-89410',
      farmer: 'Ramesh Shankar Choudhary',
      location: 'Karnal, Haryana',
      buyer: 'AgroStar Fresh Ltd.',
      commodity: 'Basmati Paddy (PB 1121)',
      qty: '250 Quintals',
      totalAmount: 712500,
      escrowAdvance: 213750,
      escrowBank: 'ICICI Agri-Desk Escrow',
      escrowStatus: '30% LOCKED (₹2,13,750)',
      deliveryStatus: 'DELIVERED & INSPECTED',
      payoutStatus: '70% DBT RELEASED',
      createdAt: '28 Oct 2026, 10:15 AM',
      milestones: [
        { time: '10:15 AM', label: 'Offer Accepted & Deal Sealed' },
        { time: '10:45 AM', label: '30% Advance ₹2,13,750 Locked in Neutral Escrow' },
        { time: '01:30 PM', label: 'Farmer Uploaded Gate Dispatch Proof (102 Crates)' },
        { time: '02:45 PM', label: 'Depot Weighbridge Inspection Approved (Sunil Shinde)' },
        { time: '03:45 PM', label: '70% Final Settlement DBT Credited (UTR MAHB26301988210)' },
      ],
    },
    {
      id: 'ORD-9912',
      farmer: 'Satnam Singh Dhillon',
      location: 'Taraori, Haryana',
      buyer: 'AgroFresh Exporters Ltd.',
      commodity: 'Sharbati Wheat (A-Grade)',
      qty: '100 Quintals',
      totalAmount: 372000,
      escrowAdvance: 111600,
      escrowBank: 'HDFC Mandi Escrow Safe',
      escrowStatus: 'FUNDS ON HOLD (DISPUTED)',
      deliveryStatus: 'WEIGHT VARIANCE REPORTED',
      payoutStatus: 'ESCROW FROZEN',
      createdAt: '27 Oct 2026, 02:00 PM',
      milestones: [
        { time: '02:00 PM', label: 'Offer Accepted for 100 Qtl' },
        { time: '02:30 PM', label: '30% Advance ₹1,11,600 Deposited in Escrow' },
        { time: '05:15 PM', label: 'Buyer Depot Flagged 92 Qtl Weighment (Dispute Logged)' },
      ],
    },
    {
      id: 'ORD-10482',
      farmer: 'Birender Yadav',
      location: 'Panipat, Haryana',
      buyer: 'ITC Choupal Fresh',
      commodity: 'Mustard (Pusa-25)',
      qty: '180 Quintals',
      totalAmount: 540000,
      escrowAdvance: 162000,
      escrowBank: 'SBI Agri-Escrow Desk',
      escrowStatus: '30% LOCKED (₹1,62,000)',
      deliveryStatus: 'IN TRANSIT (ETA 1 HR)',
      payoutStatus: 'PENDING HANDOVER',
      createdAt: '28 Oct 2026, 11:30 AM',
      milestones: [
        { time: '11:30 AM', label: 'Offer Accepted' },
        { time: '12:00 PM', label: '30% Advance Escrow Funded' },
        { time: '01:00 PM', label: 'Vehicle Dispatched (HR-06-AG-1142)' },
      ],
    },
  ];

  const filteredOrders = ordersLedger.filter((o) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.farmer.toLowerCase().includes(q) ||
      o.buyer.toLowerCase().includes(q) ||
      o.commodity.toLowerCase().includes(q)
    );
  });

  const handleManualEscrowRelease = (orderId: string) => {
    alert(`Administrative Escrow Override: Approved manual release for Order ${orderId}. Bank DBT settlement scheduled.`);
    setSelectedOrder(null);
  };

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Orders & Escrow Financial Ledger (Screen A5)
              </h1>
              <p className="text-xs text-slate-400">
                Transaction audit trails, advance banking escrow status, and DBT release oversight
              </p>
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Order #, Farmer, Buyer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Orders Ledger Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-700 text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 font-bold">Order ID</th>
                  <th className="p-3.5 font-bold">Farmer / Origin</th>
                  <th className="p-3.5 font-bold">Buyer Entity</th>
                  <th className="p-3.5 font-bold">Commodity</th>
                  <th className="p-3.5 font-bold">Total Deal</th>
                  <th className="p-3.5 font-bold">Escrow Vault Status</th>
                  <th className="p-3.5 font-bold">Transit / Delivery</th>
                  <th className="p-3.5 font-bold text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-700/40 transition">
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      {order.id}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-white">{order.farmer}</div>
                      <span className="text-[10px] text-slate-400">{order.location}</span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-medium">
                      {order.buyer}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">{order.commodity}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{order.qty}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-200">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>{order.escrowStatus}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{order.escrowBank}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          order.deliveryStatus.includes('DELIVERED')
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : order.deliveryStatus.includes('VARIANCE')
                            ? 'bg-rose-950 text-rose-300 border-rose-700'
                            : 'bg-sky-950 text-sky-300 border-sky-700'
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                      >
                        Ledger →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Dossier & Milestones Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-700 shadow-2xl text-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>Escrow Transaction Audit Dossier #{selectedOrder.id}</span>
                </h3>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Deal Amount</span>
                    <p className="text-base font-mono font-black text-white">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">30% Escrow Advance</span>
                    <p className="text-base font-mono font-black text-emerald-400">₹{selectedOrder.escrowAdvance.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Milestone Stepper Log */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Immutable Timeline Audit Trail:
                  </span>
                  <div className="space-y-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    {selectedOrder.milestones.map((m: AdminMilestone, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-200">{m.label}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">{m.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleManualEscrowRelease(selectedOrder.id)}
                >
                  Admin Escrow Override / Release
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPortalLayout>
  );
}
