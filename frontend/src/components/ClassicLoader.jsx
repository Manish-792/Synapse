import React from 'react'

const ClassicLoader = ({ size = 'md', color = 'purple' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    white: 'text-white'
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Animated dots */}
      <div className="flex space-x-1">
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse`}></div>
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
      </div>
      
      {/* Loading text */}
      <div className="flex flex-col">
        <span className={`${colorClasses[color]} text-sm font-medium animate-pulse`}>
          AI is thinking...
        </span>
        <div className="flex space-x-1 mt-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default ClassicLoader
