import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
             content: "Synapse has completely transformed how we handle customer inquiries. The multi-step reasoning is incredible and the real-time tools integration saves us hours every day.",
      rating: 5,
      avatar: "👩‍💼",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "InnovateLab",
      content: "The real-time tools integration is a game-changer. I can get weather data, news, and calculations all in one conversation. The glassmorphism UI is absolutely stunning.",
      rating: 5,
      avatar: "👨‍💻",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Data Analyst",
      company: "DataFlow",
      content: "The glassmorphism UI is not just beautiful, it's intuitive. The whole experience feels premium and modern. The multi-step reasoning capabilities are impressive.",
      rating: 5,
      avatar: "👩‍🔬",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "CEO",
      company: "StartupXYZ",
             content: "We've seen a 300% increase in customer satisfaction since implementing Synapse. It's like having a genius assistant that never sleeps and always delivers.",
      rating: 5,
      avatar: "👨‍💼",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "UX Designer",
      company: "DesignStudio",
      content: "The animations and visual feedback make interactions feel natural and engaging. It's the future of AI interfaces. The attention to detail is remarkable.",
      rating: 5,
      avatar: "👩‍🎨",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Alex Martinez",
      role: "Research Scientist",
      company: "AI Research",
      content: "The multi-step reasoning capabilities are impressive. It can break down complex problems like a human expert would. This is exactly what we needed for our research.",
      rating: 5,
      avatar: "👨‍🔬",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const stats = [
    { label: "Active Users", value: "10K+", description: "Trusted by thousands" },
    { label: "Uptime", value: "99.9%", description: "Reliable performance" },
    { label: "User Rating", value: "4.9/5", description: "Excellent feedback" },
    { label: "Response Time", value: "<2s", description: "Lightning fast" }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
  }

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 leading-tight font-futuristic" style={{ lineHeight: '1.1', paddingBottom: '0.1em' }}>
          What Our Users Say
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover how our AI agent is transforming workflows across industries
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
                     <div key={index} className="group glass-effect border-white/20 p-6 rounded-lg text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/30">
            <div className="text-3xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
            <div className="text-white font-medium mb-1 group-hover:text-purple-300 transition-colors duration-300">{stat.label}</div>
            <div className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Testimonials Carousel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Main Testimonial Card */}
                 <Card className="group glass-effect border-white/20 p-8 md:p-12 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-xl"></div>
          <CardContent className="text-center">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            {/* Testimonial Content */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed italic">
              "{currentTestimonial.content}"
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                {currentTestimonial.avatar}
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">{currentTestimonial.name}</div>
                <div className="text-gray-400 text-sm">
                  {currentTestimonial.role} at {currentTestimonial.company}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center space-x-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Button
          onClick={prevTestimonial}
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-effect border-white/20 hover:bg-white/10 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          onClick={nextTestimonial}
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-effect border-white/20 hover:bg-white/10 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-purple-500' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Additional Testimonials Grid */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold text-white text-center mb-12">
          More Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
                         <Card key={testimonial.id} className="group glass-effect border-white/20 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic">
                  "{testimonial.content.length > 120 
                    ? testimonial.content.substring(0, 120) + '...' 
                    : testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsCarousel
