/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../AppContext';
import { MenuItem } from '../types';
import { motion } from 'motion/react';
import { Gift, Award, HelpCircle, Zap, ShieldCheck, Check, Sparkles, ArrowRight, Heart } from 'lucide-react';

// @ts-ignore
import coinPath from '../assets/images/crave_dash_token_1780284136576.png';

// Preset reward options that customers can claim for their collected Crave Coins
const REWARD_ITEMS: { item: MenuItem; coinCost: number; savingsValue: string; difficulty: string }[] = [
  {
    item: {
      id: 'reward_soda',
      name: 'Artisanal Crave Fizz Soda',
      description: 'Refreshingly cold house-brewed sparkling cane soda with organic black cherry extracts and natural lime juices.',
      price: 0,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
      category: 'Beverage Reward',
    },
    coinCost: 80,
    savingsValue: '$4.50 Value',
    difficulty: 'Easy'
  },
  {
    item: {
      id: 'reward_fries',
      name: 'Double-Fried Cheddar Craft Fries',
      description: 'Thick cut Idaho potatoes twice-fried block-style, coated with melted organic sharp white cheddar cheese & smoked sea salt.',
      price: 0,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
      category: 'Side Reward',
    },
    coinCost: 150,
    savingsValue: '$7.50 Value',
    difficulty: 'Popular'
  },
  {
    item: {
      id: 'reward_lava',
      name: 'Decadent Molten Hot Lava Cake',
      description: 'Incredibly rich, dark Belgian chocolate souffle sponge with a warm oozing chocolate core, topped with confectioner gold powder.',
      price: 0,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
      category: 'Dessert Reward',
      popular: true
    },
    coinCost: 240,
    savingsValue: '$9.99 Value',
    difficulty: 'Elite'
  },
  {
    item: {
      id: 'reward_burger',
      name: 'Deluxe Black-Label Truffle Burger',
      description: 'Slow-aged Wagyu beef burger topped with white winter truffle butter, melted Emmental cheese, baby arugula, on an artisanal toasted potato bun.',
      price: 0,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      category: 'Signature Reward',
      popular: true
    },
    coinCost: 400,
    savingsValue: '$18.50 Value',
    difficulty: 'Grand Prize'
  }
];

export default function CraveRewards() {
  const {
    coins,
    purchaseCount,
    addCoins,
    addRedeemedItemToCart,
    addNotification,
    currentView,
    setCurrentView,
    formatPrice,
    currency,
    t,
  } = useApp();

  // Streak progress calculation
  const streakProgress = purchaseCount % 2;
  const ordersNeeded = 2 - streakProgress;

  // Manual tester functions for beautiful seamless UI previewing
  const handleQuickAddCoins = () => {
    addCoins(100);
    addNotification(
      '🪙 Developer Demo Gift!',
      'Claimed 100 Crave Dash Coins into your vaults instantly for easy rewards testing!',
      'vip_benefit'
    );
  };

  const handleSimulatePurchaseCount = () => {
    // Inject notification and increase purchases by 1 to trigger automatic milestone
    const fakePurch = purchaseCount + 1;
    addNotification(
      '📈 Simulated Purchase Registered',
      `Simulation active: Recorded Purchase ${fakePurch}.` + 
      (fakePurch % 2 === 0 ? ' High-speed milestone unlocked!' : ''),
      'system'
    );
    
    // We register the purchase simulation by calling a simulated callback
    // To trigger the system's live % 2 logic, we will trigger simulated checkout behavior
    // Let's do it by directly incrementing the localStorage variable and updating coins count
    const updatedCount = purchaseCount + 1;
    localStorage.setItem('cravedash_purchase_count', String(updatedCount));
    
    // Simulate what the AppContext does internally to match perfectly:
    window.location.reload(); // Quick state synchronizer or trigger state variables direct
  };

  return (
    <div className="space-y-8 pb-12" id="crave-rewards-wrapper">
      
      {/* 1. Hero Dynamic Coin Room Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="md:grid md:grid-cols-12 md:gap-8 md:items-center relative z-10">
          
          {/* Animated Glowing Coin Icon */}
          <div className="col-span-12 md:col-span-4 flex justify-center mb-6 md:mb-0">
            <motion.div 
              className="relative w-44 h-44 md:w-52 md:h-52 filter drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]"
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 180, 360]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src={coinPath} 
                className="w-full h-full object-contain rounded-full border border-orange-500/15"
                alt="3D Gold Crave Dash Coin"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/10 to-transparent animate-pulse pointer-events-none" />
            </motion.div>
          </div>
          
          {/* Dashboard Description */}
          <div className="col-span-12 md:col-span-8 space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/40 text-orange-400 text-xs font-semibold font-mono tracking-wide border border-orange-900/30">
              <Sparkles className="w-3.5 h-3.5" />
              EXCLUSIVE LOYALTY ROOM
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-100 tracking-tight leading-tight">
              Crave Dash <span className="bg-gradient-to-r from-orange-400 via-rose-500 to-amber-400 bg-clip-text text-transparent">Tokens & Rewards</span>
            </h2>
            <p className="text-sm text-slate-350 max-w-xl leading-relaxed">
              Order your favorite culinary items to compile tokens automatically. Earning coins is effortless: 
              receive <strong className="text-orange-400 font-bold">50 Crave Coins</strong> on every 
              <strong className="text-slate-100"> 2 purchases</strong> you complete. Redeem your coins directly 
              for gourmet entrees, desserts, and sides for free!
            </p>

            {/* Live Progress Bar Section */}
            <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-2xl max-w-lg mt-6 shadow-md text-left">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 font-mono">
                  <Award className="w-4 h-4 text-amber-500" />
                  MILESTONE PROGRESS
                </span>
                <span className="text-xs font-mono font-bold text-orange-400">
                  {streakProgress}/2 Orders Completed
                </span>
              </div>
              <div className="w-full bg-slate-900 h-3.5 rounded-full overflow-hidden border border-slate-800 relative">
                <motion.div 
                  className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(streakProgress / 2) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between">
                <span>
                  {streakProgress === 0 
                  ? "👉 Place your first order to kickstart your next 50 coins payout!" 
                  : `🎯 Only ${ordersNeeded} more order to earn +50 Coins immediately!`}
                </span>
              </p>
            </div>
            
            {/* Quick Demo Panel */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <button
                type="button"
                onClick={handleQuickAddCoins}
                className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/35 hover:to-orange-500/35 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 animate-bounce text-amber-400" />
                Dev: Claim 100 Free Coins Gift
              </button>
            </div>

          </div>
          
        </div>
      </section>

      {/* 2. Coin Vault Account Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="vault-metrics">
        
        {/* Metric 1: Current Balance */}
        <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden shadow-lg">
          <div className="space-y-1 z-10">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Your Vault Coin Balance</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-mono font-black text-orange-400">{coins}</span>
              <span className="text-xs text-amber-500 font-mono font-semibold">COINS</span>
            </div>
          </div>
          <div className="p-3 bg-orange-950/30 rounded-xl text-orange-400 z-10 border border-orange-900/20">
            <img src={coinPath} className="w-7 h-7 rounded-full object-cover animate-spin-slow" referrerPolicy="no-referrer" />
          </div>
        </div>

        {/* Metric 2: Lifetime Purchases Streak */}
        <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden shadow-lg">
          <div className="space-y-1 z-10">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Total Lifetime Orders</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-mono font-black text-slate-100">{purchaseCount}</span>
              <span className="text-xs text-slate-400 font-medium">processed</span>
            </div>
          </div>
          <div className="p-3 bg-slate-950/50 rounded-xl text-slate-400 z-10 font-mono font-bold text-xs border border-slate-800">
            Streak #{purchaseCount}
          </div>
        </div>

        {/* Metric 3: Equivalent Purchasing Power */}
        <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl flex items-center justify-between relative overflow-hidden shadow-lg">
          <div className="space-y-1 z-10">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">{t('rewards.buying_power', 'Rewards Buying Power')}</span>
            <div className="flex items-baseline gap-1.5 font-mono font-bold text-emerald-400">
              <span className="text-3xl font-black">{formatPrice(coins / 25)}</span>
              <span className="text-xs">{currency} {t('rewards._value', 'Equivalent')}</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-950/20 rounded-xl text-emerald-400 z-10 border border-emerald-900/10">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

      </section>

      {/* 3. Preset Rewards Store Matrix */}
      <section className="space-y-5" id="preset-rewards-store">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Gift className="w-5 h-5 text-orange-500" />
              Crave Rewards exchange Store
            </h3>
            <p className="text-xs text-slate-400 mt-1">Unlock delicious items instantly for free using your Crave Coins!</p>
          </div>
          <div className="flex justify-end shrink-0 text-slate-500 text-xs font-mono border border-slate-850 bg-slate-900 px-3 py-1.5 rounded-xl">
            ⚡ Double purchase accrual: <strong className="text-slate-200 ml-1">+50 Coins / 2 orders</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REWARD_ITEMS.map((itemObj) => {
            const canAfford = coins >= itemObj.coinCost;
            return (
              <motion.div
                key={itemObj.item.id}
                whileHover={{ y: -4 }}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-850 flex flex-col justify-between group shadow-md"
              >
                <div>
                  {/* Thumbnail Cover */}
                  <div className="h-44 relative bg-slate-950 overflow-hidden">
                    <img 
                      src={itemObj.item.image} 
                      alt={itemObj.item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Info Badges */}
                    <span className="absolute top-2.5 left-2.5 bg-slate-950/90 text-orange-400 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border border-orange-950/30 flex items-center gap-1 shadow-md">
                      <img src={coinPath} className="w-3 h-3 rounded-full object-cover" referrerPolicy="no-referrer" />
                      {itemObj.coinCost} Coins
                    </span>

                    <span className="absolute bottom-2 left-2.5 bg-emerald-950/90 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-900/30">
                      {formatPrice(itemObj.coinCost / 25)} {t('rewards.saving', 'Savings')}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold text-slate-500">
                        {itemObj.item.category?.toUpperCase()}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wide font-mono font-bold ${
                        itemObj.difficulty === 'Grand Prize' ? 'text-rose-400' : 'text-amber-500'
                      }`}>
                        {itemObj.difficulty}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-orange-400 transition-colors leading-tight">
                      {itemObj.item.name}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {itemObj.item.description}
                    </p>
                  </div>
                </div>

                {/* Redeem Controls */}
                <div className="p-4 pt-0">
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => addRedeemedItemToCart(itemObj.item, itemObj.coinCost)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      canAfford 
                        ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-950/40 cursor-pointer active:scale-95' 
                        : 'bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? (
                      <>
                        <Gift className="w-3.5 h-3.5" />
                        Redeem with Tokens
                      </>
                    ) : (
                      `Need ${itemObj.coinCost - coins} more Coins`
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Explain: Universal Menu Coins Valuation Guide */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-850 p-6 md:p-8 rounded-3xl" id="rewards-guide">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          General Menu Coins integration rules
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
          <div className="space-y-3.5 text-xs text-slate-400 text-left">
            <p>
              Did you know? <strong className="text-orange-400">Any menu item in our app can be claimed for free</strong> with coins if your balance permits. Check any standard restaurant card, and select our &quot;Redeem with Coins&quot; option.
            </p>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-850 space-y-2 font-mono">
              <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-500 text-[10px]">
                <span>{currency === 'USD' ? 'USD_VALUE' : `${currency}_VALUE`}</span>
                <span>REQUIRED COINS</span>
              </div>
              <div className="flex justify-between text-slate-350 text-[11px]">
                <span>{formatPrice(4)} Appetizer/Drink</span>
                <span className="text-orange-400">🪙 100 Coins</span>
              </div>
              <div className="flex justify-between text-slate-350 text-[11px]">
                <span>{formatPrice(10)} Classic Entree</span>
                <span className="text-orange-400">🪙 250 Coins</span>
              </div>
              <div className="flex justify-between text-slate-350 text-[11px]">
                <span>{formatPrice(20)} Signature Premium Feast</span>
                <span className="text-orange-400">🪙 500 Coins</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-400 text-left flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-200">How to unlock/accumulate fast:</h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>Receive <span className="text-slate-100 font-semibold">50 Coins bonus</span> on every 2 checkouts automatically!</li>
                <li>Watch out for special VIP events which boost rewards on specific categories.</li>
                <li>Participate in community polls to secure quick code multipliers.</li>
              </ul>
            </div>
            
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="mt-4 px-5 py-2.5 bg-slate-905 hover:bg-slate-800 text-slate-305 border border-slate-850 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer self-start"
            >
              Back to Restaurants List
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
