"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      inquiry: formData.get('inquiry'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        console.error('Failed to submit form');
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('idle');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 overflow-hidden relative">
      {/* Background flare */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Side: Info */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 mb-6 text-sm font-medium">
            <MessageSquare size={16} />
            <span>Get in touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Let's build a sustainable <span className="text-gradient">future.</span>
          </h1>
          <p className="text-lg text-white/60 mb-12 max-w-md">
            Interested in bulk purchasing, enterprise integration, or just want to learn more about our AI segregation process? Reach out to our team.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Email Us</h3>
                <p className="text-white/50 mb-1">Our friendly team is here to help.</p>
                <a href="mailto:hello@ecometal.dev" className="text-primary hover:underline font-medium">hello@ecometal.dev</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Visit Us</h3>
                <p className="text-white/50 mb-1">Come say hello at our HQ.</p>
                <p className="text-white font-medium">100 Innovation Way<br />San Francisco, CA 94105</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Call Us</h3>
                <p className="text-white/50 mb-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+15550000000" className="text-primary hover:underline font-medium">+1 (555) 000-0000</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 md:p-10 relative overflow-hidden">
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-3">Message Sent!</h3>
                <p className="text-white/60 mb-8 max-w-sm">
                  We've received your inquiry and will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-white/80">First Name</label>
                    <input 
                      required
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-white/80">Last Name</label>
                    <input 
                      required
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Work Email</label>
                  <input 
                    required
                    type="email" 
                    id="email" 
                    name="email"
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="inquiry" className="text-sm font-medium text-white/80">Inquiry Type</label>
                  <select 
                    id="inquiry" 
                    name="inquiry"
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/5 transition-all appearance-none text-white/90"
                  >
                    <option value="buyer">Apply as Verified Buyer</option>
                    <option value="seller">E-Waste Disposal Partner</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                  <textarea 
                    required
                    id="message" 
                    name="message"
                    rows={4}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/5 transition-all resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button 
                  id="btn-contact-submit"
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 rounded-xl font-bold flex text-center justify-center items-center bg-primary text-black hover:bg-primary/90 transition-all mt-2 group"
                >
                  {formStatus === 'submitting' ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
