import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Star,
  Play,
  BookOpen,
  Target,
  Lightbulb,
  Zap,
  Users,
  Award,
  Calendar,
  BarChart3,
  Rocket,
  Heart,
  Shield,
  Globe,
  Smartphone,
  Camera,
  Edit3,
  MessageCircle,
  ThumbsUp,
  Eye,
  Share2,
  Download,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Trophy,
  Gift,
  Compass,
  Map,
  Flag
} from 'lucide-react';
import { businessPaths } from '../data/businessPaths';
import { QuizData } from '../types';

interface BusinessGuideProps {
  quizData?: QuizData | null;
}

const BusinessGuide: React.FC<BusinessGuideProps> = ({ quizData }) => {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const business = businessPaths.find(b => b.id === businessId);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Guide Not Found</h1>
          <p className="text-gray-600 mb-6">The business guide you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Explore Business Models
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'getting-started', label: 'Getting Started', icon: Rocket },
    { id: 'action-plan', label: 'Action Plan', icon: Map },
    { id: 'tools-resources', label: 'Tools & Resources', icon: Zap },
    { id: 'income-potential', label: 'Income Potential', icon: TrendingUp },
    { id: 'challenges', label: 'Challenges & Solutions', icon: Shield },
    { id: 'success-tips', label: 'Success Tips', icon: Trophy }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progressPercentage = (completedSteps.length / 21) * 100; // 21 total actionable steps

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-400/15 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-100 hover:text-white mb-8 transition-colors group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Results
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/30 rounded-full px-6 py-3 mb-6">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-300" />
                <span className="text-yellow-200 font-semibold">Complete Business Guide</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Master
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
                  {business.name}
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Your complete roadmap to building a successful {business.name.toLowerCase()} business. 
                From zero to profitable in record time.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{business.timeToProfit}</div>
                  <div className="text-blue-200 text-sm">Time to Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{business.startupCost}</div>
                  <div className="text-blue-200 text-sm">Startup Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{business.difficulty}</div>
                  <div className="text-blue-200 text-sm">Difficulty</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveSection('getting-started')}
                  className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-xl"
                >
                  <Play className="h-6 w-6 mr-3" />
                  Start Building Now
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setActiveSection('overview')}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                >
                  <BookOpen className="h-6 w-6 mr-3" />
                  Learn More First
                </button>
              </div>
            </motion.div>

            {/* Progress Circle */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white mb-2">{Math.round(progressPercentage)}%</div>
                    <div className="text-blue-200 font-medium">Complete</div>
                    <div className="text-blue-300 text-sm mt-2">{completedSteps.length}/21 Steps</div>
                  </div>
                </div>
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-64 h-64 transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeSection === section.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <section.icon className="h-4 w-4 mr-2" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* What Is This Business */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">What is {business.name}?</h2>
                    <p className="text-blue-700 font-medium">Understanding the fundamentals</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {business.detailedDescription}
                </p>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Market Size & Opportunity</h3>
                  <p className="text-gray-700 font-medium">{business.marketSize}</p>
                </div>
              </div>

              {/* Income Potential */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Income Potential</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                      <span className="font-medium text-gray-700">Beginner</span>
                      <span className="font-bold text-green-700">{business.averageIncome.beginner}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                      <span className="font-medium text-gray-700">Intermediate</span>
                      <span className="font-bold text-green-700">{business.averageIncome.intermediate}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                      <span className="font-medium text-gray-700">Advanced</span>
                      <span className="font-bold text-green-700">{business.averageIncome.advanced}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Best Fit Personality</h3>
                  </div>
                  <div className="space-y-3">
                    {business.bestFitPersonality.map((trait, index) => (
                      <div key={index} className="flex items-center p-3 bg-white/60 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <ThumbsUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Why This Works</h3>
                  </div>
                  <div className="space-y-3">
                    {business.pros.map((pro, index) => (
                      <div key={index} className="flex items-start p-4 bg-white/60 rounded-xl">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Potential Challenges</h3>
                  </div>
                  <div className="space-y-3">
                    {business.cons.map((con, index) => (
                      <div key={index} className="flex items-start p-4 bg-white/60 rounded-xl">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Getting Started Section */}
          {activeSection === 'getting-started' && (
            <motion.div
              key="getting-started"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Prerequisites */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Before You Start</h2>
                    <p className="text-orange-700 font-medium">Essential prerequisites and mindset</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="h-6 w-6 text-orange-600 mr-3" />
                      Time Investment
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Plan to dedicate at least 10-15 hours per week initially. Consistency beats intensity.
                    </p>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <p className="text-orange-800 text-sm font-medium">
                        💡 Tip: Block out specific hours each day rather than hoping to find time
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="h-6 w-6 text-green-600 mr-3" />
                      Budget Requirements
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Starting budget: {business.startupCost}. You can start lean and scale up.
                    </p>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-green-800 text-sm font-medium">
                        💰 Many successful entrepreneurs started with less than $500
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Skills You'll Need</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {business.skills.map((skill, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-blue-100 p-4 rounded-xl">
                  <p className="text-blue-800 font-medium">
                    🎯 Don't worry if you don't have all these skills yet. You'll develop them as you go!
                  </p>
                </div>
              </div>

              {/* First Week Action Items */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl p-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Your First Week</h3>
                </div>
                <div className="space-y-4">
                  {business.actionPlan.phase1.map((action, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 flex items-start">
                      <button
                        onClick={() => handleStepComplete(`week1-${index}`)}
                        className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 mt-1 transition-all duration-300 ${
                          completedSteps.includes(`week1-${index}`)
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {completedSteps.includes(`week1-${index}`) && (
                          <CheckCircle className="h-6 w-6 text-white" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Day {index + 1}</h4>
                        <p className="text-gray-700">{action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Plan Section */}
          {activeSection === 'action-plan' && (
            <motion.div
              key="action-plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Timeline Overview */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                    <Map className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Success Roadmap</h2>
                    <p className="text-purple-700 font-medium">Step-by-step path to profitability</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { phase: 'Week 1', color: 'from-blue-500 to-blue-600', icon: Rocket },
                    { phase: 'Month 1', color: 'from-green-500 to-green-600', icon: Target },
                    { phase: 'Month 3', color: 'from-orange-500 to-orange-600', icon: TrendingUp },
                    { phase: 'Month 6', color: 'from-purple-500 to-purple-600', icon: Trophy }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.phase}</h3>
                      <p className="text-gray-600 text-sm">Foundation & Setup</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Action Plans */}
              <div className="space-y-8">
                {/* Month 1 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Month 1: Foundation</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {business.actionPlan.phase2.map((action, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex items-start">
                        <button
                          onClick={() => handleStepComplete(`month1-${index}`)}
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 mt-1 transition-all duration-300 ${
                            completedSteps.includes(`month1-${index}`)
                              ? 'bg-green-600 border-green-600'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {completedSteps.includes(`month1-${index}`) && (
                            <CheckCircle className="h-5 w-5 text-white" />
                          )}
                        </button>
                        <span className="text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month 3 */}
                <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Month 3: Growth</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {business.actionPlan.phase3.map((action, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex items-start">
                        <button
                          onClick={() => handleStepComplete(`month3-${index}`)}
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 mt-1 transition-all duration-300 ${
                            completedSteps.includes(`month3-${index}`)
                              ? 'bg-orange-600 border-orange-600'
                              : 'border-gray-300 hover:border-orange-400'
                          }`}
                        >
                          {completedSteps.includes(`month3-${index}`) && (
                            <CheckCircle className="h-5 w-5 text-white" />
                          )}
                        </button>
                        <span className="text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tools & Resources Section */}
          {activeSection === 'tools-resources' && (
            <motion.div
              key="tools-resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Essential Tools */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Essential Tools</h2>
                    <p className="text-blue-700 font-medium">Everything you need to get started</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {business.tools.map((tool, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{tool}</h3>
                      <p className="text-gray-600 text-sm">Essential for your workflow</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Resources */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Learning Platforms</h3>
                  </div>
                  <div className="space-y-3">
                    {business.resources.learning.map((resource, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex items-center">
                        <BookOpen className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-3xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Key Platforms</h3>
                  </div>
                  <div className="space-y-3">
                    {business.resources.platforms.map((platform, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 flex items-center">
                        <Globe className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Income Potential Section */}
          {activeSection === 'income-potential' && (
            <motion.div
              key="income-potential"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Income Breakdown */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mr-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Income Potential</h2>
                    <p className="text-green-700 font-medium">What you can realistically expect to earn</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Beginner</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">{business.averageIncome.beginner}</div>
                    <p className="text-gray-600 text-sm">First 3-6 months</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Intermediate</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">{business.averageIncome.intermediate}</div>
                    <p className="text-gray-600 text-sm">6-12 months</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">{business.averageIncome.advanced}</div>
                    <p className="text-gray-600 text-sm">12+ months</p>
                  </div>
                </div>
              </div>

              {/* Revenue Streams */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Multiple Revenue Streams</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Primary Income</h4>
                    <p className="text-gray-700 mb-4">Your main revenue source from core business activities.</p>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-blue-800 text-sm font-medium">
                        💰 Typically 60-80% of total income
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Secondary Income</h4>
                    <p className="text-gray-700 mb-4">Additional revenue from related services or products.</p>
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <p className="text-indigo-800 text-sm font-medium">
                        📈 Can add 20-40% to your total earnings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Challenges & Solutions Section */}
          {activeSection === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Common Struggles */}
              <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Common Challenges</h2>
                    <p className="text-orange-700 font-medium">What to expect and how to overcome them</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {business.userStruggles.map((struggle, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                          <AlertTriangle className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">Challenge #{index + 1}</h3>
                          <p className="text-gray-700 mb-4">{struggle}</p>
                          <div className="bg-orange-100 p-3 rounded-lg">
                            <p className="text-orange-800 text-sm font-medium">
                              💡 Solution: {business.solutions[index] || "Focus on consistent daily action and seek mentorship."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Tips Section */}
          {activeSection === 'success-tips' && (
            <motion.div
              key="success-tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* Success Strategies */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-3xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mr-6">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Success Strategies</h2>
                    <p className="text-amber-700 font-medium">Proven tactics from successful entrepreneurs</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Start before you feel ready - perfectionism kills progress",
                    "Focus on solving real problems for real people",
                    "Build systems and processes early for scalability",
                    "Track metrics and make data-driven decisions",
                    "Network strategically within your industry",
                    "Invest in continuous learning and skill development"
                  ].map((tip, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final CTA */}
              <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center">
                <div className="max-w-3xl mx-auto">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Building?</h2>
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    You now have everything you need to succeed with {business.name}. 
                    The only thing left is to take action.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setActiveSection('getting-started')}
                      className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    >
                      Review Action Plan
                    </button>
                    <button
                      onClick={() => navigate('/results')}
                      className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                    >
                      Back to Results
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BusinessGuide;