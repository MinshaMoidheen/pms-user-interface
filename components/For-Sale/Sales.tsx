"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, Calendar, ChevronDown } from 'lucide-react';

import Header from '../Common/Header';
import SalesCard from './SalesCard';
import MapViewSales from './MapViewSales';
import Footer from '../Common/Footer';
import DateRangePickerModal from '../Rentals/DateRangePickerModal';
import FilterModal from './FilterModal';

export interface Sales {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  discount?: string;
  dates: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  lat: number;
  lng: number;
}

export const SALES: Sales[] = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment",
    description: "Premium apartment with modern amenities",
    price: 8500000,
    currency: "₹",
    discount: "20% off",
    dates: "May 23 - June 15",
    rating: 4.5,
    reviews: 128,
    imageUrl: "/images/property1.jpg",
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: "2",
    title: "Cozy 2BHK Villa",
    description: "Peaceful villa with garden view",
    price: 5500000,
    currency: "₹",
    dates: "May 23 - June 15",
    rating: 4.2,
    reviews: 89,
    imageUrl: "/images/property2.jpg",
    lat: 12.9719,
    lng: 77.5935
  },
  {
    id: "3",
    title: "Modern Studio Apartment",
    description: "Perfect for singles and couples",
    price: 3500000,
    currency: "₹",
    discount: "15% off",
    dates: "May 23 - June 15",
    rating: 4.7,
    reviews: 56,
    imageUrl: "/images/property3.jpg",
    lat: 12.9725,
    lng: 77.5912
  },
  {
    id: "4",
    title: "Penthouse with Terrace",
    description: "Luxurious penthouse with city view",
    price: 12500000,
    currency: "₹",
    dates: "May 23 - June 15",
    rating: 4.8,
    reviews: 42,
    imageUrl: "/images/property4.jpg",
    lat: 12.9705,
    lng: 77.5955
  }
];

const Sales = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: new Date(2026, 4, 23), // May 23
    endDate: new Date(2026, 5, 15),   // June 15
  });

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
    setIsFilterModalOpen(false);
  };

  const handleApplyDates = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
    setIsDatePickerOpen(false);
  };

  const formatDateRange = () => {
    if (!dateRange.startDate) return "Select Dates";
    const startStr = dateRange.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!dateRange.endDate) return `${startStr} - ...`;
    const endStr = dateRange.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${startStr} - ${endStr}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />

      <DateRangePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onApply={handleApplyDates}
        initialRange={dateRange}
      />

      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-14">
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
              className="flex items-center gap-2.5 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-900 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
            >
              <SlidersHorizontal size={18} />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className="flex items-center gap-3 px-6 py-3 bg-[#F8FAFC] rounded-full cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            >
              <Calendar size={18} className="text-gray-500" />
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date</span>
                <span className="text-sm font-bold text-gray-900">{formatDateRange()}</span>
              </div>
              <ChevronDown size={18} className="text-gray-500 ml-2" />
            </button>
          </div>
        </div>

        {/* View Toggle - Mobile Only */}
        <div className="flex lg:hidden gap-2 mb-6">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${viewMode === 'list'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${viewMode === 'map'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Map View
          </button>
        </div>

        {/* Content Section: Grid + Map */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Properties List - Hidden on mobile when map view is active */}
          <div className={`w-full lg:w-1/2 ${viewMode === 'map' ? 'hidden lg:block' : 'block'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
              {SALES.map(sales => (
                <SalesCard key={sales.id} sales={sales} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-10 text-center">
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg">
                Load More Properties
              </button>
            </div>
          </div>

          {/* Map View - Hidden on mobile when list view is active */}
          <div className={`w-full lg:w-1/2 h-[500px] lg:h-auto lg:sticky lg:top-24 ${viewMode === 'list' ? 'hidden lg:block' : 'block'
            }`}>
            <MapViewSales sales={SALES} />
          </div>
        </div>

        <div className="h-24 md:hidden" />
      </main>

      <Footer />
    </div>
  );
};

export default Sales;