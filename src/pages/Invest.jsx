import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaSolarPanel, FaRecycle, FaWind } from 'react-icons/fa';

const ProjectCard = ({ title, description, amount, returns, duration, progress, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden"
  >
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Target Amount:</span>
          <span className="font-medium">${amount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Expected Returns:</span>
          <span className="font-medium text-green-600">{returns}% APR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Duration:</span>
          <span className="font-medium">{duration} months</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
      <button className="w-full mt-4 btn btn-primary">
        Invest Now
      </button>
    </div>
  </motion.div>
);

const Invest = () => {
  const projects = [
    {
      title: "Solar Farm Project",
      description: "Large-scale solar installation project in California's Central Valley.",
      amount: "500,000",
      returns: "8.5",
      duration: "36",
      progress: 75,
      icon: FaSolarPanel,
    },
    {
      title: "Organic Farm Expansion",
      description: "Supporting local organic farmers in expanding their sustainable operations.",
      amount: "250,000",
      returns: "7.2",
      duration: "24",
      progress: 60,
      icon: FaSeedling,
    },
    {
      title: "Recycling Facility",
      description: "Modern recycling facility upgrade for improved waste management.",
      amount: "750,000",
      returns: "9.0",
      duration: "48",
      progress: 40,
      icon: FaRecycle,
    },
    {
      title: "Wind Energy Project",
      description: "Offshore wind farm development project in the Pacific Northwest.",
      amount: "1,000,000",
      returns: "8.8",
      duration: "60",
      progress: 25,
      icon: FaWind,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Investment Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover curated sustainable projects with competitive returns and verified impact metrics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invest;