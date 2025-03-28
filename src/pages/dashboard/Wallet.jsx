import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaPlus, FaMinus, FaHistory } from 'react-icons/fa';

// Modal Component for Deposit and Withdraw
const TransactionModal = ({ isOpen, onClose, onSubmit, type }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onSubmit({
      type: type,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toISOString().split('T')[0],
      description: description || (type === 'deposit' ? 'Manual Deposit' : 'Manual Withdrawal')
    });

    // Reset form and close modal
    setAmount('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          {type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg ${
                type === 'deposit' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {type === 'deposit' ? 'Deposit' : 'Withdraw'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
  const [balance, setBalance] = useState(12500.00);
  const [totalInvested, setTotalInvested] = useState(45000.00);
  const [totalReturns, setTotalReturns] = useState(3750.00);
  const [transactions, setTransactions] = useState([
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
  ]);

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleTransaction = (transaction) => {
    // Update transactions list
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);

    // Update balance and returns
    if (transaction.type === 'deposit') {
      setBalance(prevBalance => prevBalance + parseFloat(transaction.amount));
      setTotalReturns(prevReturns => prevReturns + parseFloat(transaction.amount) * 0.1); // 10% return for demo
    } else {
      setBalance(prevBalance => prevBalance - parseFloat(transaction.amount));
    }
  };

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
            <p className="text-3xl font-bold text-gray-900">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <div className="mt-4 flex space-x-4">
              <button 
                onClick={() => setIsDepositModalOpen(true)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Deposit
              </button>
              <button 
                onClick={() => setIsWithdrawModalOpen(true)}
                className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Invested</h3>
            <p className="text-3xl font-bold text-gray-900">${totalInvested.toLocaleString()}.00</p>
            <p className="text-sm text-gray-500 mt-2">Across 5 projects</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Returns</h3>
            <p className="text-3xl font-bold text-green-600">${totalReturns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-500 mt-2">
              {((totalReturns / totalInvested) * 100).toFixed(2)}% Average ROI
            </p>
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
            {transactions.slice(0, 4).map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))}
          </div>
        </div>

        {/* Modals for Deposit and Withdraw */}
        <TransactionModal 
          isOpen={isDepositModalOpen} 
          onClose={() => setIsDepositModalOpen(false)}
          onSubmit={handleTransaction}
          type="deposit"
        />
        <TransactionModal 
          isOpen={isWithdrawModalOpen} 
          onClose={() => setIsWithdrawModalOpen(false)}
          onSubmit={handleTransaction}
          type="withdrawal"
        />
      </motion.div>
    </div>
  );
};

export default Wallet;