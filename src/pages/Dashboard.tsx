import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Target, 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Zap, 
  Star,
  CheckCircle,
  Play,
  Award,
  Users,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for recommended business model - in real app this would come from quiz results
  const recommendedBusiness = {
    name: "Content Creation & UGC",
    description: "Create engaging content and user-generated content for brands",
    fitScore: 92,
    timeToProfit: "2-4 weeks",
    potentialIncome: "$2K-15K/month",
    difficulty: "Beginner",
    icon: "📱"
  };

  const quickActions = [
    {
      title: 'Retake Quiz',
      description: 'Update your preferences and get new recommendations',
      href: '/quiz',
      icon: BookOpen,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'View Full Results',
      description: 'See your complete personalized business analysis',
      href: '/results',
      icon: Target,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Explore All Models',
      description: 'Browse our complete business model database',
      href: '/explore',
      icon: BarChart3,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const recentActivity = [
    {
      action: 'Completed Business Path Quiz',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'blue'
    },
    {
      action: 'Viewed Content Creation results',
      time: '2 hours ago',
      icon: Target,
      color: 'green'
    },
    {
      action: 'Joined Business Path community',
      time: '1 day ago',
      icon: Users,
      color: 'purple'
    }
  ];

  const learningModules = [
    {
      title: "Getting Started Fundamentals",
      description: "Essential foundations for your business journey",
      progress: 0,
      duration: "45 min",
      lessons: 8
    },
    {
      title: "Content Strategy Mastery",
      description: "Create content that converts and builds audience",
      progress: 0,
      duration: "2.5 hours",
      lessons: 12
    },
    {
      title: "Monetization Strategies",
      description: "Turn your content into consistent income streams",
      progress: 0,
      duration: "1.8 hours",
      lessons: 10
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl text-gray-600">
                Ready to take the next step in your entrepreneurial journey?
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Star className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Your Journey - Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-3xl">{recommendedBusiness.icon}</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mr-3">
                      {recommendedBusiness.fitScore}% MATCH
                    </span>
                    <span className="text-blue-100 text-sm font-medium">AI Recommended</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Start Your Journey
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Complete Guide for {recommendedBusiness.name}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-blue-200 mr-2" />
                    <span className="text-blue-100 text-sm font-medium">Time to Profit</span>
                  </div>
                  <div className="text-white font-bold text-lg">{recommendedBusiness.timeToProfit}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-300 mr-2" />
                    <span className="text-blue-100 text-sm font-medium">Income Potential</span>
                  </div>
                  <div className="text-white font-bold text-lg">{recommendedBusiness.potentialIncome}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-yellow-300 mr-2" />
                    <span className="text-blue-100 text-sm font-medium">Difficulty</span>
                  </div>
                  <div className="text-white font-bold text-lg">{recommendedBusiness.difficulty}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={`/guide/${recommendedBusiness.id || 'content-creation-ugc'}`}
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
                >
                  <Play className="h-6 w-6 mr-3" />
                  Start Complete Guide
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/results"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  View Full Analysis
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Path</h2>
                  <p className="text-gray-600">Structured modules to guide your success</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                {learningModules.map((module, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{module.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {module.duration}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {module.lessons} lessons
                        </span>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="group flex items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-200"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center mr-4`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{action.description}</p>
                  Start Complete Guide
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Motivation */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-lg font-bold">You're on track!</h3>
                  <p className="text-green-100 text-sm">Keep up the momentum</p>
                </div>
              </div>
              <p className="text-green-100 text-sm mb-4">
                You've taken the first crucial step. Now it's time to turn insights into action.
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Journey Progress</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div className="bg-white h-2 rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;