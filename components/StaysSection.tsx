"use client";

import React, { useRef } from 'react';
import { Star, ChevronRight, Heart, ChevronLeft } from 'lucide-react';

interface StaysSectionProps {
  city: string;
}

const stays = [
  { 
    id: 1, 
    img: 'https://picsum.photos/seed/stay1/400/300',
    title: 'Studio room in Bommanahalli',
    description: 'Cozy Studio Apartment 4 @ Hole in the Wall Cafe',
    price: '5900',
    rating: 25,
    discount: '25% OFF!'
  },
  { 
    id: 2, 
    img: 'https://picsum.photos/seed/stay2/400/300',
    title: 'Luxury Apartment in Indiranagar',
    description: 'Modern 2BHK with Pool Access & Gym',
    price: '8900',
    rating: 28,
    discount: '15% OFF!'
  },
  { 
    id: 3, 
    img: 'https://picsum.photos/seed/stay3/400/300',
    title: 'Cozy Villa in Whitefield',
    description: 'Private Villa with Garden & Parking',
    price: '12500',
    rating: 32,
    discount: '20% OFF!'
  },
  { 
    id: 4, 
    img: 'https://picsum.photos/seed/stay4/400/300',
    title: 'Penthouse in Koramangala',
    description: 'Luxury Penthouse with Rooftop Terrace',
    price: '15900',
    rating: 27,
    discount: '10% OFF!'
  },
  { 
    id: 5, 
    img: 'https://picsum.photos/seed/stay5/400/300',
    title: 'Studio in HSR Layout',
    description: 'Compact Studio near Tech Park',
    price: '4500',
    rating: 22,
    discount: '30% OFF!'
  }
];

const StaysSection: React.FC<StaysSectionProps> = ({ city }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of one card
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="bg-[#FFEDE9] text-[#FF5A3C] text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">
              Rentals
            </span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <h2 className="text-2xl font-bold text-slate-900">Stays in {city}</h2>
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          
          {/* Scrollable Cards */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stays.map((stay) => (
              <div 
                key={stay.id} 
                className="flex-none w-[280px] sm:w-[300px] md:w-[320px] group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={stay.img} 
                    alt="Stay" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-[#FF5A3C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {stay.discount}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-1.5 rounded-full hover:bg-white/60 transition-colors">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{stay.title}</h3>
                <p className="text-xs text-slate-400 font-medium mb-2 line-clamp-2">{stay.description}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-slate-900 text-lg">
                    ₹{stay.price} <span className="text-xs font-normal text-slate-400">/ per night</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 mb-3">Feb 14-15</p>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} 
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">({stay.rating})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaysSection;