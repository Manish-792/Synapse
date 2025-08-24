import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import Navbar from './components/Navbar'
import Footer4Col from './components/Footer4Col'
import SynapseLoader from './components/SynapseLoader'
import LandingPage from './pages/LandingPage'
import ChatPage from './pages/ChatPage'
import PricingPage from './pages/PricingPage'
import TestimonialsPage from './pages/TestimonialsPage'

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background with parallax effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Content */}
      <div className="relative z-10 pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </div>
      
      {/* Footer - Only show on home page */}
      {isHomePage && <Footer4Col />}
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize GSAP
    gsap.set("body", { opacity: 0 })
    gsap.to("body", { opacity: 1, duration: 1, ease: "power2.out" })

    // Simulate loading time (you can adjust this or make it real)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <Router>
      <SynapseLoader isLoading={isLoading} onComplete={handleLoaderComplete} />
      <AppContent />
    </Router>
  )
}

export default App
