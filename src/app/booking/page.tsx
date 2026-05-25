'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import { ShieldCheck, Award, Users, CheckSquare } from 'lucide-react';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get('service') || '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-12">
      {/* Left Column: Trust Metrics */}
      <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
        <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
          <ShieldCheck className="h-4 w-4 text-accent animate-pulse-slow" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">
            Govt Approved IP Registry Agents
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white leading-tight">
          Let's Build Your <br />
          <span className="gold-gradient-text">Brand Protection Strategy.</span>
        </h1>
        
        <p className="text-xs text-muted-foreground leading-relaxed">
          Book a free 15-minute diagnostic session. Our experienced Bar-registered corporate lawyers and patent draft spec agents will review your proposed names, identify Nice Classes, and check conflict risks.
        </p>

        <div className="flex flex-col gap-4 text-left border-t border-gray-150 dark:border-border/60 pt-6 mt-2 text-xs">
          <div className="flex items-start gap-3">
            <CheckSquare className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <span className="text-muted-foreground leading-normal">
              <strong>Free Public Searches:</strong> Soundex phonetic scans across all official government trademark class records.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <CheckSquare className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <span className="text-muted-foreground leading-normal">
              <strong>Risk Assessment:</strong> Early evaluation against Section 9 (generic name) and Section 11 (conflict) examiner rejections.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <CheckSquare className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <span className="text-muted-foreground leading-normal">
              <strong>Fixed Rate Clarity:</strong> Understand the government registry fees and transparent professional filing package rates.
            </span>
          </div>
        </div>

        {/* Micro statistics */}
        <div className="grid grid-cols-3 gap-4 border-t border-gray-150 dark:border-border/60 pt-6 mt-2 max-w-sm mx-auto lg:mx-0">
          <div>
            <div className="text-sm font-bold text-accent">15,000+</div>
            <div className="text-[8px] uppercase tracking-widest text-muted-foreground font-semibold">Tils Filed</div>
          </div>
          <div>
            <div className="text-sm font-bold text-accent">99.4%</div>
            <div className="text-[8px] uppercase tracking-widest text-muted-foreground font-semibold">Success Registry</div>
          </div>
          <div>
            <div className="text-sm font-bold text-accent">30+</div>
            <div className="text-[8px] uppercase tracking-widest text-muted-foreground font-semibold">IP Lawyers</div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Scheduler Form */}
      <div className="lg:col-span-7 w-full">
        {/* Pass parameter down or let BookingForm handle its dynamic state */}
        <BookingForm />
      </div>
    </div>
  );
}

export default function Booking() {
  return (
    <div className="relative pb-24">
      {/* Decorative gradients */}
      <div className="absolute top-[-100px] right-[10%] w-[350px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Wrapper */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20 text-xs text-muted-foreground font-bold">
            Initializing Scheduler Portal...
          </div>
        }>
          <BookingPageContent />
        </Suspense>
      </section>
    </div>
  );
}
