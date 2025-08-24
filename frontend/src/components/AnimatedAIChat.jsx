import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SynapseLogo from './SynapseLogo'

const AnimatedAIChat = ({ 
  messages, 
  isLoading, 
  inputValue, 
  setInputValue, 
  onSendMessage, 
  onClearChat,
  quotaExceeded,
  LoaderComponent,
  SendButton 
}) => {
  const chatContainerRef = useRef(null)

  // Animate new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      const messageElement = document.querySelector(`[data-message-id="${lastMessage.id}"]`)
      
      if (messageElement) {
        gsap.fromTo(messageElement,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
        )
      }
    }
  }, [messages])

  // Animate chat container on mount
  useEffect(() => {
    if (chatContainerRef.current) {
      gsap.fromTo(chatContainerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading || quotaExceeded) return
    onSendMessage(inputValue.trim())
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 font-futuristic" style={{ lineHeight: '1.1', paddingBottom: '0.1em' }}>
          Chat with Synapse
        </h2>
        <p className="text-xl text-gray-300">
          Ask anything and watch Synapse think through complex problems step by step
        </p>
      </div>

      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        className="glass-effect rounded-3xl p-6 md:p-8 min-h-[600px] flex flex-col backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 max-h-[500px] custom-scrollbar">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="flex justify-center mb-4">
                <SynapseLogo size="xl" />
              </div>
              <p className="text-lg mb-2">Start a conversation with Synapse</p>
              <p className="text-sm text-gray-500">Try asking: "What's the weather like in London?" or "Plan a day trip for me"</p>
              <div className="mt-6 flex justify-center space-x-4">
                <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
                  Weather
                </div>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300">
                  News
                </div>
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-300">
                  Math
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id}
                data-message-id={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl relative ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 text-white shadow-lg'
                      : message.role === 'error'
                      ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-orange-500/30 text-orange-200 backdrop-blur-sm'
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 text-white backdrop-blur-sm shadow-lg'
                  }`}
                >
                  {/* Message indicator */}
                  {message.role !== 'user' && (
                    <div className="absolute -left-2 top-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full border-2 border-gray-900"></div>
                  )}
                  {message.role === 'user' && (
                    <div className="absolute -right-2 top-4 w-3 h-3 bg-gradient-to-br from-purple-300 to-white rounded-full border-2 border-gray-900"></div>
                  )}
                  
                  <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-3 opacity-70 ${
                    message.role === 'user' ? 'text-purple-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && LoaderComponent && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-lg relative">
                <div className="absolute -left-2 top-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                <LoaderComponent />
              </div>
            </div>
          )}
        </div>

        {/* Quota Status Indicator */}
        {quotaExceeded && (
          <div className="mb-4 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-orange-300">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-lg">⚠️</span>
              </div>
              <div>
                <p className="font-medium">Daily API quota exceeded</p>
                <p className="text-sm text-orange-400">Try again tomorrow or upgrade your plan</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={quotaExceeded ? "API quota exceeded - try again tomorrow" : "Ask your AI agent anything..."}
            className="flex-1 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
            disabled={isLoading || quotaExceeded}
          />
          {SendButton ? (
            <SendButton 
              disabled={isLoading || !inputValue.trim() || quotaExceeded}
              isLoading={isLoading}
            />
          ) : (
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim() || quotaExceeded}
              className="px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Send'
              )}
            </button>
          )}
        </form>

        {/* Clear Chat Button */}
        {messages.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={onClearChat}
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:bg-white/5 px-4 py-2 rounded-lg"
            >
              Clear Chat
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-3 animate-bounce">🧠</div>
          <h3 className="text-lg font-semibold mb-2 gradient-text">Multi-step Reasoning</h3>
          <p className="text-gray-300 text-sm">The AI breaks down complex problems into logical steps</p>
        </div>
        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-3 animate-pulse">🛠️</div>
          <h3 className="text-lg font-semibold mb-2 gradient-text">Real-time Tools</h3>
          <p className="text-gray-300 text-sm">Access weather, news, calculations, and more</p>
        </div>
        <div className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
          <div className="text-3xl mb-3 animate-bounce" style={{ animationDelay: '0.2s' }}>⚡</div>
          <h3 className="text-lg font-semibold mb-2 gradient-text">Instant Responses</h3>
          <p className="text-gray-300 text-sm">Get intelligent answers with beautiful animations</p>
        </div>
      </div>
    </div>
  )
}

export default AnimatedAIChat
