import React, { useState, useMemo } from 'react';
import { Product, CategoryType, Artisan } from '../types';
import { ProductCard } from './ProductCard';

interface SearchTabProps {
  products: Product[];
  artisans: Artisan[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  initialCategory?: CategoryType;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  products,
  artisans,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  initialCategory = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [selectedArtisan, setSelectedArtisan] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(200);

  const categories: CategoryType[] = ['All', 'Totes', 'Clutches', 'Backpacks', 'Crossbody'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const matchesArtisan =
        selectedArtisan === 'All' || p.artisan.includes(selectedArtisan);

      const matchesPrice = p.price <= maxPrice;

      return matchesQuery && matchesCategory && matchesArtisan && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, selectedArtisan, maxPrice]);

  return (
    <div className="space-y-6 pb-8">
      {/* Search Input Header */}
      <div className="space-y-3">
        <h1 className="font-['Quicksand'] font-bold text-3xl text-[#1c1b1b]">
          Discover Artisan Bags
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by bag name, material (cotton, leather), or artisan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-[#1c1b1b] rounded-xl pl-11 pr-10 py-3 font-['Source_Sans_3'] text-sm focus:outline-none focus:ring-2 focus:ring-[#526442] shadow-xs"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-xl text-[#1c1b1b]">
            search
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-xs bg-[#f0eded] hover:bg-[#eae7e7] p-1 rounded-full border border-[#1c1b1b]"
            >
              <span className="material-symbols-outlined text-sm block">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="space-y-4 bg-[#f6f3f2] p-4 rounded-xl border border-[#1c1b1b]">
        {/* Categories Pills */}
        <div>
          <label className="block font-['Source_Sans_3'] font-bold text-xs text-[#1c1b1b] mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border border-[#1c1b1b] ${
                  selectedCategory === cat
                    ? 'bg-[#526442] text-white shadow-xs'
                    : 'bg-white text-[#1c1b1b] hover:bg-[#eae7e7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Artisan Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-['Source_Sans_3'] font-bold text-xs text-[#1c1b1b] mb-1.5">
              Filter by Artisan
            </label>
            <select
              value={selectedArtisan}
              onChange={(e) => setSelectedArtisan(e.target.value)}
              className="w-full bg-white border border-[#1c1b1b] rounded-sm px-3 py-1.5 text-xs font-['Source_Sans_3'] focus:outline-none"
            >
              <option value="All">All Artisans & Studios</option>
              {artisans.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name} ({a.location})
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between font-['Source_Sans_3'] font-bold text-xs text-[#1c1b1b] mb-1.5">
              <span>Max Price</span>
              <span>${maxPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={250}
              step={5}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#526442]"
            />
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center text-xs font-['Source_Sans_3'] font-bold text-[#44483f]">
        <span>Showing {filteredProducts.length} items</span>
        {(selectedCategory !== 'All' || searchQuery || selectedArtisan !== 'All' || maxPrice < 200) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedArtisan('All');
              setMaxPrice(200);
            }}
            className="text-[#ba1a1a] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-[#f6f3f2] rounded-xl border border-[#1c1b1b] space-y-2">
          <span className="material-symbols-outlined text-4xl text-[#75786e]">
            search_off
          </span>
          <p className="font-['Quicksand'] font-bold text-lg text-[#1c1b1b]">
            No bags match your search
          </p>
          <p className="font-['Source_Sans_3'] text-xs text-[#44483f]">
            Try adjusting your search terms or expanding your price range.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};
