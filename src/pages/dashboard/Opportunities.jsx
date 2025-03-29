import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSolarPanel, FaWind, FaRecycle, FaLeaf, 
  FaFilter, FaSearch, FaTimes, FaDollarSign, 
  FaHandHoldingHeart, FaCoins, FaMoneyBillWave,
  FaLightbulb 
} from 'react-icons/fa';
import { useNotifications } from '../../context/NotificationContext';
import { getInvestmentSuggestions } from '../../services/SuggestionService';

const PaymentModal = ({ opportunity, onClose }) => {
  const [paymentType, setPaymentType] = useState('invest');
  const [amount, setAmount] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState({
    investmentType: 'standard',
    repaymentTerms: '6 months',
    donationPurpose: ''
  });

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const remainingAmount = parseFloat(opportunity.amount) - (opportunity.currentInvestment || 0);
    if (parseFloat(amount) > remainingAmount) {
      alert(`Maximum amount available is $${remainingAmount.toLocaleString()}`);
      return;
    }

    const paymentDetails = {
      projectTitle: opportunity.title,
      amount: parseFloat(amount),
      paymentType: paymentType,
      ...additionalDetails
    };

    if (typeof opportunity.onInvest === 'function') {
      opportunity.onInvest(paymentDetails);
    }
    onClose();
  };

  const remainingAmount = parseFloat(opportunity.amount) - (opportunity.currentInvestment || 0);
  const formattedRemainingAmount = remainingAmount.toLocaleString();

  const getPaymentTypeInfo = () => {
    switch (paymentType) {
      case 'invest':
        return {
          title: 'Investment Details',
          description: 'Invest in this project to earn returns while supporting sustainable development.',
          buttonText: 'Confirm Investment'
        };
      case 'debt':
        return {
          title: 'Debt Financing Details',
          description: 'Provide debt financing to the project. Your request will need approval.',
          buttonText: 'Submit Debt Request'
        };
      case 'donate':
        return {
          title: 'Donation Details',
          description: '100% of your donation goes directly to supporting this sustainable project.',
          buttonText: 'Confirm Donation'
        };
      default:
        return {
          title: 'Contribution Details',
          description: 'Support this sustainable project.',
          buttonText: 'Confirm'
        };
    }
  };

  const paymentInfo = getPaymentTypeInfo();

  const renderPaymentOption = () => {
    switch (paymentType) {
      case 'invest':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              value={additionalDetails.investmentType}
              onChange={(e) => setAdditionalDetails({
                ...additionalDetails, 
                investmentType: e.target.value
              })}
            >
              <option value="standard">Standard Investment</option>
              <option value="impact">Impact Investment</option>
              <option value="sustainable">Sustainable Investment</option>
            </select>
          </div>
        );
      case 'debt':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repayment Terms
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              value={additionalDetails.repaymentTerms}
              onChange={(e) => setAdditionalDetails({
                ...additionalDetails, 
                repaymentTerms: e.target.value
              })}
            >
              <option value="6 months">6 Months</option>
              <option value="12 months">12 Months</option>
              <option value="24 months">24 Months</option>
            </select>
            <p className="text-sm text-gray-600 mb-4">
              Interest will be calculated based on selected repayment terms.
            </p>
          </div>
        );
      case 'donate':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Purpose
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
              placeholder="Optional: Share why you're donating"
              value={additionalDetails.donationPurpose}
              onChange={(e) => setAdditionalDetails({
                ...additionalDetails, 
                donationPurpose: e.target.value
              })}
              rows="3"
            />
            <p className="text-sm text-gray-600">
              100% of donations go directly to project implementation
            </p>
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl max-w-md w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto scrollbar-hide"
        style={{ overscrollBehavior: 'contain' }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <opportunity.icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{opportunity.title}</h2>
            <p className="text-sm text-gray-600">Remaining: ${formattedRemainingAmount}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{paymentInfo.title}</h3>
          <p className="text-gray-600 mb-4">{paymentInfo.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Project Cost</p>
              <p className="font-semibold">${opportunity.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Environmental Impact</p>
              <p className="font-semibold text-green-600">High Positive Impact</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Project Location</p>
              <p className="font-semibold">Coastal Region</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Project Partners</p>
              <p className="font-semibold">3 Local Organizations</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">SDG Alignment</h4>
            <div className="flex space-x-2">
              {['Clean Energy', 'Climate Action', 'Sustainable Communities'].map((sdg) => (
                <span 
                  key={sdg} 
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                >
                  {sdg}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contribution Method
          </label>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { value: 'invest', label: 'Invest', icon: FaCoins },
              { value: 'debt', label: 'Debt', icon: FaMoneyBillWave },
              { value: 'donate', label: 'Donate', icon: FaHandHoldingHeart }
            ].map((method) => (
              <button
                key={method.value}
                className={`flex flex-col items-center p-4 border rounded-lg ${
                  paymentType === method.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setPaymentType(method.value)}
              >
                <method.icon className="w-6 h-6 mb-2" />
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaDollarSign className="text-gray-400" />
            </span>
            <input
              type="number"
              placeholder="Enter amount"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {paymentType === 'debt' ? 'Your request will need approval before processing' : ''}
          </p>
        </div>

        {renderPaymentOption()}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {paymentInfo.buttonText}
        </button>
      </motion.div>
    </motion.div>
  );
};

const SuggestionModal = ({ opportunities, onClose }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [expectedReturns, setExpectedReturns] = useState('');
  const [riskLevel, setRiskLevel] = useState('medium');
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const projectsInfo = opportunities.map(opp => ({
        title: opp.title,
        returns: opp.returns,
        risk: opp.risk,
        amount: opp.amount,
        sector: opp.sector,
        description: opp.description
      }));

      const preferences = {
        investmentAmount,
        expectedReturns,
        riskLevel
      };

      const suggestionData = await getInvestmentSuggestions(projectsInfo, preferences);
      setSuggestion(suggestionData);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setSuggestion({
        topRecommendation: {
          projectTitle: "Error",
          matchScore: "N/A",
          reasons: ["Unable to get suggestions at this time"],
          riskAnalysis: "Please try again later",
          returnPotential: "Please try again later"
        },
        alternativeOptions: [],
        investmentStrategy: "Unable to generate strategy at this time",
        additionalNotes: error.message || "An error occurred while getting suggestions"
      });
    }
    setLoading(false);
  };

  const renderSuggestion = () => {
    if (!suggestion) return null;

    return (
      <div className="space-y-6">
        {/* Top Recommendation */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-blue-900">Top Recommendation</h3>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {suggestion.topRecommendation.matchScore} Match
            </span>
          </div>
          <h4 className="text-lg font-semibold text-blue-800 mb-3">
            {suggestion.topRecommendation.projectTitle}
          </h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-blue-900 mb-2">Why This Project?</h5>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                {suggestion.topRecommendation.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <h5 className="font-medium text-blue-900 mb-1">Risk Analysis</h5>
                <p className="text-blue-800">{suggestion.topRecommendation.riskAnalysis}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <h5 className="font-medium text-blue-900 mb-1">Return Potential</h5>
                <p className="text-blue-800">{suggestion.topRecommendation.returnPotential}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Alternative Options</h3>
          <div className="grid gap-4">
            {suggestion.alternativeOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{option.projectTitle}</h4>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    {option.matchScore} Match
                  </span>
                </div>
                <p className="text-gray-600">{option.keyBenefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Strategy */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
          <h3 className="text-lg font-bold text-green-900 mb-2">Recommended Strategy</h3>
          <p className="text-green-800">{suggestion.investmentStrategy}</p>
          
          {suggestion.additionalNotes && (
            <div className="mt-4 pt-4 border-t border-green-200">
              <h4 className="font-medium text-green-900 mb-1">Additional Considerations</h4>
              <p className="text-green-800">{suggestion.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FaLightbulb className="w-8 h-8 text-yellow-500 mr-3" />
            <h2 className="text-2xl font-bold">Get Investment Suggestions</h2>
          </div>
          <p className="text-gray-600">
            Tell us your investment preferences and we'll suggest the best projects for you.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount ($)
            </label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Returns (% APR)
            </label>
            <input
              type="number"
              value={expectedReturns}
              onChange={(e) => setExpectedReturns(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter expected returns"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Tolerance
            </label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>

        <button
          onClick={getSuggestion}
          disabled={loading || !investmentAmount || !expectedReturns}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mb-6 ${
            (loading || !investmentAmount || !expectedReturns) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Getting Suggestions...' : 'Get Suggestions'}
        </button>

        {suggestion && (
          <div className="mt-6">
            {renderSuggestion()}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const OpportunityCard = ({ 
  title, 
  description, 
  amount, 
  returns, 
  risk, 
  sector, 
  deadline, 
  progress, 
  icon: Icon,
  currentInvestment,
  onViewDetails 
}) => {
  const remainingAmount = parseFloat(amount) - (currentInvestment || 0);
  const formattedRemainingAmount = remainingAmount.toLocaleString();
  const formattedTotalAmount = parseFloat(amount).toLocaleString();
  const formattedCurrentInvestment = (currentInvestment || 0).toLocaleString();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{sector}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="font-semibold">${formattedTotalAmount}</p>
          <p className="text-xs text-gray-500 mt-1">Remaining: ${formattedRemainingAmount}</p>
          <p className="text-xs text-green-600 mt-1">Invested: ${formattedCurrentInvestment}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expected Returns</p>
          <p className="font-semibold text-green-600">{returns}% APR</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Risk Level</p>
          <p className="font-semibold">{risk}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Deadline</p>
          <p className="font-semibold">{deadline}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 rounded-full h-2"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <button 
        onClick={onViewDetails}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

const Opportunities = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [projectProgress, setProjectProgress] = useState({});
  const { addNotification, notifications } = useNotifications();

  const opportunities = [
    {
      id: 1,
      title: "Solar Farm Expansion",
      description: "Investment opportunity in expanding an existing solar farm with proven track record. The project aims to increase renewable energy production and reduce carbon emissions.",
      amount: "250000",
      returns: "8.5",
      risk: "Medium",
      sector: "Solar Energy",
      deadline: "30 days",
      progress: 65,
      icon: FaSolarPanel,
      type: "solar",
      currentInvestment: 162500 // 65% of 250000
    },
    {
      id: 2,
      title: "Wind Turbine Project",
      description: "New wind turbine installation project in high-wind coastal area. This project will contribute to clean energy infrastructure and local economic development.",
      amount: "400000",
      returns: "9.2",
      risk: "Medium-High",
      sector: "Wind Energy",
      deadline: "45 days",
      progress: 40,
      icon: FaWind,
      type: "wind",
      currentInvestment: 160000 // 40% of 400000
    },
    {
      id: 3,
      title: "Recycling Facility Upgrade",
      description: "Modernization of recycling facility to increase processing capacity and implement advanced waste management technologies.",
      amount: "180000",
      returns: "7.8",
      risk: "Low",
      sector: "Recycling",
      deadline: "20 days",
      progress: 85,
      icon: FaRecycle,
      type: "recycling",
      currentInvestment: 153000 // 85% of 180000
    },
    {
      id: 4,
      title: "Organic Farm Expansion",
      description: "Supporting local organic farm expansion and sustainable agricultural practices to promote biodiversity and sustainable food production.",
      amount: "150000",
      returns: "7.5",
      risk: "Low-Medium",
      sector: "Agriculture",
      deadline: "25 days",
      progress: 55,
      icon: FaLeaf,
      type: "agriculture",
      currentInvestment: 82500 // 55% of 150000
    }
  ];

  // Initialize project progress state
  useEffect(() => {
    const initialProgress = {};
    opportunities.forEach(opp => {
      initialProgress[opp.id] = {
        progress: opp.progress,
        currentInvestment: opp.currentInvestment
      };
    });
    setProjectProgress(initialProgress);
  }, []);

  // Listen for debt approval notifications and update project progress
  useEffect(() => {
    const debtApprovalNotification = notifications.find(n => 
      n.actionType === 'debt_approved' && 
      !n.processed
    );
    
    if (debtApprovalNotification) {
      const { projectId, amount, currentInvestment, progress } = debtApprovalNotification.data;
      
      // Update project progress with new investment amount
      setProjectProgress(prev => ({
        ...prev,
        [projectId]: {
          progress,
          currentInvestment
        }
      }));

      // Add to investments list
      setInvestments(prev => [...prev, {
        id: Date.now(),
        projectId,
        amount,
        type: 'debt',
        date: new Date().toLocaleDateString(),
        status: 'approved'
      }]);

      // Mark notification as processed
      addNotification({
        ...debtApprovalNotification,
        processed: true
      });
    }
  }, [notifications]);

  const handleInvestment = (projectId, paymentDetails) => {
    const project = opportunities.find(p => p.id === projectId);
    if (!project) return;

    const { amount, paymentType } = paymentDetails;
    const newInvestment = parseFloat(amount);

    if (paymentType === 'debt') {
      // Create a notification for debt request
      addNotification({
        id: Date.now(),
        type: 'debt',
        title: 'New Debt Investment Request',
        message: `New debt investment request of $${newInvestment.toLocaleString()} for ${project.title}`,
        time: new Date().toLocaleString(),
        read: false,
        actionType: 'debt_request',
        data: {
          projectId,
          amount: newInvestment,
          projectTitle: project.title,
          requestDate: new Date().toLocaleDateString(),
          currentInvestment: projectProgress[projectId]?.currentInvestment || 0,
          totalAmount: parseFloat(project.amount)
        }
      });

      alert('Your debt request has been submitted and is pending approval. Check notifications for updates.');
      setSelectedOpportunity(null);
      return;
    }

    // Handle direct investments and donations
    const currentProgress = projectProgress[project.id] || { currentInvestment: 0 };
    const totalAmount = parseFloat(project.amount);
    const investmentAmount = parseFloat(amount);
    const newCurrentInvestment = currentProgress.currentInvestment + investmentAmount;
    const newProgress = Math.min(Math.round((newCurrentInvestment / totalAmount) * 100), 100);

    // Update progress state
    setProjectProgress(prev => ({
      ...prev,
      [project.id]: {
        progress: newProgress,
        currentInvestment: newCurrentInvestment
      }
    }));

    // Add success notification
    addNotification({
      type: 'success',
      title: `${paymentType === 'donate' ? 'Donation' : 'Investment'} Successful`,
      message: `Successfully ${paymentType === 'donate' ? 'donated' : 'invested'} $${amount.toLocaleString()} in ${project.title}`,
      time: new Date().toLocaleString()
    });

    setInvestments(prev => [...prev, { 
      ...paymentDetails, 
      id: Date.now(), 
      date: new Date().toLocaleDateString(),
      status: 'completed'
    }]);
    setSelectedOpportunity(null);
  };

  const filteredOpportunities = opportunities.map(opp => ({
    ...opp,
    progress: projectProgress[opp.id]?.progress || opp.progress,
    currentInvestment: projectProgress[opp.id]?.currentInvestment || opp.currentInvestment
  })).filter(opp => {
    const matchesFilter = filter === 'all' || opp.type === filter;
    const matchesSearch = opp.title.toLowerCase().includes(search.toLowerCase()) ||
                         opp.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Opportunities</h1>
            <p className="text-gray-600">Discover and invest in sustainable projects</p>
          </div>
          <button
            onClick={() => setShowSuggestions(true)}
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <FaLightbulb className="mr-2" />
            Get Suggestions
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search opportunities..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <FaFilter className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Sectors</option>
                <option value="solar">Solar Energy</option>
                <option value="wind">Wind Energy</option>
                <option value="recycling">Recycling</option>
                <option value="agriculture">Agriculture</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredOpportunities.map((opportunity, index) => (
            <OpportunityCard 
              key={index} 
              {...opportunity} 
              onViewDetails={() => setSelectedOpportunity(opportunity)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedOpportunity && (
            <PaymentModal
              opportunity={{
                ...selectedOpportunity,
                onInvest: (paymentDetails) => handleInvestment(selectedOpportunity.id, paymentDetails)
              }}
              onClose={() => setSelectedOpportunity(null)}
            />
          )}
          {showSuggestions && (
            <SuggestionModal
              opportunities={opportunities}
              onClose={() => setShowSuggestions(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Opportunities;