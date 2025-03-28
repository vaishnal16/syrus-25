import React from 'react';
import { motion } from 'framer-motion';
import { FaChartPie, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const InvestmentCard = ({ project, amount, returns, status, change }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{project}</h3>
        <p className="text-sm text-gray-500 mt-1">Invested Amount: ${amount}</p>
      </div>
      <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
        <span className="ml-1">{Math.abs(change)}%</span>
      </div>
    </div>
    <div className="mt-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Returns:</span>
        <span className="font-medium">{returns}% APR</span>
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span className="text-gray-500">Status:</span>
        <span className={`font-medium ${
          status === 'Active' ? 'text-green-500' : 
          status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
        }`}>{status}</span>
      </div>
    </div>
  </div>
);

const Investments = () => {
  const portfolioData = [
    { name: 'Solar Energy', value: 40 },
    { name: 'Wind Power', value: 30 },
    { name: 'Recycling', value: 20 },
    { name: 'Green Transport', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const investments = [
    {
      project: "Solar Farm Project",
      amount: "25,000",
      returns: 8.5,
      status: "Active",
      change: 3.2
    },
    {
      project: "Wind Energy Initiative",
      amount: "15,000",
      returns: 7.2,
      status: "Active",
      change: -1.5
    },
    {
      project: "Recycling Facility",
      amount: "10,000",
      returns: 6.8,
      status: "Pending",
      change: 0.8
    }
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Investments</h1>
        <p className="text-gray-600 mb-8">Track and manage your sustainable investment portfolio</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investments.map((investment, index) => (
                <InvestmentCard key={index} {...investment} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Investments;