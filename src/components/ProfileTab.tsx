import React from 'react';
import { UserProfile, Product, Artisan } from '../types';
import { ProductCard } from './ProductCard';

interface ProfileTabProps {
  profile: UserProfile;
  products: Product[];
  artisans: Artisan[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  products,
  artisans,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
}) => {
  const wishlistedProducts = products.filter((p) =>
    profile.wishlistIds.includes(p.id)
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Profile Banner */}
      <div className="bg-[#f6f3f2] p-5 rounded-2xl border-2 border-[#1c1b1b] flex flex-col sm:flex-row items-center gap-5 relative">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-[#1c1b1b]"
        />

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-['Quicksand'] font-bold text-2xl text-[#1c1b1b]">
              {profile.name}
            </h1>
            <span className="bg-[#d5e9bf] text-[#111f05] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#1c1b1b]">
              Patron of Slow Fashion
            </span>
          </div>
          <p className="font-['Source_Sans_3'] text-xs text-[#44483f]">
            {profile.email} • Collector since {profile.memberSince}
          </p>
        </div>
      </div>

      {/* Philosophy Callout Card */}
      <div className="bg-[#f1e1b8] p-4 rounded-xl border border-[#1c1b1b] flex items-center gap-4">
        <span className="material-symbols-outlined text-3xl text-[#473d1f]">
          eco
        </span>
        <div className="text-xs text-[#221b02] space-y-0.5">
          <div className="font-['Quicksand'] font-bold text-sm">
            Handmade Haven Craft Guarantee
          </div>
          <p className="text-[#504627]">
            Every bag purchase directly supports independent artisans with fair wages, eco-dyed fibers, and zero plastic packaging.
          </p>
        </div>
      </div>

      {/* Favorite Artisans */}
      <div className="space-y-3">
        <h2 className="font-['Quicksand'] font-bold text-xl text-[#1c1b1b] flex items-center gap-2">
          <span>Favorite Artisans</span>
          <span className="material-symbols-outlined text-sm text-[#7b5455]">
            favorite
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-[#f6f3f2] p-3 rounded-xl border border-[#1c1b1b] flex items-center gap-3"
            >
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-12 h-12 rounded-full object-cover border border-[#1c1b1b]"
              />
              <div className="flex-1 text-xs">
                <div className="font-['Quicksand'] font-bold text-sm text-[#1c1b1b]">
                  {artisan.name}
                </div>
                <div className="text-[#44483f]">{artisan.tagline}</div>
                <div className="text-[10px] text-[#526442] font-bold">
                  📍 {artisan.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-['Quicksand'] font-bold text-xl text-[#1c1b1b]">
            Saved Wishlist ({wishlistedProducts.length})
          </h2>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-[#f6f3f2] p-6 rounded-xl border border-[#1c1b1b] text-center text-xs text-[#44483f]">
            No bags saved to your wishlist yet. Tap the heart icon on any bag to save it here.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
