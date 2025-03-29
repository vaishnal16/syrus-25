import { useState, useRef, useEffect } from 'react';
import { BsSend, BsRobot, BsPerson, BsInfoCircle, BsCalendarCheck, BsCurrencyDollar } from 'react-icons/bs';

function AISupport() {
  // System prompt for the financial adviser assistant
  const systemPrompt = `You are a smart and friendly AI assistant for a microfinance platform, helping users with loan applications, repayment schedules, savings plans, and financial literacy. You provide clear, concise, and accurate information while ensuring transparency and trust.
  Your key responsibilities include:
  Assisting users in applying for microloans and checking eligibility.
  Explaining loan repayment terms, interest rates, and due dates.
  Providing financial advice on savings, budgeting, and investment options.
  Answering questions about account balances, transaction history, and support services.
  Guiding users through documentation requirements and submission processes.
  Maintain a warm and professional tone, ensuring accessibility for users with varying financial literacy levels. If a query requires human intervention, guide the user to the appropriate support channel.`;

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your financial adviser. How can I help you with your microfinance needs today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI responses based on user input
  const getSimulatedResponse = (userMessage) => {
    // Convert user message to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Simple response mapping
    if (message.includes('loan') && message.includes('apply')) {
      return "To apply for a microloan, you'll need to provide proof of identity, income verification, and a brief business plan if applicable. Our microloans range from $500-$5,000 with flexible repayment terms. Would you like me to guide you through the application process?";
    } else if (message.includes('interest') || message.includes('rate')) {
      return "Our current interest rates for microloans range from 5% to 12% annually, depending on loan amount, term length, and your credit profile. We offer both fixed and variable rate options. Would you like to see a personalized quote based on your needs?";
    } else if (message.includes('repayment') || message.includes('schedule')) {
      return "We offer flexible repayment schedules including weekly, bi-weekly, or monthly options. Typical loan terms range from 6 months to 3 years. We can also structure seasonal repayment plans for businesses with fluctuating income. Would you like to see a sample repayment schedule?";
    } else if (message.includes('eligibility') || message.includes('qualify')) {
      return "Basic eligibility requirements include: being at least 18 years old, having a valid ID, proof of residence, and a source of income. We focus on your ability to repay rather than traditional credit scores. Do you have any specific questions about your eligibility?";
    } else if (message.includes('savings') || message.includes('save')) {
      return "We offer several savings products including emergency funds, goal-based savings, and retirement accounts. Our savings accounts currently earn 2.5% APY with no minimum balance requirements. Would you like some tips on building an effective savings plan?";
    } else if (message.includes('budget') || message.includes('spending')) {
      return "Creating a budget starts with tracking your income and expenses. I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Would you like me to help you create a basic budget template?";
    } else if (message.includes('document') || message.includes('paperwork')) {
      return "For most microfinance services, you'll need to provide: government-issued ID, proof of address (utility bill or lease agreement), income verification (pay stubs or bank statements), and a completed application form. All documents can be uploaded through our secure portal. Do you need help with any specific documentation?";
    } else {
      return "Thank you for your question. As a financial adviser, I can help with loan applications, repayment schedules, savings plans, budgeting advice, and financial literacy. Could you please provide more details about what specific financial assistance you're looking for?";
    }
  };

  // Simulated delay for more realistic typing effect
  const simulateTypingDelay = () => {
    // Random delay between 1-3 seconds
    return Math.floor(Math.random() * 2000) + 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = {
      role: 'user',
      content: trimmedInput,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Simulate API call delay
      setTimeout(() => {
        const aiResponse = getSimulatedResponse(trimmedInput);
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: aiResponse
        }]);
        
        setIsTyping(false);
      }, simulateTypingDelay());
    } catch (error) {
      console.error('Error in chat completion:', error);
      setError('Sorry, there was an error processing your request. Please try again.');
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Financial Adviser AI</h2>
        <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          <BsInfoCircle className="mr-2 text-blue-600" aria-hidden="true" />
          <span>Available 24/7</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[700px] flex flex-col" role="region" aria-label="Chat interface">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2.5 rounded-full shadow-sm">
              <BsCurrencyDollar className="h-6 w-6 text-blue-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Microfinance AI Assistant</h3>
              <div className="flex items-center text-xs text-gray-600">
                <BsCalendarCheck className="mr-1 text-blue-600" aria-hidden="true" />
                <span>Expert in loans, savings, and financial planning</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50" 
          role="log" 
          aria-live="polite" 
          aria-label="Conversation messages"
        >
          <div className="space-y-6">
            {messages.filter(msg => msg.role !== 'system').map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="bg-blue-100 p-2 rounded-full shadow-sm">
                      <BsRobot className="h-5 w-5 text-blue-700" aria-hidden="true" />
                    </div>
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 max-w-[70%] shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}
                  role={message.role === 'assistant' ? 'region' : 'note'}
                  aria-label={`${message.role === 'assistant' ? 'Assistant' : 'Your'} message`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="bg-blue-700 p-2 rounded-full shadow-sm">
                      <BsPerson className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-2 rounded-full shadow-sm">
                    <BsRobot className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  </div>
                </div>
                <div 
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  aria-label="Assistant is typing"
                >
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-100 text-sm">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about loans, savings, or financial advice..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              aria-label="Your message"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 shadow-sm flex items-center justify-center"
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
            >
              <BsSend className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AISupport;