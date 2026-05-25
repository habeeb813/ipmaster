'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  FileText, 
  Award, 
  Briefcase, 
  FileCode, 
  Scale, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Users, 
  Building, 
  PhoneCall,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import TrademarkChecker from '@/components/TrademarkChecker';
import { SERVICES } from '@/data/services';
import { BLOG_POSTS } from '@/data/blogs';
import { FAQS } from '@/data/faqs';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState('');

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="h-6 w-6 text-accent" />;
      case 'FileText': return <FileText className="h-6 w-6 text-accent animate-pulse-slow" />;
      case 'Zap': return <Zap className="h-6 w-6 text-accent" />;
      case 'Award': return <Award className="h-6 w-6 text-accent" />;
      case 'Briefcase': return <Briefcase className="h-6 w-6 text-accent" />;
      case 'FileCode': return <FileCode className="h-6 w-6 text-accent" />;
      default: return <Scale className="h-6 w-6 text-accent" />;
    }
  };

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="flex flex-col w-full relative">
      {/* Decorative Hero Background Gradients */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-accent/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[200px] right-[10%] w-[300px] h-[300px] bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">
                India's Premium Brand Protection Suite
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-primary dark:text-white">
              Protect Your Brand <br className="hidden md:inline" />
              <span className="gold-gradient-text">Before Someone Else Does.</span>
            </h1>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Professional online trademark registration, software copyrights, technical patents, and regulatory business compliances managed by corporate attorneys. Secure your identity in 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <Link
                href="/booking"
                className="w-full sm:w-auto text-center px-8 py-3.5 text-xs font-bold rounded-xl bg-accent text-black hover:bg-accent/90 transition-all shadow-xl shadow-accent/15"
              >
                Book Free Consultation
              </Link>
              <a
                href="#trademark-search"
                className="w-full sm:w-auto text-center px-8 py-3.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all"
              >
                Check Name Availability
              </a>
            </div>

            {/* Micro metrics underneath CTAs */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-150 dark:border-white/5 pt-6 mt-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-base md:text-lg font-bold text-accent">15,000+</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Brands Protected</div>
              </div>
              <div>
                <div className="text-base md:text-lg font-bold text-accent">99.4%</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Success Registry</div>
              </div>
              <div>
                <div className="text-base md:text-lg font-bold text-accent">24 Hours</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">Express Filing</div>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Search Simulator */}
          <div id="trademark-search" className="lg:col-span-6 w-full">
            <TrademarkChecker />
          </div>
        </div>
      </section>

      {/* SECTION 2: CLIENT LOGOS */}
      <section className="border-y border-gray-150 dark:border-white/5 py-10 bg-slate-50/50 dark:bg-card/10 backdrop-blur-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] uppercase tracking-widest font-extrabold text-muted-foreground mb-6">
            Trusted by founders at India's fastest-growing enterprise brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-lg tracking-tight text-primary dark:text-white">STRIPE<span className="text-accent">_</span></span>
            <span className="font-bold text-lg text-primary dark:text-white">AcmeTech</span>
            <span className="font-semibold text-lg text-primary dark:text-white">RazorFlow</span>
            <span className="font-medium text-lg text-primary dark:text-white">SaaSForge</span>
            <span className="font-extrabold text-lg text-primary dark:text-white">CloudBase</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICE HIGHLIGHTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent">Our Services</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white">
            Premium Registry & Legal Safeguards
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            From trademark locking to complicated copyright protection and tax structuring, select a tailored workflow to secure your intellectual properties legally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              className="group p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#05070f] w-fit border border-gray-100 dark:border-border transition-colors group-hover:bg-accent/15">
                  {getServiceIcon(service.iconName)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary dark:text-white group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-border/60 flex items-center justify-between">
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest">{service.category}</span>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent-blue hover:text-accent transition-colors"
                >
                  Explore Service <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-20 border-t border-gray-150 dark:border-white/5 bg-slate-50 dark:bg-card/10 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Why Choose Us Left */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
              <div className="text-xs uppercase font-extrabold tracking-widest text-accent">Why Partner With Us</div>
              <h2 className="text-3xl font-extrabold text-primary dark:text-white leading-tight">
                Corporate legal excellence meets agile modern tech
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Generic online registry agents often make critical class filing mistakes, leading to endless examiner oppositions. At IPMASTER, we pair you with dedicated trademark and patent attorneys who draft customized legal classifications to secure a 99.4% approval rate.
              </p>
              
              <div className="flex flex-col gap-3 mt-2 text-left">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    &bull;
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Government Registered Agents & IP Attorneys</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    &bull;
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Direct real-time application updates via SMS & WhatsApp</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    &bull;
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Water-tight class mapping avoiding Section 9 & 11 objections</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us Right Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border">
                <Users className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">30+ Dedicated Attorneys</h3>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  In-house legal practitioners specialized in corporate law, international IP treaties, and software copyright registries.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border">
                <Building className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Startup-Friendly Rates</h3>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  Transparent fixed pricing. No hidden fees. Benefit from a 50% government fee concession via our MSME support setups.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border">
                <PhoneCall className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Active Support Team</h3>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  Have urgent doubts? Reach our intellectual property specialists directly over phone, email, or a real-time WhatsApp session.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border">
                <CheckCircle className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">100% Secure IP Guarantee</h3>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  Every brand checking inquiry is heavily protected with multi-layered NDAs. We ensure your brand details remain highly private.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: PROCESS TIMELINE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">How We Work</div>
          <h2 className="text-3xl font-extrabold text-primary dark:text-white">
            Secure Your Registered Status in 4 Steps
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our seamless digital registry protocol gets your trademark filed in 24 hours. Here is what the complete roadmap looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Step 1 */}
          <div className="flex flex-col gap-4 text-center items-center relative">
            <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-sm shadow-md">
              01
            </div>
            <div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Search & Scrutiny</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-2 px-4">
                We perform an exhaustive availability search across official databases to avoid pre-existing trademark phonetic conflicts.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-4 text-center items-center relative">
            <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-sm shadow-md">
              02
            </div>
            <div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Class Selection & Drafting</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-2 px-4">
                Attorneys help select correct Nice Classes and prepare Form TM-A, drafting specific goods/services specifications.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-4 text-center items-center relative">
            <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-sm shadow-md">
              03
            </div>
            <div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Application Filing ("TM")</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-2 px-4">
                We submit application instantly, generating government number in 24 hours so you can display the "TM" mark.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-4 text-center items-center relative">
            <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-sm shadow-md">
              04
            </div>
            <div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Government Registration ("®")</h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-2 px-4">
                We monitor examiners and file responses. If approved, journal publication leads directly to the registered "®" status!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-20 border-t border-gray-150 dark:border-white/5 bg-slate-50 dark:bg-card/10 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">Testimonials</div>
            <h2 className="text-3xl font-extrabold text-primary dark:text-white">
              Sought After by Leaders of High-Growth Startups
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Read how we assist founders, engineers, and creators in securing their intellectual properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0f19] border border-gray-150 dark:border-border shadow-sm flex flex-col justify-between">
              <p className="text-xs italic leading-relaxed text-slate-600 dark:text-slate-300">
                "We were terrified of launching our SaaS name without checking conflicts. The IPMASTER team carried out phonetic searches, helped draft a provisional patent, and got our application filed in 24 hours. Incredible professionalism."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white">Siddharth Mehta</div>
                  <div className="text-[10px] text-muted-foreground">Founder & CEO, RazorFlow</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0f19] border border-gray-150 dark:border-border shadow-sm flex flex-col justify-between">
              <p className="text-xs italic leading-relaxed text-slate-600 dark:text-slate-300">
                "Our software copyright filing was stuck due to formatting claims. IPMASTER attorneys drafted structural source-code assignment deeds and resolved registry examiners objections with a 100% success record. Superb team."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white">Dr. Ananya Nair</div>
                  <div className="text-[10px] text-muted-foreground">CTO, CloudBase Analytics</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0f19] border border-gray-150 dark:border-border shadow-sm flex flex-col justify-between">
              <p className="text-xs italic leading-relaxed text-slate-600 dark:text-slate-300">
                "IPMASTER got our Startup India DPIIT recognition in 7 days, unlocking massive tax holiday exemptions! They also handled our GST, ISO 9001, and trademark registrations. They are our go-to partner for legal growth."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white">Rohan Kapoor</div>
                  <div className="text-[10px] text-muted-foreground">Co-Founder, SaaSForge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ ACCORDION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* FAQ Left */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
            <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">Q&A Knowledge Portal</div>
            <h2 className="text-3xl font-extrabold text-primary dark:text-white leading-tight">
              Answering your core intellectual property questions
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Can't find your answer here? Type your query in our FAQ search bar or explore our dedicated Q&A page for complex scenarios.
            </p>

            <div className="relative max-w-md mx-auto lg:mx-0 w-full mt-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs (e.g. copyright, fees)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-card border border-gray-150 dark:border-border rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-white"
              />
            </div>
            
            <Link
              href="/faq"
              className="text-xs font-bold text-accent-blue hover:text-accent self-center lg:self-start mt-2"
            >
              Browse Complete Q&A Catalog &rarr;
            </Link>
          </div>

          {/* FAQ Right Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = activeFaq === index;
              return (
                <div
                  key={faq.slug}
                  className="border border-gray-150 dark:border-border rounded-xl overflow-hidden bg-white dark:bg-card transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center text-xs font-bold text-primary dark:text-white hover:text-accent transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-accent shrink-0" /> : <ChevronDown className="h-4 w-4 text-accent shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-slate-50 dark:border-border/60 pt-3">
                      <p>{faq.answer}</p>
                      {faq.detailedAnswer && (
                        <Link href={`/faq/${faq.slug}`} className="text-[10px] text-accent-blue font-bold hover:underline block mt-2">
                          Read detailed Q&A article &raquo;
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredFaqs.length === 0 && (
              <div className="text-center p-8 text-xs text-muted-foreground border border-dashed border-gray-200 dark:border-border rounded-xl">
                No FAQs matching search. Ask us directly using the Contact form!
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 8: LATEST BLOGS */}
      <section className="py-20 border-t border-gray-150 dark:border-white/5 bg-slate-50 dark:bg-card/10 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold mb-2">Legal Insights</div>
              <h2 className="text-3xl font-extrabold text-primary dark:text-white">
                Latest Intellectual Property Analysis
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-accent-blue hover:text-accent shrink-0"
            >
              View All Blog Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between bg-white dark:bg-[#0b0f19] border border-gray-150 dark:border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                    />
                    <span className="absolute top-3 left-3 bg-primary/80 dark:bg-[#05070f]/80 backdrop-blur-sm text-[9px] font-bold text-accent px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <div className="text-[10px] text-muted-foreground font-semibold">{post.publishedAt} &bull; {post.readTime}</div>
                    <h3 className="text-xs font-bold text-primary dark:text-white group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-gray-50 dark:border-border/60 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-primary dark:text-slate-300">{post.author.name}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[10px] font-bold text-accent-blue group-hover:underline"
                  >
                    Read Article &raquo;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CONSULTATION BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0b0f19] to-[#05070f] border border-accent/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Background overlay glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Launch and protect your brand legally today.
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Don't wait for a cease-and-desist letter or someone to hijack your brand name. Secure your intellectual assets with our premium, end-to-end legal support starting in 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/booking"
              className="w-full sm:w-auto text-center px-8 py-3.5 text-xs font-bold rounded-xl bg-accent text-black hover:bg-accent/90 transition-all shadow-lg"
            >
              Book Free Call
            </Link>
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto text-center px-8 py-3.5 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all"
            >
              Call Specialist Direct
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
