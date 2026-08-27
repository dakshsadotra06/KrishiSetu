'use client';

import React from 'react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { LiveQueueMonitor } from '@/components/procurement/LiveQueueMonitor';

export default function QueueTrackerPage() {
  return (
    <FarmerPortalLayout>
      <LiveQueueMonitor />
    </FarmerPortalLayout>
  );
}
