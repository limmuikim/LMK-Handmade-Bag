import React, { useState } from 'react';
import { TabType } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const [activeStoryModal, setActiveStoryModal] = useState<string | null>(null);

  const handleNav = (tab: TabType) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-[#1c1b1b]/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#fcf9f8] border-r-2 border-[#1c1b1b] w-full max-w-xs h-full flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-5 border-b-[1.5px] border-[#1c1b1b] flex items-center justify-between bg-[#f0eded]">
          <h2 className="font-['Quicksand'] font-bold text-xl text-[#526442]">
            Handmade Haven
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-[#eae7e7] border border-[#1c1b1b] rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg block">close</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-1">
            <div className="text-[11px] font-['Source_Sans_3'] font-bold uppercase tracking-wider text-[#44483f] mb-2">
              Navigation
            </div>
            <button
              type="button"
              onClick={() => handleNav('shop')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#f6f3f2] font-['Quicksand'] font-bold text-base text-[#1c1b1b] flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-[#526442]">storefront</span>
              <span>Artisan Shop</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('search')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#f6f3f2] font-['Quicksand'] font-bold text-base text-[#1c1b1b] flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-[#526442]">search</span>
              <span>Search & Catalog</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('orders')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#f6f3f2] font-['Quicksand'] font-bold text-base text-[#1c1b1b] flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-[#526442]">receipt_long</span>
              <span>Order Tracking</span>
            </button>
            <button
              type="button"
              onClick={() => handleNav('profile')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#f6f3f2] font-['Quicksand'] font-bold text-base text-[#1c1b1b] flex items-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-[#526442]">person</span>
              <span>Patron Profile</span>
            </button>
          </div>

          <div className="space-y-2 border-t border-dashed border-[#c5c8bc] pt-4">
            <div className="text-[11px] font-['Source_Sans_3'] font-bold uppercase tracking-wider text-[#44483f] mb-2">
              Artisan Stories
            </div>
            <button
              type="button"
              onClick={() => setActiveStoryModal('manifesto')}
              className="w-full text-left p-3 rounded-xl bg-[#f1e1b8] border border-[#1c1b1b] cursor-pointer hover:shadow-xs transition-shadow"
            >
              <div className="font-['Quicksand'] font-bold text-xs text-[#221b02]">
                Slow Fashion Manifesto
              </div>
              <p className="text-[11px] text-[#504627] line-clamp-2 mt-0.5">
                Why we reject mass production in favor of natural dye batches and hand-punched brass.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveStoryModal('monogram')}
              className="w-full text-left p-3 rounded-xl bg-[#ffdad9] border border-[#1c1b1b] cursor-pointer hover:shadow-xs transition-shadow"
            >
              <div className="font-['Quicksand'] font-bold text-xs text-[#2f1314]">
                Custom Leather Monogramming
              </div>
              <p className="text-[11px] text-[#603d3e] line-clamp-2 mt-0.5">
                Learn how our artisans hand-stamp initial tags using vintage brass typeface dies.
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1c1b1b] bg-[#f0eded] text-center text-xs space-y-1">
          <div className="font-bold text-[#1c1b1b]">Handmade Haven Studio</div>
          <div className="text-[11px] text-[#44483f]">
            100% Plastic-Free • Ethical Fair Trade
          </div>
        </div>
      </div>

      {/* Story Details Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-[#1c1b1b] rounded-2xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-4 right-4 p-1.5 bg-[#f0eded] border border-[#1c1b1b] rounded-full"
            >
              <span className="material-symbols-outlined text-sm block">close</span>
            </button>

            {activeStoryModal === 'manifesto' && (
              <div className="space-y-3">
                <span className="inline-block bg-[#f1e1b8] text-[#221b02] text-xs font-bold px-3 py-1 rounded-full border border-[#1c1b1b]">
                  Slow Fashion Manifesto
                </span>
                <h3 className="font-['Quicksand'] font-bold text-xl text-[#1c1b1b]">
                  Intentional Design & Hand Stitches
                </h3>
                <p className="text-xs text-[#44483f] leading-relaxed">
                  Fast fashion discards over 92 million tons of clothes annually. At Handmade Haven, every tote, clutch, and crossbody bag is crafted on order by master artisans using organic duck canvas, botanical dyes, and vegetable-tanned leather.
                </p>
                <p className="text-xs text-[#44483f] leading-relaxed">
                  We guarantee lifetime repair support for all seams and brass rivets.
                </p>
              </div>
            )}

            {activeStoryModal === 'monogram' && (
              <div className="space-y-3">
                <span className="inline-block bg-[#ffdad9] text-[#2f1314] text-xs font-bold px-3 py-1 rounded-full border border-[#1c1b1b]">
                  Vintage Brass Monogramming
                </span>
                <h3 className="font-['Quicksand'] font-bold text-xl text-[#1c1b1b]">
                  Personalized Leather Tags
                </h3>
                <p className="text-xs text-[#44483f] leading-relaxed">
                  When you enter up to 3 initials during product selection, our artisans heat-emboss custom bridle leather tags using 1950s foundry brass type sets. The result is a crisp, permanent mark unique to your bag.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveStoryModal(null)}
              className="w-full bg-[#526442] text-white py-2 rounded-sm text-xs font-bold cursor-pointer hover:bg-[#3b4c2c]"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
