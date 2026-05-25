'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FolderHeart, 
  HelpCircle, 
  Users, 
  Image as ImageIcon, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Handle Auth and Dark Mode Sync on Mount
  useEffect(() => {
    // Check local token
    const token = localStorage.getItem('ipmaster_admin_token');
    const isLoginPage = pathname === '/admin/login';
    
    if (token) {
      setIsAuthenticated(true);
      if (isLoginPage) {
        router.push('/admin');
      }
    } else {
      setIsAuthenticated(false);
      if (!isLoginPage) {
        router.push('/admin/login');
      }
    }

    // Sync theme
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme as 'light' | 'dark');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [pathname, router]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ipmaster_admin_token');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  // If on login page, render child component immediately without Sidebar wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Prevent flash before authentication check completes
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#05070f] text-xs text-muted-foreground font-semibold">
        Verifying Security Credentials...
      </div>
    );
  }

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Blog Management', path: '/admin/blogs', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: FolderHeart },
    { name: 'Q&A / FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Consultation Leads', path: '/admin/leads', icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#05070f] text-slate-800 dark:text-slate-200 transition-colors duration-250">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-card border-r border-gray-150 dark:border-border/60 flex flex-col justify-between transform transition-transform duration-250 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col gap-6">
          {/* Sidebar Header */}
          <div className="h-16 px-6 border-b border-gray-150 dark:border-border/60 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <span className="font-extrabold text-sm uppercase tracking-widest text-primary dark:text-white">IPMASTER CMS</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5">
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-3 px-4.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-accent text-black shadow-md shadow-accent/5' 
                      : 'text-muted-foreground hover:text-primary dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-150 dark:border-border/60 flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              Theme Mode
            </span>
            <span className="capitalize text-[10px] bg-slate-150 dark:bg-card px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">{theme}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4.5 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            Admin Logout
          </button>
        </div>
      </aside>

      {/* Main Container Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Header bar */}
        <header className="h-16 bg-white dark:bg-card border-b border-gray-150 dark:border-border/60 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-gray-250 dark:border-border/60 text-muted-foreground hover:bg-slate-50 dark:hover:bg-white/5"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <div className="text-[10px] text-muted-foreground font-semibold bg-slate-100 dark:bg-[#05070f] border border-gray-200 dark:border-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Desk Session Active
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-extrabold text-primary dark:text-white leading-none">Super Administrator</span>
              <span className="text-[9px] text-accent font-bold uppercase tracking-wider mt-0.5">Role: BCI Advocate Partner</span>
            </div>
          </div>
        </header>

        {/* Content Portal Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
