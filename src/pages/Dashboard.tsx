import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Target,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Heart,
  Shield,
  Lightbulb,
  Play,
  Download,
  ExternalLink,
  ChevronRight,
  Plus,
  Settings,
  Bell,
  Filter,
  Eye,
  TrendingDown,
  Activity,
  PieChart,
  BarChart,
  LineChart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for demonstration
  const [dashboardData] = useState({
    quizCompleted: true,
    businessMatches: 12,
    topMatch: {
      name: 'Content Creation / UGC',
      fitScore: 87,
      status: 'In Progress',
      progress: 65
    },
    secondMatch: {
      name: 'Affiliate Marketing',
      fitScore: 82,
      status: 'Recommended',
      progress: 0
    },
    thirdMatch: {
      name: 'Virtual Assistant',
      fitScore: 78,
      status: 'Good Fit',
      progress: 0
    },
    weeklyProgress: [
      { day: 'Mon', completed: 3, planned: 4 },
      { day: 'Tue', completed: 5, planned: 5 },
      { day: 'Wed', completed: 2, planned: 4 },
      { day: 'Thu', completed: 4, planned: 4 },
      { day: 'Fri', completed: 3, planned: 5 },
      { day: 'Sat', completed: 1, planned: 2 },
      { day: 'Sun', completed: 0, planned: 1 }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 0 },
      { month: 'Feb', revenue: 150 },
      { month: 'Mar', revenue: 420 },
      { month: 'Apr', revenue: 680 },
      { month: 'May', revenue: 950 },
      { month: 'Jun', revenue: 1200 }
    ],
    achievements: [
      { id: 1, title: 'Quiz Master', description: 'Completed business assessment', earned: true, points: 50 },
      { id: 2, title: 'First Steps', description: 'Started your business journey', earned: true, points: 25 },
      { id: 3, title: 'Goal Setter', description: 'Set your first milestone', earned: true, points: 30 },
      { id: 4, title: 'Community Member', description: 'Joined the community', earned: false, points: 40 },
      { id: 5, title: 'Revenue Generator', description: 'Made your first $100', earned: false, points: 100 }
    ],
    currentGoals: [
      { id: 1, title: 'Complete Week 1 Action Plan', progress: 75, dueDate: '2025-01-15' },
      { id: 2, title: 'Set up essential tools', progress: 40, dueDate: '2025-01-18' },
      { id: 3, title: 'Create first content piece', progress: 20, dueDate: '2025-01-20' }
    ]
  });

  const stats = [
    {
      icon: Brain,
      label: 'Quiz Completed',
      value: dashboardData.quizCompleted ? 'Yes' : 'No',
      change: dashboardData.quizCompleted ? '+100%' : '0%',
      color: 'blue',
      trend: 'up'
    },
    {
      icon: Target,
      label: 'Business Matches',
      value: dashboardData.businessMatches.toString(),
      change: 'Updated',
      color: 'green',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      label: 'Top Match Score',
      value: `${dashboardData.topMatch.fitScore}%`,
      change: '+5%',
      color: 'purple',
      trend: 'up'
    },
    {
      icon: Award,
      label: 'Achievement Points',
      value: dashboardData.achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0).toString(),
      change: '+25',
      color: 'orange',
      trend: 'up'
    }
  ];

  const recentActivity = [
    {
      action: 'Completed Business Path Quiz',
      time: '2 hours ago',
      icon: BookOpen,
      color: 'blue',
      type: 'achievement'
    },
    {
      action: 'Viewed Content Creation results',
      time: '2 hours ago',
      icon: Target,
      color: 'green',
      type: 'view'
    },
    {
      action: 'Started Week 1 Action Plan',
      time: '1 day ago',
      icon: Calendar,
      color: 'purple',
      type: 'progress'
    },
    {
      action: 'Joined Business Path community',
      time: '1 day ago',
      icon: Users,
      color: 'orange',
      type: 'social'
    },
    {
      action: 'Downloaded business guide',
      time: '2 days ago',
      icon: Download,
      color: 'blue',
      type: 'resource'
    }
  ];

  const quickActions = [
    {
      title: 'Continue Your Journey',
      description: 'Pick up where you left off with your action plan',
      href: '/guide/content-creation-ugc',
      icon: Play,
      color: 'blue',
      priority: 'high'
    },
    {
      title: 'View Full Results',
      description: 'See your complete business recommendations',
      href: '/results',
      icon: Target,
      color: 'green',
      priority: 'high'
    },
    {
      title: 'Retake Quiz',
      description: 'Update your preferences for new recommendations',
      href: '/quiz',
      icon: BookOpen,
      color: 'purple',
      priority: 'medium'
    },
    {
      title: 'Explore All Models',
      description: 'Browse all available business models',
      href: '/explore',
      icon: BarChart3,
      color: 'orange',
      priority: 'medium'
    },
    {
      title: 'Join Community',
      description: 'Connect with other entrepreneurs',
      href: '#',
      icon: Users,
      color: 'pink',
      priority: 'low'
    },
    {
      title: 'Get Coaching',
      description: 'Book a session with our experts',
      href: '#',
      icon: Brain,
      color: 'indigo',
      priority: 'low'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Here's your entrepreneurial journey overview
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <Link to="/settings" className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="flex items-center">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  } bg-${stat.trend === 'up' ? 'green' : 'red'}-50 px-2 py-1 rounded-full`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Top 3 Business Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Top Business Matches</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* First Match - Current Business */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl"
            >
              {/* Top Match Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  TOP MATCH
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold">{dashboardData.topMatch.fitScore}%</div>
                  <div className="text-yellow-200 text-sm">Match</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{dashboardData.topMatch.name}</h3>
                <p className="text-blue-100 mb-4">{dashboardData.topMatch.status}</p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100 text-sm">Progress</span>
                    <span className="text-white font-semibold text-sm">{dashboardData.topMatch.progress}%</span>
                  </div>
                  <div className="w-full bg-blue-800/30 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${dashboardData.topMatch.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <Link
                  to="/guide/content-creation-ugc"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center text-sm"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Continue Journey
                </Link>
              </div>
            </motion.div>

            {/* Second Match */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* 2nd Best Badge - Positioned more to the right */}
              <div className="absolute -top-3 right-6">
                <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  2ND BEST
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-gray-600">{dashboardData.secondMatch.fitScore}%</div>
                  <div className="text-gray-500 text-sm">Match</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dashboardData.secondMatch.name}</h3>
                <p className="text-gray-600 mb-4">{dashboardData.secondMatch.status}</p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Progress</span>
                    <span className="text-gray-700 font-semibold text-sm">{dashboardData.secondMatch.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${dashboardData.secondMatch.progress}%` }} />
                  </div>
                </div>
                
                <Link
                  to="/business/affiliate-marketing"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Third Match */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* 3rd Best Badge - Positioned more to the right */}
              <div className="absolute -top-3 right-6">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  3RD BEST
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-orange-600">{dashboardData.thirdMatch.fitScore}%</div>
                  <div className="text-orange-500 text-sm">Match</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dashboardData.thirdMatch.name}</h3>
                <p className="text-gray-600 mb-4">{dashboardData.thirdMatch.status}</p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Progress</span>
                    <span className="text-gray-700 font-semibold text-sm">{dashboardData.thirdMatch.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${dashboardData.thirdMatch.progress}%` }} />
                  </div>
                </div>
                
                <Link
                  to="/business/virtual-assistant"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center text-sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
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
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`relative overflow-hidden ${
                          action.priority === 'high' ? 'md:col-span-2' : ''
                        }`}
                      >
                        <Link
                          to={action.href}
                          className={`block bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group ${
                            action.priority === 'high' ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 bg-${action.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                            </div>
                            <div className="flex items-center">
                              {action.priority === 'high' && (
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                                  Priority
                                </span>
                              )}
                              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-8 h-8 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-gray-500">{activity.time}</p>
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full bg-${activity.color}-50 text-${activity.color}-700`}>
                                {activity.type}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Progress Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Task Completion</h3>
                  <div className="space-y-4">
                    {dashboardData.weeklyProgress.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                        <div className="flex-1 mx-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(day.completed / day.planned) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 w-12">
                              {day.completed}/{day.planned}
                            </span>
                          </div>
                        </div>
                        <div className="w-16 text-right">
                          <span className={`text-sm font-medium ${
                            day.completed === day.planned ? 'text-green-600' : 
                            day.completed > day.planned * 0.7 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {Math.round((day.completed / day.planned) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Growth */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Growth</h3>
                  <div className="space-y-4">
                    {dashboardData.monthlyRevenue.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 w-12">{month.month}</span>
                        <div className="flex-1 mx-4">
                          <div className="bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${(month.revenue / 1200) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-20 text-right">
                          <span className="text-sm font-medium text-gray-900">
                            ${month.revenue}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Total Revenue</span>
                      <span className="text-2xl font-bold text-green-700">
                        ${dashboardData.monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Current Goals</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.currentGoals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 text-sm">{goal.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.progress >= 75 ? 'bg-green-100 text-green-800' :
                          goal.progress >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {goal.progress}%
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              goal.progress >= 75 ? 'bg-green-500' :
                              goal.progress >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          Update
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">
                      {dashboardData.achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Total Points</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          achievement.earned ? 'bg-yellow-500' : 'bg-gray-200'
                        }`}>
                          {achievement.earned ? (
                            <Award className="h-6 w-6 text-white" />
                          ) : (
                            <Award className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          achievement.earned 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {achievement.points} pts
                        </span>
                      </div>
                      
                      <h3 className={`font-semibold mb-2 ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      {achievement.earned && (
                        <div className="mt-4 flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              You're making great progress! Continue your entrepreneurial journey with personalized guidance and expert support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/guide/content-creation-ugc"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <Zap className="h-5 w-5 mr-2" />
                Continue Your Journey
              </Link>
              <Link
                to="/explore"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Explore More Options
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;