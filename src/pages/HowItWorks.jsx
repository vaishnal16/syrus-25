import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaChartLine, FaHandshake, FaLeaf, FaShieldAlt, FaRocket, FaChartBar, FaClock } from 'react-icons/fa';

const Step = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
  >
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Feature = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-start p-4"
  >
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: FaUserCheck,
      title: "Create Your Account",
      description: "Sign up as a borrower or investor and complete your profile verification with our streamlined KYC process.",
    },
    {
      icon: FaChartLine,
      title: "AI-Powered Matching",
      description: "Our sophisticated algorithms analyze multiple data points to match sustainable projects with suitable investors.",
    },
    {
      icon: FaHandshake,
      title: "Secure Transactions",
      description: "Complete secure, transparent transactions through our platform with built-in escrow protection.",
    },
    {
      icon: FaLeaf,
      title: "Track Impact",
      description: "Monitor your investments and their environmental impact in real-time with detailed analytics.",
    },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Advanced Security",
      description: "Bank-level encryption and security measures to protect your data and transactions.",
    },
    {
      icon: FaRocket,
      title: "Quick Processing",
      description: "Fast application processing and funding decisions powered by AI technology.",
    },
    {
      icon: FaChartBar,
      title: "Detailed Analytics",
      description: "Comprehensive reporting and analytics to track your investment performance.",
    },
    {
      icon: FaClock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any questions or concerns.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            How MicroFund Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform makes sustainable finance accessible and efficient through AI-powered matching and secure transactions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Step key={index} {...step} delay={index * 0.1} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">Platform Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">For Borrowers</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Quick Application Process</h3>
                  <p className="text-gray-600">Submit your green business project details through our streamlined application form.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">AI-Powered Assessment</h3>
                  <p className="text-gray-600">Our AI evaluates your project's sustainability metrics and financial viability.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Flexible Funding Options</h3>
                  <p className="text-gray-600">Access various funding options tailored to your project's needs and scale.</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-6">For Investors</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Curated Opportunities</h3>
                  <p className="text-gray-600">Browse pre-vetted sustainable projects that match your investment criteria.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Impact Tracking</h3>
                  <p className="text-gray-600">Monitor both financial returns and environmental impact metrics in real-time.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Portfolio Management</h3>
                  <p className="text-gray-600">Easily manage and diversify your sustainable investment portfolio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;