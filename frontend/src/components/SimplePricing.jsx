import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star } from 'lucide-react'

const SimplePricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      features: [
        "50 requests per day",
        "Basic AI responses",
        "Standard tools access",
        "Community support"
      ],
      popular: false,
      cta: "Get Started Free",
      variant: "outline"
    },
    {
      name: "Pro",
      description: "For power users and teams",
      price: { monthly: 29, annual: 290 },
      features: [
        "1000 requests per day",
        "Advanced AI reasoning",
        "All tools access",
        "Priority support",
        "Custom integrations",
        "Analytics dashboard"
      ],
      popular: true,
      cta: "Start Pro Trial",
      variant: "default"
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: { monthly: 99, annual: 990 },
      features: [
        "Unlimited requests",
        "Custom AI models",
        "White-label solution",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
        "Custom integrations"
      ],
      popular: false,
      cta: "Contact Sales",
      variant: "outline"
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 leading-tight font-futuristic" style={{ lineHeight: '1.1', paddingBottom: '0.1em' }}>
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Choose the perfect plan for your AI interaction needs
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-purple-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
            Annual
            <span className="ml-1 text-xs text-green-400">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
                     <Card 
             key={index} 
             className={`group glass-effect border-white/20 relative transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-purple-500/30 ${
               plan.popular ? 'border-purple-500/50 scale-105 hover:scale-110' : 'hover:scale-105'
             }`}
           >

            
            
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader className="text-center pb-6 relative z-10">
              <CardTitle className="text-2xl text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{plan.name}</CardTitle>
              <CardDescription className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                {plan.description}
              </CardDescription>
              <div className="mb-2">
                <span className="text-4xl font-bold gradient-text">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly > 0 && (
                  <span className="text-gray-400 ml-1">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                )}
              </div>
              {plan.price.monthly === 0 && (
                <span className="text-sm text-gray-400">Forever free</span>
              )}
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
                             <Button 
                 className="w-full transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50" 
                 variant={plan.variant}
                 size="lg"
               >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                     <div className="text-left group p-6 rounded-xl glass-effect border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
             <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
               Can I change plans anytime?
             </h4>
             <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
               Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
             </p>
           </div>
                       <div className="text-left group p-6 rounded-xl glass-effect border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
                       <div className="text-left group p-6 rounded-xl glass-effect border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                Is there a free trial?
              </h4>
              <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
                                              <div className="text-left group p-6 rounded-xl glass-effect border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
               <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                 Do you offer refunds?
               </h4>
               <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                 We offer a 30-day money-back guarantee for all paid plans.
               </p>
             </div>
        </div>
      </div>
    </div>
  )
}

export default SimplePricing
