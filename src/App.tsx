import React, { useState } from 'react';
import {
  Product,
  CategoryType,
  CartItem,
  Order,
  UserProfile,
  TabType,
} from './types';
import {
  INITIAL_PRODUCTS,
  ARTISANS,
  INITIAL_ORDERS,
  INITIAL_PROFILE,
} from './data/mockData';

// Components
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HeroSection } from './components/HeroSection';
import { CategoryScroll } from './components/CategoryScroll';
import { BentoGrid } from './components/BentoGrid';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { SearchTab } from './components/SearchTab';
import { OrdersTab } from './components/OrdersTab';
import { ProfileTab } from './components/ProfileTab';
import { MenuDrawer } from './components/MenuDrawer';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('shop');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  // Data State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [artisans] = useState(ARTISANS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: INITIAL_PRODUCTS[0], // Willow Crossbody
      quantity: 1,
      customMonogram: 'E.R.',
    },
  ]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add To Cart Handler
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    customMonogram = ''
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.customMonogram === customMonogram
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          customMonogram,
        },
      ];
    });

    showToast(`Added "${product.name}" to your shopping bag!`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (
    productId: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    setProfile((prev) => {
      const exists = prev.wishlistIds.includes(productId);
      const newWishlist = exists
        ? prev.wishlistIds.filter((id) => id !== productId)
        : [...prev.wishlistIds, productId];

      const product = products.find((p) => p.id === productId);
      if (product) {
        showToast(
          exists
            ? `Removed "${product.name}" from Wishlist`
            : `Saved "${product.name}" to Wishlist!`
        );
      }

      return {
        ...prev,
        wishlistIds: newWishlist,
      };
    });
  };

  // Checkout Success
  const handleCheckoutSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // clear bag
  };

  // Reorder Handler
  const handleReorder = (items: CartItem[]) => {
    items.forEach((item) => {
      handleAddToCart(item.product, item.quantity, item.customMonogram);
    });
    setIsCartOpen(true);
  };

  // Filtered Products for Shop Tab
  const shopFilteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const selectedArtisanObj = selectedProduct
    ? artisans.find((a) => selectedProduct.artisan.includes(a.name))
    : undefined;

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col font-['Source_Sans_3'] pb-20 md:pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1c1b1b] text-white px-4 py-2.5 rounded-lg border border-[#526442] shadow-xl text-xs font-bold font-['Source_Sans_3'] flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm text-[#d5e9bf]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top App Bar Header */}
      <TopAppBar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        onGoHome={() => {
          setActiveTab('shop');
          setSelectedCategory('All');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 space-y-8 py-6">
        {activeTab === 'shop' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onShopNow={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectHeroProduct={() => {
                const sageProduct =
                  products.find((p) => p.id === 'prod-sage-shopper') ||
                  products[2];
                setSelectedProduct(sageProduct);
              }}
            />

            {/* Categories Scroll */}
            <CategoryScroll
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Featured Artisans Bento Grid */}
            <BentoGrid
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p, e) => {
                e.stopPropagation();
                handleAddToCart(p);
              }}
            />

            {/* Catalog Section */}
            <section id="catalog-section" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="font-['Quicksand'] font-bold text-2xl text-[#1c1b1b]">
                  {selectedCategory === 'All'
                    ? 'All Artisan Bags'
                    : `${selectedCategory} Collection`}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('search')}
                  className="text-xs font-['Source_Sans_3'] font-bold text-[#526442] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Filter & Search</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {shopFilteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    onAddToCart={(p, e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                    isWishlisted={profile.wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'search' && (
          <SearchTab
            products={products}
            artisans={artisans}
            initialCategory={selectedCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => {
              e.stopPropagation();
              handleAddToCart(p);
            }}
            wishlistIds={profile.wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab orders={orders} onReorder={handleReorder} />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            profile={profile}
            products={products}
            artisans={artisans}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => {
              e.stopPropagation();
              handleAddToCart(p);
            }}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        artisan={selectedArtisanObj}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty, monogram) => handleAddToCart(p, qty, monogram)}
        isWishlisted={
          selectedProduct
            ? profile.wishlistIds.includes(selectedProduct.id)
            : false
        }
        onToggleWishlist={(id) => handleToggleWishlist(id)}
      />

      {/* Shopping Bag Slide-over Drawer */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Menu Side Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedCategory('All');
        }}
      />

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
