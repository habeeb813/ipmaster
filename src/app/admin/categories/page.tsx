'use client';

import React, { useState, useEffect } from 'react';
import { FolderHeart, Plus, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import { cmsDb } from '@/data/cmsDb';

export default function AdminCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formatted = newCategory.trim();
    if (!formatted) return;

    if (categories.includes(formatted)) {
      setError('This category name already exists in the database.');
      return;
    }

    const token = localStorage.getItem('ipmaster_admin_token');
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: formatted })
      });
      if (res.ok) {
        fetchCategories();
        setNewCategory('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create category.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection failure.');
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    if (confirm(`Are you absolutely sure you want to delete the category "${cat}"? Blogs mapped to this category may face indexing issues.`)) {
      const token = localStorage.getItem('ipmaster_admin_token');
      try {
        const res = await fetch(`/api/categories?name=${encodeURIComponent(cat)}`, {
          method: 'DELETE',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          fetchCategories();
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete category.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-3xl border border-gray-150 dark:border-border/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold text-primary dark:text-white leading-tight">Practice Areas & Categories</h1>
          <p className="text-xs text-muted-foreground">Configure global legal-tech practice sectors and sitemap blog taxonomies.</p>
        </div>
      </div>

      {/* Categories Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Create Form */}
        <div className="lg:col-span-4 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-5 shadow-sm">
          <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-gray-150 dark:border-border/60">
            Append Practice Area
          </h3>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Category Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Patent Defenses"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-accent text-black font-extrabold text-xs hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-accent/5"
            >
              <Plus className="h-4 w-4" /> Save Category
            </button>
          </form>
        </div>

        {/* Right Column: Existing List */}
        <div className="lg:col-span-8 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
          <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-gray-150 dark:border-border/60">
            Active Registry Taxonomies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat}
                className="p-4 bg-slate-50 dark:bg-[#05070f] border border-gray-150 dark:border-border/60 rounded-2xl flex justify-between items-center transition-all hover:border-accent/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <FolderHeart className="h-4 w-4" />
                  </div>
                  <strong className="text-xs font-bold text-primary dark:text-white">{cat}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
