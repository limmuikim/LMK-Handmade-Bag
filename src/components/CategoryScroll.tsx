import React from 'react';
import { CategoryType } from '../types';

interface CategoryScrollProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryScroll: React.FC<CategoryScrollProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: {
    id: CategoryType;
    label: string;
    icon: string;
    bgClass: string;
  }[] = [
    {
      id: 'Totes',
      label: 'Totes',
      icon: 'shopping_basket',
      bgClass: 'bg-[#f1e1b8]', // tertiary-fixed
    },
    {
      id: 'Clutches',
      label: 'Clutches',
      icon: 'transcribe',
      bgClass: 'bg-[#ffdad9]', // secondary-fixed
    },
    {
      id: 'Backpacks',
      label: 'Backpacks',
      icon: 'backpack',
      bgClass: 'bg-[#d5e9bf]', // primary-fixed
    },
    {
      id: 'Crossbody',
      label: 'Crossbody',
      icon: 'local_mall',
      bgClass: 'bg-[#e5e2e1]', // surface-variant
    },
  ];

  return (
    <section className="space-y-3 my-6">
      <div className="flex items-center justify-between">
        <h2 className="font-['Quicksand'] font-bold text-2xl text-[#1c1b1b]">
          Explore Categories
        </h2>
        {selectedCategory !== 'All' && (
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className="text-xs font-['Source_Sans_3'] font-bold text-[#526442] hover:underline cursor-pointer"
          >
            Show All
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                onSelectCategory(isSelected ? 'All' : cat.id)
              }
              className={`flex-shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-xl sticker-card group cursor-pointer transition-all ${
                cat.bgClass
              } ${
                isSelected
                  ? 'ring-2 ring-[#1c1b1b] ring-offset-2 scale-105 shadow-md'
                  : 'opacity-95 hover:opacity-100'
              }`}
            >
              <span
                className="material-symbols-outlined text-4xl mb-2 text-[#1c1b1b] group-hover:scale-110 transition-transform"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {cat.icon}
              </span>
              <span className="font-['Source_Sans_3'] font-bold text-sm text-[#1c1b1b]">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
