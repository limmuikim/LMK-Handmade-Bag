import React from 'react';

interface TopAppBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onGoHome: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  onGoHome,
}) => {
  return (
    <header className="bg-[#fcf9f8] text-[#526442] font-['Quicksand'] text-xl w-full top-0 sticky z-40 border-b-[1.5px] border-[#1c1b1b] flex justify-between items-center px-5 h-16 transition-colors">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Menu"
        className="p-2 hover:bg-[#eae7e7] transition-colors rounded-full active:translate-x-[2px] active:translate-y-[2px] cursor-pointer text-[#1c1b1b]"
      >
        <span
          className="material-symbols-outlined text-2xl block"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          menu
        </span>
      </button>

      <button
        type="button"
        onClick={onGoHome}
        className="font-['Quicksand'] font-bold text-2xl tracking-tight text-[#526442] flex-1 text-center cursor-pointer hover:opacity-90 transition-opacity"
      >
        Handmade Haven
      </button>

      <button
        type="button"
        onClick={onOpenCart}
        aria-label="Shopping Bag"
        className="p-2 hover:bg-[#eae7e7] transition-colors rounded-full active:translate-x-[2px] active:translate-y-[2px] relative cursor-pointer text-[#1c1b1b]"
      >
        <span
          className="material-symbols-outlined text-2xl block"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          shopping_bag
        </span>
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 bg-[#7b5455] text-white font-['Source_Sans_3'] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-[#1c1b1b] shadow-sm animate-pulse">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};
