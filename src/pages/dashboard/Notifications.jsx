import React from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const NotificationCard = ({ type, title, message, time, read }) => {
  const icons = {
    success: FaCheckCircle,
    warning: FaExclamationCircle,
    info: FaInfoCircle,
  };
  const Icon = icons[type];

  const colors = {
    success: 'text-green-500 bg-green-50',
    warning: 'text-yellow-500 bg-yellow-50',
    info: 'text-blue-500 bg-blue-50',
  };

  return (
    <div className={`p-4 rounded-lg mb-4 ${read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${colors[type]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">{time}</span>
          </div>
          <p className="text-gray-600 mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const notifications = [
    {
      type: 'success',
      title: 'Investment Confirmed',
      message: 'Your investment of $10,000 in Solar Farm Project has been confirmed.',
      time: '2 hours ago',
      read: false,
    },
    {
      type: 'info',
      title: 'New Investment Opportunity',
      message: 'A new wind energy project matching your criteria is now available.',
      time: '5 hours ago',
      read: false,
    },
    {
      type: 'warning',
      title: 'Document Required',
      message: 'Please submit your updated financial statement for verification.',
      time: '1 day ago',
      read: true,
    },
    {
      type: 'success',
      title: 'Return Payment Received',
      message: 'Monthly returns of $750 have been credited to your wallet.',
      time: '2 days ago',
      read: true,
    },
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your investment activities</p>
          </div>
          <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <FaBell className="mr-2" />
            Mark all as read
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} {...notification} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;