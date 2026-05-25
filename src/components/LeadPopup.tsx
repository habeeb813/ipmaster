'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle } from 'lucide-react';

export default function LeadPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', brand: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this session
    const dismissed = sessionStorage.getItem('exit_popup_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse cursor leaves the top boundary of the viewport
      if (e.clientY < 15 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleDismiss = () => {
    setShowPopup(false);
    sessionStorage.setItem('exit_popup_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.brand) return;

    setIsSubmitting(true);
    // Simulate API lead capture
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      sessionStorage.setItem('exit_popup_dismissed', 'true');
    }, 1500);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0b0f19] border border-gray-100 dark:border-border rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <ShieldAlert className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-primary dark:text-white leading-tight">
                  Wait! Don't Leave Your Brand Unprotected.
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Over 1,200 brand names are registered daily. Check yours for free before someone else locks it in.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-border my-2" />

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Proposed Brand / Trademark Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech or BrandLogo"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Mobile Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-lg bg-accent text-black font-semibold text-xs uppercase tracking-wider hover:bg-accent/90 transition-colors shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Securing Legal Connection...' : 'Check Trademark Availability For Free'}
            </button>

            <div className="text-center text-[10px] text-muted-foreground">
              🛡️ No spam. We respect your intellectual property privacy. Under GDPR & IT Act laws.
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4 gap-4 animate-in zoom-in-95">
            <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle className="h-12 w-12" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary dark:text-white">
                Free IP Check Requested!
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Thank you, <strong className="text-slate-800 dark:text-slate-200">{formData.name}</strong>. An IP specialist is compiling the availability report for <strong className="text-accent">"{formData.brand}"</strong>. We will WhatsApp you or email you the detailed report within 15 minutes!
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="mt-2 px-6 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold text-primary dark:text-white"
            >
              Got it, thanks!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
