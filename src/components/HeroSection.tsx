import React from 'react';

interface HeroSectionProps {
  onShopNow: () => void;
  onSelectHeroProduct: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onSelectHeroProduct,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4 md:my-8">
      <div className="md:col-span-6 order-2 md:order-1 space-y-6 text-center md:text-left relative">
        {/* Decorative Star */}
        <svg
          className="absolute -top-10 -left-6 w-12 h-12 text-[#1c1b1b] hidden md:block"
          fill="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z"
            fill="currentColor"
          />
        </svg>

        <h1 className="font-['Quicksand'] font-bold text-4xl md:text-5xl text-[#1c1b1b] scribble-underline inline-block mb-2 leading-tight">
          Carry the Craft
        </h1>

        <p className="font-['Source_Sans_3'] text-lg text-[#44483f] max-w-lg mx-auto md:mx-0 leading-relaxed">
          Discover meticulously hand-stitched artisan bags designed for intentional living and slow fashion.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={onShopNow}
            className="bg-[#526442] text-white font-['Source_Sans_3'] font-bold text-base px-8 py-3 rounded-sm sticker-effect cursor-pointer inline-flex items-center gap-2 hover:bg-[#3b4c2c] transition-colors"
          >
            <span>Shop Now</span>
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div className="md:col-span-6 order-1 md:order-2">
        <div
          onClick={onSelectHeroProduct}
          className="bg-[#f1e1b8] rounded-xl p-4 md:p-6 sticker-card relative cursor-pointer group"
        >
          {/* Main Bag Illustration */}
          <div className="aspect-square bg-[#ffffff] rounded-lg hand-drawn-border overflow-hidden relative group-hover:scale-[1.01] transition-transform">
            <img
              className="w-full h-full object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1gDJG7D9lJSbE7NWuk_I0XrtlVu6khIyNxxZJf_4KpViQQemgynyfPKRE7OV914m_Zn31r9spU0erwHpD9Qb072YqSkvEYp4QSNgnSweQyoj-H4gEeK7YHv0u8pQXRTi41bEaJpiGxMWSONsWeFj283Rpvx81mNDF-LL8Je-7FOaMbjpyEecQKd4cYWfRfOwa6x6dRnj-92TVZeu99HmoceK4kWlrCun7NshETWNG4CniaOxUTv0"
              alt="Sage Artisan Pocket Tote Bag"
            />
            <div className="absolute top-3 left-3 bg-[#ffffff] border-[1.5px] border-[#1c1b1b] rounded-full px-3 py-1 font-['Source_Sans_3'] font-bold text-xs shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#526442]">verified</span>
              <span>Handmade Haven Studio</span>
            </div>
          </div>

          {/* Decorative Swirl */}
          <svg
            className="absolute -bottom-6 -right-6 w-16 h-16 text-[#1c1b1b] pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
            viewBox="0 0 100 100"
          >
            <path d="M20,80 Q50,20 80,80 T50,50" />
          </svg>
        </div>
      </div>
    </section>
  );
};
