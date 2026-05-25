import { BLOG_POSTS, BlogPost } from './blogs';
import { FAQS, FAQ } from './faqs';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
}

// Initial Mock Leads to populate the admin panel with realistic data
const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Aravind Swamy',
    email: 'aravind@swamytech.io',
    phone: '+91 98450 12345',
    service: 'patent-filing',
    date: '2026-06-02',
    time: '11:00 AM',
    status: 'New',
    createdAt: '2026-05-25T14:30:00Z'
  },
  {
    id: 'lead-2',
    name: 'Priyanka Sen',
    email: 'priyanka@cosmederma.in',
    phone: '+91 99020 98765',
    service: 'trademark-registration',
    date: '2026-06-03',
    time: '03:30 PM',
    status: 'Contacted',
    createdAt: '2026-05-24T09:15:00Z'
  },
  {
    id: 'lead-3',
    name: 'Devendra Mehta',
    email: 'dev@mehtamanufacturing.com',
    phone: '+91 98800 55443',
    service: 'iso-certification',
    date: '2026-06-04',
    time: '10:00 AM',
    status: 'Closed',
    createdAt: '2026-05-23T11:45:00Z'
  }
];

const INITIAL_CATEGORIES = ['Trademarks', 'Patents', 'Copyrights', 'Brand Protection', 'Startup Compliance'];

export const cmsDb = {
  // --- BLOG POSTS CRUD ---
  getPosts(): BlogPost[] {
    if (typeof window === 'undefined') return BLOG_POSTS;
    const data = localStorage.getItem('ipmaster_blogs');
    if (!data) {
      localStorage.setItem('ipmaster_blogs', JSON.stringify(BLOG_POSTS));
      return BLOG_POSTS;
    }
    return JSON.parse(data);
  },

  getPostBySlug(slug: string): BlogPost | undefined {
    const posts = this.getPosts();
    return posts.find(p => p.slug === slug);
  },

  savePost(post: BlogPost): void {
    if (typeof window === 'undefined') return;
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.slug === post.slug);
    if (index >= 0) {
      posts[index] = post; // Update existing
    } else {
      posts.unshift(post); // Create new
    }
    localStorage.setItem('ipmaster_blogs', JSON.stringify(posts));
  },

  deletePost(slug: string): void {
    if (typeof window === 'undefined') return;
    const posts = this.getPosts();
    const filtered = posts.filter(p => p.slug !== slug);
    localStorage.setItem('ipmaster_blogs', JSON.stringify(filtered));
  },

  // --- FAQs CRUD ---
  getFaqs(): FAQ[] {
    if (typeof window === 'undefined') return FAQS;
    const data = localStorage.getItem('ipmaster_faqs');
    if (!data) {
      localStorage.setItem('ipmaster_faqs', JSON.stringify(FAQS));
      return FAQS;
    }
    return JSON.parse(data);
  },

  saveFaq(faq: FAQ): void {
    if (typeof window === 'undefined') return;
    const faqs = this.getFaqs();
    const index = faqs.findIndex(f => f.slug === faq.slug);
    if (index >= 0) {
      faqs[index] = faq;
    } else {
      faqs.push(faq);
    }
    localStorage.setItem('ipmaster_faqs', JSON.stringify(faqs));
  },

  deleteFaq(slug: string): void {
    if (typeof window === 'undefined') return;
    const faqs = this.getFaqs();
    const filtered = faqs.filter(f => f.slug !== slug);
    localStorage.setItem('ipmaster_faqs', JSON.stringify(filtered));
  },

  // --- LEADS CRUD ---
  getLeads(): Lead[] {
    if (typeof window === 'undefined') return MOCK_LEADS;
    const data = localStorage.getItem('ipmaster_leads');
    if (!data) {
      localStorage.setItem('ipmaster_leads', JSON.stringify(MOCK_LEADS));
      return MOCK_LEADS;
    }
    return JSON.parse(data);
  },

  saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): void {
    if (typeof window === 'undefined') return;
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    leads.unshift(newLead);
    localStorage.setItem('ipmaster_leads', JSON.stringify(leads));
  },

  updateLeadStatus(id: string, status: Lead['status']): void {
    if (typeof window === 'undefined') return;
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].status = status;
      localStorage.setItem('ipmaster_leads', JSON.stringify(leads));
    }
  },

  deleteLead(id: string): void {
    if (typeof window === 'undefined') return;
    const leads = this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem('ipmaster_leads', JSON.stringify(filtered));
  },

  // --- CATEGORIES CRUD ---
  getCategories(): string[] {
    if (typeof window === 'undefined') return INITIAL_CATEGORIES;
    const data = localStorage.getItem('ipmaster_categories');
    if (!data) {
      localStorage.setItem('ipmaster_categories', JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(data);
  },

  saveCategory(cat: string): void {
    if (typeof window === 'undefined') return;
    const cats = this.getCategories();
    if (!cats.includes(cat)) {
      cats.push(cat);
      localStorage.setItem('ipmaster_categories', JSON.stringify(cats));
    }
  },

  deleteCategory(cat: string): void {
    if (typeof window === 'undefined') return;
    const cats = this.getCategories();
    const filtered = cats.filter(c => c !== cat);
    localStorage.setItem('ipmaster_categories', JSON.stringify(filtered));
  }
};
