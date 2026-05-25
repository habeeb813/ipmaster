import React from 'react';
import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, Shield, CheckCircle, Award } from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#03050a] text-[#94a3b8] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent/80 to-accent-blue/80 text-white shadow-md">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white">
                IP<span className="text-accent">MASTER</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#64748b]">
              IPMASTER is a premium intellectual property and legal corporate compliance registry firm. We protect your brand name, copyrights, patents, and establish ironclad legal corporate compliance structures.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-slate-300 mt-2">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                <Phone className="h-3.5 w-3.5 text-accent" /> +91 98765 43210
              </a>
              <a href="mailto:info@ipmaster.in" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                <Mail className="h-3.5 w-3.5 text-accent" /> contact@ipmaster.in
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                <span>Level 9, Raheja Towers, MG Road,<br />Bengaluru, KA 560001, India</span>
              </div>
            </div>
          </div>

          {/* Quick links & Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 border-l-2 border-accent pl-2">
              IP Protection
            </h3>
            <ul className="flex flex-col gap-3 text-xs font-medium">
              {SERVICES.filter(s => s.category === 'Intellectual Property').map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-accent transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Compliances */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5 border-l-2 border-accent pl-2">
              Corporate & Taxes
            </h3>
            <ul className="flex flex-col gap-3 text-xs font-medium">
              {SERVICES.filter(s => s.category !== 'Intellectual Property').map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-accent transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-accent hover:underline">
                  All Registrations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* SEO links / Trust metrics */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-1 border-l-2 border-accent pl-2">
              Credibility & Trust
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <Shield className="h-4 w-4 text-accent shrink-0" />
                <div className="text-[10px]">
                  <div className="font-bold text-white leading-tight">100% Secure Registry</div>
                  <div className="text-[#64748b]">DPIIT & ISO Compliant processes</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                <div className="text-[10px]">
                  <div className="font-bold text-white leading-tight">99.4% Success Rate</div>
                  <div className="text-[#64748b]">15,000+ trademarks secured</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                <Award className="h-4 w-4 text-accent shrink-0" />
                <div className="text-[10px]">
                  <div className="font-bold text-white leading-tight">Govt Recognized Agents</div>
                  <div className="text-[#64748b]">In-house patent & trademark attorneys</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal separator */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex flex-wrap justify-center gap-6 md:justify-start">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Q&A Archive</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
          
          <div className="text-center md:text-right text-[#64748b]">
            &copy; {currentYear} IPMASTER. All rights reserved. Registered with Govt of India & MSME under Registry Laws.
          </div>
        </div>
      </div>
    </footer>
  );
}
