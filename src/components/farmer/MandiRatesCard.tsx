'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus, Scale } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { mockMandiRates } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

export function MandiRatesCard() {
  const { t } = useLanguage();

  return (
    <Card className="border-slate-200/90 shadow-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <CardTitle className="text-lg text-slate-900 font-bold">
              {t('rates.title', "Today's Mandi Benchmark Rates")}
            </CardTitle>
          </div>
          <CardDescription className="mt-1">
            {t('rates.subtitle', 'Real-time government MSP vs APMC Mandi modal prices across Haryana & Punjab')}
          </CardDescription>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {t('rates.live_today', 'Live Today')}
        </span>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {mockMandiRates.map((rate) => {
            const isUp = rate.trend === 'UP';
            const isDown = rate.trend === 'DOWN';

            return (
              <div
                key={rate.commodity}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{rate.commodity}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                        isUp
                          ? 'bg-emerald-100 text-emerald-800'
                          : isDown
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : isDown ? <TrendingDown className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                      {rate.changePercent}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{rate.variety} • {rate.mandiName}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t('rates.modal_rate', 'Modal Mandi Rate')}</span>
                    <span className="text-base font-extrabold text-emerald-800">
                      ₹{rate.modalPrice.toLocaleString('en-IN')}<span className="text-[11px] font-normal text-slate-500">/{t('common.qtl', 'Qtl')}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{t('rates.govt_msp', 'Govt MSP')}</span>
                    <span className="text-xs font-semibold text-slate-700">
                      ₹{rate.mspPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
