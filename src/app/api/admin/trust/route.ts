import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllTrustProfiles, 
  adminUpdateAccountStatus, 
  recordTrustEvent 
} from '@/lib/trustService';

export async function GET() {
  try {
    const profiles = getAllTrustProfiles();
    return NextResponse.json({
      success: true,
      data: profiles,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin trust profiles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, newStatus, adminReason, adminId, adjustmentDelta } = body;

    if (!userId || !adminReason) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: userId and adminReason' },
        { status: 400 }
      );
    }

    if (action === 'UPDATE_STATUS') {
      if (!newStatus) {
        return NextResponse.json(
          { success: false, error: 'newStatus is required for UPDATE_STATUS action' },
          { status: 400 }
        );
      }

      const updatedProfile = adminUpdateAccountStatus({
        userId,
        newStatus,
        adminReason,
        adminId: adminId || 'ADMIN_SUPERVISOR_01',
      });

      return NextResponse.json({
        success: true,
        message: `Account status updated to ${newStatus}`,
        data: updatedProfile,
      });
    }

    if (action === 'MANUAL_SCORE_ADJUSTMENT') {
      if (typeof adjustmentDelta !== 'number') {
        return NextResponse.json(
          { success: false, error: 'adjustmentDelta must be a number' },
          { status: 400 }
        );
      }

      const result = recordTrustEvent({
        userId,
        eventType: 'ADMIN_MANUAL_ADJUSTMENT',
        reason: adminReason,
        customDelta: adjustmentDelta,
        recordedBy: adminId || 'ADMIN_SUPERVISOR_01',
      });

      return NextResponse.json({
        success: true,
        message: 'Admin score adjustment applied and audited',
        data: result.profile,
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action: ${action}` },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error processing admin trust request' },
      { status: 500 }
    );
  }
}
