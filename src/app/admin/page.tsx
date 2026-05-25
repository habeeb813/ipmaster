'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Users, 
  HelpCircle, 
  FolderHeart, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { cmsDb, Lead } from '@/data/cmsDb';

export default function AdminDashboard() {
  const [blogsCount, setBlogsCount] = useState(0);
  const [faqsCount, setFaqsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('ipmaster_admin_token');
      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};

      try {
        // Fetch leads
        const leadsRes = await fetch('/api/leads', { headers });
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
        }

        // Fetch blogs
        const blogsRes = await fetch('/api/blogs');
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          setBlogsCount(blogsData.length);
        }

        // Fetch faqs
        const faqsRes = await fetch('/api/faqs');
        if (faqsRes.ok) {
          const faqsData = await faqsRes.json();
          setFaqsCount(faqsData.length);
        }

        // Fetch categories
        const catsRes = await fetch('/api/categories');
        if (catsRes.ok) {
          const catsData = await catsRes.json();
          setCategoriesCount(catsData.length);
        }
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    }
    loadData();
  }, []);

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const closedLeads = leads.filter(l => l.status === 'Closed').length;

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    const token = localStorage.getItem('ipmaster_admin_token');
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        // Reload leads list
        const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
        const leadsRes = await fetch('/api/leads', { headers });
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to remove this client coordinate lead record?')) return;
    const token = localStorage.getItem('ipmaster_admin_token');
    try {
      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
      const res = await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        // Reload leads list
        const leadsRes = await fetch('/api/leads', { headers });
        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const statCards = [
    { title: 'Total Blogs', value: blogsCount, icon: FileText, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
    { title: 'Total Q&As', value: faqsCount, icon: HelpCircle, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    { title: 'Practice Categories', value: categoriesCount, icon: FolderHeart, color: 'text-pink-500 bg-pink-500/10 border-pink-500/20' },
    { title: 'Consultation Leads', value: totalLeads, icon: Users, color: 'text-accent bg-accent/10 border-accent/20' },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-3xl border border-gray-150 dark:border-border/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-extrabold text-primary dark:text-white leading-tight">Registry Administration Dashboard</h1>
          <p className="text-xs text-muted-foreground">Manage your articles, categories, local FAQs, and client consultations from a centralized legal-tech desk.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/blogs/new"
            className="px-5 py-2.5 rounded-xl bg-accent text-black font-bold text-xs hover:bg-accent/90 transition-all shadow-md"
          >
            Create New Article
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title}
              className="p-6 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-2xl flex items-center justify-between shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{card.title}</span>
                <strong className="text-2xl font-extrabold text-primary dark:text-white leading-none">{card.value}</strong>
              </div>
              <div className={`p-3 rounded-2xl border shrink-0 ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics chart and workflow guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Leads Pipeline Workflow Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-6 shadow-sm">
          <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider pb-3 border-b border-gray-150 dark:border-border/60 flex items-center gap-2">
            <TrendingUp className="h-4.5 w-4.5 text-accent" /> Leads Pipeline Overview
          </h3>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500">
              <span className="flex items-center gap-2 text-xs font-bold">
                <Clock className="h-4 w-4" /> New Consultations
              </span>
              <strong className="text-base font-extrabold">{newLeads}</strong>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-500">
              <span className="flex items-center gap-2 text-xs font-bold">
                <AlertCircle className="h-4 w-4" /> Under Contact
              </span>
              <strong className="text-base font-extrabold">{contactedLeads}</strong>
            </div>

            <div className="flex justify-between items-center p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-500">
              <span className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="h-4 w-4" /> Completed Sessions
              </span>
              <strong className="text-base font-extrabold">{closedLeads}</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#05070f] border border-gray-100 dark:border-border/60 text-[10px] text-muted-foreground leading-relaxed">
            <span className="font-bold text-primary dark:text-white block mb-1 flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-accent" /> E-E-A-T Conversion Checklist:</span>
            Ensuring quick 2-hour response times to newly scheduled appointments will heavily improve conversion metrics and Google search ranking metrics.
          </div>
        </div>

        {/* Recent leads table */}
        <div className="lg:col-span-8 bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 flex flex-col gap-6 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-gray-150 dark:border-border/60">
            <h3 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">
              Recent Consultations Intake Pipeline
            </h3>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-blue hover:text-accent"
            >
              Manage All Leads <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto min-w-full">
            <table className="min-w-full divide-y divide-gray-150 dark:divide-border/60 text-xs">
              <thead>
                <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-2">Client</th>
                  <th className="py-3 px-2">Service</th>
                  <th className="py-3 px-2">Scheduled Slot</th>
                  <th className="py-3 px-2">Pipeline Status</th>
                  <th className="py-3 px-2 text-right">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-border/40 text-slate-700 dark:text-slate-300">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-2 flex flex-col gap-0.5">
                      <strong className="text-primary dark:text-white font-bold">{lead.name}</strong>
                      <span className="text-[10px] text-muted-foreground">{lead.phone}</span>
                    </td>
                    <td className="py-3.5 px-2 font-medium capitalize text-[11px]">{lead.service.replace('-', ' ')}</td>
                    <td className="py-3.5 px-2 flex flex-col gap-0.5">
                      <strong>{lead.date}</strong>
                      <span className="text-[10px] text-muted-foreground">{lead.time}</span>
                    </td>
                    <td className="py-3.5 px-2">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                        className={`px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-full border focus:outline-none ${
                          lead.status === 'New' 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            : lead.status === 'Contacted'
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg text-[9px] font-bold transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground text-xs font-semibold">
                      Zero client leads submitted in the database pipeline currently.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
