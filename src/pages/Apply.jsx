import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaMoneyBillWave, FaBusinessTime, FaChartLine } from 'react-icons/fa';

const Apply = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    loanAmount: '',
    purpose: '',
    duration: '12',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement loan application submission
    console.log('Loan application:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">
            Apply for a Green Business Loan
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((number) => (
                <div
                  key={number}
                  className={`flex items-center ${
                    number < step ? 'text-green-500' : number === step ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    number < step ? 'border-green-500 bg-green-50' :
                    number === step ? 'border-blue-500 bg-blue-50' :
                    'border-gray-300'
                  }`}>
                    {number}
                  </div>
                  <div className="ml-2 text-sm font-medium hidden sm:block">
                    {number === 1 ? 'Basic Info' : number === 2 ? 'Business Details' : 'Review'}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      className="input mt-1"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
                      Loan Amount ($)
                    </label>
                    <input
                      type="number"
                      id="loanAmount"
                      name="loanAmount"
                      className="input mt-1"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-primary"
                    >
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                      Loan Purpose
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      className="input mt-1"
                      value={formData.purpose}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a purpose</option>
                      <option value="solar">Solar Installation</option>
                      <option value="efficiency">Energy Efficiency</option>
                      <option value="waste">Waste Management</option>
                      <option value="other">Other Green Initiative</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Loan Duration (months)
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      className="input mt-1"
                      value={formData.duration}
                      onChange={handleChange}
                      required
                    >
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="input mt-1"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-secondary"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn btn-primary"
                    >
                      Next Step
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Application Summary</h3>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Business Name:</dt>
                        <dd>{formData.businessName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Loan Amount:</dt>
                        <dd>${formData.loanAmount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Purpose:</dt>
                        <dd>{formData.purpose}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-gray-600">Duration:</dt>
                        <dd>{formData.duration} months</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-secondary"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit Application
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;