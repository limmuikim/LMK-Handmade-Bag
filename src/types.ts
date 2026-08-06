export type CategoryType = 'All' | 'Totes' | 'Clutches' | 'Backpacks' | 'Crossbody';

export interface Product {
  id: string;
  name: string;
  artisan: string;
  artisanRole?: string;
  artisanTagBg: string; // e.g. 'bg-tertiary-fixed'
  category: CategoryType;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  materials: string[];
  dimensions: string;
  inStock: boolean;
  featured?: boolean;
  bentoSize?: 'large' | 'small' | 'standard';
  badge?: string;
}

export interface Artisan {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  location: string;
  yearsOfCraft: number;
  specialties: string[];
  featuredProductIds: string[];
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  quantity: number;
  selectedColor?: string;
  customMonogram?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  status: 'In Crafting' | 'Quality Check' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  shippingAddress: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  wishlistIds: string[];
  favoriteArtisanNames: string[];
}

export type TabType = 'shop' | 'search' | 'orders' | 'profile';
