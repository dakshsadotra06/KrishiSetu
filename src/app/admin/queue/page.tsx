'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Scale, 
  ArrowLeft, 
  Volume2, 
  Printer, 
  PauseCircle, 
  AlertOctagon, 
  Radio
} from 'lucide-react';
import { AdminPortalLayout } from '@/components/layout/AdminPortalLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function AdminWeighbridgeCommandPage() {
  const [selectedMandi, setSelectedMandi] = useState('karnal-02');
  const [activeToken] = useState({
    token: 'TK-8838',
    farmer: 'Ram Kishan Choudhary',
    commodity: 'Wheat (Sharbati A-Grade)',
    grossKg: 12420,
    tareKg: 4200,
    netKg: 8220,
  });

  const [nextFarmer] = useState({
    token: 'TK-8839',
    farmer: 'Balvinder Singh Gill',
    commodity: 'Mustard (Pusa-25)',
    quantity: '80 Qtl',
  });

  const [announcementMsg, setAnnouncementMsg] = useState<string | null>(null);

  const [queueRows, setQueueRows] = useState([
    {
      token: 'TK-8838',
      pos: 1,
      farmer: 'Ram Kishan',
      phone: '+91 98120 44123',
      commodity: 'Wheat',
      qty: '120 Qtl',
      vehicle: 'HR-05-AB-4412',
      arrival: '09:12 AM',
      status: 'AT_WEIGHBRIDGE' as const,
    },
    {
      token: 'TK-8839',
      pos: 2,
      farmer: 'Balvinder Singh',
      phone: '+91 98765 11200',
      commodity: 'Mustard',
      qty: '80 Qtl',
      vehicle: 'HR-05-C-9921',
      arrival: '09:25 AM',
      status: 'NEXT_AT_GATE' as const,
    },
    {
      token: 'TK-8840',
      pos: 3,
      farmer: 'Ramesh Kumar',
      phone: '+91 94160 88214',
      commodity: 'Basmati Paddy',
      qty: '150 Qtl',
      vehicle: 'PB-10-BX-3341',
      arrival: '09:30 AM',
      status: 'IN_WAITING_YARD' as const,
    },
    {
      token: 'TK-8841',
      pos: 4,
      farmer: 'Sukhdev Singh',
      phone: '+91 98960 55198',
      commodity: 'Wheat',
      qty: '95 Qtl',
      vehicle: 'HR-05-T-1188',
      arrival: '09:38 AM',
      status: 'GATE_CHECKIN' as const,
    },
    {
      token: 'TK-8842',
      pos: 5,
      farmer: 'Ramesh Shankar (Demo)',
      phone: '+91 98765 43210',
      commodity: 'Wheat',
      qty: '120 Qtl',
      vehicle: 'HR-05-AG-9921',
      arrival: 'Pending',
      status: 'EN_ROUTE' as const,
    },
  ]);

  const handleCallNextFarmer = () => {
    setAnnouncementMsg(
      `📢 LOUDSPEAKER & SMS CHIME: "Token ${nextFarmer.token}, ${nextFarmer.farmer}, please proceed to Weighbridge Scale Bay 2 immediately."`
    );
    // Shift queue simulation
    setQueueRows((prev) =>
      prev.map((r) => {
        if (r.token === nextFarmer.token) {
          return { ...r, status: 'AT_WEIGHBRIDGE' };
        }
        if (r.token === activeToken.token) {
          return { ...r, status: 'NEXT_AT_GATE' };
        }
        return r;
      })
    );
  };

  const handlePrintSlip = () => {
    alert(`Weighment Slip #WS-HR-${activeToken.token} printed to thermal terminal at Bay 2.`);
  };

  return (
    <AdminPortalLayout>
      <div className="space-y-6">
        {/* Top Title & Center Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Live Weighbridge Command Console (Screen A3)
              </h1>
              <p className="text-xs text-slate-400">
                Gate 2 Electronic Pit Scale Telemetry • Token Queue Orchestrator
              </p>
            </div>
          </div>

          {/* Mandi Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Selected Station:</span>
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-400 focus:outline-emerald-500"
            >
              <option value="karnal-02">Karnal Central APMC — Gate 2 (GT Road)</option>
              <option value="taraori-01">Taraori Grain Mandi — Bay 1</option>
              <option value="panipat-03">Panipat Sector 25 APMC — Scale 3</option>
            </select>
          </div>
        </div>

        {/* Live Announcement Banner */}
        {announcementMsg && (
          <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-700 text-amber-300 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{announcementMsg}</span>
            </div>
            <button onClick={() => setAnnouncementMsg(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* Live Scale Controller Station (Hero Card) */}
        <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-emerald-500/60 shadow-xl text-slate-200">
          <CardHeader className="pb-3 border-b border-slate-700 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Active Electronic Pit Scale — Scale Bay #2 Telemetry</span>
            </CardTitle>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">DIGITAL SENSOR LIVE</span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Digital Indicator Readout */}
              <div className="bg-black/90 p-5 rounded-2xl border border-emerald-900 shadow-inner text-center space-y-1">
                <span className="text-[11px] font-bold text-emerald-500 tracking-wider uppercase block">
                  DIGITAL PIT WEIGHT INDICATOR
                </span>
                <p className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                  {activeToken.grossKg.toLocaleString('en-IN')} <span className="text-xl">KG</span>
                </p>
                <div className="flex justify-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                  <span>Gross: {activeToken.grossKg} kg</span>
                  <span>Tare: {activeToken.tareKg} kg</span>
                  <span className="text-emerald-300 font-bold">Net: {activeToken.netKg} kg</span>
                </div>
              </div>

              {/* Current Active Farmer */}
              <div className="space-y-2 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">On Weighbridge Platform</span>
                  <span className="text-xs font-black text-emerald-400 font-mono">{activeToken.token}</span>
                </div>
                <p className="text-base font-bold text-white">{activeToken.farmer}</p>
                <p className="text-xs text-slate-300">{activeToken.commodity}</p>
                <span className="inline-block text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Weighment Complete • Moisture Assay 11.8% (Grade A)
                </span>
              </div>

              {/* Immediate Next in Line */}
              <div className="space-y-2 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Immediate Next at Gate</span>
                  <span className="text-xs font-black text-amber-400 font-mono">{nextFarmer.token}</span>
                </div>
                <p className="text-base font-bold text-white">{nextFarmer.farmer}</p>
                <p className="text-xs text-slate-300">{nextFarmer.commodity} • {nextFarmer.quantity}</p>
                <span className="inline-block text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Waiting at Boom Barrier Gate
                </span>
              </div>
            </div>

            {/* Operator Control Actions */}
            <div className="pt-2 border-t border-slate-700 flex flex-wrap gap-2.5 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Volume2 className="w-4 h-4" />}
                  onClick={handleCallNextFarmer}
                >
                  Call Next Farmer ({nextFarmer.token})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Printer className="w-4 h-4" />}
                  onClick={handlePrintSlip}
                >
                  Verify & Print Weighment Slip
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<PauseCircle className="w-3.5 h-3.5 text-amber-400" />}
                  onClick={() => alert('Scale calibration initiated. Queue paused for 3 minutes.')}
                >
                  Pause Scale Calibration
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<AlertOctagon className="w-3.5 h-3.5" />}
                  onClick={() => alert('Gate hold triggered. Boom barrier locked.')}
                >
                  Gate Hold
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* High-Density Live Queue Data Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Live Electronic Gate Queue (High Density Telemetry)</span>
            </h2>
            <span className="text-xs text-slate-400">
              Avg processing turnaround: <strong>14 mins per truck</strong>
            </span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-700 text-[11px] uppercase tracking-wider">
                    <th className="p-3 font-bold">Pos</th>
                    <th className="p-3 font-bold">Token #</th>
                    <th className="p-3 font-bold">Farmer Name</th>
                    <th className="p-3 font-bold">Contact</th>
                    <th className="p-3 font-bold">Commodity</th>
                    <th className="p-3 font-bold">Quantity</th>
                    <th className="p-3 font-bold">Vehicle No.</th>
                    <th className="p-3 font-bold">Gate Time</th>
                    <th className="p-3 font-bold">Status</th>
                    <th className="p-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-mono">
                  {queueRows.map((row) => (
                    <tr key={row.token} className="hover:bg-slate-700/40 transition font-sans">
                      <td className="p-3 font-bold text-slate-400 font-mono">#{row.pos}</td>
                      <td className="p-3 font-bold text-emerald-400 font-mono">{row.token}</td>
                      <td className="p-3 font-bold text-white">{row.farmer}</td>
                      <td className="p-3 text-slate-400 font-mono text-[11px]">{row.phone}</td>
                      <td className="p-3 text-slate-300">{row.commodity}</td>
                      <td className="p-3 font-bold text-white font-mono">{row.qty}</td>
                      <td className="p-3 text-slate-300 font-mono text-[11px]">{row.vehicle}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{row.arrival}</td>
                      <td className="p-3">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            row.status === 'AT_WEIGHBRIDGE'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : row.status === 'NEXT_AT_GATE'
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : row.status === 'GATE_CHECKIN'
                              ? 'bg-sky-950 text-sky-300 border-sky-700'
                              : row.status === 'IN_WAITING_YARD'
                              ? 'bg-purple-950 text-purple-300 border-purple-700'
                              : 'bg-slate-900 text-slate-400 border-slate-700'
                          }`}
                        >
                          {row.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => alert(`Announced Token ${row.token} to speaker bay.`)}
                          className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                        >
                          Buzz →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminPortalLayout>
  );
}
