"use client";

import { motion } from "framer-motion";
import { Check, X, Shield, Zap, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Basic Access",
      price: "Free",
      description: "For researchers and small-scale sample buyers.",
      features: [
        "Access to Marketplace",
        "1kg maximum purchase per metal",
        "Standard support",
        "Public inventory visibility",
      ],
      notIncluded: [
        "Bulk purchasing",
        "API access to inventory",
        "Dedicated account manager",
      ],
      buttonText: "Start Exploring",
      href: "/marketplace",
      popular: false,
    },
    {
      name: "Verified Buyer",
      price: "$499",
      period: "/month",
      description: "For industrial manufacturers and bulk purchasers.",
      features: [
        "Unlimited bulk purchasing",
        "Priority shipping & logistics",
        "Certificates of Purity (CoP)",
        "Real-time inventory API access",
        "Dedicated account manager",
      ],
      notIncluded: [],
      buttonText: "Apply for Verification",
      href: "/contact",
      popular: true,
    },
    {
      name: "Enterprise Partner",
      price: "Custom",
      description: "For long-term supply chain integration.",
      features: [
        "Guaranteed monthly supply contracts",
        "White-glove logistics routing",
        "Custom alloy requests",
        "Sustainability impact reporting",
        "On-premise integration support",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      href: "/contact",
      popular: false,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium"
        >
          <Zap size={16} />
          <span>Transparent Pricing</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Plans tailored for your <span className="text-gradient">supply chain</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/60"
        >
          Whether you need a small sample for R&D or reliable metric tons for mass production, we have you covered.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (index * 0.1) }}
            className={`glass-card relative flex flex-col ${plan.popular ? 'border-primary shadow-lg shadow-primary/10 scale-105 z-10' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black font-bold text-xs uppercase tracking-wider py-1 px-4 rounded-full">
                Most Popular
              </div>
            )}
            
            <div className="mb-8 border-b border-white/10 pb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-white/60 h-12">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className="text-white/60 font-medium">{plan.period}</span>}
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/20 text-primary shrink-0">
                    <Check size={14} />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
              {plan.notIncluded.map(feature => (
                <li key={feature} className="flex items-start gap-3 opacity-50">
                  <div className="p-1 rounded-full bg-white/10 text-white shrink-0">
                    <X size={14} />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href={plan.href}
              className={`w-full py-4 rounded-xl font-bold flex text-center justify-center items-center transition-all ${
                plan.popular 
                  ? 'bg-primary text-black hover:bg-primary/90' 
                  : 'glass hover:bg-white/10'
              }`}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-24 pt-12 border-t border-white/10 max-w-4xl mx-auto text-center"
      >
        <p className="text-white/40 mb-8 uppercase tracking-widest text-sm font-semibold">Enterprise-Grade Reliability</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Shield className="text-primary mb-3" size={32} />
            <h4 className="font-bold mb-1">100% Purity Guarantee</h4>
            <p className="text-sm text-white/50">All metals undergo spectrometer testing.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Database className="text-blue-400 mb-3" size={32} />
            <h4 className="font-bold mb-1">Real-Time Allocation</h4>
            <p className="text-sm text-white/50">Live inventory syncing prevents overselling.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Globe className="text-emerald-400 mb-3" size={32} />
            <h4 className="font-bold mb-1">Global Shipping</h4>
            <p className="text-sm text-white/50">Carbon-neutral delivery worldwide.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
