'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ShieldCheck, 
  Camera, 
  Mic, 
  CheckCircle2
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockOrders } from '@/data/mockData';

export default function OrderDisputePage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'order-89410';

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const [issueType, setIssueType] = useState('WEIGHT_DISCREPANCY');
  const [description, setDescription] = useState(
    'I loaded 102 crates (25.2 Qtl) with certified farm weigh slip, but buyer depot reported 23 Qtl at gate. Certified weigh slip photo attached.'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const issueOptions = [
    {
      id: 'PAYMENT_DELAY',
      title: 'Payment Delay beyond 2 hours of delivery (भुगतान में देरी)',
    },
    {
      id: 'WEIGHT_DISCREPANCY',
      title: 'Weight Discrepancy: Buyer reported lower weight (वजन में अंतर)',
    },
    {
      id: 'QUALITY_DOWNGRADE',
      title: 'Unfair Quality Downgrade by Buyer (गलत क्वालिटी कटौती)',
    },
    {
      id: 'TRUCK_DELAY',
      title: 'Buyer Truck Did Not Arrive at Agreed Time (गाड़ी समय पर नहीं आई)',
    },
  ];

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setDescription((prev) => prev + ' [Voice note added in Hindi: "मंडी धर्मकांटा की पर्ची संलग्न है, कृपया त्वरित जांच करें।"]');
    }, 1200);
  };

  const handleSubmitDispute = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/orders/${order.id}/inspection`}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Raise Dispute / Mandi Arbitration
              </h1>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} • 24x7 KrishiSetu Farmer Legal Protection
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-xl">
            Escrow Frozen
          </span>
        </div>

        {/* FAIRNESS STATUTORY ASSURANCE */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
            <h3 className="font-bold text-emerald-100">
              Fairness Rule: Raising This Complaint Will NOT Lower Your Trust Score
            </h3>
          </div>
          <p className="text-[11px] text-emerald-200/90 leading-relaxed">
            In KrishiSetu, raising a complaint is your protected right. The remaining ₹{order.deliveryBalanceAmount.toLocaleString('en-IN')} escrow balance is frozen until an independent Mandi Arbitrator examines the weighbridge record.
          </p>
        </div>

        {!submitted ? (
          <Card className="border-slate-200 shadow-md">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Select Issue Category & Evidence Details</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-5 text-xs">
              {/* Issue Selection */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 block text-xs">
                  Select Issue Type (समस्या का प्रकार चुनें) *
                </label>
                <div className="space-y-2">
                  {issueOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                        issueType === opt.id
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueType"
                        value={opt.id}
                        checked={issueType === opt.id}
                        onChange={() => setIssueType(opt.id)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{opt.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 block">
                    Describe the Problem in Your Words (समस्या का विवरण):
                  </label>
                  <button
                    type="button"
                    onClick={handleSimulateVoice}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isRecording ? 'Listening...' : 'बोलकर लिखें (Voice Input)'}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs leading-relaxed focus:outline-emerald-600 bg-white"
                />
              </div>

              {/* Photos Preview */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Upload Weighbridge Slips or Photos (धर्मकांटा पर्ची या सबूत फोटो):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
                      alt="Farm Weigh Slip"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-2 text-[10px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                      Farm Weigh Slip (25.2 Qtl)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Additional evidence photo selected')}
                    className="rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/40 p-3 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-700 transition aspect-video cursor-pointer"
                  >
                    <Camera className="w-5 h-5 mb-1 text-slate-400" />
                    <span className="font-bold text-[11px]">➕ Add More Evidence</span>
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
              <Link
                href={`/orders/${order.id}/inspection`}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Back to Inspection
              </Link>

              <Button
                variant="amber"
                size="md"
                isLoading={isSubmitting}
                leftIcon={<AlertTriangle className="w-4 h-4" />}
                onClick={handleSubmitDispute}
              >
                Submit Dispute to Mandi Arbitrator (शिकायत दर्ज करें)
              </Button>
            </CardFooter>
          </Card>
        ) : (
          /* Submission Success State */
          <Card className="border-2 border-amber-300 shadow-xl bg-white p-6 space-y-4 text-center text-xs">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Dispute Ticket #DISP-20261028-091 Logged
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
              Your claim regarding <strong>Weight Discrepancy</strong> has been assigned to Government Mandi Arbitrator <strong>Shri R. K. Deshmukh</strong>. The remaining ₹{order.deliveryBalanceAmount.toLocaleString('en-IN')} escrow balance is securely frozen.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold max-w-sm mx-auto">
              ✓ Fairness Rule Verified: Your Trust Score (92) is 100% protected.
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                href="/orders"
                className="inline-flex items-center justify-center font-bold text-xs px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                View Orders Dashboard →
              </Link>
            </div>
          </Card>
        )}
      </div>
    </FarmerPortalLayout>
  );
}
