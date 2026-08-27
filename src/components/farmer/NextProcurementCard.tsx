'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarClock, 
  MapPin, 
  QrCode, 
  Wheat, 
  Truck, 
  Activity, 
  Download 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProcurementSlot } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface NextProcurementCardProps {
  slot: ProcurementSlot;
}

export function NextProcurementCard({ slot }: NextProcurementCardProps) {
  const { t } = useLanguage();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);

  return (
    <>
      <Card className="border-emerald-200/80 shadow-md relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white">
        {/* Header Ribbon */}
        <div className="bg-emerald-800 px-6 py-2.5 text-white flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>{t('procure.confirmed_appointment', 'CONFIRMED APMC MANDI APPOINTMENT')}</span>
          </div>
          <span className="font-mono text-emerald-100 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-700/50">
            {t('procure.token_label', 'Token')} {slot.tokenNumber}
          </span>
        </div>

        <CardHeader className="pb-3 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-xl sm:text-2xl text-emerald-950 font-black flex items-center gap-2">
                <Wheat className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{slot.commodityName}</span>
              </CardTitle>
              <CardDescription className="mt-0.5 flex items-center gap-1.5 font-medium text-slate-600">
                <span>{slot.variety}</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">{slot.quantityQuintals} {t('procure.booked_qtl', 'Quintals Booked')}</span>
              </CardDescription>
            </div>
            <Badge variant="success" size="md" dot>
              {t('procure.slot_verified', 'Slot Active & Verified')}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          {/* Key Timing & Center Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            {/* Slot Time */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">{t('procure.scheduled_time', 'Scheduled Date & Time')}</p>
                <p className="text-sm font-bold text-slate-900">{slot.date}</p>
                <p className="text-xs font-semibold text-emerald-700">{slot.timeSlot}</p>
              </div>
            </div>

            {/* Procurement Center */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium text-slate-500">{t('procure.designated_hub', 'Designated Mandi Hub')}</p>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-200/60 text-amber-900 rounded">
                    {slot.centerDistanceKm} {t('procure.km_away', 'km away')}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 truncate">{slot.centerName}</p>
                <p className="text-xs text-slate-500 truncate">{slot.centerLocation}</p>
              </div>
            </div>
          </div>

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-1">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">{t('procure.commodity', 'Commodity')}</span>
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
                <Wheat className="w-3.5 h-3.5 text-amber-600" /> {slot.commodityName}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[11px]">{t('procure.quantity', 'Quantity')}</span>
              <span className="font-bold text-slate-800 text-xs block mt-0.5">
                {slot.quantityQuintals} {t('common.quintals', 'Quintals')}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[11px]">{t('procure.reporting_window', 'Reporting Window')}</span>
              <span className="font-bold text-emerald-800 text-xs block mt-0.5">
                {slot.date}, {slot.timeSlot}
              </span>
            </div>
          </div>

          {/* Real-time Live Queue Bar */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-emerald-950 text-xs">
                  {t('procure.live_gate_status', 'Live Gate Status: 4 Farmers Ahead in Queue')}
                </p>
                <p className="text-[11px] text-emerald-800">
                  {t('procure.now_serving', 'Now Serving:')} <span className="font-mono font-bold text-emerald-950">TK-8838</span> • {t('procure.est_wait', 'Est. Wait:')} ~{slot.estimatedWaitMinutes} {t('procure.mins', 'mins')}
                </p>
              </div>
            </div>

            <Link
              href="/procurement/queue"
              className="inline-flex items-center justify-center font-bold text-xs px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition select-none shadow-xs whitespace-nowrap cursor-pointer"
            >
              {t('procure.track_queue', 'Track Live Queue →')}
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex-col sm:flex-row gap-2 bg-emerald-50/40 border-t border-emerald-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5 w-full sm:w-auto">
            <Truck className="w-4 h-4 text-slate-400" />
            <span>{t('procure.show_qr_hint', 'Show QR digital pass at Mandi Gate 2')}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://maps.google.com/?q=Karnal+Central+APMC+Mandi', '_blank')}
            >
              {t('procure.mandi_route', 'Mandi Route')}
            </Button>
            <Link
              href="/procurement/token/KS-HR-20261029-0042"
              className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition select-none shadow-xs gap-1.5 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('procure.view_qr', 'View Digital Pass & QR')}</span>
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* QR Digital Pass Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center relative animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Government Mandi E-Token</h3>
            <p className="text-xs text-slate-500 mt-1">
              Token ID: <span className="font-mono font-bold text-slate-800">{slot.tokenNumber}</span>
            </p>

            {/* Mock QR graphic */}
            <div className="my-4 p-3.5 bg-slate-50 rounded-2xl inline-block border-2 border-dashed border-emerald-400">
              <div className="w-40 h-40 bg-white p-3 rounded-xl shadow-inner flex flex-col items-center justify-center">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-emerald-950 rounded-lg">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-emerald-900'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Farmer:</span>
                <span className="font-bold text-slate-900">Ramesh S. Choudhary</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Commodity:</span>
                <span className="font-bold text-slate-900">{slot.commodityName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Booked Weight:</span>
                <span className="font-bold text-emerald-700">{slot.quantityQuintals} Qtl (14,000 Kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Appointment Slot:</span>
                <span className="font-bold text-slate-900">{slot.date} ({slot.timeSlot})</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => setShowQRModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="flex-1 text-xs"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                onClick={() => {
                  alert('E-Token pass downloaded to gallery/PDF!');
                  setShowQRModal(false);
                }}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Live Queue Tracker Modal */}
      {showQueueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-left relative animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Live Mandi Queue Tracker</h3>
                  <p className="text-[11px] text-slate-500">{slot.centerName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowQueueModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Queue Status Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50/40 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Your Token</span>
                  <p className="text-2xl font-black font-mono text-emerald-950">{slot.tokenNumber}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Position: #5 in current slot</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Now Serving</span>
                  <p className="text-2xl font-black font-mono text-amber-600 animate-pulse">TK-8838</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">4 Farmers Ahead</p>
                </div>
              </div>

              {/* Progress Flow */}
              <div className="space-y-2">
                <p className="font-bold text-slate-700">Queue Sequence</p>
                <div className="space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-slate-400">
                    <span>Token TK-8837 (Suresh Patel)</span>
                    <span className="font-semibold text-emerald-700">Weighing Completed ✓</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between text-amber-900 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      Token TK-8838 (Gurmeet Singh)
                    </span>
                    <span className="text-[11px] bg-amber-200 px-2 py-0.5 rounded">At Electronic Scale</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-slate-600">
                    <span>Token TK-8839</span>
                    <span>Waiting in Yard</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-slate-600">
                    <span>Token TK-8840</span>
                    <span>Waiting in Yard</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-between text-emerald-950 font-bold">
                    <span>Token TK-8842 (Your Turn)</span>
                    <span className="text-[11px] text-emerald-700">~15 mins remaining</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-slate-500 text-[11px]">
                💡 <strong>Tip:</strong> An SMS buzzer will be sent to <strong>+91 98765 43210</strong> when 1 farmer is ahead. Please remain near Gate 2.
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Button
                variant="primary"
                className="w-full text-xs"
                onClick={() => setShowQueueModal(false)}
              >
                Close Queue Monitor
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
