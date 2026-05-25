'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, Phone, Mail, Award, Loader2 } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { cmsDb } from '@/data/cmsDb';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0].slug,
    date: '',
    timeSlot: '11:00 AM - 12:00 PM',
    brief: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '05:00 PM - 06:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) return;

    setIsSubmitting(true);
    
    // Save to CMS local database synchronizer
    setTimeout(() => {
      cmsDb.saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        time: formData.timeSlot,
        status: 'New'
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const selectedService = SERVICES.find(s => s.slug === formData.service);

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-card border border-gray-100 dark:border-border rounded-2xl p-6 md:p-8 shadow-2xl relative">
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary dark:text-white leading-tight">
              Book a Free 1-on-1 Legal Strategy Session
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select your slot and consult with an experienced intellectual property lawyer or registry specialist.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="e.g. john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Practice Area / Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              >
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Preferred Time Slot
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Briefly describe your business or IP query
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your brand name, patented tech, or incorporation requirements..."
              value={formData.brief}
              onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 rounded-lg bg-primary text-white hover:bg-slate-900 dark:bg-accent dark:text-black dark:hover:bg-accent/90 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Scheduling Session...
              </>
            ) : (
              <>Schedule Free Legal Consult</>
            )}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6 gap-5 animate-in zoom-in-95 duration-300">
          <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary dark:text-white">
              Consultation Scheduled!
            </h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-sm">
              Congratulations <strong className="text-slate-800 dark:text-slate-200">{formData.name}</strong>, your expert call regarding <strong className="text-accent">{selectedService?.title}</strong> is reserved!
            </p>
          </div>

          <div className="w-full bg-slate-50 dark:bg-[#05070f] border border-gray-100 dark:border-border rounded-xl p-4 text-xs text-left flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <strong className="text-primary dark:text-white">{formData.date}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Slot:</span>
              <strong className="text-primary dark:text-white">{formData.timeSlot}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format:</span>
              <strong className="text-emerald-500">Google Meet / Phone Call (Free)</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Award className="h-4 w-4 text-accent" /> An IP Specialist will WhatsApp a meeting link shortly.
          </div>
        </div>
      )}
    </div>
  );
}
