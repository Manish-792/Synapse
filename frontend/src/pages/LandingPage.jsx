import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { gsap } from 'gsap'

const LandingPage = () => {
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const ctaRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    // GSAP animations for landing section - start after preloader
    const tl = gsap.timeline({ delay: 0.2 })
    
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

    // Parallax scrolling effects
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.15  // Reduced from -0.5
      const rate2 = scrolled * -0.1  // Reduced from -0.3
      const rate3 = scrolled * -0.2  // Reduced from -0.7
      const rate4 = scrolled * -0.05 // Reduced from -0.2
      
      // Parallax background elements
      gsap.set('.parallax-bg-1', { y: rate })
      gsap.set('.parallax-bg-2', { y: rate2 })
      gsap.set('.parallax-bg-3', { y: rate3 })
      gsap.set('.parallax-bg-4', { y: rate4 })
      
      // Parallax content elements - much more subtle
      gsap.set('.parallax-content', { y: scrolled * 0.02 }) // Reduced from 0.1
      
      // Rotate elements on scroll - more subtle
      gsap.set('.rotate-on-scroll', { rotation: scrolled * 0.02 }) // Reduced from 0.1
      
      // Scale elements on scroll - more subtle
      const scale = 1 + (scrolled * 0.00005) // Reduced from 0.0001
      gsap.set('.scale-on-scroll', { scale: Math.max(0.95, scale) }) // Increased minimum scale
    }

    window.addEventListener('scroll', handleScroll)

    // Features section animation on scroll
    const featuresObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target.children, {
            y: 50,
            opacity: 0,
            scale: 0.9
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.2
          })
          featuresObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })

    if (featuresRef.current) {
      featuresObserver.observe(featuresRef.current)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      featuresObserver.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src='https://my.spline.design/nexbotrobotcharacterconcept-LGTELxut85NKHQ0kbRSCLKiC/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="opacity-30"
            title="3D Robot Character"
          ></iframe>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="parallax-bg-1 absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float rotate-on-scroll"></div>
          <div className="parallax-bg-2 absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="parallax-bg-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          {/* Additional parallax elements */}
          <div className="parallax-bg-4 absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
          <div className="parallax-bg-1 absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Floating particles with parallax */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`parallax-bg-${(i % 4) + 1} absolute w-2 h-2 bg-purple-400/30 rounded-full animate-float rotate-on-scroll`}
              style={{
                left: `${5 + i * 8}%`,
                top: `${15 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + i * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="parallax-content relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
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
          
          <div ref={ctaRef} className="space-y-6">
             <Link to="/chat">
               <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-xl overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 mb-8">
                 {/* Glow effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                 
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                 
                 {/* Button content */}
                 <span className="relative z-10 flex items-center space-x-2">
                   <span>Start Chatting Now</span>
                   <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                 </span>
                 
                 {/* Border glow */}
                 <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                 <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600"></div>
               </button>
             </Link>
            
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
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Parallax background for features */}
        <div className="absolute inset-0 z-0">
          <div className="parallax-bg-2 absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="parallax-bg-3 absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-pink-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
          <div className="parallax-bg-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16 parallax-content">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4 scale-on-scroll">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300">
              Discover what makes Synapse truly exceptional
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group glass-effect border-white/20 relative transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🧠</div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors duration-300">Multi-step Reasoning</CardTitle>
                <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  The AI breaks down complex problems into logical steps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group glass-effect border-white/20 relative transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🛠️</div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors duration-300">Real-time Tools</CardTitle>
                <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Access weather, news, calculations, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group glass-effect border-white/20 relative transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <CardHeader>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <CardTitle className="text-white group-hover:text-purple-300 transition-colors duration-300">Instant Responses</CardTitle>
                <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Get intelligent answers with beautiful animations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
