'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Sliders, 
  CheckCircle2, 
  Scale, 
  Search, 
  Eye, 
  AlertCircle, 
  Play 
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TrustBadge } from '@/components/trust/TrustBadge';
import { TrustProfile, TrustHistoryItem, TrustAccountStatus } from '@/types';
import { 
  getAllTrustProfiles, 
  getTrustHistory, 
  adminUpdateAccountStatus, 
  processDisputeOutcome,
  getUserTrustProfile
} from '@/lib/trustService';

export default function AdminTrustManagementPage() {
  const [profiles, setProfiles] = useState<TrustProfile[]>(() => getAllTrustProfiles());
  const [filterRole, setFilterRole] = useState<'ALL' | 'FARMER' | 'BUYER'>('ALL');
  const [selectedUser, setSelectedUser] = useState<TrustProfile | null>(null);
  const [userHistory, setUserHistory] = useState<TrustHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulator state
  const [simClaimantId, setSimClaimantId] = useState('buyer-low-01');
  const [simRespondentId, setSimRespondentId] = useState('farmer-01');
  const [simOutcome, setSimOutcome] = useState<
    'RESOLVED_LEGITIMATE_FAVOR_CLAIMANT' | 'FOUND_UNJUSTIFIED' | 'REPEATED_ABUSIVE' | 'SELLER_QUALITY_MISMATCH'
  >('RESOLVED_LEGITIMATE_FAVOR_CLAIMANT');
  const [simNotes, setSimNotes] = useState('Tested moisture discrepancy against official electronic gate weighment');
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const loadProfiles = useCallback(() => {
    const list = getAllTrustProfiles();
    setProfiles([...list]);
  }, []);

  const handleInspectUser = (profile: TrustProfile) => {
    setSelectedUser(profile);
    const history = getTrustHistory(profile.userId);
    setUserHistory(history);
  };

  const handleStatusChange = (newStatus: TrustAccountStatus) => {
    if (!selectedUser) return;
    const updated = adminUpdateAccountStatus({
      userId: selectedUser.userId,
      newStatus,
      adminReason: `Manual supervisor intervention via Admin Portal`,
      adminId: 'ADMIN_DESK_CHIEF',
    });
    setSelectedUser({ ...updated });
    loadProfiles();
  };

  const handleRunDisputeSimulation = () => {
    processDisputeOutcome({
      disputeId: `DISP-SIM-${Date.now()}`,
      claimantId: simClaimantId,
      respondentId: simRespondentId,
      outcome: simOutcome,
      notes: simNotes,
      adminId: 'ADMIN_SIMULATOR',
    });

    loadProfiles();

    if (simOutcome === 'RESOLVED_LEGITIMATE_FAVOR_CLAIMANT') {
      setSimulationResult('Fairness Rule Applied: Legitimate complaint confirmed. Claimant received ±0 penalty (Protected).');
    } else if (simOutcome === 'FOUND_UNJUSTIFIED') {
      setSimulationResult('Claim determined unjustified: Claimant received -6 point penalty.');
    } else if (simOutcome === 'REPEATED_ABUSIVE') {
      setSimulationResult('Repeated abusive claim detected: Claimant received progressive -12 point penalty.');
    } else if (simOutcome === 'SELLER_QUALITY_MISMATCH') {
      setSimulationResult('Seller Quality Deviation: Claimant received ±0 penalty; Seller received -10 point penalty.');
    }

    if (selectedUser) {
      handleInspectUser(getUserTrustProfile(selectedUser.userId));
    }
  };

  const filtered = profiles.filter((p) => {
    if (filterRole !== 'ALL' && p.userRole !== filterRole) return false;
    if (searchQuery) {
      return (
        p.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.userId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <FarmerPortalLayout>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 uppercase">
                Admin Supervisor Desk
              </span>
              <span className="text-xs text-slate-500">• Anti-Abuse & Reputation Audits</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
              <ShieldAlert className="w-7 h-7 text-emerald-700" />
              <span>Trust & Reputation Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Monitor dynamic trust tiers, review algorithmic warnings, and execute manual oversight
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              Farmer Profile
            </Link>
            <Link
              href="/buyer/buyer-01"
              className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              Buyer Profile
            </Link>
          </div>
        </div>

        {/* Regulatory Fairness Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-amber-300">Statutory Fairness & Account Safeguards</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Algorithms flag accounts into <strong>Low Trust Warning (&lt;50)</strong> or <strong>Under Review (&lt;30)</strong> states. Automatic algorithmic banning is prohibited. Account suspension requires explicit human supervisor authorization.
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40 shrink-0">
            Fairness Guard Active
          </span>
        </div>

        {/* Search & Role Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by user or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs bg-white focus:outline-emerald-600 font-semibold"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setFilterRole('ALL')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                filterRole === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Users ({profiles.length})
            </button>
            <button
              onClick={() => setFilterRole('FARMER')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                filterRole === 'FARMER'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Farmers ({profiles.filter((p) => p.userRole === 'FARMER').length})
            </button>
            <button
              onClick={() => setFilterRole('BUYER')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                filterRole === 'BUYER'
                  ? 'bg-teal-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Buyers ({profiles.filter((p) => p.userRole === 'BUYER').length})
            </button>
          </div>
        </div>

        {/* Users Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3.5">User / Entity</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Trust Score</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Completed</th>
                  <th className="p-3.5">Disputes</th>
                  <th className="p-3.5">Success %</th>
                  <th className="p-3.5">Reason Indicators</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((profile) => {
                  return (
                    <tr
                      key={profile.userId}
                      className={`hover:bg-slate-50/80 transition ${
                        selectedUser?.userId === profile.userId ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <td className="p-3.5 font-bold text-slate-900">
                        <div>{profile.userName}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{profile.userId}</span>
                      </td>

                      <td className="p-3.5">
                        <Badge
                          variant={profile.userRole === 'FARMER' ? 'emerald' : 'neutral'}
                          size="sm"
                        >
                          {profile.userRole}
                        </Badge>
                      </td>

                      <td className="p-3.5">
                        <TrustBadge score={profile.score} level={profile.level} size="sm" />
                      </td>

                      <td className="p-3.5">
                        {profile.status === 'ACTIVE' && (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                            Active
                          </span>
                        )}
                        {profile.status === 'LOW_TRUST_WARNING' && (
                          <span className="text-orange-900 bg-orange-100 border border-orange-300 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Warning</span>
                          </span>
                        )}
                        {profile.status === 'UNDER_REVIEW' && (
                          <span className="text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Review Req.</span>
                          </span>
                        )}
                        {profile.status === 'SUSPENDED_BY_ADMIN' && (
                          <span className="text-red-950 bg-red-200 border border-red-400 px-2 py-0.5 rounded text-[10px] font-black">
                            Suspended
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 font-bold text-slate-800">
                        {profile.completedOrders} deals
                      </td>

                      <td className="p-3.5 font-semibold text-slate-700">
                        {profile.totalDisputes}
                        {profile.unjustifiedDisputesCount > 0 && (
                          <span className="text-rose-600 block text-[10px] font-bold">
                            ({profile.unjustifiedDisputesCount} unjustified)
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 font-mono font-bold text-emerald-800">
                        {profile.successRatePercent}%
                      </td>

                      <td className="p-3.5 text-[11px] text-slate-600 max-w-xs">
                        {profile.negativeFactors.length > 0 ? (
                          <ul className="list-disc list-inside text-orange-900 space-y-0.5">
                            {profile.negativeFactors.slice(0, 2).map((nf, i) => (
                              <li key={i} className="truncate">{nf}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-emerald-700 font-semibold">
                            ✓ Healthy trading conduct
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                          onClick={() => handleInspectUser(profile)}
                        >
                          Inspect & Audit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Inspection & Supervisor Action Drawer / Modal */}
        {selectedUser && (
          <Card className="border-2 border-emerald-400 shadow-xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <CardTitle className="text-base font-bold text-white">
                    Supervisor Audit: {selectedUser.userName} ({selectedUser.userId})
                  </CardTitle>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                >
                  Close Panel ✕
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Trust Score & Tier</span>
                  <div className="mt-1">
                    <TrustBadge score={selectedUser.score} level={selectedUser.level} size="md" />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Supervisor Action State</span>
                  <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => handleStatusChange('ACTIVE')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        selectedUser.status === 'ACTIVE'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusChange('LOW_TRUST_WARNING')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        selectedUser.status === 'LOW_TRUST_WARNING'
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      Warn
                    </button>
                    <button
                      onClick={() => handleStatusChange('UNDER_REVIEW')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        selectedUser.status === 'UNDER_REVIEW'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      Flag Review
                    </button>
                    <button
                      onClick={() => handleStatusChange('SUSPENDED_BY_ADMIN')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        selectedUser.status === 'SUSPENDED_BY_ADMIN'
                          ? 'bg-red-700 text-white'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      Suspend
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Dispute Frequency</span>
                  <p className="font-bold text-slate-900 mt-1">
                    {selectedUser.totalDisputes} total filed • {selectedUser.unjustifiedDisputesCount} unjustified
                  </p>
                </div>
              </div>

              {/* History Timeline */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
                  Complete Trust Score Audit Trail
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {userHistory.length === 0 ? (
                    <p className="text-slate-400 italic">No score adjustments on record.</p>
                  ) : (
                    userHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-800">{item.reason}</span>
                          <p className="text-[10px] text-slate-400">
                            Recorded by: <strong>{item.recordedBy}</strong> • {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <span className="font-mono font-black text-xs">
                          {item.delta > 0 ? `+${item.delta}` : item.delta}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Dispute Outcome Simulator Card */}
        <Card className="border-slate-200 shadow-md bg-gradient-to-br from-white via-slate-50 to-white">
          <CardHeader className="bg-slate-800 text-white p-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-white">
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Interactive Dispute Resolution & Trust Impact Simulator</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-4 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Test how the system enforces the <strong>KrishiSetu Fairness Policy</strong> when resolving disputes. Notice how raising complaints never penalizes a user, while unjustified or abusive complaints trigger calibrated deductions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block text-[11px]">Claimant (User)</label>
                <select
                  value={simClaimantId}
                  onChange={(e) => setSimClaimantId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white font-semibold"
                >
                  <option value="buyer-01">AgroStar Fresh (Score 94)</option>
                  <option value="buyer-low-01">QuickBazaar Traders (Score 42)</option>
                  <option value="farmer-01">Ramesh Patil (Score 92)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block text-[11px]">Respondent (Counterparty)</label>
                <select
                  value={simRespondentId}
                  onChange={(e) => setSimRespondentId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white font-semibold"
                >
                  <option value="farmer-01">Ramesh Patil (Score 92)</option>
                  <option value="farmer-review-01">Suraj Agro (Score 28)</option>
                  <option value="buyer-01">AgroStar Fresh (Score 94)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block text-[11px]">Dispute Investigation Outcome</label>
                <select
                  value={simOutcome}
                  onChange={(e) => setSimOutcome(e.target.value as typeof simOutcome)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white font-semibold"
                >
                  <option value="RESOLVED_LEGITIMATE_FAVOR_CLAIMANT">
                    Legitimate Claim (Claimant gets ±0 penalty)
                  </option>
                  <option value="FOUND_UNJUSTIFIED">
                    Unjustified Claim (Claimant gets -6 penalty)
                  </option>
                  <option value="REPEATED_ABUSIVE">
                    Repeated Abusive Claim (Claimant gets -12 penalty)
                  </option>
                  <option value="SELLER_QUALITY_MISMATCH">
                    Confirmed Quality Mismatch (Seller gets -10 penalty)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <input
                type="text"
                placeholder="Supervisor observation notes..."
                value={simNotes}
                onChange={(e) => setSimNotes(e.target.value)}
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white"
              />
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Play className="w-3.5 h-3.5" />}
                onClick={handleRunDisputeSimulation}
              >
                Execute Resolution & Apply Score Delta
              </Button>
            </div>

            {simulationResult && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{simulationResult}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
