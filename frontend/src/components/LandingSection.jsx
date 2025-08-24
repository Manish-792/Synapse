import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LandingSection = () => {
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // GSAP animations for landing section
    const tl = gsap.timeline({ delay: 0.8 })
    
    // Initial setup - hide elements
    gsap.set([headingRef.current, subheadingRef.current, ctaRef.current], {
      opacity: 0,
      y: 60,
      scale: 0.9
    })
    
    // Heading animation with dramatic entrance
    tl.fromTo(headingRef.current, 
      { 
        y: 80, 
        opacity: 0, 
        scale: 0.8,
        rotationX: -15
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotationX: 0,
        duration: 1.2, 
        ease: "back.out(1.7)",
        clearProps: "rotationX"
      }
    )
    
    // Subheading animation with staggered text reveal
    .fromTo(subheadingRef.current,
      { 
        y: 40, 
        opacity: 0,
        scale: 0.95
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1, 
        ease: "power2.out" 
      },
      "-=0.6"
    )
    
    // CTA button animation with bounce effect
    .fromTo(ctaRef.current,
      { 
        y: 30, 
        opacity: 0, 
        scale: 0.8,
        rotationY: -10
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotationY: 0,
        duration: 0.8, 
        ease: "back.out(1.7)",
        clearProps: "rotationY"
      },
      "-=0.4"
    )
    
    // Add subtle floating animation to the entire content
    .to([headingRef.current, subheadingRef.current, ctaRef.current], {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2
    }, "-=0.5")

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = document.querySelector('.parallax-bg')
      if (parallax) {
        const speed = scrolled * 0.5
        gsap.set(parallax, { y: speed })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToChat = () => {
    document.querySelector('#chat-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
             {/* Parallax background elements */}
       <div className="parallax-bg absolute inset-0">
         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
         
         {/* Animated particles */}
         {[...Array(8)].map((_, i) => (
           <div
             key={i}
             className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float"
             style={{
               left: `${10 + i * 12}%`,
               top: `${20 + (i % 3) * 25}%`,
               animationDelay: `${i * 0.3}s`,
               animationDuration: `${4 + i * 0.5}s`
             }}
           />
         ))}
         
         {/* Glowing orbs */}
         <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
         <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
         <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-pink-400/40 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
       </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={headingRef}
          className="text-6xl md:text-8xl font-bold mb-6 gradient-text font-futuristic"
          style={{ lineHeight: '1.1', paddingBottom: '0.1em' }}
        >
          Meet Synapse
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-modern"
        >
          Experience the future of AI interaction with Synapse, our advanced multi-step reasoning agent. 
          Ask complex questions, get intelligent responses, and watch as it thinks through problems step by step.
        </p>
        
        <div ref={ctaRef} className="space-y-4">
          <button
            onClick={scrollToChat}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 glow hover:shadow-2xl"
          >
            Start Chatting Now
          </button>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Multi-step Reasoning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Real-time Tools</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Glassmorphism UI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default LandingSection
