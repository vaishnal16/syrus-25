import { useState, useRef, useEffect } from 'react';
import { 
  BsSend, 
  BsRobot, 
  BsPerson, 
  BsInfoCircle, 
  BsCalendarCheck, 
  BsTreeFill, 
  BsGlobeAmericas, 
  BsGraphUp 
} from 'react-icons/bs';
import { getSustainableFinanceResponse } from '../services/AIService';

function AISupport() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '💡 Direct Answer\nWelcome to your Sustainable Investment Advisor! I specialize in helping you make impactful investment decisions.\n\n📚 Brief Introduction\n• Expert in ESG screening and sustainable portfolio analysis\n• Deep knowledge of green bonds and renewable energy investments\n• Guidance on impact metrics and SDG-aligned investing'
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
    setError(null);

    try {
      // Get conversation context from last 3 messages
      const context = messages
        .slice(-3)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const aiResponse = await getSustainableFinanceResponse(trimmedInput, context);
      
      if (!aiResponse) {
        throw new Error('No response received from AI service');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
    } catch (error) {
      console.error('Error in chat completion:', error);
      let errorMessage = 'Sorry, there was an error processing your request.';
      
      if (error.message.includes('API key')) {
        errorMessage = 'Authentication error. Please contact support.';
      } else if (error.message.includes('quota')) {
        errorMessage = 'Service is temporarily unavailable. Please try again later.';
      } else if (error.message.includes('No response')) {
        errorMessage = 'The AI service did not generate a response. Please try rephrasing your question.';
      }
      
      setError(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sustainable Investment Advisor</h2>
        <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
          <BsInfoCircle className="mr-2 text-blue-600" aria-hidden="true" />
          <span>ESG & Sustainable Investing</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[700px] flex flex-col">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2.5 rounded-full shadow-sm">
              <BsTreeFill className="h-6 w-6 text-blue-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Investment Analysis Expert</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <div className="flex items-center">
                  <BsGlobeAmericas className="mr-1 text-blue-600" aria-hidden="true" />
                  <span>ESG Screening</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <BsGraphUp className="mr-1 text-blue-600" aria-hidden="true" />
                  <span>Portfolio Analysis</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <BsCalendarCheck className="mr-1 text-blue-600" aria-hidden="true" />
                  <span>Impact Metrics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50" 
          role="log" 
          aria-live="polite"
        >
          <div className="space-y-6">
            {messages.map((message, index) => (
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed font-medium">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 p-2 rounded-full shadow-sm">
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
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
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
              placeholder="Ask about ESG screening, impact investments, or sustainable portfolios..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              disabled={isTyping}
            />
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 shadow-sm flex items-center justify-center ${
                isTyping || !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isTyping || !input.trim()}
            >
              <BsSend className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AISupport;