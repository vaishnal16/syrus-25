const API_KEY = 'AIzaSyA8Ixc-PxSIAbTBPxmA-fGPwwP2KdRS8Dg';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const getInvestmentSuggestions = async (projectsInfo, preferences) => {
  try {
    const prompt = `As an investment advisor, analyze these sustainable investment projects: ${JSON.stringify(projectsInfo)}. 
    The investor has these preferences:
    - Investment amount: $${preferences.investmentAmount}
    - Expected returns: ${preferences.expectedReturns}%
    - Risk tolerance: ${preferences.riskLevel}
    
    Provide a detailed analysis and recommendations in the following JSON format:
    {
      "topRecommendation": {
        "projectTitle": "Project Name",
        "matchScore": "90%",
        "reasons": [
          "Clear reason 1",
          "Clear reason 2",
          "Clear reason 3"
        ],
        "riskAnalysis": "Detailed risk analysis",
        "returnPotential": "Return analysis"
      },
      "alternativeOptions": [
        {
          "projectTitle": "Alternative Project Name",
          "matchScore": "85%",
          "keyBenefit": "Main benefit"
        }
      ],
      "investmentStrategy": "Strategy details",
      "additionalNotes": "Important notes"
    }`;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      throw new Error('Invalid API response structure');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    
    // Find the JSON object in the response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const suggestionData = JSON.parse(jsonMatch[0]);
    
    if (!suggestionData.topRecommendation) {
      throw new Error('Missing top recommendation in response');
    }

    return suggestionData;
  } catch (error) {
    console.error('Suggestion Service Error:', error);
    return {
      topRecommendation: {
        projectTitle: "API Error",
        matchScore: "N/A",
        reasons: [
          `Error: ${error.message}`,
          "The API request encountered an issue.",
          "Please try again in a few moments."
        ],
        riskAnalysis: "API request failed",
        returnPotential: "Unable to process at this time"
      },
      alternativeOptions: [],
      investmentStrategy: "Please verify your input values and try again",
      additionalNotes: `Technical details: ${error.message}`
    };
  }
}; 