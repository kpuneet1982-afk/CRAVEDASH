/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
  customizationOptions?: {
    name: string;
    options: string[];
    required: boolean;
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number; // in mins
  deliveryFee: number;
  minOrder: number;
  image: string;
  bannerImage: string;
  featured: boolean;
  tags: string[];
  menu: MenuItem[];
}

export interface CartItem {
  id: string; // unique item instance id (including options)
  menuItemId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: { [optionName: string]: string };
  instructions?: string;
  isReward?: boolean;
  coinCost?: number;
}

export type OrderStatus = 'Placed' | 'Preparing' | 'OutForDelivery' | 'Arrived' | 'Delivered';

export interface Driver {
  name: string;
  avatar: string;
  phone: string;
  vehicle: string;
  rating: number;
  lat: number;
  lng: number;
}

export interface ActiveOrder {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: string;
  driver?: Driver;
  eta: number; // minutes left
  createdAt: string;
}

export interface VIPStatus {
  isVIP: boolean;
  since?: string;
  savingsTotal: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  type: 'order_update' | 'vip_benefit' | 'promo' | 'system';
  read: boolean;
}
