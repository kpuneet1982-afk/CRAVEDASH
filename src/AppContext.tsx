/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Restaurant, ActiveOrder, VIPStatus, PushNotification, MenuItem, OrderStatus } from './types';
import { MOCK_DRIVERS, RESTAURANTS } from './data';
import { LanguageCode, CurrencyCode, CURRENCIES, TRANSLATIONS } from './translations';

interface AppContextProps {
  cart: CartItem[];
  vip: VIPStatus;
  activeOrder: ActiveOrder | null;
  notifications: PushNotification[];
  currentRestaurant: Restaurant | null;
  currentView: 'home' | 'restaurant' | 'checkout' | 'tracker' | 'vip' | 'rewards';
  setCurrentRestaurant: (rest: Restaurant | null) => void;
  setCurrentView: (view: 'home' | 'restaurant' | 'checkout' | 'tracker' | 'vip' | 'rewards') => void;
  addToCart: (item: MenuItem, selectedOptions: { [key: string]: string }, qty: number, instructions?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  joinVIP: (tier: 'Silver' | 'Gold' | 'Platinum') => void;
  placeOrder: (address: string, paymentMethod: string) => void;
  dismissOrder: () => void;
  addNotification: (title: string, body: string, type: 'order_update' | 'vip_benefit' | 'promo' | 'system') => void;
  markNotificationsRead: () => void;
  getCartSubtotal: () => number;
  getCartDeliveryFee: (restaurant: Restaurant | null) => number;
  getCartDiscount: () => number;
  getCartTotal: (restaurant: Restaurant | null) => number;
  
  // Coin related state & operations
  coins: number;
  purchaseCount: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addRedeemedItemToCart: (item: MenuItem, coinCost: number, selectedOptions?: { [key: string]: string }, qty?: number) => void;

  // International settings & formatters
  language: LanguageCode;
  currency: CurrencyCode;
  setLanguage: (lang: LanguageCode) => void;
  setCurrency: (curr: CurrencyCode) => void;
  formatPrice: (priceUSD: number) => string;
  t: (key: string, defaultText?: string) => string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [vip, setVip] = useState<VIPStatus>(() => {
    const saved = localStorage.getItem('cravedash_vip_status');
    return saved ? JSON.parse(saved) : { isVIP: false, savingsTotal: 0, tier: 'Silver' };
  });
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [currentRestaurant, setCurrentRestaurantState] = useState<Restaurant | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'restaurant' | 'checkout' | 'tracker' | 'vip' | 'rewards'>('home');

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('cravedash_coins');
    return saved !== null ? Number(saved) : 150; // default 150 starter coins
  });
  const [purchaseCount, setPurchaseCount] = useState<number>(() => {
    const saved = localStorage.getItem('cravedash_purchase_count');
    return saved !== null ? Number(saved) : 0;
  });

  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('cravedash_language');
    return (saved as LanguageCode) || 'en';
  });
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('cravedash_currency');
    return (saved as CurrencyCode) || 'USD';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('cravedash_language', lang);
  };

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    localStorage.setItem('cravedash_currency', curr);
  };

  const formatPrice = (priceUSD: number): string => {
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = priceUSD * config.rate;
    // For Japanese Yen (JPY), we do round-off; else 2 decimal points
    const formattedVal = config.code === 'JPY' ? Math.round(converted).toLocaleString() : converted.toFixed(2);
    if (config.prefix) {
      return `${config.symbol}${formattedVal}`;
    }
    return `${formattedVal} ${config.symbol}`;
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || defaultText || key;
  };

  // Persist Coins and Purchase Count
  useEffect(() => {
    localStorage.setItem('cravedash_coins', String(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('cravedash_purchase_count', String(purchaseCount));
  }, [purchaseCount]);

  // Custom setter to change view based on restaurant selection
  const setCurrentRestaurant = (rest: Restaurant | null) => {
    setCurrentRestaurantState(rest);
    if (rest) {
      setCurrentView('restaurant');
    } else {
      setCurrentView('home');
    }
  };

  // Persists VIP Status
  useEffect(() => {
    localStorage.setItem('cravedash_vip_status', JSON.stringify(vip));
  }, [vip]);

  // Helper calculation functions
  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartDeliveryFee = (rest: Restaurant | null) => {
    if (!rest) return 0;
    // VIP members enjoy FREE delivery on all orders!
    return vip.isVIP ? 0.00 : rest.deliveryFee;
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    // VIP tier discounts: Silver = 10%, Gold = 15%, Platinum = 20%
    if (!vip.isVIP) return 0;
    const rate = vip.tier === 'Platinum' ? 0.20 : vip.tier === 'Gold' ? 0.15 : 0.10;
    return subtotal * rate;
  };

  const getCartTotal = (rest: Restaurant | null) => {
    const subtotal = getCartSubtotal();
    const delivery = getCartDeliveryFee(rest);
    const discount = getCartDiscount();
    return Math.max(0, subtotal + delivery - discount);
  };

  // Add notification routine
  const addNotification = (
    title: string,
    body: string,
    type: 'order_update' | 'vip_benefit' | 'promo' | 'system'
  ) => {
    const newNotif: PushNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title,
      body,
      timestamp: new Date(),
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Handle audible/tactile simulation or play beautiful audio when a push occurs
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.3);
      oscillator.stop(audioCtx.currentTime + 0.31);
    } catch (e) {
      // Audio autoplay/init context blockers gracefully bypassed
    }
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Cart operations
  const addToCart = (
    item: MenuItem,
    selectedOptions: { [key: string]: string },
    qty: number,
    instructions?: string
  ) => {
    // Generate a unique card identifier based on item ID and selected custom choices
    const optionStr = Object.entries(selectedOptions)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const instanceId = `${item.id}-${optionStr}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === instanceId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: instanceId,
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: qty,
            selectedOptions,
            instructions,
          },
        ];
      }
    });

    addNotification(
      '🌟 Added to Basket',
      `Successfully added ${qty}x ${item.name} to your CraveDash cart!`,
      'system'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const target = prev.find((item) => item.id === cartItemId);
      if (target) {
        // notify removal
      }
      return prev.filter((item) => item.id !== cartItemId);
    });
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Join VIP tier program
  const joinVIP = (tier: 'Silver' | 'Gold' | 'Platinum') => {
    setVip({
      isVIP: true,
      since: new Date().toLocaleDateString(),
      savingsTotal: 25.40, // starter gift credit / initial savings
      tier,
    });
    addNotification(
      '🎉 Welcome to VIP Membership!',
      `You are now a ${tier} tier member. Enjoy FREE Delivery on all orders and immediate VIP Discounts!`,
      'vip_benefit'
    );
  };

  // Coin related state & operations
  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  const spendCoins = (amount: number): boolean => {
    if (coins < amount) {
      addNotification(
        '⚠️ Insufficient Coins',
        `This costs ${amount} Coins, but you only have ${coins} Coins. Keep ordering to collect more!`,
        'system'
      );
      return false;
    }
    setCoins((prev) => prev - amount);
    return true;
  };

  const addRedeemedItemToCart = (
    item: MenuItem,
    coinCost: number,
    selectedOptions: { [key: string]: string } = {},
    qty: number = 1
  ) => {
    if (coins < coinCost) {
      addNotification(
        '⚠️ Insufficient Coins',
        `Redemption costs ${coinCost} Coins, but you only have ${coins} Coins. Let's make more orders!`,
        'system'
      );
      return;
    }

    setCoins((prev) => prev - coinCost);

    const optionStr = Object.entries(selectedOptions)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const instanceId = `reward-${item.id}-${optionStr !== '' ? optionStr : Date.now()}`;

    const newItem: CartItem = {
      id: instanceId,
      menuItemId: item.id,
      name: `🎁 [REWARD] ${item.name}`,
      price: 0,
      image: item.image,
      quantity: qty,
      selectedOptions: optionStr !== '' ? selectedOptions : { "Reward": "Redeemed" },
      instructions: "Paid using Crave Dash Coins"
    };

    setCart((prev) => [...prev, newItem]);
    addNotification(
      '🌟 Reward Redeemed!',
      `Successfully added ${qty}x "🎁 ${item.name}" to your basket of free items!`,
      'promo'
    );
    setCurrentView('checkout');
  };

  // Place Order integration with real-time order tracking simulation
  const placeOrder = (address: string, paymentMethod: string) => {
    if (!currentRestaurant) return;

    const subtotal = getCartSubtotal();
    const delivery = getCartDeliveryFee(currentRestaurant);
    const discount = getCartDiscount();
    const finalTotal = getCartTotal(currentRestaurant);

    const orderId = `CRAVE-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomDriverIdx = Math.floor(Math.random() * MOCK_DRIVERS.length);
    const driverTemplate = MOCK_DRIVERS[randomDriverIdx];

    const newOrder: ActiveOrder = {
      id: orderId,
      restaurantId: currentRestaurant.id,
      restaurantName: currentRestaurant.name,
      items: [...cart],
      subtotal,
      deliveryFee: delivery,
      discount,
      total: finalTotal,
      status: 'Placed',
      paymentMethod,
      deliveryAddress: address,
      driver: { ...driverTemplate },
      eta: currentRestaurant.deliveryTime,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveOrder(newOrder);
    clearCart();
    setCurrentView('tracker');
    addNotification(
      '🍔 CraveDash Order Placed!',
      `Order ${orderId} has been securely processed ($${finalTotal.toFixed(2)} via ${paymentMethod}).`,
      'order_update'
    );

    // Increment purchase counter for Coin reward program
    const newCount = purchaseCount + 1;
    setPurchaseCount(newCount);
    if (newCount % 2 === 0) {
      setCoins((c) => c + 50);
      addNotification(
        '🪙 Crave Dash Coin Streak!',
        `Sensational! You have completed 2 purchases. Collected 50 Crave Dash Coins!`,
        'promo'
      );
    } else {
      addNotification(
        '📈 Reward Progress Updated',
        `Complete 1 more order to collect your recurring +50 Crave Coins milestone!`,
        'promo'
      );
    }

    // Track total user savings if VIP
    if (vip.isVIP) {
      setVip((prev) => ({
        ...prev,
        savingsTotal: prev.savingsTotal + (delivery + discount),
      }));
    }
  };

  const dismissOrder = () => {
    setActiveOrder(null);
    setCurrentView('home');
  };

  // Timer simulation for Order status changes
  useEffect(() => {
    if (!activeOrder) return;

    let timer: NodeJS.Timeout;
    const stages: { status: OrderStatus; delay: number; title: string; body: string }[] = [
      {
        status: 'Preparing',
        delay: 10000, // 10 seconds
        title: '🍳 Kitchen Preparing Your Feast',
        body: `${activeOrder.restaurantName} is baking, rolling, and frying your delicious items right now!`,
      },
      {
        status: 'OutForDelivery',
        delay: 24000, // 24 seconds total from start
        title: '🛵 CraveDash Driver is En Route!',
        body: `${activeOrder.driver?.name} has safely secured your warm food and has started driving your way!`,
      },
      {
        status: 'Arrived',
        delay: 38000, // 38 seconds
        title: '🏁 Courier Has Arrived!',
        body: `${activeOrder.driver?.name} is arriving near ${activeOrder.deliveryAddress}. Grab the doorbell!`,
      },
      {
        status: 'Delivered',
        delay: 48000, // 48 seconds
        title: '😋 Feast Delivered Success!',
        body: `Order ${activeOrder.id} has been securely delivered. Indulge your cravings!`,
      },
    ];

    stages.forEach((stage) => {
      const remainingTime = stage.delay;
      timer = setTimeout(() => {
        setActiveOrder((prev) => {
          if (!prev || prev.id !== activeOrder.id) return prev;
          
          let newEta = prev.eta;
          if (stage.status === 'Preparing') newEta = Math.max(1, Math.round(prev.eta * 0.8));
          else if (stage.status === 'OutForDelivery') newEta = Math.max(1, Math.round(prev.eta * 0.4));
          else if (stage.status === 'Arrived') newEta = 1;
          else if (stage.status === 'Delivered') newEta = 0;

          return {
            ...prev,
            status: stage.status,
            eta: newEta,
          };
        });
        addNotification(stage.title, stage.body, 'order_update');
      }, remainingTime);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [activeOrder?.id]);

  return (
    <AppContext.Provider
      value={{
        cart,
        vip,
        activeOrder,
        notifications,
        currentRestaurant,
        currentView,
        setCurrentRestaurant,
        setCurrentView,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        joinVIP,
        placeOrder,
        dismissOrder,
        addNotification,
        markNotificationsRead,
        getCartSubtotal,
        getCartDeliveryFee,
        getCartDiscount,
        getCartTotal,
        coins,
        purchaseCount,
        addCoins,
        spendCoins,
        addRedeemedItemToCart,
        language,
        currency,
        setLanguage,
        setCurrency,
        formatPrice,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
