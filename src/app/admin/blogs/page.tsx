'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, Calendar, Clock, Eye, AlertCircle } from 'lucide-react';
import { cmsDb } from '@/data/cmsDb';
import { BlogPost } from '@/data/blogs';

export default function AdminBlogsList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All'); // 'All' | 'Published' | 'Draft'

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(['All', ...data]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const handleDeletePost = async (slug: string) => {
    if (confirm('Are you absolutely sure you want to permanently delete this article? This action is irreversible.')) {
      const token = localStorage.getItem('ipmaster_admin_token');
      try {
        const res = await fetch(`/api/blogs/${slug}`, {
          method: 'DELETE',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          fetchBlogs();
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete post.');
        }
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    // Check dynamic simulated drafts
    const isDraft = post.publishedAt.toLowerCase().includes('draft') || post.metaDescription.toLowerCase().includes('draft');
    const matchesStatus = selectedStatus === 'All' || 
                          (selectedStatus === 'Published' && !isDraft) ||
                          (selectedStatus === 'Draft' && isDraft);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-3xl border border-gray-150 dark:border-border/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold text-primary dark:text-white leading-tight">Article Management</h1>
          <p className="text-xs text-muted-foreground">Manage, edit, publish, or draft high-authority legal SEO articles for organic search ranking.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-black font-bold text-xs transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          <Plus className="h-4 w-4" /> Create New Article
        </Link>
      </div>

      {/* Filtering Actions bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-card border border-gray-150 dark:border-border/60 p-4 rounded-2xl shadow-sm">
        
        {/* Left Filters */}
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          <div className="flex flex-col gap-1 w-full sm:w-[160px]">
            <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Category Filter</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-[140px]">
            <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Status Filter</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published Only</option>
              <option value="Draft">Drafts Only</option>
            </select>
          </div>
        </div>

        {/* Right Search Input */}
        <div className="relative w-full lg:w-[280px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium shadow-inner"
          />
        </div>

      </div>

      {/* Blogs Data Table */}
      <div className="bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-w-full">
          <table className="min-w-full divide-y divide-gray-150 dark:divide-border/60 text-xs">
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-2">Article Detail</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Publishing Timeline</th>
                <th className="py-3 px-2">Simulated Status</th>
                <th className="py-3 px-2 text-right">Admin Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-border/40 text-slate-700 dark:text-slate-300">
              {filteredPosts.map((post) => {
                const isDraft = post.publishedAt.toLowerCase().includes('draft') || post.metaDescription.toLowerCase().includes('draft');
                return (
                  <tr key={post.slug} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-2 max-w-[320px]">
                      <div className="flex flex-col gap-1">
                        <strong className="text-primary dark:text-white font-bold leading-snug line-clamp-2">{post.title}</strong>
                        <span className="text-[10px] text-muted-foreground line-clamp-1">Slug: /blog/{post.slug}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#05070f] text-primary dark:text-slate-300 border border-gray-100 dark:border-border rounded">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-col gap-1 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {isDraft ? 'Pending' : post.publishedAt}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest ${
                        isDraft 
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25' 
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/25'
                      }`}>
                        {isDraft ? 'Draft' : 'Published'}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 bg-slate-50 dark:bg-card border border-gray-200 dark:border-white/5 hover:bg-slate-150 text-muted-foreground hover:text-primary rounded-lg transition-all"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                        <Link
                          href={`/admin/blogs/edit/${post.slug}`}
                          className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-500 rounded-lg transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.slug)}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground text-xs font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="h-8 w-8 text-muted-foreground" />
                      Zero publications match the specified filters.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
