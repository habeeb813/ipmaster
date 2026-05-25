import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FAQS } from '@/data/faqs';
import { ArrowLeft, HelpCircle, Shield, Award, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes
export async function generateStaticParams() {
  return FAQS.map((faq) => ({
    slug: faq.slug,
  }));
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = FAQS.find((f) => f.slug === slug);
  if (!faq) {
    return {
      title: 'FAQ Not Found | IPMASTER',
      description: 'The requested legal Q&A was not found.'
    };
  }

  return {
    title: `${faq.question} | Legal FAQ Index`,
    description: faq.answer,
    alternates: {
      canonical: `https://ipmaster.in/faq/${slug}`,
    },
    openGraph: {
      title: faq.question,
      description: faq.answer,
      url: `https://ipmaster.in/faq/${slug}`,
    }
  };
}

export default async function FaqDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const faq = FAQS.find((f) => f.slug === slug);
  if (!faq) notFound();

  // Structured Q&A schema for search engines
  const qaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    'name': faq.question,
    'text': faq.question,
    'answerCount': 1,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.detailedAnswer || faq.answer,
      'upvoteCount': 42,
      'url': `https://ipmaster.in/faq/${slug}`
    }
  };

  return (
    <div className="relative pb-24">
      {/* Inject Q&A schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaSchema) }}
      />

      {/* Main Container */}
      <section className="max-w-3xl mx-auto px-4 py-16 w-full flex flex-col gap-8">
        
        {/* Back Link */}
        <Link
          href="/faq"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent self-start"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Q&A Directory
        </Link>

        {/* Question Header Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-card border border-gray-150 dark:border-border shadow-sm flex gap-4 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="p-3 rounded-2xl bg-accent/10 text-accent shrink-0">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-accent font-semibold">
              Category: {faq.category}
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-primary dark:text-white leading-tight">
              {faq.question}
            </h1>
          </div>
        </div>

        {/* Detailed Answer Section */}
        <div className="flex flex-col gap-6 text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground border-b border-gray-100 dark:border-border/60 pb-2">
            Detailed Legal Answer
          </h2>
          <p className="font-semibold text-primary dark:text-white bg-slate-50 dark:bg-card/40 border border-gray-100 dark:border-border p-4 rounded-2xl">
            {faq.answer}
          </p>
          {faq.detailedAnswer && (
            <p className="whitespace-pre-line mt-2 pl-2">
              {faq.detailedAnswer}
            </p>
          )}
        </div>

        {/* Legal Authority Sidebar */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-card/40 border border-gray-100 dark:border-border/60 flex flex-col sm:flex-row justify-between items-center gap-6 mt-6">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-accent shrink-0" />
            <div>
              <div className="text-xs font-bold text-primary dark:text-white">Statutory Quality Assured</div>
              <div className="text-[10px] text-muted-foreground leading-normal mt-0.5">Written and verified by registered trademark advocates.</div>
            </div>
          </div>
          
          <Link
            href="/booking"
            className="px-6 py-2.5 rounded-xl bg-accent text-black hover:bg-accent/90 transition-all text-xs font-bold shrink-0 shadow-md"
          >
            File Trademark
          </Link>
        </div>

      </section>
    </div>
  );
}
