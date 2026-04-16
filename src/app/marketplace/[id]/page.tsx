"use client";

import { useEffect, useState, use } from "react";
import { ArrowLeft, ShieldCheck, Thermometer, Zap, Layers, Globe, X, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IInventory } from "@/models/Inventory";

export default function MetalDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [metal, setMetal] = useState<IInventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/inventory/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMetal(data);
        }
      } catch (error) {
        console.error("Failed to fetch metal detail", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!metal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold mb-4">Metal Not Found</h1>
        <Link href="/marketplace" className="text-primary hover:underline">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-12 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Visualizer/Display */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card aspect-square flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10" />
          <div className="flex flex-col items-center">
             {/* Animated representation */}
             <motion.div 
               animate={{ 
                 scale: [1, 1.05, 1],
                 rotate: [0, 5, 0]
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-48 h-48 rounded-full bg-primary/20 blur-2xl absolute"
             />
             <Layers size={120} className="text-primary relative" />
             <h2 className="text-3xl font-black mt-8 tracking-wider uppercase">{metal.metalName}</h2>
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold">
              {metal.category} Grade
            </span>
            <span className="flex items-center gap-1 text-white/50 text-sm">
              <ShieldCheck size={16} className="text-emerald-400" />
              Verified Authenticity
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">{metal.metalName}</h1>
          <p className="text-xl text-white/60 mb-8 leading-relaxed">
            High-purity industrial grade {metal.metalName.toLowerCase()} recovered using our proprietary AI segregation system. 
            Optimized for immediate manufacturing integration.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/40 text-sm mb-1 uppercase tracking-wider">Current Price</p>
                <p className="text-3xl font-bold">${metal.pricePerKg.toLocaleString()} / kg</p>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/40 text-sm mb-1 uppercase tracking-wider">Available Stock</p>
                <p className="text-3xl font-bold">{metal.quantityKg} kg</p>
             </div>
          </div>

          <div className="space-y-6 mb-12">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 text-primary rounded-lg"><Zap size={20} /></div>
                   <span className="font-bold">Purity Level</span>
                </div>
                <span className="text-primary font-black">{metal.purity}%</span>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Globe size={20} /></div>
                   <span className="font-bold">Extraction Location</span>
                </div>
                <span className="text-white/70">EcoMetal HQ - Bin {Math.floor(Math.random() * 10) + 1}</span>
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg"><Thermometer size={20} /></div>
                   <span className="font-bold">Processing Status</span>
                </div>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">{metal.status}</span>
             </div>
          </div>

          <button 
            onClick={() => setIsOrderModalOpen(true)}
            className="block w-full py-5 bg-white text-black text-center font-black text-lg rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98]"
          >
            Request Sample Purchase
          </button>

          <AnimatePresence>
            {isOrderModalOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsOrderModalOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl z-[70] shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Purchase Request</h2>
                    <button onClick={() => setIsOrderModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  {orderSuccess ? (
                    <div className="py-8 text-center">
                      <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Request Processed!</h3>
                      <p className="text-white/60 mb-8">Your sample purchase request has been recorded. Our team will verify the payment and initialize extraction.</p>
                      <button 
                        onClick={() => {
                          setIsOrderModalOpen(false);
                          setOrderSuccess(false);
                        }}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      setOrderSubmitting(true);
                      try {
                        const response = await fetch("/api/orders", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            buyerName,
                            buyerEmail,
                            companyName: companyName || "N/A",
                            metalId: metal.id,
                            quantityKg: 1,
                          }),
                        });
                        if (response.ok) {
                          setOrderSuccess(true);
                        }
                      } catch (error) {
                        console.error("Order failed:", error);
                      } finally {
                        setOrderSubmitting(false);
                      }
                    }} className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-4">
                         <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/40 uppercase">Product</span>
                            <span className="font-bold">{metal.metalName}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-white/40 uppercase">Sample Size</span>
                            <span className="font-bold">1.0 kg</span>
                         </div>
                         <div className="flex justify-between text-lg mt-3 pt-3 border-t border-white/10">
                            <span className="font-bold">Total Price</span>
                            <span className="text-primary font-black">${metal.pricePerKg.toLocaleString()}</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                        <input 
                          required 
                          placeholder="Your Full Name" 
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-white" 
                        />
                        <input 
                          required 
                          type="email" 
                          placeholder="Email Address" 
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-white" 
                        />
                        <input 
                          placeholder="Company (Optional)" 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 text-white" 
                        />
                      </div>

                      <button 
                        disabled={orderSubmitting}
                        className="w-full py-4 bg-primary text-black font-black rounded-xl hover:bg-primary/90 transition-all mt-6 flex items-center justify-center gap-2"
                      >
                        {orderSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Confirm & Authorize"}
                      </button>
                      <p className="text-[10px] text-center text-white/40 mt-4 px-4 font-medium uppercase tracking-widest">
                        Purchase authorized by EcoMetal smart segregation protocols
                      </p>
                    </form>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
