export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: 'Shield' | 'FileText' | 'Award' | 'Briefcase' | 'FileCode' | 'Scale' | 'Zap';
  category: 'Intellectual Property' | 'Business Compliance' | 'Corporate Registrations';
  benefits: string[];
  processSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  pricing: { title: string; cost: string; features: string[] }[];
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'trademark-registration',
    title: 'Trademark Registration',
    shortDescription: 'Protect your brand identity, logo, and slogan legally. Secure exclusive ownership and prevent copycats.',
    fullDescription: 'A trademark is a unique symbol, design, word, or phrase that distinguishes your brand from others in the marketplace. Registering a trademark gives you exclusive legal rights to use your brand name, logo, or tagline, and allows you to use the ® symbol upon successful registration. It acts as a powerful asset, building brand equity and protecting your business against unauthorized imitation or counterfeiting.',
    iconName: 'Shield',
    category: 'Intellectual Property',
    benefits: [
      'Exclusive brand ownership across your jurisdiction',
      'Legal protection against infringers and counterfeiters',
      'Creation of a valuable intangible asset for your company',
      'Permission to use the highly trusted ® symbol next to your brand',
      'Global brand protection potential and priority rights'
    ],
    processSteps: [
      { title: 'Trademark Search', description: 'Comprehensive search across official databases to check availability and ensure no prior conflicts exist.' },
      { title: 'Class Selection & Filing', description: 'Categorizing your goods/services into the correct classes (Nice Classification) and preparing the application.' },
      { title: 'Application Submission', description: 'Filing the trademark application with the registry to instantly secure a "TM" status and application number.' },
      { title: 'Examination & Publication', description: 'Responding to registry examinations and defending your mark during its publication in the official journal.' },
      { title: 'Registration Certificate', description: 'Receiving the official registration certificate, enabling the official transition to the ® symbol.' }
    ],
    faqs: [
      { question: 'What can be registered as a trademark?', answer: 'You can register brand names, logos, slogans, slogans, shapes of goods, sound marks, and even specific color combinations that distinguish your brand.' },
      { question: 'How long does the trademark registration process take?', answer: 'While filing is completed within 24 hours (allowing you to use the "TM" mark), the full registration process by the government registry typically takes 6 to 12 months, subject to examinations or public oppositions.' },
      { question: 'How long is a trademark valid?', answer: 'A registered trademark is valid for 10 years from the date of filing. It can be renewed indefinitely every 10 years through a simple renewal application.' }
    ],
    pricing: [
      { title: 'Startup/Individual Package', cost: '₹2,499 + Govt Fees', features: ['Trademark Search Report', 'Application Preparation', 'Single Class Filing', 'TM Status within 24 Hours', 'Email Support'] },
      { title: 'Premium Corporate Package', cost: '₹5,999 + Govt Fees', features: ['Multi-Class Strategic Advice', 'Comprehensive Search & Analysis', 'Express Filing Services', 'Examination Response Support', 'Dedicated Account Manager'] }
    ],
    metaTitle: 'Trademark Registration Online | Protect Your Brand Name & Logo',
    metaDescription: 'Secure your brand with professional online trademark registration. Complete search, legal class selection, application filing, and expert examination support.'
  },
  {
    slug: 'copyright-registration',
    title: 'Copyright Registration',
    shortDescription: 'Legally safeguard your original literary, artistic, musical, dramatic works, software, and creative content.',
    fullDescription: 'Copyright registration provides creators of original intellectual works with exclusive legal rights to reproduce, distribute, perform, display, and license their creations. It is highly recommended for software developers, authors, musicians, artists, and media houses to establish solid legal proof of ownership, enabling swift legal remedies and monetary damages in the event of plagiarism or unauthorized duplication.',
    iconName: 'FileText',
    category: 'Intellectual Property',
    benefits: [
      'Indisputable public record of your ownership',
      'Strong legal standing to sue infringers in a court of law',
      'Eligibility for statutory damages and attorney fees',
      'Monetization avenues via licensing, selling, or leasing rights',
      'Protects source code, novels, designs, music, and dramatic works'
    ],
    processSteps: [
      { title: 'Work Evaluation', description: 'Reviewing your creative work (source code, text, audio, art) to ensure it qualifies for copyright protection.' },
      { title: 'Filing & Submission', description: 'Preparing the application, uploading the work specimens, and submitting to the Copyright Office.' },
      { title: 'No-Objection Period', description: 'A mandatory 30-day waiting period during which third parties can raise objections to the filing.' },
      { title: 'Registry Examination', description: 'Copyright examiners review the originality of the work and check for compliance with copyright law.' },
      { title: 'Copyright Registration', description: 'Issuance of the Extracts from the Register of Copyrights, completing your legal protection.' }
    ],
    faqs: [
      { question: 'Is copyright registration mandatory for protection?', answer: 'No, copyright protection exists automatically from the moment a work is created in a tangible form. However, registration is absolutely critical to enforce your rights in court and obtain statutory damages.' },
      { question: 'How long does copyright protection last?', answer: 'For literary, dramatic, musical, and artistic works, copyright lasts for the lifetime of the author plus 60 years (in India) or 70 years (in the US/EU).' }
    ],
    pricing: [
      { title: 'Standard Creative Package', cost: '₹3,499 + Govt Fees', features: ['Work Scrutiny & Evaluation', 'Application Preparation', 'Filing with Copyright Office', 'Status Tracking Dashboard'] },
      { title: 'Software & Complex IP', cost: '₹7,999 + Govt Fees', features: ['Source Code Protection Strategy', 'Multi-Author Licensing Clauses', 'Corporate Assignment Deeds', 'End-to-End Legal Protection'] }
    ],
    metaTitle: 'Online Copyright Registration | Protect Software, Art & Literature',
    metaDescription: 'Register your copyright online. Protect source code, designs, musical tracks, and books with our expert legal IP team.'
  },
  {
    slug: 'patent-filing',
    title: 'Patent Filing',
    shortDescription: 'Secure exclusive rights for your innovative inventions, technical processes, and novel designs.',
    fullDescription: 'A patent is a sovereign right granted by the government to an inventor, giving them exclusive monopoly rights to prevent others from making, using, selling, or importing their invention for a limited period of time. Patent filing requires profound technical and legal expertise to draft claims that stand strong against litigation while maximizing commercial potential.',
    iconName: 'Zap',
    category: 'Intellectual Property',
    benefits: [
      '20-year legal monopoly over your technology or process',
      'Attract high-valuation venture capital and strategic partners',
      'Generate high-margin royalty streams through licensing',
      'Stop competitors from duplicating your technological edge',
      'Establish global priority rights for international expansion'
    ],
    processSteps: [
      { title: 'Patentability Search', description: 'Analyzing global scientific and patent databases to ensure your invention is novel, inventive, and industrially applicable.' },
      { title: 'Specification Drafting', description: 'Drafting the technical specification (provisional or complete) detailing claims, illustrations, and chemical/code logic.' },
      { title: 'Patent Filing', description: 'Filing the patent application with the Patent Office to secure a strict priority date.' },
      { title: 'Publication & Examination', description: 'The patent is officially published, followed by a detailed review by a patent examiner in response to our Request for Examination.' },
      { title: 'Patent Grant', description: 'Resolving objections raised in the First Examination Report (FER) and securing the official patent grant.' }
    ],
    faqs: [
      { question: 'What makes an invention patentable?', answer: 'To be patentable, an invention must be completely new (novelty), involve an inventive step (non-obviousness to an expert), and have utility (industrial application).' },
      { question: 'What is the difference between a Provisional and a Complete Patent?', answer: 'A Provisional Specification is filed quickly to secure an early priority date when the invention is still in development. A Complete Specification detailing all claims must be filed within 12 months thereafter.' }
    ],
    pricing: [
      { title: 'Patent Search & Draft Plan', cost: '₹9,999', features: ['Novelty Search Report', 'Patentability Opinion', 'Strategic Filing Roadmap', 'Provisional Draft Outline'] },
      { title: 'Full Patent Drafting & Filing', cost: '₹24,999 + Govt Fees', features: ['Complete Specification Drafting', 'Claims Construction by Patent Agents', 'Official Filing Services', 'Response to first FER included'] }
    ],
    metaTitle: 'Professional Patent Filing & Drafting Services Online',
    metaDescription: 'Draft and file patents with qualified patent agents. Secure priority rights, novelty searches, and technical claim construction.'
  },
  {
    slug: 'iso-certification',
    title: 'ISO Certification',
    shortDescription: 'Boost credibility and global compliance. Get certified for ISO 9001, 27001, 14001, and more.',
    fullDescription: 'ISO certifications prove that your business processes, management practices, and security procedures adhere to top global standards. Whether you need ISO 9001 (Quality Management System), ISO 27001 (Information Security), or ISO 14001 (Environmental Standards), a recognized ISO certificate acts as a prerequisite for major government tenders, global export business, and enterprise corporate contracts.',
    iconName: 'Award',
    category: 'Business Compliance',
    benefits: [
      'Unlock entry into high-value government and international tenders',
      'Significantly improve internal operational quality and team efficiency',
      'Provide concrete proof of security and compliance to enterprise clients',
      'Establish powerful global brand recognition and market trust',
      'Minimize operational risks and product/service failure rates'
    ],
    processSteps: [
      { title: 'Gap Analysis', description: 'Assessing your existing business processes against the selected ISO standard requirements.' },
      { title: 'Documentation & Training', description: 'Designing the necessary Quality Manuals, SOPs, policies, and training your core team.' },
      { title: 'Internal Audit', description: 'Conducting internal audits to test the newly implemented management system and resolve deficiencies.' },
      { title: 'External Certification Audit', description: 'Coordinating with an accredited third-party registrar to audit your management system.' },
      { title: 'ISO Certificate Issuance', description: 'Receiving the official ISO certificate, valid for 3 years subject to annual surveillance audits.' }
    ],
    faqs: [
      { question: 'Which ISO certification does my startup need first?', answer: 'ISO 9001:2015 (Quality Management) is the highly popular, foundational standard. For IT and SaaS companies, ISO 27001 (Information Security) is heavily recommended.' },
      { question: 'How long does ISO certification take?', answer: 'Small to mid-size companies can obtain standard ISO 9001 certification in 7 to 15 business days, while highly complex standards like ISO 27001 can take 1 to 3 months of audit preparation.' }
    ],
    pricing: [
      { title: 'Standard ISO 9001:2015', cost: '₹4,999', features: ['Process Consultation', 'Quality Manual Templates', 'Accredited Certification', 'Validity Verification Link'] },
      { title: 'ISO 27001 (Security) Complete', cost: '₹24,999', features: ['Full Information Security Audits', 'Comprehensive Policy Drafting', 'Internal Auditor Guidance', 'Accredited Lead Auditor Co-ordination'] }
    ],
    metaTitle: 'ISO Certification Online | ISO 9001, 27001, 14001 Registrations',
    metaDescription: 'Certify your company with global standards. Fast, reliable ISO certification services for Quality, Security, and Compliance.'
  },
  {
    slug: 'gst-registration',
    title: 'GST Registration',
    shortDescription: 'Get your tax identification number, legally collect tax, and claim Input Tax Credit (ITC).',
    fullDescription: 'Goods and Services Tax (GST) registration is statutory for any business whose turnover exceeds threshold limits, or those engaged in inter-state e-commerce sales. Operating without a valid GST register when required attracts heavy fines. Additionally, holding a active GST registration allows you to claim Input Tax Credit (ITC) on operational purchases, saving substantial money.',
    iconName: 'Briefcase',
    category: 'Business Compliance',
    benefits: [
      'Legally collect taxes from clients and pass them transparently to the government',
      'Avail valuable Input Tax Credit (ITC) on all major business purchases',
      'Open a dedicated corporate current bank account smoothly',
      'Register as a vendor on popular e-commerce platforms like Amazon or Flipkart',
      'Increase credibility among B2B corporate buyers and large partnerships'
    ],
    processSteps: [
      { title: 'Document Collection', description: 'Collecting business constitution proofs, PAN cards, identity documents, and registered address proofs.' },
      { title: 'Application Preparation', description: 'Formatting the physical/digital coordinates and submitting them on the government tax portal.' },
      { title: 'Clarification Filing (If any)', description: 'Quickly drafting responses to any queries or clarifications raised by GST tax officers.' },
      { title: 'GSTIN Generation', description: 'Official generation of the 15-digit GSTIN tax number and active profile creation.' },
      { title: 'GST Certificate Download', description: 'Downloading the authorized GST registration certificate (Form REG-06) for compliance display.' }
    ],
    faqs: [
      { question: 'What is the threshold limit for mandatory GST registration?', answer: 'GST registration is mandatory for businesses supplying services with an annual turnover exceeding ₹20 Lakhs (₹10 Lakhs for special hill states) and goods suppliers exceeding ₹40 Lakhs. It is mandatory for all e-commerce sellers regardless of turnover.' },
      { question: 'Can I opt for voluntary GST registration?', answer: 'Yes! Even if your turnover is below the threshold, you can voluntarily register to avail Input Tax Credits, open corporate current accounts, and deal with enterprise clients.' }
    ],
    pricing: [
      { title: 'Basic GST Registration', cost: '₹1,499', features: ['Document Authentication', 'GST Portal Application Filing', 'Query Resolution', 'GST Certificate Delivery'] },
      { title: 'GST Registration + Filing Combo', cost: '₹4,999', features: ['GSTIN Registration', '3 Months of GSTR-1 & GSTR-3B Filing', 'Input Tax Credit Review', 'Dedicated Tax Accountant'] }
    ],
    metaTitle: 'Online GST Registration Services | Fast GSTIN Registration',
    metaDescription: 'Register for GST online in 3 days. Complete documentation, query resolution, and get your 15-digit GSTIN tax certificate.'
  },
  {
    slug: 'startup-india-registration',
    title: 'Startup India Registration',
    shortDescription: 'Get DPIIT recognition, tax holidays, patent rebates, and easy access to government funding.',
    fullDescription: 'The Startup India initiative by the Government of India offers massive tax exemptions, relaxed compliance rules, intellectual property rebates, and priority access to funding for eligible startups. Obtaining a Department for Promotion of Industry and Internal Trade (DPIIT) certificate unlocks these exclusive statutory benefits to help young founders scale their innovative companies quickly.',
    iconName: 'FileCode',
    category: 'Corporate Registrations',
    benefits: [
      'Income Tax Exemption under Section 80-IAC for 3 consecutive financial years',
      'Up to 80% rebate in patent filing costs and 50% discount on trademark filings',
      'Relaxed government procurement norms (no prior experience or turnover required)',
      'Access to SIDBI Fund of Funds and low-interest alternative debt systems',
      'Easy self-certification under key environmental and labor laws'
    ],
    processSteps: [
      { title: 'Eligibility Scrutiny', description: 'Validating that your company is registered as a Private Limited, LLP, or Registered Partnership and is less than 10 years old.' },
      { title: 'Pitch Deck & Write-up', description: 'Drafting the professional write-up detailing the innovation, scalability, and job creation potential of your business model.' },
      { title: 'DPIIT Submission', description: 'Registering on the Startup India portal and submitting the detailed recognition application with supporting files.' },
      { title: 'Review & Assessment', description: 'Responding to administrative checks or feedback requests from the assessing committee.' },
      { title: 'DPIIT Certificate Issuance', description: 'Securing the official DPIIT recognition certificate containing a unique recognition number.' }
    ],
    faqs: [
      { question: 'Which business formats qualify for Startup India recognition?', answer: 'Only Private Limited Companies, Limited Liability Partnerships (LLP), and Registered Partnership Firms are eligible. Sole Proprietorships or un-registered structures do not qualify.' },
      { question: 'Is my tech startup eligible if we do not have a patent?', answer: 'Yes! While patents demonstrate high innovation, you can qualify if you demonstrate an innovative product/service, improved process efficiency, scalable business model, or potential for massive wealth/job creation.' }
    ],
    pricing: [
      { title: 'DPIIT Recognition Plan', cost: '₹4,999', features: ['Innovative Business Write-up Prep', 'DPIIT Portal Registration', 'Application Filing', 'Certificate Follow-up'] },
      { title: 'Comprehensive Startup Pack', cost: '₹14,999', features: ['Private Limited/LLP Incorporation', 'DPIIT Startup India Registration', 'Trademark Application Filing', 'Startup Pitch Deck Consultation'] }
    ],
    metaTitle: 'Startup India DPIIT Recognition Registration Online',
    metaDescription: 'Unlock government funding, tax holidays, and 80% patent rebates. Get professional Startup India DPIIT recognition fast.'
  },
  {
    slug: 'legal-documentation',
    title: 'Legal Documentation & Drafting',
    shortDescription: 'Draft solid customized contracts, shareholder agreements, terms of service, and privacy policies.',
    fullDescription: 'Water-tight legal contracts are the backbone of any secure business. Using generic internet templates often leaves you open to immense liabilities, intellectual property theft, and long disputes. Professional corporate drafting tailors agreements to your exact operational realities, protecting founders, defining partnerships, and establishing clear boundaries for clients and vendors.',
    iconName: 'Scale',
    category: 'Corporate Registrations',
    benefits: [
      'Ironclad operational clauses that shield your company from liability',
      'Clearly defined intellectual property ownership, ensuring no IP leaks',
      'Precise dispute resolution venues and indemnity terms',
      'Build institutional trust with investors, vendors, and clients',
      'Tailored terms that comply with current cybersecurity and consumer laws'
    ],
    processSteps: [
      { title: 'Requirement Intake', description: 'Consulting with our corporate attorneys to map the precise commercial intent, risks, and goals.' },
      { title: 'First Draft Construction', description: 'Drafting the customized legal clauses, warranties, liabilities, and intellectual property transfers.' },
      { title: 'Client Review & Refinement', description: 'Presenting the draft to you and iterating on clauses based on your strategic preferences.' },
      { title: 'Finalization', description: 'Polishing the finalized copy and providing guidance on valid execution (e.g., e-signatures, stamp paper rules).' }
    ],
    faqs: [
      { question: 'Why can’t I just download free templates?', answer: 'Free templates are generic, usually based on foreign laws (like US law), and rarely address specific operational risks, state stamp laws, or comprehensive intellectual property safeguards required for your niche.' },
      { question: 'What is a Co-Founder Agreement and why is it urgent?', answer: 'It outlines equity splitting, vesting schedules, roles, IP transfers, and exit mechanisms among co-founders. It is critical to draft this BEFORE incorporating to prevent catastrophic early splits.' }
    ],
    pricing: [
      { title: 'Single Custom Agreement', cost: '₹2,999', features: ['Tailored Drafting by Corporate Lawyers', '1 Revision Round', 'Ready-to-execute Delivery', 'Consultation Call'] },
      { title: 'Essential Startup Contract Kit', cost: '₹9,999', features: ['Co-Founder Agreement', 'IP Assignment Deed', 'Website Terms of Use & Privacy Policy', 'Client Service Agreement Draft', '3 Revision Rounds'] }
    ],
    metaTitle: 'Professional Legal Agreement Drafting & Contract Writing',
    metaDescription: 'Get ironclad legal agreements drafted by experienced corporate attorneys. Co-founder agreements, SaaS terms of service, IP assignments, and contracts.'
  }
];
