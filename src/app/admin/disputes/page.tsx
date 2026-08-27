'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  ArrowLeft, 
  Scale, 
  CheckCircle2, 
  Gavel
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { processDisputeOutcome, getUserTrustProfile } from '@/lib/trustService';

export default function AdminDisputeArbitrationPage() {
  const [resolutionNotice, setResolutionNotice] = useState<string | null>(null);

  const dispute = {
    id: 'DIS-2026-042',
    linkedOrder: 'ORD-9912',
    claimant: 'AgroFresh Exporters Ltd. (Buyer)',
    respondent: 'Satnam Singh Dhillon (Farmer)',
    commodity: 'Sharbati Wheat (Grade A)',
    escrowLocked: 372000,
    claimCategory: 'WEIGHT_DISCREPANCY',
    description:
      'Buyer depot reported received weight of 92.4 Quintals, while Farmer provided Certified Mandi Gate weigh slip of 100.1 Quintals. Variance exceeds permissible transit tolerance.',
    farmerEvidence: {
      slipWeight: '100.10 Qtl',
      center: 'Taraori APMC Certified Weighbridge Slip',
      photoUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      timestamp: '27 Oct 2026, 01:45 PM',
    },
    buyerEvidence: {
      slipWeight: '92.40 Qtl',
      center: 'AgroFresh Warehouse Unloading Scale Printout',
      photoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
      timestamp: '27 Oct 2026, 05:15 PM',
    },
  };

  const handleArbitrationAction = (
    outcome: 'RESOLVED_LEGITIMATE_FAVOR_CLAIMANT' | 'FOUND_UNJUSTIFIED' | 'REPEATED_ABUSIVE' | 'SELLER_QUALITY_MISMATCH',
    decisionText: string
  ) => {
    // Process outcome with Trust Service engine
    processDisputeOutcome({
      disputeId: dispute.id,
      claimantId: 'buyer-01',
      respondentId: 'farmer-01',
      outcome,
      notes: decisionText,
      adminId: 'ADMIN_DESHMUKH_01',
    });

    const claimantProfile = getUserTrustProfile('buyer-01');
    const respondentProfile = getUserTrustProfile('farmer-01');

    setResolutionNotice(
      `⚖️ ARBITRATION RULING ENTERED: ${decisionText}. Claimant Trust Score: ${claimantProfile.score} (Fairness protected). Respondent Trust Score: ${respondentProfile.score}.`
    );
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
                Dispute Mediation & Evidence Comparator (Screen A6)
              </h1>
              <p className="text-xs text-slate-400">
                Independent Government APMC Arbitration Bench • Case #{dispute.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-300 bg-rose-950/80 border border-rose-800 px-3 py-1 rounded-xl">
              Escrow Frozen: ₹{dispute.escrowLocked.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Resolution Banner */}
        {resolutionNotice && (
          <div className="p-4 rounded-2xl bg-emerald-950/90 border-2 border-emerald-600 text-emerald-200 text-xs flex items-center justify-between animate-in fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="leading-relaxed font-semibold">{resolutionNotice}</span>
            </div>
            <button onClick={() => setResolutionNotice(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* Dispute Dossier Card */}
        <Card className="bg-slate-800/90 border-slate-700 text-slate-200 shadow-md">
          <CardHeader className="pb-3 border-b border-slate-700">
            <CardTitle className="text-sm font-bold text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Case Dossier: {dispute.id} (Linked Order #{dispute.linkedOrder})</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Commodity: {dispute.commodity}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Claimant (Disputing Party)</span>
                <p className="font-bold text-white">{dispute.claimant}</p>
                <p className="text-slate-400">Allegation: Weight shortage upon warehouse arrival</p>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Respondent (Farmer Counterparty)</span>
                <p className="font-bold text-white">{dispute.respondent}</p>
                <p className="text-slate-400">Defense: Loaded 100.1 Qtl on certified APMC scale</p>
              </div>
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-xl text-amber-200 text-[11px] leading-relaxed">
              <strong>Fairness Rule Active:</strong> The buyer raised this claim through formal channels. Under KrishiSetu policy, filing a dispute does not cause algorithmic trust penalties. Penalties are only issued if evidence proves bad faith or deliberate misrepresentation.
            </div>
          </CardContent>
        </Card>

        {/* Side-by-Side Evidence Comparator */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Side-by-Side Weighment & Visual Evidence Comparator</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Farmer Dispatch Proof */}
            <Card className="bg-slate-800/90 border-slate-700 text-slate-200 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-700 bg-slate-900/50">
                <CardTitle className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Farmer Dispatch & Weigh Slip</span>
                  <span className="font-mono text-white text-sm">{dispute.farmerEvidence.slipWeight}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="rounded-xl border border-slate-700 overflow-hidden bg-slate-950 aspect-video relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dispute.farmerEvidence.photoUrl}
                    alt="Farmer certified slip"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    Taraori Mandi Certified Stamp: 100.10 Qtl
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] space-y-1">
                  <p><strong>Issuing Center:</strong> {dispute.farmerEvidence.center}</p>
                  <p><strong>Captured Timestamp:</strong> {dispute.farmerEvidence.timestamp}</p>
                </div>
              </CardContent>
            </Card>

            {/* Right: Buyer Unloading Proof */}
            <Card className="bg-slate-800/90 border-slate-700 text-slate-200 shadow-md">
              <CardHeader className="pb-3 border-b border-slate-700 bg-slate-900/50">
                <CardTitle className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Buyer Warehouse Weighment Record</span>
                  <span className="font-mono text-white text-sm">{dispute.buyerEvidence.slipWeight}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="rounded-xl border border-slate-700 overflow-hidden bg-slate-950 aspect-video relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dispute.buyerEvidence.photoUrl}
                    alt="Buyer warehouse slip"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    Warehouse Scale Printout: 92.40 Qtl
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] space-y-1">
                  <p><strong>Receiving Scale:</strong> {dispute.buyerEvidence.center}</p>
                  <p><strong>Captured Timestamp:</strong> {dispute.buyerEvidence.timestamp}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Arbitration Action Station */}
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-emerald-500/70 text-slate-200 shadow-xl">
          <CardHeader className="pb-3 border-b border-slate-700">
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Gavel className="w-4 h-4 text-emerald-400" />
              <span>Mandi Arbitrator Ruling & Escrow Fund Settlement</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  handleArbitrationAction(
                    'RESOLVED_LEGITIMATE_FAVOR_CLAIMANT',
                    'Split settlement ordered based on APMC Tare Weight (96.2 Qtl adjusted payout)'
                  )
                }
              >
                Split Settlement (APMC Tare)
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleArbitrationAction(
                    'FOUND_UNJUSTIFIED',
                    'Claim ruled unjustified after inspecting truck bag count. 100% Escrow released to Farmer'
                  )
                }
              >
                Release Full Escrow to Farmer
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleArbitrationAction(
                    'SELLER_QUALITY_MISMATCH',
                    'Confirmed 7.7 Qtl transit moisture deviation. Partial refund ₹28,644 credited to Buyer'
                  )
                }
              >
                Refund Buyer Variance
              </Button>

              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  handleArbitrationAction(
                    'REPEATED_ABUSIVE',
                    'Buyer claim identified as repeated abusive deduction. Claim rejected and flagged'
                  )
                }
              >
                Flag Abusive Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPortalLayout>
  );
}
