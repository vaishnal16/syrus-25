const API_KEY = 'AIzaSyCCjJUGagM9Tnfkp0WOTFkGxzWNw01eIbk';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const analyzeDocument = async (fileContent) => {
  try {
    const prompt = `As a document analysis expert, analyze this document and provide insights using the following structure:

📊 DOCUMENT OVERVIEW
------------------
• Document Type and Structure:
  - Identify document format and organization
  - Key sections and components
• Main Topics:
  - Primary subjects covered
  - Key themes identified
• Document Quality:
  - Completeness of information
  - Clarity of presentation

💰 CONTENT ANALYSIS
----------------
• Key Information:
  - Important data points
  - Critical findings
• Data Presentation:
  - Tables and figures
  - Statistical information
• Supporting Evidence:
  - Referenced sources
  - Data validation

🌿 DOCUMENT INSIGHTS
-----------------
• Major Points:
  - Key arguments presented
  - Main conclusions
• Supporting Data:
  - Evidence provided
  - Data quality assessment
• Document Impact:
  - Significance of findings
  - Potential applications

Document Content:
${fileContent}

Please provide a detailed analysis focusing on the document's content, structure, and key findings.`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze document');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Document analysis error:', error);
    throw error;
  }
};

export const analyzeTrends = async (documents) => {
  try {
    const documentsContent = documents.map(doc => ({
      title: doc.title,
      content: doc.content || "Sample document content for analysis"
    }));
    
    const prompt = `As a document analysis expert, provide a comprehensive analysis of these documents. Format your response using the following structure:

📊 DOCUMENTS OVERVIEW
-------------------
• Collection Summary:
  - Number and types of documents
  - Overall document quality
• Common Themes:
  - Shared topics across documents
  - Recurring elements

📑 DOCUMENT COMPARISONS
--------------------
• Content Similarities:
  - Common information
  - Shared data points
• Key Differences:
  - Unique aspects
  - Varying perspectives
• Information Quality:
  - Consistency across documents
  - Data reliability

📈 CONTENT ANALYSIS
----------------
• Information Patterns:
  - Recurring data elements
  - Common arguments
• Supporting Evidence:
  - Cross-document validation
  - Data consistency
• Knowledge Gaps:
  - Missing information
  - Areas needing clarification

📌 KEY FINDINGS
-------------
• Major Insights:
  - Primary discoveries
  - Important conclusions
• Document Relationships:
  - Inter-document connections
  - Information flow
• Critical Points:
  - Essential takeaways
  - Significant findings

✍️ RECOMMENDATIONS
---------------
• Document Improvements:
  - Suggested enhancements
  - Areas for expansion
• Information Gaps:
  - Additional data needed
  - Clarification requirements
• Next Steps:
  - Follow-up actions
  - Further analysis needed

Documents Analyzed:
${documentsContent.map(doc => `
Title: ${doc.title}
Content Summary: ${doc.content.substring(0, 200)}...
---`).join('\n')}

Please provide a detailed analysis focusing on the content and relationships between these documents. Highlight key findings, patterns, and important insights found across the documents.`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze documents');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Document analysis error:', error);
    throw error;
  }
}; 