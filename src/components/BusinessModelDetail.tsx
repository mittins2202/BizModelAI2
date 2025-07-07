import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle, 
  AlertTriangle,
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
  Loader,
  Lock,
  Crown
} from 'lucide-react';
import { QuizData, BusinessPath, AIAnalysis } from '../types';
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
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
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

  // Generate and cache AI analysis for paid users
  const generateAndCacheAIAnalysis = useCallback(async (data: QuizData, path: BusinessPath) => {
    if (!businessId) return;

    // Check if we have cached analysis for this business model
    const cacheKey = `ai-analysis-${businessId}`;
    const cachedAnalysis = localStorage.getItem(cacheKey);
    
    if (cachedAnalysis) {
      try {
        const parsedAnalysis = JSON.parse(cachedAnalysis);
        setAiAnalysis(parsedAnalysis);
        setIsLoadingAnalysis(false);
        return;
      } catch (error) {
        console.error('Error parsing cached analysis:', error);
        // Continue to generate new analysis if cache is corrupted
      }
    }

    // Generate new analysis if not cached
    setIsLoadingAnalysis(true);
    try {
      const aiService = AIService.getInstance();
      const analysis = await aiService.generateDetailedAnalysis(data, path);
      
      // Cache the analysis
      localStorage.setItem(cacheKey, JSON.stringify(analysis));
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      // Set fallback analysis
      setAiAnalysis({
        fullAnalysis: "This business model aligns well with your profile and goals based on your quiz responses.",
        keyInsights: ["Good fit for your skills", "Matches your time availability", "Aligns with income goals"],
        personalizedRecommendations: ["Start with basic tools", "Focus on learning", "Build gradually"],
        riskFactors: ["Initial learning curve", "Time investment required"],
        successPredictors: ["Strong motivation", "Good skill match", "Realistic expectations"]
      });
    } finally {
      setIsLoadingAnalysis(false);
    }
  }, [businessId]);

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

    // Handle access control and AI analysis generation
    if (!hasCompletedQuiz) {
      setShowPaywallModal(true);
      setAiAnalysis(null);
      setIsLoadingAnalysis(false);
      return;
    }

    if (!canAccessBusinessModel(businessId)) {
      setShowPaywallModal(true);
      setAiAnalysis(null);
      setIsLoadingAnalysis(false);
      return;
    }

    // User has paid access - generate AI analysis if quiz data is available
    if (quizData && path) {
      generateAndCacheAIAnalysis(quizData, path);
    } else {
      setIsLoadingAnalysis(false);
    }
  }, [businessId, quizData, hasCompletedQuiz, canAccessBusinessModel, generateAndCacheAIAnalysis]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('overview');
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Model Not Found</h1>
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
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center text-blue-300 hover:text-white transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Results
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* AI Match Badge */}
                {businessPath?.fitScore && (
                  <motion.div
                    className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-6"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Crown className="h-5 w-5 text-yellow-300 mr-2" />
                    <span className="text-yellow-200 font-bold">
                      {businessPath.fitScore}% AI Match
                    </span>
                  </motion.div>
                )}

                {/* Business Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {business.name || business.title}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                  {business.detailedDescription || business.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Get Started Now
                  </button>
                  <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Download Guide
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Key Metrics Cards */}
            <div className="lg:col-span-1">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[
                  {
                    icon: Clock,
                    label: 'Time to Profit',
                    value: business.timeToProfit || business.timeToStart,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    icon: DollarSign,
                    label: 'Startup Cost',
                    value: business.startupCost || business.initialInvestment,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    icon: TrendingUp,
                    label: 'Income Potential',
                    value: business.potentialIncome,
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mr-4`}>
                        <metric.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-300 font-medium">{metric.label}</div>
                        <div className="text-xl font-bold text-white">{metric.value}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Guide Sections
                </h3>
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-700 shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                          : 'bg-gray-100'
                      }`}>
                        <item.icon className={`h-5 w-5 ${
                          activeSection === item.id ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Business Overview */}
            <section id="overview" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Business Overview
                </h2>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  {business.detailedDescription || business.description}
                </p>
                
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  This business model has gained significant traction due to its accessibility and scalability. Whether you're looking to supplement your current income or build a full-time business, this path offers multiple revenue streams and growth opportunities. The key to success lies in understanding your target market, delivering consistent value, and building strong relationships with your audience or customers.
                </p>
                
                <p className="text-gray-700 leading-relaxed text-base mb-6">
                  What sets this business model apart is its flexibility and relatively low barrier to entry. You can start small, test different approaches, and scale based on what works best for your situation. Many successful entrepreneurs in this field started as complete beginners and built profitable businesses by focusing on solving real problems for their customers and continuously improving their offerings based on feedback and market demands.
                </p>
              </div>
            </section>

            {/* Fit Analysis - Only show if AI analysis is available */}
            {quizData && (
              <section id="fit-analysis" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Why This Business Fits You
                  </h2>
                </div>
                
                {isLoadingAnalysis ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader className="h-8 w-8 text-blue-600 animate-spin mr-3" />
                    <span className="text-gray-600">Generating personalized analysis...</span>
                  </div>
                ) : aiAnalysis ? (
                  <>
                    <div className="prose max-w-none mb-8">
                      <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
                        {aiAnalysis.fullAnalysis.split('\n').map((paragraph, index) => {
                          const trimmedParagraph = paragraph.trim();
                          if (trimmedParagraph) {
                            return <p key={index}>{trimmedParagraph}</p>;
                          }
                          return null;
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <Star className="h-6 w-6 text-yellow-500 mr-2" />
                          Key Insights
                        </h3>
                        <ul className="space-y-3">
                          {aiAnalysis.keyInsights?.map((insight: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Star className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                          Success Predictors
                        </h3>
                        <ul className="space-y-3">
                          {aiAnalysis.successPredictors?.map((predictor: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{predictor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <Lock className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Analysis Available</h3>
                    <p className="text-gray-600 mb-6 text-lg max-w-md mx-auto">
                      Get detailed insights about why this business model fits your unique profile.
                    </p>
                    <button
                      onClick={() => setShowPaywallModal(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Unlock Full Analysis
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Income Potential */}
            <section id="income-potential" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Income Potential & Timeline
                </h2>
              </div>
              
              {business.averageIncome && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{business.averageIncome.beginner}</div>
                    <div className="text-sm text-gray-600 font-medium">Beginner (0-6 months)</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{business.averageIncome.intermediate}</div>
                    <div className="text-sm text-gray-600 font-medium">Intermediate (6-18 months)</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-2">{business.averageIncome.advanced}</div>
                    <div className="text-sm text-gray-600 font-medium">Advanced (18+ months)</div>
                  </div>
                </div>
              )}

              {/* Income Growth Chart Visualization */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Projected Income Growth</h3>
                <div className="relative">
                  <div className="flex items-end justify-between h-40 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="w-16 bg-gray-400 rounded-t-lg" style={{ height: '20%' }}></div>
                      <span className="text-sm text-gray-600 mt-3 font-medium">Month 1-3</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 bg-blue-400 rounded-t-lg" style={{ height: '40%' }}></div>
                      <span className="text-sm text-gray-600 mt-3 font-medium">Month 4-6</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 bg-blue-500 rounded-t-lg" style={{ height: '60%' }}></div>
                      <span className="text-sm text-gray-600 mt-3 font-medium">Month 7-12</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 bg-green-500 rounded-t-lg" style={{ height: '80%' }}></div>
                      <span className="text-sm text-gray-600 mt-3 font-medium">Year 2</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 bg-green-600 rounded-t-lg" style={{ height: '100%' }}></div>
                      <span className="text-sm text-gray-600 mt-3 font-medium">Year 3+</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    * Income projections based on typical performance with {quizData?.weeklyTimeCommitment || 20} hours/week commitment
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Market Size & Opportunity</h3>
                <p className="text-blue-800 text-lg">{business.marketSize}</p>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mr-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Getting Started
                </h2>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-gray-200 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Research & Plan</h3>
                    <p className="text-gray-600">Study the market and create your business plan</p>
                  </div>
                  <div className="p-6 border border-gray-200 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
                    <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Set Up Tools</h3>
                    <p className="text-gray-600">Get the essential tools and platforms ready</p>
                  </div>
                  <div className="p-6 border border-gray-200 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Launch & Test</h3>
                    <p className="text-gray-600">Start small and iterate based on feedback</p>
                  </div>
                </div>

                {/* First Week Action Items */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-yellow-900 mb-6">Your First Week Action Items</h3>
                  <ul className="space-y-4">
                    {business.actionPlan?.phase1?.slice(0, 4).map((action: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-yellow-800 text-lg">{action}</span>
                      </li>
                    )) || [
                      <li key={0} className="flex items-start">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <span className="text-yellow-800 text-lg">Research successful examples in your chosen niche</span>
                      </li>,
                      <li key={1} className="flex items-start">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <span className="text-yellow-800 text-lg">Set up your workspace and essential tools</span>
                      </li>,
                      <li key={2} className="flex items-start">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <span className="text-yellow-800 text-lg">Define your target audience and value proposition</span>
                      </li>
                    ]}
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills & Tools */}
            <section id="skills-tools" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Required Skills & Tools
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {(business.skills || business.requiredSkills || []).map((skill: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full font-medium border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {quizData && (
                    <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
                      <h4 className="text-xl font-bold text-green-900 mb-4">Your Skill Match</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-green-700 font-medium">Tech Skills</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-green-200 rounded-full h-3 mr-3">
                              <div 
                                className="bg-green-600 h-3 rounded-full" 
                                style={{ width: `${(quizData.techSkillsRating / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-green-800">{quizData.techSkillsRating}/5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700 font-medium">Time Available</span>
                          <span className="font-bold text-green-800">{quizData.weeklyTimeCommitment} hrs/week</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700 font-medium">Budget</span>
                          <span className="font-bold text-green-800">${quizData.upfrontInvestment}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-green-700 font-medium">Self Motivation</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-green-200 rounded-full h-3 mr-3">
                              <div 
                                className="bg-green-600 h-3 rounded-full" 
                                style={{ width: `${(quizData.selfMotivationLevel / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-green-800">{quizData.selfMotivationLevel}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Tools</h3>
                  <div className="space-y-3">
                    {business.tools?.map((tool: string, index: number) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <Monitor className="h-6 w-6 text-gray-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Pros & Challenges */}
            <section id="pros-cons" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Advantages & Challenges
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    Key Advantages
                  </h3>
                  <ul className="space-y-4">
                    {business.pros?.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                    Potential Challenges
                  </h3>
                  <ul className="space-y-4">
                    {business.cons?.map((con: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Success Strategies - Only show if AI analysis is available */}
            {aiAnalysis && (
              <section id="success-strategies" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Personalized Success Strategies
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
                      Recommendations for You
                    </h3>
                    <ul className="space-y-4">
                      {aiAnalysis.personalizedRecommendations?.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                      Risk Factors to Watch
                    </h3>
                    <ul className="space-y-4">
                      {aiAnalysis.riskFactors?.map((risk: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Market Analysis */}
            <section id="market-analysis" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Market Analysis
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Opportunity</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                      <div className="text-lg font-bold text-blue-900 mb-2">Market Size</div>
                      <div className="text-blue-800">{business.marketSize}</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                      <div className="text-lg font-bold text-green-900 mb-2">Growth Rate</div>
                      <div className="text-green-800">Growing 15-25% annually</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                      <div className="text-lg font-bold text-purple-900 mb-2">Competition Level</div>
                      <div className="text-purple-800">{business.difficulty === 'Easy' ? 'Moderate' : business.difficulty === 'Medium' ? 'High' : 'Very High'}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Factors</h3>
                  <div className="space-y-4">
                    {business.bestFitPersonality?.map((trait: string, index: number) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{trait}</span>
                      </div>
                    )) || [
                      <div key={0} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">Strong work ethic and consistency</span>
                      </div>,
                      <div key={1} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">Willingness to learn and adapt</span>
                      </div>,
                      <div key={2} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">Customer-focused mindset</span>
                      </div>
                    ]}
                  </div>
                </div>
              </div>
            </section>

            {/* Action Plan */}
            <section id="action-plan" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Step-by-Step Action Plan
                </h2>
              </div>
              
              {business.actionPlan && (
                <div className="space-y-8">
                  {Object.entries(business.actionPlan).map(([phase, tasks], index) => (
                    <div key={phase} className="border border-gray-200 rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-blue-50">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                        {phase.replace(/(\d+)/, ' $1').replace('phase', 'Phase')}
                      </h3>
                      <ul className="space-y-4">
                        {(tasks as string[]).map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                              <span className="text-white font-bold text-sm">{taskIndex + 1}</span>
                            </div>
                            <span className="text-gray-700 text-lg">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Resources */}
            <section id="resources" className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Learning Resources
                </h2>
              </div>
              
              {business.resources && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Platforms</h3>
                    <ul className="space-y-3">
                      {business.resources.platforms?.map((platform: string, index: number) => (
                        <li key={index} className="text-gray-700 font-medium">{platform}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Learning</h3>
                    <ul className="space-y-3">
                      {business.resources.learning?.map((resource: string, index: number) => (
                        <li key={index} className="text-gray-700 font-medium">{resource}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tools</h3>
                    <ul className="space-y-3">
                      {business.resources.tools?.map((tool: string, index: number) => (
                        <li key={index} className="text-gray-700 font-medium">{tool}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Community & Support */}
            <section id="community" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-xl p-12 text-white">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Community & Support</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Connect with other entrepreneurs following the same path. Share experiences, get advice, and celebrate wins together.
                  </p>
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                    Join Community
                  </button>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Get Expert Support</h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Access one-on-one coaching, group workshops, and expert guidance to accelerate your success.
                  </p>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Ready to Start Your Journey?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                    onClick={handleGetStarted}
                    Get Started Now
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