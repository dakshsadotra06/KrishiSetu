import { NextRequest, NextResponse } from 'next/server';
import { getTrustHistory } from '@/lib/trustService';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const history = getTrustHistory(userId);

    // Return sanitized summarized history (safe for user viewing)
    const sanitized = history.map((item) => ({
      id: item.id,
      previousScore: item.previousScore,
      newScore: item.newScore,
      delta: item.delta,
      eventType: item.eventType,
      reason: item.reason,
      createdAt: item.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: sanitized,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trust history' },
      { status: 500 }
    );
  }
}
