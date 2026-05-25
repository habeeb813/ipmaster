import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc
} from 'firebase/firestore';
import { BLOG_POSTS, BlogPost } from '@/data/blogs';
import { FAQS, FAQ } from '@/data/faqs';
import bcrypt from 'bcryptjs';

// Firebase Client Credentials (with safe local/demo configuration fallbacks)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "dummy-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "ipmaster-demo.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "ipmaster-demo",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "ipmaster-demo.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase client instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

/**
 * Emulates connectToDatabase from Mongoose
 */
export async function connectToDatabase() {
  try {
    await seedDatabase();
  } catch (err) {
    console.warn('Firebase firestore autoseeder skipped or pending network:', err);
  }
  return db;
}

// =========================================================
// 1. MONGOOSE QUERY EMULATOR CLASS FOR FIREBASE FIRESTORE
// =========================================================

class FirestoreQueryChain<T> implements PromiseLike<T[]> {
  private promise: Promise<T[]>;

  constructor(promise: Promise<T[]>) {
    this.promise = promise;
  }

  sort(sortObj: any): FirestoreQueryChain<T> {
    const key = Object.keys(sortObj)[0] || 'createdAt';
    const direction = sortObj[key]; // -1 = desc, 1 = asc
    
    const sortedPromise = this.promise.then(list => {
      return [...list].sort((a: any, b: any) => {
        let valA = a[key];
        let valB = b[key];

        // Safe date formatting conversion
        if (valA instanceof Date) valA = valA.getTime();
        else if (typeof valA === 'string' && Date.parse(valA)) valA = new Date(valA).getTime();
        
        if (valB instanceof Date) valB = valB.getTime();
        else if (typeof valB === 'string' && Date.parse(valB)) valB = new Date(valB).getTime();

        if (valA < valB) return direction === -1 ? 1 : -1;
        if (valA > valB) return direction === -1 ? -1 : 1;
        return 0;
      });
    });

    return new FirestoreQueryChain<T>(sortedPromise);
  }

  lean(): FirestoreQueryChain<T> {
    return this;
  }

  then<TResult1 = T[], TResult2 = never>(
    onfulfilled?: ((value: T[]) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }
}

class FirestoreCollection<T> {
  private colName: string;
  private fallbackData: T[];

  constructor(colName: string, fallbackData: T[] = []) {
    this.colName = colName;
    this.fallbackData = fallbackData;
  }

  find(filter: any = {}): FirestoreQueryChain<T> {
    const promise = (async () => {
      try {
        const colRef = collection(db, this.colName);
        const snapshot = await getDocs(colRef);
        const list = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            _id: doc.id,
            ...data,
            // Hydrate date structures if stored as Firestore timestamps
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt || new Date())
          };
        }) as T[];

        // Emulate basic MongoDB exact queries
        return list.filter(item => {
          for (const key in filter) {
            if (filter[key] !== undefined && (item as any)[key] !== filter[key]) {
              return false;
            }
          }
          return true;
        });
      } catch (err) {
        console.warn(`Firestore query for '${this.colName}' failed, falling back to local memory static data.`);
        return this.fallbackData;
      }
    })();

    return new FirestoreQueryChain<T>(promise);
  }

  async findOne(filter: any = {}): Promise<T | null> {
    const list = await this.find(filter);
    return list.length > 0 ? list[0] : null;
  }

  async countDocuments(filter: any = {}): Promise<number> {
    const list = await this.find(filter);
    return list.length;
  }

  async create(data: any): Promise<T> {
    try {
      const colRef = collection(db, this.colName);
      // Determine unique natural document identifiers
      const docId = data.username || data.slug || data.name || data._id || data.id;
      const cleanData = { ...data, createdAt: data.createdAt || new Date() };

      if (docId) {
        const docRef = doc(db, this.colName, String(docId));
        await setDoc(docRef, cleanData);
        return { id: docId, _id: docId, ...cleanData } as T;
      } else {
        const docRef = await addDoc(colRef, cleanData);
        return { id: docRef.id, _id: docRef.id, ...cleanData } as T;
      }
    } catch (err) {
      console.error(`Firestore write for '${this.colName}' failed:`, err);
      throw err;
    }
  }

  async findOneAndUpdate(filter: any, update: any, options: any = {}): Promise<T | null> {
    try {
      const target = await this.findOne(filter);
      const updateData = update.$set || update; // support mongoose $set format

      if (!target) {
        if (options.upsert) {
          const merged = { ...filter, ...updateData };
          return await this.create(merged);
        }
        return null;
      }

      const id = (target as any)._id || (target as any).slug || (target as any).name || (target as any).username;
      const docRef = doc(db, this.colName, String(id));

      const cleanUpdate: any = {};
      for (const k in updateData) {
        if (updateData[k] !== undefined) {
          cleanUpdate[k] = updateData[k];
        }
      }

      await updateDoc(docRef, cleanUpdate);
      return await this.findOne(filter);
    } catch (err) {
      console.error(`Firestore findOneAndUpdate failed:`, err);
      throw err;
    }
  }

  async deleteOne(filter: any = {}): Promise<{ deletedCount: number }> {
    try {
      const target = await this.findOne(filter);
      if (target) {
        const id = (target as any)._id || (target as any).slug || (target as any).name || (target as any).username;
        const docRef = doc(db, this.colName, String(id));
        await deleteDoc(docRef);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    } catch (err) {
      console.error(`Firestore deleteOne failed:`, err);
      throw err;
    }
  }

  // Lead-specific Mongoose methods emulation
  async findById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.colName, id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, _id: snap.id, ...snap.data() } as T;
      }
      return null;
    } catch (err) {
      const list = await this.find();
      return list.find((item: any) => item._id === id || item.id === id) || null;
    }
  }

  async findByIdAndUpdate(id: string, update: any, options: any = {}): Promise<T | null> {
    try {
      const docRef = doc(db, this.colName, id);
      const updateData = update.$set || update;
      
      const cleanUpdate: any = {};
      for (const k in updateData) {
        if (updateData[k] !== undefined) {
          cleanUpdate[k] = updateData[k];
        }
      }

      await updateDoc(docRef, cleanUpdate);
      return await this.findById(id);
    } catch (err) {
      console.error(`Firestore findByIdAndUpdate failed:`, err);
      throw err;
    }
  }

  async findByIdAndDelete(id: string): Promise<any> {
    try {
      const docRef = doc(db, this.colName, id);
      await deleteDoc(docRef);
      return { ok: true };
    } catch (err) {
      console.error(`Firestore findByIdAndDelete failed:`, err);
      throw err;
    }
  }
}

// =========================================================
// 2. MONGOOSE-LIKE CONSTRUCTABLE CLASS DEFINITIONS
// =========================================================

class MongooseModelBase {
  [key: string]: any;
  private _collection: FirestoreCollection<any>;

  constructor(data: any, collection: FirestoreCollection<any>) {
    Object.assign(this, data);
    this._collection = collection;
  }

  async save() {
    return await this._collection.create(this);
  }
}

export class UserModel extends MongooseModelBase {
  constructor(data: any) {
    super(data, usersCollection);
  }
}

export class BlogModel extends MongooseModelBase {
  constructor(data: any) {
    super(data, blogsCollection);
  }
}

export class CategoryModel extends MongooseModelBase {
  constructor(data: any) {
    super(data, categoriesCollection);
  }
}

export class FaqModel extends MongooseModelBase {
  constructor(data: any) {
    super(data, faqsCollection);
  }
}

export class LeadModel extends MongooseModelBase {
  constructor(data: any) {
    super(data, leadsCollection);
  }
}

// Instantiated underlying Firestore collections
const usersCollection = new FirestoreCollection<any>('users');
const blogsCollection = new FirestoreCollection<BlogPost>('blogs', BLOG_POSTS);
const categoriesCollection = new FirestoreCollection<any>('categories', [
  { name: 'Trademarks' },
  { name: 'Patents' },
  { name: 'Copyrights' },
  { name: 'Brand Protection' },
  { name: 'Startup Compliance' }
]);
const faqsCollection = new FirestoreCollection<FAQ>('faqs', FAQS);

const initialMockLeads = [
  {
    _id: 'aravind-lead-123',
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
    _id: 'priyanka-lead-456',
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
    _id: 'devendra-lead-789',
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
const leadsCollection = new FirestoreCollection<any>('leads', initialMockLeads);

// =========================================================
// 3. EXPORT COMPATIBLE WRAPPER OBJECTS (CONSTRUCTORS + QUERIES)
// =========================================================

export const User = Object.assign(UserModel, usersCollection) as typeof UserModel & FirestoreCollection<any>;
export const Blog = Object.assign(BlogModel, blogsCollection) as typeof BlogModel & FirestoreCollection<BlogPost>;
export const Category = Object.assign(CategoryModel, categoriesCollection) as typeof CategoryModel & FirestoreCollection<any>;
export const Faq = Object.assign(FaqModel, faqsCollection) as typeof FaqModel & FirestoreCollection<FAQ>;
export const Lead = Object.assign(LeadModel, leadsCollection) as typeof LeadModel & FirestoreCollection<any>;

// =========================================================
// 4. AUTOMATIC DATABASE SEEDER (FIRESTORE)
// =========================================================

async function seedDatabase() {
  try {
    // 1. Seed Admin User
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('ipmaster123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'Super Administrator',
        createdAt: new Date()
      });
      console.log('Successfully seeded Super Admin (admin / ipmaster123) inside Firestore.');
    }

    // 2. Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      for (const p of BLOG_POSTS) {
        await Blog.create(p);
      }
      console.log('Seeded default blog posts inside Firestore.');
    }

    // 3. Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const initialCategories = ['Trademarks', 'Patents', 'Copyrights', 'Brand Protection', 'Startup Compliance'];
      for (const cat of initialCategories) {
        await Category.create({ name: cat });
      }
      console.log('Seeded dynamic taxonomy categories inside Firestore.');
    }

    // 4. Seed FAQs
    const faqCount = await Faq.countDocuments();
    if (faqCount === 0) {
      for (const f of FAQS) {
        await Faq.create(f);
      }
      console.log('Seeded dynamic FAQ questions inside Firestore.');
    }

    // 5. Seed Leads
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      for (const l of initialMockLeads) {
        await Lead.create(l);
      }
      console.log('Seeded active consultation leads inside Firestore.');
    }
  } catch (err) {
    console.error('Error checking or seeding Firebase Firestore database:', err);
  }
}
