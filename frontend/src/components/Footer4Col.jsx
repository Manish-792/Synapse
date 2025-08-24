import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Zap, 
  Shield, 
  Users,
  Heart,
  ArrowUp
} from 'lucide-react'

const Footer4Col = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Synapse",
      description: "Experience the future of AI interaction with our advanced multi-step reasoning agent.",
      links: [
        { name: "About Us", href: "#" },
        { name: "Features", href: "#" },
        { name: "Pricing", href: "/pricing" },
        { name: "Testimonials", href: "/testimonials" }
      ]
    },
    {
      title: "Product",
      links: [
        { name: "Chat Interface", href: "/chat" },
        { name: "API Documentation", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Roadmap", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Status Page", href: "#" },
        { name: "Bug Report", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/Manish-792" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/manish-singh-a8446227b/" },
    { name: "Email", icon: Mail, href: "mailto:contact@aiagent.com" }
  ]

  const features = [
    { icon: MessageCircle, title: "Multi-step Reasoning", description: "Advanced AI that thinks through complex problems" },
    { icon: Zap, title: "Real-time Tools", description: "Access weather, news, and calculations instantly" },
    { icon: Shield, title: "Secure & Private", description: "Your conversations are protected and private" },
    { icon: Users, title: "Community Driven", description: "Built with feedback from thousands of users" }
  ]

  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top Section with Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="glass-effect border-white/10 rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Get the latest updates on new features, AI improvements, and exclusive insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                {section.description && (
                  <p className="text-gray-400 text-sm mb-4">{section.description}</p>
                )}
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>© {currentYear} Synapse. Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>for the future of AI.</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-110"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer4Col
