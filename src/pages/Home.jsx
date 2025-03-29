import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaLeaf, FaHandHoldingUsd, FaUsers, FaChartLine } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-blue-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StatCard = ({ icon: Icon, value, label, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-lg bg-white shadow-lg"
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-3xl font-bold mb-2 text-blue-900">
        {inView && (
          <CountUp
            end={parseInt(value)}
            duration={2.5}
            suffix={value.includes('+') ? '+' : '%'}
            separator=","
          />
        )}
      </h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const Testimonial = ({ name, role, content, image }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg mx-4"
  >
    <div className="flex items-center mb-4">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-semibold text-blue-900">{name}</h4>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-700">{content}</p>
  </motion.div>
);

const Home = () => {
  const features = [
    {
      icon: FaLeaf,
      title: "Sustainable Impact",
      description: "Fund eco-friendly projects and make a positive environmental impact."
    },
    {
      icon: FaHandHoldingUsd,
      title: "AI-Powered Lending",
      description: "Smart algorithms ensure fair and efficient loan matching."
    },
    {
      icon: FaUsers,
      title: "Community Driven",
      description: "Join a network of conscious investors and entrepreneurs."
    },
    {
      icon: FaChartLine,
      title: "Growth Potential",
      description: "Track your investments and watch your impact grow."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Green Energy Entrepreneur",
      content: "MicroFund helped me secure funding for my solar panel installation business. The AI-driven process was seamless!",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Impact Investor",
      content: "As an investor, I appreciate how MicroFund connects me with verified sustainable businesses. Great returns and positive impact!",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Empowering Sustainable Finance Through AI
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Connect with eco-conscious investors or find sustainable businesses to support.
                Let AI guide your financial journey.
              </p>
              <div className="space-x-4">
                <Link
                  to="/apply"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
                >
                  Apply for a Loan
                </Link>
                <Link
                  to="/invest"
                  className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block"
                >
                  Start Investing
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <img
                  src="public/fundingimage.jpeg"
                  alt="Sustainable Finance"
                  className="relative z-10 w-full max-w-lg mx-auto animate-float rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              icon={FaLeaf}
              value="500+"
              label="Green Businesses Funded"
              delay={0}
            />
            <StatCard
              icon={FaHandHoldingUsd}
              value="10M+"
              label="Total Investment"
              delay={0.1}
            />
            <StatCard
              icon={FaUsers}
              value="10000+"
              label="Active Investors"
              delay={0.2}
            />
            <StatCard
              icon={FaChartLine}
              value="95"
              label="Success Rate"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Why Choose MicroFund?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform connects sustainable businesses with conscious investors,
              making green finance accessible to everyone.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our community of entrepreneurs and investors who are making
              a difference through sustainable finance.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8">
              Join our community of sustainable finance pioneers today.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block"
              >
                Get Started
              </Link>
              <Link
                to="/how-it-works"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-700 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;