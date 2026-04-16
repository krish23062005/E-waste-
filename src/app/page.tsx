"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Cpu, Layers, Link as LinkIcon, Database, Leaf, Search, ArrowDownToLine, Zap, Globe } from "lucide-react";
import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1   // was 0.2 — halves total animation time
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center -mt-16 pt-16">
        {/* Background elements — GPU-promoted with will-change */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-decor"
            style={{ filter: "blur(80px)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-decor"
            style={{ filter: "blur(80px)" }}
          />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 text-primary mb-8 text-sm font-medium"
          >
            <Leaf size={16} />
            <span>Sustainable Tech Revolution</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
          >
            Transforming E-Waste into <br />
            <span className="text-gradient">Valuable Resources</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl text-white/70 max-w-2xl mb-12"
          >
            An AI-powered platform managing the collection, smart segregation, storage, and marketplace selling of precious metals recovered from electronic waste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-primary text-black font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group">
              Start Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/marketplace" className="px-8 py-4 rounded-xl glass hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              Explore Marketplace
            </Link>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="glass-card flex flex-col items-center text-center">
              <span className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={12500} suffix="+" />
              </span>
              <span className="text-white/60 text-sm">Kg E-Waste Collected</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="glass-card flex flex-col items-center text-center">
              <span className="text-4xl font-bold text-primary mb-2">
                <AnimatedCounter value={8400} suffix="kg" />
              </span>
              <span className="text-white/60 text-sm">Metals Recovered</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="glass-card flex flex-col items-center text-center">
              <span className="text-4xl font-bold text-cyan-400 mb-2">
                <AnimatedCounter value={42} suffix="k" prefix="$" />
              </span>
              <span className="text-white/60 text-sm">Value Generated</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative" id="how-it-works">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How The System Works</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Our automated pipeline ensures maximum recovery and transparency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: "Collection", icon: ArrowDownToLine, desc: "E-waste arrives" },
              { title: "Screening", icon: Search, desc: "AI visual inspection" },
              { title: "Segregation", icon: Layers, desc: "Automated routing" },
              { title: "Storage", icon: Database, desc: "Categorized inventory" },
              { title: "Marketplace", icon: Globe, desc: "Sold to buyers" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card relative group"
              >
                <div className="absolute top-4 right-4 text-white/10 font-black text-4xl group-hover:text-primary/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-primary/50 to-transparent -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Segregation Visualizer */}
      <section className="py-24 bg-black/50 border-y border-white/5 relative overflow-hidden">
        {/* GPU-promoted decorative blur */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full -z-10 blur-decor"
          style={{ background: "rgba(16,185,129,0.05)", filter: "blur(100px)" }}
        />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Smart AI Segregation</h2>
              <p className="text-lg text-white/60 mb-8">
                The core of EcoMetal is our intelligent sorting system. When an item enters, AI determines its metallic composition. Known metals are routed instantly.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 mt-1">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Dynamic Routing</h4>
                    <p className="text-white/50">Iron, Copper, Aluminum, and Precious metals are stored in existing warehouse grids.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded bg-blue-500/10 text-blue-400 mt-1">
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Auto-Category Creation</h4>
                    <p className="text-white/50">If a new alloy or unknown metal arrives, the system automatically creates a new storage category.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Simulated UI element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass p-8 rounded-3xl relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    <span className="font-medium">Copper Wire</span>
                  </div>
                  <span className="text-sm font-mono text-white/50">MATCHED → BIN 4</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <span className="font-medium">Aluminum Heat Sink</span>
                  </div>
                  <span className="text-sm font-mono text-white/50">MATCHED → BIN 2</span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-between items-center bg-primary/10 p-4 rounded-xl border border-primary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                    <span className="font-medium text-primary">Tantalum Capacitor</span>
                  </div>
                  <span className="text-sm font-mono text-primary">NEW CAT → BIN 9</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Component */}
      <section className="py-24" id="impact">
        <div className="container mx-auto px-4 text-center">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
           >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Environmental Impact</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Every transaction reduces the burden on landfills and traditional mining.</p>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { val: 4200, label: "Tons of CO2 Saved", color: "from-emerald-500 to-emerald-300" },
               { val: 15, label: "MWh Energy Conserved", color: "from-blue-500 to-cyan-300" },
               { val: 890, label: "Kg Toxins Neutralized", color: "from-purple-500 to-pink-300" },
               { val: 120, label: "Acres Land Protected", color: "from-orange-500 to-amber-300" },
             ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-card relative overflow-hidden"
                >
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${stat.color} -z-10`} />
                  <h4 className="text-4xl font-black mb-2">
                    <AnimatedCounter value={stat.val} />
                  </h4>
                  <p className="text-sm font-medium text-white/70">{stat.label}</p>
                </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 bg-black/40 border-t border-white/5" id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-white/60">The minds behind EcoMetal platform.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {/* Krish */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="glass p-8 rounded-3xl w-full max-w-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-full bg-white/10 mb-6 flex items-center justify-center text-2xl font-bold">
                KP
              </div>
              <h3 className="text-2xl font-bold">Krish Patel</h3>
              <p className="text-primary font-medium mb-4">Frontend & Database Specialist</p>
              
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex gap-2.5">
                  <Cpu size={18} className="text-white" />
                  <span>Frontend Development</span>
                </div>
                <div className="flex gap-2.5">
                  <Database size={18} className="text-white" />
                  <span>Database Management</span>
                </div>
                <div className="flex gap-2.5">
                  <LinkIcon size={18} className="text-white" />
                  <span>Backend Integration</span>
                </div>
              </div>
            </motion.div>

            {/* Meet */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="glass p-8 rounded-3xl w-full max-w-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-full bg-white/10 mb-6 flex items-center justify-center text-2xl font-bold">
                MS
              </div>
              <h3 className="text-2xl font-bold">Meet Shah</h3>
              <p className="text-blue-400 font-medium mb-4">Product & Sales Manager</p>
              
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex gap-2.5">
                  <Search size={18} className="text-white" />
                  <span>Product Vision</span>
                </div>
                <div className="flex gap-2.5">
                  <Globe size={18} className="text-white" />
                  <span>Sales Strategy</span>
                </div>
                <div className="flex gap-2.5">
                  <Layers size={18} className="text-white" />
                  <span>Software Development Lifecycle</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
