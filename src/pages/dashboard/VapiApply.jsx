import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileAlt, FaMoneyBillWave, FaBusinessTime, 
  FaChartLine, FaInfoCircle, FaCheckCircle, 
  FaFileUpload, FaMicrophone 
} from 'react-icons/fa';

const InfoCard = ({ title, description, icon: Icon }) => (
  <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-4">
    <div className="flex-shrink-0">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h4 className="font-medium text-blue-900">{title}</h4>
      <p className="text-sm text-blue-700">{description}</p>
    </div>
  </div>
);

const RequirementList = ({ requirements }) => (
  <div className="space-y-2">
    {requirements.map((req, index) => (
      <div key={index} className="flex items-center space-x-2 text-gray-700">
        <FaCheckCircle className="w-5 h-5 text-green-500" />
        <span>{req}</span>
      </div>
    ))}
  </div>
);

const VapiApply = () => {
  const [step, setStep] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    loanAmount: '',
    purpose: '',
    duration: '12',
    description: '',
    businessType: '',
    yearsFounded: '',
    annualRevenue: '',
    employeeCount: '',
    sustainabilityGoals: '',
    documents: [],
  });
  const [backendFormData, setBackendFormData] = useState(null);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Fetch loan details from backend
  const fetchLoanDetails = () => {
    setError(null);
    fetch("https://microfund-backend.onrender.com/api/get-business-loans")
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch loan details');
        }
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const loanData = data[0];
          setBackendFormData(loanData);
          setFormData(prevData => ({
            ...prevData,
            businessName: loanData.businessName || prevData.businessName,
            loanAmount: loanData.loanAmount || prevData.loanAmount,
            purpose: loanData.purpose || prevData.purpose,
            duration: loanData.duration || prevData.duration,
            description: loanData.description || prevData.description,
            businessType: loanData.businessType || prevData.businessType,
            yearsFounded: loanData.yearsFounded || prevData.yearsFounded,
            annualRevenue: loanData.annualRevenue || prevData.annualRevenue,
            sustainabilityGoals: loanData.sustainabilityGoals || prevData.sustainabilityGoals,
          }));
        }
      })
      .catch(err => {
        console.error("Error fetching loan details:", err);
        setError('Could not fetch loan details. Please try again.');
      });
  };

  // Voice command handler
  const handleVoiceCommand = (transcript) => {
    const commands = {
      'fetch loan': fetchLoanDetails,
      'get loan details': fetchLoanDetails,
      'next step': () => setStep(prevStep => Math.min(prevStep + 1, 3)),
      'previous step': () => setStep(prevStep => Math.max(prevStep - 1, 1)),
      'submit application': handleSubmit
    };

    // Find and execute matching command
    Object.keys(commands).forEach(command => {
      if (transcript.includes(command)) {
        commands[command]();
      }
    });
  };

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setIsListening(!isListening);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevData => ({
      ...prevData,
      documents: [...prevData.documents, ...files],
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validate form data
    const requiredFields = [
      'businessName', 'loanAmount', 'purpose', 'duration', 
      'businessType', 'yearsFounded', 'annualRevenue'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // TODO: Implement actual submission logic
    console.log('Submitting Loan Application:', formData);
    
    // Example submission (replace with actual API call)
    fetch('https://microfund-backend.onrender.com/api/submit-business-loan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Loan application submitted successfully!');
      // Reset form or navigate to confirmation page
    })
    .catch(error => {
      console.error('Submission error:', error);
      setError('Failed to submit application. Please try again.');
    });
  };

  // Predefined lists
  const loanRequirements = [
    'Registered business for at least 1 year',
    'Minimum annual revenue of $100,000',
    'Good credit standing',
    'Clear sustainability objectives',
    'Detailed project implementation plan',
  ];

  const documentRequirements = [
    'Business registration certificate',
    'Last 2 years financial statements',
    'Bank statements (6 months)',
    'Tax returns',
    'Sustainability impact assessment',
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with Voice Recognition */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Green Business Loan Application</h1>
            <p className="text-gray-600">Sustainable financing powered by AI</p>
          </div>
          <div className="flex items-center space-x-4">
            {error && (
              <div className="text-red-500 mr-4">
                {error}
              </div>
            )}
            <button 
              onClick={toggleSpeechRecognition}
              className={`p-3 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
              title={isListening ? 'Stop Listening' : 'Start Voice Command'}
            >
              <FaMicrophone className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Application Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Stepper */}
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
                      {number === 1 ? 'Basic Info' : number === 2 ? 'Project Details' : 'Review'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Content */}
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
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                        Business Type
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        className="input mt-1"
                        value={formData.businessType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select business type</option>
                        <option value="sole_proprietorship">Sole Proprietorship</option>
                        <option value="partnership">Partnership</option>
                        <option value="corporation">Corporation</option>
                        <option value="llc">LLC</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="yearsFounded" className="block text-sm font-medium text-gray-700">
                        Years in Business
                      </label>
                      <input
                        type="number"
                        id="yearsFounded"
                        name="yearsFounded"
                        className="input mt-1"
                        value={formData.yearsFounded}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700">
                        Annual Revenue ($)
                      </label>
                      <input
                        type="number"
                        id="annualRevenue"
                        name="annualRevenue"
                        className="input mt-1"
                        value={formData.annualRevenue}
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
                      <label htmlFor="sustainabilityGoals" className="block text-sm font-medium text-gray-700">
                        Sustainability Goals
                      </label>
                      <textarea
                        id="sustainabilityGoals"
                        name="sustainabilityGoals"
                        rows={3}
                        className="input mt-1"
                        value={formData.sustainabilityGoals}
                        onChange={handleChange}
                        placeholder="Describe your project's environmental impact goals..."
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Detailed Project Description
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Required Documents
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="documents"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload files</span>
                              <input
                                id="documents"
                                name="documents"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={handleFileUpload}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC up to 10MB each
                          </p>
                        </div>
                      </div>
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
                          <dt className="font-medium text-gray-600">Business Type:</dt>
                          <dd>{formData.businessType}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Years in Business:</dt>
                          <dd>{formData.yearsFounded}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="font-medium text-gray-600">Annual Revenue:</dt>
                          <dd>${formData.annualRevenue}</dd>
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
                        <div className="border-t pt-3">
                          <dt className="font-medium text-gray-600 mb-2">Uploaded Documents:</dt>
                          <dd>
                            <ul className="list-disc pl-5 space-y-1">
                              {formData.documents.map((doc, index) => (
                                <li key={index} className="text-sm text-gray-600">{doc.name}</li>
                              ))}
                            </ul>
                          </dd>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loan Requirements */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Requirements</h3>
              <RequirementList requirements={loanRequirements} />
            </div>

            {/* Document Requirements */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
              <RequirementList requirements={documentRequirements} />
            </div>

            {/* Additional Info Cards */}
            <div className="space-y-4">
              <InfoCard
                icon={FaMoneyBillWave}
                title="Voice Commands"
                description="Enable microphone for commands like 'fetch loan', 'next step', 'previous step'"
              />
              <InfoCard
                icon={FaBusinessTime}
                title="Quick Processing"
                description="Get a decision within 48 hours of submitting your complete application."
              />
              <InfoCard
                icon={FaInfoCircle}
                title="Need Help?"
                description="Our support team is available 24/7 to assist you with your application."
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VapiApply;