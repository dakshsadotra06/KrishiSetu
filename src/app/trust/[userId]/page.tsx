'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock 
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrustBadge } from '@/components/trust/TrustBadge';
import { getUserTrustProfile, getTrustHistory } from '@/lib/trustService';

export default function TrustProfileDetailsPage() {
  const params = useParams();
  const userId = (params?.userId as string) || 'farmer-01';

  const profile = getUserTrustProfile(userId);
  const history = getTrustHistory(userId);

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={profile.userRole === 'FARMER' ? '/profile' : `/buyer/${userId}`}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Trust & Reputation Breakdown
              </h1>
              <p className="text-xs text-slate-500">
                Official transaction trust rating for {profile.userName}
              </p>
            </div>
          </div>

          <TrustBadge score={profile.score} level={profile.level} size="md" />
        </div>

        {/* Detailed Breakdown Card */}
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <span>{profile.userName}</span>
                </CardTitle>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Role: {profile.userRole} • Account Status: {profile.status.replace('_', ' ')}
                </p>
              </div>
              <span className="font-mono text-2xl font-black text-white">
                {profile.score}/100
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6 text-xs">
            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Completed Orders</span>
                <span className="text-base font-black text-slate-900">{profile.completedOrders}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Success Rate</span>
                <span className="text-base font-black text-emerald-700">{profile.successRatePercent}%</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Total Disputes</span>
                <span className="text-base font-black text-slate-800">{profile.totalDisputes}</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Resolved Disputes</span>
                <span className="text-base font-black text-emerald-700">{profile.resolvedDisputes}</span>
              </div>
            </div>

            {/* Fairness Policy */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 text-amber-950">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <h4 className="font-bold text-xs text-amber-900">
                  Fairness Guarantee: Raising Complaints Never Penalizes You
                </h4>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Legitimate complaints and disputes undergo independent mandi review. Filing a ticket does not decrease your Trust Score. Scores only adjust when an investigation confirms fraudulent or repeated unjustified activity.
              </p>
            </div>

            {/* Factors */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Positive Reputation Indicators</span>
              </h4>
              <div className="space-y-1.5">
                {profile.positiveFactors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-emerald-900 text-xs flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {profile.negativeFactors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span>Negative Factors</span>
                </h4>
                <div className="space-y-1.5">
                  {profile.negativeFactors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-xs flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Recent Trust Score History</span>
              </h4>
              <div className="space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-800">{item.reason}</p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="shrink-0 font-mono font-bold">
                      {item.delta > 0 && (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                          +{item.delta}
                        </span>
                      )}
                      {item.delta === 0 && (
                        <span className="text-slate-600 bg-slate-200 px-2 py-0.5 rounded text-[11px]">
                          ±0
                        </span>
                      )}
                      {item.delta < 0 && (
                        <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded text-[11px]">
                          {item.delta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-emerald-700"
            >
              ← Back to Dashboard
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Official reputation summary generated')}
            >
              Share Reputation Summary
            </Button>
          </CardFooter>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
