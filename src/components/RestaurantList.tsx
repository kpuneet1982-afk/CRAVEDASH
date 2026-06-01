/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { RESTAURANTS, CUISINES } from '../data';
import { Search, Star, Clock, Sparkles, SlidersHorizontal, ArrowUpRight, Crown } from 'lucide-react';
import { motion } from 'motion/react';

// @ts-ignore
import bannerPath from '../assets/images/gourmet_banner_1780283761899.png';

export default function RestaurantList() {
  const { setCurrentRestaurant, vip, setCurrentView, formatPrice, t } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortByRating, setSortByRating] = useState(false);

  // Filter restaurants logically
  const filteredRestaurants = RESTAURANTS.filter((rest) => {
    // Category match
    const categoryMatch = activeCategory === 'all' || rest.cuisine.toLowerCase().includes(activeCategory);
    // Search query match
    const queryMatch = rest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      rest.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      rest.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && queryMatch;
  }).sort((a, b) => (sortByRating ? b.rating - a.rating : 0));

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Gourmet Video-Like Action Hero Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-3xl shadow-2xl border border-slate-900 mx-auto">
        <img 
          src={bannerPath}
          alt="Premium Gourmet Masterpieces" 
          className="w-full h-full object-cover select-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />
        
        {/* Banner Copy Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-mono tracking-wider uppercase border border-orange-500/30 mb-2 font-semibold">
              <Sparkles className="w-3 h-3 text-orange-400" />
              Gourmet Satisfactions
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white drop-shadow-md">
              Satisfy Your Cravings Speedily
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-md drop-shadow">
              Premium dishes delivered by our electric courier taskforce in record frames.
            </p>
          </div>

          {/* Invitation block to join VIP membership */}
          {!vip.isVIP && (
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView('vip')}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 px-4 py-2.5 rounded-2xl cursor-pointer shadow-lg hover:brightness-110 flex items-center gap-3 border border-yellow-400/40"
            >
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wide block text-amber-950">Special Loyalty Access</span>
                <p className="text-xs font-bold flex items-center gap-1">
                  Join VIP Club & Save 15% <Crown className="w-3 h-3 text-slate-950" />
                </p>
              </div>
              <div className="bg-slate-950/20 p-1.5 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </div>
            </motion.div>
          )}

          {vip.isVIP && (
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-amber-400 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wide block text-slate-400">VIP Mode Activated</span>
                <p className="text-xs font-bold text-slate-100">
                  Enjoy Free Delivery on All Orders
                </p>
              </div>
              <Crown className="w-5 h-5 text-amber-400 animate-pulse fill-amber-500/10" />
            </div>
          )}

        </div>
      </div>

      {/* 2. Interactive Search & Filters Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-900">
        
        {/* Simple Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={t('search.placeholder', 'Search delicious restaurants, cuisines or dishes...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3 overflow-x-auto self-start md:self-auto scrollbar-none w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSortByRating(!sortByRating)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              sortByRating 
                ? 'bg-amber-950/30 border-amber-500 text-amber-400' 
                : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Highest Rated (4.8+)</span>
          </button>
          
          <button
            type="button"
            onClick={() => setSearchQuery('Popular')}
            className="px-3.5 py-2.5 rounded-xl text-xs font-medium bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-300 whitespace-nowrap cursor-pointer"
          >
            🔥 Popular Cuisine
          </button>
        </div>

      </div>

      {/* 3. Cuisine Category Quick Selector Buttons */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold font-mono text-slate-400 tracking-wider uppercase">Cuisines Selection</h3>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CUISINES.map((cuis) => (
            <button
              key={cuis.id}
              type="button"
              id={`cuisine-tab-${cuis.id}`}
              onClick={() => setActiveCategory(cuis.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 border ${
                activeCategory === cuis.id
                  ? 'bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-950/50'
                  : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-300 border-slate-850'
              }`}
            >
              <span>{cuis.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Restaurant Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
            🚀 Flash Delivery Hotspots
            <span className="text-xs py-0.5 px-2 bg-slate-900 border border-slate-800 rounded font-mono text-slate-400 font-normal">
              {filteredRestaurants.length} found
            </span>
          </h3>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="p-16 text-center border-2 border-dashed border-slate-900 rounded-3xl bg-slate-950/20 max-w-lg mx-auto">
            <span className="text-4xl">🥘</span>
            <h4 className="text-base text-slate-300 font-bold mt-4">We are searching for more flavor tables</h4>
            <p className="text-xs text-slate-500 mt-2">No active restaurants found matching your criteria. Try widening your search filters.</p>
            <button 
              type="button"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortByRating(false); }}
              className="mt-4 text-xs font-semibold px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-500"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((rest, idx) => (
              <motion.div
                key={rest.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setCurrentRestaurant(rest)}
                className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image & Overlay Tagging */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-sm border border-slate-800 px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-semibold text-slate-200">{rest.rating}</span>
                  </div>

                  {/* Hot tag bubble */}
                  {rest.featured && (
                    <div className="absolute top-3 left-3 bg-rose-600 text-white text-[9px] font-bold font-mono tracking-wider px-2 py-1 rounded uppercase">
                      Featured
                    </div>
                  )}

                  {/* Quick Metadata Pill (Delivery estimation) */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-905">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-300 font-medium">{rest.deliveryTime} mins</span>
                  </div>
                </div>

                {/* Card Main Properties */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                      {rest.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      {rest.cuisine}
                    </p>

                    {/* Promotion highlights */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {rest.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 bg-slate-950 text-slate-400 rounded-md border border-slate-850/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Delivery Cost / VIP Discount Status */}
                  <div className="border-t border-slate-850/80 mt-4 pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Delivery</span>
                      {vip.isVIP ? (
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                          <Crown className="w-3.5 h-3.5 fill-amber-400/20" />
                          <span>{formatPrice(0)} Free VIP</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 font-semibold">{formatPrice(rest.deliveryFee)}</span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Min. Order</span>
                      <span className="text-xs text-slate-300 font-semibold">{formatPrice(rest.minOrder)}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
