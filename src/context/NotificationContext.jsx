import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications(prev => [
      {
        ...notification,
        id: notification.id || Date.now(),
        time: notification.time || new Date().toLocaleString(),
        read: notification.read || false
      },
      ...prev
    ]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        markAsRead,
        markAllAsRead
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};