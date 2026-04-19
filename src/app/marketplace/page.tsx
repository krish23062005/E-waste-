"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ShoppingBag, ShieldCheck, X, Trash2 } from "lucide-react";
import { IInventory } from "@/models/Inventory";

export default function Marketplace() {
  const [metals, setMetals] = useState<IInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<IInventory[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory");
        if (response.ok) {
          const data = await response.json();
          setMetals(data);
        }
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleAddToCart = (metal: IInventory) => {
    if (!cart.some(item => item.id === metal.id)) {
      setCart([...cart, metal]);
    }
  };

  const handleCheckout = async () => {
    if (!buyerName || !buyerEmail || cart.length === 0) return;
    setCheckoutLoading(true);

    try {
      for (const item of cart) {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerName,
            buyerEmail,
            companyName: companyName || "N/A",
            metalId: item.id,
            quantityKg: 1,
          }),
        });
      }
      setCheckoutSuccess(true);
      setCart([]);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const filteredMetals = metals.filter(m => 
    m.metalName.toLowerCase().includes(search.toLowerCase()) || 
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-medium">
            <ShieldCheck size={14} />
            <span>Verified Buyers Only</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Metal Marketplace</h1>
          <p className="text-white/60 max-w-xl">Purchase 100% recycled, high-purity metals recovered directly from e-waste. Bulk purchases restricted to 1kg sample size for unverified accounts.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 w-full md:w-auto"
        >
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              id="input-marketplace-search"
              type="text" 
              placeholder="Search metals..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-colors"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Filter size={20} />
          </button>
          <button 
            id="btn-open-cart"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-primary transition-colors"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-black text-xs font-bold rounded-full border-2 border-black">
                {cart.length}
              </span>
            )}
          </button>
        </motion.div>
      </div>

      {/* Grid — NO layout prop to avoid layout thrash on every search keystroke */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
             Array.from({length: 6}).map((_, i) => (
                <motion.div 
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-card h-64 animate-pulse flex flex-col justify-between"
                >
                  <div className="w-1/3 h-6 bg-white/10 rounded" />
                  <div className="w-2/3 h-8 bg-white/10 rounded" />
                  <div className="w-full h-12 bg-white/5 rounded mt-4" />
                </motion.div>
             ))
          ) : filteredMetals.map((metal, index) => (
            <motion.div
              key={metal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="glass-card flex flex-col group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  metal.category === 'Precious' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' : 
                  metal.category === 'Rare' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 
                  'border-blue-500/30 text-blue-400 bg-blue-500/10'
                }`}>
                  {metal.category}
                </span>
                <span className="text-white/50 text-sm font-medium">Stock: {metal.quantityKg} kg</span>
              </div>

              <h2 className="text-xl font-bold mb-1">{metal.metalName}</h2>
              <p className="text-3xl font-black text-white mb-6">
                ${metal.pricePerKg.toLocaleString()} <span className="text-base text-white/50 font-normal">/ kg</span>
              </p>

              <div className="mt-auto space-y-3">
                <div className="flex justify-between text-sm border-t border-white/10 pt-4 mb-4">
                  <span className="text-white/60">Max Purchase</span>
                  <span className="font-bold">1.0 kg</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href={`/marketplace/${metal.id}`}
                    className="flex-1 py-3 rounded-xl glass text-white text-center font-semibold hover:bg-white/10 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToCart(metal)}
                    disabled={cart.some(c => c.id === metal.id)}
                    className="flex-1 py-3 rounded-xl bg-primary text-black font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:bg-white/10 disabled:text-white flex items-center justify-center gap-2 active:scale-[0.98] text-sm"
                  >
                    <ShoppingBag size={18} />
                    {cart.some(c => c.id === metal.id) ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && filteredMetals.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center">
          <div className="p-4 rounded-full bg-white/5 mb-4 text-white/40">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">No metals found</h3>
          <p className="text-white/50">Try adjusting your search filters.</p>
        </div>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-black/80 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingBag /> Your Cart
                </h2>
                <button 
                  id="btn-close-cart"
                  onClick={() => setIsCartOpen(false)} 
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {checkoutSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                  <p className="text-white/60 mb-6">Your 1kg bulk sample requests have been successfully submitted to the warehouse.</p>
                  <button 
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center">
                  <ShoppingBag size={48} className="text-white/20 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Cart is empty</h3>
                  <p className="text-white/50">Add some metals to request a sample.</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div>
                          <h4 className="font-bold text-sm mb-1">{item.metalName}</h4>
                          <p className="text-white/60 text-xs">1 kg @ ${(item.pricePerKg || 0).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold">${(item.pricePerKg || 0).toLocaleString()}</span>
                          <button 
                            onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                            className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${cart.reduce((sum, item) => sum + (item.pricePerKg || 0), 0).toLocaleString()}</span>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <input 
                        id="input-buyer-name"
                        type="text" 
                        placeholder="Your Name (Required)" 
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-white"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address (Required)" 
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-white"
                      />
                      <input 
                        type="text" 
                        placeholder="Company Name (Optional)" 
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary/50 text-white"
                      />
                    </div>

                    <button 
                      id="btn-confirm-purchase"
                      onClick={handleCheckout}
                      disabled={checkoutLoading || !buyerName || !buyerEmail}
                      className="w-full py-4 rounded-xl bg-primary text-black font-bold flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                      {checkoutLoading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Confirm Purchase Request"
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
