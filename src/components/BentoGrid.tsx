import React from 'react';
import { Product } from '../types';

interface BentoGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // Find Willow Crossbody and Canvas Everyday Tote
  const elenaProd = products.find((p) => p.id === 'prod-willow-crossbody') || products[0];
  const marcusProd = products.find((p) => p.id === 'prod-canvas-tote') || products[1];

  return (
    <section className="space-y-4 my-8">
      <h2 className="font-['Quicksand'] font-bold text-2xl text-[#1c1b1b] flex items-center gap-2">
        <span>Featured Artisans</span>
        <span
          className="material-symbols-outlined text-[#526442]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1 (Large - Willow Crossbody) */}
        {elenaProd && (
          <div
            onClick={() => onSelectProduct(elenaProd)}
            className="md:col-span-8 bg-[#f6f3f2] rounded-xl p-4 sticker-card flex flex-col md:flex-row gap-5 group cursor-pointer"
          >
            <div className="md:w-1/2 aspect-square md:aspect-auto rounded-lg overflow-hidden hand-drawn-border bg-white flex items-center justify-center relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={elenaProd.image}
                alt={elenaProd.name}
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-between py-1">
              <div>
                <span className="inline-block bg-[#f1e1b8] text-[#473d1f] font-['Source_Sans_3'] font-medium text-xs px-3 py-1 rounded-full hand-drawn-border mb-3">
                  Artisan: Elena R.
                </span>
                <h3 className="font-['Quicksand'] font-semibold text-2xl text-[#1c1b1b] mb-2 group-hover:text-[#526442] transition-colors">
                  {elenaProd.name}
                </h3>
                <p className="font-['Source_Sans_3'] text-sm text-[#44483f] leading-relaxed">
                  {elenaProd.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-2 border-t border-dashed border-[#c5c8bc]">
                <span className="font-['Source_Sans_3'] font-bold text-xl text-[#1c1b1b]">
                  ${elenaProd.price}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(elenaProd);
                  }}
                  className="bg-white text-[#1c1b1b] border-[1.5px] border-[#1c1b1b] font-['Source_Sans_3'] font-bold text-sm px-4 py-2 rounded-sm hover:bg-[#526442] hover:text-white transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card 2 (Small - Canvas Everyday Tote) */}
        {marcusProd && (
          <div
            onClick={() => onSelectProduct(marcusProd)}
            className="md:col-span-4 bg-[#f6f3f2] rounded-xl p-4 sticker-card flex flex-col justify-between group cursor-pointer"
          >
            <div className="aspect-square rounded-lg overflow-hidden hand-drawn-border bg-white mb-4 relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={marcusProd.image}
                alt={marcusProd.name}
              />
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <span className="inline-block bg-[#ffdad9] text-[#2f1314] font-['Source_Sans_3'] font-medium text-xs px-3 py-1 rounded-full hand-drawn-border mb-2">
                  Artisan: Marcus T.
                </span>
                <h3 className="font-['Source_Sans_3'] font-bold text-lg text-[#1c1b1b] mb-1 group-hover:text-[#526442] transition-colors">
                  {marcusProd.name}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="font-['Source_Sans_3'] font-bold text-lg text-[#1c1b1b]">
                  ${marcusProd.price}
                </span>
                <button
                  type="button"
                  aria-label="Add to cart"
                  onClick={(e) => onAddToCart(marcusProd, e)}
                  className="p-2 border-[1.5px] border-[#1c1b1b] rounded-full hover:bg-[#9caf88] active:scale-95 transition-all cursor-pointer bg-white"
                >
                  <span
                    className="material-symbols-outlined text-xl block text-[#1c1b1b]"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
