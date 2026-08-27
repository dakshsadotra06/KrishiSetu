'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Award
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Button } from '@/components/ui/Button';

interface AdminUserItem {
  id: string;
  name: string;
  phone: string;
  role: 'FARMER' | 'BUYER';
  entityType: string;
  district: string;
  docType: string;
  docId: string;
  kycStatus: 'VERIFIED' | 'PENDING_REVIEW';
  trustScore: number;
  salesVolume: string;
}

export default function AdminUserManagementPage() {
  const [activeTab, setActiveTab] = useState<'FARMERS' | 'BUYERS' | 'PENDING_KYC'>('PENDING_KYC');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserDossier, setSelectedUserDossier] = useState<AdminUserItem | null>(null);

  const usersList = [
    {
      id: 'farmer-01',
      name: 'Ramesh Shankar Choudhary',
      phone: '+91 98765 43210',
      role: 'FARMER' as const,
      entityType: 'Individual Farmer',
      district: 'Karnal, Haryana',
      docType: 'Haryana Jamabandi Land Record',
      docId: 'KRN-LND-2024-8891',
      kycStatus: 'VERIFIED' as const,
      trustScore: 92,
      salesVolume: '₹14,80,000 (27 Orders)',
    },
    {
      id: 'farmer-kyc-02',
      name: 'Harpal Singh Cheema',
      phone: '+91 98140 33219',
      role: 'FARMER' as const,
      entityType: 'Individual Farmer (5 Acres)',
      district: 'Ambala, Haryana',
      docType: 'Kisan Credit Card + Aadhaar',
      docId: 'KCC-SBIN-00291-AMB',
      kycStatus: 'PENDING_REVIEW' as const,
      trustScore: 78,
      salesVolume: '₹3,40,000 (4 Orders)',
    },
    {
      id: 'buyer-01',
      name: 'AgroStar Fresh Ltd. (Sunil Shinde)',
      phone: '+91 98221 00994',
      role: 'BUYER' as const,
      entityType: 'Corporate Agri-Buyer',
      district: 'Pune / Haryana Hub',
      docType: 'GSTIN + FSSAI Wholesale License',
      docId: '06AAACA9921D1Z4',
      kycStatus: 'VERIFIED' as const,
      trustScore: 94,
      salesVolume: '₹84,20,000 (83 Orders)',
    },
    {
      id: 'buyer-kyc-02',
      name: 'Kisan Mart FPO Enterprise',
      phone: '+91 94160 55122',
      role: 'BUYER' as const,
      entityType: 'Farmer Producer Company',
      district: 'Panipat, Haryana',
      docType: 'APMC Mandi Trading License',
      docId: 'LIC-APMC-PNP-892',
      kycStatus: 'PENDING_REVIEW' as const,
      trustScore: 72,
      salesVolume: '₹8,90,000 (12 Orders)',
    },
  ];

  const filteredUsers = usersList.filter((u) => {
    if (activeTab === 'FARMERS' && u.role !== 'FARMER') return false;
    if (activeTab === 'BUYERS' && u.role !== 'BUYER') return false;
    if (activeTab === 'PENDING_KYC' && u.kycStatus !== 'PENDING_REVIEW') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.docId.toLowerCase().includes(q) ||
        u.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApproveKYC = (userId: string) => {
    alert(`User ${userId} KYC Approved! Verification badge issued and SMS sent.`);
    setSelectedUserDossier(null);
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
                User Registry & Land Record KYC (Screen A4)
              </h1>
              <p className="text-xs text-slate-400">
                Aadhaar, Kisan Credit Card, Mandi Trading Licenses, and Entity Verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/trust"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-700 transition"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Trust Scoring Desk →</span>
            </Link>
          </div>
        </div>

        {/* Tabs & Search Bar */}
        <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
          {/* Segmented Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setActiveTab('PENDING_KYC')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'PENDING_KYC'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending KYC (52)
            </button>
            <button
              onClick={() => setActiveTab('FARMERS')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'FARMERS'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Farmers (24,850)
            </button>
            <button
              onClick={() => setActiveTab('BUYERS')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                activeTab === 'BUYERS'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Buyers (1,420)
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, doc ID, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Users Data Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-700 text-[11px] uppercase tracking-wider">
                  <th className="p-3.5 font-bold">User / Entity</th>
                  <th className="p-3.5 font-bold">Role</th>
                  <th className="p-3.5 font-bold">Submitted Document</th>
                  <th className="p-3.5 font-bold">Trust Score</th>
                  <th className="p-3.5 font-bold">Trading Volume</th>
                  <th className="p-3.5 font-bold">KYC Status</th>
                  <th className="p-3.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-700/40 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{user.id} • {user.phone}</div>
                      <div className="text-[10px] text-slate-400">{user.district}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          user.role === 'FARMER'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : 'bg-sky-950 text-sky-300 border-sky-700'
                        }`}
                      >
                        {user.entityType}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">{user.docType}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{user.docId}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      🟢 {user.trustScore}
                    </td>
                    <td className="p-3.5 text-slate-300 font-medium">
                      {user.salesVolume}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          user.kycStatus === 'VERIFIED'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : 'bg-amber-950 text-amber-300 border-amber-700'
                        }`}
                      >
                        {user.kycStatus === 'VERIFIED' ? '✓ Verified' : '⏳ Pending Review'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedUserDossier(user)}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                      >
                        Dossier →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User KYC Dossier Modal */}
        {selectedUserDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-700 shadow-2xl text-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>State Registry Verification Dossier</span>
                </h3>
                <button onClick={() => setSelectedUserDossier(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Applicant</span>
                  <p className="text-sm font-bold text-white">{selectedUserDossier.name}</p>
                  <p className="text-slate-400">{selectedUserDossier.entityType} • {selectedUserDossier.district}</p>
                </div>

                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Submitted Document Record</span>
                  <p className="font-bold text-emerald-400">{selectedUserDossier.docType}</p>
                  <p className="font-mono text-slate-300">Reference: {selectedUserDossier.docId}</p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Haryana Land Records Jamabandi Portal matched 5.2 Acres at Karnal Tehsil.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedUserDossier(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  onClick={() => handleApproveKYC(selectedUserDossier.id)}
                >
                  Verify & Approve KYC
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPortalLayout>
  );
}
