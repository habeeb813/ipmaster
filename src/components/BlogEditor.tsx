'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  HelpCircle, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon, 
  Layers, 
  Compass, 
  BookOpen, 
  Clock,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { cmsDb } from '@/data/cmsDb';
import { BlogPost } from '@/data/blogs';

interface BlogEditorProps {
  editSlug?: string;
}

export default function BlogEditor({ editSlug }: BlogEditorProps) {
  const router = useRouter();
  const isEditMode = !!editSlug;

  // 1. Form States
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80');
  const [category, setCategory] = useState('Trademarks');
  const [publishedAt, setPublishedAt] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [authorName, setAuthorName] = useState('Adv. Neha Sharma');
  const [authorRole, setAuthorRole] = useState('Head of Intellectual Property');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80');
  
  // FAQs block builder states
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Status settings
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [scheduledDate, setScheduledDate] = useState('');

  // Editor Toolbar helper
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  // Load Categories & Populate Initial Data (If Editing)
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategoriesList(data);
        if (data.length > 0 && !category) {
          setCategory(data[0]);
        }
      })
      .catch(console.error);
    
    if (isEditMode && editSlug) {
      fetch(`/api/blogs/${editSlug}`)
        .then(res => res.json())
        .then(post => {
          if (post) {
            setTitle(post.title);
            setSlug(post.slug);
            setExcerpt(post.excerpt);
            setContent(post.content);
            setImageUrl(post.imageUrl);
            setCategory(post.category);
            setReadTime(post.readTime);
            setMetaTitle(post.metaTitle);
            setMetaDescription(post.metaDescription);
            setKeywordsInput(post.keywords.join(', '));
            setAuthorName(post.author.name);
            setAuthorRole(post.author.role);
            setAuthorAvatar(post.author.avatar);
            setFaqs(post.faqBlock || []);

            const isDraft = post.publishedAt.toLowerCase().includes('draft') || post.metaDescription.toLowerCase().includes('draft');
            setStatus(isDraft ? 'Draft' : 'Published');
            setPublishedAt(post.publishedAt);
          }
        })
        .catch(console.error);
    }
  }, [isEditMode, editSlug]);

  // Auto-generate Slug & Metatags from Title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditMode) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
      setMetaTitle(`${val} | IPMASTER`);
    }
  };

  // Add FAQ Item to stack
  const handleAddFaq = () => {
    if (!newQuestion || !newAnswer) return;
    setFaqs([...faqs, { question: newQuestion, answer: newAnswer }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  // Content Toolbar Actions
  const insertFormatting = (type: string) => {
    const textarea = document.getElementById('blog-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    let replacement = '';
    switch (type) {
      case 'h2': replacement = `\n<h2>${selectedText || 'Sub-Heading Level 2'}</h2>\n`; break;
      case 'h3': replacement = `\n<h3>${selectedText || 'Sub-Heading Level 3'}</h3>\n`; break;
      case 'bold': replacement = `<strong>${selectedText || 'bold text'}</strong>`; break;
      case 'list': replacement = `\n<ul>\n  <li>${selectedText || 'List Item 1'}</li>\n  <li>List Item 2</li>\n</ul>\n`; break;
      case 'code': replacement = `\n<pre><code>\n${selectedText || '// Code Block Here'}\n</code></pre>\n`; break;
      case 'quote': replacement = `\n<blockquote>${selectedText || 'Authoritative legal quote...'}</blockquote>\n`; break;
      case 'table': replacement = `\n<table class="min-w-full border">\n  <thead>\n    <tr><th class="border px-4 py-2">Header 1</th><th class="border px-4 py-2">Header 2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td class="border px-4 py-2">Cell 1</td><td class="border px-4 py-2">Cell 2</td></tr>\n  </tbody>\n</table>\n`; break;
      default: replacement = selectedText;
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setContent(newContent);
    
    // Auto recalculate read time
    const words = newContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const calculatedMins = Math.max(1, Math.round(words / 200));
    setReadTime(`${calculatedMins} min read`);
  };

  // Submit CRUD Save
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    // Build the post payload
    const postPayload: BlogPost = {
      slug,
      title,
      excerpt,
      content,
      imageUrl,
      category,
      publishedAt: status === 'Draft' ? 'Draft Pending' : (scheduledDate || publishedAt || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })),
      readTime,
      metaTitle: metaTitle || `${title} | IPMASTER`,
      metaDescription: metaDescription || excerpt,
      keywords: keywordsInput.split(',').map(k => k.trim()).filter(k => k.length > 0),
      author: {
        name: authorName,
        role: authorRole,
        avatar: authorAvatar
      },
      faqBlock: faqs
    };

    const token = localStorage.getItem('ipmaster_admin_token');
    const url = isEditMode && editSlug ? `/api/blogs/${editSlug}` : '/api/blogs';
    const method = isEditMode && editSlug ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postPayload)
      });

      if (res.ok) {
        router.push('/admin/blogs');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save publication.');
      }
    } catch (err) {
      console.error(err);
      alert('Connection error.');
    }
  };

  return (
    <form onSubmit={handleSavePost} className="flex flex-col gap-8">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-3xl border border-gray-150 dark:border-border/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => router.push('/admin/blogs')}
            className="p-2 bg-slate-50 dark:bg-[#05070f] border border-gray-150 dark:border-border/60 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-muted-foreground" />
          </button>
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-extrabold text-primary dark:text-white leading-tight">
              {isEditMode ? 'Edit Publication' : 'Draft New Publication'}
            </h1>
            <p className="text-xs text-muted-foreground">Draft and configure organic search queries with live Google snippet previews.</p>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-accent text-black font-extrabold text-xs rounded-xl hover:bg-accent/90 transition-all flex items-center gap-2 shadow-md shadow-accent/5"
        >
          <Save className="h-4 w-4" /> {isEditMode ? 'Save Edits' : 'Publish Article'}
        </button>
      </div>

      {/* Main Form Fields Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Columns: Text & Content Fields */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Article Info Card */}
          <div className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-slate-50 dark:border-border/40">
              Article Scope Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to Register a Trademark in India"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Unique Slug URL</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-[10px] text-muted-foreground font-bold">/blog/</span>
                  <input
                    type="text"
                    required
                    placeholder="how-to-register-a-trademark"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    className="w-full pl-12 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Short Excerpt (Meta description base)</label>
              <textarea
                rows={2}
                required
                placeholder="A compelling brief explaining class details, registration steps, or official guidelines..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-50 dark:border-border/40">
              <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">
                Rich Publication Content
              </h3>
              
              <div className="flex gap-1 bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1.5 text-[9px] font-bold rounded-lg transition-all ${
                    activeTab === 'edit' ? 'bg-accent text-black shadow' : 'text-muted-foreground'
                  }`}
                >
                  Code/Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 text-[9px] font-bold rounded-lg transition-all ${
                    activeTab === 'preview' ? 'bg-accent text-black shadow' : 'text-muted-foreground'
                  }`}
                >
                  HTML Preview
                </button>
              </div>
            </div>

            {activeTab === 'edit' ? (
              <div className="flex flex-col gap-3">
                {/* Formatting Toolbar */}
                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-[#05070f] border border-gray-150 dark:border-border rounded-xl">
                  <button type="button" onClick={() => insertFormatting('h2')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">H2</button>
                  <button type="button" onClick={() => insertFormatting('h3')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">H3</button>
                  <button type="button" onClick={() => insertFormatting('bold')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">B</button>
                  <button type="button" onClick={() => insertFormatting('list')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">List</button>
                  <button type="button" onClick={() => insertFormatting('code')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">Code</button>
                  <button type="button" onClick={() => insertFormatting('quote')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">Quote</button>
                  <button type="button" onClick={() => insertFormatting('table')} className="px-2 py-1 bg-white dark:bg-card hover:bg-slate-100 rounded text-[9px] font-bold border border-gray-200 dark:border-white/5">Table</button>
                </div>

                <textarea
                  id="blog-textarea"
                  rows={14}
                  required
                  placeholder="<h2>Enter Subheading</h2><p>Write your detailed legislative information, Nice Class catalogs, or registration fees here using semantic HTML tags...</p>"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-3 text-xs font-mono bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-emerald-400 resize-none"
                />
              </div>
            ) : (
              <div 
                className="prose dark:prose-invert min-h-[340px] max-h-[480px] overflow-y-auto px-4 py-3 bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl text-xs md:text-sm"
                dangerouslySetInnerHTML={{ __html: content || '<p className="text-muted-foreground italic">No HTML content drafted yet. Use editor tab to write copy.</p>' }}
              />
            )}
          </div>

          {/* FAQ Schema Accordion blocks Builder */}
          <div className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-slate-50 dark:border-border/40">
              Interactive Q&A FAQ Blocks
            </h3>

            {/* List current added FAQs */}
            {faqs.length > 0 && (
              <div className="flex flex-col gap-3">
                {faqs.map((f, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-[#05070f] border border-gray-100 dark:border-border/60 rounded-xl flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1 text-[11px]">
                      <strong className="text-primary dark:text-white leading-tight">Q: {f.question}</strong>
                      <p className="text-muted-foreground leading-normal mt-0.5">A: {f.answer}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add new FAQ inputs */}
            <div className="p-4 bg-slate-50 dark:bg-[#05070f] border border-dashed border-gray-200 dark:border-border rounded-xl flex flex-col gap-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Proposed FAQ Question</label>
                <input
                  type="text"
                  placeholder="e.g. Can I file a trademark for an app logo?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-card border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Proposed FAQ Answer</label>
                <textarea
                  rows={2}
                  placeholder="Yes, logos can be registered under Nice Class 9 (software) and Class 42 (IT development services)..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-card border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="self-end px-4 py-2 bg-slate-100 dark:bg-card border border-gray-200 dark:border-white/5 hover:bg-slate-200 text-primary dark:text-white font-bold text-[9px] rounded-lg transition-all flex items-center gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" /> Append FAQ Block
              </button>
            </div>
          </div>

        </div>

        {/* Right Columns: Meta & Publishing Controls */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Status Controls */}
          <div className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-slate-50 dark:border-border/40">
              Publishing Options
            </h3>

            <div className="flex gap-2 p-1 bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl">
              <button
                type="button"
                onClick={() => setStatus('Published')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  status === 'Published' ? 'bg-accent text-black shadow' : 'text-muted-foreground'
                }`}
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setStatus('Draft')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  status === 'Draft' ? 'bg-accent text-black shadow' : 'text-muted-foreground'
                }`}
              >
                Draft
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Schedule Publish (Optional)</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              />
            </div>
          </div>

          {/* Curated Details settings */}
          <div className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-slate-50 dark:border-border/40">
              Taxonomy Settings
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Selected Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Keywords / Tags (Comma separated)</label>
              <input
                type="text"
                placeholder="trademark, ip class, govt fees, nice classifications"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Featured Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Read Duration index</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none text-slate-800 dark:text-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* Google SEO Snippet Simulator */}
          <div className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl flex flex-col gap-4 shadow-sm">
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-slate-50 dark:border-border/40 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent" /> Google Search SERP Snippet Preview
            </h3>

            {/* Simulated Desktop Google result */}
            <div className="p-4 bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-2xl flex flex-col gap-1.5 leading-normal shadow-inner">
              <div className="text-[10px] text-[#202124] dark:text-[#bdc1c6] flex items-center gap-1">
                <span>ipmaster.in</span>
                <span>&rsaquo;</span>
                <span className="text-[9px]">blog</span>
                <span>&rsaquo;</span>
                <span className="text-[9px] text-[#5f6368] dark:text-[#969ba1] truncate max-w-[120px]">{slug || 'post-slug'}</span>
              </div>
              <strong className="text-[13px] font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate max-w-full">
                {metaTitle || `${title || 'Article Title'} | IPMASTER`}
              </strong>
              <p className="text-[11px] text-[#4d5156] dark:text-[#bdc1c6] line-clamp-3 leading-relaxed mt-0.5">
                {metaDescription || excerpt || 'Draft an excerpt or meta description above to preview how this publication will appear inside search engine result snippets.'}
              </p>
            </div>

            {/* Custom SEO Inputs */}
            <div className="flex flex-col gap-3 mt-2 border-t border-slate-100 dark:border-border/60 pt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Custom Meta Title</label>
                <input
                  type="text"
                  placeholder="e.g. Trademark Class Search Guides | IPMASTER"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Custom Meta Description</label>
                <textarea
                  rows={2}
                  placeholder="Custom search snippet description (ideally between 120 and 160 characters)..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white resize-none"
                />
              </div>

              <div className="text-[9px] text-muted-foreground leading-normal flex items-center gap-1.5 pl-1">
                <LinkIcon className="h-3.5 w-3.5 text-accent" /> Dynamic Sitemap.xml will automatically index this slug after publishing.
              </div>
            </div>
          </div>

        </div>

      </div>

    </form>
  );
}
