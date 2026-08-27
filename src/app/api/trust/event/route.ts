import { NextRequest, NextResponse } from 'next/server';
import { recordTrustEvent } from '@/lib/trustService';
import { TrustEventType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // SECURITY CHECK 1: Reject any payload attempting to directly dictate 'score' or 'newScore'
    if ('score' in body || 'newScore' in body) {
      return NextResponse.json(
        {
          success: false,
          error: 'Security Violation: Direct modification of Trust Score is strictly prohibited. Scores are computed exclusively via server-validated events.',
        },
        { status: 403 }
      );
    }

    const { userId, eventType, reason, orderId, disputeId } = body;

    // VALIDATION: Ensure required parameters are provided
    if (!userId || !eventType || !reason) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: userId, eventType, reason' },
        { status: 400 }
      );
    }

    const allowedEvents: TrustEventType[] = [
      'ORDER_COMPLETED',
      'DISPUTE_RAISED',
      'DISPUTE_UNDER_REVIEW',
      'DISPUTE_RESOLVED_FAVOR',
      'DISPUTE_FOUND_UNJUSTIFIED',
      'REPEATED_UNJUSTIFIED_ABUSIVE',
      'QUALITY_MISMATCH_CONFIRMED',
    ];

    if (!allowedEvents.includes(eventType)) {
      return NextResponse.json(
        { success: false, error: `Invalid event type: ${eventType}` },
        { status: 400 }
      );
    }

    const result = recordTrustEvent({
      userId,
      eventType,
      reason,
      orderId,
      disputeId,
      recordedBy: 'SYSTEM_EVENT_API',
    });

    return NextResponse.json({
      success: true,
      message: 'Trust event recorded successfully',
      data: {
        userId: result.profile.userId,
        newScore: result.profile.score,
        level: result.profile.level,
        status: result.profile.status,
        delta: result.historyItem.delta,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error processing trust event' },
      { status: 500 }
    );
  }
}
