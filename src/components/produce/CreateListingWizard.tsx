'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockFarmerProfile } from '@/data/mockData';

export function CreateListingWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('Solapur Hybrid Tomatoes (Firm Red)');
  const [category, setCategory] = useState<'Vegetables' | 'Grains' | 'Pulses' | 'Oilseeds'>('Vegetables');
  const [variety, setVariety] = useState('US-440 Desi Hybrid');
  const [quantity, setQuantity] = useState(25);
  const [unit, setUnit] = useState('Quintals');
  const [grade, setGrade] = useState('Grade A');
  const [expectedPrice, setExpectedPrice] = useState(2800);
  const [mandiBenchmark] = useState(2450);
  const [dispatchDate, setDispatchDate] = useState('Tomorrow');
  const [location, setLocation] = useState('Dindori Farm Shed, Nashik');

  // Photo State
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1546470427-227c7369a9b6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1594970425712-421711be14a9?auto=format&fit=crop&w=600&q=80',
  ]);

  const totalValue = quantity * expectedPrice;
  const advanceEscrowValue = totalValue * 0.3; // 30% advance escrow

  const handleAddMockPhoto = () => {
    if (uploadedPhotos.length < 4) {
      setUploadedPhotos([
        ...uploadedPhotos,
        'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=600&q=80'
      ]);
    }
  };

  const handleDeletePhoto = (indexToDelete: number) => {
    setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  };

  const handlePublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/produce');
    }, 900);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Wizard Progress Stepper */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
            step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </span>
          <span className={`font-semibold ${step === 1 ? 'text-emerald-950 font-bold' : 'text-slate-500'}`}>
            Crop Details
          </span>
        </div>

        <div className="w-8 sm:w-12 h-0.5 bg-slate-200" />

        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
            step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            {step > 2 ? <Check className="w-4 h-4" /> : '2'}
          </span>
          <span className={`font-semibold ${step === 2 ? 'text-emerald-950 font-bold' : 'text-slate-500'}`}>
            Photo Verification
          </span>
        </div>

        <div className="w-8 sm:w-12 h-0.5 bg-slate-200" />

        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
            step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            3
          </span>
          <span className={`font-semibold ${step === 3 ? 'text-emerald-950 font-bold' : 'text-slate-500'}`}>
            Preview & Publish
          </span>
        </div>
      </div>

      {/* STEP 1: CROP DETAILS */}
      {step === 1 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
            <CardTitle className="text-lg text-white font-bold">
              Step 1: Crop Specifications & Pricing
            </CardTitle>
            <CardDescription className="text-xs text-emerald-100/90">
              List your harvested lot for 450+ verified corporate & wholesale buyers
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label htmlFor="cropTitle" className="font-bold text-slate-800 block">
                Listing Title (शीर्षक)
              </label>
              <input
                id="cropTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600 font-semibold text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Category (श्रेणी)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'Vegetables' | 'Grains' | 'Pulses' | 'Oilseeds')}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-emerald-600"
                >
                  <option value="Vegetables">Vegetables (सब्जियां)</option>
                  <option value="Grains">Grains & Cereals (अनाज)</option>
                  <option value="Pulses">Pulses & Legumes (दालें)</option>
                  <option value="Oilseeds">Oilseeds (तिलहन)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Variety / Hybrid (किस्म)</label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Available Quantity (मात्रा)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-2/3 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600 font-bold text-slate-900"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-1/3 border border-slate-300 rounded-xl px-2 py-2.5 text-xs bg-white"
                  >
                    <option value="Quintals">Quintals</option>
                    <option value="Tons">Tons</option>
                    <option value="Crates">Crates</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Quality / Grade (गुणवत्ता)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Grade A+', 'Grade A', 'Grade B'].map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGrade(g)}
                      className={`py-2 rounded-xl border text-xs font-bold transition ${
                        grade === g
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Expected Price Input with Mandi benchmark callout */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-900">
                  Expected Price Per {unit} (अपेक्षित भाव) *
                </label>
                <span className="text-xs font-bold text-emerald-800">
                  Total Value: ₹{totalValue.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-slate-500 text-sm">₹</span>
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  className="w-full border border-amber-300 rounded-xl pl-8 pr-20 py-2.5 text-base font-extrabold focus:outline-emerald-600 text-slate-950 bg-white"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-semibold">
                  / {unit}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-amber-900 pt-1">
                <span>
                  Live Local Mandi Benchmark: <strong>₹{mandiBenchmark.toLocaleString('en-IN')}/{unit}</strong>
                </span>
                <span className="font-bold text-emerald-700">
                  +{(((expectedPrice - mandiBenchmark) / mandiBenchmark) * 100).toFixed(1)}% above Mandi
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Ready For Dispatch From</label>
                <select
                  value={dispatchDate}
                  onChange={(e) => setDispatchDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm bg-white"
                >
                  <option value="Immediate (Ready Today)">Immediate (Ready Today)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="In 2-3 Days">In 2-3 Days</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Farm Pickup Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-emerald-600"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(2)}
            >
              Continue to Photos (2/3)
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 2: PHOTO VERIFICATION */}
      {step === 2 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
            <CardTitle className="text-lg text-white font-bold">
              Step 2: Mandatory Quality Photos (फोटो सत्यापन)
            </CardTitle>
            <CardDescription className="text-xs text-emerald-100/90">
              Minimum 3 clear photos protect you from false quality claims or buyer rejections
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-5 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-emerald-950">
                  Verification Status: {uploadedPhotos.length} of 3 Required Photos Uploaded
                </span>
              </div>
              <Badge variant="emerald" size="md">
                {uploadedPhotos.length >= 3 ? 'Requirements Met' : 'Add More Photos'}
              </Badge>
            </div>

            {/* Photo Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {uploadedPhotos.map((url, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative group aspect-square"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Produce sample ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {index === 0 ? 'Bulk Heap' : index === 1 ? 'Close-up' : index === 2 ? 'Weigh/Scale' : 'Farm View'}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletePhoto(index)}
                    className="absolute top-2 right-2 bg-rose-600/90 hover:bg-rose-700 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition shadow-xs cursor-pointer z-10"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-2 right-2 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              ))}

              {uploadedPhotos.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddMockPhoto}
                  className="rounded-xl border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/40 p-4 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-700 transition aspect-square"
                >
                  <Camera className="w-6 h-6 mb-1 text-slate-400" />
                  <span className="font-bold text-[11px]">Add Photo</span>
                  <span className="text-[9px] text-slate-400">or Take Photo</span>
                </button>
              )}
            </div>

            {/* Guidelines Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-600">
              <span className="font-bold text-slate-800 block text-xs">
                📸 Photo Guidelines for Direct Marketplace Approval:
              </span>
              <ul className="space-y-1 text-[11px] list-disc list-inside">
                <li>Take photos in bright, natural daylight.</li>
                <li>Capture whole crates/heap to show color uniformity.</li>
                <li>Take 1 clear close-up showing skin texture and firmness.</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Details
            </Button>
            <Button
              variant="primary"
              size="md"
              disabled={uploadedPhotos.length < 3}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(3)}
            >
              Review Listing (3/3)
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* STEP 3: PREVIEW & PUBLISH */}
      {step === 3 && (
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-t-2xl pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white font-bold">
                  Step 3: Preview Buyer Marketplace Card
                </CardTitle>
                <CardDescription className="text-xs text-emerald-100/90">
                  This is exactly how 450+ verified corporate buyers and food processors will see your lot
                </CardDescription>
              </div>
              <Badge variant="warning" size="md">
                Draft Ready
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5 text-xs">
            {/* Image Preview Banner */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden border border-slate-200">
              {uploadedPhotos.slice(0, 3).map((url, i) => (
                <div key={i} className="aspect-video relative bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Produce Specs & Total Value */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-slate-950">{title}</span>
                <Badge variant="emerald" size="md">{grade}</Badge>
              </div>
              <p className="text-slate-500 text-xs">{variety} • {category}</p>

              <div className="pt-2 border-t border-slate-200 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Quantity</span>
                  <span className="font-bold text-slate-900 text-sm">{quantity} {unit}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Floor Price</span>
                  <span className="font-bold text-emerald-700 text-sm">₹{expectedPrice.toLocaleString('en-IN')}/{unit}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-100/60 border border-emerald-300">
                  <span className="text-[10px] text-emerald-800 block font-semibold">Lot Value</span>
                  <span className="font-black text-emerald-950 text-sm">₹{totalValue.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Escrow Protection Badge */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="font-extrabold text-emerald-950 text-xs">
                  KrishiSetu Escrow Guarantee: 30% Advance (₹{advanceEscrowValue.toLocaleString('en-IN')})
                </span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Buyers must deposit 30% into secure Escrow before dispatch authorization. Balance is released immediately on weight & quality confirmation.
              </p>
            </div>

            {/* Farmer & Logistics Details */}
            <div className="p-3.5 rounded-xl border border-slate-200 text-slate-600 space-y-1">
              <p className="font-semibold text-slate-900">
                Seller: {mockFarmerProfile.name} • Kisan ID: {mockFarmerProfile.kisanId}
              </p>
              <p className="text-[11px] text-slate-500">
                Pickup Yard: {location} • Dispatch Available: {dispatchDate}
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Photos
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handlePublish}
            >
              Publish to Marketplace
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
