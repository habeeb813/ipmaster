import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | IPMASTER',
  description: 'Learn how IPMASTER protects your corporate brand check data, trademark filings, and contact coordinates under strict NDA conditions.'
};

export default function PrivacyPolicy() {
  return (
    <div className="relative pb-24">
      {/* Decorative gradients */}
      <div className="absolute top-[-100px] left-[5%] w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <section className="max-w-4xl mx-auto px-4 py-16 w-full flex flex-col gap-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent self-start"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-gray-150 dark:border-border/60 pb-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-accent/10 text-accent shrink-0">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white">Privacy & NDA Policy</h1>
            <p className="text-xs text-muted-foreground mt-1">Last Updated: May 2026 &bull; Strict IP Safeguard Guaranteed</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="prose dark:prose-invert text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-300 flex flex-col gap-6">
          <p>
            At <strong>IPMASTER</strong>, we recognize that your intellectual properties, brand names, software code, and patent concepts represent the core value of your company. We enforce uncompromising data protection and confidentiality protocols, ensuring your inquiries are safeguarded under strict attorney-client privileges and active Non-Disclosure Agreements (NDAs).
          </p>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-border/40 pb-2">
            1. Non-Disclosure & Intellectual Protection
          </h2>
          <p>
            All brand name queries entered in our <strong>Trademark Availability Checker</strong> are heavily protected. We do not register, sell, lease, or share your proposed brand names with any third parties. We do not publicize search logs, preventing squatters from identifying your brand ideas.
          </p>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-border/40 pb-2">
            2. Personal Coordinate Gathering
          </h2>
          <p>
            When booking consultations or submitting lead forms, we collect personal coordinates including your name, active WhatsApp numbers, email addresses, and company descriptions. This data is exclusively used to:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Generate comprehensive, phonetically scrutinised trademark availability reports.</li>
            <li>Coordinate Google Meet appointments or telephone call consultations.</li>
            <li>Deliver official Trademark Registry status updates.</li>
          </ul>

          <h2 className="text-sm font-bold text-primary dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-border/40 pb-2">
            3. Regulatory Compliance
          </h2>
          <p>
            Our data protocols are constructed in complete compliance with the <strong>Information Technology Act, 2000</strong> (India) and incorporate best-practice guidelines aligned with international <strong>GDPR</strong> and <strong>CCPA</strong> privacy frameworks. You hold full rights to request immediate erasure of your data records at any point by mailing <a href="mailto:privacy@ipmaster.in" className="text-accent-blue font-bold">privacy@ipmaster.in</a>.
          </p>
        </div>

      </section>
    </div>
  );
}
