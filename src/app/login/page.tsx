'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sprout, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Lock 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
  const [otp, setOtp] = useState('482910');
  const [isLoading, setIsLoading] = useState(false);
  const [smsBanner, setSmsBanner] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
      setSmsBanner(true);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setMobileNumber('9876543210');
    setStep('OTP');
    setSmsBanner(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-900 flex flex-col justify-between p-4 sm:p-6 font-sans text-slate-900 selection:bg-emerald-200">
      {/* Brand Header */}
      <div className="max-w-md mx-auto w-full pt-6 text-center space-y-2">
        <Link href="/landing" className="inline-flex items-center gap-2 group">
          <div className="w-11 h-11 rounded-2xl bg-white text-emerald-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition">
            <Sprout className="w-7 h-7 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">KrishiSetu</span>
        </Link>
        <p className="text-xs text-emerald-200">
          Direct APMC Mandi Appointments & Direct Escrow Marketplace
        </p>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto py-4 space-y-4">
        {/* SMS Notification Simulation Banner */}
        {smsBanner && (
          <div className="p-3.5 rounded-2xl bg-white shadow-xl border-2 border-emerald-400 text-xs space-y-1 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between text-emerald-800 font-bold">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>SMS Notification Preview (Simulated)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Just now</span>
            </div>
            <p className="text-slate-800 text-[11px] leading-relaxed">
              [VM-KRISHI]: Your KrishiSetu login OTP is <strong className="font-mono font-black text-emerald-700 text-xs">482910</strong>. Valid for 10 minutes. Do not share this OTP with anyone.
            </p>
          </div>
        )}

        <Card className="border-emerald-300/40 shadow-2xl bg-white overflow-hidden rounded-3xl">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-white">
                  {step === 'MOBILE' ? 'Farmer Login' : 'Enter 6-Digit OTP'}
                </CardTitle>
                <p className="text-xs text-emerald-200 mt-0.5">
                  {step === 'MOBILE'
                    ? 'Enter your PM-Kisan registered mobile number'
                    : `SMS sent to +91 ${mobileNumber}`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                {step === 'MOBILE' ? (
                  <Phone className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Lock className="w-5 h-5 text-emerald-300" />
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4 text-xs">
            {step === 'MOBILE' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block text-xs">
                    Mobile Number (मोबाइल नंबर) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="98765 43210"
                      required
                      className="w-full border border-slate-300 rounded-xl pl-12 pr-3.5 py-2.5 text-sm font-bold text-slate-900 tracking-wider focus:outline-emerald-600"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Linked to your Aadhaar / PM-Kisan DBT account
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full text-xs font-bold py-3"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Send OTP (ओटीपी प्राप्त करें)
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800 block text-xs">
                      6-Digit SMS OTP *
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep('MOBILE')}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border-2 border-emerald-500 rounded-xl px-4 py-2.5 text-center text-xl font-mono font-black tracking-widest text-slate-900 focus:outline-emerald-600 bg-emerald-50/40"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Auto-filled for demo: 482910</span>
                    <span className="text-emerald-700 font-bold">Resend OTP (45s)</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full text-xs font-bold py-3"
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Verify & Access Dashboard
                </Button>
              </form>
            )}

            {/* Quick Demo Login Preset Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-left transition flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center font-bold text-xs">
                    🌾
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Quick Demo Login (एक क्लिक लॉगिन)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Ramesh Shankar Choudhary (Kisan ID: HR-KRN-2026-9814)
                    </span>
                  </div>
                </div>
                <Sparkles className="w-4 h-4 text-amber-600 group-hover:scale-110 transition" />
              </button>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 text-center justify-center text-xs">
            <span className="text-slate-500">
              New to KrishiSetu?{' '}
              <Link href="/register" className="font-bold text-emerald-700 hover:underline">
                Register as a Farmer →
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-emerald-200/70 text-[11px] py-3">
        © 2026 KrishiSetu. Verified by Ministry of Agriculture & Farmers Welfare.
      </div>
    </div>
  );
}
