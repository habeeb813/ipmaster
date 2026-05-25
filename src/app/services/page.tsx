'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, FileText, Award, Briefcase, FileCode, Scale, Zap, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function ServicesIndex() {
  const categories = [
    {
      name: 'Intellectual Property',
      description: 'Protect creative assets, technical processes, brand names, and source codes legally.',
      items: SERVICES.filter(s => s.category === 'Intellectual Property')
    },
    {
      name: 'Business Compliance',
      description: 'Get required tax numbers, manage corporate filings, and global certifications.',
      items: SERVICES.filter(s => s.category === 'Business Compliance')
    },
    {
      name: 'Corporate Registrations',
      description: 'Incorporate entities, set up startup certifications, and draft ironclad contracts.',
      items: SERVICES.filter(s => s.category === 'Corporate Registrations')
    }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="h-5 w-5 text-accent" />;
      case 'FileText': return <FileText className="h-5 w-5 text-accent" />;
      case 'Zap': return <Zap className="h-5 w-5 text-accent" />;
      case 'Award': return <Award className="h-5 w-5 text-accent" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5 text-accent" />;
      case 'FileCode': return <FileCode className="h-5 w-5 text-accent" />;
      default: return <Scale className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <div className="relative pb-20">
      {/* Decorative Gradients */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-[300px] h-[300px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-card/20 border-b border-gray-150 dark:border-border/60 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">Corporate Advisory Suite</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
            Premium Business Protection Services
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Explore our specialized legal-tech solutions, each backed by dedicated corporate attorneys and express filing support.
          </p>
        </div>
      </section>

      {/* Categories sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-20 w-full">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col gap-8">
            <div className="border-b border-gray-100 dark:border-border/60 pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-primary dark:text-white">{cat.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.items.map((service) => (
                <div
                  key={service.slug}
                  className="group p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-4">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#05070f] w-fit border border-gray-100 dark:border-border transition-colors group-hover:bg-accent/10">
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
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Consultation wide banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#0b0f19] to-[#05070f] border border-accent/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-white">Need a customized business filing plan?</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our legal specialists are ready to draft a custom roadmap covering all required classes and incorporation documents. Book your slot in 2 minutes.
            </p>
          </div>

          <Link
            href="/booking"
            className="w-full md:w-auto text-center px-8 py-3.5 text-xs font-bold rounded-xl bg-accent text-black hover:bg-accent/90 transition-all shadow-md shrink-0"
          >
            Consult a Specialist
          </Link>
        </div>
      </section>
    </div>
  );
}
