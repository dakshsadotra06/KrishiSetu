-- KrishiSetu Dynamic Trust & Reputation System Migration
-- Generated for PostgreSQL / Supabase

-- 1. Create Enums
CREATE TYPE "TrustLevel" AS ENUM ('HIGHLY_TRUSTED', 'TRUSTED', 'AVERAGE', 'LOW_TRUST', 'UNDER_REVIEW');
CREATE TYPE "TrustAccountStatus" AS ENUM ('ACTIVE', 'LOW_TRUST_WARNING', 'UNDER_REVIEW', 'SUSPENDED_BY_ADMIN');
CREATE TYPE "TrustEventType" AS ENUM (
    'ORDER_COMPLETED',
    'DISPUTE_RAISED',
    'DISPUTE_UNDER_REVIEW',
    'DISPUTE_RESOLVED_FAVOR',
    'DISPUTE_FOUND_UNJUSTIFIED',
    'REPEATED_UNJUSTIFIED_ABUSIVE',
    'QUALITY_MISMATCH_CONFIRMED',
    'ADMIN_MANUAL_ADJUSTMENT'
);

-- 2. Create UserTrustProfile Table
CREATE TABLE IF NOT EXISTS "UserTrustProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 85,
    "level" "TrustLevel" NOT NULL DEFAULT 'HIGHLY_TRUSTED',
    "status" "TrustAccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "completedOrders" INTEGER NOT NULL DEFAULT 0,
    "successfulTransactions" INTEGER NOT NULL DEFAULT 0,
    "totalDisputesRaised" INTEGER NOT NULL DEFAULT 0,
    "unjustifiedDisputesCount" INTEGER NOT NULL DEFAULT 0,
    "positiveFactors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "negativeFactors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lastCalculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTrustProfile_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "UserTrustProfile_userId_key" UNIQUE ("userId")
);

-- 3. Create TrustScoreHistory Table
CREATE TABLE IF NOT EXISTS "TrustScoreHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "previousScore" INTEGER NOT NULL,
    "newScore" INTEGER NOT NULL,
    "delta" INTEGER NOT NULL,
    "eventType" "TrustEventType" NOT NULL,
    "reason" TEXT NOT NULL,
    "orderId" TEXT,
    "disputeId" TEXT,
    "recordedBy" TEXT NOT NULL DEFAULT 'SYSTEM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrustScoreHistory_pkey" PRIMARY KEY ("id")
);

-- 4. Create TrustEvent Table
CREATE TABLE IF NOT EXISTS "TrustEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventType" "TrustEventType" NOT NULL,
    "scoreImpact" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "orderId" TEXT,
    "disputeId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrustEvent_pkey" PRIMARY KEY ("id")
);

-- 5. Foreign Key Constraints
ALTER TABLE "UserTrustProfile" ADD CONSTRAINT "UserTrustProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TrustScoreHistory" ADD CONSTRAINT "TrustScoreHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TrustEvent" ADD CONSTRAINT "TrustEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS "UserTrustProfile_score_idx" ON "UserTrustProfile"("score");
CREATE INDEX IF NOT EXISTS "TrustScoreHistory_userId_idx" ON "TrustScoreHistory"("userId");
CREATE INDEX IF NOT EXISTS "TrustEvent_userId_idx" ON "TrustEvent"("userId");
