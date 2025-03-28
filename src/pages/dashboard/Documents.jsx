import React from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaDownload, FaEye, FaFileUpload } from 'react-icons/fa';

const DocumentCard = ({ title, type, date, size, status }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
    <div className="flex items-center">
      <FaFileAlt className="w-8 h-8 text-blue-600" />
      <div className="ml-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{type} • {size} • {date}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button className="p-2 text-gray-600 hover:text-blue-600">
        <FaEye className="w-5 h-5" />
      </button>
      <button className="p-2 text-gray-600 hover:text-blue-600">
        <FaDownload className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const Documents = () => {
  const documents = [
    {
      title: "Investment Agreement - Solar Project",
      type: "PDF",
      date: "2024-02-15",
      size: "2.4 MB",
      status: "signed"
    },
    {
      title: "Financial Statement Q4 2023",
      type: "PDF",
      date: "2024-01-30",
      size: "1.8 MB",
      status: "pending"
    },
    {
      title: "Project Progress Report",
      type: "PDF",
      date: "2024-02-10",
      size: "3.2 MB",
      status: "signed"
    },
    {
      title: "Tax Documents 2023",
      type: "PDF",
      date: "2024-01-15",
      size: "4.1 MB",
      status: "signed"
    }
  ];

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Manage your investment documents and reports</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FaFileUpload className="mr-2" />
            Upload Document
          </button>
        </div>

        <div className="grid gap-4">
          {documents.map((doc, index) => (
            <DocumentCard key={index} {...doc} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Documents;