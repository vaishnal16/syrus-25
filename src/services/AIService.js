const API_KEY = 'AIzaSyDfZGcvZkez4sgcDqrvg20fJfL2OeXKJJw';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const getSustainableFinanceResponse = async (userMessage, context = '') => {
  try {
    // Check if the message is a greeting
    const isGreeting = /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(userMessage.trim());

    const prompt = `You are a specialized investment advisor focused on sustainable and ESG investing. Your expertise lies in helping investors make informed decisions about sustainable investments.
    
    Previous context: ${context}
    User message: ${userMessage}

    ${isGreeting ? `
    For greetings, respond warmly and briefly with:
    
    💡 Direct Answer
    A friendly welcome message focused on sustainable investing
    
    📚 Brief Introduction
    • Highlight your expertise in ESG investment analysis
    • Mention your knowledge of sustainable portfolio management
    • Keep it professional and investment-focused
    ` : `
    Format your detailed response using the following structure:

    💡 Direct Answer
    Provide a clear, investment-focused answer addressing the user's question.

    📚 Investment Analysis
    • ESG considerations and screening criteria
    • Portfolio impact and sustainability metrics
    • Market trends and opportunities

    📊 Key Investment Metrics
    • Relevant ESG scores and ratings
    • Performance benchmarks
    • Risk-return metrics
    • Impact measurements

    🎯 Investment Recommendations
    1. Specific investment strategies
    2. Portfolio allocation suggestions
    3. Risk management considerations
    `}

    Focus your expertise on:
    • ESG investment screening and analysis
    • Sustainable portfolio construction
    • Green bonds and climate-aligned investments
    • Impact measurement and reporting
    • ESG risk assessment
    • Sustainable Development Goals (SDGs) alignment
    • Clean energy and renewable investments

    Important: 
    - Provide specific, actionable investment advice
    - Include relevant ESG metrics and benchmarks
    - Reference industry standards and best practices
    - Use emoji bullets (•) for lists
    - Use numbers (1., 2., 3.) for steps
    - Use clear section emojis (💡, 📚, 📊, 🎯)
    - Add line breaks between sections
    - Keep formatting consistent`;

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
          temperature: 0.3,
          maxOutputTokens: 1000,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated');
    }

    const candidate = data.candidates[0];
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('Invalid response structure');
    }

    const generatedText = candidate.content.parts[0].text;
    if (!generatedText) {
      throw new Error('Empty response received');
    }

    // Format the response with proper spacing and structure
    const formattedText = generatedText
      .trim()
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
      .replace(/\*\*/g, '') // Remove any asterisks
      .replace(/^/gm, '') // Ensure proper indentation
      .replace(/•/g, '•') // Ensure consistent bullet points
      .replace(/(\d+\.)/g, '$1 '); // Add space after numbers

    return formattedText;
  } catch (error) {
    console.error('AI Service Error:', error);
    if (error.message.includes('API key')) {
      throw new Error('Authentication failed. Please check the API key.');
    } else if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else {
      throw new Error('Failed to get AI response: ' + error.message);
    }
  }
}; 