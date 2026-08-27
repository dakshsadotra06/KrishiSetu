'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  Scale, 
  Banknote, 
  ShieldCheck, 
  Building2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockRecentProcurementHistory } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export function ProcurementStatusCard() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t('status.step1_title', 'Slot Booked'),
      desc: t('status.step1_desc', 'Token TK-8842 Generated'),
      status: 'completed',
      time: 'Oct 27, 04:15 PM',
      icon: CheckCircle2,
    },
    {
      title: t('status.step2_title', 'Queue Ready'),
      desc: t('status.step2_desc', 'Estimated Gate: 09:30 AM'),
      status: 'active',
      time: 'Gate 2 Inflow Normal',
      icon: Clock,
    },
    {
      title: t('status.step3_title', 'Weigh & Assay'),
      desc: t('status.step3_desc', 'Govt e-Weighbridge QC'),
      status: 'pending',
      time: 'After Gate Entry',
      icon: Scale,
    },
    {
      title: t('status.step4_title', 'Instant DBT'),
      desc: t('status.step4_desc', 'MSP Directly to Bank'),
      status: 'pending',
      time: 'Within 2 Hours',
      icon: Banknote,
    },
  ];

  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <CardTitle className="text-lg text-slate-900 font-bold">
              {t('status.title', 'Procurement & Payout Lifecycle')}
            </CardTitle>
          </div>
          <CardDescription className="mt-1">
            {t('status.subtitle', 'Tracking your live appointment through gate entry, quality assay, and DBT release')}
          </CardDescription>
        </div>
        <Badge variant="emerald" size="md">
          {t('status.badge', 'Active Lifecycle')}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {/* 4-Step Visual Progress Stepper */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600">
            <span>{t('status.progress_label', 'Progress: 2 of 4 Steps Complete')}</span>
            <span className="text-emerald-700 font-bold">{t('status.progress_percent', '50% Complete')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div
                  key={step.title}
                  className={`p-3 rounded-xl border transition-all ${
                    isCompleted
                      ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
                      : isActive
                      ? 'border-amber-400 bg-amber-50/70 text-amber-950 shadow-xs ring-1 ring-amber-300'
                      : 'border-slate-200 bg-slate-50/50 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isActive
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold">Step {idx + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">{step.title}</p>
                    <p className="text-[11px] mt-0.5 text-slate-600 line-clamp-1">{step.desc}</p>
                    <p className="text-[10px] mt-1 font-medium text-slate-500">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Past Mandi Settlements Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>Recent Mandi Settlements</span>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded text-[10px]">
                100% DBT Verified
              </span>
            </h4>
            <Link
              href="/orders"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              View History →
            </Link>
          </div>

          <div className="space-y-2">
            {mockRecentProcurementHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center font-mono font-bold text-[11px]">
                    ✓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.commodity}</span>
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {item.tokenNumber}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {item.centerName} • {item.quantity} Quintals • {item.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-emerald-700 text-sm">
                    ₹{item.amountSettled.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium flex items-center justify-end gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Transferred to Bank
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          PM-Kisan & APMC direct benefit transfer guaranteed.
        </span>
        <span className="font-semibold text-emerald-800">
          Season Mandi Total: ₹6,21,900
        </span>
      </CardFooter>
    </Card>
  );
}
