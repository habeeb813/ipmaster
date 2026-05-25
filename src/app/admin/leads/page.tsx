'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, AlertCircle, Trash2, Calendar, Clock, Phone, Mail, Award } from 'lucide-react';
import { cmsDb, Lead } from '@/data/cmsDb';

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchLeads = async () => {
    const token = localStorage.getItem('ipmaster_admin_token');
    try {
      const res = await fetch('/api/leads', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

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
        fetchLeads();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update lead status.');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('Are you absolutely sure you want to delete this consultation coordinate record? This will permanently erase the lead history.')) {
      const token = localStorage.getItem('ipmaster_admin_token');
      try {
        const res = await fetch(`/api/leads?id=${id}`, {
          method: 'DELETE',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          fetchLeads();
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete lead.');
        }
      } catch (err) {
        console.error('Error deleting lead:', err);
      }
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-6 rounded-3xl border border-gray-150 dark:border-border/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-extrabold text-primary dark:text-white leading-tight">Consultation Leads Manager</h1>
          <p className="text-xs text-muted-foreground">Monitor intake appointments, manage client coordinates under NDA, and direct consultation pipelines.</p>
        </div>
      </div>

      {/* Filter and Search Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card border border-gray-150 dark:border-border/60 p-4 rounded-2xl shadow-sm">
        
        {/* Left Filter */}
        <div className="flex flex-col gap-1 w-full sm:w-[180px]">
          <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Status Pipeline</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="New">New Intake</option>
            <option value="Contacted">Contacted / Working</option>
            <option value="Closed">Closed / Converted</option>
          </select>
        </div>

        {/* Right Search Input */}
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-accent text-slate-800 dark:text-white font-medium shadow-inner"
          />
        </div>

      </div>

      {/* Leads Pipeline Data Table */}
      <div className="bg-white dark:bg-card border border-gray-150 dark:border-border/60 rounded-3xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-w-full">
          <table className="min-w-full divide-y divide-gray-150 dark:divide-border/60 text-xs">
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-2">Client Details</th>
                <th className="py-3 px-2">Requested Service</th>
                <th className="py-3 px-2">Preferred Calendar Slot</th>
                <th className="py-3 px-2">Follow-up Pipeline</th>
                <th className="py-3 px-2">Created At</th>
                <th className="py-3 px-2 text-right">Admin Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-border/40 text-slate-700 dark:text-slate-300">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex flex-col gap-1">
                      <strong className="text-primary dark:text-white font-bold leading-none">{lead.name}</strong>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3 w-3" /> {lead.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-[#05070f] text-primary dark:text-slate-300 border border-gray-100 dark:border-border rounded">
                      {lead.service.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex flex-col gap-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-bold text-primary dark:text-white"><Calendar className="h-3.5 w-3.5 text-accent" /> {lead.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {lead.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                      className={`px-3 py-1 text-[9px] font-extrabold uppercase rounded-full border focus:outline-none ${
                        lead.status === 'New' 
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                          : lead.status === 'Contacted'
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                      }`}
                    >
                      <option value="New">New Intake</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-4 px-2 text-[10px] text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground text-xs font-semibold">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="h-8 w-8 text-muted-foreground animate-pulse" />
                      Zero consultation forms match the specified filters.
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
