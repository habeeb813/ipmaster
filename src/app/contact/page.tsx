'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Trademark Search Query', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API lead submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="relative pb-24">
      {/* Decorative Gradients */}
      <div className="absolute top-[-100px] left-[5%] w-[350px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-card/20 border-b border-gray-150 dark:border-border/60 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">Contact Registry Office</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
            Connect With Our Attorneys
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Have urgent trademark infringement threats, examiner objections, or patent specification questions? Contact our Bangalore corporate registry center directly.
          </p>
        </div>
      </section>

      {/* Contact Columns Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-primary dark:text-white border-b border-gray-150 dark:border-border pb-3 uppercase tracking-wider text-xs">
                Registry Office Coordinates
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Visit our physical office or reach out using the following coordinates. Our advisory team typically returns feedback in 2 hours.
              </p>
            </div>

            <div className="flex flex-col gap-6 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white">Bengaluru Headquarters</h3>
                  <p className="mt-1 leading-relaxed text-muted-foreground">Level 9, Raheja Towers, MG Road, Bengaluru, KA 560001, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white">Inquiry Hotline (9 AM - 6 PM)</h3>
                  <a href="tel:+919876543210" className="block mt-1 leading-relaxed hover:text-accent font-bold text-accent-blue">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-primary dark:text-white">Official Registry Correspondence</h3>
                  <a href="mailto:contact@ipmaster.in" className="block mt-1 leading-relaxed hover:text-accent font-bold text-accent-blue">contact@ipmaster.in</a>
                </div>
              </div>
            </div>

            {/* Simulated interactive Google Maps Card */}
            <div className="h-52 rounded-2xl bg-slate-100 dark:bg-card border border-gray-150 dark:border-border relative overflow-hidden flex items-center justify-center group shadow-inner">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale contrast-125" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80')" }} />
              <div className="relative text-center p-4 flex flex-col items-center gap-2">
                <MapPin className="h-6 w-6 text-accent animate-bounce" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary dark:text-white">Raheja Towers, MG Road</span>
                <span className="text-[9px] text-muted-foreground">Clicking redirects to dynamic navigation map</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="mt-1 px-4 py-1.5 bg-accent text-black font-bold text-[9px] rounded-lg shadow-md uppercase tracking-wider"
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-card border border-gray-150 dark:border-border shadow-2xl relative overflow-hidden">
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-base font-bold text-primary dark:text-white">Send a Direct Legal Query</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Your inquiry will remain completely confidential under attorney privacy privileges.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Your Name</label>
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
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Phone Number</label>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Core Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
                      >
                        <option value="Trademark Search Query">Trademark Search Query</option>
                        <option value="Examiner Objection Support">Examiner Objection Support</option>
                        <option value="SaaS Copyright / Code protection">SaaS Copyright / Code protection</option>
                        <option value="Patent drafting claims consultation">Patent drafting claims consultation</option>
                        <option value="GST / Startup India compliance">GST / Startup India compliance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Message Detail</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Detail your corporate goals, registry class queries, or prior conflicts..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-primary text-white hover:bg-slate-900 dark:bg-accent dark:text-black dark:hover:bg-accent/90 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Transferring Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" /> Submit Confidential Form
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-5 animate-in zoom-in-95 duration-300">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary dark:text-white">Confidential Message Dispatched!</h3>
                    <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                      Thank you <strong className="text-slate-850 dark:text-white">{formData.name}</strong>. Your query has been assigned to a corporate registry advisor. We will get back to you within 2 business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 text-primary dark:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* WhatsApp direct banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/20 text-center flex flex-col items-center gap-4">
          <div className="p-2.5 rounded-full bg-emerald-500/10 text-[#25D366]">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Need immediate answers? WhatsApp our specialists!</h3>
          <p className="text-xs text-slate-300 max-w-md">Connect directly to ask for search report updates, file statuses, or query concessions instantly.</p>
          <a
            href="https://wa.me/919876543210?text=I%20want%20to%20consult%20regarding%20urgent%20brand%25/trademark%20registration%20advice."
            target="_blank"
            className="px-8 py-3 bg-[#25D366] hover:bg-[#20ba59] transition-colors rounded-xl text-xs font-bold text-white shadow-lg"
          >
            Start WhatsApp Chat
          </a>
        </div>
      </section>
    </div>
  );
}
