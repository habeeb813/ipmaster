export interface FAQItem {
  slug: string;
  question: string;
  answer: string;
  category: string;
  detailedAnswer?: string; // Long-form markdown or text for the dedicated Q&A page
}

export type FAQ = FAQItem;

export const FAQS: FAQItem[] = [
  {
    slug: 'what-is-a-trademark-and-why-do-i-need-one',
    question: 'What is a trademark and why do I need one?',
    category: 'Trademarks',
    answer: 'A trademark is a unique identity for your brand—such as a name, logo, or tagline. Registering it grants you exclusive statutory rights to use it nationally, preventing competitors from using similar marks and confusing consumers.',
    detailedAnswer: 'A trademark acts as a powerful intellectual property asset that uniquely identifies your products or services. By securing a trademark, you establish a legal barrier that prevents competitors from launching confusingly similar brands. It allows you to build brand equity, license your brand for royalties, secure domain name disputes, and file enforcement suits against counterfeiters. Without it, you operate at constant risk of a forced rebrand.'
  },
  {
    slug: 'how-long-does-trademark-registration-take',
    question: 'How long does the trademark registration process take?',
    category: 'Trademarks',
    answer: 'While we can file your application and get you the "TM" status within 24 hours, the full government registration process and issuance of the ® certificate typically takes 6 to 12 months, depending on examinations.',
    detailedAnswer: 'The moment your application is uploaded onto the IP India portal, you will receive an application number which allows you to start using the "TM" symbol immediately. However, the government review process involves detailed examination (taking 1-3 months), a mandatory public journal publication period (taking 4 months), and final certificate registration. If examiners raise objections or if third parties oppose, the timeline can extend beyond 12 months.'
  },
  {
    slug: 'what-is-the-difference-between-tm-and-r',
    question: 'What is the difference between TM and ® symbols?',
    category: 'Trademarks',
    answer: 'The TM symbol indicates that you claim proprietary rights over an unregistered brand name or that your application is pending. The ® symbol represents an officially registered trademark, which can only be used after receiving your government certificate.',
    detailedAnswer: 'Using the TM symbol is a declaration of ownership rights. Anyone can use it without approval. On the contrary, the ® symbol represents absolute statutory registration. Using the ® symbol without a valid, active registration certificate is a serious criminal offense under the Trade Marks Act, attracting heavy fines and potential legal prosecution.'
  },
  {
    slug: 'can-i-register-a-logo-and-brand-name-together',
    question: 'Can I register a brand name and a logo together in one application?',
    category: 'Trademarks',
    answer: 'Yes! You can register a "Device Mark" which contains both your brand name and logo in a single application. However, if you plan to change your logo styling in the future, filing a separate "Word Mark" is recommended for wider protection.',
    detailedAnswer: 'Registering a combination mark protects the name and visual emblem as they appear together. While cost-effective, it means your protection is bound to that exact visual layout. To secure maximum flexibility and prevent competitors from using your brand name in different styles, it is best practice to file a Word Mark (securing the letters themselves in any layout) and a separate Device Mark for the specific emblem.'
  },
  {
    slug: 'what-can-be-copyrighted',
    question: 'What types of creative works can be copyrighted?',
    category: 'Copyrights',
    answer: 'Copyrights protect original creative expressions, including software source code, digital applications, literary works, musical tracks, video recordings, artistic illustrations, and architectural blueprints.',
    detailedAnswer: 'Under copyright law, the expression of an idea is protected, not the idea itself. The work must be original and fixed in a tangible medium. Categorized classes include Literary Works (novels, articles, software code), Dramatic Works (scripts), Musical Works, Artistic Works (paintings, logos, websites), Cinematograph Films, and Sound Recordings. Copyright prevents unauthorized duplication or commercialization.'
  },
  {
    slug: 'how-long-does-copyright-protection-last',
    question: 'How long does copyright registration protection last?',
    category: 'Copyrights',
    answer: 'For individual creators, copyright protection lasts for the lifetime of the author plus 60 years in India (70 years in the US and Europe). For corporate authors, it is 60 years from the date of publication.',
    detailedAnswer: 'This exceptionally long duration makes copyright one of the most durable forms of intellectual property. Upon the expiration of the copyright term, the protected work falls into the public domain, allowing anyone to freely use, adapt, and distribute it without seeking permission or paying royalties.'
  },
  {
    slug: 'what-inventions-are-eligible-for-a-patent',
    question: 'What types of inventions are eligible for patent protection?',
    category: 'Patents',
    answer: 'To be eligible for a patent, your invention must be completely novel (new in the world), involve an inventive step (non-obvious to an industry expert), and have industrial utility (be useful and manufacturable).',
    detailedAnswer: 'A patent cannot protect raw ideas, natural laws, or abstract scientific theories. It must represent a concrete physical device, chemical composition, technical process, or mechanical improvement. It must be described in exhaustive detail so that a person skilled in the art can replicate it. In exchange for this public disclosure, you receive a 20-year legal monopoly.'
  },
  {
    slug: 'how-long-does-a-patent-last',
    question: 'How long is a patent valid and can it be renewed?',
    category: 'Patents',
    answer: 'A patent is valid for exactly 20 years from the date of filing. Unlike trademarks, patent protection cannot be renewed beyond this period, after which the technology enters the public domain.',
    detailedAnswer: 'This 20-year limitation is designed to balance the inventor\'s right to profit from their discovery with the public\'s interest in accessing advanced technologies. To maintain a patent during these 20 years, you must pay annual renewal fees (annuities) to the Patent Office.'
  },
  {
    slug: 'what-is-dpiit-recognition-in-startup-india',
    question: 'What is DPIIT recognition and why is it useful?',
    category: 'Corporate Compliance',
    answer: 'DPIIT recognition is an official certification granted to eligible startups by the Government of India. It unlocks massive tax exemptions, patent rebates up to 80%, relaxed bidding, and access to venture funds.',
    detailedAnswer: 'The Department for Promotion of Industry and Internal Trade (DPIIT) issues this certificate under the Startup India program. Recognized startups gain exemption from income tax under Section 80-IAC, exemptions from Angel Tax (Section 56(2)(viib)), fast-tracked patent examinations with 80% discount on filing, and 50% discount on trademarks, alongside self-certification under key environmental and labor regulations.'
  },
  {
    slug: 'who-needs-gst-registration',
    question: 'Who is legally required to obtain a GST registration?',
    category: 'Corporate Compliance',
    answer: 'GST registration is mandatory for service providers with annual turnovers exceeding ₹20 Lakhs, goods suppliers exceeding ₹40 Lakhs, and all e-commerce sellers regardless of turnover.',
    detailedAnswer: 'Even if your business does not meet these turnover limits, voluntary GST registration is highly recommended. It is required to open a corporate current bank account, permits you to claim Input Tax Credit (ITC) on all your operational software, computer equipment, and lease expenses, and builds credibility with large business clients who demand tax invoices.'
  }
];
