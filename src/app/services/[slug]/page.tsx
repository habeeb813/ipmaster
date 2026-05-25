import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { Shield, FileText, Award, Briefcase, FileCode, Scale, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return {
      title: 'Service Not Found | IPMASTER',
      description: 'The requested corporate registry or intellectual property service was not found.'
    };
  }

  return {
    title: `${service.metaTitle} | IPMASTER`,
    description: service.metaDescription,
    alternates: {
      canonical: `https://ipmaster.in/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Online Registration Services`,
      description: service.shortDescription,
      url: `https://ipmaster.in/services/${slug}`,
    }
  };
}

// Generate static parameters for build caching
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetail({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="h-10 w-10 text-accent" />;
      case 'FileText': return <FileText className="h-10 w-10 text-accent" />;
      case 'Zap': return <Zap className="h-10 w-10 text-accent" />;
      case 'Award': return <Award className="h-10 w-10 text-accent" />;
      case 'Briefcase': return <Briefcase className="h-10 w-10 text-accent" />;
      case 'FileCode': return <FileCode className="h-10 w-10 text-accent" />;
      default: return <Scale className="h-10 w-10 text-accent" />;
    }
  };

  // Structured schemas to boost SEO rank
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': service.faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': service.title,
    'description': service.shortDescription,
    'image': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    'brand': {
      '@type': 'Brand',
      'name': 'IPMASTER'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'lowPrice': service.pricing[0].cost.replace(/[^0-9]/g, ''),
      'offerCount': service.pricing.length.toString(),
      'priceRange': '$$'
    }
  };

  return (
    <div className="relative pb-24">
      {/* Injecting dynamic micro-data schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Header Banner */}
      <section className="bg-slate-50 dark:bg-card/20 border-b border-gray-150 dark:border-border/60 py-20 w-full relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="max-w-3xl flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">
                {service.category} &bull; Online Registration
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
            
            <div className="shrink-0 p-4 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border shadow-md">
              {getServiceIcon(service.iconName)}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Description */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-primary dark:text-white border-b border-gray-150 dark:border-border pb-3 uppercase tracking-wider text-xs">
                About the Registry Process
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-primary dark:text-white border-b border-gray-150 dark:border-border pb-3 uppercase tracking-wider text-xs">
                Key Legal Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-card/40 border border-gray-100 dark:border-border rounded-xl">
                    <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-slate-200 font-medium leading-normal">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step timeline */}
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold text-primary dark:text-white border-b border-gray-150 dark:border-border pb-3 uppercase tracking-wider text-xs">
                Filing Timeline & Pipeline Roadmap
              </h2>
              
              <div className="flex flex-col gap-6 pl-4 border-l-2 border-accent/20">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col gap-1.5 pl-6">
                    <div className="absolute left-[-25px] top-0 h-4.5 w-4.5 rounded-full bg-card border-2 border-accent flex items-center justify-center font-bold text-[8px] text-accent">
                      {idx + 1}
                    </div>
                    <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">{step.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic FAQs */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-primary dark:text-white border-b border-gray-150 dark:border-border pb-3 uppercase tracking-wider text-xs">
                Frequently Asked Questions
              </h2>
              
              <div className="flex flex-col gap-4">
                {service.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-gray-150 dark:border-border rounded-xl bg-white dark:bg-card transition-all"
                  >
                    <summary className="px-5 py-4 text-xs font-bold text-primary dark:text-white hover:text-accent transition-colors list-none cursor-pointer flex justify-between items-center select-none">
                      <span>{faq.question}</span>
                      <span className="text-accent group-open:rotate-180 transition-transform duration-200 text-xs">▼</span>
                    </summary>
                    <div className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-slate-50 dark:border-border/60 pt-3">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Quick Booking */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Pricing Packages */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground border-b border-gray-150 dark:border-border pb-3">
                Pricing Packages
              </h2>
              
              <div className="flex flex-col gap-6">
                {service.pricing.map((price, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl bg-white dark:bg-card border shadow-sm flex flex-col gap-4 ${
                      idx === 1 ? 'border-accent/40 shadow-lg relative' : 'border-gray-150 dark:border-border'
                    }`}
                  >
                    {idx === 1 && (
                      <span className="absolute top-[-10px] right-4 bg-accent text-black font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">{price.title}</h3>
                      <div className="text-lg font-extrabold text-accent mt-1.5">{price.cost}</div>
                    </div>
                    
                    <ul className="flex flex-col gap-2 text-[10px] text-muted-foreground border-t border-slate-50 dark:border-border/40 pt-3">
                      {price.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-accent font-bold">&bull;</span> {feat}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/booking?service=${service.slug}`}
                      className={`w-full py-2.5 rounded-xl text-center text-xs font-bold transition-all ${
                        idx === 1 
                          ? 'bg-accent text-black hover:bg-accent/90 shadow-md' 
                          : 'bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 text-primary dark:text-white hover:bg-slate-100'
                      }`}
                    >
                      Book Free Consult
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick legal disclaimer widget */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-card/25 border border-gray-100 dark:border-border text-[10px] text-muted-foreground leading-relaxed">
              <strong>Govt Fee concession notice:</strong> Startups registered under Udyam MSME schemes are eligible for 50% waiver in official registry fee structures. Advise our legal specialist on call regarding concessions.
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
