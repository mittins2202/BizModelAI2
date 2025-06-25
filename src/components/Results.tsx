import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  Star,
  Zap,
  Target,
  Brain,
  Award,
  Users,
  ArrowRight,
  Download,
  Share2,
  BookOpen,
  Lightbulb,
  BarChart3,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { QuizData, BusinessPath } from '../types';
import { generatePersonalizedPaths } from '../utils/quizLogic';
import { AIService } from '../utils/aiService';
import BusinessCardGrid from './BusinessCardGrid';
import { useNavigate } from 'react-router-dom';
import { usePaywall } from '../contexts/PaywallContext';
import { PaywallModal } from './PaywallModals';

interface ResultsProps {
  quizData: QuizData;
  onBack: () => void;
  userEmail?: string | null;
}

const Results: React.FC<ResultsProps> = ({ quizData, userEmail }) => {
  const [personalizedPaths, setPersonalizedPaths] = useState<BusinessPath[]>([]);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [paywallType, setPaywallType] = useState<'business-model' | 'learn-more' | 'full-report'>('full-report');
  const navigate = useNavigate();
  const { hasUnlockedAnalysis, setHasUnlockedAnalysis, setHasCompletedQuiz } = usePaywall();

  useEffect(() => {
    // Mark quiz as completed
    setHasCompletedQuiz(true);
    
    // Generate personalized paths
    const paths = generatePersonalizedPaths(quizData);
    setPersonalizedPaths(paths);

    // Generate AI insights
    const generateInsights = async () => {
      try {
        const aiService = AIService.getInstance();
        const insights = await aiService.generatePersonalizedInsights(quizData, paths.slice(0, 3));
        setAiInsights(insights);
      } catch (error) {
        console.error('Error generating AI insights:', error);
        // Set fallback insights
        setAiInsights({
          personalizedSummary: "Your unique combination of traits makes you well-suited for entrepreneurial success.",
          customRecommendations: [
            "Start with proven tools and systems to minimize learning curve",
            "Focus on systematic execution rather than trying to reinvent approaches",
            "Leverage your natural strengths while gradually building new skills"
          ],
          potentialChallenges: [
            "Initial learning curve may require patience and persistence",
            "Income may be inconsistent in the first few months"
          ],
          successStrategies: [
            "Set realistic 90-day milestones to maintain motivation",
            "Join online communities for support and networking",
            "Track your progress and celebrate small wins"
          ],
          personalizedActionPlan: {
            week1: ["Research your chosen business model", "Set up basic tools", "Define your target market"],
            month1: ["Launch your minimum viable offering", "Create marketing materials", "Gather initial feedback"],
            month3: ["Optimize based on feedback", "Scale marketing efforts", "Build strategic partnerships"],
            month6: ["Analyze performance", "Expand offerings", "Build team or outsource tasks"]
          },
          motivationalMessage: "Your unique combination of skills and drive positions you perfectly for entrepreneurial success."
        });
      } finally {
        setIsLoadingInsights(false);
      }
    };

    generateInsights();
  }, [quizData, setHasCompletedQuiz]);

  const handleLearnMore = (businessId: string) => {
    if (hasUnlockedAnalysis) {
      navigate(`/business/${businessId}`);
    } else {
      setPaywallType('learn-more');
      setShowPaywallModal(true);
    }
  };

  const handleGetStarted = (businessId: string) => {
    // For now, same as learn more - could be different action
    handleLearnMore(businessId);
  };

  const handleViewFullReport = (businessId: string) => {
    if (hasUnlockedAnalysis) {
      navigate(`/business/${businessId}`);
    } else {
      setPaywallType('full-report');
      setShowPaywallModal(true);
    }
  };

  const handlePaywallUnlock = () => {
    // Simulate payment and unlock access
    setHasUnlockedAnalysis(true);
    setShowPaywallModal(false);
  };

  const handlePaywallClose = () => {
    setShowPaywallModal(false);
  };

  const topThreePaths = personalizedPaths.slice(0, 3);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'matches', label: 'Your Matches', icon: Target },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'action-plan', label: 'Action Plan', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Personalized Business Blueprint
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Based on your comprehensive assessment, we've identified your perfect business matches. 
            Here's your roadmap to entrepreneurial success.
          </p>

          {userEmail && (
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-6 py-3 text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Results saved to {userEmail}</span>
            </div>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              icon: Target,
              label: 'Top Match',
              value: `${topThreePaths[0]?.fitScore || 0}%`,
              description: topThreePaths[0]?.name || 'Loading...',
              color: 'green'
            },
            {
              icon: Clock,
              label: 'Time to Profit',
              value: topThreePaths[0]?.timeToProfit || 'Loading...',
              description: 'Estimated timeline',
              color: 'blue'
            },
            {
              icon: DollarSign,
              label: 'Startup Cost',
              value: topThreePaths[0]?.startupCost || 'Loading...',
              description: 'Initial investment',
              color: 'purple'
            },
            {
              icon: TrendingUp,
              label: 'Income Potential',
              value: topThreePaths[0]?.potentialIncome || 'Loading...',
              description: 'Monthly earning potential',
              color: 'orange'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'overview' && (
              <OverviewTab 
                topPath={topThreePaths[0]} 
                aiInsights={aiInsights}
                isLoadingInsights={isLoadingInsights}
              />
            )}

            {activeTab === 'matches' && (
              <MatchesTab 
                paths={topThreePaths}
                onLearnMore={handleLearnMore}
                onGetStarted={handleGetStarted}
                onViewFullReport={handleViewFullReport}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsTab 
                aiInsights={aiInsights}
                isLoadingInsights={isLoadingInsights}
                hasUnlockedAnalysis={hasUnlockedAnalysis}
                onUnlock={() => setShowPaywallModal(true)}
              />
            )}

            {activeTab === 'action-plan' && (
              <ActionPlanTab 
                aiInsights={aiInsights}
                isLoadingInsights={isLoadingInsights}
                topPath={topThreePaths[0]}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            You have your personalized roadmap. Now it's time to take action and build the business of your dreams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleViewFullReport(topThreePaths[0]?.id)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Detailed Action Plan
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Explore All Options
            </button>
          </div>
        </motion.div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywallModal}
        onClose={handlePaywallClose}
        onUnlock={handlePaywallUnlock}
        type={paywallType}
      />
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{
  topPath: BusinessPath;
  aiInsights: any;
  isLoadingInsights: boolean;
}> = ({ topPath, aiInsights, isLoadingInsights }) => {
  if (!topPath) {
    return <div className="text-center py-12">Loading your results...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Match Highlight */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-6">
            <Star className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Match</h2>
            <p className="text-lg text-gray-600">AI-recommended based on your unique profile</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{topPath.name}</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{topPath.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Fit Score:</span>
                <span className="font-bold text-green-600">{topPath.fitScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-medium">{topPath.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time to Profit:</span>
                <span className="font-medium">{topPath.timeToProfit}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
            <ul className="space-y-2">
              {topPath.pros.slice(0, 4).map((pro, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      {isLoadingInsights ? (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <Brain className="h-6 w-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">AI Analysis</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {aiInsights?.personalizedSummary || "Your unique combination of traits makes you well-suited for entrepreneurial success."}
          </p>
        </div>
      )}

      {/* Quick Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-6 w-6 text-yellow-500 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Quick Wins</h3>
          </div>
          <ul className="space-y-2">
            {(aiInsights?.customRecommendations || []).slice(0, 3).map((rec: string, index: number) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Watch Out For</h3>
          </div>
          <ul className="space-y-2">
            {(aiInsights?.potentialChallenges || []).slice(0, 3).map((challenge: string, index: number) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Matches Tab Component
const MatchesTab: React.FC<{
  paths: BusinessPath[];
  onLearnMore: (id: string) => void;
  onGetStarted: (id: string) => void;
  onViewFullReport: (id: string) => void;
}> = ({ paths, onLearnMore, onGetStarted, onViewFullReport }) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Top Business Matches</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your assessment, these are the business models that best align with your goals, 
          personality, and resources.
        </p>
      </div>

      <BusinessCardGrid
        businesses={paths.map(path => ({
          id: path.id,
          name: path.name,
          description: path.description,
          fitScore: path.fitScore,
          difficulty: path.difficulty as 'Easy' | 'Medium' | 'Hard',
          timeToProfit: path.timeToProfit,
          startupCost: path.startupCost,
          potentialIncome: path.potentialIncome,
          pros: path.pros,
          cons: path.cons,
          skills: path.skills,
          icon: path.icon
        }))}
        onLearnMore={onLearnMore}
        onGetStarted={onGetStarted}
        onViewFullReport={onViewFullReport}
      />
    </div>
  );
};

// Insights Tab Component
const InsightsTab: React.FC<{
  aiInsights: any;
  isLoadingInsights: boolean;
  hasUnlockedAnalysis: boolean;
  onUnlock: () => void;
}> = ({ aiInsights, isLoadingInsights, hasUnlockedAnalysis, onUnlock }) => {
  if (isLoadingInsights) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!hasUnlockedAnalysis) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Unlock AI Insights</h3>
        <p className="text-gray-600 mb-6">
          Get detailed AI analysis of your personality, custom recommendations, and success strategies.
        </p>
        <button
          onClick={onUnlock}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Unlock for $9.99
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Custom Recommendations */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <Target className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Personalized Recommendations</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {(aiInsights?.customRecommendations || []).map((rec: string, index: number) => (
            <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Strategies */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6">
          <Award className="h-6 w-6 text-green-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Success Strategies</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {(aiInsights?.successStrategies || []).map((strategy: string, index: number) => (
            <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg">
              <Star className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{strategy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
        <Zap className="h-8 w-8 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-4">Your Success Message</h3>
        <p className="text-lg leading-relaxed">
          {aiInsights?.motivationalMessage || "Your unique combination of skills and drive positions you perfectly for entrepreneurial success."}
        </p>
      </div>
    </div>
  );
};

// Action Plan Tab Component
const ActionPlanTab: React.FC<{
  aiInsights: any;
  isLoadingInsights: boolean;
  topPath: BusinessPath;
}> = ({ aiInsights, isLoadingInsights, topPath }) => {
  if (isLoadingInsights) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const actionPlan = aiInsights?.personalizedActionPlan || {};
  const phases = [
    { key: 'week1', title: 'Week 1: Foundation', icon: Calendar, color: 'blue' },
    { key: 'month1', title: 'Month 1: Launch', icon: Zap, color: 'green' },
    { key: 'month3', title: 'Month 3: Growth', icon: TrendingUp, color: 'purple' },
    { key: 'month6', title: 'Month 6: Scale', icon: Award, color: 'orange' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Personalized Action Plan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A step-by-step roadmap to launch and grow your {topPath?.name || 'business'} successfully.
        </p>
      </div>

      <div className="grid gap-8">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 bg-${phase.color}-100 rounded-xl flex items-center justify-center mr-4`}>
                <phase.icon className={`h-6 w-6 text-${phase.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
            </div>
            
            <div className="space-y-3">
              {(actionPlan[phase.key] || []).map((task: string, taskIndex: number) => (
                <div key={taskIndex} className="flex items-start">
                  <div className={`w-6 h-6 bg-${phase.color}-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                    <span className={`text-${phase.color}-600 text-sm font-bold`}>{taskIndex + 1}</span>
                  </div>
                  <span className="text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Download/Share Actions */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Take Your Plan With You</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>
          <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Share2 className="h-5 w-5 mr-2" />
            Share Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;