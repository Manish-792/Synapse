import React, { useState } from 'react'
import AnimatedAIChat from '@/components/AnimatedAIChat'
import ClassicLoader from '@/components/ClassicLoader'
import AnimatedBtn1 from '@/components/AnimatedBtn1'

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [quotaExceeded, setQuotaExceeded] = useState(false)

  const sendMessage = async (messageContent) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Get API URL with fallback - Update this to your deployed backend URL
      const apiUrl = import.meta.env.VITE_API_URL || 'https://synapse-ai-backend.onrender.com'
      
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

  const LoaderComponent = () => <ClassicLoader size="md" color="purple" />

  const SendButton = ({ disabled, isLoading: buttonLoading }) => (
    <AnimatedBtn1
      type="submit"
      disabled={disabled}
      isLoading={buttonLoading}
      variant="primary"
      size="md"
    >
      Send
    </AnimatedBtn1>
  )

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Spline 3D Orb Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-Y9EUzqvM2ioq9TDYLr8iE0Ht/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="opacity-20"
          title="3D Orb Background"
        ></iframe>
      </div>
      
      <div className="relative z-10">
        <AnimatedAIChat
        messages={messages}
        isLoading={isLoading}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
        quotaExceeded={quotaExceeded}
        LoaderComponent={LoaderComponent}
        SendButton={SendButton}
        />
      </div>
    </div>
  )
}

export default ChatPage
