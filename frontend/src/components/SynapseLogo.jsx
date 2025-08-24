import React from 'react'

const SynapseLogo = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main lightning bolt */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full"
        >
          {/* Lightning bolt with gradient */}
          <path 
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
            fill="url(#lightningGradient)"
            className="animate-pulse"
          />
          
          {/* Neural network dots */}
          <circle cx="6" cy="6" r="1" fill="#8B5CF6" className="animate-ping" style={{ animationDelay: '0s' }} />
          <circle cx="18" cy="6" r="1" fill="#3B82F6" className="animate-ping" style={{ animationDelay: '0.2s' }} />
          <circle cx="6" cy="18" r="1" fill="#8B5CF6" className="animate-ping" style={{ animationDelay: '0.4s' }} />
          <circle cx="18" cy="18" r="1" fill="#3B82F6" className="animate-ping" style={{ animationDelay: '0.6s' }} />
          <circle cx="12" cy="12" r="1" fill="#EC4899" className="animate-ping" style={{ animationDelay: '0.8s' }} />
          
          {/* Connection lines */}
          <path d="M6 6L12 12" stroke="url(#connectionGradient)" strokeWidth="0.5" opacity="0.6" />
          <path d="M18 6L12 12" stroke="url(#connectionGradient)" strokeWidth="0.5" opacity="0.6" />
          <path d="M6 18L12 12" stroke="url(#connectionGradient)" strokeWidth="0.5" opacity="0.6" />
          <path d="M18 18L12 12" stroke="url(#connectionGradient)" strokeWidth="0.5" opacity="0.6" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-sm animate-pulse"></div>
    </div>
  )
}

export default SynapseLogo
