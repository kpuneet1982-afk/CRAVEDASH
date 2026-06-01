/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { PushNotification } from '../types';
import { Bell, Crown, ShoppingBag, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Notifications() {
  const { notifications } = useApp();
  const [activeToasts, setActiveToasts] = useState<PushNotification[]>([]);

  // Monitor notifications database list is changed
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0]; // grab the most recent push trigger
      
      // Prevent duplicating immediate toasts
      setActiveToasts((prev) => {
        if (prev.some((t) => t.id === latest.id)) return prev;
        return [latest, ...prev].slice(0, 3); // limit top 3 stacked together
      });

      // Automatically auto-dismiss toast after 6 seconds
      const timer = setTimeout(() => {
        setActiveToasts((prev) => prev.filter((t) => t.id !== latest.id));
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const handleDismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (activeToasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-55 w-full max-w-sm flex flex-col gap-3 pointer-events-none px-4 sm:px-0"
      id="push-toaster-area"
    >
      <AnimatePresence>
        {activeToasts.map((toast) => {
          // Choose icons and border highlights based on classifications
          let icon = <Bell className="w-5 h-5 text-orange-400" />;
          let accentBorder = 'border-l-4 border-l-orange-500';
          let titleColor = 'text-orange-400';

          if (toast.type === 'order_update') {
            icon = <ShoppingBag className="w-5 h-5 text-rose-500 animate-pulse" />;
            accentBorder = 'border-l-4 border-l-rose-500';
            titleColor = 'text-rose-500';
          } else if (toast.type === 'vip_benefit') {
            icon = <Crown className="w-5 h-5 text-amber-400 animate-bounce" />;
            accentBorder = 'border-l-4 border-l-amber-500';
            titleColor = 'text-amber-400';
          } else if (toast.type === 'system') {
            icon = <Info className="w-5 h-5 text-sky-400" />;
            accentBorder = 'border-l-4 border-l-sky-500';
            titleColor = 'text-sky-400';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
              className={`p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 ${accentBorder} rounded-xl shadow-2xl flex gap-3 pointer-events-auto items-start`}
            >
              <div className="bg-slate-950 p-2 rounded-lg">
                {icon}
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between gap-1.5">
                  <span className={`text-xs font-bold font-sans ${titleColor}`}>
                    {toast.title}
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 font-medium">
                    {new Date(toast.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  {toast.body}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDismissToast(toast.id)}
                className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
