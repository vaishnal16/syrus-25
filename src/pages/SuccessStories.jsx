import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Story = ({ name, business, image, content, amount, impact, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden"
  >
    <div className="p-6">
      <div className="flex items-center mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600">{business}</p>
        </div>
      </div>
      <div className="mb-6">
        <FaQuoteLeft className="w-8 h-8 text-blue-200 mb-4" />
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Funded Amount</p>
            <p className="text-lg font-semibold text-blue-600">${amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Environmental Impact</p>
            <p className="text-lg font-semibold text-green-600">{impact}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

const SuccessStories = () => {
  const stories = [
    {
      name: "Sarah Chen",
      business: "SolarTech Solutions",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "MicroFund helped us secure funding for our solar panel installation business. Within months, we expanded operations and doubled our impact in renewable energy.",
      amount: "250,000",
      impact: "-500 CO2 tons/year",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      business: "EcoWaste Management",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: "Thanks to MicroFund's AI-matching, we found the perfect investors for our recycling facility upgrade. Now we process 200% more waste efficiently.",
      amount: "400,000",
      impact: "1000 tons recycled/month",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      business: "Green Transport Co",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: "The platform's efficiency in connecting us with green investors was remarkable. We've now expanded our electric vehicle fleet significantly.",
      amount: "350,000",
      impact: "-300 CO2 tons/year",
      rating: 4,
    },
    {
      name: "David Park",
      business: "Sustainable Farms",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      content: "MicroFund's support enabled us to implement advanced sustainable farming practices. Our yield has increased while reducing water usage.",
      amount: "180,000",
      impact: "60% water saved",
      rating: 5,
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
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how MicroFund has helped sustainable businesses grow while making a positive environmental impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <Story key={index} {...story} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;