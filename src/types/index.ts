export type UserRole = 'FARMER' | 'BUYER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  location: string;
  avatarUrl?: string;
  verified: boolean;
  kisanId?: string;
}

export interface ProcurementSlot {
  id: string;
  tokenNumber: string;
  centerName: string;
  centerLocation: string;
  centerDistanceKm: number;
  commodityName: string;
  variety: string;
  quantityQuintals: number;
  date: string;
  timeSlot: string;
  status: 'SCHEDULED' | 'GATE_CHECKIN' | 'WEIGHED' | 'QUALITY_PASSED' | 'COMPLETED' | 'CANCELLED';
  estimatedWaitMinutes: number;
  qrCodeMockData: string;
}

export interface ProcurementCenter {
  id: string;
  name: string;
  code: string;
  address: string;
  district: string;
  state: string;
  distanceKm: number;
  dailyCapacityKg: number;
  bookedWeightKg: number;
  operatingHours: string;
  status: 'OPEN' | 'LIMITED' | 'CLOSED';
  acceptedCrops: string[];
  activeGates: number;
  availableSlotsToday: number;
  totalSlotsToday: number;
}

export interface SlotOption {
  id: string;
  timeWindow: string;
  maxCapacityKg: number;
  bookedWeightKg: number;
  remainingSlots: number;
  status: 'AVAILABLE' | 'FEW_LEFT' | 'FULL';
}

export interface DigitalTokenPassData {
  tokenNumber: string;
  bookingNumber: string;
  farmerName: string;
  farmerPhone: string;
  kisanId: string;
  centerName: string;
  centerAddress: string;
  gateNumber: string;
  commodityName: string;
  variety: string;
  bookedWeightKg: number;
  quantityQuintals: number;
  date: string;
  timeSlot: string;
  queuePosition: number;
  farmersAhead: number;
  estimatedWaitMinutes: number;
  vehicleType: string;
  vehicleNumber?: string;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED';
}

export interface ProduceListing {
  id: string;
  title: string;
  category: 'Grains' | 'Pulses' | 'Oilseeds' | 'Fruits' | 'Vegetables';
  variety: string;
  quantityAvailable: number;
  unit: string;
  expectedPricePerUnit: number;
  minOrderQuantity: number;
  harvestDate: string;
  location: string;
  imageUrl: string;
  photos?: string[];
  grade?: string;
  farmerName?: string;
  farmerRating?: number;
  verifiedFarmer?: boolean;
  description?: string;
  readyForDispatchDate?: string;
  status: 'ACTIVE' | 'PENDING_OFFERS' | 'SOLD_OUT' | 'UNLISTED';
  offersCount: number;
  viewsCount: number;
}

export interface BuyerOffer {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  buyerCompany: string;
  buyerRating: number;
  offeredPricePerUnit: number;
  askingPricePerUnit: number;
  quantityRequested: number;
  unit: string;
  totalOfferValue: number;
  escrowAdvancePercent: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED';
  expiresInHours: number;
  createdAt: string;
}

export interface MandiRate {
  commodity: string;
  variety: string;
  mandiName: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  mspPrice: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  changePercent: number;
}

export interface BuyerProfileDetails {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  gstin: string;
  memberSince: string;
  rating: number;
  completedDeals: number;
  totalVolumeTransactedCr: number;
  onTimePaymentRatePercent: number;
  disputesCount: number;
  disputesResolvedFarmerFavor: number;
  verifiedGst: boolean;
  verifiedMobile: boolean;
  escrowReady: boolean;
  farmerReviews: {
    id: string;
    farmerName: string;
    location: string;
    comment: string;
    rating: number;
    date: string;
  }[];
}

export interface Order {
  id: string;
  orderNumber: string;
  listingId: string;
  cropTitle: string;
  variety: string;
  grade: string;
  quantityQuintals: number;
  unit: string;
  agreedPricePerUnit: number;
  totalDealAmount: number;
  escrowAdvancePercent: number;
  escrowAdvanceAmount: number;
  deliveryBalanceAmount: number;
  escrowTransactionId?: string;
  escrowBankPartner: string;
  escrowStatus: 'PENDING_DEPOSIT' | 'LOCKED_IN_ESCROW' | 'RELEASED_TO_FARMER' | 'DISPUTED';
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  farmerName: string;
  farmerPhone: string;
  pickupLocation: string;
  dispatchDeadline: string;
  timelineStep: 1 | 2 | 3 | 4 | 5;
  status: 'AWAITING_ADVANCE' | 'ADVANCE_SECURED' | 'DISPATCHED' | 'WEIGHED_AT_GATE' | 'COMPLETED' | 'DISPUTED';
  dispatchProof?: {
    vehicleNumber: string;
    driverPhone: string;
    biltyImageUrl?: string;
    timestamp: string;
  };
  deliveryProof?: {
    grossWeightKg: number;
    moisturePercent: number;
    qualityPassed: boolean;
    weighbridgeSlipUrl?: string;
    finalDbtPayoutAmount: number;
    dbtReference: string;
    timestamp: string;
  };
  dispute?: {
    id: string;
    reason: string;
    claimedBy: 'BUYER' | 'FARMER';
    status: 'OPEN' | 'RESOLVED';
    resolutionNotes?: string;
  };
  settlement?: {
    totalPaid: number;
    escrowAdvance: number;
    finalSettlement: number;
    bankAccount: string;
    utrNumber: string;
    timestamp: string;
    status: string;
  };
  createdAt: string;
}

export type TrustLevel = 'HIGHLY_TRUSTED' | 'TRUSTED' | 'AVERAGE' | 'LOW_TRUST' | 'UNDER_REVIEW';

export type TrustAccountStatus = 'ACTIVE' | 'LOW_TRUST_WARNING' | 'UNDER_REVIEW' | 'SUSPENDED_BY_ADMIN';

export type TrustEventType = 
  | 'ORDER_COMPLETED'
  | 'DISPUTE_RAISED'
  | 'DISPUTE_UNDER_REVIEW'
  | 'DISPUTE_RESOLVED_FAVOR'
  | 'DISPUTE_FOUND_UNJUSTIFIED'
  | 'REPEATED_UNJUSTIFIED_ABUSIVE'
  | 'QUALITY_MISMATCH_CONFIRMED'
  | 'ADMIN_MANUAL_ADJUSTMENT';

export interface TrustProfile {
  userId: string;
  userName: string;
  userRole: UserRole;
  score: number;
  level: TrustLevel;
  status: TrustAccountStatus;
  completedOrders: number;
  successfulTransactions: number;
  successRatePercent: number;
  totalDisputes: number;
  resolvedDisputes: number;
  unjustifiedDisputesCount: number;
  positiveFactors: string[];
  negativeFactors: string[];
  lastCalculatedAt: string;
}

export interface TrustHistoryItem {
  id: string;
  userId: string;
  previousScore: number;
  newScore: number;
  delta: number;
  eventType: TrustEventType;
  reason: string;
  orderId?: string;
  disputeId?: string;
  recordedBy: string;
  createdAt: string;
}


