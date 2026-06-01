/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ShoppingBag, ChevronLeft, CreditCard, ShieldCheck, Truck, Sparkles, Crown, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CheckoutGateway() {
  const {
    cart,
    currentRestaurant,
    setCurrentView,
    updateQuantity,
    removeFromCart,
    vip,
    joinVIP,
    getCartSubtotal,
    getCartDeliveryFee,
    getCartDiscount,
    getCartTotal,
    placeOrder,
    formatPrice,
    t,
  } = useApp();

  // Mode Selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay' | 'paypal'>('card');
  const [deliveryAddress, setDeliveryAddress] = useState('142 Transbay Boulevard, Penthouse B, San Francisco');
  
  // Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Simulation parameters
  const [gatewayProcessing, setGatewayProcessing] = useState(false);
  const [gatewayStep, setGatewayStep] = useState('');

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-sm mx-auto">
        <ShoppingBag className="w-16 h-16 text-slate-700 stroke-1 animate-bounce mb-4" />
        <h3 className="text-xl font-bold text-slate-200">Your basket is feeling light</h3>
        <p className="text-xs text-slate-500 mt-2">Explore local premium eateries and select your favorite entrees to fill up.</p>
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  // Derive card issuer logo/brand dynamically based on input digits
  const getCardType = () => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'Mastercard';
    if (cardNumber.startsWith('37') || cardNumber.startsWith('34')) return 'Amex';
    return 'Generic';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic automatic space format styling: xxxx xxxx xxxx xxxx
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.substring(0, 16);
    const parts = [];
    for (let i = 0; i < val.length; i += 4) {
      parts.push(val.substring(i, i + 4));
    }
    setCardNumber(parts.join(' '));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // format expiration date MM/YY
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.substring(0, 4);
    if (val.length > 2) {
      setCardExpiry(`${val.substring(0, 2)}/${val.substring(2)}`);
    } else {
      setCardExpiry(val);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) return;

    // Trigger highly interactive multi-step gateway validation simulation!
    setGatewayProcessing(true);
    setGatewayStep('🔐 Initializing SSL Encrypted Handshake...');

    setTimeout(() => {
      setGatewayStep(`🔄 Routing payment token to CravePay Secure Vault...`);
    }, 1500);

    setTimeout(() => {
      if (paymentMethod === 'card') {
        setGatewayStep(`💳 Authorizing direct funds with local bank issuer (${getCardType()})...`);
      } else {
        setGatewayStep(`📲 Authenticating secure third-party digital wallet credentials...`);
      }
    }, 3000);

    setTimeout(() => {
      setGatewayStep('✅ Certification Approved! Vaulted.');
    }, 4500);

    setTimeout(() => {
      setGatewayProcessing(false);
      // Place actual order structure inside AppState
      placeOrder(deliveryAddress, paymentMethod.toUpperCase());
    }, 5500);
  };

  const subtotal = getCartSubtotal();
  const deliveryFee = getCartDeliveryFee(currentRestaurant);
  const discount = getCartDiscount();
  const total = getCartTotal(currentRestaurant);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Back button */}
      <button
        type="button"
        onClick={() => setCurrentView(currentRestaurant ? 'restaurant' : 'home')}
        className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm font-medium group cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Return to Menu Selection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side (8 cols): Order breakdown, Address Selection, and Secure Payment Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Order Basket Summary Card */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              Entree Inventory ({cart.length} items)
            </h3>

            <div className="divide-y divide-slate-850">
              {cart.map((item) => (
                <div key={item.id} className="py-3.5 flex justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{item.name}</h4>
                      
                      {/* Selected choices */}
                      {Object.keys(item.selectedOptions).length > 0 && (
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {Object.entries(item.selectedOptions)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(', ')}
                        </p>
                      )}

                      {item.instructions && (
                        <p className="text-[10px] text-orange-400 italic mt-0.5">
                          💡 "{item.instructions}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pricing adjustment block */}
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">{formatPrice(item.price * item.quantity)}</span>
                    
                    {/* Qty modifiers */}
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-850 px-2 py-0.5 rounded-lg mt-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-xs text-slate-400 hover:text-slate-200"
                      >
                        -
                      </button>
                      <span className="text-[11px] font-bold font-mono text-slate-300">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-xs text-slate-400 hover:text-slate-200"
                      >
                        +
                      </button>
                      <button 
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-slate-500 hover:text-rose-400 ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Address Input */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-400" />
              Delivery Destination (San Francisco)
            </h3>
            <input
              type="text"
              id="delivery-address-input"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your exact street address..."
              required
              className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs text-slate-205 focus:outline-none focus:border-red-550 transition-colors"
            />
          </div>

          {/* Secure Payment Gateway Selectors */}
          <div className="bg-slate-900/50 border border-slate-900 rounded-3xl p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-base text-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Secure Checkout Gateway
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">100% encrypted checkout connection with 3D Secure 2.0 validation</p>
            </div>

            {/* Selector list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                id="pay-card"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-orange-650/15 border-orange-500 text-orange-400 font-bold'
                    : 'bg-slate-950 border-slate-850 hover:bg-slate-950 text-slate-400 hover:text-slate-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px]">Credit Card</span>
              </button>

              <button
                type="button"
                id="pay-applepay"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'applepay'
                    ? 'bg-orange-650/15 border-orange-500 text-orange-400 font-bold'
                    : 'bg-slate-950 border-slate-850 hover:bg-slate-950 text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-sm font-semibold tracking-tight">🍎 Pay</span>
                <span className="text-[10px]">Apple Pay</span>
              </button>

              <button
                type="button"
                id="pay-googlepay"
                onClick={() => setPaymentMethod('googlepay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'googlepay'
                    ? 'bg-orange-650/15 border-orange-500 text-orange-400 font-bold'
                    : 'bg-slate-950 border-slate-850 hover:bg-slate-950 text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-sm font-bold text-sky-400 tracking-tight">G Pay</span>
                <span className="text-[10px]">Google Pay</span>
              </button>

              <button
                type="button"
                id="pay-paypal"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  paymentMethod === 'paypal'
                    ? 'bg-orange-650/15 border-orange-500 text-orange-400 font-bold'
                    : 'bg-slate-950 border-slate-850 hover:bg-slate-950 text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-xs font-serif font-black italic text-blue-400">PayPal</span>
                <span className="text-[10px]">Digital Wallet</span>
              </button>
            </div>

            {/* Dynamic input form depending on payment selector */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-2">
              <AnimatePresence mode="wait">
                {paymentMethod === 'card' ? (
                  <motion.div
                    key="card-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Animated Credit Card visualization */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-5 rounded-2xl relative shadow-2xl text-slate-100 font-mono select-none overflow-hidden max-w-sm mx-auto">
                      {/* Logo corner */}
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold font-sans tracking-wide text-orange-500 italic">CravePay SecuVault</span>
                        <div className="bg-slate-850 px-2 py-0.5 rounded text-[10px]">
                          {getCardType() === 'Visa' && <span className="text-sky-400 font-bold">VISA</span>}
                          {getCardType() === 'Mastercard' && <span className="text-amber-500 font-bold">MC</span>}
                          {getCardType() === 'Amex' && <span className="text-emerald-400 font-bold">AMEX</span>}
                          {getCardType() === 'Generic' && <span className="text-slate-400">CREDIT</span>}
                        </div>
                      </div>

                      {/* Golden chip image marker */}
                      <div className="w-10 h-7 rounded-md bg-amber-500/20 border border-amber-500/40 mb-4 flex items-center justify-center">
                        <div className="grid grid-cols-3 w-5 h-4 gap-0.5 opacity-50">
                          <div className="border border-slate-300" />
                          <div className="border border-slate-300" />
                          <div className="border border-slate-300" />
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="text-base font-bold tracking-widest text-slate-200 mb-4 font-mono">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[8px] text-slate-500 uppercase block">Card Holder</span>
                          <span className="text-xs font-bold text-slate-300 font-sans tracking-wide uppercase truncate max-w-[150px] inline-block">
                            {cardHolder || 'CHEF CRAVE'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-500 uppercase block">Expires</span>
                          <span className="text-xs font-bold text-slate-300 font-mono">
                            {cardExpiry || 'MM/YY'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-500 uppercase block">CVV</span>
                          <span className="text-xs font-bold text-slate-30a font-mono">
                            {cardCvv || '•••'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Inputs panel */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono mb-1.5 block">Card Number</label>
                        <input
                          type="text"
                          id="card-number-input"
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          required
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-orange-500 text-slate-300"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono mb-1.5 block">Card Holder Name</label>
                        <input
                          type="text"
                          id="card-holder-input"
                          placeholder="E.g., Chef Jane Doe"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          required
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-orange-500 text-slate-300"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono mb-1.5 block">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          id="card-expiry-input"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          required
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-orange-500 text-slate-303"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono mb-1.5 block">CVV</label>
                        <input
                          type="password"
                          id="card-cvv-input"
                          placeholder="•••"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          required
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-orange-500 text-slate-303"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wallet-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 border border-dashed border-slate-800 rounded-2xl text-center bg-slate-950/40"
                  >
                    <span className="text-3xl">📱</span>
                    <h3 className="text-xs text-slate-300 font-bold mt-2">
                      Digital Wallet Mode Enabled via {paymentMethod.toUpperCase()}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                      Biometric credentialing (FaceID or Fingerprint) will securely approve the transaction at the next frame. No card number is exposed.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secure Checkout button */}
              <button
                type="submit"
                id="sumbit-checkout-payment"
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-950/50 mt-4 flex items-center justify-center gap-2 cursor-pointer btn-payment"
              >
                <span>Authorize & Pay Securely</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side (5 cols): Dynamic price offset totals list + VIP Pitch */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Detailed Pricing summary card */}
          <div className="bg-slate-900/50 border border-slate-900 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider font-mono text-slate-400">{t('checkout.bill_breakdown', 'Bill Breakdown')}</h3>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">{t('checkout.subtotal', 'Basket Subtotal')}</span>
                <span className="font-mono text-slate-205">{formatPrice(subtotal)}</span>
              </div>

              {/* Delivery Cost */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">{t('checkout.delivery_fee', 'Delivery Fee')}</span>
                {vip.isVIP ? (
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Crown className="w-3 h-3 text-emerald-500" />
                    {formatPrice(0)} VIP Free
                  </span>
                ) : (
                  <span className="font-mono text-slate-205">{formatPrice(deliveryFee)}</span>
                )}
              </div>

              {/* VIP Discount */}
              {vip.isVIP && (
                <div className="flex justify-between items-center text-xs bg-amber-950/20 border border-amber-900/30 p-2 rounded-lg text-amber-400">
                  <span className="flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 fill-amber-500/10" />
                    {t('checkout.vip_discount', 'VIP Discount')} ({vip.tier === 'Platinum' ? '20%' : vip.tier === 'Gold' ? '15%' : '10%'})
                  </span>
                  <span className="font-mono font-bold">-{formatPrice(discount)}</span>
                </div>
              )}

              {/* Secure tax simulation */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">{t('checkout.tax', 'Local Chef & Tax')}</span>
                <span className="font-mono text-slate-205">{formatPrice(subtotal * 0.0825)}</span>
              </div>

              <div className="h-px bg-slate-850 my-2" />

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                <span className="text-xs font-bold text-slate-300">{t('checkout.total', 'Total Charged Funds')}</span>
                <span className="text-base font-bold font-mono text-orange-400 bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  {formatPrice(total + subtotal * 0.0825)}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive VIP Proposal box */}
          {!vip.isVIP && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-900/40 rounded-3xl p-6 relative overflow-hidden text-slate-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
              <div className="flex items-start gap-4">
                <div className="bg-amber-500/15 p-2 rounded-xl border border-amber-500/20">
                  <Crown className="w-6 h-6 text-amber-400 animate-pulse fill-amber-500/20" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-yellow-100 flex items-center gap-1.5">
                    Unlock CraveDash VIP Club
                    <span className="text-[8px] bg-amber-500 text-slate-950 font-bold px-1 rounded">HOT DEAL</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-sm leading-relaxed">
                    Instantly save <span className="font-bold text-amber-400">{formatPrice(deliveryFee)}</span> in delivery fee and get <span className="font-bold text-amber-400">15% off</span> today’s meal automatically. Make the smart culinary decision!
                  </p>
                  
                  {/* Join buttons */}
                  <div className="flex gap-2.5 mt-4">
                    <button
                      type="button"
                      onClick={() => joinVIP('Gold')}
                      className="text-[10px] font-bold px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-slate-950 rounded-lg cursor-pointer"
                    >
                      Join VIP Gold ($9.99/mo)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentView('vip')}
                      className="text-[10px] text-slate-400 hover:text-slate-300 font-medium py-2 self-center cursor-pointer"
                    >
                      View More Tiers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIP Loyal metrics */}
          {vip.isVIP && (
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 text-slate-300">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-amber-400 animate-bounce fill-amber-500/10" />
                <div>
                  <h4 className="text-xs font-bold text-slate-100">VIP {vip.tier} Level Active</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Your loyal VIP membership has saved you <span className="font-semibold text-emerald-400">$32.10</span> this month!</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Gateway processing Loading Backdrop modal overlay */}
      <AnimatePresence>
        {gatewayProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-sm text-center space-y-5"
            >
              <div className="relative w-16 h-16 mx-auto">
                <Loader2 className="w-16 h-16 text-orange-500 stroke-1 animate-spin" />
                <ShieldCheck className="w-6 h-6 text-emerald-500 absolute inset-0 m-auto" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-100">CraveDash Secure Gateway</h4>
                <p className="text-[11px] font-mono text-amber-500 animate-pulse">{gatewayStep}</p>
              </div>
              <p className="text-[11px] text-slate-500">
                Please do not close this frame or refresh. Transferring funds securely using SHA-256 secure protocols...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
