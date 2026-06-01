/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../AppContext';
import { Crown, CheckCircle2, ShieldCheck, Sparkles, Award, Star, TrendingUp, Handshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function VIPOffers() {
  const { vip, joinVIP, addNotification, setCurrentView, formatPrice, t } = useApp();

  const TIERS = [
    {
      id: 'Silver' as const,
      name: 'Silver Elite',
      price: `${formatPrice(4.99)} / ${t('vip.mo', 'mo')}`,
      discount: '10% Storewide Discount',
      delivery: `Free Delivery on orders above ${formatPrice(15)}`,
      badgeColor: 'text-slate-400',
      borderColor: 'border-slate-800',
      bgColor: 'bg-slate-900/35',
      accentColor: 'from-slate-400 to-slate-600',
      perks: [
        '10% off final bill on all restaurants',
        `Free delivery above ${formatPrice(15)} limit`,
        'Standard live order GPS tracking',
        'Priority restaurant support channel',
      ],
    },
    {
      id: 'Gold' as const,
      name: 'Gold Supremacy',
      price: `${formatPrice(9.99)} / ${t('vip.mo', 'mo')}`,
      discount: '15% Storewide Discount',
      delivery: 'Absolute Free Delivery (No Minimum)',
      badgeColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-gradient-to-br from-slate-900 to-amber-950/20',
      accentColor: 'from-amber-400 via-yellow-500 to-amber-600',
      popular: true,
      perks: [
        '15% off final bill on all restaurants',
        `Absolute ${formatPrice(0)} delivery fees on everything`,
        'Priority live order GPS routing',
        'Exclusive premium member menus access',
        'Monthly gourmet dessert companion gift',
      ],
    },
    {
      id: 'Platinum' as const,
      name: 'Platinum Overlord',
      price: `${formatPrice(19.99)} / ${t('vip.mo', 'mo')}`,
      discount: '20% Storewide Discount',
      delivery: 'Absolute Free Delivery + Instant Dispatch',
      badgeColor: 'text-violet-400',
      borderColor: 'border-violet-500/30',
      bgColor: 'bg-gradient-to-br from-slate-900 to-violet-950/20',
      accentColor: 'from-violet-400 via-fuchsia-500 to-indigo-650',
      perks: [
        '20% off final bill on all restaurants',
        `Absolute ${formatPrice(0)} delivery fees on everything`,
        'Supercharged live dispatch courier priority',
        'Complimentary Michelin-featured sides bonus',
        'Dedicated 24/7 VIP personal butler helpdesk',
      ],
    },
  ];

  const handleJoinTier = (tierId: 'Silver' | 'Gold' | 'Platinum') => {
    joinVIP(tierId);
    addNotification('👑 Tier Upgraded!', `Congratulations on unlocking CraveDash VIP ${tierId}. Good cuisine starts now.`, 'vip_benefit');
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. VIP Club Hero Pitch Block */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-900/40 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-amber-400 bg-amber-950/30 rounded-full border border-amber-500/30 uppercase font-mono">
            <Crown className="w-3.5 h-3.5 fill-amber-500/10 animate-bounce" />
            CraveDash Exclusive VIP Lounge
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Unlock Unlimited Culinary Freedom
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Stop worrying about delivery fees and final receipts. Join our supreme loyalty circle to enjoy absolute $0.00 courier delivery and exclusive discount matrices across San Francisco.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <span className="text-2xl text-amber-500">🛵</span>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500">Delivery</span>
                <p className="text-xs font-bold text-slate-200">Unlimited Free Courier</p>
              </div>
            </div>
            <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <span className="text-2xl text-amber-500">🏷️</span>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500">Discounts</span>
                <p className="text-xs font-bold text-slate-200">Save up to 20% Off</p>
              </div>
            </div>
            <div className="bg-slate-900/80 px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
              <span className="text-2xl text-amber-500">🥇</span>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500">Services</span>
                <p className="text-xs font-bold text-slate-200">Priority Dispatch Fast</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Registered Loyalty Status Panel */}
      {vip.isVIP && (
        <div className="bg-gradient-to-r from-slate-900 to-amber-950/20 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-amber-400 to-yellow-600 p-3 rounded-2xl shadow-lg border border-yellow-350">
              <Award className="w-8 h-8 text-slate-950 fill-slate-950/10" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Account Loyalty Verified</span>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Active Member Level: <span className="text-amber-500">{vip.tier}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Premium benefits valid through next renewal cycle.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 text-center min-w-[120px]">
              <span className="text-[10px] font-mono uppercase text-slate-550 block">Savings Total</span>
              <span className="text-base font-bold font-mono text-emerald-400">{formatPrice(vip.savingsTotal)}</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 text-center min-w-[120px]">
              <span className="text-[10px] font-mono uppercase text-slate-550 block">Special Perk</span>
              <span className="text-xs font-bold text-slate-200">VIP Help Desk</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Three Tiers Comparison grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-sans font-bold text-slate-100 flex items-center gap-2">
          🏆 Select Your VIP Membership Circle
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => {
            const isCurrentlyActive = vip.isVIP && vip.tier === tier.id;

            return (
              <div
                key={tier.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between h-full relative transition-all duration-300 ${tier.bgColor} ${tier.borderColor} ${
                  tier.popular ? 'shadow-2xl shadow-amber-950/20 scale-103' : 'shadow-lg hover:shadow-2xl'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 text-[9px] font-bold tracking-wider font-mono px-3 py-1 rounded-full shadow-md uppercase">
                    Host Recommendation
                  </span>
                )}

                <div>
                  {/* Title and pricing tag */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-850 pb-4 mb-4">
                    <div>
                      <h4 className={`text-base font-bold ${tier.badgeColor} flex items-center gap-1.5`}>
                        <Crown className="w-4 h-4" />
                        {tier.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">{tier.discount}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-white font-mono">{tier.price}</span>
                      <span className="text-[9px] text-slate-500 block">per month</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Join bottom Button triggers */}
                <div className="pt-6">
                  {isCurrentlyActive ? (
                    <div className="w-full text-center py-2.5 bg-emerald-950/30 text-emerald-400 font-semibold text-xs rounded-xl border border-emerald-900/40">
                      ✓ Your Active Circle Plan
                    </div>
                  ) : (
                    <button
                      type="button"
                      id={`join-vip-${tier.id}`}
                      onClick={() => handleJoinTier(tier.id)}
                      className={`w-full py-3 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                        tier.popular
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 shadow-md shadow-amber-950/50'
                          : 'bg-slate-950 hover:bg-slate-850 text-slate-300 border border-slate-800'
                      }`}
                    >
                      Unlock Tier Now
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Contact Trust Seal layout */}
      <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <Handshake className="w-8 h-8 text-orange-500" />
          <div>
            <h4 className="text-xs font-bold text-slate-200">Secure Cancellation Commitment</h4>
            <p className="text-[11px] text-slate-500">Can cease or downgrade subscription at any frame in settings menu. No obligations.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="text-xs text-orange-400 hover:text-orange-300 font-semibold cursor-pointer whitespace-nowrap"
        >
          Explore Food Spots
        </button>
      </div>

    </div>
  );
}
