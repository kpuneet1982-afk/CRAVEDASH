/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './AppContext';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import CheckoutGateway from './components/CheckoutGateway';
import OrderTracker from './components/OrderTracker';
import VIPOffers from './components/VIPOffers';
import CraveRewards from './components/CraveRewards';
import Notifications from './components/Notifications';
import { ShieldAlert, Compass, Crown, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-orange-605 selection:text-white">
      
      {/* 1. Persistence Top Navigation Bar Header */}
      <Header />

      {/* 2. Main content area structured with mobile-first fluidity constraints */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {currentView === 'home' && <RestaurantList />}
            {currentView === 'restaurant' && <RestaurantDetail />}
            {currentView === 'checkout' && <CheckoutGateway />}
            {currentView === 'tracker' && <OrderTracker />}
            {currentView === 'vip' && <VIPOffers />}
            {currentView === 'rewards' && <CraveRewards />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Humble Premium Footer (Conforming strictly to No Tech-Larping margins guidelines) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} CraveDash Inc. Deliveries processed securely with eco-friendly scooter fleets.
            </p>
            <p className="text-[10px] text-slate-600 font-mono flex items-center justify-center sm:justify-start gap-1">
              <ShieldCheck className="w-3 w-3 text-emerald-500" />
              PCI-DSS Vault Encrypted Checkout Gateway
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">Culinary Integrity</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Courier Terms</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer flex items-center gap-1">
              Crave Loyalty <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </footer>

      {/* 4. Overlay push-notification toast area */}
      <Notifications />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
