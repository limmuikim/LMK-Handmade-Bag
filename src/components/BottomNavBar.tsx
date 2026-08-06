import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'shop', label: 'Shop', icon: 'storefront' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'orders', label: 'Orders', icon: 'receipt_long' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 bg-[#fcf9f8] z-50 border-t-[1.5px] border-[#1c1b1b] shadow-md md:hidden">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-[#9caf88] text-[#324224] rounded-full border-[1.5px] border-[#1c1b1b] scale-105 font-bold'
                : 'text-[#44483f] hover:text-[#526442] active:scale-95'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl mb-0.5"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {tab.icon}
            </span>
            <span className="font-['Source_Sans_3'] text-xs font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
