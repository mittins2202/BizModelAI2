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
import { AIService } from '../utils/aiService';
import { usePaywall } from '../contexts/PaywallContext';
import { PaywallModal } from './PaywallModals';

interface BusinessModelDetailProps {
  quizData?: QuizData | null;
}

const BusinessModelDetail: React.FC<BusinessModelDetailProps> = ({ quizData }) => {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const [businessPath, setBusinessPath] = useState<BusinessPath | null>(null);
  const [businessModel, setBusinessModel] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const { hasCompletedQuiz, canAccessBusinessModel, setHasUnlockedAnalysis } = usePaywall();

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Business Overview', icon: BarChart3 },
    { id: 'fit-analysis', label: 'Why This Fits You', icon: Target },
    { id: 'income-potential', label: 'Income Potential', icon: TrendingUp },
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'skills-tools', label: 'Skills & Tools', icon: Monitor },
    { id: 'pros-cons', label: 'Pros & Challenges', icon: Award },
    { id: 'success-strategies', label: 'Success Strategies', icon: Brain },
    { id: 'market-analysis', label: 'Market Analysis', icon: BarChart3 },
    { id: 'action-plan', label: 'Action Plan', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'community', label: 'Community & Support', icon: Users }
  ];

  useEffect(() => {
    if (!businessId) return;

    // Check access permissions
    if (!hasCompletedQuiz) {
      setShowPaywallModal(true);
      return;
    }

    if (!canAccessBusinessModel(businessId)) {
      setShowPaywallModal(true);
      return;
    }

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

    // Generate AI analysis if quiz data is available
    if (quizData && path) {
      generateAIAnalysis(quizData, path);
    } else {
      setIsLoadingAnalysis(false);
    }
  }, [businessId, quizData, hasCompletedQuiz, canAccessBusinessModel]);

  const generateAIAnalysis = async (data: QuizData, path: BusinessPath) => {
    try {
      const aiService = AIService.getInstance();
      const analysis = await aiService.generateDetailedAnalysis(data, path);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      // Set fallback analysis
      setAiAnalysis({
        fullAnalysis: "This business model aligns well with your profile and goals.",
        keyInsights: ["Good fit for your skills", "Matches your time availability", "Aligns with income goals"],
        personalizedRecommendations: ["Start with basic tools", "Focus on learning", "Build gradually"],
        riskFactors: ["Initial learning curve", "Time investment required"],
        successPredictors: ["Strong motivation", "Good skill match", "Realistic expectations"]
      });
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

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

  const handlePaywallUnlock = () => {
    setHasUnlockedAnalysis(true);
    setShowPaywallModal(false);
    window.location.reload(); // Refresh to show content
  };

  const handlePaywallClose = () => {
    setShowPaywallModal(false);
    navigate('/explore');
  };

  // Function to clean markdown formatting from AI analysis
  const cleanMarkdownText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .replace(/#{1,6}\s/g, '') // Remove heading markdown
      .replace(/^\s*[-*+]\s/gm, '') // Remove bullet points
      .replace(/^\s*\d+\.\s/gm, '') // Remove numbered lists
      .trim();
  };

  if (showPaywallModal) {
    return (
      <PaywallModal
        isOpen={true}
        onClose={handlePaywallClose}
        onUnlock={handlePaywallUnlock}
        type={hasCompletedQuiz ? "learn-more" : "quiz-required"}
        title={businessPath?.name || businessModel?.title}
      />
    );
  }

  if (!businessPath && !businessModel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Business Model Not Found</h1>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            
            {businessPath?.fitScore && (
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{businessPath.fitScore}%</div>
                <div className="text-sm text-blue-200">Your Match</div>
              </div>
            )}
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{business.name || business.title}</h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Complete guide and personalized analysis for your perfect business match
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => scrollToSection('overview')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started Now
              </button>
              <button
                onClick={() => navigate(`/guide/${businessId}`)}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Step-by-Step Guide
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Guide Sections</h3>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center px-2 py-2 text-left rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-8">
            {/* Business Overview */}
            <section id="overview" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Business Overview</h2>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  {business.detailedDescription || business.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">{business.timeToProfit || business.timeToStart}</div>
                  <div className="text-xs text-gray-600">Time to Profit</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">{business.startupCost || business.initialInvestment}</div>
                  <div className="text-xs text-gray-600">Startup Cost</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900 text-sm">{business.potentialIncome}</div>
                  <div className="text-xs text-gray-600">Income Potential</div>
                </div>
              </div>
            </section>

            {/* Fit Analysis */}
            {quizData && aiAnalysis && (
              <section id="fit-analysis" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Why This Business Fits You</h2>
                </div>
                
                <div className="prose max-w-none mb-4">
                  <p className="text-base text-gray-700 leading-relaxed">
                    {cleanMarkdownText(aiAnalysis.fullAnalysis)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Key Insights</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.keyInsights?.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Success Predictors</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.successPredictors?.map((predictor: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{predictor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Income Potential */}
            <section id="income-potential" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Income Potential & Timeline</h2>
              </div>
              
              {business.averageIncome && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 mb-1">{business.averageIncome.beginner}</div>
                    <div className="text-xs text-gray-600">Beginner (0-6 months)</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600 mb-1">{business.averageIncome.intermediate}</div>
                    <div className="text-xs text-gray-600">Intermediate (6-18 months)</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600 mb-1">{business.averageIncome.advanced}</div>
                    <div className="text-xs text-gray-600">Advanced (18+ months)</div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Market Size & Opportunity</h3>
                <p className="text-sm text-blue-800">{business.marketSize}</p>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-5 w-5 text-yellow-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Getting Started</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Research & Plan</h3>
                    <p className="text-xs text-gray-600">Study the market and create your business plan</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-green-600 font-bold text-sm">2</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Set Up Tools</h3>
                    <p className="text-xs text-gray-600">Get the essential tools and platforms ready</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Launch & Test</h3>
                    <p className="text-xs text-gray-600">Start small and iterate based on feedback</p>
                  </div>
                </div>

                {/* First Week Action Items */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2 text-sm">Your First Week Action Items</h3>
                  <ul className="space-y-1">
                    {business.actionPlan?.phase1?.slice(0, 4).map((action: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-sm text-yellow-800">{action}</span>
                      </li>
                    )) || [
                      <li key={0} className="flex items-start">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm text-yellow-800">Research successful examples in your chosen niche</span>
                      </li>,
                      <li key={1} className="flex items-start">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm text-yellow-800">Set up your workspace and essential tools</span>
                      </li>,
                      <li key={2} className="flex items-start">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <span className="text-sm text-yellow-800">Define your target audience and value proposition</span>
                      </li>
                    ]}
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills & Tools */}
            <section id="skills-tools" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Monitor className="h-5 w-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Required Skills & Tools</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Essential Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {(business.skills || business.requiredSkills || []).map((skill: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {quizData && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2 text-sm">Your Skill Match</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">Tech Skills</span>
                          <div className="flex items-center">
                            <div className="w-12 bg-green-200 rounded-full h-1.5 mr-2">
                              <div 
                                className="bg-green-600 h-1.5 rounded-full" 
                                style={{ width: `${(quizData.techSkillsRating / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-green-800">{quizData.techSkillsRating}/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-700">Time Available</span>
                          <span className="text-xs font-medium text-green-800">{quizData.weeklyTimeCommitment} hrs/week</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Recommended Tools</h3>
                  <div className="space-y-1">
                    {business.tools?.map((tool: string, index: number) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <Monitor className="h-3 w-3 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Pros & Challenges */}
            <section id="pros-cons" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Award className="h-5 w-5 text-yellow-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Advantages & Challenges</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Key Advantages
                  </h3>
                  <ul className="space-y-2">
                    {business.pros?.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                    Potential Challenges
                  </h3>
                  <ul className="space-y-2">
                    {business.cons?.map((con: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-3 w-3 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Success Strategies */}
            {aiAnalysis && (
              <section id="success-strategies" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <Brain className="h-5 w-5 text-purple-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Personalized Success Strategies</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Recommendations for You</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.personalizedRecommendations?.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Lightbulb className="h-3 w-3 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Risk Factors to Watch</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.riskFactors?.map((risk: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-3 w-3 text-red-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Market Analysis */}
            <section id="market-analysis" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Market Analysis</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Market Opportunity</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-900 text-sm">Market Size</div>
                      <div className="text-sm text-blue-800">{business.marketSize}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-900 text-sm">Growth Rate</div>
                      <div className="text-sm text-green-800">Growing 15-25% annually</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-900 text-sm">Competition Level</div>
                      <div className="text-sm text-purple-800">{business.difficulty === 'Easy' ? 'Moderate' : business.difficulty === 'Medium' ? 'High' : 'Very High'}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Success Factors</h3>
                  <div className="space-y-2">
                    {business.bestFitPersonality?.map((trait: string, index: number) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{trait}</span>
                      </div>
                    )) || [
                      <div key={0} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">Strong work ethic and consistency</span>
                      </div>,
                      <div key={1} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">Willingness to learn and adapt</span>
                      </div>,
                      <div key={2} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">Customer-focused mindset</span>
                      </div>
                    ]}
                  </div>
                </div>
              </div>
            </section>

            {/* Action Plan */}
            <section id="action-plan" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Step-by-Step Action Plan</h2>
              </div>
              
              {business.actionPlan && (
                <div className="space-y-4">
                  {Object.entries(business.actionPlan).map(([phase, tasks], index) => (
                    <div key={phase} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-3 capitalize">
                        {phase.replace(/(\d+)/, ' $1').replace('phase', 'Phase')}
                      </h3>
                      <ul className="space-y-1">
                        {(tasks as string[]).map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start">
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <span className="text-blue-600 text-xs font-bold">{taskIndex + 1}</span>
                            </div>
                            <span className="text-sm text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Resources */}
            <section id="resources" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Learning Resources</h2>
              </div>
              
              {business.resources && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Platforms</h3>
                    <ul className="space-y-1">
                      {business.resources.platforms?.map((platform: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">{platform}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Learning</h3>
                    <ul className="space-y-1">
                      {business.resources.learning?.map((resource: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">{resource}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Tools</h3>
                    <ul className="space-y-1">
                      {business.resources.tools?.map((tool: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">{tool}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Community & Support */}
            <section id="community" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-white mr-2" />
                <h2 className="text-xl font-bold text-white">Community & Support</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">Join Our Community</h3>
                  <p className="text-blue-100 mb-3 text-sm">
                    Connect with other entrepreneurs following the same path. Share experiences, get advice, and celebrate wins together.
                  </p>
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
                    Join Community
                  </button>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">Get Expert Support</h3>
                  <p className="text-blue-100 mb-3 text-sm">
                    Access one-on-one coaching, group workshops, and expert guidance to accelerate your success.
                  </p>
                  <button className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-3">Ready to Start Your Journey?</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
                    Get Started Now
                  </button>
                  <button className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm">
                    Download Action Plan
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

export default BusinessModelDetail;