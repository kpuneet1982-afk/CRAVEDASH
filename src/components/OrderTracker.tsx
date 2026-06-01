/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Clock, Navigation, MapPin, CheckCircle2, ChevronRight, Phone, MessageSquare, ShieldCheck, Heart, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderTracker() {
  const { activeOrder, dismissOrder, vip } = useApp();
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'driver' | 'user'; text: string; time: string }[]>([
    { sender: 'driver', text: 'Good day! I have accepted your CraveDash request. Heading to the kitchen now.', time: 'Just now' }
  ]);

  if (!activeOrder) {
    return (
      <div className="text-center py-24 bg-slate-950/20 border-2 border-dashed border-slate-900 rounded-3xl max-w-sm mx-auto p-8">
        <span className="text-4xl block mb-4">🛵</span>
        <h3 className="text-base text-slate-300 font-bold">No active delivery on radar</h3>
        <p className="text-xs text-slate-500 mt-2">Place an order at our local food hotspots to track real-time delivery GPS.</p>
        <button
          type="button"
          onClick={() => dismissOrder()}
          className="mt-6 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold font-sans cursor-pointer"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  // Trigger driver chat updates based on order state changes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeOrder.status === 'Preparing') {
      timer = setTimeout(() => {
        setChatLog((prev) => [
          ...prev,
          { sender: 'driver', text: 'The kitchen is putting the final garnish on your gourmets. Almost ready!', time: '1m ago' }
        ]);
      }, 5000);
    } else if (activeOrder.status === 'OutForDelivery') {
      timer = setTimeout(() => {
        setChatLog((prev) => [
          ...prev,
          { sender: 'driver', text: 'Order secured! Hot and fresh. Starting my scooter journey to your flat.', time: 'Just now' }
        ]);
      }, 4000);
    } else if (activeOrder.status === 'Arrived') {
      timer = setTimeout(() => {
        setChatLog((prev) => [
          ...prev,
          { sender: 'driver', text: 'I am right at the gate. Ringing bell shortly!', time: 'Just now' }
        ]);
      }, 2000);
    } else if (activeOrder.status === 'Delivered') {
      timer = setTimeout(() => {
        setChatLog((prev) => [
          ...prev,
          { sender: 'driver', text: 'Delivered successfully! Thank you for ordering with CraveDash. Please rate me 5 stars if you loved the swift service!', time: 'Just now' }
        ]);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [activeOrder.status]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog((prev) => [...prev, { sender: 'user', text: chatMessage, time: now }]);
    setChatMessage('');

    // Simulate instant witty rider response
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        { sender: 'driver', text: 'Roger that! Copy that request.', time: 'Just now' }
      ]);
    }, 1500);
  };

  // Logic calculation for driver positioning coordinates on SVG map
  // Start: (15%, 85%) -> Rest: (45%, 35%) -> End: (85%, 70%)
  const getDriverCoordinates = () => {
    switch (activeOrder.status) {
      case 'Placed':
        return { x: 15, y: 85 }; // Sitting at start
      case 'Preparing':
        return { x: 30, y: 60 }; // Transit to restaurant
      case 'OutForDelivery':
        return { x: 65, y: 52 }; // Transit to home
      case 'Arrived':
        return { x: 80, y: 65 }; // Arrived outside
      case 'Delivered':
        return { x: 85, y: 70 }; // Finished
    }
  };

  const driverPos = getDriverCoordinates();

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Header Banner Progress Bar State */}
      <div className="bg-slate-900 border border-slate-900 rounded-3xl p-6 shadow-xl text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-5">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-orange-400">Live GPS Radar</span>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold font-sans tracking-tight">Active Delivery: {activeOrder.id}</h2>
              {vip.isVIP && (
                <span className="bg-amber-500/20 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5 fill-amber-500/15" /> VIP Priority Courier
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> Deliver to: {activeOrder.deliveryAddress}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-850 self-start md:self-auto">
            <Clock className="w-8 h-8 text-orange-500 animate-pulse" />
            <div>
              <span className="text-[10px] uppercase text-slate-500 tracking-wider font-mono">Estimated Arrival</span>
              <p className="text-lg font-mono font-bold text-slate-200">
                {activeOrder.eta > 0 ? `${activeOrder.eta} Mins` : '🏁 Arrived & Feast Delivered'}
              </p>
            </div>
          </div>
        </div>

        {/* Five Progress Nodes Status */}
        <div className="pt-6">
          <div className="relative flex items-center justify-between">
            {/* Horizontal Line connector */}
            <div className="absolute left-0 right-0 h-1 bg-slate-800 z-0">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700" 
                style={{
                  width: activeOrder.status === 'Placed' ? '10%' 
                       : activeOrder.status === 'Preparing' ? '35%' 
                       : activeOrder.status === 'OutForDelivery' ? '65%' 
                       : activeOrder.status === 'Arrived' ? '85%' 
                       : '100%'
                }}
              />
            </div>

            {/* Stages */}
            {[
              { id: 'Placed', label: 'Placed', icon: '📝' },
              { id: 'Preparing', label: 'Cooking', icon: '🍳' },
              { id: 'OutForDelivery', label: 'En Route', icon: '🛵' },
              { id: 'Arrived', label: 'Outside', icon: '🔔' },
              { id: 'Delivered', label: 'Delivered', icon: '😋' },
            ].map((node, i) => {
              const stagesOrder = ['Placed', 'Preparing', 'OutForDelivery', 'Arrived', 'Delivered'];
              const isActive = activeOrder.status === node.id;
              const isPast = stagesOrder.indexOf(activeOrder.status) >= i;

              return (
                <div key={node.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    isActive 
                      ? 'bg-orange-605 border-2 border-orange-400 shadow-lg shadow-orange-950 scale-110' 
                      : isPast 
                        ? 'bg-orange-950 text-orange-400 border border-orange-900' 
                        : 'bg-slate-950 text-slate-600 border border-slate-850'
                  }`}>
                    {node.icon}
                  </div>
                  <span className={`text-[10px] font-sans font-semibold mt-2.5 transition-colors ${
                    isActive ? 'text-orange-400 font-bold' : isPast ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column (7 cols): Live SVG Tracking Radar Map */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-900 rounded-3xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-850 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Live SF Map Tracking</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            {/* Simulated Live Vector Map Area */}
            <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Map grid lines background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Vector Streets representation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Street 1 */}
                <path d="M 15 85 L 15 35 L 45 35 L 45 70 L 85 70" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Glowing Active Courier Router Line */}
                <path 
                  d="M 15 85 L 15 35 L 45 35 L 45 70 L 85 70" 
                  fill="none" 
                  stroke="url(#route-glow)" 
                  strokeWidth="1.2" 
                  strokeDasharray="4, 4" 
                  className="animate-[stroke_20s_linear_infinite]"
                />

                {/* Definitions for Glow gradients */}
                <defs>
                  <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Map Landmark Marker 1: Dispatch Depot Start (Rider base) */}
              <div className="absolute left-[15%] top-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-805 shadow-md">
                  🏁
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">Base</span>
              </div>

              {/* Map Landmark Marker 2: Restaurant Hub */}
              <div className="absolute left-[45%] top-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <motion.div 
                  animate={{ scale: activeOrder.status === 'Preparing' ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-orange-950 p-2 rounded-xl border border-orange-550 shadow-lg text-sm"
                >
                  🍔
                </motion.div>
                <span className="text-[9px] font-mono font-bold text-orange-400 mt-1">Kitchen</span>
              </div>

              {/* Map Landmark Marker 3: Customer Residence (User House) */}
              <div className="absolute left-[85%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <motion.div 
                  animate={{ scale: activeOrder.status === 'Arrived' ? [1, 1.15, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="bg-sky-950 p-2 rounded-xl border border-sky-505 shadow-lg text-sm"
                >
                  📍
                </motion.div>
                <span className="text-[9px] font-mono font-bold text-sky-400 mt-1">Your Flat</span>
              </div>

              {/* Floating Real-time Driver GPS Marker */}
              {activeOrder.driver && (
                <motion.div 
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
                  style={{
                    left: `${driverPos.x}%`,
                    top: `${driverPos.y}%`
                  }}
                  layout
                  transition={{ type: "spring", stiffness: 40, damping: 10 }}
                >
                  <div className="bg-gradient-to-r from-orange-400 to-rose-500 text-white rounded-xl py-1.5 px-2 shadow-xl border border-white/20 flex items-center gap-1">
                    <span className="text-xs">🛵</span>
                    <span className="text-[9px] font-bold font-mono">Marcus Tracker</span>
                  </div>
                  {/* Subtle pulsing beacon block */}
                  <div className="w-3 h-3 bg-rose-500 rounded-full border-2 border-white absolute -bottom-1 z-0 animate-ping" />
                </motion.div>
              )}

            </div>

            {/* Notification alert below map */}
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Contactless secure courier dispatch verified.</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500">Secure Protocol</span>
            </div>
          </div>
        </div>

        {/* Right column (5 cols): Driver card and simulated courier chat logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Driver identity credentials */}
          {activeOrder.driver && (
            <div className="bg-slate-900 border border-slate-900 rounded-3xl p-5 shadow-xl text-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                    <img src={activeOrder.driver.avatar} alt={activeOrder.driver.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{activeOrder.driver.name}</h3>
                    <p className="text-[10px] text-slate-400">{activeOrder.driver.vehicle}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[9px] uppercase font-mono text-slate-500">Courier Rating</span>
                  <div className="flex items-center gap-1 font-bold text-amber-400 text-xs">
                    ⭐ {activeOrder.driver.rating}
                  </div>
                </div>
              </div>

              {/* Action buttons (Tel and chat mock) */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  type="button"
                  id="driver-call"
                  onClick={() => alert(`Calling courier ${activeOrder.driver?.name} at ${activeOrder.driver?.phone}... (Mock Interface)`)}
                  className="py-2 px-3 bg-slate-950 hover:bg-slate-850 rounded-xl text-xs font-semibold text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Courier
                </button>

                <button
                  type="button"
                  id="driver-msg"
                  className="py-2 px-3 bg-orange-655/10 rounded-xl text-xs font-semibold text-orange-400 border border-orange-900/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Direct Messages
                </button>
              </div>
            </div>
          )}

          {/* Interactive Chat Log Console */}
          <div className="bg-slate-900 border border-slate-900 rounded-3xl p-5 shadow-xl flex flex-col h-72">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 pb-3 border-b border-slate-850">
              Live Courier Chat Link
            </h4>

            {/* Chat list */}
            <div className="flex-grow overflow-y-auto space-y-3 py-3 font-sans text-xs scrollbar-none">
              {chatLog.map((chat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[80%] ${chat.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className={`p-2.5 rounded-2xl ${
                    chat.sender === 'user' 
                      ? 'bg-orange-600 text-white rounded-br-none' 
                      : 'bg-slate-950 text-slate-200 border border-slate-850 rounded-bl-none'
                  }`}>
                    {chat.text}
                  </div>
                  <span className="text-[8px] text-slate-500 mt-0.5">{chat.time}</span>
                </div>
              ))}
            </div>

            {/* Interactive text controller */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                placeholder="Message Marcus Swift..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-grow bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
              <button
                type="submit"
                id="send-chat"
                className="py-2 px-3.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-500"
              >
                Send
              </button>
            </form>
          </div>

          {/* Dismiss order display trigger if completed */}
          {activeOrder.status === 'Delivered' && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-950/20 border-2 border-dashed border-emerald-800/40 p-5 rounded-3xl text-center space-y-3"
            >
              <h4 className="text-sm font-bold text-emerald-400">Order Fulfilled Cleanly!</h4>
              <p className="text-xs text-slate-400">Your meal has been safely processed and completed. Would you like to clear active tracker screen?</p>
              <button
                type="button"
                onClick={() => dismissOrder()}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-605 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer"
              >
                Explore More Meals
              </button>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
}
