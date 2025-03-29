import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaDownload, FaEye, FaFileUpload, FaTimes, FaChartLine, FaSearch } from 'react-icons/fa';
import { analyzeDocument, analyzeTrends } from '../../services/DocumentAnalysisService';

const AnalysisModal = ({ analysis, onClose }) => {
  // Function to clean text from markdown characters
  const cleanText = (text) => {
    return text
      .replace(/\*\*/g, '') // Remove bold asterisks
      .replace(/\*/g, '')   // Remove italic asterisks
      .trim();
  };

  // Function to format the analysis text
  const formatAnalysis = (text) => {
    return text.split('\n').map((line, index) => {
      // Clean the line from markdown characters
      const cleanedLine = cleanText(line);

      if (cleanedLine.startsWith('📊') || cleanedLine.startsWith('💰') || cleanedLine.startsWith('🌿') || 
          cleanedLine.startsWith('⚠️') || cleanedLine.startsWith('📈') || cleanedLine.startsWith('🔄')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-blue-600 flex items-center">{cleanedLine}</h2>;
      } else if (cleanedLine.startsWith('---')) {
        return <hr key={index} className="border-t-2 border-gray-200 my-2" />;
      } else if (cleanedLine.startsWith('•')) {
        // Handle main points
        const pointText = cleanedLine.substring(1).trim();
        return (
          <div key={index} className="text-lg font-semibold text-gray-800 mt-4 ml-4">
            <span className="text-blue-600 mr-2">•</span>
            {pointText}
          </div>
        );
      } else if (cleanedLine.startsWith('-')) {
        // Handle sub-points
        const subPointText = cleanedLine.substring(1).trim();
        return (
          <div key={index} className="text-base text-gray-600 mt-2 ml-8 flex items-start">
            <span className="text-gray-400 mr-2">-</span>
            {subPointText}
          </div>
        );
      } else if (cleanedLine.trim() === '') {
        return <div key={index} className="h-2"></div>;
      } else {
        return <div key={index} className="text-base text-gray-700">{cleanedLine}</div>;
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b z-10">
            <h2 className="text-2xl font-bold text-gray-900">Document Analysis</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <div className="prose max-w-none">
            <div className="space-y-2 text-gray-800">
              {formatAnalysis(analysis)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentCard = ({ title, type, date, size, file, onDelete, onAnalyze }) => (
  <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center">
      <FaFileAlt className="w-8 h-8 text-blue-600" />
      <div className="ml-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{type} • {size} • {date}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button 
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => {
          if (file) {
            const fileUrl = URL.createObjectURL(file);
            window.open(fileUrl, '_blank');
          } else {
            alert('This is a demo document. Upload your own documents to enable preview.');
          }
        }}
      >
        <FaEye className="w-5 h-5" />
      </button>
      <button 
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => {
          if (file) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = title;
            link.click();
          } else {
            alert('This is a demo document. Upload your own documents to enable download.');
          }
        }}
      >
        <FaDownload className="w-5 h-5" />
      </button>
      <button 
        className="p-2 text-gray-600 hover:text-green-600 transition-colors"
        onClick={() => onAnalyze()}
      >
        <FaSearch className="w-5 h-5" />
      </button>
      <button 
        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
        onClick={() => onDelete()}
      >
        <FaTimes className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      title: "ESG Investment Portfolio Analysis.pdf",
      type: "PDF",
      date: "2024-02-20",
      size: "3.2 MB",
      file: null
    },
    {
      title: "Renewable Energy Project Report Q1.xlsx",
      type: "XLSX",
      date: "2024-02-15",
      size: "1.8 MB",
      file: null
    },
    {
      title: "Green Bond Investment Summary.pdf",
      type: "PDF",
      date: "2024-02-10",
      size: "2.4 MB",
      file: null
    },
    {
      title: "Sustainable Investment Strategy 2024.docx",
      type: "DOCX",
      date: "2024-02-05",
      size: "1.5 MB",
      file: null
    },
    {
      title: "Carbon Credit Trading Analysis.pdf",
      type: "PDF",
      date: "2024-02-01",
      size: "4.1 MB",
      file: null
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showTrendAnalysis, setShowTrendAnalysis] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Read file content
      const content = await file.text();
      
      // Create new document object
      const newDocument = {
        title: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        file: file,
        content: content
      };

      // Add new document to the list
      setDocuments(prev => [newDocument, ...prev]);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleAnalyze = async (document) => {
    if (!document.file) {
      alert('This is a demo document. Upload your own documents to enable analysis.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const content = document.content || await document.file.text();
      const analysisResult = await analyzeDocument(content);
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Error analyzing document. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTrendAnalysis = async () => {
    const documentsWithContent = documents.filter(doc => doc.file);
    if (documentsWithContent.length < 2) {
      alert('Upload at least two documents to perform trend analysis.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeTrends(documentsWithContent);
      setAnalysis(analysisResult);
      setShowTrendAnalysis(true);
    } catch (error) {
      console.error('Trend analysis error:', error);
      alert('Error performing trend analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter((_, i) => i !== index));
    }
  };

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
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
            <button 
              className={`flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
                isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleTrendAnalysis}
              disabled={isAnalyzing}
            >
              <FaChartLine className="mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Document Analysis'}
            </button>
            <button 
              className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <FaFileUpload className="mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {documents.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaFileAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No documents yet</h3>
              <p className="text-gray-500 mt-2">Upload your first document to get started</p>
            </div>
          ) : (
            documents.map((doc, index) => (
              <DocumentCard 
                key={index} 
                {...doc} 
                onDelete={() => handleDelete(index)}
                onAnalyze={() => handleAnalyze(doc)}
              />
            ))
          )}
        </div>

        {analysis && (
          <AnalysisModal 
            analysis={analysis} 
            onClose={() => {
              setAnalysis(null);
              setShowTrendAnalysis(false);
            }} 
          />
        )}
      </motion.div>
    </div>
  );
};

export default Documents;