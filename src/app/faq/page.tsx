'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, Scale, Shield, AlertCircle, HelpCircle } from 'lucide-react';
import { FAQS } from '@/data/faqs';

export default function FaqIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const categories = ['All', 'Trademarks', 'Copyrights', 'Patents', 'Corporate Compliance'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (faq.detailedAnswer && faq.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (slug: string) => {
    setExpandedFaq(expandedFaq === slug ? null : slug);
  };

  return (
    <div className="relative pb-20">
      {/* Decorative Gradients */}
      <div className="absolute top-[-100px] left-[10%] w-[350px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-card/20 border-b border-gray-150 dark:border-border/60 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">Q&A Knowledge Base</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
            Legal & Registry FAQ Directory
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Search our comprehensive archive of legal answers. We break down complex statutory intellectual property laws into actionable guidance.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 w-full">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-card border border-gray-150 dark:border-border p-4 rounded-2xl shadow-sm">
          
          {/* Categories select */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedFaq(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent text-black shadow-md'
                    : 'bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 text-primary dark:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search legal queries (e.g. fees, status)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedFaq(null);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
            />
          </div>

        </div>
      </section>

      {/* FAQs Accordion Grid Layout */}
      <section className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4 w-full">
        {filteredFaqs.map((faq) => {
          const isExpanded = expandedFaq === faq.slug;
          return (
            <div
              key={faq.slug}
              className="border border-gray-150 dark:border-border rounded-xl overflow-hidden bg-white dark:bg-card transition-all"
            >
              <button
                onClick={() => toggleAccordion(faq.slug)}
                className="w-full px-5 py-4 text-left flex justify-between items-center text-xs font-bold text-primary dark:text-white hover:text-accent transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-4.5 w-4.5 text-accent shrink-0" />
                  {faq.question}
                </span>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-accent shrink-0" /> : <ChevronDown className="h-4 w-4 text-accent shrink-0" />}
              </button>
              
              {isExpanded && (
                <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-slate-50 dark:border-border/60 pt-4 flex flex-col gap-3">
                  <p>{faq.answer}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2 pt-3 border-t border-slate-100 dark:border-border/40">
                    <span className="text-[10px] text-accent font-bold uppercase tracking-widest">
                      Category: {faq.category}
                    </span>
                    <Link
                      href={`/faq/${faq.slug}`}
                      className="text-[10px] text-accent-blue font-bold hover:underline"
                    >
                      Read deep legal analysis &raquo;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-border rounded-3xl flex flex-col items-center gap-3">
            <AlertCircle className="h-10 w-10 text-muted-foreground animate-pulse" />
            <h3 className="text-base font-bold text-primary dark:text-white">No FAQ matches found</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Ask our registry attorneys directly! Send your question through the consultation scheduler or WhatsApp link.
            </p>
          </div>
        )}
      </section>

      {/* Booking wide banner */}
      <section className="max-w-4xl mx-auto px-4 pt-12">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-card/45 border border-gray-150 dark:border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Still have unanswered questions?</h3>
            <p className="text-[11px] text-muted-foreground mt-1">Our IP Lawyers offer free 15-minute consultations to clear up registry doubts.</p>
          </div>
          <Link
            href="/booking"
            className="px-6 py-2.5 rounded-xl bg-accent text-black hover:bg-accent/90 transition-all text-xs font-bold shrink-0 shadow-md shadow-accent/5"
          >
            Consult Attorney
          </Link>
        </div>
      </section>

    </div>
  );
}
