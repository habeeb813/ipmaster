'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function WhatsAppCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showAttentionBadge, setShowAttentionBadge] = useState(false);

  useEffect(() => {
    // Show attention badge after 5 seconds to draw visual interest
    const timer = setTimeout(() => {
      setShowAttentionBadge(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Construct WhatsApp URL
    const phoneNumber = '919876543210';
    const encodedText = encodeURIComponent(
      `Hello IPMASTER team, I would like to consult regarding IP/Trademark registration. My query: ${message}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // Open in new window
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[320px] bg-white dark:bg-[#0b0f19] border border-gray-100 dark:border-border rounded-2xl shadow-2xl overflow-hidden mb-4 animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  WA
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">IPMASTER Legal Support</div>
                <div className="text-[10px] text-emerald-100">Typically replies within 5 mins</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 dark:bg-[#05070f] h-[180px] overflow-y-auto flex flex-col gap-3">
            <div className="max-w-[85%] bg-white dark:bg-card border border-gray-100 dark:border-border p-3 rounded-2xl rounded-tl-none shadow-sm text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              👋 Hello! Protect your brand identity today. Type your brand name or query below to consult instantly with an IP attorney over WhatsApp!
            </div>
            <div className="max-w-[85%] bg-white dark:bg-card border border-gray-100 dark:border-border p-3 rounded-2xl rounded-tl-none shadow-sm text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              🛡️ Trademark search is completely free.
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#0b0f19] border-t border-gray-100 dark:border-border flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your brand name..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowAttentionBadge(false);
        }}
        className="relative group p-4 rounded-full bg-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
        aria-label="Contact WhatsApp Support"
      >
        <MessageSquare className="h-6 w-6" />
        
        {/* Pulsing attention badge */}
        {showAttentionBadge && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[8px] font-bold items-center justify-center">1</span>
          </span>
        )}

        {/* Hover label */}
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap shadow-md">
          Chat with IP Specialist
        </span>
      </button>
    </div>
  );
}
