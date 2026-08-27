import React from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Clock 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrustBadge } from '@/components/trust/TrustBadge';
import { getUserTrustProfile, getTrustHistory } from '@/lib/trustService';

interface TrustDetailsModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TrustDetailsModal({ userId, isOpen, onClose }: TrustDetailsModalProps) {
  if (!isOpen || !userId) return null;

  const profile = getUserTrustProfile(userId);
  const history = getTrustHistory(userId);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-xl border-emerald-300 shadow-2xl bg-white my-8 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg font-bold text-white">
                  Trust & Reputation Details
                </CardTitle>
                <p className="text-xs text-emerald-200">
                  {profile.userName} • {profile.userRole === 'FARMER' ? 'Verified Farmer' : 'Verified Buyer'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
          {/* Hero Score Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Current Trust Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900 font-mono">
                  {profile.score}
                </span>
                <span className="text-slate-400 font-semibold text-sm">/ 100</span>
              </div>
              <p className="text-xs text-emerald-800 font-semibold">
                Category: <strong>{profile.level.replace('_', ' ')}</strong>
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <TrustBadge score={profile.score} level={profile.level} size="lg" />
              <span className="text-[10px] text-slate-400">
                Calculated dynamically from real transactions
              </span>
            </div>
          </div>

          {/* Transaction Metrics Grid */}
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
              <span className="text-[10px] text-slate-400 block font-semibold">Resolved Fairly</span>
              <span className="text-base font-black text-emerald-700">{profile.resolvedDisputes}</span>
            </div>
          </div>

          {/* FAIRNESS POLICY GUARANTEE */}
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1.5 text-amber-950">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="font-bold text-xs text-amber-900">
                Fairness Rule: Raising Complaints Never Penalizes You
              </h4>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              In KrishiSetu, raising a dispute or reporting a weighbridge or moisture issue is considered healthy, responsible behavior. Your Trust Score only decreases if an independent mandi investigation confirms fraudulent or repeated unjustified claims.
            </p>
          </div>

          {/* Positive Trust Factors */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Positive Reputation Factors</span>
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

          {/* Negative Trust Factors (if any) */}
          {profile.negativeFactors.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span>Areas Needing Improvement</span>
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

          {/* Recent Trust Events Audit Trail */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Recent Reputation Activity</span>
            </h4>
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-slate-400 italic text-[11px]">No recent score adjustments recorded.</p>
              ) : (
                history.slice(0, 3).map((item) => (
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

                    <div className="shrink-0 text-right font-mono font-bold">
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
                ))
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Governed by KrishiSetu Trust & Verification Guidelines
          </span>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
