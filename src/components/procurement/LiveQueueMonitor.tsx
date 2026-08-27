'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Clock, 
  Volume2, 
  ArrowLeft, 
  RotateCw, 
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockCurrentDigitalToken } from '@/data/mockData';

export function LiveQueueMonitor() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const token = mockCurrentDigitalToken;
  const currentServing = 'TK-8838';
  const farmersAhead = token.farmersAhead;
  const waitMinutes = farmersAhead * 8; // Approved N x 8 mins algorithm

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handlePlayAudio = () => {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 3000);
  };

  const queueItems = [
    {
      token: 'TK-8838',
      farmer: 'Gurmeet Singh',
      crop: 'Wheat HD-2967 (160 Qtl)',
      vehicle: 'Tractor (PB-02-X-9941)',
      location: 'Unloading at Bay 2',
      status: 'active',
      badge: 'At Weighbridge Scale',
    },
    {
      token: 'TK-8839',
      farmer: 'Harbans Lal',
      crop: 'Basmati Paddy (90 Qtl)',
      vehicle: 'Trolley (HR-05-C-2210)',
      location: 'Weighing on Scale A',
      status: 'waiting',
      badge: 'Moisture Tested (11.4%)',
    },
    {
      token: 'TK-8840',
      farmer: 'Devinder Kumar',
      crop: 'Mustard (45 Qtl)',
      vehicle: 'Mini Truck (HR-45-A-0199)',
      location: 'Holding Area Yard 2',
      status: 'waiting',
      badge: 'In Waiting Yard',
    },
    {
      token: 'TK-8841',
      farmer: 'Baljeet Kaur',
      crop: 'Wheat (120 Qtl)',
      vehicle: 'Tractor (HR-06-B-8831)',
      location: 'Gate 2 Security Barrier',
      status: 'waiting',
      badge: 'Arrived at Gate 2',
    },
    {
      token: token.tokenNumber,
      farmer: `${token.farmerName} (YOU)`,
      crop: `${token.commodityName} (${token.quantityQuintals} Qtl)`,
      vehicle: token.vehicleType,
      location: 'Scheduled for Next Batch',
      status: 'user',
      badge: 'Your Appointment Turn',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Controls & Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/procurement"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {token.centerName}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{token.gateNumber} • Live Sensor Feeds</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />}
            onClick={handleRefresh}
          >
            Refresh Feed
          </Button>
          <Badge variant="emerald" size="md">
            Gate 2: Active Flow
          </Badge>
        </div>
      </div>

      {/* Hero Queue Banner */}
      <Card className="border-amber-300 shadow-md bg-gradient-to-br from-white via-amber-50/20 to-emerald-50/30 overflow-hidden">
        <div className="bg-amber-500 text-slate-950 px-6 py-2 flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>REAL-TIME MANDI WEIGHBRIDGE QUEUE</span>
          </div>
          <span className="font-mono bg-amber-600/30 px-2 py-0.5 rounded">
            Auto-Sync Every 15s
          </span>
        </div>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* User Token Box */}
            <div className="p-4 rounded-2xl bg-white border-2 border-emerald-500 shadow-xs text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                YOUR REGISTERED TOKEN
              </span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-950">
                {token.tokenNumber}
              </p>
              <p className="text-xs text-emerald-700 font-semibold">
                Slot: {token.timeSlot} • Gate 2
              </p>
            </div>

            {/* Now Serving Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400 text-center space-y-1">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                CURRENTLY SERVING AT WEIGHBRIDGE
              </span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-amber-700 animate-pulse">
                {currentServing}
              </p>
              <p className="text-xs text-amber-900 font-semibold">
                Bay 2 Electronic Scale • Gross Weighment
              </p>
            </div>
          </div>

          {/* Graphical Queue Stepper */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Queue Sequence Progress</span>
              <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                4 Farmers Ahead
              </span>
            </div>

            {/* Stepper bubbles */}
            <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold border border-amber-600">
                <span className="block font-mono text-xs">#038</span>
                <span className="text-[9px] block truncate">At Scale</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold">
                <span className="block font-mono text-xs">#039</span>
                <span className="text-[9px] block truncate">Yard</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold">
                <span className="block font-mono text-xs">#040</span>
                <span className="text-[9px] block truncate">Yard</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold">
                <span className="block font-mono text-xs">#041</span>
                <span className="text-[9px] block truncate">Gate In</span>
              </div>
              <div className="p-2 rounded-xl bg-emerald-600 text-white font-bold border border-emerald-700 ring-2 ring-emerald-400">
                <span className="block font-mono text-xs">#042 (YOU)</span>
                <span className="text-[9px] block truncate">Your Turn</span>
              </div>
            </div>

            {/* Turnaround Estimate */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Estimated Wait: <strong>~{waitMinutes} minutes</strong> (Avg 8 mins / farmer)
              </span>
              <span className="text-emerald-700 font-bold">
                Status: Safe to arrive at Gate 2
              </span>
            </div>
          </div>

          {/* Audio Chime Simulation */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Volume2 className={`w-4 h-4 ${audioPlaying ? 'animate-bounce' : ''}`} />
              </div>
              <div>
                <p className="font-bold text-emerald-950">
                  Mandi Yard Public Address System (ध्वनि उद्घोषणा)
                </p>
                <p className="text-[11px] text-emerald-800">
                  {audioPlaying ? '🔊 "टोकन 38 का वजन चालू है, टोकन 39 गेट नंबर 2 पर तैयार रहें..."' : 'Tap button to hear live yard voice announcement'}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-xs whitespace-nowrap bg-white hover:bg-emerald-100"
              onClick={handlePlayAudio}
            >
              {audioPlaying ? 'Playing Audio...' : 'Play Yard Chime'}
            </Button>
          </div>

          {/* Detailed Inflow Queue Sequence Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Current Yard Activity Feed
            </h3>
            <div className="space-y-2">
              {queueItems.map((item) => (
                <div
                  key={item.token}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition ${
                    item.status === 'active'
                      ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-300'
                      : item.status === 'user'
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-black text-xs px-2 py-1 rounded-lg ${
                        item.status === 'active'
                          ? 'bg-amber-500 text-slate-950'
                          : item.status === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.token}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{item.farmer}</p>
                      <p className="text-[11px] text-slate-500">{item.crop} • {item.vehicle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-between sm:justify-end">
                    <span className="text-slate-600 text-[11px]">{item.location}</span>
                    <Badge
                      variant={item.status === 'active' ? 'amber' : item.status === 'user' ? 'success' : 'neutral'}
                      size="sm"
                    >
                      {item.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Automated SMS alerts sent to <strong>{token.farmerPhone}</strong> when your position reaches #1.
          </span>
          <Link href="/procurement">
            <span className="text-emerald-700 font-bold hover:underline cursor-pointer">
              Back to Centers
            </span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
