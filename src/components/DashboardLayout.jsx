import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaChartBar,
  FaWallet,
  FaFileAlt,
  FaBell,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChartPie,
  FaHandHoldingUsd,
  FaHistory,
  FaQuestionCircle,
  FaHandHoldingHeart,
} from 'react-icons/fa';

const SidebarLink = ({ to, icon: Icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{children}</span>
  </Link>
);

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const sidebarLinks = [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/dashboard/investments', icon: FaChartPie, label: 'My Investments' },
    { path: '/dashboard/wallet', icon: FaWallet, label: 'Wallet' },
    { path: '/dashboard/transactions', icon: FaHistory, label: 'Transactions' },
    { path: '/dashboard/opportunities', icon: FaHandHoldingUsd, label: 'Opportunities' },
    { path: '/dashboard/apply', icon: FaHandHoldingHeart, label: 'Apply for Loan' },
    { path: '/dashboard/documents', icon: FaFileAlt, label: 'Documents' },
    { path: '/dashboard/analytics', icon: FaChartBar, label: 'Analytics' },
    { path: '/dashboard/notifications', icon: FaBell, label: 'Notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isSidebarOpen ? 280 : 0 }}
        animate={{ width: isSidebarOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-y-0 left-0 bg-white shadow-lg z-30 ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">MicroFund</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => (
              <SidebarLink
                key={link.path}
                to={link.path}
                icon={link.icon}
                isActive={location.pathname === link.path}
              >
                {link.label}
              </SidebarLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 px-4 py-3">
              <FaUserCircle className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <Link
                to="/dashboard/settings"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaCog className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <Link
                to="/dashboard/help"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaQuestionCircle className="w-5 h-5" />
                <span>Help & Support</span>
              </Link>
              <Link
                to="/logout"
                className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-[280px]' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;