import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { QuizData, BusinessPath } from "../types";
import { generatePersonalizedPaths } from "../utils/quizLogic";
import { AIService } from "../utils/aiService";
import { useNavigate } from "react-router-dom";

interface FullReportProps {
  quizData: QuizData;
  onBack: () => void;
  userEmail?: string | null;
}

interface TraitSliderProps {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
}

const TraitSlider: React.FC<TraitSliderProps> = ({
  label,
  value,
  leftLabel,
  rightLabel,
}) => {
  const percentage = Math.round(value * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="relative">
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
          <div
            className="absolute top-0 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-md transform -translate-y-0.5 transition-all duration-500"
            style={{ left: `calc(${percentage}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">{leftLabel}</span>
          <span className="text-xs text-gray-500">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};

const FullReport: React.FC<FullReportProps> = ({
  quizData,
  onBack,
  userEmail,
}) => {
  const [personalizedPaths, setPersonalizedPaths] = useState<BusinessPath[]>(
    [],
  );
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  // Calculate trait scores based on quiz data
  const traitScores = {
    socialComfort: calculateSocialComfort(quizData),
    consistency: calculateConsistency(quizData),
    riskTolerance: calculateRiskTolerance(quizData),
    techComfort: calculateTechComfort(quizData),
    motivation: calculateMotivation(quizData),
    feedbackResilience: calculateFeedbackResilience(quizData),
    structurePreference: calculateStructurePreference(quizData),
    creativity: calculateCreativity(quizData),
    communicationConfidence: calculateCommunicationConfidence(quizData),
  };

  const traitSliders = [
    {
      label: "Social Comfort",
      trait: "socialComfort" as keyof typeof traitScores,
      leftLabel: "Introvert",
      rightLabel: "Extrovert",
    },
    {
      label: "Discipline",
      trait: "consistency" as keyof typeof traitScores,
      leftLabel: "Low Discipline",
      rightLabel: "High Discipline",
    },
    {
      label: "Risk Tolerance",
      trait: "riskTolerance" as keyof typeof traitScores,
      leftLabel: "Avoids Risks",
      rightLabel: "Embraces Risks",
    },
    {
      label: "Tech Comfort",
      trait: "techComfort" as keyof typeof traitScores,
      leftLabel: "Low Tech Skills",
      rightLabel: "Tech Savvy",
    },
    {
      label: "Structure Preference",
      trait: "structurePreference" as keyof typeof traitScores,
      leftLabel: "Needs Structure",
      rightLabel: "Works Freely",
    },
    {
      label: "Motivation",
      trait: "motivation" as keyof typeof traitScores,
      leftLabel: "Passive",
      rightLabel: "Self-Driven",
    },
    {
      label: "Feedback Resilience",
      trait: "feedbackResilience" as keyof typeof traitScores,
      leftLabel: "Takes Feedback Personally",
      rightLabel: "Uses Feedback to Grow",
    },
    {
      label: "Creativity",
      trait: "creativity" as keyof typeof traitScores,
      leftLabel: "Analytical",
      rightLabel: "Creative",
    },
    {
      label: "Confidence",
      trait: "communicationConfidence" as keyof typeof traitScores,
      leftLabel: "Low Confidence",
      rightLabel: "High Confidence",
    },
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { id: "overview", label: "Executive Summary", icon: BarChart3 },
    { id: "ai-analysis", label: "AI Personalized Analysis", icon: Brain },
    { id: "personality-snapshot", label: "Personality Snapshot", icon: Users },
    { id: "top-matches", label: "Your Top 3 Matches", icon: Target },
    {
      id: "business-to-avoid",
      label: "Business Models to Avoid",
      icon: Shield,
    },
    { id: "personality-analysis", label: "Personality Analysis", icon: Brain },
    {
      id: "business-environment",
      label: "Business Environment Analysis",
      icon: BarChart3,
    },
    {
      id: "market-trends",
      label: "Market Trends & Opportunities",
      icon: TrendingUp,
    },
    { id: "competitive-analysis", label: "Competitive Analysis", icon: Award },
    {
      id: "strengths-challenges",
      label: "Strengths & Challenges",
      icon: Award,
    },
    { id: "action-plan", label: "Action Plan", icon: Calendar },
    { id: "resources", label: "Resources & Tools", icon: Lightbulb },
    { id: "next-steps", label: "Next Steps", icon: Zap },
  ];

  useEffect(() => {
    // Generate personalized paths
    const paths = generatePersonalizedPaths(quizData);
    setPersonalizedPaths(paths);

    // Generate AI insights
    const generateInsights = async () => {
      try {
        const aiService = AIService.getInstance();
        const insights = await aiService.generatePersonalizedInsights(
          quizData,
          paths.slice(0, 3),
        );
        setAiInsights(insights);
      } catch (error) {
        console.error("Error generating AI insights:", error);
        // Set fallback insights
        setAiInsights({
          personalizedSummary:
            "Your unique combination of traits makes you well-suited for entrepreneurial success.",
          customRecommendations: [
            "Start with proven tools and systems to minimize learning curve",
            "Focus on systematic execution rather than trying to reinvent approaches",
            "Leverage your natural strengths while gradually building new skills",
          ],
          potentialChallenges: [
            "Initial learning curve may require patience and persistence",
            "Income may be inconsistent in the first few months",
          ],
          successStrategies: [
            "Set realistic 90-day milestones to maintain motivation",
            "Join online communities for support and networking",
            "Track your progress and celebrate small wins",
          ],
          personalizedActionPlan: {
            week1: [
              "Research your chosen business model",
              "Set up basic tools",
              "Define your target market",
            ],
            month1: [
              "Launch your minimum viable offering",
              "Create marketing materials",
              "Gather initial feedback",
            ],
            month3: [
              "Optimize based on feedback",
              "Scale marketing efforts",
              "Build strategic partnerships",
            ],
            month6: [
              "Analyze performance",
              "Expand offerings",
              "Build team or outsource tasks",
            ],
          },
          motivationalMessage:
            "Your unique combination of skills and drive positions you perfectly for entrepreneurial success.",
        });
      } finally {
        setIsLoadingInsights(false);
      }
    };

    generateInsights();
  }, [quizData]);

  // Scroll to Executive Summary section
  const scrollToExecutiveSummary = () => {
    const overviewSection = document.getElementById("overview");
    if (overviewSection) {
      overviewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topThreePaths = personalizedPaths.slice(0, 3);
  const worstThreePaths = personalizedPaths.slice(-3).reverse(); // Get worst 3 and reverse for worst-first order

  const handleGetStarted = (businessId: string) => {
    navigate(`/guide/${businessId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white relative">
        {/* Exit Arrow - Upper Left Corner */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          title="Back to Results"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        
        <div className="text-center max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Award className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Your Full Report!
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-16 leading-relaxed">
              Your personalized business blueprint is ready. Discover your
              AI-powered analysis, personality insights, and complete roadmap to
              success.
            </p>

            {/* Chevron to scroll to Executive Summary */}
            <motion.button
              onClick={scrollToExecutiveSummary}
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto hover:bg-white/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronDown className="h-6 w-6 text-white" />
            </motion.button>
          </motion.div>
        </div>
      </section>



      {/* Main Content with Sidebar */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Report Sections
                  </h3>
                  <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                          activeSection === item.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Executive Summary */}
              <section
                id="overview"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Executive Summary
                  </h2>
                </div>

                {userEmail && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">
                        Report saved to {userEmail}
                      </span>
                    </div>
                  </div>
                )}

                {/* Key Insights Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {topThreePaths[0]?.fitScore}%
                    </div>
                    <div className="text-sm font-medium text-blue-900 mb-1">
                      Best Match
                    </div>
                    <div className="text-xs text-blue-700">
                      {topThreePaths[0]?.name}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {quizData.weeklyTimeCommitment}
                    </div>
                    <div className="text-sm font-medium text-green-900 mb-1">
                      Hours/Week
                    </div>
                    <div className="text-xs text-green-700">Available Time</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ${quizData.successIncomeGoal}
                    </div>
                    <div className="text-sm font-medium text-purple-900 mb-1">
                      Income Goal
                    </div>
                    <div className="text-xs text-purple-700">
                      Monthly Target
                    </div>
                  </div>
                </div>

                {/* Best Fit Characteristics */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Best Fit Characteristics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        {quizData.selfMotivationLevel >= 4
                          ? "Highly self-motivated"
                          : "Moderately self-motivated"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        {quizData.riskComfortLevel >= 4
                          ? "High risk tolerance"
                          : "Moderate risk tolerance"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        {quizData.techSkillsRating >= 4
                          ? "Strong tech skills"
                          : "Adequate tech skills"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        {quizData.directCommunicationEnjoyment >= 4
                          ? "Excellent communicator"
                          : "Good communicator"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Success Probability */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">
                    Success Probability Assessment
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-green-200 rounded-full h-3 mr-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{
                          width: `${Math.min(85, topThreePaths[0]?.fitScore || 0)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-green-800 font-bold">
                      {Math.min(85, topThreePaths[0]?.fitScore || 0)}%
                    </span>
                  </div>
                  <p className="text-green-800 text-sm">
                    Based on your profile analysis, you have a high probability
                    of success with your top-matched business model.
                  </p>
                </div>
              </section>

              {/* AI Personalized Analysis */}
              <section
                id="ai-analysis"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Brain className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    AI Personalized Analysis
                  </h2>
                </div>

                {!isLoadingInsights && aiInsights && (
                  <div className="space-y-6">
                    {/* Three-paragraph detailed analysis */}
                    <div className="prose max-w-none">
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Your Comprehensive Profile Analysis
                        </h3>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                          <p>
                            <strong>Personality & Work Style Match:</strong>{" "}
                            Your assessment reveals a unique entrepreneurial
                            profile that strongly aligns with{" "}
                            {topThreePaths[0]?.name}. With a self-motivation
                            level of {quizData.selfMotivationLevel}/5 and{" "}
                            {quizData.weeklyTimeCommitment} hours per week
                            available, you demonstrate the commitment level
                            necessary for business success. Your{" "}
                            {quizData.workStructurePreference?.replace(
                              "-",
                              " ",
                            )}{" "}
                            approach to work structure, combined with your{" "}
                            {quizData.learningPreference?.replace("-", " ")}{" "}
                            learning style, creates an ideal foundation for the
                            systematic approach required in your top-matched
                            business model.
                          </p>

                          <p>
                            <strong>Financial & Risk Profile:</strong> Your
                            income goal of ${quizData.successIncomeGoal}/month
                            within a{" "}
                            {quizData.firstIncomeTimeline?.replace("-", " ")}{" "}
                            timeframe is highly achievable given your risk
                            comfort level of {quizData.riskComfortLevel}/5 and
                            available investment budget of $
                            {quizData.upfrontInvestment}. This combination
                            suggests you have realistic expectations while
                            maintaining the ambition necessary for
                            entrepreneurial growth. Your{" "}
                            {quizData.mainMotivation?.replace("-", " ")}{" "}
                            motivation aligns perfectly with the income
                            potential and lifestyle flexibility offered by your
                            recommended business paths.
                          </p>

                          <p>
                            <strong>Success Prediction & Strategy:</strong>{" "}
                            Based on your technical comfort level (
                            {quizData.techSkillsRating}/5), communication
                            preferences, and
                            {quizData.passionIdentityAlignment >= 4
                              ? " strong desire for passion-aligned work"
                              : " practical approach to business"}
                            , you're positioned for accelerated success. Your{" "}
                            {quizData.decisionMakingStyle?.replace("-", " ")}{" "}
                            decision-making style and
                            {quizData.longTermConsistency >= 4
                              ? "excellent"
                              : "good"}{" "}
                            track record with long-term goals indicate you'll
                            navigate the initial challenges effectively. The
                            convergence of your skills, motivation, and market
                            timing creates a compelling opportunity for
                            sustainable business growth.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Key Success Indicators
                        </h3>
                        <ul className="space-y-2">
                          {aiInsights.successStrategies
                            ?.slice(0, 4)
                            .map((strategy: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <Star className="h-4 w-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">
                                  {strategy}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Personalized Recommendations
                        </h3>
                        <ul className="space-y-2">
                          {aiInsights.customRecommendations
                            ?.slice(0, 4)
                            .map((rec: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">{rec}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Personality Snapshot */}
              <section
                id="personality-snapshot"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Personality Snapshot
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {traitSliders.map((slider, index) => (
                    <TraitSlider
                      key={index}
                      label={slider.label}
                      value={traitScores[slider.trait]}
                      leftLabel={slider.leftLabel}
                      rightLabel={slider.rightLabel}
                    />
                  ))}
                </div>
              </section>

              {/* Top 3 Matches */}
              <section
                id="top-matches"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Target className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Top 3 Business Matches
                  </h2>
                </div>

                <div className="space-y-6">
                  {topThreePaths.map((path, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              index === 0
                                ? "bg-yellow-100 text-yellow-600"
                                : index === 1
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {path.name}
                          </h3>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {path.fitScore}%
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{path.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            {path.timeToProfit}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            {path.startupCost}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            {path.potentialIncome}
                          </span>
                        </div>
                      </div>

                      {/* Why This Fits You */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Why This Fits You
                        </h4>
                        <p className="text-blue-800 text-sm">
                          {index === 0 &&
                            `This business model perfectly matches your ${quizData.selfMotivationLevel >= 4 ? "high self-motivation" : "self-driven nature"} and ${quizData.weeklyTimeCommitment} hours/week availability. Your ${quizData.techSkillsRating >= 4 ? "strong" : "adequate"} technical skills and ${quizData.riskComfortLevel >= 4 ? "high" : "moderate"} risk tolerance align perfectly with the requirements.`}
                          {index === 1 &&
                            `Your ${quizData.learningPreference?.replace("-", " ")} learning style and ${quizData.workStructurePreference?.replace("-", " ")} work preference make this an excellent secondary option. The income potential matches your ${quizData.successIncomeGoal >= 5000 ? "ambitious" : "realistic"} financial goals.`}
                          {index === 2 &&
                            `This model offers good alignment with your communication comfort level (${quizData.directCommunicationEnjoyment}/5) and provides a solid backup option that complements your primary strengths while offering different growth opportunities.`}
                        </p>
                      </div>

                      <button
                        onClick={() => handleGetStarted(path.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        Get Complete Guide to {path.name}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Business Models to Avoid */}
              <section
                id="business-to-avoid"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Business Models to Avoid
                  </h2>
                </div>

                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Important Note:</strong> These business models
                    scored lowest for your current profile. This doesn't mean
                    they\'re bad businesses—they just don't align well with your
                    current goals, skills, or preferences. As you grow and
                    develop, some of these might become viable options in the
                    future.
                  </p>
                </div>

                <div className="space-y-6">
                  {worstThreePaths.map((path, index) => (
                    <div
                      key={index}
                      className="border border-red-200 rounded-lg p-6 bg-red-50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-red-100 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {path.name}
                          </h3>
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          {path.fitScore}%
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{path.description}</p>

                      <div className="bg-white border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-900 mb-2">
                          Why This Doesn't Fit Your Current Profile
                        </h4>
                        <ul className="text-red-800 text-sm space-y-1">
                          {path.fitScore < 30 && (
                            <>
                              <li>
                                • Requires skills or preferences that don't
                                align with your current profile
                              </li>
                              <li>
                                • Time commitment or income timeline doesn't
                                match your goals
                              </li>
                              <li>
                                • Risk level or investment requirements are
                                misaligned
                              </li>
                            </>
                          )}
                          {path.fitScore >= 30 && path.fitScore < 50 && (
                            <>
                              <li>
                                • Some aspects align, but key requirements don't
                                match your strengths
                              </li>
                              <li>
                                • Better options available that suit your
                                profile more closely
                              </li>
                              <li>
                                • May require significant skill development
                                before becoming viable
                              </li>
                            </>
                          )}
                          {path.id === "app-saas-development" &&
                            quizData.techSkillsRating < 4 && (
                              <li>
                                • Requires advanced technical skills (your
                                current level: {quizData.techSkillsRating}/5)
                              </li>
                            )}
                          {path.id === "high-ticket-sales" &&
                            quizData.directCommunicationEnjoyment < 4 && (
                              <li>
                                • Requires high comfort with direct
                                communication (your level:{" "}
                                {quizData.directCommunicationEnjoyment}/5)
                              </li>
                            )}
                          {path.id === "content-creation-ugc" &&
                            quizData.brandFaceComfort < 3 && (
                              <li>
                                • Requires comfort being the face of a brand
                                (your comfort level: {quizData.brandFaceComfort}
                                /5)
                              </li>
                            )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    💡 Future Consideration
                  </h3>
                  <p className="text-blue-800 text-sm">
                    As you develop your skills and gain experience, some of
                    these business models may become more suitable. Consider
                    revisiting this analysis in 6-12 months as your profile
                    evolves.
                  </p>
                </div>
              </section>

              {/* Business Environment Analysis */}
              <section
                id="business-environment"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Business Environment Analysis
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Your Constraints & Advantages
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">
                            Time Availability
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quizData.weeklyTimeCommitment >= 30
                                ? "bg-green-100 text-green-800"
                                : quizData.weeklyTimeCommitment >= 15
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {quizData.weeklyTimeCommitment >= 30
                              ? "High"
                              : quizData.weeklyTimeCommitment >= 15
                                ? "Medium"
                                : "Limited"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {quizData.weeklyTimeCommitment} hours/week available
                          for business activities
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">
                            Investment Budget
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quizData.upfrontInvestment >= 1000
                                ? "bg-green-100 text-green-800"
                                : quizData.upfrontInvestment >= 250
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {quizData.upfrontInvestment >= 1000
                              ? "High"
                              : quizData.upfrontInvestment >= 250
                                ? "Medium"
                                : "Low"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          ${quizData.upfrontInvestment} available for startup
                          costs
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">
                            Technical Skills
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quizData.techSkillsRating >= 4
                                ? "bg-green-100 text-green-800"
                                : quizData.techSkillsRating >= 3
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {quizData.techSkillsRating >= 4
                              ? "High"
                              : quizData.techSkillsRating >= 3
                                ? "Medium"
                                : "Basic"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Level {quizData.techSkillsRating}/5 -{" "}
                          {quizData.techSkillsRating >= 4
                            ? "Can handle complex tools"
                            : quizData.techSkillsRating >= 3
                              ? "Comfortable with standard tools"
                              : "May need additional training"}
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">
                            Communication Comfort
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quizData.directCommunicationEnjoyment >= 4
                                ? "bg-green-100 text-green-800"
                                : quizData.directCommunicationEnjoyment >= 3
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {quizData.directCommunicationEnjoyment >= 4
                              ? "High"
                              : quizData.directCommunicationEnjoyment >= 3
                                ? "Medium"
                                : "Low"}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Level {quizData.directCommunicationEnjoyment}/5 -{" "}
                          {quizData.directCommunicationEnjoyment >= 4
                            ? "Excellent for client-facing roles"
                            : quizData.directCommunicationEnjoyment >= 3
                              ? "Good for moderate interaction"
                              : "Better suited for behind-the-scenes work"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recommendations
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Leverage Your Strengths
                        </h4>
                        <ul className="text-blue-800 text-sm space-y-1">
                          {quizData.selfMotivationLevel >= 4 && (
                            <li>
                              • High self-motivation - perfect for independent
                              work
                            </li>
                          )}
                          {quizData.organizationLevel >= 4 && (
                            <li>
                              • Strong organization skills - ideal for
                              systematic businesses
                            </li>
                          )}
                          {quizData.creativeWorkEnjoyment >= 4 && (
                            <li>
                              • Creative enjoyment - consider content or
                              design-focused models
                            </li>
                          )}
                          {quizData.riskComfortLevel >= 4 && (
                            <li>
                              • High risk tolerance - can pursue higher-reward
                              opportunities
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2">
                          Areas for Development
                        </h4>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          {quizData.techSkillsRating < 3 && (
                            <li>
                              • Consider basic tech training to expand
                              opportunities
                            </li>
                          )}
                          {quizData.directCommunicationEnjoyment < 3 && (
                            <li>
                              • Practice communication skills for better client
                              relationships
                            </li>
                          )}
                          {quizData.organizationLevel < 3 && (
                            <li>
                              • Develop systems and processes for business
                              efficiency
                            </li>
                          )}
                          {quizData.weeklyTimeCommitment < 15 && (
                            <li>
                              • Consider ways to increase available time for
                              faster growth
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Market Trends & Opportunities */}
              <section
                id="market-trends"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Market Trends & Opportunities
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Growing Markets
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">
                          AI & Automation Services
                        </h4>
                        <p className="text-green-800 text-sm mb-2">
                          Market growing 25% annually
                        </p>
                        <p className="text-green-700 text-xs">
                          Businesses need help implementing AI tools and
                          automating processes
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">
                          Content Creation
                        </h4>
                        <p className="text-green-800 text-sm mb-2">
                          Creator economy worth $104B+
                        </p>
                        <p className="text-green-700 text-xs">
                          Brands increasingly rely on authentic, user-generated
                          content
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">
                          Online Education
                        </h4>
                        <p className="text-green-800 text-sm mb-2">
                          $350B market by 2025
                        </p>
                        <p className="text-green-700 text-xs">
                          High demand for specialized skills training and
                          coaching
                        </p>
                      </div>

                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">
                          E-commerce & Digital Products
                        </h4>
                        <p className="text-green-800 text-sm mb-2">
                          Growing 15% year-over-year
                        </p>
                        <p className="text-green-700 text-xs">
                          Shift to online shopping continues accelerating
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Emerging Opportunities
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Sustainability Consulting
                        </h4>
                        <p className="text-purple-800 text-sm mb-2">
                          ESG compliance demand rising
                        </p>
                        <p className="text-purple-700 text-xs">
                          Companies need help with environmental and social
                          responsibility
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Remote Work Solutions
                        </h4>
                        <p className="text-purple-800 text-sm mb-2">
                          Permanent shift to hybrid work
                        </p>
                        <p className="text-purple-700 text-xs">
                          Tools and services for distributed teams in high
                          demand
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Health & Wellness Tech
                        </h4>
                        <p className="text-purple-800 text-sm mb-2">
                          $659B market opportunity
                        </p>
                        <p className="text-purple-700 text-xs">
                          Digital health solutions and wellness coaching growing
                          rapidly
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Micro-SaaS
                        </h4>
                        <p className="text-purple-800 text-sm mb-2">
                          Niche software solutions
                        </p>
                        <p className="text-purple-700 text-xs">
                          Small, focused tools solving specific problems for
                          targeted audiences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Market Timing Advantage
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Based on your profile and current market conditions, you're
                    entering at an optimal time. The convergence of digital
                    transformation, remote work adoption, and AI accessibility
                    creates unprecedented opportunities for new entrepreneurs.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        $2.3T
                      </div>
                      <div className="text-sm text-blue-700">
                        Digital economy size
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        73%
                      </div>
                      <div className="text-sm text-purple-700">
                        Businesses going digital
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        42%
                      </div>
                      <div className="text-sm text-green-700">
                        Remote work adoption
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Competitive Analysis */}
              <section
                id="competitive-analysis"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Award className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Competitive Analysis
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Your Competitive Advantages
                    </h3>
                    <div className="space-y-3">
                      {quizData.selfMotivationLevel >= 4 && (
                        <div className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-green-900">
                              High Self-Motivation
                            </span>
                            <p className="text-green-700 text-sm">
                              You'll outwork competitors who lack discipline and
                              consistency
                            </p>
                          </div>
                        </div>
                      )}

                      {quizData.learningPreference === "hands-on" && (
                        <div className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-green-900">
                              Hands-On Learning
                            </span>
                            <p className="text-green-700 text-sm">
                              You'll adapt faster than those who only learn
                              theoretically
                            </p>
                          </div>
                        </div>
                      )}

                      {quizData.riskComfortLevel >= 4 && (
                        <div className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-green-900">
                              Risk Tolerance
                            </span>
                            <p className="text-green-700 text-sm">
                              You'll pursue opportunities others are too afraid
                              to try
                            </p>
                          </div>
                        </div>
                      )}

                      {quizData.techSkillsRating >= 4 && (
                        <div className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-green-900">
                              Technical Proficiency
                            </span>
                            <p className="text-green-700 text-sm">
                              You can leverage tools and automation better than
                              most
                            </p>
                          </div>
                        </div>
                      )}

                      {quizData.organizationLevel >= 4 && (
                        <div className="flex items-start p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-green-900">
                              Strong Organization
                            </span>
                            <p className="text-green-700 text-sm">
                              You'll build better systems and processes than
                              disorganized competitors
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Market Positioning Strategy
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Target Market
                        </h4>
                        <p className="text-blue-800 text-sm">
                          Focus on{" "}
                          {quizData.meaningfulContributionImportance >= 4
                            ? "purpose-driven clients who value impact"
                            : "practical clients who prioritize results"}
                          in the {topThreePaths[0]?.name.toLowerCase()} space.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Pricing Strategy
                        </h4>
                        <p className="text-blue-800 text-sm">
                          {quizData.successIncomeGoal >= 5000
                            ? "Premium pricing strategy"
                            : "Competitive pricing strategy"}{" "}
                          based on your ${quizData.successIncomeGoal}/month
                          income goal and{" "}
                          {quizData.riskComfortLevel >= 4 ? "high" : "moderate"}{" "}
                          risk tolerance.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Differentiation Focus
                        </h4>
                        <p className="text-blue-800 text-sm">
                          Emphasize your{" "}
                          {quizData.directCommunicationEnjoyment >= 4
                            ? "excellent communication skills"
                            : "systematic approach"}{" "}
                          and
                          {quizData.longTermConsistency >= 4
                            ? "proven track record of consistency"
                            : "commitment to quality delivery"}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Personality Analysis */}
              <section
                id="personality-analysis"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Brain className="h-6 w-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Personality Analysis
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Traits
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Risk Tolerance</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(quizData.riskComfortLevel / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quizData.riskComfortLevel}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Self Motivation</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${(quizData.selfMotivationLevel / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quizData.selfMotivationLevel}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Tech Comfort</span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{
                                width: `${(quizData.techSkillsRating / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quizData.techSkillsRating}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          Communication Comfort
                        </span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{
                                width: `${(quizData.directCommunicationEnjoyment / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quizData.directCommunicationEnjoyment}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          Creative Enjoyment
                        </span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-pink-600 h-2 rounded-full"
                              style={{
                                width: `${(quizData.creativeWorkEnjoyment / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quizData.creativeWorkEnjoyment}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          Organization Level
                        </span>
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{
                                width: `${(quizData.organizationLevel / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {quizData.organizationLevel}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Work Preferences
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-700 font-medium">
                          Time Commitment:
                        </span>
                        <span className="text-gray-900 ml-2">
                          {quizData.weeklyTimeCommitment} hours/week
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">
                          Learning Style:
                        </span>
                        <span className="text-gray-900 ml-2 capitalize">
                          {quizData.learningPreference?.replace("-", " ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">
                          Work Structure:
                        </span>
                        <span className="text-gray-900 ml-2 capitalize">
                          {quizData.workStructurePreference?.replace("-", " ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">
                          Collaboration:
                        </span>
                        <span className="text-gray-900 ml-2 capitalize">
                          {quizData.workCollaborationPreference?.replace(
                            "-",
                            " ",
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">
                          Decision Making:
                        </span>
                        <span className="text-gray-900 ml-2 capitalize">
                          {quizData.decisionMakingStyle?.replace("-", " ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">
                          Income Goal:
                        </span>
                        <span className="text-gray-900 ml-2">
                          ${quizData.successIncomeGoal}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Strengths & Challenges */}
              <section
                id="strengths-challenges"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Award className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Strengths & Challenges
                  </h2>
                </div>

                {!isLoadingInsights && aiInsights && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Your Strengths
                      </h3>
                      <ul className="space-y-3">
                        {aiInsights.successStrategies
                          ?.slice(0, 4)
                          .map((strategy: string, index: number) => (
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
                        {aiInsights.potentialChallenges?.map(
                          (challenge: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{challenge}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </section>

              {/* Action Plan */}
              <section
                id="action-plan"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Personalized Action Plan
                  </h2>
                </div>

                {!isLoadingInsights && aiInsights?.personalizedActionPlan && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(aiInsights.personalizedActionPlan).map(
                      ([phase, tasks], index) => (
                        <div
                          key={phase}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                            {phase
                              .replace(/(\d+)/, " $1")
                              .replace("week", "Week")
                              .replace("month", "Month")}
                          </h3>
                          <ul className="space-y-2">
                            {(tasks as string[]).map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                  <span className="text-blue-600 text-sm font-bold">
                                    {taskIndex + 1}
                                  </span>
                                </div>
                                <span className="text-gray-700">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </section>

              {/* Resources & Tools */}
              <section
                id="resources"
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <Lightbulb className="h-6 w-6 text-yellow-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recommended Resources & Tools
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topThreePaths[0]?.tools?.map((tool, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {tool}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Essential tool for your business model
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Next Steps */}
              <section
                id="next-steps"
                className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-lg p-8 text-white"
              >
                <div className="flex items-center mb-6">
                  <Zap className="h-6 w-6 text-white mr-3" />
                  <h2 className="text-2xl font-bold text-white">
                    Ready to Get Started?
                  </h2>
                </div>

                <div className="mb-6">
                  <p className="text-blue-100 text-lg leading-relaxed">
                    {aiInsights?.motivationalMessage ||
                      "Your unique combination of skills and drive positions you perfectly for entrepreneurial success."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleGetStarted(topThreePaths[0]?.id)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Get Complete Guide to {topThreePaths[0]?.name}
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
    </div>
  );
};

// Helper functions to calculate trait scores
function calculateSocialComfort(data: QuizData): number {
  let score = 0.5;
  if (data.directCommunicationEnjoyment)
    score = (data.directCommunicationEnjoyment - 1) / 4;
  if (data.brandFaceComfort)
    score = Math.max(score, (data.brandFaceComfort - 1) / 4);
  return Math.max(0, Math.min(1, score));
}

function calculateConsistency(data: QuizData): number {
  if (data.longTermConsistency) return (data.longTermConsistency - 1) / 4;
  if (data.selfMotivationLevel) return (data.selfMotivationLevel - 1) / 4;
  return 0.5;
}

function calculateRiskTolerance(data: QuizData): number {
  if (data.riskComfortLevel) return (data.riskComfortLevel - 1) / 4;
  return 0.5;
}

function calculateTechComfort(data: QuizData): number {
  if (data.techSkillsRating) return (data.techSkillsRating - 1) / 4;
  return 0.5;
}

function calculateMotivation(data: QuizData): number {
  if (data.selfMotivationLevel) return (data.selfMotivationLevel - 1) / 4;
  return 0.5;
}

function calculateFeedbackResilience(data: QuizData): number {
  if (data.feedbackRejectionResponse)
    return (data.feedbackRejectionResponse - 1) / 4;
  return 0.5;
}

function calculateStructurePreference(data: QuizData): number {
  let score = 0.5;
  if (data.workStructurePreference === "clear-steps") score = 0.9;
  else if (data.workStructurePreference === "some-structure") score = 0.7;
  else if (data.workStructurePreference === "mostly-flexible") score = 0.3;
  else if (data.workStructurePreference === "total-freedom") score = 0.1;
  return 1 - score; // Invert so high score means works freely
}

function calculateCreativity(data: QuizData): number {
  if (data.creativeWorkEnjoyment) return (data.creativeWorkEnjoyment - 1) / 4;
  return 0.5;
}

function calculateCommunicationConfidence(data: QuizData): number {
  let score = 0.5;
  if (data.directCommunicationEnjoyment)
    score = (data.directCommunicationEnjoyment - 1) / 4;
  if (data.brandFaceComfort)
    score = Math.max(score, (data.brandFaceComfort - 1) / 4);
  return score;
}

export default FullReport;
