import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBell, FaCheckCircle, FaExclamationCircle, 
  FaInfoCircle, FaMoneyBillWave, FaCheck, FaTimes 
} from 'react-icons/fa';
import { useNotifications } from '../../context/NotificationContext';

const NotificationCard = ({ id, type, title, message, time, read, onMarkAsRead, actionType, data, onAction }) => {
  const icons = {
    success: FaCheckCircle,
    warning: FaExclamationCircle,
    info: FaInfoCircle,
    debt: FaMoneyBillWave
  };
  const Icon = icons[type] || FaInfoCircle;

  const colors = {
    success: 'text-green-500 bg-green-50',
    warning: 'text-yellow-500 bg-yellow-50',
    info: 'text-blue-500 bg-blue-50',
    debt: 'text-purple-500 bg-purple-50'
  };

  const handleAction = (action) => {
    if (onAction) {
      onAction(id, action, data);
    }
    if (action === 'approve' || action === 'reject') {
      onMarkAsRead(id);
    }
  };

  return (
    <div 
      className={`p-4 rounded-lg mb-4 ${read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50 shadow-sm`}
    >
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
          
          {type === 'debt' && actionType === 'debt_request' && !read && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleAction('approve')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FaCheck className="mr-2" />
                Approve
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <FaTimes className="mr-2" />
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, addNotification, removeNotification } = useNotifications();

  const handleDebtAction = (notificationId, action, data) => {
    const { projectId, amount, projectTitle, currentInvestment, totalAmount } = data;
    
    if (action === 'approve') {
      // Add notification for debt approval
      addNotification({
        type: 'success',
        title: 'Debt Request Approved',
        message: `Debt investment of $${amount.toLocaleString()} for ${projectTitle} has been approved.`,
        time: new Date().toLocaleString(),
        actionType: 'debt_approved',
        data: {
          projectId,
          amount,
          projectTitle,
          currentInvestment: currentInvestment + amount,
          progress: Math.min(Math.round(((currentInvestment + amount) / totalAmount) * 100), 100)
        }
      });

      // Notification for the user who requested
      addNotification({
        type: 'success',
        title: 'Debt Accepted',
        message: `Your debt investment request of $${amount.toLocaleString()} for ${projectTitle} has been accepted.`,
        time: new Date().toLocaleString()
      });
    } else {
      // Notification for debt rejection
      addNotification({
        type: 'warning',
        title: 'Debt Rejected',
        message: `Your debt investment request of $${amount.toLocaleString()} for ${projectTitle} has been rejected.`,
        time: new Date().toLocaleString()
      });
    }

    // Remove the original request notification
    removeNotification(notificationId);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p className="text-gray-600">Stay updated with your investment activities</p>
          </div>
          {notifications.length > 0 && (
            <button 
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <FaBell className="mr-2" />
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationCard 
                key={notification.id} 
                {...notification} 
                onMarkAsRead={markAsRead}
                onAction={handleDebtAction}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No notifications yet
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;