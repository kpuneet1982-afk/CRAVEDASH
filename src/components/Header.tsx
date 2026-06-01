/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ShoppingBag, Bell, Crown, Heart, Navigation, ChevronRight, Check, Globe, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LANGUAGES, CURRENCIES } from '../translations';

// @ts-ignore
import logoPath from '../assets/images/cravedash_logo_1780283742181.png';
// @ts-ignore
import coinPath from '../assets/images/crave_dash_token_1780284136576.png';

export default function Header() {
  const {
    cart,
    vip,
    notifications,
    markNotificationsRead,
    setCurrentView,
    currentView,
    activeOrder,
    addNotification,
    coins,
    language,
    currency,
    setLanguage,
    setCurrency,
    t,
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900 px-4 py-3 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo & Interactive Home Trigger */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="header-brand"
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-orange-950/50 shadow-md border border-orange-850/30">
            <img 
              src={logoPath} 
              alt="CraveDash App Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-xl font-sans font-bold tracking-tight bg-gradient-to-r from-orange-400 via-rose-500 to-amber-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              CraveDash
            </h1>
            <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Navigation className="w-2.5 h-2.5 text-rose-500 animate-pulse" />
              San Francisco, CA
            </p>
          </div>
        </div>

        {/* Middle Navigation Option Badges */}
        <div className="hidden md:flex items-center gap-5">
          <button 
            type="button"
            id="nav-home"
            onClick={() => setCurrentView('home')}
            className={`text-sm font-medium transition-colors cursor-pointer hover:text-orange-400 ${
              currentView === 'home' ? 'text-orange-400 border-b-2 border-orange-500 pb-1' : 'text-slate-300'
            }`}
          >
            {t('nav.home', 'Explore Restaurants')}
          </button>
          
          <button 
            type="button"
            id="nav-vip"
            onClick={() => setCurrentView('vip')}
            className={`text-sm font-medium transition-colors cursor-pointer hover:text-amber-400 flex items-center gap-1.5 ${
              currentView === 'vip' ? 'text-amber-400 border-b-2 border-amber-500 pb-1' : 'text-slate-300'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400" />
            {t('nav.vip', 'VIP Club')}
          </button>

          <button 
            type="button"
            id="nav-rewards"
            onClick={() => setCurrentView('rewards')}
            className={`text-sm font-medium transition-colors cursor-pointer hover:text-orange-400 flex items-center gap-1.5 ${
              currentView === 'rewards' ? 'text-orange-400 border-b-2 border-orange-500 pb-1' : 'text-slate-300'
            }`}
          >
            <img 
              src={coinPath} 
              alt="Crave Token Logo"
              className="w-4 h-4 rounded-full object-cover shadow-sm animate-pulse"
              referrerPolicy="no-referrer"
            />
            {t('nav.tokens', 'Crave Tokens')}
          </button>

          {activeOrder && (
            <button 
              type="button"
              id="nav-track"
              onClick={() => setCurrentView('tracker')}
              className={`text-sm font-medium px-3 py-1 rounded-full text-rose-400 bg-rose-950/35 border border-rose-900/40 hover:bg-rose-950/60 flex items-center gap-1.5 animate-pulse cursor-pointer`}
            >
              {t('nav.tracker', 'Track Order')} ({activeOrder.status})
            </button>
          )}
        </div>

        {/* Right Side Controls: Notifications, VIP Badge, and Cart Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Crave Tokens Balance Header Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('rewards')}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-amber-450 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono font-bold shadow-lg cursor-pointer transition-all"
            title="Crave Tokens Reward Area"
            id="header-coins-badge"
          >
            <img 
              src={coinPath} 
              alt="Token logo"
              className="w-4 h-4 rounded-full object-cover animate-spin-slow"
              referrerPolicy="no-referrer"
            />
            <span className="hidden md:inline text-[10px] text-slate-400 tracking-wide font-sans font-medium">{t('header.tokens', 'Tokens:')}</span>
            <span className="text-orange-400 font-bold">{coins}</span>
          </motion.div>
          
          {/* VIP Badge Banner */}
          <div 
            onClick={() => setCurrentView('vip')} 
            className="cursor-pointer group flex items-center gap-2"
          >
            {vip.isVIP ? (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-700 text-slate-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-amber-950/40 relative overflow-hidden"
              >
                <Crown className="w-3.5 h-3.5 animate-bounce fill-slate-950" />
                <span>VIP {vip.tier}</span>
                <span className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
              </motion.div>
            ) : (
              <button 
                type="button"
                id="join-vip-badge"
                className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                <Crown className="w-3.5 h-3.5 text-slate-400" />
                Go VIP
              </button>
            )}
          </div>

          {/* Settings Trigger */}
          <div className="relative">
            <button
              type="button"
              id="settings-dropdown-btn"
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotifMenu(false);
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 relative border border-slate-850 cursor-pointer flex items-center gap-1.5 transition-all"
              title="Change Language & Currency"
            >
              <Globe className="w-5 h-5 text-orange-400" />
              <span className="hidden sm:inline text-xs font-mono font-bold leading-none uppercase">
                {language === 'en' ? '🇺🇸' : language === 'es' ? '🇪🇸' : language === 'fr' ? '🇫🇷' : language === 'de' ? '🇩🇪' : language === 'hi' ? '🇮🇳' : '🇯🇵'} {currency}
              </span>
            </button>

            {/* Settings Menu Dropdown */}
            <AnimatePresence>
              {showSettings && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setShowSettings(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-72 md:w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 p-4 text-slate-200"
                  >
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800">
                      <Settings className="w-4 h-4 text-orange-500 animate-spin-slow animate-pulse" />
                      <div>
                        <h4 className="font-sans font-bold text-sm tracking-tight">{t('settings.title', 'Localization Settings')}</h4>
                        <p className="text-[10px] text-slate-400 font-mono tracking-wide">{t('settings.global', 'Global Delivery Mode')}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Language Select */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                          <span>🌐</span> {t('settings.language', 'App Language')}
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              type="button"
                              onClick={() => {
                                setLanguage(lang.code);
                                addNotification(
                                  lang.code === 'en' ? 'Language Switched' : lang.code === 'es' ? 'Idioma cambiado' : lang.code === 'fr' ? 'Langue modifiée' : lang.code === 'de' ? 'Sprache geändert' : lang.code === 'hi' ? 'भाषा बदली गई' : '言語切り替え',
                                  `App environment translated successfully to ${lang.label}!`,
                                  'system'
                                );
                              }}
                              className={`px-2.5 py-1.5 rounded-lg border text-xs text-left font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                                language === lang.code
                                  ? 'bg-orange-600/20 border-orange-500 text-orange-400 font-semibold'
                                  : 'bg-slate-950/50 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-300'
                              }`}
                            >
                              <span>{lang.flag}</span>
                              <span className="truncate">{lang.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Currency Select */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                          <span>💳</span> {t('settings.currency', 'App Currency')}
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {Object.values(CURRENCIES).map((curr) => (
                            <button
                              key={curr.code}
                              type="button"
                              onClick={() => {
                                setCurrency(curr.code);
                                addNotification(
                                  'Currency Configured',
                                  `Pricing layout converted to ${curr.code} (${curr.symbol}).`,
                                  'system'
                                );
                              }}
                              className={`px-2 py-1.5 rounded-lg border text-[11px] font-mono font-bold text-center flex flex-col justify-center items-center gap-0.5 transition-all cursor-pointer ${
                                currency === curr.code
                                  ? 'bg-gradient-to-r from-orange-600/20 to-amber-500/20 border-orange-500 text-orange-400'
                                  : 'bg-slate-950/50 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <span className="text-sm">{curr.symbol}</span>
                              <span className="text-[10px] text-slate-500">{curr.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                      <p className="text-[9px] text-slate-500 leading-relaxed font-mono">
                        {t('footer.disclaimer', 'Standardized conversion rates apply globally.')}
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              type="button"
              id="notif-bell-btn"
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                if (!showNotifMenu) markNotificationsRead();
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 relative border border-slate-850 cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Notification Box */}
            <AnimatePresence>
              {showNotifMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-transparent" 
                    onClick={() => setShowNotifMenu(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3 w-80 max-h-96 overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 py-2 text-slate-200"
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
                      <h4 className="font-sans font-semibold text-sm">System Alerts</h4>
                      <span className="text-[10px] font-mono text-amber-500">Live Status Notifications</span>
                    </div>

                    <div className="divide-y divide-slate-850/80 max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-25" />
                          No recent push alerts.
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-3 text-xs transition-colors hover:bg-slate-850/50 ${
                              !notif.read ? 'bg-slate-850/20' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-slate-300">
                                {notif.title}
                              </span>
                              <span className="text-[9px] text-slate-500 font-mono flex-shrink-0">
                                {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                              {notif.body}
                            </p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="px-4 py-1.5 border-t border-slate-800 bg-slate-950/40 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          markNotificationsRead();
                          setShowNotifMenu(false);
                        }}
                        className="text-[10px] text-orange-400 hover:text-orange-300 font-medium"
                      >
                        Acknowledge & Close All Alerts
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Basket Indicator with Count */}
          <button
            type="button"
            id="header-cart-btn"
            onClick={() => {
              if (cart.length > 0) {
                setCurrentView('checkout');
              } else {
                addNotification('Your Basket is Empty!', 'Select some delicious entrees first to checkout.', 'system');
              }
            }}
            className={`p-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all ${
              cart.length > 0 
                ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md' 
                : 'bg-slate-900 border border-slate-850 text-slate-400'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="text-xs font-bold font-mono px-1">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
