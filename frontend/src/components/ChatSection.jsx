import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ChatSection = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [quotaExceeded, setQuotaExceeded] = useState(false)
  const chatContainerRef = useRef(null)



  // Animate new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      const messageElement = document.querySelector(`[data-message-id="${lastMessage.id}"]`)
      
      if (messageElement) {
        gsap.fromTo(messageElement,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        )
      }
    }
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Get API URL with fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: chatHistory
        })
      })

      const data = await response.json()
      
      // Check if the response contains an error message (even with 200 status)
      if (data.error || data.message?.includes('quota') || data.message?.includes('429') || 
          (typeof data.message === 'string' && data.message.includes('"code":429'))) {
        throw new Error(data.message || data.error || 'API Error')
      }
      
      // Also check HTTP status code as fallback
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      if (data.success) {
        // Check if the finalResponse contains an error message
        if (data.finalResponse && (
          data.finalResponse.includes('Error:') || 
          data.finalResponse.includes('"code":429') ||
          data.finalResponse.includes('quota') ||
          data.finalResponse.includes('RESOURCE_EXHAUSTED')
        )) {
          throw new Error(data.finalResponse)
        }
        
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.finalResponse,
          timestamp: new Date().toLocaleTimeString()
        }

        setMessages(prev => [...prev, aiMessage])
        setChatHistory(data.history)
      } else {
        throw new Error(data.message || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Handle different types of errors gracefully
      let userFriendlyMessage = 'Something went wrong. Please try again.'
      
      if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('"code":429')) {
        setQuotaExceeded(true)
        userFriendlyMessage = '⚠️ Free tier limit reached! You have exceeded the daily API quota (50 requests/day).\n\n💡 What you can do:\n• Try again tomorrow when the quota resets\n• Upgrade to a paid plan for higher limits\n• Use a different API key\n\nFor now, you can still explore the interface and see how the AI agent works!'
      } else if (error.message.includes('404')) {
        userFriendlyMessage = '❌ Unable to connect to the AI service. Please check if the backend server is running.'
      } else if (error.message.includes('500')) {
        userFriendlyMessage = '🔧 The AI service is experiencing issues. Please try again in a few moments.'
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        userFriendlyMessage = '🌐 Network connection issue. Please check your internet connection and try again.'
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: userFriendlyMessage,
        timestamp: new Date().toLocaleTimeString()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setChatHistory([])
    setQuotaExceeded(false)
  }

  return (
    <section id="chat-section" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Chat with Your AI Agent
          </h2>
          <p className="text-xl text-gray-300">
            Ask anything and watch the AI think through complex problems step by step
          </p>
        </div>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="glass-effect rounded-3xl p-6 md:p-8 min-h-[600px] flex flex-col"
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4 max-h-[500px]">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-lg">Start a conversation with your AI agent</p>
                <p className="text-sm mt-2">Try asking: "What's the weather like in London?" or "Plan a day trip for me"</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  data-message-id={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                                     <div
                     className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl ${
                       message.role === 'user'
                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                         : message.role === 'error'
                         ? 'bg-orange-500/20 border border-orange-500/30 text-orange-200 backdrop-blur-sm'
                         : 'glass-card text-white'
                     }`}
                   >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-300 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
                         )}
           </div>

                     {/* Quota Status Indicator */}
           {quotaExceeded && (
             <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
               <div className="flex items-center space-x-2 text-orange-300 text-sm">
                 <span>⚠️</span>
                 <span>Daily API quota exceeded. Try again tomorrow or upgrade your plan.</span>
               </div>
             </div>
           )}
           
           {/* Input Area */}
           <form onSubmit={sendMessage} className="flex space-x-4">
                         <input
               type="text"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               placeholder={quotaExceeded ? "API quota exceeded - try again tomorrow" : "Ask your AI agent anything..."}
               className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
               disabled={isLoading || quotaExceeded}
             />
                         <button
               type="submit"
               disabled={isLoading || !inputValue.trim() || quotaExceeded}
               className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
             >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Send'
              )}
            </button>
          </form>

          {/* Clear Chat Button */}
          {messages.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={clearChat}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Clear Chat
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-semibold mb-2">Multi-step Reasoning</h3>
            <p className="text-gray-300 text-sm">The AI breaks down complex problems into logical steps</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">🛠️</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Tools</h3>
            <p className="text-gray-300 text-sm">Access weather, news, calculations, and more</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Instant Responses</h3>
            <p className="text-gray-300 text-sm">Get intelligent answers with beautiful animations</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatSection
