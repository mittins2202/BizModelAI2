import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Clock, DollarSign, Users, CheckCircle, AlertTriangle, Star, Target, Brain, Lightbulb, Calendar, BarChart3, Award, Zap, BookOpen, Monitor, MessageCircle, Shield, Briefcase, Heart, ExternalLink, ChevronUp, Sparkles, Rocket, Trophy, Siren as Fire, Crown, Gem } from 'lucide-react';
import { QuizData, BusinessPath } from '../types';
import { businessModels } from '../data/businessModels';
import { businessPaths } from '../data/businessPaths';
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
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between p-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Explorer</span>
          </button>
          
          {businessPath?.fitScore && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
            >
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-bold text-lg">{businessPath.fitScore}% Match</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            {/* Business Icon & Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative inline-block mb-8"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <Rocket className="h-16 w-16 text-white" />
              </div>
              {businessPath?.fitScore && businessPath.fitScore >= 80 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2"
                >
                  <Crown className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </motion.div>

            {/* Title with Animated Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                {business.name || business.title}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="inline-block ml-4"
                >
                  <Sparkles className="h-12 w-12 text-yellow-400" />
                </motion.span>
              </h1>
              
              {businessPath?.fitScore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full text-xl font-bold shadow-xl"
                >
                  <Fire className="h-6 w-6 mr-2" />
                  Perfect Match for You!
                </motion.div>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              {business.detailedDescription || business.description}
            </motion.p>

            {/* Key Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Clock className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{business.timeToProfit || business.timeToStart}</div>
                <div className="text-blue-200 text-sm">Time to Profit</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <DollarSign className="h-8 w-8 text-green-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{business.startupCost || business.initialInvestment}</div>
                <div className="text-blue-200 text-sm">Startup Cost</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <TrendingUp className="h-8 w-8 text-purple-300 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{business.potentialIncome}</div>
                <div className="text-blue-200 text-sm">Income Potential</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center">
                <Rocket className="h-5 w-5 mr-2" />
                Get Started Now
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Download Guide
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-t-[3rem] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Guide Sections
                  </h3>
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 ${
                          activeSection === item.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
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
              {/* Business Overview */}
              <section id="overview" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Business Overview</h2>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {business.detailedDescription || business.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900 text-lg">{business.timeToProfit || business.timeToStart}</div>
                    <div className="text-sm text-gray-600">Time to Profit</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <DollarSign className="h-10 w-10 text-green-600 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900 text-lg">{business.startupCost || business.initialInvestment}</div>
                    <div className="text-sm text-gray-600">Startup Cost</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                    <div className="font-semibold text-gray-900 text-lg">{business.potentialIncome}</div>
                    <div className="text-sm text-gray-600">Income Potential</div>
                  </div>
                </div>
              </section>

              {/* Fit Analysis */}
              {quizData && aiAnalysis && (
                <section id="fit-analysis" className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl border border-green-200 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Why This Business Fits You</h2>
                  </div>
                  
                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {aiAnalysis.fullAnalysis}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        Key Insights
                      </h3>
                      <ul className="space-y-3">
                        {aiAnalysis.keyInsights?.map((insight: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Gem className="h-4 w-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Trophy className="h-5 w-5 text-green-500 mr-2" />
                        Success Predictors
                      </h3>
                      <ul className="space-y-3">
                        {aiAnalysis.successPredictors?.map((predictor: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{predictor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* Income Potential */}
              <section id="income-potential" className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-xl border border-purple-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Income Potential & Timeline</h2>
                </div>
                
                {business.averageIncome && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{business.averageIncome.beginner}</div>
                      <div className="text-sm text-gray-600">Beginner (0-6 months)</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{business.averageIncome.intermediate}</div>
                      <div className="text-sm text-gray-600">Intermediate (6-18 months)</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">{business.averageIncome.advanced}</div>
                      <div className="text-sm text-gray-600">Advanced (18+ months)</div>
                    </div>
                  </div>
                )}

                {/* Income Growth Chart Visualization */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Projected Income Growth</h3>
                  <div className="relative">
                    <div className="flex items-end justify-between h-32 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-gray-400 rounded-t" style={{ height: '20%' }}></div>
                        <span className="text-xs text-gray-600 mt-2">Month 1-3</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-blue-400 rounded-t" style={{ height: '40%' }}></div>
                        <span className="text-xs text-gray-600 mt-2">Month 4-6</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                        <span className="text-xs text-gray-600 mt-2">Month 7-12</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-green-500 rounded-t" style={{ height: '80%' }}></div>
                        <span className="text-xs text-gray-600 mt-2">Year 2</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-green-600 rounded-t" style={{ height: '100%' }}></div>
                        <span className="text-xs text-gray-600 mt-2">Year 3+</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      * Income projections based on typical performance with {quizData?.weeklyTimeCommitment || 20} hours/week commitment
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                    Market Size & Opportunity
                  </h3>
                  <p className="text-gray-700">{business.marketSize}</p>
                </div>
              </section>

              {/* Getting Started */}
              <section id="getting-started" className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl border border-yellow-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Getting Started</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-blue-600 font-bold text-lg">1</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Research & Plan</h3>
                      <p className="text-sm text-gray-600">Study the market and create your business plan</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-500">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-green-600 font-bold text-lg">2</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Set Up Tools</h3>
                      <p className="text-sm text-gray-600">Get the essential tools and platforms ready</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-purple-500">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-purple-600 font-bold text-lg">3</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Launch & Test</h3>
                      <p className="text-sm text-gray-600">Start small and iterate based on feedback</p>
                    </div>
                  </div>

                  {/* First Week Action Items */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
                      Your First Week Action Items
                    </h3>
                    <ul className="space-y-3">
                      {business.actionPlan?.phase1?.slice(0, 4).map((action: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{action}</span>
                        </li>
                      )) || [
                        <li key={0} className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <span className="text-gray-700">Research successful examples in your chosen niche</span>
                        </li>,
                        <li key={1} className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <span className="text-gray-700">Set up your workspace and essential tools</span>
                        </li>,
                        <li key={2} className="flex items-start">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <span className="text-gray-700">Define your target audience and value proposition</span>
                        </li>
                      ]}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Skills & Tools */}
              <section id="skills-tools" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Monitor className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Required Skills & Tools</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {(business.skills || business.requiredSkills || []).map((skill: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {quizData && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Your Skill Match</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-green-700">Tech Skills</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-green-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${(quizData.techSkillsRating / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-green-800">{quizData.techSkillsRating}/5</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-700">Communication</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-green-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full" 
                                  style={{ width: `${(quizData.directCommunicationEnjoyment / 5) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-green-800">{quizData.directCommunicationEnjoyment}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Tools</h3>
                    <div className="space-y-2">
                      {(business.tools || []).map((tool: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Monitor className="h-4 w-4 text-gray-500 mr-3" />
                          <span className="text-gray-700">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Pros & Challenges */}
              <section id="pros-cons" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Advantages & Challenges</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Key Advantages
                    </h3>
                    <ul className="space-y-3">
                      {(business.pros || []).map((pro: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                      Potential Challenges
                    </h3>
                    <ul className="space-y-3">
                      {(business.cons || []).map((con: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Success Strategies */}
              {aiAnalysis && (
                <section id="success-strategies" className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-xl border border-purple-200 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Personalized Success Strategies</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                        Recommendations for You
                      </h3>
                      <ul className="space-y-3">
                        {aiAnalysis.personalizedRecommendations?.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Gem className="h-4 w-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="h-5 w-5 text-red-500 mr-2" />
                        Risk Factors to Watch
                      </h3>
                      <ul className="space-y-3">
                        {aiAnalysis.riskFactors?.map((risk: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {/* Market Analysis */}
              <section id="market-analysis" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Market Analysis</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Opportunity</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-900">Market Size</div>
                        <div className="text-blue-800">{business.marketSize}</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-900">Growth Rate</div>
                        <div className="text-green-800">Growing 15-25% annually</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-900">Competition Level</div>
                        <div className="text-purple-800">{business.difficulty === 'Easy' ? 'Moderate' : business.difficulty === 'Medium' ? 'High' : 'Very High'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Factors</h3>
                    <div className="space-y-3">
                      {(business.bestFitPersonality || [
                        "Strong work ethic and consistency",
                        "Willingness to learn and adapt",
                        "Customer-focused mindset"
                      ]).map((trait: string, index: number) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-gray-700">{trait}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Action Plan */}
              <section id="action-plan" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Step-by-Step Action Plan</h2>
                </div>
                
                {business.actionPlan && (
                  <div className="space-y-6">
                    {Object.entries(business.actionPlan).map(([phase, tasks], index) => (
                      <div key={phase} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-white">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            index === 0 ? 'bg-blue-100 text-blue-600' :
                            index === 1 ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {index + 1}
                          </div>
                          {phase.replace(/(\d+)/, ' $1').replace('phase', 'Phase')}
                        </h3>
                        <ul className="space-y-2">
                          {(tasks as string[]).map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <span className="text-blue-600 text-sm font-bold">{taskIndex + 1}</span>
                              </div>
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Resources */}
              <section id="resources" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Learning Resources</h2>
                </div>
                
                {business.resources && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Monitor className="h-5 w-5 text-blue-600 mr-2" />
                        Platforms
                      </h3>
                      <ul className="space-y-2">
                        {business.resources.platforms?.map((platform: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-center">
                            <ExternalLink className="h-3 w-3 mr-2 text-blue-600" />
                            {platform}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                        Learning
                      </h3>
                      <ul className="space-y-2">
                        {business.resources.learning?.map((resource: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-center">
                            <ExternalLink className="h-3 w-3 mr-2 text-green-600" />
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Zap className="h-5 w-5 text-purple-600 mr-2" />
                        Tools
                      </h3>
                      <ul className="space-y-2">
                        {business.resources.tools?.map((tool: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-center">
                            <ExternalLink className="h-3 w-3 mr-2 text-purple-600" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </section>

              {/* Community & Support */}
              <section id="community" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Community & Support</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Join Our Community</h3>
                    <p className="text-blue-100 mb-4">
                      Connect with other entrepreneurs following the same path. Share experiences, get advice, and celebrate wins together.
                    </p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Join Community
                    </button>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
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
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                      <Rocket className="h-5 w-5 mr-2" />
                      Get Started Now
                    </button>
                    <button className="border border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Download Action Plan
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelDetail;