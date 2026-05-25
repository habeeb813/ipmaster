'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Scale, Users, History, BookmarkCheck } from 'lucide-react';

export default function About() {
  const leadership = [
    {
      name: 'Rohan Deshmukh',
      role: 'Managing Partner',
      bio: 'Corporate registry specialist with 15+ years advising tech startups on business structure, incorporation laws, and statutory taxation compliances.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      name: 'Adv. Neha Sharma',
      role: 'Head of Intellectual Property',
      bio: 'Renowned IP attorney specialized in patent drafting claims, complicated trademark oppositions, global brand protection, and software copyright assignments.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
    }
  ];

  return (
    <div className="relative pb-20">
      {/* Decorative Gradients */}
      <div className="absolute top-[-100px] right-[10%] w-[350px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-card/20 border-b border-gray-150 dark:border-border/60 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">About IPMASTER</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
            Protecting the Ideas That Shape Tomorrow
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            IPMASTER was founded to simplify the incredibly complex legal registry systems for modern businesses and creators, ensuring their brand equity is protected.
          </p>
        </div>
      </section>

      {/* Core Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white">
              Securing Brand Equity with Uncompromising Excellence
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In 2018, we saw a fatal flaw in the legal registry landscape: companies were forced to choose between highly slow, traditional law firms charging astronomical retainers, or robotic online document filing websites that offered zero strategic advice.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We built IPMASTER to bridge that gap. We utilize advanced legal-tech check systems to scan Nice Classes, phonetic databases, and opposition registers immediately, while ensuring each file is curated and hand-signed by registered patent agents and intellectual property attorneys.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-card/40 border border-gray-100 dark:border-border rounded-xl">
                <History className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white">8+ Years</div>
                  <div className="text-[10px] text-muted-foreground">Expert Legal Service</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-card/40 border border-gray-100 dark:border-border rounded-xl">
                <BookmarkCheck className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white">15,000+</div>
                  <div className="text-[10px] text-muted-foreground">Applications Filed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border flex flex-col gap-4">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent w-fit">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Uncompromising Honesty</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                If your brand name has a 90% chance of registry rejection, we tell you immediately before you pay government fees. We assist in strategizing suffix additions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border flex flex-col gap-4">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent w-fit">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Ironclad Confidentiality</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                We handle early-stage proprietary technology specifications, code structures, and trade secrets under strict NDAs, securing complete privacy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border flex flex-col gap-4">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent w-fit">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Accredited Excellence</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Our in-house attorneys and agents are registered members of the Bar Council of India and the Trademark Registry Office, holding legal credentials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border flex flex-col gap-4">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent w-fit">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Founder-First Speed</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                We understand that VC funding, domain acquisitions, and enterprise contract deadlines wait for no one. We ensure express filing options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Board */}
      <section className="py-20 border-t border-gray-150 dark:border-white/5 bg-slate-50 dark:bg-card/10 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">Our Leaders</div>
            <h2 className="text-3xl font-extrabold text-primary dark:text-white">
              Governed by Qualified IP Counsel
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Meet the experienced legal minds directing our registry consultations and application defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl bg-white dark:bg-card border border-gray-150 dark:border-border shadow-sm flex flex-col sm:flex-row gap-6"
              >
                <div className="h-20 w-20 rounded-full overflow-hidden bg-slate-100 shrink-0 self-center sm:self-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="text-base font-bold text-primary dark:text-white">{member.name}</h3>
                    <div className="text-[10px] text-accent font-bold uppercase tracking-wider mt-0.5">{member.role}</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pt-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-white leading-tight">
          Protect your business assets with top legal advisory
        </h2>
        <p className="text-xs text-muted-foreground max-w-xl">
          Consult with Advocated and Trademark Agents for free. Understand your legal strength before proceeding.
        </p>
        <Link
          href="/booking"
          className="px-8 py-3.5 text-xs font-bold rounded-xl bg-accent text-black hover:bg-accent/90 transition-all shadow-lg"
        >
          Book Your Free Consult
        </Link>
      </section>
    </div>
  );
}
