"use client";

import React, { useState, useRef } from 'react';
import { Home, Search } from 'lucide-react';

const categories = [
  { image: '/images/propertysale.png', label: 'Property For Sale' },
  { image: '/images/propertyrent.png', label: 'Property For Rent' },
  { image: '/images/jobs.png', label: 'Jobs' },
  { image: '/images/project.png', label: 'Project' },
  { image: '/images/community.png', label: 'Community' },
  { image: '/images/investment.png', label: 'Investment' },
];

const Hero: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="relative pt-12 pb-2 md:pb-24 overflow-hidden min-h-screen">
      {/* Background Image - No overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/heroImage.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* NO OVERLAY - Removed completely */}
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col">
    
        {/* Search Bar - Fixed */}
        <div 
          className="relative max-w-3xl mx-auto mb-12 md:mb-16 cursor-text"
          onClick={focusInput}
        >
          <div className="relative">
            {/* Search icon and label - hide when typing */}
            {!isFocused && !searchValue && (
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none gap-2 z-10">
                <Home className="w-5 h-5 text-blue-500" />
                <span className="text-slate-400">Search for Homes</span>
              </div>
            )}
            
            {/* Search icon only at the start (when typing) */}
            {isFocused && (
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none z-10">
                <Home className="w-5 h-5 text-blue-500" />
              </div>
            )}
            
            {/* Search icon at the end */}
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none z-10">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            
            <input 
              ref={inputRef}
              type="text"
              className={`w-full h-14 ${isFocused || searchValue ? 'pl-16' : 'pl-48'} pr-14 rounded-full border border-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg bg-white`}
              placeholder=""
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        </div>

        {/* Category Grid - 3 items per row */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-xl mx-auto">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-center text-slate-800 leading-tight">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;