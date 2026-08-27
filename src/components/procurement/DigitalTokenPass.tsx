'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Share2, 
  Activity, 
  Truck, 
  Check, 
  Copy,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DigitalTokenPassData } from '@/types';

interface DigitalTokenPassProps {
  token: DigitalTokenPassData;
}

export function DigitalTokenPass({ token }: DigitalTokenPassProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token.tokenNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-emerald-300 shadow-xl overflow-hidden max-w-xl mx-auto bg-gradient-to-b from-white via-emerald-50/15 to-white">
      {/* Official Government Pass Ribbon */}
      <div className="bg-emerald-800 text-white p-4 text-center border-b border-emerald-900">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-300" />
          <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
            HARYANA STATE APMC • DIGITAL PROCUREMENT PASS
          </span>
        </div>
        <p className="text-[11px] text-emerald-200/90 mt-0.5">
          Government MSP Procurement E-Gate Pass (Verified Token)
        </p>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Token Hero Display */}
        <div className="text-center bg-slate-50 p-5 rounded-2xl border-2 border-emerald-100 relative">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            OFFICIAL E-TOKEN NUMBER
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-950">
              {token.tokenNumber}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
              title="Copy Token Number"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-emerald-700 font-semibold mt-1">
            Booking ID: <span className="font-mono">{token.bookingNumber}</span>
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>CONFIRMED & ACTIVE APPOINTMENT</span>
          </div>
        </div>

        {/* Mock QR Matrix */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-emerald-400 shadow-sm text-center">
            <div className="w-44 h-44 p-2.5 bg-emerald-950 rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-6 gap-1.5 w-full h-full p-2 bg-emerald-950 rounded-lg">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      i % 2 === 0 || i % 7 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                        ? 'bg-white'
                        : 'bg-emerald-900'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 mt-2 block">
              Scan at Gate 2 Weighbridge Scanner
            </span>
          </div>
        </div>

        {/* Appointment & Commodity Details Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white">
            <div className="p-3.5 space-y-1">
              <span className="text-slate-400 font-semibold block text-[11px]">Farmer</span>
              <p className="font-bold text-slate-900">{token.farmerName}</p>
              <p className="text-slate-500 text-[11px]">{token.farmerPhone}</p>
              <p className="text-emerald-700 font-mono text-[10px]">Kisan ID: {token.kisanId}</p>
            </div>

            <div className="p-3.5 space-y-1">
              <span className="text-slate-400 font-semibold block text-[11px]">Commodity</span>
              <p className="font-bold text-slate-900">{token.commodityName}</p>
              <p className="text-slate-500 text-[11px]">{token.variety}</p>
              <p className="text-emerald-700 font-bold">
                {token.quantityQuintals} Quintals ({token.bookedWeightKg.toLocaleString()} Kg)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50 border-t border-slate-200">
            <div className="p-3.5 space-y-1">
              <span className="text-slate-400 font-semibold block text-[11px]">Designated Center</span>
              <p className="font-bold text-slate-900">{token.centerName}</p>
              <p className="text-slate-500 text-[11px]">{token.centerAddress}</p>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded inline-block">
                {token.gateNumber}
              </span>
            </div>

            <div className="p-3.5 space-y-1">
              <span className="text-slate-400 font-semibold block text-[11px]">Arrival Window</span>
              <p className="font-bold text-slate-900">{token.date}</p>
              <p className="text-emerald-700 font-bold">{token.timeSlot}</p>
              <p className="text-slate-500 text-[11px] flex items-center gap-1">
                <Truck className="w-3 h-3 text-slate-400" />
                {token.vehicleType} ({token.vehicleNumber})
              </p>
            </div>
          </div>
        </div>

        {/* Live Flow Highlight */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Live Inflow Status</span>
            <p className="font-bold text-amber-950 text-sm">
              {token.farmersAhead} Farmers Ahead in Queue
            </p>
            <p className="text-amber-800 text-[11px]">
              Estimated Unload Wait: ~{token.estimatedWaitMinutes} minutes upon arrival
            </p>
          </div>

          <Link
            href="/procurement/queue"
            className="inline-flex items-center justify-center font-bold text-xs px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-xs transition select-none active:scale-[0.98] gap-1.5 cursor-pointer shrink-0"
          >
            <Activity className="w-4 h-4 text-slate-900 animate-pulse" />
            <span>Track Live Queue</span>
          </Link>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>SMS confirmation sent to {token.farmerPhone}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="w-3.5 h-3.5" />}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'KrishiSetu Mandi Gate Pass',
                  text: `My E-Token pass ${token.tokenNumber} for ${token.centerName}`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('E-Token pass link copied to clipboard!');
              }
            }}
          >
            Share Pass
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={() => {
              if (typeof window !== 'undefined') window.print();
            }}
          >
            Print / Save Pass (PDF)
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
