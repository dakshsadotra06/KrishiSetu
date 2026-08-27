'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Radio, 
  Send 
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Button } from '@/components/ui/Button';

interface SmsLogItem {
  id: string;
  phone: string;
  role: 'FARMER' | 'BUYER';
  recipient: string;
  category: 'TOKEN_BOOKING' | 'QUEUE_ALERT' | 'ADVANCE_ESCROW_RECEIVED' | 'DISPATCH_NOTICE';
  body: string;
  status: 'DELIVERED' | 'CARRIER_QUEUED' | 'FAILED';
  timestamp: string;
  gateway: string;
}

export default function AdminSmsLogsPage() {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchPhone, setSearchPhone] = useState('');
  const [retryNotice, setRetryNotice] = useState<string | null>(null);

  const [smsLogs, setSmsLogs] = useState<SmsLogItem[]>([
    {
      id: 'SMS-99210',
      phone: '+91 98765 43210',
      role: 'FARMER' as const,
      recipient: 'Ramesh Shankar (Kisan)',
      category: 'TOKEN_BOOKING' as const,
      body: 'Namaste Ramesh ji, your Token #TK-8842 is confirmed for tomorrow 09:30 AM at Karnal APMC Gate 2. Please bring certified weigh slip.',
      status: 'DELIVERED' as const,
      timestamp: '28 Oct 10:30 AM',
      gateway: 'Govt CDAC National Gateway',
    },
    {
      id: 'SMS-99211',
      phone: '+91 98120 44123',
      role: 'FARMER' as const,
      recipient: 'Ram Kishan (Kisan)',
      category: 'QUEUE_ALERT' as const,
      body: 'Token #TK-8838: Please bring your vehicle HR-05-AB-4412 to Weighbridge Scale Bay 2 immediately.',
      status: 'DELIVERED' as const,
      timestamp: '28 Oct 09:15 AM',
      gateway: 'Govt CDAC National Gateway',
    },
    {
      id: 'SMS-99212',
      phone: '+91 98221 00994',
      role: 'BUYER' as const,
      recipient: 'AgroStar Procurement (Buyer)',
      category: 'ADVANCE_ESCROW_RECEIVED' as const,
      body: 'KrishiSetu Escrow Notice: Advance payment of ₹2,13,750 secured for Basmati order #ORD-89410. Dispatch preparation authorized.',
      status: 'DELIVERED' as const,
      timestamp: '28 Oct 10:45 AM',
      gateway: 'Twilio Enterprise Gateway',
    },
    {
      id: 'SMS-99213',
      phone: '+91 98765 11200',
      role: 'FARMER' as const,
      recipient: 'Balvinder Singh (Kisan)',
      category: 'QUEUE_ALERT' as const,
      body: 'Token #TK-8839: You are next in line at Gate 2 boom barrier. Please prepare vehicle papers.',
      status: 'CARRIER_QUEUED' as const,
      timestamp: '28 Oct 09:40 AM',
      gateway: 'Govt CDAC National Gateway',
    },
    {
      id: 'SMS-99214',
      phone: '+91 94160 55122',
      role: 'BUYER' as const,
      recipient: 'Kisan Mart FPO (Buyer)',
      category: 'DISPATCH_NOTICE' as const,
      body: 'Truck MH-15-EG-8812 has departed farm for Pune Hub with 102 crates of Tomatoes.',
      status: 'FAILED' as const,
      timestamp: '28 Oct 08:10 AM',
      gateway: 'MSG91 Backup Gateway',
    },
  ]);

  const filteredLogs = smsLogs.filter((log) => {
    if (filterCategory !== 'ALL' && log.category !== filterCategory) return false;
    if (searchPhone && !log.phone.includes(searchPhone) && !log.recipient.toLowerCase().includes(searchPhone.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRetry = (smsId: string) => {
    setSmsLogs((prev) =>
      prev.map((log) => (log.id === smsId ? { ...log, status: 'DELIVERED' } : log))
    );
    setRetryNotice(`Message ${smsId} successfully re-routed through CDAC Primary Gateway and delivered.`);
  };

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        {/* Navigation & Header */}
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
                SMS Gateway Telemetry & Audit Logs (Screen A7)
              </h1>
              <p className="text-xs text-slate-400">
                Critical Mandi Gate alerts, token confirmations, and escrow status SMS dispatches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Send className="w-3.5 h-3.5" />}
              onClick={() => alert('Simulate Broadcast SMS modal opened.')}
            >
              Broadcast Mandi Notice
            </Button>
          </div>
        </div>

        {/* Retry Banner */}
        {retryNotice && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{retryNotice}</span>
            </div>
            <button onClick={() => setRetryNotice(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* Gateway Health Monitor KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Overall Delivery Rate</span>
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <p className="mt-2 text-3xl font-black text-white font-mono">99.82%</p>
            <span className="text-[11px] font-bold text-emerald-400 block mt-0.5">
              CDAC National + Twilio + MSG91
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Today&apos;s SMS Volume</span>
              <MessageSquare className="w-4 h-4 text-sky-400" />
            </div>
            <p className="mt-2 text-3xl font-black text-white font-mono">42,680</p>
            <span className="text-[11px] font-bold text-sky-300 block mt-0.5">
              Avg latency: 1.8 seconds
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Failed Dispatches</span>
              <AlertCircle className="w-4 h-4 text-rose-400" />
            </div>
            <p className="mt-2 text-3xl font-black text-rose-400 font-mono">12</p>
            <span className="text-[11px] font-bold text-slate-400 block mt-0.5">
              Available for instant carrier retry
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
          {/* Category Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-emerald-500"
            >
              <option value="ALL">All Categories (सभी प्रकार)</option>
              <option value="TOKEN_BOOKING">Token Booking</option>
              <option value="QUEUE_ALERT">Queue Call Alert</option>
              <option value="ADVANCE_ESCROW_RECEIVED">Advance Escrow Deposit</option>
              <option value="DISPATCH_NOTICE">Dispatch Notice</option>
            </select>
          </div>

          {/* Search Phone */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search mobile number or recipient..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* SMS Audit Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-700 text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 font-bold">SMS ID</th>
                  <th className="p-3.5 font-bold">Recipient Mobile</th>
                  <th className="p-3.5 font-bold">Category</th>
                  <th className="p-3.5 font-bold">Message Content</th>
                  <th className="p-3.5 font-bold">Delivery Status</th>
                  <th className="p-3.5 font-bold">Sent Time</th>
                  <th className="p-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 font-sans">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-700/40 transition">
                    <td className="p-3.5 font-mono font-bold text-slate-400">{log.id}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-white font-mono">{log.phone}</div>
                      <span className="text-[10px] text-slate-400">{log.recipient}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-sm">
                      <p className="text-[11px] text-slate-300 leading-relaxed truncate hover:whitespace-normal">
                        {log.body}
                      </p>
                      <span className="text-[9px] text-slate-500 font-mono block mt-0.5">{log.gateway}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          log.status === 'DELIVERED'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : log.status === 'CARRIER_QUEUED'
                            ? 'bg-amber-950 text-amber-300 border-amber-700'
                            : 'bg-rose-950 text-rose-300 border-rose-700'
                        }`}
                      >
                        {log.status === 'DELIVERED' ? 'DELIVERED ✓' : log.status === 'CARRIER_QUEUED' ? 'CARRIER QUEUED' : 'FAILED'}
                      </span>
                    </td>
                    <td className="p-3.5 text-[11px] text-slate-400 font-mono">{log.timestamp}</td>
                    <td className="p-3.5 text-right">
                      {log.status === 'FAILED' ? (
                        <button
                          onClick={() => handleRetry(log.id)}
                          className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Retry SMS</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">Logged</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPortalLayout>
  );
}
