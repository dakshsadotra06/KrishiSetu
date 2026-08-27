'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Truck, 
  ArrowLeft, 
  Camera, 
  CheckCircle2
} from 'lucide-react';
import { FarmerPortalLayout } from '@/components/layout/FarmerPortalLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockOrders } from '@/data/mockData';

export default function OrderDispatchEvidencePage() {
  const router = useRouter();
  const params = useParams();
  const orderId = (params?.id as string) || 'order-89410';

  const order = mockOrders.find((o) => o.id === orderId) || mockOrders[0];

  const [weightQuintals, setWeightQuintals] = useState('25.20');
  const [cratesCount, setCratesCount] = useState('102');
  const [vehicleNumber, setVehicleNumber] = useState('MH-15-EG-8812');
  const [driverPhone, setDriverPhone] = useState('+91 98221 55443');
  const [transportMode, setTransportMode] = useState('BUYER_TRUCK');
  const [driverAcknowledged, setDriverAcknowledged] = useState(true);
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPhoto = () => {
    setPhotos((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    ]);
  };

  const handleSubmitDispatch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/orders/${order.id}/inspection`);
    }, 900);
  };

  return (
    <FarmerPortalLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/orders/${order.id}`}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Confirm Dispatch & Loading Evidence
              </h1>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} • {order.cropTitle}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
            30% Escrow Funded
          </span>
        </div>

        {/* Form Card */}
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-300" />
              <span>Step 3: Farm Dispatch & Gate Pass Details</span>
            </CardTitle>
            <p className="text-xs text-emerald-200">
              Record verified weight and attach loading photos to protect against transit loss disputes
            </p>
          </CardHeader>

          <CardContent className="p-6 space-y-5 text-xs">
            {/* Weight and Crates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">
                  Final Loaded Weight (Quintals) *
                </label>
                <input
                  type="text"
                  value={weightQuintals}
                  onChange={(e) => setWeightQuintals(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-black text-slate-900 focus:outline-emerald-600"
                />
                <span className="text-[10px] text-slate-400">Contract Target: {order.quantityQuintals} Quintals</span>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">
                  Crates / Bags Count (क्रैट्स संख्या) *
                </label>
                <input
                  type="text"
                  value={cratesCount}
                  onChange={(e) => setCratesCount(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-black text-slate-900 focus:outline-emerald-600"
                />
                <span className="text-[10px] text-slate-400">Plastic agricultural crates</span>
              </div>
            </div>

            {/* Transport Mode & Vehicle Details */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">
                  Transport Arrangement (वाहन व्यवस्था)
                </label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white font-semibold"
                >
                  <option value="BUYER_TRUCK">Buyer Arranged Logistics Truck (खरीदार की गाड़ी)</option>
                  <option value="FARMER_TRACTOR">Farmer Tractor-Trolley (किसान का ट्रैक्टर)</option>
                  <option value="THIRD_PARTY_TEMPO">Third-Party Commercial Tempo (किराये का टेम्पो)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Vehicle Plate Number (गाड़ी नंबर) *</label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white font-mono uppercase font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Driver Mobile Contact (ड्राइवर फोन) *</label>
                  <input
                    type="text"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Photo Evidence Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-800 block">
                  Upload Loading Evidence Photos (लोडिंग फोटो व पर्ची) *
                </label>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  {photos.length} Photos Attached
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photos.map((src, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative group aspect-video"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Loading Evidence ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {index === 0 ? 'Loaded Truck' : index === 1 ? 'Weighbridge Slip' : 'Seal / Gate'}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/40 p-3 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-700 transition aspect-video cursor-pointer"
                >
                  <Camera className="w-5 h-5 mb-1 text-slate-400" />
                  <span className="font-bold text-[11px]">Add Weigh Slip</span>
                  <span className="text-[9px] text-slate-400">or Loading Photo</span>
                </button>
              </div>
            </div>

            {/* Driver Acknowledgment Checkbox */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-slate-700 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={driverAcknowledged}
                  onChange={(e) => setDriverAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-[11px] leading-relaxed">
                  <strong>Driver Verification Captured:</strong> Driver Mohan Lal inspected the {cratesCount} crates, verified seal tags, and acknowledged physical custody of produce.
                </span>
              </label>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <Link
              href={`/orders/${order.id}`}
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>

            <Button
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              disabled={!driverAcknowledged}
              leftIcon={<Truck className="w-4 h-4" />}
              onClick={handleSubmitDispatch}
            >
              Mark as Dispatched (गाड़ी रवाना करें)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </FarmerPortalLayout>
  );
}
