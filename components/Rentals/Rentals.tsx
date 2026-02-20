"use client";

import React, { useState } from 'react'
import Header from '../Common/Header';
import { Calendar, ChevronDown, } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import Footer from '../Common/Footer';
import PropertyCard from './PropertyCard';
import MapView from './MapView';
import FilterModal from './FilterModal';

const Rentals = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);


  const PROPERTIES = [
    {
      id: '1',
      title: 'Studio room in Bommanahalli',
      description: 'Cozy Studio Apartment 4 @ Hole in the Wall Cafe',
      price: 5900,
      currency: '₹',
      discount: '25% OFF!',
      dates: 'Feb 14 - 15',
      rating: 5,
      reviews: 25,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      lat: 40.7300,
      lng: -73.8650
    },
    {
      id: '2',
      title: 'Studio room in Bommanahalli',
      description: 'Cozy Studio Apartment 4 @ Hole in the Wall Cafe',
      price: 5900,
      currency: '₹',
      discount: '25% OFF!',
      dates: 'Feb 14 - 15',
      rating: 5,
      reviews: 25,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      lat: 40.7350,
      lng: -73.8600
    },
    {
      id: '3',
      title: 'Premium Suite near HSR',
      description: 'Luxury Living with panoramic views of the city',
      price: 7500,
      currency: '₹',
      dates: 'Feb 16 - 18',
      rating: 4.8,
      reviews: 12,
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
      lat: 40.7250,
      lng: -73.8750
    },
    {
      id: '4',
      title: 'Modern Loft in Koramangala',
      description: 'Stylish urban retreat in the heart of the action',
      price: 5400,
      currency: '₹',
      dates: 'Feb 20 - 22',
      rating: 5,
      reviews: 42,
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
      lat: 40.7380,
      lng: -73.8850
    }
  ];


  return (
    <div className="min-h-screen flex flex-col bg-white">
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-14">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              287 Places in <br className="md:hidden" />
              Bangalore, Karnataka
            </h1>
            <p className="text-gray-500 font-medium">
              Easily book site visits and search properties quickly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2.5 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-900 hover:border-gray-400 transition-all shadow-sm"
            >
              Filter <SlidersHorizontal size={18} />
            </button>
            <div className="flex items-center gap-3 px-6 py-3 bg-[#F8FAFC] rounded-full cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
              <Calendar size={18} className="text-gray-500" />
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</span>
                <span className="text-sm font-bold text-gray-900">May 23 - June 15</span>
              </div>
              <ChevronDown size={18} className="text-gray-500 ml-2" />
            </div>
          </div>
        </div>

        {/* Content Section: Grid + Map */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Properties List */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              {PROPERTIES.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
              {/* Duplicate for demo filling */}
              {PROPERTIES.slice(0, 2).map(property => (
                <PropertyCard key={`${property.id}-dup`} property={property} />
              ))}
            </div>
          </div>

          {/* Map View */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-auto lg:sticky lg:top-24">
            <MapView />
          </div>
        </div>

        {/* Mobile-only section spacer to prevent bottom nav overlap */}
        <div className="h-24 md:hidden" />
      </main>


    </div>
  );
};


export default Rentals
