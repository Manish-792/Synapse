import React, { useState } from 'react'
import { gsap } from 'gsap'

const AnimatedBtn1 = ({ 
  children, 
  onClick, 
  disabled = false, 
  isLoading = false, 
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    if (disabled || isLoading) return
    
    // Create ripple effect
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Create ripple element
    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = '0'
    ripple.style.height = '0'
    ripple.style.borderRadius = '50%'
    ripple.style.background = 'rgba(255, 255, 255, 0.3)'
    ripple.style.transform = 'translate(-50%, -50%)'
    ripple.style.pointerEvents = 'none'
    
    button.appendChild(ripple)
    
    // Animate ripple
    gsap.to(ripple, {
      width: '300px',
      height: '300px',
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        ripple.remove()
      }
    })
    
    // Button animation
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
    
    if (onClick) onClick(e)
  }

  const handleMouseEnter = (e) => {
    setIsHovered(true)
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = (e) => {
    setIsHovered(false)
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent',
    ghost: 'text-purple-400 hover:bg-purple-500/10 bg-transparent'
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-4 text-base',
    lg: 'px-8 py-5 text-lg',
    xl: 'px-10 py-6 text-xl'
  }

  const disabledClasses = disabled || isLoading 
    ? 'opacity-50 cursor-not-allowed from-gray-600 to-gray-600 hover:from-gray-600 hover:to-gray-600' 
    : ''

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || isLoading}
      className={`
        relative overflow-hidden
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        font-semibold rounded-2xl
        transition-all duration-300
        transform-gpu
        focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${className}
      `}
      {...props}
    >
      {/* Background gradient animation */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 
        transition-opacity duration-300 
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2">
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Sending...</span>
          </>
        ) : (
          children
        )}
      </span>
      
      {/* Shine effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
        transform -skew-x-12 transition-transform duration-1000
        ${isHovered ? 'translate-x-full' : '-translate-x-full'}
      `} />
    </button>
  )
}

export default AnimatedBtn1
