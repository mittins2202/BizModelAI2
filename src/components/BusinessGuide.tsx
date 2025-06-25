import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  Star,
  Target,
  Brain,
  Lightbulb,
  Calendar,
  BarChart3,
  Award,
  Zap,
  BookOpen,
  Monitor,
  MessageCircle,
  Shield,
  Briefcase,
  Heart,
  AlertTriangle,
  Play,
  Download,
  ExternalLink
} from 'lucide-react';
import { QuizData, BusinessPath } from '../types';
import { businessPaths } from '../data/businessPaths';
import { businessModels } from '../data/businessModels';
import { calculateFitScore } from '../utils/quizLogic';
import { usePaywall } from '../contexts/PaywallContext';

interface BusinessGuideProps {
  quizData?: QuizData | null;
}

const BusinessGuide: React.FC<BusinessGuideProps> = ({ quizData }) => {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const [businessPath, setBusinessPath] = useState<BusinessPath | null>(null);
  const [businessModel, setBusinessModel] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const { hasCompletedQuiz, canAccessBusinessModel } = usePaywall();

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Getting Started Overview', icon: BarChart3 },
    { id: 'prerequisites', label: 'Prerequisites & Setup', icon: Shield },
    { id: 'step-by-step', label: 'Step-by-Step Guide', icon: Calendar },
    { id: 'tools-setup', label: 'Tools & Software Setup', icon: Monitor },
    { id: 'first-week', label: 'Your First Week Plan', icon: Zap },
    { id: 'first-month', label: 'First Month Milestones', icon: Target },
    { id: 'scaling', label: 'Scaling & Growth', icon: TrendingUp },
    { id: 'common-mistakes', label: 'Common Mistakes to Avoid', icon: AlertTriangle },
    { id: 'resources', label: 'Resources & Templates', icon: BookOpen },
    { id: 'community', label: 'Community & Support', icon: Users }
  ];

  useEffect(() => {
    if (!businessId) return;

    // Find business path and model
    const path = businessPaths.find(p => p.id === businessId);
    const model = businessModels.find(m => m.id === businessId);
    
    if (path) {
      // Calculate fit score if quiz data is available
      if (quizData) {
        const fitScore = calculateFitScore(businessId, quizData);
        setBusinessPath({ ...path, fitScore });
      } else {
        setBusinessPath(path);
      }
    }
    
    if (model) {
      setBusinessModel(model);
    }
  }, [businessId, quizData]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleStepCompletion = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  if (!businessPath && !businessModel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Guide Not Found</h1>
          <button
            onClick={() => navigate('/explore')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Explorer
          </button>
        </div>
      </div>
    );
  }

  const business = businessPath || businessModel;

  // Get business-specific guide content
  const getGuideContent = () => {
    switch (businessId) {
      case 'content-creation-ugc':
        return {
          prerequisites: [
            'Smartphone with good camera quality',
            'Basic understanding of social media platforms',
            'Willingness to be on camera',
            'Creative mindset and storytelling ability'
          ],
          tools: [
            { name: 'CapCut', purpose: 'Video editing', cost: 'Free', priority: 'Essential' },
            { name: 'Canva', purpose: 'Graphics and thumbnails', cost: 'Free/Pro', priority: 'Essential' },
            { name: 'TikTok', purpose: 'Primary platform', cost: 'Free', priority: 'Essential' },
            { name: 'Instagram', purpose: 'Secondary platform', cost: 'Free', priority: 'Important' },
            { name: 'Ring light', purpose: 'Better lighting', cost: '$20-50', priority: 'Recommended' },
            { name: 'Tripod', purpose: 'Stable shots', cost: '$15-30', priority: 'Recommended' }
          ],
          firstWeekPlan: [
            'Day 1-2: Choose your niche and research successful creators',
            'Day 3-4: Set up your social media profiles with consistent branding',
            'Day 5-6: Create your first 5 pieces of content',
            'Day 7: Post your first content and engage with your audience'
          ],
          firstMonthMilestones: [
            'Week 1: Post 5-7 pieces of content, gain first 100 followers',
            'Week 2: Establish posting schedule, engage with 50+ accounts daily',
            'Week 3: Create viral-worthy content, collaborate with 2-3 creators',
            'Week 4: Analyze performance, reach 500+ followers, plan month 2'
          ],
          commonMistakes: [
            'Posting inconsistently or without a schedule',
            'Trying to appeal to everyone instead of a specific niche',
            'Focusing only on follower count instead of engagement',
            'Not engaging with other creators and building community',
            'Giving up too early before seeing results'
          ]
        };

      case 'freelancing':
        return {
          prerequisites: [
            'Marketable skill (writing, design, development, etc.)',
            'Portfolio of previous work or sample projects',
            'Professional communication skills',
            'Time management and self-discipline'
          ],
          tools: [
            { name: 'Upwork', purpose: 'Finding clients', cost: 'Free (commission)', priority: 'Essential' },
            { name: 'Fiverr', purpose: 'Service marketplace', cost: 'Free (commission)', priority: 'Essential' },
            { name: 'LinkedIn', purpose: 'Professional networking', cost: 'Free/Premium', priority: 'Important' },
            { name: 'Slack', purpose: 'Client communication', cost: 'Free/Paid', priority: 'Important' },
            { name: 'Zoom', purpose: 'Client meetings', cost: 'Free/Pro', priority: 'Important' },
            { name: 'Invoice software', purpose: 'Billing clients', cost: '$10-30/month', priority: 'Essential' }
          ],
          firstWeekPlan: [
            'Day 1-2: Create professional profiles on Upwork and Fiverr',
            'Day 3-4: Build portfolio and write compelling service descriptions',
            'Day 5-6: Apply to 10-15 relevant job postings',
            'Day 7: Follow up on applications and optimize profiles based on feedback'
          ],
          firstMonthMilestones: [
            'Week 1: Complete profile setup, submit 20+ proposals',
            'Week 2: Land first client, deliver exceptional work',
            'Week 3: Get first review, raise rates, expand services',
            'Week 4: Secure 2-3 ongoing clients, plan scaling strategy'
          ],
          commonMistakes: [
            'Underpricing services to win clients',
            'Taking on projects outside your expertise',
            'Poor communication with clients',
            'Not setting clear boundaries and scope',
            'Failing to ask for testimonials and referrals'
          ]
        };

      case 'affiliate-marketing':
        return {
          prerequisites: [
            'Understanding of digital marketing basics',
            'Ability to create content (blog, video, social)',
            'Patience for long-term results',
            'Basic website or social media presence'
          ],
          tools: [
            { name: 'WordPress', purpose: 'Website/blog platform', cost: '$5-15/month', priority: 'Essential' },
            { name: 'ConvertKit', purpose: 'Email marketing', cost: '$29+/month', priority: 'Essential' },
            { name: 'Canva', purpose: 'Content creation', cost: 'Free/Pro', priority: 'Important' },
            { name: 'Ahrefs', purpose: 'SEO and keyword research', cost: '$99+/month', priority: 'Important' },
            { name: 'Google Analytics', purpose: 'Traffic tracking', cost: 'Free', priority: 'Essential' },
            { name: 'Amazon Associates', purpose: 'Affiliate program', cost: 'Free', priority: 'Essential' }
          ],
          firstWeekPlan: [
            'Day 1-2: Choose profitable niche and research affiliate programs',
            'Day 3-4: Set up website/blog and apply to affiliate programs',
            'Day 5-6: Create content calendar and write first 3 articles',
            'Day 7: Publish first content and set up email capture'
          ],
          firstMonthMilestones: [
            'Week 1: Website live, 5 affiliate programs approved',
            'Week 2: 10 pieces of content published, SEO optimized',
            'Week 3: Email list of 50+ subscribers, social media presence',
            'Week 4: First affiliate commission, 1000+ monthly visitors'
          ],
          commonMistakes: [
            'Promoting too many products without focus',
            'Not disclosing affiliate relationships properly',
            'Focusing on commissions over providing value',
            'Expecting quick results in a long-term game',
            'Not building an email list from day one'
          ]
        };

      case 'e-commerce-dropshipping':
        return {
          prerequisites: [
            'Basic understanding of e-commerce',
            'Marketing and advertising budget ($500+ recommended)',
            'Customer service skills',
            'Ability to handle business operations'
          ],
          tools: [
            { name: 'Shopify', purpose: 'E-commerce platform', cost: '$29+/month', priority: 'Essential' },
            { name: 'Oberlo', purpose: 'Product sourcing', cost: 'Free/Paid', priority: 'Essential' },
            { name: 'Facebook Ads Manager', purpose: 'Advertising', cost: 'Ad spend', priority: 'Essential' },
            { name: 'Google Ads', purpose: 'Search advertising', cost: 'Ad spend', priority: 'Important' },
            { name: 'AliExpress', purpose: 'Supplier platform', cost: 'Free', priority: 'Essential' },
            { name: 'Klaviyo', purpose: 'Email marketing', cost: '$20+/month', priority: 'Important' }
          ],
          firstWeekPlan: [
            'Day 1-2: Research profitable niches and trending products',
            'Day 3-4: Set up Shopify store and find reliable suppliers',
            'Day 5-6: Create product listings and store design',
            'Day 7: Launch store and run first advertising campaigns'
          ],
          firstMonthMilestones: [
            'Week 1: Store launched, 10-20 products listed',
            'Week 2: First sales, optimize ad campaigns',
            'Week 3: Scale profitable products, improve conversion rate',
            'Week 4: $1000+ revenue, expand product line'
          ],
          commonMistakes: [
            'Choosing oversaturated or low-margin products',
            'Poor supplier relationships and quality control',
            'Inadequate customer service and support',
            'Spending too much on ads without testing',
            'Not focusing on building a brand'
          ]
        };

      case 'virtual-assistant':
        return {
          prerequisites: [
            'Strong organizational and communication skills',
            'Proficiency with common business software',
            'Reliable internet and computer setup',
            'Professional demeanor and work ethic'
          ],
          tools: [
            { name: 'Google Workspace', purpose: 'Productivity suite', cost: '$6+/month', priority: 'Essential' },
            { name: 'Notion', purpose: 'Project management', cost: 'Free/Paid', priority: 'Essential' },
            { name: 'Trello', purpose: 'Task management', cost: 'Free/Paid', priority: 'Important' },
            { name: 'Slack', purpose: 'Team communication', cost: 'Free/Paid', priority: 'Essential' },
            { name: 'Zoom', purpose: 'Video meetings', cost: 'Free/Pro', priority: 'Essential' },
            { name: 'Calendly', purpose: 'Scheduling', cost: 'Free/Paid', priority: 'Important' }
          ],
          firstWeekPlan: [
            'Day 1-2: Define your VA services and create service packages',
            'Day 3-4: Set up professional profiles on VA platforms',
            'Day 5-6: Apply to 15-20 VA positions',
            'Day 7: Follow up on applications and prepare for interviews'
          ],
          firstMonthMilestones: [
            'Week 1: Complete 20+ applications, get first interviews',
            'Week 2: Land first client, deliver excellent work',
            'Week 3: Secure 2-3 regular clients, establish routines',
            'Week 4: Earn $500+, get testimonials, plan expansion'
          ],
          commonMistakes: [
            'Taking on too many clients too quickly',
            'Not setting clear boundaries and expectations',
            'Undercharging for specialized skills',
            'Poor time management and organization',
            'Not investing in skill development'
          ]
        };

      case 'online-coaching-consulting':
        return {
          prerequisites: [
            'Expertise or experience in your coaching niche',
            'Strong communication and listening skills',
            'Coaching certification (recommended)',
            'Ability to create structured programs'
          ],
          tools: [
            { name: 'Zoom', purpose: 'Coaching sessions', cost: 'Free/Pro', priority: 'Essential' },
            { name: 'Calendly', purpose: 'Appointment scheduling', cost: 'Free/Paid', priority: 'Essential' },
            { name: 'Teachable', purpose: 'Course platform', cost: '$39+/month', priority: 'Important' },
            { name: 'Stripe', purpose: 'Payment processing', cost: '2.9% + 30¢', priority: 'Essential' },
            { name: 'Notion', purpose: 'Client management', cost: 'Free/Paid', priority: 'Important' },
            { name: 'Loom', purpose: 'Video feedback', cost: 'Free/Paid', priority: 'Recommended' }
          ],
          firstWeekPlan: [
            'Day 1-2: Define your coaching niche and ideal client',
            'Day 3-4: Create coaching packages and pricing structure',
            'Day 5-6: Set up booking system and payment processing',
            'Day 7: Launch with free discovery sessions'
          ],
          firstMonthMilestones: [
            'Week 1: Conduct 10+ discovery sessions',
            'Week 2: Sign first 3-5 paying clients',
            'Week 3: Deliver exceptional results, get testimonials',
            'Week 4: Earn $2000+, develop group program'
          ],
          commonMistakes: [
            'Not niching down enough in target market',
            'Underpricing coaching services',
            'Lack of structure in coaching programs',
            'Not tracking client results and progress',
            'Trying to help everyone instead of ideal clients'
          ]
        };

      case 'print-on-demand':
        return {
          prerequisites: [
            'Basic graphic design skills',
            'Understanding of target markets and trends',
            'Patience for gradual income growth',
            'Creative mindset for design ideas'
          ],
          tools: [
            { name: 'Canva', purpose: 'Design creation', cost: 'Free/Pro', priority: 'Essential' },
            { name: 'Photoshop', purpose: 'Advanced design', cost: '$20+/month', priority: 'Important' },
            { name: 'Printful', purpose: 'POD platform', cost: 'Free (per order)', priority: 'Essential' },
            { name: 'Etsy', purpose: 'Marketplace', cost: 'Listing fees', priority: 'Essential' },
            { name: 'Amazon Merch', purpose: 'POD marketplace', cost: 'Free (commission)', priority: 'Important' },
            { name: 'Redbubble', purpose: 'POD platform', cost: 'Free (commission)', priority: 'Important' }
          ],
          firstWeekPlan: [
            'Day 1-2: Research profitable niches and trending designs',
            'Day 3-4: Create first 10 designs using Canva',
            'Day 5-6: Set up accounts on Printful and Etsy',
            'Day 7: Upload first products and optimize listings'
          ],
          firstMonthMilestones: [
            'Week 1: 20 designs uploaded across platforms',
            'Week 2: First sales, optimize best performers',
            'Week 3: 50+ designs live, expand to new niches',
            'Week 4: $200+ revenue, plan scaling strategy'
          ],
          commonMistakes: [
            'Creating designs without market research',
            'Poor keyword optimization for listings',
            'Not testing different design styles',
            'Focusing on quantity over quality',
            'Ignoring copyright and trademark issues'
          ]
        };

      default:
        return {
          prerequisites: [
            'Basic understanding of the business model',
            'Commitment to learning and growth',
            'Professional work ethic',
            'Access to necessary tools and resources'
          ],
          tools: [
            { name: 'Computer/Laptop', purpose: 'Primary work device', cost: 'Varies', priority: 'Essential' },
            { name: 'Internet Connection', purpose: 'Online work', cost: '$30-80/month', priority: 'Essential' },
            { name: 'Email', purpose: 'Communication', cost: 'Free', priority: 'Essential' }
          ],
          firstWeekPlan: [
            'Day 1-2: Research and understand the business model',
            'Day 3-4: Set up necessary tools and accounts',
            'Day 5-6: Create initial content or offerings',
            'Day 7: Launch and start marketing efforts'
          ],
          firstMonthMilestones: [
            'Week 1: Foundation setup complete',
            'Week 2: First customer or client acquired',
            'Week 3: Optimize and improve offerings',
            'Week 4: Scale and plan for growth'
          ],
          commonMistakes: [
            'Not researching the market thoroughly',
            'Underestimating time and effort required',
            'Poor planning and organization',
            'Not tracking progress and metrics'
          ]
        };
    }
  };

  const guideContent = getGuideContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Complete Guide to Starting {business.name || business.title}</h1>
              <p className="text-gray-600">Step-by-step roadmap to launch your business successfully</p>
            </div>
          </div>
          
          {businessPath?.fitScore && (
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{businessPath.fitScore}%</div>
              <div className="text-sm text-gray-600">Your Match</div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guide Sections</h3>
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Getting Started Overview */}
            <section id="overview" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Getting Started Overview</h2>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Welcome to your complete guide for starting {business.name || business.title}! This comprehensive roadmap will take you from complete beginner to earning your first income. 
                  {quizData && ` Based on your quiz results, this business model is a ${businessPath?.fitScore}% match for your goals and personality.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{business.timeToProfit || business.timeToStart}</div>
                  <div className="text-sm text-gray-600">Time to First Income</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{business.startupCost || business.initialInvestment}</div>
                  <div className="text-sm text-gray-600">Startup Investment</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{business.potentialIncome}</div>
                  <div className="text-sm text-gray-600">Income Potential</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn in This Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete setup process from start to finish</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Essential tools and software recommendations</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Week-by-week action plan for first month</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Common mistakes and how to avoid them</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Prerequisites & Setup */}
            <section id="prerequisites" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Prerequisites & Setup</h2>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Before You Start</h3>
                <div className="space-y-3">
                  {guideContent.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{prereq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {quizData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Your Readiness Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Tech Skills</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-blue-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(quizData.techSkillsRating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-blue-800">{quizData.techSkillsRating}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Time Available</span>
                      <span className="text-sm font-medium text-blue-800">{quizData.weeklyTimeCommitment} hrs/week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Budget</span>
                      <span className="text-sm font-medium text-blue-800">${quizData.upfrontInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Self Motivation</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-blue-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(quizData.selfMotivationLevel / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-blue-800">{quizData.selfMotivationLevel}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Step-by-Step Guide */}
            <section id="step-by-step" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Complete Step-by-Step Guide</h2>
              </div>
              
              <div className="space-y-6">
                {business.actionPlan ? (
                  Object.entries(business.actionPlan).map(([phase, tasks], phaseIndex) => (
                    <div key={phase} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          phaseIndex === 0 ? 'bg-blue-100 text-blue-600' :
                          phaseIndex === 1 ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {phaseIndex + 1}
                        </div>
                        {phase.replace(/(\d+)/, ' $1').replace('phase', 'Phase')}
                      </h3>
                      <div className="space-y-3">
                        {(tasks as string[]).map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-start">
                            <button
                              onClick={() => toggleStepCompletion(`${phase}-${taskIndex}`)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 transition-colors ${
                                completedSteps.has(`${phase}-${taskIndex}`)
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {completedSteps.has(`${phase}-${taskIndex}`) && (
                                <CheckCircle className="h-4 w-4 text-white" />
                              )}
                            </button>
                            <span className={`text-gray-700 ${
                              completedSteps.has(`${phase}-${taskIndex}`) ? 'line-through text-gray-500' : ''
                            }`}>
                              {task}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Detailed action plan coming soon for this business model.
                  </div>
                )}
              </div>
            </section>

            {/* Tools & Software Setup */}
            <section id="tools-setup" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Monitor className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Essential Tools & Software</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guideContent.tools.map((tool, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tool.priority === 'Essential' ? 'bg-red-100 text-red-800' :
                        tool.priority === 'Important' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {tool.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{tool.purpose}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{tool.cost}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                        Learn More
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">💡 Pro Tip</h3>
                <p className="text-yellow-800">
                  Start with the "Essential" tools first. You can always add "Important" and "Recommended" tools as your business grows and generates revenue.
                </p>
              </div>
            </section>

            {/* First Week Plan */}
            <section id="first-week" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Zap className="h-6 w-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your First Week Action Plan</h2>
              </div>
              
              <div className="space-y-4">
                {guideContent.firstWeekPlan.map((day, index) => (
                  <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <span className="text-yellow-800 font-medium">{day}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Week 1 Success Metrics</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Complete all setup tasks</li>
                  <li>• Create your first piece of content/offering</li>
                  <li>• Make contact with potential customers/clients</li>
                  <li>• Establish daily work routine</li>
                </ul>
              </div>
            </section>

            {/* First Month Milestones */}
            <section id="first-month" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">First Month Milestones</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guideContent.firstMonthMilestones.map((milestone, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">Week {index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{milestone}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">Month 1 Success Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">$100+</div>
                    <div className="text-sm text-green-600">First Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">5+</div>
                    <div className="text-sm text-green-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">20+</div>
                    <div className="text-sm text-green-600">Hours/Week</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Scaling & Growth */}
            <section id="scaling" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Scaling & Growth Strategies</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Month 2-3: Optimization</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Analyze what's working and double down</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Streamline processes and workflows</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Increase prices based on value delivered</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Build systems for consistent delivery</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Month 4-6: Expansion</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Expand service/product offerings</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Consider hiring help or outsourcing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Explore new marketing channels</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">Build strategic partnerships</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-3">6-Month Revenue Targets</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">$1,000+</div>
                    <div className="text-sm text-purple-600">Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">20+</div>
                    <div className="text-sm text-purple-600">Regular Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">80%</div>
                    <div className="text-sm text-purple-600">Repeat Business</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section id="common-mistakes" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
              </div>
              
              <div className="space-y-4">
                {guideContent.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800">{mistake}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Success Tip</h3>
                <p className="text-blue-800">
                  Most successful entrepreneurs make mistakes early on. The key is to learn quickly, adapt, and keep moving forward. 
                  Don't let perfectionism prevent you from starting!
                </p>
              </div>
            </section>

            {/* Resources & Templates */}
            <section id="resources" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Resources & Templates</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Free Resources</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Download className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-700">Business Plan Template</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Download className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-700">Financial Tracking Spreadsheet</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Download className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-700">Marketing Calendar Template</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Download className="h-4 w-4 text-gray-500 mr-3" />
                      <span className="text-gray-700">Client Onboarding Checklist</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
                  <div className="space-y-3">
                    {business.resources?.learning?.map((resource: string, index: number) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <ExternalLink className="h-4 w-4 text-blue-500 mr-3" />
                        <span className="text-blue-700">{resource}</span>
                      </div>
                    )) || [
                      <div key={0} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <ExternalLink className="h-4 w-4 text-blue-500 mr-3" />
                        <span className="text-blue-700">Industry-specific courses</span>
                      </div>,
                      <div key={1} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <ExternalLink className="h-4 w-4 text-blue-500 mr-3" />
                        <span className="text-blue-700">YouTube tutorials</span>
                      </div>,
                      <div key={2} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <ExternalLink className="h-4 w-4 text-blue-500 mr-3" />
                        <span className="text-blue-700">Podcasts and blogs</span>
                      </div>
                    ]}
                  </div>
                </div>
              </div>
            </section>

            {/* Community & Support */}
            <section id="community" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">Community & Support</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Join Our Community</h3>
                  <p className="text-blue-100 mb-4">
                    Connect with other entrepreneurs following the same path. Share experiences, get advice, and celebrate wins together.
                  </p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Join Community
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Get Expert Support</h3>
                  <p className="text-blue-100 mb-4">
                    Access one-on-one coaching, group workshops, and expert guidance to accelerate your success.
                  </p>
                  <button className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Start Week 1 Now
                  </button>
                  <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Download Complete Guide
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessGuide;