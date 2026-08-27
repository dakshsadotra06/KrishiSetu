'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  ShieldCheck, 
  CalendarClock, 
  Banknote, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Lock
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200">
      {/* Top Banner Ticker */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-bold text-emerald-300">Live APMC Benchmark MSP:</span>
            <span className="truncate">Wheat ₹2,275/Qtl • Basmati Paddy ₹3,725/Qtl • Mustard ₹5,650/Qtl</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-emerald-300">
            <span>Mandi Toll-Free: 1800-KRISHI-SETU</span>
            <span>•</span>
            <span className="text-white font-semibold">Government of India Initiative</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent block">
                KrishiSetu
              </span>
              <span className="text-[10px] font-medium text-slate-500 -mt-1 block">
                कृषि सेतु — किसान, मंडी व खरीदार का डिजिटल संगम
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              Farmer Login (लॉगिन)
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition select-none active:scale-[0.98] gap-1.5"
            >
              <span>Register (नया पंजीकरण)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-emerald-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct Mandi Appointments & Guaranteed Escrow Bids</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Sell Your Harvest With{' '}
              <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                Zero Middlemen
              </span>{' '}
              & Guaranteed Advance Payment
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              KrishiSetu is India&apos;s dual agricultural gateway: book guaranteed electronic APMC Mandi unloading slots in 2 minutes, or accept direct bids from verified corporate buyers with 30% advance locked in digital escrow before you ship.
            </p>

            {/* CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-700/25 transition select-none active:scale-[0.98] gap-2 cursor-pointer"
              >
                <span>🌾 Launch Farmer Dashboard (डेमो देखें)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/marketplace"
                className="w-full sm:w-auto inline-flex items-center justify-center font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs transition select-none active:scale-[0.98] gap-2 cursor-pointer"
              >
                <span>🏢 Corporate Buyer Portal</span>
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Mandi Centers</span>
                <span className="text-base font-black text-slate-900">42 APMCs</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Gate Wait Time</span>
                <span className="text-base font-black text-emerald-700">&lt; 25 Mins</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Verified Buyers</span>
                <span className="text-base font-black text-slate-900">450+ Corporates</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Direct Escrow</span>
                <span className="text-base font-black text-emerald-700">100% DBT Safe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Way Platform Comparison Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Transparency First
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Indian Farmers Are Switching to KrishiSetu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Compare your options: Traditional commission agents vs. KrishiSetu Digital Mandis vs. Direct Escrow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Traditional Middleman */}
            <Card className="border-rose-200 bg-rose-50/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-rose-950">Traditional Middleman (आढ़तिया)</h3>
                <Badge variant="neutral" size="sm">Traditional</Badge>
              </div>
              <ul className="space-y-2.5 text-xs text-rose-950">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>6% to 8.5% Commission Cuts:</strong> Deducted from your payout before you receive payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>6-14 Hours Gate Queues:</strong> Trucks idle overnight at Mandi gates during peak season.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Manual Weighing Discrepancy:</strong> High risk of manual beam scale deductions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Delayed Cash Payouts:</strong> Farmers wait 15–45 days for checks to clear.</span>
                </li>
              </ul>
            </Card>

            {/* Column 2: KrishiSetu APMC Digital Pass */}
            <Card className="border-emerald-300 bg-gradient-to-b from-emerald-50/50 to-white p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-emerald-950">KrishiSetu APMC Gate Pass</h3>
                <Badge variant="emerald" size="sm">Govt APMC</Badge>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>0% Commission Fees:</strong> Official government Mandi gate pass without cutbacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed 2-Hour Slot:</strong> Digital QR token pass prioritizes entry at Gate 2.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Certified Electronic Weighment:</strong> Digital printout with moisture assay testing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Direct Benefit Transfer (DBT):</strong> Full MSP deposited directly into your bank within 2 hours.</span>
                </li>
              </ul>
              <Link
                href="/procurement"
                className="block text-center font-bold text-xs px-4 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition"
              >
                Explore APMC Mandis →
              </Link>
            </Card>

            {/* Column 3: KrishiSetu Direct Escrow */}
            <Card className="border-amber-300 bg-gradient-to-b from-amber-50/50 to-white p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-amber-950">KrishiSetu Direct Escrow</h3>
                <Badge variant="amber" size="sm">Direct Trade</Badge>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Competitive Direct Bids:</strong> 450+ corporate buyers (ITC, AgroStar, Adani Agri) bid directly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>30% Advance Escrow Locked:</strong> Buyer deposits 30% in secure escrow before truck arrives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Fairness Rule Guaranteed:</strong> Zero trust penalty for raising legitimate quality complaints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Farm-Gate Truck Logistics:</strong> Buyer arranges commercial truck directly to your village shed.</span>
                </li>
              </ul>
              <Link
                href="/marketplace"
                className="block text-center font-bold text-xs px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 transition"
              >
                Browse Marketplace →
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built for Modern Indian Agriculture
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Designed from the ground up for farmers, transporters, and agri-enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CalendarClock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Digital QR Token Pass</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scan your gate pass QR code at Mandi entry. Real-time queue tracker notifies you 15 minutes before your turn.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Protected Escrow Vault</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bank-backed escrow holds buyer payments safely so you never face defaults or bounced checks after dispatching goods.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Dynamic Trust Scores</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent reputation system with strict fairness rules: raising complaints is protected and incurs zero penalty.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Banknote className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Direct Bank Transfer (DBT)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant settlement via NEFT/RTGS with verified UTR numbers sent directly to your registered mobile phone via SMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-white text-xs py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">KrishiSetu (कृषि सेतु)</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Transforming Agricultural Commerce Across India</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white transition">Farmer Portal</Link>
            <Link href="/marketplace" className="hover:text-white transition">Marketplace</Link>
            <Link href="/admin/trust" className="hover:text-white transition">Admin Desk</Link>
            <Link href="/login" className="hover:text-white transition">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
