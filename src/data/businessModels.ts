export interface BusinessModel {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scalability: 'Low' | 'Medium' | 'High' | 'Very High';
  fit: string;
  timeToStart: string;
  initialInvestment: string;
  potentialIncome: string;
  timeCommitment: string;
  requiredSkills: string[];
  tools: string[];
  resources: Array<{
    type: 'Free' | 'Paid';
    name: string;
    url: string;
    description: string;
  }>;
  pros: string[];
  cons: string[];
}

export const businessModels: BusinessModel[] = [
  {
    id: 'freelancing',
    title: 'Freelancing',
    description: 'Offer specialized services to clients on a project or contract basis',
    detailedDescription: 'Freelancing involves offering specialized services to clients on a project or contract basis. This could include writing, graphic design, web development, marketing, consulting, or any skill-based service. Freelancers work independently, often with multiple clients, and have the flexibility to choose their projects and set their rates.',
    category: 'Service',
    difficulty: 'Beginner',
    scalability: 'Medium',
    fit: 'Skilled professionals, independent workers',
    timeToStart: 'Less than 1 week',
    initialInvestment: '$0–$500',
    potentialIncome: '$1,000–$15,000+/month',
    timeCommitment: '10–40 hours/week',
    requiredSkills: [
      'Specialized skill or expertise',
      'Client communication',
      'Project management',
      'Time management',
      'Proposal writing',
      'Networking',
      'Quality delivery',
      'Problem-solving',
      'Self-discipline',
      'Pricing strategy'
    ],
    tools: ['Upwork', 'Fiverr', 'LinkedIn', 'Slack', 'Zoom'],
    resources: [
      {
        type: 'Free',
        name: 'Freelancers Union',
        url: 'https://www.freelancersunion.org/',
        description: 'Resources and community for freelancers'
      },
      {
        type: 'Paid',
        name: 'Freelance to Freedom',
        url: 'https://freelancetofreedomcourse.com/',
        description: 'Complete freelancing business course'
      },
      {
        type: 'Free',
        name: 'Upwork Academy',
        url: 'https://www.upwork.com/academy/',
        description: 'Platform-specific freelancing tips'
      },
      {
        type: 'Free',
        name: 'r/freelance',
        url: 'https://www.reddit.com/r/freelance/',
        description: 'Community advice and job leads'
      }
    ],
    pros: [
      'Quick to start with existing skills',
      'Complete schedule flexibility',
      'Choose your own clients and projects',
      'No inventory or upfront costs',
      'Can work from anywhere',
      'Direct relationship with income and effort'
    ],
    cons: [
      'Income can be inconsistent',
      'No benefits or job security',
      'Constant client acquisition needed',
      'Time-for-money limitation',
      'Handling all business aspects alone',
      'Potential for scope creep and difficult clients'
    ]
  },
  {
    id: 'content-creation-ugc',
    title: 'Content Creation / UGC',
    description: 'Create videos, photos, blogs, or social media posts for personal brands or other businesses',
    detailedDescription: 'Content creation and user-generated content (UGC) involve producing videos, photos, blogs, or social media posts for personal brands or other businesses. UGC creators are often paid by companies to create native-style content that aligns with the brand\'s identity but feels organic to viewers. Monetization can come through brand deals, platform revenue sharing, affiliate marketing, or selling personal products.',
    category: 'Creative',
    difficulty: 'Beginner',
    scalability: 'High',
    fit: 'Outgoing creatives, niche enthusiasts',
    timeToStart: 'Less than 1 week',
    initialInvestment: '$0–$300',
    potentialIncome: '$0–$20,000+/month',
    timeCommitment: '10–40 hours/week',
    requiredSkills: [
      'Creative thinking',
      'Verbal and written communication',
      'Social media platform familiarity',
      'Visual storytelling',
      'Basic editing and design',
      'Trend awareness',
      'Consistency and self-discipline',
      'Time management',
      'Audience understanding',
      'Brand collaboration readiness'
    ],
    tools: ['CapCut', 'Canva', 'TikTok', 'Instagram', 'Notion'],
    resources: [
      {
        type: 'Free',
        name: 'YouTube Creator Academy',
        url: 'https://creatoracademy.youtube.com',
        description: 'Official tips from YouTube on growing a channel'
      },
      {
        type: 'Paid',
        name: 'Creator Now',
        url: 'https://www.creatornow.com/',
        description: 'Community and structured bootcamps for creators'
      },
      {
        type: 'Free',
        name: 'Later Blog',
        url: 'https://later.com/blog/',
        description: 'Strategy and trends for Instagram, TikTok, and Pinterest'
      },
      {
        type: 'Paid',
        name: 'Ali Abdaal\'s Part-Time YouTuber Academy',
        url: 'https://academy.aliabdaal.com/',
        description: 'Premium course on content systems'
      }
    ],
    pros: [
      'Extremely low barrier to entry',
      'Creative freedom and self-expression',
      'Potential for large income with no inventory',
      'Flexible work schedule',
      'Builds long-term personal brand equity',
      'Opens opportunities in many niches'
    ],
    cons: [
      'Algorithms can change rapidly',
      'Time-intensive content planning and editing',
      'Emotional toll of public feedback',
      'Inconsistent income early on',
      'High competition and saturation',
      'Burnout is common without balance'
    ]
  },
  {
    id: 'youtube-automation',
    title: 'YouTube Automation Channels',
    description: 'Build faceless YouTube channels where content is outsourced to a team',
    detailedDescription: 'YouTube automation involves building faceless YouTube channels where the content is outsourced—scripts, voiceovers, video editing, and thumbnails. The owner manages the strategy and monetization while a team handles production. These channels typically cover broad niches such as finance, health, or motivation and earn through AdSense, sponsorships, and affiliate links.',
    category: 'Media',
    difficulty: 'Intermediate',
    scalability: 'High',
    fit: 'Systems thinkers, content strategists',
    timeToStart: '1–4 weeks',
    initialInvestment: '$300–$3,000',
    potentialIncome: '$500–$15,000/month',
    timeCommitment: '10–30 hours/week',
    requiredSkills: [
      'Strategic planning',
      'Market and niche research',
      'Delegation and team management',
      'SEO and YouTube analytics',
      'Trend recognition',
      'Thumbnail and title optimization',
      'Monetization strategy',
      'Script structure awareness',
      'Time efficiency',
      'Scaling systems'
    ],
    tools: ['VidIQ', 'Pictory', 'Fiverr', 'Google Docs'],
    resources: [
      {
        type: 'Free',
        name: 'YouTube Creator Academy',
        url: 'https://creatoracademy.youtube.com',
        description: 'YouTube best practices'
      },
      {
        type: 'Paid',
        name: 'Cash Cow Mastery',
        url: 'https://www.cashcowmastery.com/',
        description: 'Step-by-step automation training'
      },
      {
        type: 'Free',
        name: 'Think Media Channel',
        url: 'https://www.youtube.com/@ThinkMediaTV',
        description: 'Reviews and growth hacks'
      }
    ],
    pros: [
      'High passive income potential',
      'Doesn\'t require on-camera presence',
      'Can operate multiple channels at once',
      'Leverages evergreen content',
      'Delegation builds time freedom',
      'Excellent for data-driven creators'
    ],
    cons: [
      'Needs upfront capital to outsource content',
      'Hiring reliable team members is difficult',
      'Monetization takes time and effort',
      'Channels can be demonetized for policy violations',
      'High content production costs upfront',
      'Constant optimization required'
    ]
  },
  {
    id: 'local-service-arbitrage',
    title: 'Local Service Arbitrage',
    description: 'Generate leads for local services and hire others to fulfill the work',
    detailedDescription: 'Local service arbitrage is the process of generating leads for a local service (like lawn care, pressure washing, or cleaning), then hiring someone else to fulfill the job. The business owner makes the margin between the client\'s fee and the vendor\'s cost. It\'s a way to build a service business without doing the work directly.',
    category: 'Service',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Hustlers, sales-driven, organized operators',
    timeToStart: 'Less than 1 week',
    initialInvestment: '$100–$1,000',
    potentialIncome: '$1,000–$10,000/month',
    timeCommitment: '5–20 hours/week',
    requiredSkills: [
      'Communication and sales',
      'Time management',
      'Local networking',
      'Lead generation',
      'Vendor management',
      'Client relationship handling',
      'Service quality control',
      'Pricing strategy',
      'Customer problem solving',
      'Operational thinking'
    ],
    tools: ['Google Ads', 'Jobber', 'Stripe', 'Thumbtack'],
    resources: [
      {
        type: 'Free',
        name: 'UpFlip Arbitrage Video',
        url: 'https://www.youtube.com/watch?v=4m1kU5Uj8xI',
        description: 'Real examples of arbitrage businesses'
      },
      {
        type: 'Paid',
        name: 'Service Business Masterclass',
        url: 'https://sweatystartup.com/course',
        description: 'Step-by-step local business strategy'
      }
    ],
    pros: [
      'High-margin business potential',
      'Doesn\'t require performing services yourself',
      'Great for testing sales skills',
      'Fast to launch with minimal equipment',
      'Can be scaled with team processes',
      'Real-world entrepreneurship experience'
    ],
    cons: [
      'Customer complaints fall on you',
      'Requires reliable local vendors',
      'Not location-independent',
      'Heavy reliance on phone sales or cold outreach',
      'Quality control is hard to maintain',
      'Limited software support'
    ]
  },
  {
    id: 'high-ticket-sales',
    title: 'High-Ticket Sales / Closing',
    description: 'Sell expensive products or services over phone/Zoom for commission',
    detailedDescription: 'High-ticket sales is the process of selling expensive products or services, often $2,000+, over the phone or via Zoom. Closers are typically paid commission (10–20%) per sale and don\'t need to generate leads—the company handles marketing and passes warm leads to closers. It\'s a role that rewards persuasion, follow-up, and confidence.',
    category: 'Sales',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Persuasive, competitive, self-starters',
    timeToStart: '1–2 weeks',
    initialInvestment: '$0–$200',
    potentialIncome: '$3,000–$30,000+/month',
    timeCommitment: '15–40 hours/week',
    requiredSkills: [
      'Verbal communication',
      'Listening and rapport building',
      'Emotional intelligence',
      'Handling rejection',
      'Objection resolution',
      'Follow-up consistency',
      'Time blocking and structure',
      'Goal orientation',
      'Self-management',
      'Offer understanding'
    ],
    tools: ['Zoom', 'Close.io', 'Slack', 'Calendly'],
    resources: [
      {
        type: 'Free',
        name: 'Cole Gordon YouTube Channel',
        url: 'https://www.youtube.com/@colegordon',
        description: 'Sales psychology breakdowns'
      },
      {
        type: 'Paid',
        name: 'Closers.io Training',
        url: 'https://www.closers.io/',
        description: 'Structured sales certification and coaching'
      }
    ],
    pros: [
      'Extremely high earning potential',
      'No need to create your own product',
      'Valuable sales experience',
      'Fast to start and learn',
      'Remote-friendly',
      'Builds confidence and discipline'
    ],
    cons: [
      'Inconsistent income if not performing',
      'Commission-only roles can be stressful',
      'Long calls and repetitive scripts',
      'Emotional ups and downs from rejections',
      'Limited if not great at communication',
      'Burnout if unstructured'
    ]
  },
  {
    id: 'app-saas-development',
    title: 'App or SaaS Development',
    description: 'Create tech-based products with subscription or license monetization',
    detailedDescription: 'App or SaaS development involves creating a tech-based product (mobile or web) that solves a problem and can be monetized through subscriptions, licenses, or ads. This model is known for its high leverage—once built, the product can serve unlimited users without much added cost.',
    category: 'Tech',
    difficulty: 'Advanced',
    scalability: 'Very High',
    fit: 'Problem-solvers, engineers, product thinkers',
    timeToStart: '4–12 weeks',
    initialInvestment: '$1,000–$15,000',
    potentialIncome: '$1,000–$100,000+/month',
    timeCommitment: '20–50 hours/week',
    requiredSkills: [
      'Problem-solving',
      'Technical literacy',
      'Product thinking',
      'UX/UI intuition',
      'Market validation',
      'Persistence',
      'Feedback loops',
      'Critical thinking',
      'Planning and scoping',
      'Customer onboarding'
    ],
    tools: ['React', 'Vercel', 'Supabase', 'Stripe', 'Figma'],
    resources: [
      {
        type: 'Free',
        name: 'Indie Hackers',
        url: 'https://www.indiehackers.com/',
        description: 'Real founder stories and advice'
      },
      {
        type: 'Paid',
        name: 'Buildspace',
        url: 'https://buildspace.so/',
        description: 'Guided software creation sprints'
      },
      {
        type: 'Free',
        name: 'Product Hunt',
        url: 'https://www.producthunt.com/',
        description: 'Idea validation and launchpad'
      }
    ],
    pros: [
      'High-margin and recurring revenue',
      'Scales infinitely with users',
      'Modern tools reduce technical barriers',
      'Attracts investors if successful',
      'Can be automated over time',
      'Strong product = long-term defensibility'
    ],
    cons: [
      'Long build cycles',
      'Tech bugs and debugging headaches',
      'Difficult to find early users',
      'Heavy time investment upfront',
      'Constant iteration and support',
      'High competition in most categories'
    ]
  },
  {
    id: 'smma',
    title: 'Social Media Marketing Agency (SMMA)',
    description: 'Deliver marketing services like paid ads and content to businesses',
    detailedDescription: 'An SMMA delivers marketing services—typically paid ads, content, or lead gen—to small businesses or personal brands. You charge clients on a monthly retainer or performance basis, managing their digital presence to generate traffic and revenue.',
    category: 'Service',
    difficulty: 'Intermediate',
    scalability: 'High',
    fit: 'Results-driven marketers',
    timeToStart: '1–3 weeks',
    initialInvestment: '$200–$1,000',
    potentialIncome: '$2,000–$50,000+/month',
    timeCommitment: '10–30 hours/week',
    requiredSkills: [
      'Marketing fundamentals',
      'Writing and creative',
      'Funnel building',
      'Customer service',
      'Lead gen',
      'Sales communication',
      'Copywriting',
      'Project delivery',
      'Client communication',
      'Time management'
    ],
    tools: ['Meta Ads Manager', 'GoHighLevel', 'Canva', 'Loom'],
    resources: [
      {
        type: 'Paid',
        name: 'Iman Gadzhi\'s Agency Incubator',
        url: 'https://growyouragency.com',
        description: 'Top course on SMMA building'
      },
      {
        type: 'Free',
        name: 'Facebook Ads Library',
        url: 'https://www.facebook.com/ads/library',
        description: 'Real ad examples'
      }
    ],
    pros: [
      'High-margin retainer model',
      'Easy to start with free trials',
      'Scales with results and case studies',
      'Growing demand from businesses online',
      'Learn digital marketing deeply',
      'Opportunity to niche down by industry'
    ],
    cons: [
      'Client churn risk',
      'Results-dependent income',
      'Outreach can be time consuming',
      'Limited leverage without team',
      'Constant pressure to perform',
      'Commoditized if undifferentiated'
    ]
  },
  {
    id: 'ai-marketing-agency',
    title: 'AI Marketing Agency',
    description: 'Help businesses automate and enhance marketing using artificial intelligence',
    detailedDescription: 'AI Marketing Agencies help businesses automate and enhance their marketing using artificial intelligence. These agencies typically implement tools like ChatGPT, Zapier, and Make to create personalized customer journeys, automate content, and streamline analytics. With businesses increasingly seeking tech-forward solutions, AI marketing is becoming a high-demand, high-margin niche.',
    category: 'Service',
    difficulty: 'Advanced',
    scalability: 'High',
    fit: 'Early adopters, tech-forward thinkers',
    timeToStart: '2–4 weeks',
    initialInvestment: '$200–$2,000',
    potentialIncome: '$3,000–$50,000/month',
    timeCommitment: '10–35 hours/week',
    requiredSkills: [
      'Communication',
      'Client relationship management',
      'Strategic thinking',
      'Workflow design',
      'AI tool fluency',
      'Marketing fundamentals',
      'Writing and editing',
      'System design',
      'Adaptability'
    ],
    tools: ['ChatGPT', 'Make', 'Zapier', 'Claude', 'Notion'],
    resources: [
      {
        type: 'Free',
        name: 'Zapier Blog',
        url: 'https://zapier.com/blog/',
        description: 'Practical automations and integrations'
      },
      {
        type: 'Paid',
        name: 'Rob Lennon\'s AI Content Strategy Course',
        url: 'https://www.robwrites.com/',
        description: 'Advanced content workflows'
      }
    ],
    pros: [
      'High-demand, emerging field',
      'Excellent client leverage with the right tools',
      'Differentiation through tech fluency',
      'Automation leads to higher profit margins',
      'Can quickly scale with templates and SOPs',
      'Thought leadership builds long-term authority'
    ],
    cons: [
      'Requires keeping up with rapidly changing tech',
      'Tech overwhelm and setup issues for clients',
      'Often needs custom solutions per client',
      'Finding early clients can be tough without a portfolio',
      'Results can vary widely between industries'
    ]
  },
  {
    id: 'digital-services-agency',
    title: 'Digital Services Agency',
    description: 'Offer range of online services including branding, web dev, email marketing, SEO',
    detailedDescription: 'Digital Services Agencies offer a range of online services including branding, web development, email marketing, SEO, and more. These businesses typically start by solving one problem (e.g., building landing pages) and grow into multi-service providers. The model provides flexibility and consistent demand, especially for businesses expanding online.',
    category: 'Service',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Organized operators, digital generalists',
    timeToStart: '1–2 weeks',
    initialInvestment: '$100–$1,000',
    potentialIncome: '$2,000–$30,000/month',
    timeCommitment: '10–40 hours/week',
    requiredSkills: [
      'Project management',
      'General marketing knowledge',
      'Communication',
      'Client onboarding',
      'Problem-solving',
      'Proposal writing',
      'Resource delegation',
      'Time management'
    ],
    tools: ['Trello', 'Slack', 'Canva', 'Webflow', 'Notion'],
    resources: [
      {
        type: 'Free',
        name: 'HubSpot Blog',
        url: 'https://blog.hubspot.com/',
        description: 'Full-funnel agency strategies'
      },
      {
        type: 'Paid',
        name: 'Agency Mastery by Jordan Ross',
        url: 'https://www.agencyalchemy.com/',
        description: 'Systems + SOPs for scaling'
      }
    ],
    pros: [
      'Flexibility in services offered',
      'Can productize for recurring revenue',
      'Excellent for skilled generalists',
      'High client ROI if well executed',
      'Easy to upsell once trust is built',
      'Remote-friendly structure'
    ],
    cons: [
      'Churn is common with project work',
      'Requires excellent project scoping',
      'Many agencies burn out due to poor SOPs',
      'Managing subcontractors adds complexity',
      'May struggle to differentiate in saturated markets'
    ]
  },
  {
    id: 'investing-trading',
    title: 'Investing / Trading',
    description: 'Allocate capital into assets like stocks, crypto, or forex for returns',
    detailedDescription: 'Investing and trading involve allocating capital into assets like stocks, crypto, or forex with the goal of generating returns. Traders tend to pursue short-term strategies based on price movement, while investors take a long-term approach based on fundamentals. Both paths require risk management, emotional control, and technical proficiency.',
    category: 'Finance',
    difficulty: 'Advanced',
    scalability: 'Medium',
    fit: 'Analytical, risk-tolerant, data-driven',
    timeToStart: '2–6 weeks',
    initialInvestment: '$1,000–$10,000',
    potentialIncome: 'Variable – $0 to unlimited',
    timeCommitment: '10–50 hours/week',
    requiredSkills: [
      'Data interpretation',
      'Technical and chart analysis',
      'Emotional regulation',
      'Research and pattern recognition',
      'Long-term thinking',
      'Financial strategy',
      'Decision-making under pressure',
      'Discipline'
    ],
    tools: ['TradingView', 'Thinkorswim', 'Binance', 'Robinhood'],
    resources: [
      {
        type: 'Free',
        name: 'BabyPips Forex School',
        url: 'https://www.babypips.com/',
        description: 'Beginner-friendly training'
      },
      {
        type: 'Paid',
        name: 'Investor\'s Underground',
        url: 'https://www.investorsunderground.com/',
        description: 'Stock trading education'
      }
    ],
    pros: [
      'No clients or team needed',
      'Extremely flexible schedule',
      'High profit potential for skilled traders',
      'Global access to markets',
      'Thousands of niches and strategies',
      'Can be automated with bots or scripts'
    ],
    cons: [
      'High financial risk',
      'Emotionally taxing',
      'Requires constant study and refinement',
      'Steep learning curve early on',
      'Success often takes years of experience'
    ]
  },
  {
    id: 'online-reselling',
    title: 'Online Reselling',
    description: 'Source physical products and flip them for profit on platforms like eBay',
    detailedDescription: 'Online reselling involves sourcing physical products and flipping them for a profit on platforms like eBay, Mercari, and Poshmark. Sellers identify undervalued items locally or through liquidation sites and resell at markup. It\'s ideal for individuals who enjoy deal-hunting, niche categories, or sustainable fashion.',
    category: 'Commerce',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Resourceful, deal-hunting',
    timeToStart: 'Less than 1 week',
    initialInvestment: '$100–$1,000',
    potentialIncome: '$500–$5,000/month',
    timeCommitment: '5–20 hours/week',
    requiredSkills: [
      'Product identification',
      'Pricing strategy',
      'Negotiation',
      'Photography and product display',
      'Basic e-commerce literacy',
      'Organization and storage',
      'Customer service',
      'Profit margin tracking'
    ],
    tools: ['eBay', 'Mercari', 'Facebook Marketplace', 'Pirate Ship'],
    resources: [
      {
        type: 'Free',
        name: 'Craigslist Hunter YouTube',
        url: 'https://www.youtube.com/@CraigslistHunter',
        description: 'Flipping tutorials'
      },
      {
        type: 'Paid',
        name: 'Reseller Bootcamp by Hustle Buddies',
        url: 'https://hustlebuddies.com/',
        description: 'Full online flipping system'
      }
    ],
    pros: [
      'Fast path to revenue',
      'Very little tech knowledge needed',
      'Huge flexibility in product categories',
      'Low startup risk',
      'Ideal for part-time side hustle',
      'Inventory can be managed from home'
    ],
    cons: [
      'Time-for-money tradeoff',
      'Inventory management can become overwhelming',
      'Platform fees eat into margins',
      'Repetitive and hands-on work',
      'Hard to scale without a team'
    ]
  },
  {
    id: 'handmade-goods',
    title: 'Handmade Goods',
    description: 'Sell physical, handcrafted items like jewelry, home decor, clothing',
    detailedDescription: 'Handmade Goods is a business model focused on selling physical, handcrafted items such as jewelry, home decor, clothing, or accessories. These products often have unique aesthetic value and can attract niche audiences who value craftsmanship and authenticity. Entrepreneurs in this space typically manage the entire process—design, production, marketing, and shipping—either solo or with a small team.',
    category: 'Creative',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Creatives, artisans, detail-oriented makers',
    timeToStart: '1–2 weeks',
    initialInvestment: '$100–$1,000',
    potentialIncome: '$300–$7,000/month',
    timeCommitment: '10–30 hours/week',
    requiredSkills: [
      'Creativity',
      'Basic design sense',
      'Time management',
      'Visual branding',
      'Customer communication',
      'Product photography',
      'Patience and attention to detail',
      'Online selling basics',
      'Pricing strategy'
    ],
    tools: ['Etsy', 'Shopify', 'Canva', 'Instagram', 'Printful'],
    resources: [
      {
        type: 'Free',
        name: 'Etsy Seller Handbook',
        url: 'https://www.etsy.com/seller-handbook',
        description: 'Official guide to selling on Etsy'
      },
      {
        type: 'Paid',
        name: 'Handmade Titan University',
        url: 'https://www.handmadetitanuniversity.com/',
        description: 'Step-by-step course for Etsy sellers'
      }
    ],
    pros: [
      'Unique, creative expression',
      'Loyal niche customer base',
      'Low startup costs',
      'Control over the entire process',
      'High margins on premium items',
      'Strong brand-building potential'
    ],
    cons: [
      'Time-intensive production',
      'Hard to scale without help',
      'Physical fulfillment logistics',
      'Seasonality in demand',
      'Difficult to differentiate in crowded spaces',
      'Requires patience and consistency'
    ]
  },
  {
    id: 'copywriting-ghostwriting',
    title: 'Copywriting / Ghostwriting',
    description: 'Use written communication skills to create persuasive content for businesses',
    detailedDescription: 'This business model revolves around using written communication skills to create persuasive content for businesses, brands, or individuals. Copywriters focus on conversion-driven writing such as ads, landing pages, and email sequences. Ghostwriters typically write articles, books, or thought-leadership content under someone else\'s name.',
    category: 'Creative',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Writers, marketers, strategic thinkers',
    timeToStart: '< 1 week',
    initialInvestment: '$0–$200',
    potentialIncome: '$500–$15,000/month',
    timeCommitment: '10–25 hours/week',
    requiredSkills: [
      'Clear written communication',
      'Storytelling',
      'Empathy and audience insight',
      'Research ability',
      'Time management',
      'Client communication',
      'Strategic thinking',
      'Basic marketing principles',
      'Adaptability across niches'
    ],
    tools: ['Google Docs', 'Grammarly', 'Notion', 'Hemingway App', 'Jasper'],
    resources: [
      {
        type: 'Free',
        name: 'Copyhackers Blog',
        url: 'https://copyhackers.com/blog/',
        description: 'Top-tier insights and writing breakdowns'
      },
      {
        type: 'Paid',
        name: 'Copy School by Copyhackers',
        url: 'https://copyschool.copyhackers.com/',
        description: 'Comprehensive training'
      }
    ],
    pros: [
      'Low barrier to entry',
      'High-income potential with experience',
      'Completely remote and flexible',
      'In-demand across industries',
      'Can leverage AI tools',
      'Great stepping stone into other fields'
    ],
    cons: [
      'Competitive at beginner level',
      'Can be time-consuming to build portfolio',
      'Reliant on client work for income',
      'Requires continual skill refinement',
      'Deadlines and revisions can be stressful',
      'Difficult to scale without building an agency'
    ]
  },
  {
    id: 'affiliate-marketing',
    title: 'Affiliate Marketing',
    description: 'Promote other people\'s products and earn commission on sales',
    detailedDescription: 'Affiliate marketing involves promoting other people\'s products and earning a commission on each sale made through your referral link. You don\'t need to own a product or handle fulfillment; instead, you focus on generating traffic and conversions. Common formats include blogs, email lists, review sites, and social media content.',
    category: 'Marketing',
    difficulty: 'Intermediate',
    scalability: 'High',
    fit: 'Strategists, content creators, long-term thinkers',
    timeToStart: '1–2 weeks',
    initialInvestment: '$50–$500',
    potentialIncome: '$100–$10,000+/month',
    timeCommitment: '5–20 hours/week',
    requiredSkills: [
      'Basic content creation',
      'Keyword research',
      'Funnel strategy',
      'Digital marketing',
      'Traffic generation',
      'Relationship management',
      'Data interpretation',
      'Long-term planning',
      'Conversion tracking'
    ],
    tools: ['ClickFunnels', 'ConvertKit', 'WordPress', 'Canva', 'Ahrefs'],
    resources: [
      {
        type: 'Free',
        name: 'Authority Hacker Blog',
        url: 'https://www.authorityhacker.com/blog/',
        description: 'Deep SEO + affiliate guides'
      },
      {
        type: 'Paid',
        name: 'The Affiliate Lab',
        url: 'https://affiliatelab.im/',
        description: 'Tactical, high-converting affiliate course'
      }
    ],
    pros: [
      'No need to create your own product',
      'Scalable and passive over time',
      'Flexible and remote-friendly',
      'Can pair with other models (e.g., content, email)',
      'Low startup costs',
      'Evergreen content builds compounding returns'
    ],
    cons: [
      'Delayed income',
      'Requires consistent publishing or ad spend',
      'Payouts and platforms can change',
      'Highly competitive in profitable niches',
      'Some programs have low commissions',
      'Hard to build trust as a beginner'
    ]
  },
  {
    id: 'virtual-assistant',
    title: 'Virtual Assistant',
    description: 'Provide remote administrative support to entrepreneurs and businesses',
    detailedDescription: 'A Virtual Assistant (VA) provides remote administrative support to entrepreneurs, businesses, or executives. Tasks might include email management, scheduling, customer service, research, or social media coordination. Some VAs specialize in areas like e-commerce, podcast production, or bookkeeping.',
    category: 'Admin',
    difficulty: 'Beginner',
    scalability: 'Low',
    fit: 'Organized, responsive, professional multitaskers',
    timeToStart: '< 1 week',
    initialInvestment: '$0–$100',
    potentialIncome: '$500–$5,000/month',
    timeCommitment: '10–30 hours/week',
    requiredSkills: [
      'Time management',
      'Professional communication',
      'Digital organization',
      'Problem solving',
      'Attention to detail',
      'Basic tech skills',
      'Confidentiality',
      'Prioritization',
      'Customer support'
    ],
    tools: ['Google Workspace', 'Notion', 'Trello', 'Slack', 'Zoom'],
    resources: [
      {
        type: 'Free',
        name: 'The Virtual Savvy Blog',
        url: 'https://www.thevirtualsavvy.com/blog/',
        description: 'Beginner VA tutorials'
      },
      {
        type: 'Paid',
        name: 'SavvySystem',
        url: 'https://www.thevirtualsavvy.com/savvysystem/',
        description: 'Complete VA business training'
      }
    ],
    pros: [
      'Easy to start quickly',
      'Highly flexible schedule',
      'Always in demand across industries',
      'Great stepping stone into online work',
      'Opportunity to niche or grow agency',
      'Low financial risk'
    ],
    cons: [
      'Limited income ceiling',
      'Time-for-money trade-off',
      'Can become repetitive',
      'Client expectations vary widely',
      'May involve inconsistent hours',
      'Burnout risk from juggling clients'
    ]
  },
  {
    id: 'e-commerce-dropshipping',
    title: 'E-commerce / Dropshipping',
    description: 'Sell products online without holding inventory through supplier partnerships',
    detailedDescription: 'E-commerce and dropshipping involve selling products online without holding inventory. In dropshipping, when a customer places an order, the retailer purchases the item from a third-party supplier who ships it directly to the customer. This model allows entrepreneurs to start an online store with minimal upfront investment.',
    category: 'Commerce',
    difficulty: 'Intermediate',
    scalability: 'High',
    fit: 'Marketing-focused, product researchers',
    timeToStart: '1–3 weeks',
    initialInvestment: '$500–$3,000',
    potentialIncome: '$1,000–$50,000+/month',
    timeCommitment: '15–40 hours/week',
    requiredSkills: [
      'Product research',
      'Digital marketing',
      'Customer service',
      'Supplier management',
      'Website management',
      'Paid advertising',
      'Analytics interpretation',
      'Brand building',
      'Order fulfillment coordination'
    ],
    tools: ['Shopify', 'Oberlo', 'Facebook Ads', 'Google Ads', 'AliExpress'],
    resources: [
      {
        type: 'Free',
        name: 'Shopify Academy',
        url: 'https://www.shopify.com/academy',
        description: 'E-commerce fundamentals and store setup'
      },
      {
        type: 'Paid',
        name: 'Ecom King Course',
        url: 'https://ecomking.com/',
        description: 'Dropshipping strategy and execution'
      }
    ],
    pros: [
      'Low startup costs',
      'No inventory management',
      'Location independence',
      'Scalable with advertising',
      'Wide product selection',
      'Quick to test new products'
    ],
    cons: [
      'High competition',
      'Low profit margins',
      'Supplier dependency',
      'Customer service challenges',
      'Ad costs can be high',
      'Quality control issues'
    ]
  },
  {
    id: 'online-coaching-consulting',
    title: 'Online Coaching / Consulting',
    description: 'Provide expertise and guidance to clients in your area of specialization',
    detailedDescription: 'Online coaching and consulting involve providing expertise, guidance, and strategic advice to clients in your area of specialization. This could range from business consulting to life coaching, fitness training, or career guidance. Sessions are typically conducted via video calls, and packages can include one-on-one sessions, group coaching, or digital courses.',
    category: 'Service',
    difficulty: 'Intermediate',
    scalability: 'Medium',
    fit: 'Subject matter experts, natural teachers',
    timeToStart: '1–2 weeks',
    initialInvestment: '$100–$1,000',
    potentialIncome: '$2,000–$25,000+/month',
    timeCommitment: '10–30 hours/week',
    requiredSkills: [
      'Subject matter expertise',
      'Communication and listening',
      'Problem-solving',
      'Program development',
      'Client relationship management',
      'Goal setting and accountability',
      'Marketing and positioning',
      'Time management'
    ],
    tools: ['Zoom', 'Calendly', 'Teachable', 'Stripe', 'Notion'],
    resources: [
      {
        type: 'Free',
        name: 'Coach Training Alliance',
        url: 'https://coachtrainingalliance.com/',
        description: 'Free coaching certification and resources'
      },
      {
        type: 'Paid',
        name: 'Coaching Mastery Program',
        url: 'https://www.coachingmasteryprogram.com/',
        description: 'Comprehensive coaching business training'
      }
    ],
    pros: [
      'High hourly rates',
      'Meaningful impact on clients',
      'Flexible scheduling',
      'Low overhead costs',
      'Can package expertise into courses',
      'Strong recurring revenue potential'
    ],
    cons: [
      'Time-for-money limitation',
      'Requires proven expertise',
      'Client acquisition can be challenging',
      'Emotional investment in client outcomes',
      'Market can be saturated',
      'Requires strong personal brand'
    ]
  },
  {
    id: 'print-on-demand',
    title: 'Print on Demand',
    description: 'Create and sell custom designs on products without inventory management',
    detailedDescription: 'Print on Demand (POD) allows creators to design custom graphics, artwork, or text that gets printed on products like t-shirts, mugs, phone cases, and more only when orders are placed. Platforms like Printful, Printify, and Redbubble handle production and shipping, while creators focus on design and marketing.',
    category: 'Creative',
    difficulty: 'Beginner',
    scalability: 'Medium',
    fit: 'Designers, artists, creative entrepreneurs',
    timeToStart: '1–2 weeks',
    initialInvestment: '$0–$500',
    potentialIncome: '$200–$5,000+/month',
    timeCommitment: '5–25 hours/week',
    requiredSkills: [
      'Graphic design',
      'Market research',
      'Trend awareness',
      'Basic marketing',
      'Product photography',
      'Brand development',
      'Customer service',
      'Platform management'
    ],
    tools: ['Canva', 'Photoshop', 'Printful', 'Etsy', 'Amazon Merch'],
    resources: [
      {
        type: 'Free',
        name: 'Printful Academy',
        url: 'https://www.printful.com/academy',
        description: 'POD business fundamentals and design tips'
      },
      {
        type: 'Paid',
        name: 'Print on Demand Secrets',
        url: 'https://www.podsecrets.com/',
        description: 'Advanced POD strategies and niches'
      }
    ],
    pros: [
      'No upfront inventory costs',
      'Passive income potential',
      'Creative freedom',
      'Global market reach',
      'Easy to start',
      'Multiple product categories'
    ],
    cons: [
      'Lower profit margins',
      'High competition',
      'Design theft issues',
      'Platform dependency',
      'Limited customization options',
      'Marketing required for visibility'
    ]
  }
];