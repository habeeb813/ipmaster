'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Menu, X, Sun, Moon, ChevronDown, Award, Shield, FileText } from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark for luxury feel
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Sync dark theme on mount
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'light' | 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#05070f]/80 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent/80 to-accent-blue/80 text-white shadow-md shadow-accent/10">
              <Scale className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg leading-tight text-primary dark:text-white">
                IP<span className="text-accent">MASTER</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                Legal & IP Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors py-2 text-primary dark:text-white/90">
                Services <ChevronDown className="h-4 w-4" />
              </button>
              {servicesDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-white dark:bg-card border border-gray-100 dark:border-border rounded-xl shadow-2xl p-4 grid grid-cols-1 gap-2 mt-2 transition-all duration-200">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-3 pb-2 border-b border-gray-100 dark:border-border mb-1">
                    Areas of Expertise
                  </div>
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted dark:hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="p-1.5 rounded bg-accent/10 text-accent dark:bg-accent/20">
                        {service.slug.includes('trademark') ? (
                          <Shield className="h-4 w-4" />
                        ) : service.slug.includes('copyright') || service.slug.includes('document') ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <Award className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-primary dark:text-white group-hover:text-accent transition-colors">
                          {service.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground line-clamp-1">
                          {service.shortDescription}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="mt-1 pt-2 border-t border-gray-100 dark:border-border text-center">
                    <Link
                      href="/services"
                      className="text-xs font-bold text-accent-blue hover:text-accent transition-colors"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent py-2 ${
                    isActive ? 'text-accent border-b-2 border-accent' : 'text-primary dark:text-white/90'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/5 hover:bg-muted dark:hover:bg-slate-800 text-primary dark:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            
            <Link
              href="/booking"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-slate-900 dark:bg-accent dark:text-black dark:hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/5 text-primary dark:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-gray-200 dark:border-white/5 text-primary dark:text-white transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-card border-b border-gray-200 dark:border-border shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-1">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pb-1 border-b border-gray-100 dark:border-border mb-2">
              Services
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs py-1.5 text-muted-foreground hover:text-accent font-medium"
                >
                  &bull; {service.title}
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="text-xs py-1.5 text-accent-blue hover:text-accent font-bold"
              >
                &raquo; View All Services
              </Link>
            </div>
          </div>

          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pb-1 border-b border-gray-100 dark:border-border mb-2">
            Navigation
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-medium py-1.5 transition-colors hover:text-accent ${
                pathname === link.href ? 'text-accent pl-2 border-l-2 border-accent' : 'text-primary dark:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-100 dark:border-border mt-2">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 rounded-lg bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-colors shadow-md"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
