'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2, AlertCircle, Key, User } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      localStorage.setItem('ipmaster_admin_token', data.token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid super-administrator credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070f] relative overflow-hidden px-4">
      {/* Decorative Blur Gradients */}
      <div className="absolute top-[-100px] left-[5%] w-[400px] h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[5%] w-[400px] h-[400px] bg-accent-blue/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md p-8 rounded-3xl bg-card border border-border/80 shadow-2xl relative flex flex-col gap-6">
        
        {/* Logo Banner */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-accent/10 text-accent rounded-2xl border border-accent/20">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">IPMASTER CMS GATEWAY</h1>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Authorized Advocates Only</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4.5 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-3 animate-shake">
            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials hints card */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] text-slate-300 leading-relaxed">
          <strong>Security Notice:</strong> Production access utilizes encrypted cryptographic tokens. For evaluation audits, use username <strong>admin</strong> and password <strong>ipmaster123</strong>.
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Admin Username</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#05070f] border border-border rounded-xl focus:outline-none focus:border-accent text-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Admin Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Security token password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#05070f] border border-border rounded-xl focus:outline-none focus:border-accent text-white font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-accent text-black hover:bg-accent/90 transition-all font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-accent/5 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying Security Hashing...
              </>
            ) : (
              <>Authorize Legal Desk</>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
