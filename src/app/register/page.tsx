'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  Banknote, 
  User, 
  ArrowRight, 
  ArrowLeft,
  UploadCloud
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('Suresh Kumar Verma');
  const [mobileNumber, setMobileNumber] = useState('9812345678');
  const [stateName, setStateName] = useState('Haryana');
  const [district, setDistrict] = useState('Karnal');
  const [landAcres, setLandAcres] = useState('6.5');
  const [kisanId, setKisanId] = useState('HR-KRN-2026-4421');

  // Step 2: Bank details
  const [bankName, setBankName] = useState('Punjab National Bank');
  const [accountNumber, setAccountNumber] = useState('4421001500089211');
  const [ifscCode, setIfscCode] = useState('PUNB0442100');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans text-slate-900 selection:bg-emerald-200">
      {/* Top Brand Nav */}
      <div className="max-w-xl mx-auto w-full pt-4 pb-2 text-center space-y-1">
        <Link href="/landing" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">KrishiSetu</span>
        </Link>
        <p className="text-xs text-slate-500">
          Official Farmer Onboarding & PM-Kisan DBT Verification Portal
        </p>
      </div>

      {/* Main Registration Card */}
      <div className="max-w-xl mx-auto w-full my-auto py-4 space-y-4">
        {/* Step Indicator */}
        <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
            </span>
            <span className={`font-semibold ${step === 1 ? 'text-emerald-950 font-bold' : 'text-slate-500'}`}>
              Farmer Identity & Land
            </span>
          </div>

          <div className="w-8 h-0.5 bg-slate-200" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              2
            </span>
            <span className={`font-semibold ${step === 2 ? 'text-emerald-950 font-bold' : 'text-slate-500'}`}>
              Bank Account for DBT
            </span>
          </div>
        </div>

        <Card className="border-slate-200 shadow-xl overflow-hidden rounded-3xl bg-white">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 pb-4">
            <CardTitle className="text-lg font-extrabold text-white flex items-center gap-2">
              {step === 1 ? (
                <>
                  <User className="w-5 h-5 text-emerald-300" />
                  <span>Step 1: Farmer Profile & Land Holding</span>
                </>
              ) : (
                <>
                  <Banknote className="w-5 h-5 text-emerald-300" />
                  <span>Step 2: Bank Account for Instant DBT Settlements</span>
                </>
              )}
            </CardTitle>
            <p className="text-xs text-emerald-200">
              {step === 1
                ? 'Your Kisan ID is linked to official government land and MSP subsidy records'
                : 'Government MSP payouts and 70% escrow releases will be transferred directly here'}
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-4 text-xs">
            {step === 1 ? (
              <form id="step1-form" onSubmit={handleNext} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">Full Name (पूरा नाम) *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-emerald-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">Mobile Number (फोन) *</label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">State (राज्य) *</label>
                    <input
                      type="text"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-emerald-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">District / Tehsil (जिला) *</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">Land Holding (एकड़ जमीन) *</label>
                    <input
                      type="text"
                      value={landAcres}
                      onChange={(e) => setLandAcres(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-emerald-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">PM-Kisan ID / Passbook ID *</label>
                    <input
                      type="text"
                      value={kisanId}
                      onChange={(e) => setKisanId(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold uppercase focus:outline-emerald-600"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form id="step2-form" onSubmit={handleCompleteRegistration} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Bank Name (बैंक का नाम) *</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">Account Number (खाता संख्या) *</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold focus:outline-emerald-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">IFSC Code (आईएफएससी कोड) *</label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold uppercase focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <UploadCloud className="w-6 h-6 text-slate-400 mx-auto" />
                  <span className="font-bold text-slate-700 block text-xs">Passbook Photo or Cheque Leaf (Optional)</span>
                  <span className="text-[10px] text-slate-400">Accelerates KYC verification to under 15 minutes</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Your banking credentials are encrypted with 256-bit AES protection.</span>
                </div>
              </form>
            )}
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            {step === 1 ? (
              <Link href="/login" className="text-xs font-bold text-slate-600 hover:text-slate-900">
                Already registered? Login
              </Link>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
            )}

            {step === 1 ? (
              <Button
                type="submit"
                form="step1-form"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Bank Details
              </Button>
            ) : (
              <Button
                type="submit"
                form="step2-form"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Complete Registration & Launch Portal
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-400 text-[11px] py-3">
        KrishiSetu is governed under the Digital Mandi & Fair Farm Trade Guidelines 2026.
      </div>
    </div>
  );
}
