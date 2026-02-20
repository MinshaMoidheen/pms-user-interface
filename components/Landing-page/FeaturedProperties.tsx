"use client";

import React, { useRef } from 'react';
import { Star, MapPin, BedDouble, Bath, Square, Mail, Phone, MessageCircle, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const properties = [
  {
    id: 1,
    title: 'Apartment in Banaswadi',
    price: '₹25,34,500',
    type: 'Apartment',
    beds: 2,
    baths: 3,
    sqft: '1,126 sqft',
    location: '213, 9th Main Rd, HRBR Layout 1st Bl...',
    rating: 25,
    image: 'https://picsum.photos/seed/prop1/800/600',
    tag: 'POPULAR',
    description: 'Exclusive Unit | Parking Area | Near to...'
  },
  {
    id: 2,
    title: 'Apartment in HSR',
    price: '₹25,34,500',
    type: 'Apartment',
    beds: 2,
    baths: 3,
    sqft: '1,126 sqft',
    location: 'Sec 2, HSR Layout, Bangalore',
    rating: 25,
    image: 'https://picsum.photos/seed/prop2/800/600',
    tag: 'POPULAR',
    description: 'Exclusive Unit | Parking Area | Near to...'
  },
  {
    id: 3,
    title: 'Apartment in Indiranagar',
    price: '₹32,50,000',
    type: 'Apartment',
    beds: 3,
    baths: 2,
    sqft: '1,450 sqft',
    location: '100 Feet Rd, Indiranagar, Bangalore',
    rating: 28,
    image: 'https://picsum.photos/seed/prop3/800/600',
    tag: 'POPULAR',
    description: 'Gated Community | 24/7 Security | Near Metro'
  },
  {
    id: 4,
    title: 'Apartment in Whitefield',
    price: '₹28,75,000',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: '1,250 sqft',
    location: 'ITPL Main Rd, Whitefield, Bangalore',
    rating: 22,
    image: 'https://picsum.photos/seed/prop4/800/600',
    tag: 'POPULAR',
    description: 'Near Tech Park | Club House | Gym'
  },
  {
    id: 5,
    title: 'Apartment in Koramangala',
    price: '₹29,90,000',
    type: 'Apartment',
    beds: 2,
    baths: 3,
    sqft: '1,380 sqft',
    location: '5th Block, Koramangala, Bangalore',
    rating: 26,
    image: 'https://picsum.photos/seed/prop5/800/600',
    tag: 'POPULAR',
    description: 'Near Forum Mall | Power Backup | Parking'
  }
];

const FeaturedProperties: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800; // Width of one card
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[#FF5A3C] text-md mb-1">Only the best properties in Bangalore for sale!</p>
            <h2 className="text-3xl font-bold text-slate-900">Best Properties in Bangalore</h2>
          </div>
          <button className="text-sm font-semibold border border-orange-200 text-[#FF5A3C] px-4 py-1.5 rounded-full hover:bg-orange-50 transition-colors">
            View All
          </button>
        </div>

        {/* Horizontal Scroll Container with Navigation */}
        <div className="relative group">
          {/* Left Navigation Arrow - Appears on hover */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-50 -ml-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>

          {/* Right Navigation Arrow - Appears on hover */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-50 -mr-4"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          
          {/* Horizontal Scrollable Properties */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((prop) => (
              <div 
                key={prop.id} 
                className="flex-none w-[750px] bg-white overflow-hidden relative"
              >
                <div className="flex flex-row gap-5">
                  {/* Image Container */}
                  <div className="relative w-80 h-52 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#4ADE80] text-white text-xs px-3 py-1 rounded font-bold tracking-wide">
                      {prop.tag}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-slate-700 font-medium text-base mb-1">{prop.title}</h3>
                      <p className="text-3xl font-bold text-slate-900">{prop.price}</p>
                    </div>
                    
                    <p className="text-sm font-medium text-slate-500 mb-3">{prop.type}</p>

                    <div className="flex gap-5 text-sm font-medium text-slate-600 mb-3">
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-slate-500" />
                        <span>{prop.beds} Bedroom</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-slate-500" />
                        <span>{prop.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Square className="w-4 h-4 text-slate-500" />
                        <span>{prop.sqft}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm font-semibold mb-3">{prop.description}</p>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{prop.location}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-500">({prop.rating})</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 bg-blue-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                        <Mail className="w-4 h-4" /> Email
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                        <Phone className="w-4 h-4" /> Call
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 border border-green-200 text-green-600 bg-green-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors">
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturedProperties;