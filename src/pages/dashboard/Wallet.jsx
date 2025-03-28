import React from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaPlus, FaMinus, FaHistory } from 'react-icons/fa';

const TransactionCard = ({ type, amount, date, description }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {type === 'deposit' ? <FaPlus /> : <FaMinus />}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{description}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <div className={`text-sm font-medium ${
      type === 'deposit' ? 'text-green-600' : 'text-red-600'
    }`}>
      {type === 'deposit' ? '+' : '-'}${amount}
    </div>
  </div>
);

const Wallet = () => {
  const transactions = [
    {
      type: 'deposit',
      amount: '5,000',
      date: '2024-02-15',
      description: 'Deposit to Investment Account'
    },
    {
      type: 'withdrawal',
      amount: '2,500',
      date: '2024-02-10',
      description: 'Investment in Solar Project'
    },
    {
      type: 'deposit',
      amount: '1,200',
      date: '2024-02-05',
      description: 'Returns from Wind Energy Project'
    },
    {
      type: 'withdrawal',
      amount: '800',
      date: '2024-02-01',
      description: 'Investment in Recycling Initiative'
    }
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-600 mb-8">Manage your funds and track transactions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FaWallet className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 ml-2">Available Balance</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">$12,500.00</p>
            <div className="mt-4 flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Deposit
              </button>
              <button className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Withdraw
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Invested</h3>
            <p className="text-3xl font-bold text-gray-900">$45,000.00</p>
            <p className="text-sm text-gray-500 mt-2">Across 5 projects</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Returns</h3>
            <p className="text-3xl font-bold text-green-600">$3,750.00</p>
            <p className="text-sm text-gray-500 mt-2">8.33% Average ROI</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                <FaHistory className="mr-1" />
                View All
              </button>
            </div>
          </div>
          <div className="divide-y">
            {transactions.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;