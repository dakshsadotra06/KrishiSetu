'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CalendarClock, 
  Wheat 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProcurementCenter } from '@/types';

interface CenterCardProps {
  center: ProcurementCenter;
  onBookClick?: (center: ProcurementCenter) => void;
}

export function CenterCard({ center, onBookClick }: CenterCardProps) {
  const capacityPercent = Math.round((center.bookedWeightKg / center.dailyCapacityKg) * 100);

  return (
    <Card className="border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-base sm:text-lg text-slate-900 font-bold">
                  {center.name}
                </CardTitle>
                <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                  {center.code}
                </span>
              </div>
              <CardDescription className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{center.address}, {center.district}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-700">{center.distanceKm} km away</span>
              </CardDescription>
            </div>
          </div>

          <Badge
            variant={center.status === 'OPEN' ? 'success' : center.status === 'LIMITED' ? 'warning' : 'error'}
            size="md"
            dot
          >
            {center.status === 'OPEN' ? 'Open for Inflow' : center.status === 'LIMITED' ? 'Limited Capacity' : 'Closed'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3.5 pt-0">
        {/* Capacity Progress Bar */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Daily Inflow Quota:</span>
            <span className="font-bold text-slate-900">
              {(center.bookedWeightKg / 1000).toFixed(0)}T / {(center.dailyCapacityKg / 1000).toFixed(0)}T ({capacityPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                capacityPercent > 85 ? 'bg-rose-500' : capacityPercent > 65 ? 'bg-amber-500' : 'bg-emerald-600'
              }`}
              style={{ width: `${Math.min(capacityPercent, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{center.availableSlotsToday} slots available today</span>
            <span>{center.activeGates} Active Weighbridges</span>
          </div>
        </div>

        {/* Accepted Crops */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
            Accepted Crops Today:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {center.acceptedCrops.map((crop) => (
              <span
                key={crop}
                className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium flex items-center gap-1"
              >
                <Wheat className="w-3 h-3 text-emerald-600" />
                {crop}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Hours: {center.operatingHours}</span>
        </div>

        <Link
          href={`/procurement/book?center=${center.id}`}
          onClick={() => onBookClick && onBookClick(center)}
          className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 select-none active:scale-[0.98] cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-700/20 focus:ring-emerald-500 border border-emerald-600 hover:border-emerald-700 text-xs px-3.5 py-2 gap-1.5"
        >
          <CalendarClock className="w-4 h-4" />
          <span>View Schedule & Book</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
