'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit, Trash2, ShieldCheck, AlertCircle, Save } from 'lucide-react';
import { cmsDb } from '@/data/cmsDb';
import { FAQ } from '@/data/faqs';

export default function AdminFaqManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Form Fields
  const [question, setQuestion] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [answer, setAnswer] = useState('');
  const [detailedAnswer, setDetailedAnswer] = useState('');

  // Editing state
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0 && !category) {
          setCategory(data[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchFaqs();
    fetchCategories();
  }, []);

  const handleQuestionChange = (val: string) => {
    setQuestion(val);
    if (!editSlug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!question || !slug || !answer) {
      setError('Please fill in all required question and answer details.');
      return;
    }

    const token = localStorage.getItem('ipmaster_admin_token');
    const payload = {
      slug,
      question,
      answer,
      detailedAnswer,
      category: category || (categories.length > 0 ? categories[0] : '')
    };

    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        fetchFaqs();
        // Clear form
        setQuestion('');
        setSlug('');
        setAnswer('');
        setDetailedAnswer('');
        setEditSlug(null);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save FAQ entry.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection failure.');
    }
  };

  const handleTriggerEdit = (faq: FAQ) => {
    setEditSlug(faq.slug);
    setQuestion(faq.question);
    setSlug(faq.slug);
    setCategory(faq.category);
    setAnswer(faq.answer);
    setDetailedAnswer(faq.detailedAnswer || '');
  };

  const handleDeleteFaq = async (slug: string) => {
    if (confirm('Are you absolutely sure you want to permanently erase this Q&A FAQ block? This will break any existing crawlers index links.')) {
      const token = localStorage.getItem('ipmaster_admin_token');
      try {
        const res = await fetch(`/api/faqs?slug=${encodeURIComponent(slug)}`, {
          method: 'DELETE',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          fetchFaqs();
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete FAQ entry.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditSlug(null);
    setQuestion('');
    setSlug('');
    setAnswer('');
    setDetailedAnswer('');
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-3xl border border-gray-150 dark:border-border/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold text-primary dark:text-white leading-tight">Q&A Knowledge Base Manager</h1>
          <p className="text-xs text-muted-foreground">Manage and structure client-side accordions and local Google FAQ schema definitions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-5 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-5 shadow-sm">
          <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-gray-150 dark:border-border/60">
            {editSlug ? 'Modify FAQ Entry' : 'Append FAQ Entry'}
          </h3>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSaveFaq} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Proposed Question</label>
              <input
                type="text"
                required
                placeholder="e.g. Can foreign startups register Indian patents?"
                value={question}
                onChange={(e) => handleQuestionChange(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">SEO Question URL Slug</label>
              <input
                type="text"
                required
                placeholder="can-foreign-startups-register-patents"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Related Practice Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Primary Summary Answer</label>
              <textarea
                rows={3}
                required
                placeholder="Yes, foreign startups can register under PCT national phase filing guidelines..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Detailed Analysis Answer (Optional)</label>
              <textarea
                rows={4}
                placeholder="Additional legal details, nice classifications table records, or government fees limits..."
                value={detailedAnswer}
                onChange={(e) => setDetailedAnswer(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
              />
            </div>

            <div className="flex gap-2">
              {editSlug && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-card border border-gray-200 dark:border-white/5 hover:bg-slate-200 text-primary dark:text-white font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex-grow py-2.5 rounded-xl bg-accent text-black font-extrabold text-xs hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Save className="h-4 w-4" /> {editSlug ? 'Save Changes' : 'Publish Q&A'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Existing List */}
        <div className="lg:col-span-7 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
          <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-gray-150 dark:border-border/60">
            Active verified Q&As ({faqs.length})
          </h3>

          <div className="flex flex-col gap-4 max-h-[640px] overflow-y-auto pr-1">
            {faqs.map((faq) => (
              <div
                key={faq.slug}
                className="p-4 bg-slate-50 dark:bg-[#05070f] border border-gray-150 dark:border-border/60 rounded-2xl flex justify-between items-start gap-4 hover:border-accent/20 transition-all"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-accent/10 text-accent shrink-0">
                      <HelpCircle className="h-4 w-4" />
                    </span>
                    <strong className="text-xs font-extrabold text-primary dark:text-white leading-snug">{faq.question}</strong>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed pl-7">{faq.answer}</p>
                  <div className="flex gap-2 pl-7 mt-1.5">
                    <span className="text-[8px] font-extrabold uppercase bg-white dark:bg-card px-2 py-0.5 rounded border border-gray-250 dark:border-white/5 text-muted-foreground">
                      Category: {faq.category}
                    </span>
                    <span className="text-[8px] font-extrabold uppercase bg-white dark:bg-card px-2 py-0.5 rounded border border-gray-250 dark:border-white/5 text-muted-foreground">
                      Slug: /faq/{faq.slug}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTriggerEdit(faq)}
                    className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-500 rounded-lg transition-all"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(faq.slug)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {faqs.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-xs font-semibold">
                No FAQ questions recorded in the database synchronizer.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
