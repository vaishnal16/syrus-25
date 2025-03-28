import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSolarPanel, FaWind, FaRecycle, FaLeaf, FaFilter, FaSearch } from 'react-icons/fa';

const OpportunityCard = ({ title, description, amount, returns, risk, sector, deadline, progress, icon: Icon }) => (
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
        <p className="text-sm text-gray-500">Investment Amount</p>
        <p className="font-semibold">${amount}</p>
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
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
      View Details
    </button>
  </div>
);

const Opportunities = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const opportunities = [
    {
      title: "Solar Farm Expansion",
      description: "Investment opportunity in expanding an existing solar farm with proven track record.",
      amount: "250,000",
      returns: "8.5",
      risk: "Medium",
      sector: "Solar Energy",
      deadline: "30 days",
      progress: 65,
      icon: FaSolarPanel,
      type: "solar"
    },
    {
      title: "Wind Turbine Project",
      description: "New wind turbine installation project in high-wind coastal area.",
      amount: "400,000",
      returns: "9.2",
      risk: "Medium-High",
      sector: "Wind Energy",
      deadline: "45 days",
      progress: 40,
      icon: FaWind,
      type: "wind"
    },
    {
      title: "Recycling Facility Upgrade",
      description: "Modernization of recycling facility to increase processing capacity.",
      amount: "180,000",
      returns: "7.8",
      risk: "Low",
      sector: "Recycling",
      deadline: "20 days",
      progress: 85,
      icon: FaRecycle,
      type: "recycling"
    },
    {
      title: "Organic Farm Expansion",
      description: "Supporting local organic farm expansion and sustainable practices.",
      amount: "150,000",
      returns: "7.5",
      risk: "Low-Medium",
      sector: "Agriculture",
      deadline: "25 days",
      progress: 55,
      icon: FaLeaf,
      type: "agriculture"
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
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
            <OpportunityCard key={index} {...opportunity} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Opportunities;