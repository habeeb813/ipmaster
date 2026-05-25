import mongoose from 'mongoose';
import { BLOG_POSTS } from '@/data/blogs';
import { FAQS } from '@/data/faqs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ipmaster';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Seed initial data if database is empty
  await seedDatabase();

  return cached.conn;
}

// ==========================================
// 1. SCHEMAS & MODELS DEFINITIONS
// ==========================================

// --- USER SCHEMA (Admin) ---
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Super Administrator' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// --- BLOG SCHEMA ---
const BlogSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  publishedAt: { type: String, required: true },
  readTime: { type: String, required: true },
  faqBlock: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    }
  ],
  keywords: [{ type: String }],
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// --- CATEGORY SCHEMA ---
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// --- FAQ SCHEMA ---
const FaqSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  detailedAnswer: { type: String },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Faq = mongoose.models.Faq || mongoose.model('Faq', FaqSchema);

// --- LEAD SCHEMA ---
const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
});

export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

// ==========================================
// 2. AUTOMATIC DATABASE SEEDER
// ==========================================
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    // 1. Seed Admin User if not exists
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('ipmaster123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'Super Administrator',
      });
      console.log('Seeded default admin credentials (admin / ipmaster123)');
    }

    // 2. Seed Blogs if empty
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(BLOG_POSTS);
      console.log('Seeded default blogs');
    }

    // 3. Seed Categories if empty
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const initialCategories = ['Trademarks', 'Patents', 'Copyrights', 'Brand Protection', 'Startup Compliance'];
      await Category.insertMany(initialCategories.map(name => ({ name })));
      console.log('Seeded initial categories');
    }

    // 4. Seed FAQs if empty
    const faqCount = await Faq.countDocuments();
    if (faqCount === 0) {
      await Faq.insertMany(FAQS);
      console.log('Seeded default FAQs');
    }

    // 5. Seed Leads if empty
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      const mockLeads = [
        {
          name: 'Aravind Swamy',
          email: 'aravind@swamytech.io',
          phone: '+91 98450 12345',
          service: 'patent-filing',
          date: '2026-06-02',
          time: '11:00 AM',
          status: 'New',
          createdAt: new Date('2026-05-25T14:30:00Z')
        },
        {
          name: 'Priyanka Sen',
          email: 'priyanka@cosmederma.in',
          phone: '+91 99020 98765',
          service: 'trademark-registration',
          date: '2026-06-03',
          time: '03:30 PM',
          status: 'Contacted',
          createdAt: new Date('2026-05-24T09:15:00Z')
        },
        {
          name: 'Devendra Mehta',
          email: 'dev@mehtamanufacturing.com',
          phone: '+91 98800 55443',
          service: 'iso-certification',
          date: '2026-06-04',
          time: '10:00 AM',
          status: 'Closed',
          createdAt: new Date('2026-05-23T11:45:00Z')
        }
      ];
      await Lead.insertMany(mockLeads);
      console.log('Seeded default leads');
    }
  } catch (err) {
    console.error('Error during database seeding:', err);
  }
}
