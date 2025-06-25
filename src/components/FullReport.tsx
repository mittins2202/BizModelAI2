import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  TrendingUp, 
  Target, 
  Brain, 
  Award, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Zap,
  Calendar,
  BarChart3,
  Lightbulb,
  Clock,
  DollarSign,
  Shield,
  Compass,
  BookOpen,
  Monitor,
  Heart,
  Briefcase
} from 'lucide-react';
import { QuizData, BusinessPath } from '../types';
import { generatePersonalizedPaths } from '../utils/quizLogic';
import { AIService } from '../utils/aiService';

interface FullReportProps {
  quizData: QuizData;
  onBack: () => void;
  userEmail?: string | null;
}

const FullReport: React.FC<FullReportProps> = ({ quizData, onBack, userEmail }) => {
  const [personalizedPaths, setPersonalizedPaths] = useState<BusinessPath[]>([]);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'overview', label: 'Executive Summary', icon: BarChart3 },
    { id: 'personality-profile', label: 'Your Personality Profile', icon: Brain },
    { id: 'top-matches', label: 'Your Top 3 Matches', icon: Target },
    { id: 'detailed-analysis', label: 'Detailed AI Analysis', icon: Lightbulb },
    { id: 'strengths-challenges', label: 'Strengths & Challenges', icon: Award },
    { id: 'income-projections', label: 'Income Projections', icon: TrendingUp },
    { id: 'risk-assessment', label: 'Risk Assessment', icon: Shield },
    { id: 'action-plan', label: 'Personalized Action Plan', icon: Calendar },
    { id: 'resources', label: 'Resources & Tools', icon: BookOpen },
    { id: 'success-metrics', label: 'Success Metrics', icon: BarChart3 },
    { id: 'next-steps', label: 'Next Steps', icon: Zap }
  ];

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

  const topThreePaths = personalizedPaths.slice(0, 3);

  // Helper function to get personality insights
  const getPersonalityInsights = () => {
    const insights = [];
    
    if (quizData.riskComfortLevel >= 4) {
      insights.push({ trait: "Risk Taker", description: "You're comfortable with uncertainty and willing to take calculated risks for potential rewards.", strength: true });
    } else if (quizData.riskComfortLevel <= 2) {
      insights.push({ trait: "Risk Averse", description: "You prefer stable, predictable opportunities with lower uncertainty.", strength: false });
    }
    
    if (quizData.selfMotivationLevel >= 4) {
      insights.push({ trait: "Self-Motivated", description: "You have strong internal drive and don't need external pressure to stay productive.", strength: true });
    }
    
    if (quizData.creativeWorkEnjoyment >= 4) {
      insights.push({ trait: "Creative", description: "You thrive on creative work and enjoy bringing new ideas to life.", strength: true });
    }
    
    if (quizData.directCommunicationEnjoyment >= 4) {
      insights.push({ trait: "People-Oriented", description: "You enjoy interacting with others and building relationships.", strength: true });
    }
    
    if (quizData.techSkillsRating >= 4) {
      insights.push({ trait: "Tech-Savvy", description: "You're comfortable with technology and quick to learn new tools.", strength: true });
    }
    
    return insights;
  };

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
              onClick={onBack}
              className="mr-4 p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Complete Business Report</h1>
              <p className="text-gray-600">Comprehensive analysis and personalized recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Sections</h3>
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
            {/* Executive Summary */}
            <section id="overview" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
              </div>
              
              {userEmail && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Report saved to {userEmail}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {topThreePaths.slice(0, 3).map((path, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{path.fitScore}%</div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{path.name}</div>
                    <div className="text-xs text-gray-600">Match Score</div>
                  </div>
                ))}
              </div>

              {!isLoadingInsights && aiInsights && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {aiInsights.personalizedSummary}
                  </p>
                </div>
              )}
            </section>

            {/* Personality Profile */}
            <section id="personality-profile" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Brain className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Personality Profile</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Traits</h3>
                  <div className="space-y-4">
                    {getPersonalityInsights().map((insight, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`w-3 h-3 rounded-full mt-2 mr-3 flex-shrink-0 ${insight.strength ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{insight.trait}</div>
                          <div className="text-sm text-gray-600">{insight.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Risk Tolerance</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(quizData.riskComfortLevel / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{quizData.riskComfortLevel}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Self Motivation</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(quizData.selfMotivationLevel / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{quizData.selfMotivationLevel}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Tech Comfort</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(quizData.techSkillsRating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{quizData.techSkillsRating}/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Communication Comfort</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${(quizData.directCommunicationEnjoyment / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{quizData.directCommunicationEnjoyment}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-2">Work Style Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-700 font-medium">Time Commitment:</span>
                    <span className="text-purple-900 ml-2">{quizData.weeklyTimeCommitment} hours/week</span>
                  </div>
                  <div>
                    <span className="text-purple-700 font-medium">Learning Style:</span>
                    <span className="text-purple-900 ml-2 capitalize">{quizData.learningPreference?.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-purple-700 font-medium">Work Structure:</span>
                    <span className="text-purple-900 ml-2 capitalize">{quizData.workStructurePreference?.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-purple-700 font-medium">Collaboration:</span>
                    <span className="text-purple-900 ml-2 capitalize">{quizData.workCollaborationPreference?.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Top 3 Matches */}
            <section id="top-matches" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Top 3 Business Matches</h2>
              </div>
              
              <div className="space-y-6">
                {topThreePaths.map((path, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          index === 0 ? 'bg-yellow-100 text-yellow-600' :
                          index === 1 ? 'bg-gray-100 text-gray-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{path.name}</h3>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{path.fitScore}%</div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{path.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">{path.timeToProfit}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">{path.startupCost}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">{path.potentialIncome}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed AI Analysis */}
            <section id="detailed-analysis" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Lightbulb className="h-6 w-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Detailed AI Analysis</h2>
              </div>
              
              {!isLoadingInsights && aiInsights && (
                <div className="space-y-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Why These Matches Work for You</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Based on your comprehensive assessment, our AI has identified key patterns in your responses that align perfectly with your top business recommendations. Your combination of {quizData.riskComfortLevel >= 4 ? 'high risk tolerance' : 'moderate risk approach'}, {quizData.selfMotivationLevel >= 4 ? 'strong self-motivation' : 'structured work style'}, and {quizData.techSkillsRating >= 4 ? 'excellent technical skills' : 'practical technical abilities'} creates a unique entrepreneurial profile.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Your preference for {quizData.workCollaborationPreference?.replace('-', ' ')} work, combined with your {quizData.learningPreference?.replace('-', ' ')} learning style, indicates that you'll thrive in business models that offer {quizData.workStructurePreference === 'clear-steps' ? 'structured processes and clear guidelines' : 'flexibility and creative freedom'}. The income timeline you've selected ({quizData.firstIncomeTimeline}) aligns well with the realistic expectations for your top matches.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Most importantly, your motivation for {quizData.mainMotivation?.replace('-', ' ')} drives the selection of business models that can realistically achieve your goal of ${quizData.successIncomeGoal?.toLocaleString()}/month within your available time commitment of {quizData.weeklyTimeCommitment} hours per week. This analysis ensures that your chosen path is not just theoretically suitable, but practically achievable given your specific circumstances.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Strengths & Challenges */}
            <section id="strengths-challenges" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Strengths & Challenges</h2>
              </div>
              
              {!isLoadingInsights && aiInsights && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Your Strengths
                    </h3>
                    <ul className="space-y-3">
                      {aiInsights.successStrategies?.slice(0, 4).map((strategy: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Star className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                      Potential Challenges
                    </h3>
                    <ul className="space-y-3">
                      {aiInsights.potentialChallenges?.map((challenge: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Income Projections */}
            <section id="income-projections" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Income Projections</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900 mb-1">$500-2K</div>
                  <div className="text-sm text-gray-600 mb-2">Months 1-3</div>
                  <div className="text-xs text-gray-500">Learning & Setup Phase</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600 mb-1">$2K-8K</div>
                  <div className="text-sm text-gray-600 mb-2">Months 4-12</div>
                  <div className="text-xs text-gray-500">Growth & Optimization</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600 mb-1">${quizData.successIncomeGoal?.toLocaleString()}+</div>
                  <div className="text-sm text-gray-600 mb-2">Year 2+</div>
                  <div className="text-xs text-gray-500">Scale & Expansion</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Realistic Timeline</h3>
                <p className="text-blue-800 text-sm">
                  Based on your {quizData.weeklyTimeCommitment} hours/week commitment and {quizData.firstIncomeTimeline} timeline expectation, 
                  these projections reflect realistic income growth for your top business match: {topThreePaths[0]?.name}.
                </p>
              </div>
            </section>

            {/* Risk Assessment */}
            <section id="risk-assessment" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Risk Assessment</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Risk</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Startup Investment</span>
                      <span className="font-medium text-green-600">${quizData.upfrontInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Risk Level</span>
                      <span className={`font-medium ${quizData.upfrontInvestment <= 500 ? 'text-green-600' : quizData.upfrontInvestment <= 2000 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {quizData.upfrontInvestment <= 500 ? 'Low' : quizData.upfrontInvestment <= 2000 ? 'Medium' : 'High'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Time to Break Even</span>
                      <span className="font-medium text-blue-600">{topThreePaths[0]?.timeToProfit}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Factors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${quizData.selfMotivationLevel >= 4 ? 'bg-green-500' : quizData.selfMotivationLevel >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">Self-Motivation: {quizData.selfMotivationLevel}/5</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${quizData.longTermConsistency >= 4 ? 'bg-green-500' : quizData.longTermConsistency >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">Consistency: {quizData.longTermConsistency}/5</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${quizData.techSkillsRating >= 4 ? 'bg-green-500' : quizData.techSkillsRating >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-gray-700">Tech Skills: {quizData.techSkillsRating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Plan */}
            <section id="action-plan" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Personalized Action Plan</h2>
              </div>
              
              {!isLoadingInsights && aiInsights?.personalizedActionPlan && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(aiInsights.personalizedActionPlan).map(([phase, tasks], index) => (
                    <div key={phase} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                        {phase.replace(/(\d+)/, ' $1').replace('week', 'Week').replace('month', 'Month')}
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

            {/* Resources & Tools */}
            <section id="resources" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Recommended Resources & Tools</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Essential Tools</h3>
                  <ul className="space-y-2">
                    {topThreePaths[0]?.tools.slice(0, 4).map((tool, index) => (
                      <li key={index} className="flex items-center">
                        <Monitor className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-gray-700 text-sm">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Learning Resources</h3>
                  <ul className="space-y-2">
                    {topThreePaths[0]?.resources.learning.map((resource, index) => (
                      <li key={index} className="flex items-center">
                        <BookOpen className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700 text-sm">{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Platforms</h3>
                  <ul className="space-y-2">
                    {topThreePaths[0]?.resources.platforms.map((platform, index) => (
                      <li key={index} className="flex items-center">
                        <Compass className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="text-gray-700 text-sm">{platform}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Success Metrics */}
            <section id="success-metrics" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <BarChart3 className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Success Metrics to Track</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Monthly Revenue</div>
                      <div className="text-sm text-gray-600">Track progress toward ${quizData.successIncomeGoal?.toLocaleString()}/month goal</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Time Investment</div>
                      <div className="text-sm text-gray-600">Monitor actual vs planned {quizData.weeklyTimeCommitment} hours/week</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Skill Development</div>
                      <div className="text-sm text-gray-600">Rate improvement in key business skills monthly</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Milestone Checkpoints</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm font-bold">30</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Day 30</div>
                        <div className="text-sm text-gray-600">First customer/client acquired</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm font-bold">90</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Day 90</div>
                        <div className="text-sm text-gray-600">Consistent income stream established</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 text-sm font-bold">180</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Day 180</div>
                        <div className="text-sm text-gray-600">Systems optimized for growth</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section id="next-steps" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center mb-6">
                <Zap className="h-6 w-6 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">Ready to Get Started?</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-blue-100 text-lg leading-relaxed">
                  {aiInsights?.motivationalMessage || "Your unique combination of skills and drive positions you perfectly for entrepreneurial success."}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Start with {topThreePaths[0]?.name}
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Explore All Options
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReport;