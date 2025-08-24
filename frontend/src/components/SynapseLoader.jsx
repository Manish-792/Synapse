import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SynapseLogo from './SynapseLogo'

const SynapseLoader = ({ isLoading = true, onComplete }) => {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const pulseRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!isLoading) return

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    // Initial setup
    gsap.set([logoRef.current, pulseRef.current, textRef.current], { 
      opacity: 0, 
      scale: 0.8 
    })

    // Logo entrance
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    })

    // Pulse effect
    tl.to(pulseRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")

    // Text entrance
    tl.to(textRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")

    // Continuous pulse animation
    tl.to(pulseRef.current, {
      scale: 1.2,
      opacity: 0.3,
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    }, "-=0.2")

    // Logo subtle pulse
    tl.to(logoRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    }, "-=1.5")

    // Text glow effect
    tl.to(textRef.current, {
      textShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    }, "-=1.5")

    return () => {
      tl.kill()
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50"
    >
      <div className="relative flex flex-col items-center space-y-8">
        {/* Pulse ring */}
        <div 
          ref={pulseRef}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
        />
        
        {/* Logo */}
        <div ref={logoRef} className="relative z-10">
          <SynapseLogo size="xl" />
        </div>
        
                 {/* Loading text */}
         <div ref={textRef} className="text-center">
           <h2 className="text-2xl font-bold gradient-text mb-2 font-futuristic">
             Synapse
           </h2>
           <p className="text-gray-400 text-sm font-tech">
             Initializing AI Agent...
           </p>
         </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SynapseLoader
