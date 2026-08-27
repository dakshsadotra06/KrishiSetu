import { 
  TrustProfile, 
  TrustLevel, 
  TrustAccountStatus, 
  TrustEventType, 
  TrustHistoryItem,
  UserRole 
} from '@/types';

// In-Memory Database Store for Trust Profiles and Audit History
const trustProfilesStore: Map<string, TrustProfile> = new Map([
  [
    'farmer-01',
    {
      userId: 'farmer-01',
      userName: 'Ramesh Shankar Choudhary',
      userRole: 'FARMER',
      score: 92,
      level: 'HIGHLY_TRUSTED',
      status: 'ACTIVE',
      completedOrders: 27,
      successfulTransactions: 26,
      successRatePercent: 96,
      totalDisputes: 1,
      resolvedDisputes: 1,
      unjustifiedDisputesCount: 0,
      positiveFactors: [
        '100% on-time weighbridge arrival rate',
        'Certified Grade A quality consistency on 96% of dispatches',
        'Consistently accurate moisture grading (avg 11.4%)',
        'Fast turnaround and polite communication with logistics drivers'
      ],
      negativeFactors: [],
      lastCalculatedAt: new Date().toISOString(),
    },
  ],
  [
    'buyer-01',
    {
      userId: 'buyer-01',
      userName: 'AgroStar Fresh Procurement Ltd. (Vikram Mehrotra)',
      userRole: 'BUYER',
      score: 94,
      level: 'HIGHLY_TRUSTED',
      status: 'ACTIVE',
      completedOrders: 83,
      successfulTransactions: 81,
      successRatePercent: 97,
      totalDisputes: 2,
      resolvedDisputes: 2,
      unjustifiedDisputesCount: 0,
      positiveFactors: [
        '30% advance escrow deposited within 15 minutes of deal agreement',
        '99.2% prompt on-time delivery confirmation',
        'Zero unjustified payment delays or cancellations',
        'High farmer rating of 4.9 / 5.0 across 142 historical reviews'
      ],
      negativeFactors: [],
      lastCalculatedAt: new Date().toISOString(),
    },
  ],
  [
    'buyer-low-01',
    {
      userId: 'buyer-low-01',
      userName: 'QuickBazaar Wholesale Traders',
      userRole: 'BUYER',
      score: 42,
      level: 'LOW_TRUST',
      status: 'LOW_TRUST_WARNING',
      completedOrders: 14,
      successfulTransactions: 9,
      successRatePercent: 64,
      totalDisputes: 5,
      resolvedDisputes: 5,
      unjustifiedDisputesCount: 3,
      positiveFactors: [
        'Verified GST and registered commercial trading entity'
      ],
      negativeFactors: [
        'Repeated unjustified quality disputes filed after goods acceptance',
        'High dispute frequency relative to total deal volume (35% rate)',
        'Delays in releasing final balance authorization to farmers'
      ],
      lastCalculatedAt: new Date().toISOString(),
    },
  ],
  [
    'farmer-review-01',
    {
      userId: 'farmer-review-01',
      userName: 'Suraj Agro Farm Holdings',
      userRole: 'FARMER',
      score: 28,
      level: 'UNDER_REVIEW',
      status: 'UNDER_REVIEW',
      completedOrders: 8,
      successfulTransactions: 4,
      successRatePercent: 50,
      totalDisputes: 4,
      resolvedDisputes: 4,
      unjustifiedDisputesCount: 0,
      positiveFactors: [
        'Level 1 Mobile & Aadhaar identity verification completed'
      ],
      negativeFactors: [
        'Repeated confirmed crop grade discrepancies upon mandi weighbridge delivery',
        'Multiple dispatch cancellations after escrow funding',
        'Pending formal compliance audit by Mandi Supervisor'
      ],
      lastCalculatedAt: new Date().toISOString(),
    },
  ],
]);

const trustHistoryStore: Map<string, TrustHistoryItem[]> = new Map([
  [
    'farmer-01',
    [
      {
        id: 'hist-f1',
        userId: 'farmer-01',
        previousScore: 90,
        newScore: 92,
        delta: 2,
        eventType: 'ORDER_COMPLETED',
        reason: 'Successfully delivered 80 Qtl Basmati Paddy (ORD-87201). Verified Grade A quality on electronic weighbridge.',
        orderId: 'ORD-87201',
        recordedBy: 'SYSTEM',
        createdAt: '2026-10-24T16:35:00Z',
      },
      {
        id: 'hist-f2',
        userId: 'farmer-01',
        previousScore: 90,
        newScore: 90,
        delta: 0,
        eventType: 'DISPUTE_RESOLVED_FAVOR',
        reason: 'Transit delay ticket #DISP-101 resolved in farmer favor. No penalty applied per KrishiSetu fairness policy.',
        disputeId: 'DISP-101',
        recordedBy: 'ADMIN_DESK',
        createdAt: '2026-09-12T11:20:00Z',
      },
    ],
  ],
  [
    'buyer-01',
    [
      {
        id: 'hist-b1',
        userId: 'buyer-01',
        previousScore: 92,
        newScore: 94,
        delta: 2,
        eventType: 'ORDER_COMPLETED',
        reason: 'Promptly released delivery balance ₹2,07,200 for ORD-87201 on weighbridge verification.',
        orderId: 'ORD-87201',
        recordedBy: 'SYSTEM',
        createdAt: '2026-10-24T16:35:00Z',
      },
      {
        id: 'hist-b2',
        userId: 'buyer-01',
        previousScore: 92,
        newScore: 92,
        delta: 0,
        eventType: 'DISPUTE_RAISED',
        reason: 'Buyer raised legitimate ticket #DISP-088 regarding moisture verification. Fairness rule: 0 penalty applied.',
        disputeId: 'DISP-088',
        recordedBy: 'SYSTEM',
        createdAt: '2026-08-14T09:00:00Z',
      },
    ],
  ],
  [
    'buyer-low-01',
    [
      {
        id: 'hist-bl1',
        userId: 'buyer-low-01',
        previousScore: 54,
        newScore: 48,
        delta: -6,
        eventType: 'DISPUTE_FOUND_UNJUSTIFIED',
        reason: 'Quality dispute #DISP-401 determined completely unjustified after government mandi lab testing.',
        disputeId: 'DISP-401',
        recordedBy: 'ADMIN_COMPLIANCE',
        createdAt: '2026-10-15T14:10:00Z',
      },
      {
        id: 'hist-bl2',
        userId: 'buyer-low-01',
        previousScore: 48,
        newScore: 42,
        delta: -6,
        eventType: 'REPEATED_UNJUSTIFIED_ABUSIVE',
        reason: 'Repeated frivolous rejection of conforming produce batch #ORD-6621. Score entered Low Trust warning zone.',
        disputeId: 'DISP-488',
        recordedBy: 'ADMIN_COMPLIANCE',
        createdAt: '2026-10-22T10:00:00Z',
      },
    ],
  ],
]);

/**
 * Calculates the categorical TrustLevel based on numerical score (0 - 100)
 */
export function calculateTrustLevel(score: number): TrustLevel {
  if (score >= 80) return 'HIGHLY_TRUSTED';
  if (score >= 65) return 'TRUSTED';
  if (score >= 50) return 'AVERAGE';
  if (score >= 30) return 'LOW_TRUST';
  return 'UNDER_REVIEW';
}

/**
 * Evaluates appropriate account status based on score without auto-banning
 */
export function evaluateAccountStatus(
  currentStatus: TrustAccountStatus,
  newScore: number
): TrustAccountStatus {
  // If an admin manually suspended the user, only an admin can unsuspend
  if (currentStatus === 'SUSPENDED_BY_ADMIN') {
    return 'SUSPENDED_BY_ADMIN';
  }

  if (newScore < 30) {
    return 'UNDER_REVIEW';
  }
  if (newScore < 50) {
    return 'LOW_TRUST_WARNING';
  }
  return 'ACTIVE';
}

/**
 * Retrieves or creates a default TrustProfile for a given user
 */
export function getUserTrustProfile(userId: string, defaultName?: string, defaultRole: UserRole = 'FARMER'): TrustProfile {
  let profile = trustProfilesStore.get(userId);
  if (!profile) {
    profile = {
      userId,
      userName: defaultName || 'Verified User',
      userRole: defaultRole,
      score: 85,
      level: 'HIGHLY_TRUSTED',
      status: 'ACTIVE',
      completedOrders: 0,
      successfulTransactions: 0,
      successRatePercent: 100,
      totalDisputes: 0,
      resolvedDisputes: 0,
      unjustifiedDisputesCount: 0,
      positiveFactors: [
        'Account verified and registered on KrishiSetu platform'
      ],
      negativeFactors: [],
      lastCalculatedAt: new Date().toISOString(),
    };
    trustProfilesStore.set(userId, profile);
  }
  return profile;
}

/**
 * Retrieves audit history for a user
 */
export function getTrustHistory(userId: string): TrustHistoryItem[] {
  return trustHistoryStore.get(userId) || [];
}

/**
 * Core Event Processor: Records a trust event and updates user score in compliance with fairness rules
 */
export function recordTrustEvent(params: {
  userId: string;
  eventType: TrustEventType;
  reason: string;
  orderId?: string;
  disputeId?: string;
  recordedBy?: string;
  customDelta?: number; // Optional admin manual adjustment
}): { profile: TrustProfile; historyItem: TrustHistoryItem } {
  const profile = getUserTrustProfile(params.userId);
  const previousScore = profile.score;
  let delta = 0;

  switch (params.eventType) {
    case 'ORDER_COMPLETED':
      delta = 2; // +2 for successful on-time deal completion
      profile.completedOrders += 1;
      profile.successfulTransactions += 1;
      break;

    case 'DISPUTE_RAISED':
      // FAIRNESS RULE: Raising a complaint is never penalized!
      delta = 0;
      profile.totalDisputes += 1;
      break;

    case 'DISPUTE_UNDER_REVIEW':
      // FAIRNESS RULE: Dispute under investigation has 0 penalty
      delta = 0;
      break;

    case 'DISPUTE_RESOLVED_FAVOR':
      // FAIRNESS RULE: Legitimate dispute resolved in user's favor has 0 penalty
      delta = 0;
      profile.resolvedDisputes += 1;
      break;

    case 'DISPUTE_FOUND_UNJUSTIFIED':
      // Claimant receives appropriate penalty for filing unjustified claim
      delta = -6;
      profile.unjustifiedDisputesCount += 1;
      profile.resolvedDisputes += 1;
      break;

    case 'REPEATED_UNJUSTIFIED_ABUSIVE':
      // Progressive penalty for repeated abusive dispute filings
      delta = -12;
      profile.unjustifiedDisputesCount += 1;
      profile.resolvedDisputes += 1;
      break;

    case 'QUALITY_MISMATCH_CONFIRMED':
      // Confirmed quality fraud/mismatch penalty on responsible party
      delta = -10;
      profile.resolvedDisputes += 1;
      break;

    case 'ADMIN_MANUAL_ADJUSTMENT':
      delta = typeof params.customDelta === 'number' ? params.customDelta : 0;
      break;

    default:
      delta = 0;
  }

  // Calculate new score clamped between 0 and 100
  const newScore = Math.max(0, Math.min(100, previousScore + delta));
  profile.score = newScore;
  profile.level = calculateTrustLevel(newScore);
  profile.status = evaluateAccountStatus(profile.status, newScore);

  // Recalculate success rate
  if (profile.completedOrders > 0) {
    profile.successRatePercent = Math.round(
      (profile.successfulTransactions / profile.completedOrders) * 100
    );
  }

  profile.lastCalculatedAt = new Date().toISOString();

  // Create audit history record
  const historyItem: TrustHistoryItem = {
    id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    userId: params.userId,
    previousScore,
    newScore,
    delta,
    eventType: params.eventType,
    reason: params.reason,
    orderId: params.orderId,
    disputeId: params.disputeId,
    recordedBy: params.recordedBy || 'SYSTEM',
    createdAt: new Date().toISOString(),
  };

  const userHistory = trustHistoryStore.get(params.userId) || [];
  userHistory.unshift(historyItem);
  trustHistoryStore.set(params.userId, userHistory);

  return { profile, historyItem };
}

/**
 * High-level helper: Process successful order completion for both buyer & farmer
 */
export function processOrderSuccess(orderId: string, farmerId: string, buyerId: string, cropName: string) {
  // Reward Farmer
  recordTrustEvent({
    userId: farmerId,
    eventType: 'ORDER_COMPLETED',
    reason: `Completed delivery of ${cropName} (Order #${orderId}) with electronic weighbridge verification.`,
    orderId,
  });

  // Reward Buyer
  recordTrustEvent({
    userId: buyerId,
    eventType: 'ORDER_COMPLETED',
    reason: `Fulfilled payment terms promptly for Order #${orderId}. Full DBT balance released.`,
    orderId,
  });
}

/**
 * High-level helper: Process dispute resolution
 */
export function processDisputeOutcome(params: {
  disputeId: string;
  claimantId: string;
  respondentId: string;
  outcome: 'RESOLVED_LEGITIMATE_FAVOR_CLAIMANT' | 'FOUND_UNJUSTIFIED' | 'REPEATED_ABUSIVE' | 'SELLER_QUALITY_MISMATCH';
  notes: string;
  adminId?: string;
}) {
  const { disputeId, claimantId, respondentId, outcome, notes, adminId } = params;

  switch (outcome) {
    case 'RESOLVED_LEGITIMATE_FAVOR_CLAIMANT':
      // Claimant receives ZERO penalty
      recordTrustEvent({
        userId: claimantId,
        eventType: 'DISPUTE_RESOLVED_FAVOR',
        reason: `Complaint verified legitimate by Mandi Board. ${notes}`,
        disputeId,
        recordedBy: adminId || 'ADMIN_DESK',
      });
      break;

    case 'FOUND_UNJUSTIFIED':
      // Claimant receives moderate penalty
      recordTrustEvent({
        userId: claimantId,
        eventType: 'DISPUTE_FOUND_UNJUSTIFIED',
        reason: `Claim determined unjustified upon electronic weighbridge inspection. ${notes}`,
        disputeId,
        recordedBy: adminId || 'ADMIN_DESK',
      });
      break;

    case 'REPEATED_ABUSIVE':
      // Claimant receives progressive penalty
      recordTrustEvent({
        userId: claimantId,
        eventType: 'REPEATED_UNJUSTIFIED_ABUSIVE',
        reason: `System detected repeated unjustified dispute behavior. ${notes}`,
        disputeId,
        recordedBy: adminId || 'ADMIN_DESK',
      });
      break;

    case 'SELLER_QUALITY_MISMATCH':
      // Claimant receives NO penalty, seller receives quality mismatch penalty
      recordTrustEvent({
        userId: claimantId,
        eventType: 'DISPUTE_RESOLVED_FAVOR',
        reason: `Buyer claim verified by mandi inspector. ${notes}`,
        disputeId,
        recordedBy: adminId || 'ADMIN_DESK',
      });

      recordTrustEvent({
        userId: respondentId,
        eventType: 'QUALITY_MISMATCH_CONFIRMED',
        reason: `Confirmed quality deviation from listed Grade A specifications. ${notes}`,
        disputeId,
        recordedBy: adminId || 'ADMIN_DESK',
      });
      break;
  }
}

/**
 * Admin action: Manually change account status or adjust trust score
 */
export function adminUpdateAccountStatus(params: {
  userId: string;
  newStatus: TrustAccountStatus;
  adminReason: string;
  adminId: string;
}): TrustProfile {
  const profile = getUserTrustProfile(params.userId);
  profile.status = params.newStatus;
  profile.lastCalculatedAt = new Date().toISOString();

  // Log in audit history
  const historyItem: TrustHistoryItem = {
    id: `admin-action-${Date.now()}`,
    userId: params.userId,
    previousScore: profile.score,
    newScore: profile.score,
    delta: 0,
    eventType: 'ADMIN_MANUAL_ADJUSTMENT',
    reason: `Admin changed account status to ${params.newStatus}: ${params.adminReason}`,
    recordedBy: params.adminId,
    createdAt: new Date().toISOString(),
  };

  const userHistory = trustHistoryStore.get(params.userId) || [];
  userHistory.unshift(historyItem);
  trustHistoryStore.set(params.userId, userHistory);

  return profile;
}

/**
 * Retrieves all trust profiles for Admin view
 */
export function getAllTrustProfiles(): TrustProfile[] {
  return Array.from(trustProfilesStore.values());
}
