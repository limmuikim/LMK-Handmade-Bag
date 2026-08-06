import React, { useState } from 'react';
import { Product, Artisan } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  artisan?: Artisan;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    monogram: string
  ) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  artisan,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [monogram, setMonogram] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, monogram.trim());
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div
        className="bg-[#fcf9f8] border-2 border-[#1c1b1b] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 md:p-8 relative shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#f0eded] hover:bg-[#eae7e7] border border-[#1c1b1b] rounded-full transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-xl block">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Image Column */}
          <div className="space-y-3">
            <div className="aspect-square bg-white rounded-xl hand-drawn-border overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 text-xs font-['Source_Sans_3'] font-bold px-3 py-1 rounded-full border border-[#1c1b1b] shadow-xs ${product.artisanTagBg}`}
              >
                Artisan: {product.artisan}
              </span>
            </div>

            {/* Artisan Info Box */}
            {artisan && (
              <div className="bg-[#f6f3f2] p-3 rounded-xl border border-[#1c1b1b] flex items-center gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#1c1b1b]"
                />
                <div className="flex-1 text-xs">
                  <div className="font-['Quicksand'] font-bold text-[#1c1b1b]">
                    {artisan.name} • {artisan.location}
                  </div>
                  <p className="text-[#44483f] line-clamp-2">{artisan.bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-[#526442] font-bold font-['Source_Sans_3'] mb-1">
                <span>{product.category}</span>
                <div className="flex items-center gap-1 text-[#695e3d]">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-['Quicksand'] font-bold text-2xl text-[#1c1b1b] leading-snug">
                {product.name}
              </h2>
              <div className="font-['Source_Sans_3'] font-bold text-2xl text-[#1c1b1b] mt-1">
                ${product.price}
              </div>
            </div>

            <p className="font-['Source_Sans_3'] text-sm text-[#44483f] leading-relaxed">
              {product.description}
            </p>

            {/* Materials & Dimensions */}
            <div className="space-y-2 text-xs border-t border-b border-dashed border-[#c5c8bc] py-3">
              <div>
                <span className="font-bold text-[#1c1b1b]">Materials: </span>
                <span className="text-[#44483f]">
                  {product.materials.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-bold text-[#1c1b1b]">Dimensions: </span>
                <span className="text-[#44483f]">{product.dimensions}</span>
              </div>
            </div>

            {/* Custom Monogram Option */}
            <div className="space-y-1.5">
              <label className="block font-['Source_Sans_3'] font-bold text-xs text-[#1c1b1b]">
                Custom Leather Monogram Tag (Optional)
              </label>
              <input
                type="text"
                maxLength={4}
                placeholder="e.g. E.R. (Up to 3 initials)"
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                className="w-full bg-white border border-[#1c1b1b] rounded-sm px-3 py-2 font-['Source_Sans_3'] text-sm focus:outline-none focus:ring-2 focus:ring-[#526442]"
              />
              <p className="text-[11px] text-[#44483f]">
                Hand-punched on a custom leather tag attached to the strap.
              </p>
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-4">
                <span className="font-['Source_Sans_3'] font-bold text-xs text-[#1c1b1b]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#1c1b1b] rounded-sm bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 font-bold text-lg hover:bg-[#f0eded] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 font-bold text-lg hover:bg-[#f0eded] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-[#526442] text-white font-['Source_Sans_3'] font-bold text-base py-3 px-4 rounded-sm sticker-effect cursor-pointer flex items-center justify-center gap-2 hover:bg-[#3b4c2c] transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    shopping_bag
                  </span>
                  <span>Add to Bag • ${product.price * quantity}</span>
                </button>

                {onToggleWishlist && (
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 border-2 border-[#1c1b1b] rounded-sm transition-colors cursor-pointer ${
                      isWishlisted ? 'bg-[#ffdad9]' : 'bg-white hover:bg-[#f0eded]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <span
                      className={`material-symbols-outlined text-xl block ${
                        isWishlisted ? 'text-[#ba1a1a]' : 'text-[#1c1b1b]'
                      }`}
                      style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                )}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-xs font-['Source_Sans_3'] font-bold text-[#526442] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
