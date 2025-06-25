import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Zap,
  Target,
  Award,
  Users,
  BarChart3,
  Lightbulb,
  Shield,
  Brain,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { QuizData, BusinessPath } from '../types';
import { generatePersonalizedPaths } from '../utils/quizLogic';
import { AIService } from '../utils/aiService';
import { useNavigate } from 'react-router-dom';

interface ResultsProps {
  quizData: QuizData;
  onBack: () => void;
  userEmail?: string | null;
}

const Results: React.FC<ResultsProps> = ({ quizData, onBack, userEmail }) => {
  const [personalizedPaths, setPersonalizedPaths] = useState<BusinessPath[]>([]);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [quizData]);

  const topThreePaths = personalizedPaths.slice(0, 3);

  const handleLearnMore = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  const handleGetStarted = (businessId: string) => {
    navigate(`/guide/${businessId}`);
  };

  const handleViewFullReport = () => {
    navigate('/full-report');
  };

  const toggleCardExpansion = (businessId: string) => {
    setExpandedCard(current => current === businessId ? null : businessId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-5 w-5 mr-2" />
            Quiz Complete! Your Results Are Ready
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Perfect Business Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Based on your responses, we've identified the business models that best align with your goals, 
            personality, and lifestyle. Here are your top 3 matches, ranked by compatibility.
          </p>

          {userEmail && (
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Results saved to {userEmail}
            </div>
          )}
        </motion.div>

        {/* AI-Generated Report Preview */}
        {!isLoadingInsights && aiInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-700/20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
            
            <div className="relative">
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-white mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold">AI-Generated Personal Analysis</h2>
              </div>
              
              <div className="prose prose-lg prose-invert max-w-none mb-8">
                <p className="text-blue-100 leading-relaxed">
                  {aiInsights.personalizedSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Key Success Factors
                  </h3>
                  <ul className="space-y-2">
                    {aiInsights.successStrategies?.slice(0, 3).map((strategy: string, index: number) => (
                      <li key={index} className="flex items-start text-blue-100">
                        <CheckCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-green-300" />
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Personalized Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {aiInsights.customRecommendations?.slice(0, 3).map((rec: string, index: number) => (
                      <li key={index} className="flex items-start text-blue-100">
                        <Lightbulb className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-yellow-300" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleViewFullReport}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  View Complete AI Analysis Report
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Business Cards */}
        <div className="space-y-8">
          {topThreePaths.map((path, index) => (
            <BusinessCard
              key={path.id}
              business={path}
              index={index}
              quizData={quizData}
              isExpanded={expandedCard === path.id}
              onToggleExpand={() => toggleCardExpansion(path.id)}
              onLearnMore={handleLearnMore}
              onGetStarted={handleGetStarted}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Entrepreneurial Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              You now have a clear roadmap to success. Choose your path and take the first step toward building your dream business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewFullReport}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Get Complete Analysis Report
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Explore All Business Models
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Business Card Component
interface BusinessCardProps {
  business: BusinessPath;
  index: number;
  quizData: QuizData;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onLearnMore: (businessId: string) => void;
  onGetStarted: (businessId: string) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  index,
  quizData,
  isExpanded,
  onToggleExpand,
  onLearnMore,
  onGetStarted
}) => {
  const isTopMatch = index === 0;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMatchQuality = (score: number) => {
    if (score >= 85) return { label: 'Excellent Match', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (score >= 70) return { label: 'Great Match', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (score >= 60) return { label: 'Good Match', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    return { label: 'Fair Match', color: 'text-gray-600', bgColor: 'bg-gray-50' };
  };

  const matchQuality = getMatchQuality(business.fitScore);

  // Get personalized insights based on quiz data
  const getPersonalizedInsights = () => {
    const insights = [];
    
    if (quizData.weeklyTimeCommitment >= 30) {
      insights.push("Your high time commitment aligns perfectly with this business model's requirements");
    } else if (quizData.weeklyTimeCommitment <= 10) {
      insights.push("This business model works well with your limited time availability");
    }
    
    if (quizData.techSkillsRating >= 4 && ['app-saas-development', 'youtube-automation'].includes(business.id)) {
      insights.push("Your strong technical skills give you a significant advantage");
    }
    
    if (quizData.directCommunicationEnjoyment >= 4 && ['high-ticket-sales', 'online-coaching-consulting'].includes(business.id)) {
      insights.push("Your communication skills are perfectly suited for this path");
    }
    
    if (quizData.creativeWorkEnjoyment >= 4 && ['content-creation-ugc', 'print-on-demand'].includes(business.id)) {
      insights.push("Your creative nature will thrive in this business model");
    }

    if (insights.length === 0) {
      insights.push("This business model aligns well with your overall profile and goals");
    }
    
    return insights.slice(0, 2);
  };

  const personalizedInsights = getPersonalizedInsights();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-500 hover:shadow-2xl ${
        isTopMatch 
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50' 
          : 'border-gray-200 hover:border-blue-300'
      } ${isExpanded ? 'transform scale-[1.02]' : 'hover:scale-[1.01]'}`}
    >
      {/* Top Badge for Best Match */}
      {isTopMatch && (
        <motion.div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
            <Star className="h-4 w-4 mr-2" />
            AI RECOMMENDED
          </div>
        </motion.div>
      )}

      <div className="p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center flex-1">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mr-6 shadow-lg ${
              isTopMatch ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'
            }`}>
              <span className="text-white text-2xl">
                {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{business.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(business.difficulty)}`}>
                  {business.difficulty}
                </span>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${matchQuality.bgColor} ${matchQuality.color}`}>
                <Award className="h-4 w-4 mr-1" />
                {matchQuality.label}
              </div>
            </div>
          </div>
          
          {/* Fit Score */}
          <div className="text-center ml-4">
            <div className={`text-5xl md:text-6xl font-bold ${
              isTopMatch ? 'text-yellow-600' : 'text-blue-600'
            }`}>
              {business.fitScore}%
            </div>
            <div className="text-sm text-gray-500 font-medium">Match Score</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{business.description}</p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">Time to Profit</span>
            </div>
            <div className="font-bold text-blue-900 text-lg">{business.timeToProfit}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">Startup Cost</span>
            </div>
            <div className="font-bold text-green-900 text-lg">{business.startupCost}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-900">Income Potential</span>
            </div>
            <div className="font-bold text-purple-900 text-lg">{business.potentialIncome}</div>
          </div>
        </div>

        {/* Why This Fits You Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-6 border border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-3 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Why This Fits You Perfectly
          </h4>
          <div className="space-y-2">
            {personalizedInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-indigo-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-indigo-800 text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Income Progression */}
        {business.averageIncome && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-6 border border-emerald-200">
            <h4 className="font-bold text-emerald-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Income Progression Timeline
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-700">{business.averageIncome.beginner}</div>
                <div className="text-xs text-emerald-600">0-6 months</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-700">{business.averageIncome.intermediate}</div>
                <div className="text-xs text-emerald-600">6-18 months</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-700">{business.averageIncome.advanced}</div>
                <div className="text-xs text-emerald-600">18+ months</div>
              </div>
            </div>
          </div>
        )}

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden mb-6"
            >
              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-bold text-green-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Key Advantages
                  </h4>
                  <ul className="space-y-2">
                    {business.pros.slice(0, 4).map((pro, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-600 mr-2 text-xs mt-1">•</span>
                        <span className="text-green-800">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="font-bold text-orange-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Potential Challenges
                  </h4>
                  <ul className="space-y-2">
                    {business.cons.slice(0, 4).map((con, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-orange-600 mr-2 text-xs mt-1">•</span>
                        <span className="text-orange-800">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Required Skills */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Skills You'll Need
                </h4>
                <div className="flex flex-wrap gap-2">
                  {business.skills.slice(0, 8).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                      {skill}
                    </span>
                  ))}
                  {business.skills.length > 8 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      +{business.skills.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onGetStarted(business.id)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Zap className="h-5 w-5 mr-2" />
              Get Complete Guide
            </button>
            
            <button
              onClick={() => onLearnMore(business.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Detailed Analysis
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={onToggleExpand}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors flex items-center"
            >
              {isExpanded ? 'Show Less Details' : 'Show More Details'}
              <ArrowRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>Rank #{index + 1} of {3}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Results;