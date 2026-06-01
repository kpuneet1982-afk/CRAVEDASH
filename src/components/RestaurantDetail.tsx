/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { MenuItem } from '../types';
import { ArrowLeft, Star, Clock, ShoppingBag, Flame, Leaf, Sparkles, X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function RestaurantDetail() {
  const { currentRestaurant, setCurrentRestaurant, addToCart, vip, coins, addRedeemedItemToCart, formatPrice, t } = useApp();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [qty, setQty] = useState(1);
  const [customChoices, setCustomChoices] = useState<{ [key: string]: string }>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!currentRestaurant) return null;

  // Group menu by categories
  const categories = Array.from(new Set(currentRestaurant.menu.map((item) => item.category)));

  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItem(item);
    setQty(1);
    setSpecialInstructions('');
    
    // Set default choices for required options
    const initialChoices: { [key: string]: string } = {};
    item.customizationOptions?.forEach((opt) => {
      initialChoices[opt.name] = opt.options[0]; // grab first default
    });
    setCustomChoices(initialChoices);
  };

  const handleCloseCustomizer = () => {
    setSelectedItem(null);
  };

  const handleChoiceChange = (optionName: string, choice: string) => {
    setCustomChoices((prev) => ({
      ...prev,
      [optionName]: choice,
    }));
  };

  const handleAddToBasket = () => {
    if (!selectedItem) return;
    addToCart(selectedItem, customChoices, qty, specialInstructions);
    handleCloseCustomizer();
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* 1. Header Navigation Bar */}
      <button
        type="button"
        onClick={() => setCurrentRestaurant(null)}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t('button.back_to_restaurants', 'Back to Food Spots')}
      </button>

      {/* 2. Brand Feature Hero Banner */}
      <div className="relative h-56 md:h-72 rounded-3xl overflow-hidden border border-slate-900 shadow-xl">
        <img
          src={currentRestaurant.bannerImage}
          alt={currentRestaurant.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/20" />
        
        {/* Restaurant details layout overlaid */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900/95 text-xs text-orange-400 font-mono tracking-wide border border-slate-800 mb-3 font-semibold">
              ⭐ Premium Partner
            </span>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {currentRestaurant.name}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              {currentRestaurant.cuisine}
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-4 py-2 rounded-2xl flex flex-col items-center min-w-[70px]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Rating</span>
              <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {currentRestaurant.rating}
              </span>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-4 py-2 rounded-2xl flex flex-col items-center min-w-[70px]">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Speed</span>
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentRestaurant.deliveryTime}m
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Grouped Menu Section & Menu Grid */}
      <div className="space-y-12">
        {categories.map((cat) => {
          const items = currentRestaurant.menu.filter((i) => i.category === cat);
          return (
            <div key={cat} className="space-y-5">
              <div className="border-b border-slate-900 pb-2">
                <h3 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
                  🍲 {cat}
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenCustomizer(item)}
                    className="p-4 bg-slate-900/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-850/60 transition-all rounded-2xl flex gap-4 cursor-pointer group"
                  >
                    
                    {/* Culinary item thumbnail */}
                    {item.image && (
                      <div className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {item.popular && (
                          <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded flex items-center gap-0.5">
                            <Sparkles className="w-2 h-2 fill-slate-950" />
                            Popular
                          </span>
                        )}
                      </div>
                    )}

                    {/* Metadata detail block */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-sm font-mono font-bold text-orange-400">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 lines-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Info Dietary Pills */}
                      <div className="flex items-center gap-2 mt-3">
                        {item.spicy && (
                          <span className="text-[9px] font-semibold text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded border border-rose-900/35 flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 text-rose-500" /> Spicy
                          </span>
                        )}
                        {item.vegetarian && (
                          <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/35 flex items-center gap-0.5">
                            <Leaf className="w-2.5 h-2.5 text-emerald-500" /> Plant-Based
                          </span>
                        )}
                        <span className="text-[9px] text-slate-500 ml-auto flex items-center gap-1 group-hover:text-orange-400 font-mono">
                          Customize
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Beautiful Customization Slide-Over/Modal Dialogue */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Modal Backdrop screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCustomizer}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Customizer Slide Drawer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 50 }}
              className="fixed inset-x-4 bottom-4 md:inset-x-auto md:right-4 md:bottom-4 md:top-4 md:w-[480px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden text-slate-100"
            >
              {/* Image & Close Action */}
              <div className="relative h-44 w-full">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 opacity-90" />
                <button
                  type="button"
                  id="close-customizer-btn"
                  onClick={handleCloseCustomizer}
                  className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 p-2 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Title & Custom selections container */}
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white">{selectedItem.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedItem.description}</p>
                </div>

                {/* Iterate through customization steps */}
                {selectedItem.customizationOptions && selectedItem.customizationOptions.length > 0 && (
                  <div className="space-y-6">
                    {selectedItem.customizationOptions.map((opt) => (
                      <div key={opt.name} className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">
                            {opt.name}
                          </span>
                          {opt.required && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-rose-950/40 text-rose-400 rounded border border-rose-900/40 uppercase font-mono">
                              Required Choice
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {opt.options.map((optionVal) => (
                            <button
                              key={optionVal}
                              type="button"
                              onClick={() => handleChoiceChange(opt.name, optionVal)}
                              className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                                customChoices[opt.name] === optionVal
                                  ? 'bg-orange-650/15 border-orange-500 text-orange-400 font-medium'
                                  : 'bg-slate-950/40 border-slate-850 hover:bg-slate-950 text-slate-300'
                              }`}
                            >
                              <span>{optionVal}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                customChoices[opt.name] === optionVal ? 'border-orange-500' : 'border-slate-700'
                              }`}>
                                {customChoices[opt.name] === optionVal && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Special instructions box input */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 block">
                    Special Culinary Requests
                  </span>
                  <textarea
                    id="special-instructions-input"
                    rows={2}
                    placeholder="E.g., No onions, dressing on the side, extra crispy..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Bottom Sticky Action Block */}
              <div className="p-6 border-t border-slate-850 bg-slate-950/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Quantity Toggle */}
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-xs font-bold font-mono text-slate-500 uppercase sm:hidden">Qty:</span>
                  <div className="flex items-center gap-3 bg-slate-950 border border-slate-850 px-2.5 py-1.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-1 hover:bg-slate-850 rounded-lg text-slate-400 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-mono font-bold w-5 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="p-1 hover:bg-slate-850 rounded-lg text-slate-400 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right controls: standard basket vs coins redemption */}
                <div className="flex flex-col sm:flex-row gap-2.5 flex-grow">
                  <button
                    type="button"
                    id="add-to-basket-action-btn"
                    onClick={handleAddToBasket}
                    className="flex-grow py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-950/50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Add {qty} to Basket</span>
                    <span>•</span>
                    <span>{formatPrice(selectedItem.price * qty)}</span>
                  </button>

                  {(() => {
                    const coinCost = Math.ceil(selectedItem.price * 25) * qty;
                    const canAfford = coins >= coinCost;
                    
                    return (
                      <button
                        type="button"
                        id="redeem-with-coins-btn"
                        onClick={() => {
                          if (canAfford) {
                            addRedeemedItemToCart(selectedItem, coinCost, customChoices, qty);
                            handleCloseCustomizer();
                          }
                        }}
                        disabled={!canAfford}
                        className={`flex-grow py-3 px-4 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center gap-2 border transition-all ${
                          canAfford
                            ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white border-orange-500/20 hover:to-orange-500 hover:from-orange-550 cursor-pointer active:scale-95'
                            : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed text-[11px]'
                        }`}
                      >
                        <span>🪙</span>
                        <span>Redeem for {coinCost} Coins {!canAfford && `(Need ${coinCost - coins} more)`}</span>
                      </button>
                    );
                  })()}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
