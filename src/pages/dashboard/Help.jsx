import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaBook, FaHeadset, FaComments } from 'react-icons/fa';

const HelpCard = ({ icon: Icon, title, description, action }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="text-blue-600 hover:text-blue-700 font-medium">
      {action}
    </button>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="border-b border-gray-200 py-4">
    <h4 className="text-lg font-medium text-gray-900 mb-2">{question}</h4>
    <p className="text-gray-600">{answer}</p>
  </div>
);

const Help = () => {
  const faqs = [
    {
      question: "How do I start investing?",
      answer: "To start investing, create an account, complete your profile verification, and browse available investment opportunities. You can invest with as little as $100."
    },
    {
      question: "What are the risks involved?",
      answer: "All investments carry risks. We provide detailed risk assessments for each project and recommend diversifying your portfolio to minimize risk exposure."
    },
    {
      question: "How are returns calculated?",
      answer: "Returns are calculated based on the project's performance and are typically distributed monthly or quarterly, depending on the investment terms."
    },
    {
      question: "How can I track my investments?",
      answer: "Use the dashboard to monitor your investments, view real-time updates, and track your returns. Detailed analytics are available for each investment."
    }
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">Find answers and get support for your questions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <HelpCard
            icon={FaBook}
            title="Knowledge Base"
            description="Browse our comprehensive guides and documentation"
            action="View Articles"
          />
          <HelpCard
            icon={FaHeadset}
            title="Contact Support"
            description="Get help from our customer support team"
            action="Contact Us"
          />
          <HelpCard
            icon={FaComments}
            title="Community Forum"
            description="Connect with other investors and share experiences"
            action="Join Discussion"
          />
          <HelpCard
            icon={FaQuestionCircle}
            title="FAQs"
            description="Find answers to commonly asked questions"
            action="View FAQs"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Help;