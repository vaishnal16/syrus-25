import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFileDownload, FaFilter } from 'react-icons/fa';

const TransactionRow = ({ date, type, description, amount, status }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{date}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{description}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${amount}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'Completed' ? 'bg-green-100 text-green-800' :
        status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

const Transactions = () => {
  const transactions = [
    {
      date: '2024-02-15',
      type: 'Investment',
      description: 'Solar Farm Project Investment',
      amount: '10,000',
      status: 'Completed'
    },
    {
      date: '2024-02-14',
      type: 'Deposit',
      description: 'Bank Transfer',
      amount: '5,000',
      status: 'Completed'
    },
    {
      date: '2024-02-13',
      type: 'Return',
      description: 'Wind Energy Project Returns',
      amount: '750',
      status: 'Pending'
    },
    {
      date: '2024-02-12',
      type: 'Withdrawal',
      description: 'Bank Transfer',
      amount: '2,000',
      status: 'Completed'
    },
    {
      date: '2024-02-11',
      type: 'Investment',
      description: 'Recycling Facility Investment',
      amount: '7,500',
      status: 'Failed'
    }
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Transactions</h1>
            <p className="text-gray-600">View and manage your transaction history</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaFileDownload className="mr-2" />
            Export
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaFilter className="mr-2" />
                  Filter
                </button>
                <select className="border border-gray-300 rounded-lg px-4 py-2">
                  <option>All Types</option>
                  <option>Investment</option>
                  <option>Deposit</option>
                  <option>Withdrawal</option>
                  <option>Return</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <TransactionRow key={index} {...transaction} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 1 to 5 of 50 entries
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Transactions;