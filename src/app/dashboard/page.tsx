"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { PackageSearch, TrendingUp, AlertTriangle, Database, Plus, X, Loader2, ShoppingBag, Clock, CheckCircle } from "lucide-react";
import { IInventory } from "@/models/Inventory";
import { IOrder } from "@/models/Order";

export default function Dashboard() {
  const [inventory, setInventory] = useState<IInventory[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      }
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchInventory();
    fetchOrders();

    const interval = setInterval(() => {
       fetchInventory();
       fetchOrders();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCollectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      metalName: formData.get('metalName'),
      category: formData.get('category'),
      quantityKg: parseFloat(formData.get('quantityKg') as string),
      pricePerKg: parseFloat(formData.get('pricePerKg') as string),
      purity: parseFloat(formData.get('purity') as string),
      status: 'In Stock'
    };

    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchInventory();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Failed to record collection", error);
    } finally {
      setSubmitting(false);
    }
  };

  const totalCapacity = 5000;
  const currentTotal = inventory.reduce((acc, item) => acc + item.quantityKg, 0);
  const capacityPercentage = Math.min(100, (currentTotal / totalCapacity) * 100);

  const baseTotal = inventory
    .filter(item => item.category === 'Base')
    .reduce((acc, item) => acc + item.quantityKg, 0);

  const preciousTotal = inventory
    .filter(item => item.category === 'Precious')
    .reduce((acc, item) => acc + item.quantityKg, 0);

  const chartData = inventory.map(item => ({
    name: item.metalName.split(' ')[0], 
    quantity: item.quantityKg,
    category: item.category
  }));

  const COLORS = {
    'Base': '#3b82f6',
    'Precious': '#f59e0b',
    'Rare': '#8b5cf6',
    'Alloy': '#10b981'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Warehouse Storage Dashboard</h1>
          <p className="text-white/60">Real-time tracking of recovered metals and storage capacity.</p>
        </div>
        <button 
          id="btn-record-collection"
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus size={20} />
          Record New Collection
        </button>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Database size={20} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full">Live</span>
          </div>
          <h3 className="text-white/60 text-sm mb-1">Total Inventory</h3>
          <p className="text-3xl font-bold">{loading ? "..." : `${currentTotal.toFixed(1)} kg`}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-400/10 text-blue-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
          </div>
          <h3 className="text-white/60 text-sm mb-1">Base Metal Total</h3>
          <p className="text-3xl font-bold">{loading ? "..." : `${baseTotal.toFixed(1)} kg`}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <PackageSearch size={20} />
            </div>
          </div>
          <h3 className="text-white/60 text-sm mb-1">Precious Metal Total</h3>
          <p className="text-3xl font-bold text-amber-400">{loading ? "..." : `${preciousTotal.toFixed(2)} kg`}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <span className="text-sm font-medium">{capacityPercentage.toFixed(1)}%</span>
          </div>
          <h3 className="text-white/60 text-sm mb-2">Capacity (5t)</h3>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: loading ? 0 : `${capacityPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card lg:col-span-2 h-[400px]"
        >
          <h3 className="text-lg font-bold mb-6">Inventory Distribution</h3>
          {loading ? (
             <div className="w-full h-full flex items-center justify-center">
               <Loader2 className="w-8 h-8 text-primary animate-spin" />
             </div>
          ) : !mounted ? (
             <div className="w-full h-full flex items-center justify-center">
               <Loader2 className="w-8 h-8 text-primary animate-spin" />
             </div>
          ) : inventory.length === 0 ? (
             <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
               <Database size={48} className="mb-4 opacity-20" />
               <p>No data available. Start by recording a collection.</p>
             </div>
          ) : (
            <ResponsiveContainer width="100%" height="85%" id="chart-inventory-distribution">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff60" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'black', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="quantity" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS] || COLORS['Base']} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Live Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card flex flex-col h-[400px]"
        >
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold">Live Inventory Grid</h3>
             <PackageSearch size={18} className="text-white/40" />
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {loading ? (
              Array.from({length: 4}).map((_, i) => (
                <div key={i} className="w-full h-16 bg-white/5 animate-pulse rounded-lg" />
              ))
            ) : inventory.length === 0 ? (
              <p className="text-white/30 text-center py-10 text-sm">No active feeds.</p>
            ) : inventory.map((item, i) => (
              <motion.div 
                key={String(item.id)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{item.metalName}</p>
                  <p className="text-xs text-white/50">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{item.quantityKg} kg</p>
                  <p className={`text-xs ${item.status === 'In Stock' ? 'text-primary' : 'text-orange-400'}`}>
                    {item.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 glass-card"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h3 className="text-xl font-bold">Recent Purchase Requests</h3>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full text-white/60">
            {orders.length} Total Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-white/40 text-sm border-b border-white/10">
                <th className="pb-4 font-medium">Order ID</th>
                <th className="pb-4 font-medium">Buyer / Company</th>
                <th className="pb-4 font-medium">Metal</th>
                <th className="pb-4 font-medium">Qty (kg)</th>
                <th className="pb-4 font-medium">Total Price</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                Array.from({length: 3}).map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td colSpan={7} className="py-4 h-12 bg-white/5 rounded-lg" />
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-white/30">
                    No recent orders found.
                  </td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 font-mono text-white/60 text-xs">#ORD-{order.id.toString().padStart(4, '0')}</td>
                  <td className="py-4 text-white">
                    <div className="font-bold">{order.buyerName}</div>
                    <div className="text-xs text-white/40">{order.companyName}</div>
                  </td>
                  <td className="py-4 text-white">
                    {/* Note: In a real app we'd fetch the metal name, but here we can just show metalId or infer from the inventory if available. 
                        Actually, the API returns the included metal object! */}
                    <span className="font-medium">{(order as any).metal?.metalName || `Metal ID: ${order.metalId}`}</span>
                  </td>
                  <td className="py-4 font-bold">{order.quantityKg} kg</td>
                  <td className="py-4 text-primary font-black">${order.totalPrice.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      order.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {order.status === 'Approved' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-white/40 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ? '(Today)' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Collection Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl z-50 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Record Collection</h2>
                <button 
                  id="btn-close-modal"
                  onClick={() => setIsFormOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCollectionSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-sm">
                    <label className="text-white/60">Metal Name</label>
                    <input 
                      id="input-metal-name"
                      required name="metalName" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-primary/50" placeholder="e.g. Copper Wire" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="text-white/60">Category</label>
                    <select name="category" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-primary/50">
                      <option value="Base">Base</option>
                      <option value="Precious">Precious</option>
                      <option value="Rare">Rare</option>
                      <option value="Alloy">Alloy</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5 text-sm">
                    <label className="text-white/60">Qty (kg)</label>
                    <input required type="number" step="0.1" name="quantityKg" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-primary/50" placeholder="0.0" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="text-white/60">Price/kg ($)</label>
                    <input required type="number" step="0.01" name="pricePerKg" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-primary/50" placeholder="0.00" />
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <label className="text-white/60">Purity (%)</label>
                    <input required type="number" step="0.1" name="purity" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-primary/50" placeholder="0%" />
                  </div>
                </div>

                <button 
                  id="btn-save-collection"
                  disabled={submitting}
                  className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all mt-4 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : "Save Collection Records"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
