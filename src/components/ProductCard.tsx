import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-[#f6f3f2] rounded-xl p-3 md:p-4 sticker-card flex flex-col justify-between group cursor-pointer transition-all"
    >
      <div className="aspect-square rounded-lg overflow-hidden hand-drawn-border bg-white mb-3 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => onToggleWishlist(product.id, e)}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full border border-[#1c1b1b] shadow-sm hover:bg-[#ffdad9] transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <span
              className={`material-symbols-outlined text-sm block ${
                isWishlisted ? 'text-[#ba1a1a]' : 'text-[#1c1b1b]'
              }`}
              style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
        )}

        <div className="absolute bottom-2 left-2">
          <span className={`inline-block text-[11px] font-['Source_Sans_3'] font-bold px-2.5 py-0.5 rounded-full border border-[#1c1b1b] ${product.artisanTagBg}`}>
            {product.artisan}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#44483f] mb-1 font-['Source_Sans_3']">
            <span>{product.category}</span>
            <div className="flex items-center gap-0.5 text-[#695e3d] font-bold">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 className="font-['Quicksand'] font-bold text-base text-[#1c1b1b] line-clamp-1 group-hover:text-[#526442] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-[#c5c8bc]">
          <span className="font-['Source_Sans_3'] font-bold text-base text-[#1c1b1b]">
            ${product.price}
          </span>
          <button
            type="button"
            onClick={(e) => onAddToCart(product, e)}
            className="p-1.5 px-3 border-[1.5px] border-[#1c1b1b] rounded-sm bg-white hover:bg-[#526442] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-['Source_Sans_3'] font-bold text-xs"
          >
            <span
              className="material-symbols-outlined text-sm block"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              shopping_bag
            </span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
