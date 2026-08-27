import { NextRequest, NextResponse } from 'next/server';
import { getUserTrustProfile } from '@/lib/trustService';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const profile = getUserTrustProfile(userId);

    // Return sanitized public profile (internal admin details are not leaked)
    return NextResponse.json({
      success: true,
      data: {
        userId: profile.userId,
        userName: profile.userName,
        userRole: profile.userRole,
        score: profile.score,
        level: profile.level,
        status: profile.status,
        completedOrders: profile.completedOrders,
        successfulTransactions: profile.successfulTransactions,
        successRatePercent: profile.successRatePercent,
        totalDisputes: profile.totalDisputes,
        resolvedDisputes: profile.resolvedDisputes,
        positiveFactors: profile.positiveFactors,
        negativeFactors: profile.negativeFactors,
        lastCalculatedAt: profile.lastCalculatedAt,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trust profile' },
      { status: 500 }
    );
  }
}
