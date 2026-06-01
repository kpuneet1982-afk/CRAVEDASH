import { Restaurant } from './types';

export const CUISINES = [
  { id: 'all', name: '🍱 All Eats', icon: 'All' },
  { id: 'burgers', name: '🍔 Burgers & Grill', icon: 'Burger' },
  { id: 'pizza', name: '🍕 Woodfired Pizza', icon: 'Pizza' },
  { id: 'sushi', name: '🍣 Japanese & Sushi', icon: 'Sushi' },
  { id: 'healthy', name: '🥗 Healthy & Greens', icon: 'Salad' },
  { id: 'desserts', name: '🍰 Sweet Treats', icon: 'Cake' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest_1',
    name: 'Burger Craft & Co.',
    cuisine: 'American • Burgers • Grill',
    rating: 4.8,
    deliveryTime: 25,
    deliveryFee: 3.99,
    minOrder: 12.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tags: ['Best Seller', 'Free Delivery for VIP', 'Artisanal'],
    menu: [
      {
        id: 'menu_1_1',
        name: 'The Crave Signature Burger',
        description: 'Prime Angus beef patty, crispy applewood smoked bacon, double cheddar cheese, melted caramelized onions, & secret house glaze on a toasted brioche bun.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
        category: 'Signature Burgers',
        popular: true,
        customizationOptions: [
          {
            name: 'Doneness',
            options: ['Medium Rare', 'Medium', 'Well Done'],
            required: true,
          },
          {
            name: 'Extra Toppings',
            options: ['Double Cheese (+$1.50)', 'Avocado (+$2.00)', 'Fried Egg (+$1.50)', 'None'],
            required: false,
          },
        ],
      },
      {
        id: 'menu_1_2',
        name: 'Truffle Umami Fries',
        description: 'Golden-crisp hand-cut Russet potatoes tossed in black truffle oil, freshly grated parmesan cheese, and fine Italian parsley, served with garlic aioli.',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
        category: 'Sides',
        customizationOptions: [],
      },
      {
        id: 'menu_1_3',
        name: 'Smoked Honey Hot Wings',
        description: 'Twice-cooked jumbo chicken wings glazed in our hickory-smoked honey chili sauce, topped with toasted sesame seeds and fresh chives.',
        price: 11.49,
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80',
        category: 'Appetizers',
        spicy: true,
      },
      {
        id: 'menu_1_4',
        name: 'Salted Caramel Pecan Shake',
        description: 'Creamy Madagascar vanilla bean gelato blended with homemade salted caramel sauce, roasted butter pecans, topped with fluffy whipped cream.',
        price: 7.49,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
        category: 'Beverages',
        popular: true,
      }
    ]
  },
  {
    id: 'rest_2',
    name: 'Miyako Premium Sushi',
    cuisine: 'Japanese • Sushi • Teppanyaki',
    rating: 4.9,
    deliveryTime: 30,
    deliveryFee: 4.99,
    minOrder: 20.00,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tags: ['Michelin Rated', 'Fresh Premium', 'Exclusive Discounts'],
    menu: [
      {
        id: 'menu_2_1',
        name: 'Imperial Dragon Roll',
        description: 'Crispy shrimp tempura and fresh cucumber inside, layered with premium barbecued unagi (eel), soft fresh avocado slices, drizzled with kabayaki glaze.',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80',
        category: 'Premium Rolls',
        popular: true,
        customizationOptions: [
          {
            name: 'Prep Method',
            options: ['Traditional', 'Gluten-Free Soy Sauce', 'Spicy Mayo Drizzle'],
            required: true,
          }
        ],
      },
      {
        id: 'menu_2_2',
        name: 'Chef’s Nigiri Tasting (6pc)',
        description: 'A curated selection of the day’s freshest catches, including Bluefin Tuna, King Salmon, Amaebi, Yellowtail, Snapper, and Wagyu Beef nigiri.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80',
        category: 'Sashimi & Nigiri',
        popular: true,
      },
      {
        id: 'menu_2_3',
        name: 'Emerald Seaweed Salad',
        description: 'Crisp wakame seaweed marinated in a light sweet toasted sesame oil rice vinaigrette, tossed with toasted sesame seeds and thin cucumber strips.',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80',
        category: 'Sides',
        vegetarian: true,
      },
      {
        id: 'menu_2_4',
        name: 'Ceremonial Matcha Iced Cream',
        description: 'Fine Japanese ceremonial grade green tea matcha blended into a creamy rich house-churned organic dairy ice cream.',
        price: 6.50,
        image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80',
        category: 'Desserts',
        vegetarian: true,
      }
    ]
  },
  {
    id: 'rest_3',
    name: 'La Piazza Woodfired Pizza',
    cuisine: 'Italian • Pizza • Fresh Pasta',
    rating: 4.7,
    deliveryTime: 20,
    deliveryFee: 2.99,
    minOrder: 15.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tags: ['Woodfired', 'Italian Chef', 'Free Delivery for VIP'],
    menu: [
      {
        id: 'menu_3_1',
        name: 'Diavola Hot Honey Slice',
        description: 'Traditional San Marzano tomato marinara sauce, fresh Fior di Latte mozzarella, spicy Calabrian salami, organic fresh basil leaves, drizzled with organic chili hot honey.',
        price: 16.50,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
        category: 'Neapolitan Pizzas',
        spicy: true,
        popular: true,
        customizationOptions: [
          {
            name: 'Base Crust Type',
            options: ['Classic Sourdough', 'Neo-Napoli Extra Thin', 'Gluten-Free Surcharge (+$3.00)'],
            required: true,
          }
        ],
      },
      {
        id: 'menu_3_2',
        name: 'The Garden Truffle Pizza',
        description: 'A luxurious white base pizza crowned with roasted porcini and wild oyster mushrooms, fresh mozzarella, finished with rich truffle pesto and baby arugula leaf.',
        price: 17.90,
        image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=400&q=80',
        category: 'Neapolitan Pizzas',
        vegetarian: true,
      },
      {
        id: 'menu_3_3',
        name: 'Tuscan Burrata Heirloom Salad',
        description: 'Whole creamy Italian burrata bulb nested on heirloom cherry tomatoes, fresh baby rocket leaves, aged dark balsamic reduction glaze, and cold-pressed extra virgin olive oil.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=400&q=80',
        category: 'Antipasti',
        vegetarian: true,
        popular: true,
      }
    ]
  },
  {
    id: 'rest_4',
    name: 'Green & Lean Organics',
    cuisine: 'Healthy • Bowls • Clean Salads',
    rating: 4.6,
    deliveryTime: 18,
    deliveryFee: 1.99,
    minOrder: 10.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    tags: ['Eco Friendly', 'Vitamins High', 'Keto Options'],
    menu: [
      {
        id: 'menu_4_1',
        name: 'Harvest Ginger Salmon Bowl',
        description: 'Warm fluffy quinoa base with fresh Atlantic salmon filet, oven roasted sweet potato wedges, creamy dynamic avocado, shaved purple radish, and zesty ginger miso vinaigrette.',
        price: 15.49,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
        category: 'Warm Grain Bowls',
        popular: true,
        customizationOptions: [
          {
            name: 'Salmon Prep',
            options: ['Grilled Medium', 'Oven Poached', 'Flame-Seared Aburi'],
            required: true,
          }
        ],
      },
      {
        id: 'menu_4_2',
        name: 'Zesty Citrus Avocado Green Salad',
        description: 'Shaved organic kale, baby spinach, Haas avocado wedges, crisp cucumber, toasted crunchy pumpkin sunflower seeds, citrus-lemon vinaigrette drizzle.',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
        category: 'Salads & Greens',
        vegetarian: true,
      },
      {
        id: 'menu_4_3',
        name: 'Cold Pressed Golden Dragon Juice',
        description: 'Fresh raw slow-juiced premium organic turmeric root, fresh spicy ginger root, sweet organic oranges, carrots, and sweet crisp apples.',
        price: 6.00,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
        category: 'Cold-Pressed Juices',
        vegetarian: true,
      }
    ]
  },
  {
    id: 'rest_5',
    name: 'Sweet Alchemy Fine Desserts',
    cuisine: 'Desserts • Bakery • Artisan Sweets',
    rating: 4.9,
    deliveryTime: 22,
    deliveryFee: 3.50,
    minOrder: 12.00,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    tags: ['Award Winning', 'Sweet Craving', 'Luxury Pastries'],
    menu: [
      {
        id: 'menu_5_1',
        name: 'Signature Dark Lava Cake',
        description: '70% Valrhona dark chocolate cake with a rich molten lava core flowing on spoon break, served alongside a sweet seed organic vanilla bean cream pot.',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
        category: 'Molten Cakes',
        popular: true,
        customizationOptions: [
          {
            name: 'Side Premium Addition',
            options: ['Extra Vanilla Bean Cream (+$1.00)', 'Crushed Pistachios (+$0.75)', 'None'],
            required: false,
          }
        ],
      },
      {
        id: 'menu_5_2',
        name: 'Chonky Pistachio Dream Donut',
        description: 'A fluffy sourdough donut filled to abundance with slow-ground Sicilian pistachio pastry cream, glazed in white chocolate and fine crushed pistachio nuts.',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80',
        category: 'Donuts & Pastries',
        popular: true,
      },
      {
        id: 'menu_5_3',
        name: 'Classic Raspberry Opera Cake',
        description: 'Layered light almond sponge cake soaked in raspberry liqueur, frosted with smooth white Belgian chocolate buttercream and dark cocoa glaze lines.',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
        category: 'Gourmet Cakes',
      }
    ]
  }
];

export const MOCK_DRIVERS = [
  {
    name: 'Marcus Swift',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    phone: '+1 (555) 923-8120',
    vehicle: 'Tesla Model Y Lite (Electric Scooter Pro)',
    rating: 4.9,
    lat: 37.7749,
    lng: -122.4194
  },
  {
    name: 'Elena Rider',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    phone: '+1 (555) 124-9988',
    vehicle: 'Vespa Sprint Crimson Edition',
    rating: 4.8,
    lat: 37.7845,
    lng: -122.4230
  }
];
