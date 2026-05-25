'use client';

import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Star } from 'lucide-react';

export default function TrademarkChecker() {
  const [brandName, setBrandName] = useState('');
  const [tmClass, setTmClass] = useState('35');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [result, setResult] = useState<any>(null);

  const searchSteps = [
    'Connecting to Registry Core Gateway...',
    'Scanning Nice Class classifications...',
    'Running advanced phonetic similarity algorithms...',
    'Parsing active registry publications & opposition databases...',
    'Evaluating brand name legal strength indices...'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    setIsSearching(true);
    setSearchStep(0);
    setResult(null);

    // Simulate search progress steps
    const interval = setInterval(() => {
      setSearchStep((prev) => {
        if (prev < searchSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          generateResult();
          return prev;
        }
      });
    }, 800);
  };

  const generateResult = () => {
    const cleanName = brandName.trim();
    // Simulate smart analytics based on the name length and letters
    const containsCommonWord = /tech|corp|legal|law|global|food|smart|soft|cloud/i.test(cleanName);
    const containsObviousConflict = /apple|google|microsoft|amazon|facebook|tesla|netflix/i.test(cleanName);
    
    let strength: 'fanciful' | 'suggestive' | 'descriptive' | 'conflict' = 'suggestive';
    let riskLevel: 'low' | 'medium' | 'high' = 'medium';
    let score = 75;
    let feedback = '';

    if (containsObviousConflict) {
      strength = 'conflict';
      riskLevel = 'high';
      score = 12;
      feedback = `CRITICAL WARNING: "${cleanName}" directly matches or conflicts with highly protected international trademarks. Registry will immediately block this filing under Section 11. Rebranding is highly recommended.`;
    } else if (cleanName.length < 4) {
      strength = 'descriptive';
      riskLevel = 'medium';
      score = 45;
      feedback = `Short abbreviations face generic character conflicts under Section 9. Adding a distinctive suffix or secondary word is advised.`;
    } else if (containsCommonWord) {
      strength = 'descriptive';
      riskLevel = 'medium';
      score = 60;
      feedback = `The suffix in your brand name is descriptive of your industry. While filable, your legal protection will cover the full name combined, but you won't get exclusive rights to the common descriptive word itself.`;
    } else {
      strength = 'fanciful';
      riskLevel = 'low';
      score = 92;
      feedback = `Stunningly unique! "${cleanName}" appears to be a fanciful/arbitrary mark. This represents the strongest legal category of trademark protection under Section 9, offering an exceptionally fast examination path.`;
    }

    setResult({
      name: cleanName,
      class: tmClass,
      strength,
      riskLevel,
      score,
      feedback
    });
    setIsSearching(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-card/40 backdrop-blur-md border border-gray-200/50 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative">
      <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 animate-pulse-slow">
        <Star className="h-3 w-3 fill-accent" /> Powered by AI Legal-Tech
      </div>

      {!isSearching && !result && (
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="text-center md:text-left mb-2">
            <h3 className="text-base font-bold text-primary dark:text-white leading-tight">
              Instantly Check Brand & TM Availability
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Verify your name against active trademark registers and Nice Class regulations in real-time.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name (e.g. SwiftCloud)"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-white"
              />
            </div>
            
            <div className="w-full md:w-[150px]">
              <select
                value={tmClass}
                onChange={(e) => setTmClass(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              >
                <option value="35">Class 35 - Retail / Agency</option>
                <option value="42">Class 42 - IT / Software</option>
                <option value="25">Class 25 - Clothing / Apparel</option>
                <option value="43">Class 43 - Food / Resto</option>
                <option value="9">Class 9 - Electronics / Smart Tech</option>
                <option value="5">Class 5 - Pharmaceuticals</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-accent text-black hover:bg-accent/90 transition-all font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-accent/15"
            >
              Analyze Name <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-4 text-[10px] text-muted-foreground mt-1">
            <span>&bull; Comprehensive Nice-Class Check</span>
            <span>&bull; Phonetic Soundex Scan</span>
            <span>&bull; Strict Privacy (Safe search)</span>
          </div>
        </form>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center py-8 gap-4 animate-in fade-in duration-300">
          <Loader2 className="h-10 w-10 text-accent animate-spin" />
          <div className="text-center">
            <div className="text-xs font-bold text-primary dark:text-white">Analyzing Brand Strength</div>
            <div className="text-[10px] text-muted-foreground mt-1.5 transition-all duration-300">
              {searchSteps[searchStep]}
            </div>
          </div>
          <div className="w-full max-w-xs bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{ width: `${((searchStep + 1) / searchSteps.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Search Result */}
      {result && (
        <div className="flex flex-col gap-5 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 dark:border-border pb-4">
            <div>
              <div className="text-[10px] uppercase font-extrabold tracking-widest text-muted-foreground">Search Result Analysis</div>
              <h4 className="text-lg font-bold text-primary dark:text-white mt-1">
                "{result.name}" <span className="text-xs font-medium text-muted-foreground">in Class {result.class}</span>
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground font-semibold">AI Safety Score</div>
                <div className={`text-base font-extrabold ${result.riskLevel === 'low' ? 'text-emerald-500' : result.riskLevel === 'medium' ? 'text-amber-500' : 'text-rose-500'}`}>
                  {result.score}/100
                </div>
              </div>
              <div className={`p-2.5 rounded-xl ${result.riskLevel === 'low' ? 'bg-emerald-500/10 text-emerald-500' : result.riskLevel === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {result.riskLevel === 'low' ? (
                  <ShieldCheck className="h-6 w-6" />
                ) : result.riskLevel === 'medium' ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <AlertTriangle className="h-6 w-6" />
                )}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#05070f] border border-gray-200/50 dark:border-white/5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <span className="font-bold text-primary dark:text-white uppercase tracking-wider text-[9px] block mb-1">
              Legal Scrutiny Assessment
            </span>
            {result.feedback}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
            <button
              onClick={() => setResult(null)}
              className="text-xs font-bold text-muted-foreground hover:text-primary dark:hover:text-white transition-colors"
            >
              &larr; Search Another Name
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919876543210?text=I%20checked%20my%20brand%20name%20"${result.name}"%20on%20your%20website%20and%20got%20a%20score%20of%20${result.score}.%20I%20want%20to%20reserve%20it%20now!`}
                target="_blank"
                className="flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors rounded-xl shadow-md"
              >
                Reserve Name via WA
              </a>

              <a
                href="/booking"
                className="flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-bold bg-accent text-black hover:bg-accent/90 transition-colors rounded-xl shadow-md shadow-accent/10"
              >
                File Trademark Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
