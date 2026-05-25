'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/data/blogs';

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Trademarks', 'Patents', 'Copyrights', 'Brand Protection', 'Startup Compliance'];

  React.useEffect(() => {
    async function loadLiveBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPosts(data);
          }
        }
      } catch (err) {
        console.warn('Could not load live blog entries, using static fallback.', err);
      }
    }
    loadLiveBlogs();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.keywords && post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts[0] || BLOG_POSTS[0];

  return (
    <div className="relative pb-20">
      {/* Decorative Gradients */}
      <div className="absolute top-[-100px] right-[10%] w-[350px] h-[350px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Banner */}
      <section className="bg-slate-50 dark:bg-card/20 border-b border-gray-150 dark:border-border/60 py-16 w-full">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-4">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent font-semibold">IPMASTER Legal Blog</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary dark:text-white leading-tight">
            Intellectual Property Insights & Legal Analysis
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Stay updated with expert articles explaining Nice Classes, trademark search procedures, patent drafting guidelines, and startup tax concession policies.
          </p>
        </div>
      </section>

      {/* Search and Categories bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 w-full">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-card border border-gray-150 dark:border-border p-4 rounded-2xl shadow-sm">
          
          {/* Categories select */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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
              placeholder="Search articles & keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-xl focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
            />
          </div>

        </div>
      </section>

      {/* Featured Article - only show if search query is empty and we are looking at All category */}
      {searchQuery === '' && selectedCategory === 'All' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-card border border-gray-150 dark:border-border rounded-3xl overflow-hidden shadow-md">
            
            <div className="lg:col-span-7 h-64 lg:h-96 bg-slate-800 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-accent text-black text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                Featured Article
              </span>
            </div>

            <div className="lg:col-span-5 p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold">
                  <span>{featuredPost.publishedAt}</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-extrabold text-primary dark:text-white group-hover:text-accent transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-150 dark:border-border/60">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-primary dark:text-white">{featuredPost.author.name}</div>
                    <div className="text-[8px] text-muted-foreground uppercase font-bold tracking-wider">{featuredPost.author.role}</div>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-blue hover:text-accent transition-colors"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between bg-white dark:bg-card border border-gray-150 dark:border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
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
                <div className="p-6 flex flex-col gap-2">
                  <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-2">
                    <span>{post.publishedAt}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xs font-bold text-primary dark:text-white group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-gray-50 dark:border-border/60 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-primary dark:text-slate-300">{post.author.name}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[10px] font-bold text-accent-blue hover:text-accent"
                >
                  Read &raquo;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-200 dark:border-border rounded-3xl flex flex-col items-center gap-3">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-base font-bold text-primary dark:text-white">No articles match your search</h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              We update our database weekly. Try searching broader keywords like "trademark", "patent" or "fees".
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
