'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CalendarClock, 
  Building2, 
  Wheat, 
  Truck, 
  AlertCircle, 
  ShieldCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProcurementCenters, mockSlotOptions } from '@/data/mockData';

interface SlotBookingFormProps {
  initialCenterId?: string;
}

export function SlotBookingForm({ initialCenterId }: SlotBookingFormProps) {
  const router = useRouter();

  const [selectedCenterId, setSelectedCenterId] = useState(
    initialCenterId || mockProcurementCenters[0].id
  );
  const [selectedDate, setSelectedDate] = useState('2026-10-29');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-opt-2');
  const [commodity, setCommodity] = useState('Wheat (Sharbati A-Grade)');
  const [quantityQuintals, setQuantityQuintals] = useState(120);
  const [vehicleType, setVehicleType] = useState('Tractor-Trolley (ट्रैक्टर ट्रॉली)');
  const [vehicleNumber, setVehicleNumber] = useState('HR-05-AB-4412');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCenter = mockProcurementCenters.find((c) => c.id === selectedCenterId) || mockProcurementCenters[0];
  const selectedSlot = mockSlotOptions.find((s) => s.id === selectedSlotId) || mockSlotOptions[1];

  const requestedKg = quantityQuintals * 100;
  const isOverCapacity = selectedSlot.status === 'FULL' || (selectedSlot.bookedWeightKg + requestedKg > selectedSlot.maxCapacityKg);

  const dates = [
    { label: 'Tomorrow', date: '2026-10-29', display: 'Thu, 29 Oct', badge: '45 Left', variant: 'success' as const },
    { label: 'Day After', date: '2026-10-30', display: 'Fri, 30 Oct', badge: '62 Left', variant: 'success' as const },
    { label: 'Saturday', date: '2026-10-31', display: 'Sat, 31 Oct', badge: '8 Left', variant: 'warning' as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverCapacity) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to the digital token pass screen
      router.push('/procurement/token/KS-HR-20261029-0042');
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <Card className="border-emerald-200/90 shadow-md">
        <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <CardTitle className="text-lg text-white font-bold">
                APMC Mandi Slot Reservation
              </CardTitle>
              <CardDescription className="text-xs text-emerald-100/90">
                Book a guaranteed 2-hour unloading window with automated electronic weighment
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-5 text-xs">
          {/* Step 1: Procurement Center Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>1. Designated Procurement Mandi</span>
            </label>
            <select
              value={selectedCenterId}
              onChange={(e) => setSelectedCenterId(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-emerald-600 font-medium text-slate-800"
            >
              {mockProcurementCenters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.distanceKm} km away ({c.status === 'OPEN' ? '🟢 Open' : '🟡 Limited'})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">
              Address: {selectedCenter.address}, {selectedCenter.district} • Operating: {selectedCenter.operatingHours}
            </p>
          </div>

          {/* Step 2: Date Picker Chips */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              2. Select Appointment Date (तारीख चुनें)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 rounded-xl border text-center transition ${
                    selectedDate === d.date
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/20 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="block text-[11px] text-slate-500">{d.label}</span>
                  <span className="text-xs font-bold block mt-0.5">{d.display}</span>
                  <span
                    className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      d.variant === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {d.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Crop and Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <Wheat className="w-3.5 h-3.5 text-emerald-600" />
                <span>3. Commodity Name</span>
              </label>
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-emerald-600"
              >
                <option value="Wheat (Sharbati A-Grade)">Wheat (Sharbati A-Grade)</option>
                <option value="Basmati Paddy (PB-1121)">Basmati Paddy (PB-1121)</option>
                <option value="Yellow Mustard (Pusa-25)">Yellow Mustard (Pusa-25)</option>
                <option value="Desi Chana (Kabuli Bold)">Desi Chana (Kabuli Bold)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                Estimated Weight (Quintals)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={quantityQuintals}
                  onChange={(e) => setQuantityQuintals(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600 font-bold text-slate-900"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">
                  = {(quantityQuintals * 100).toLocaleString('en-IN')} Kg
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: 2-Hour Time Window Radio Pills */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 block">
              4. Select Arrival Time Window (2-Hour Slot)
            </label>
            <div className="space-y-2">
              {mockSlotOptions.map((opt) => {
                const isSelected = selectedSlotId === opt.id;
                const isFull = opt.status === 'FULL';

                return (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      isFull
                        ? 'bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-500/20 font-bold'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="slot"
                        value={opt.id}
                        disabled={isFull}
                        checked={isSelected}
                        onChange={() => setSelectedSlotId(opt.id)}
                        className="text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{opt.timeWindow}</span>
                        <span className="text-[11px] text-slate-500">
                          Quota Booked: {(opt.bookedWeightKg / 1000).toFixed(1)}T / {(opt.maxCapacityKg / 1000).toFixed(0)}T
                        </span>
                      </div>
                    </div>

                    <div>
                      {isFull ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                          Slot Full (20T Max)
                        </span>
                      ) : opt.status === 'FEW_LEFT' ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          {opt.remainingSlots} Slots Left
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {opt.remainingSlots} Slots Open
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 5: Vehicle Delivery Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>5. Transport Vehicle Type</span>
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-emerald-600"
              >
                <option value="Tractor-Trolley (ट्रैक्टर ट्रॉली)">Tractor-Trolley (ट्रैक्टर ट्रॉली)</option>
                <option value="Mini Truck / Pickup (छोटा हाथी)">Mini Truck / Pickup (छोटा हाथी)</option>
                <option value="Heavy Multi-Axle Truck">Heavy Multi-Axle Truck</option>
                <option value="Bullock Cart (बैलगाड़ी)">Bullock Cart (बैलगाड़ी)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-800 block">
                Vehicle Registration Number
              </label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. HR-05-AB-4412"
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600 font-mono font-bold uppercase"
              />
            </div>
          </div>

          {/* Capacity Validation Notice */}
          {isOverCapacity && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                Selected slot cannot accommodate {quantityQuintals} Quintals. Please select another 2-hour window or reduce quantity.
              </span>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free government appointment. No middleman charges.</span>
            </div>
            <span className="font-bold text-emerald-800">MSP Guaranteed</span>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isOverCapacity || isSubmitting}
            isLoading={isSubmitting}
            leftIcon={<CalendarClock className="w-4 h-4" />}
          >
            Confirm & Generate Digital Token
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
