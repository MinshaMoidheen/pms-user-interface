"use client";

import React, { useState } from 'react';
import { SlidersHorizontal, Calendar, ChevronDown, Loader2, ChevronLeft, ChevronRight, Share2, Bookmark, Search, MapPin, X } from 'lucide-react';

import Header from '../Common/Header';
import SalesCard from './SalesCard';
import MapViewSales from './MapViewSales';
import Footer from '../Common/Footer';
import CTASection from '../Landing-page/CTASection';
import DateRangePickerModal from '../Rentals/DateRangePickerModal';
import FilterModal from './FilterModal';
import { GetPropertiesParams, useGetPropertiesQuery } from '@/store/services/propertiesApiSlice';

import { useRouter } from 'next/navigation';
import PriceRangeSlider from './PriceRangeSlider';

const Sales = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(2026, 0, 1),
    endDate: new Date(2026, 11, 31),
  });

  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [sortBy, setSortBy] = useState<'highest' | 'lowest'>('highest');
  const [priceRange, setPriceRange] = useState([2500000, 30000000]);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<GetPropertiesParams["type"]>("SALE");
  const [category, setCategory] = useState<GetPropertiesParams["category"]>(undefined);
  const [filterCity, setFilterCity] = useState<GetPropertiesParams["city"]>(undefined);

  const params: GetPropertiesParams = {
    page: page + 1,
    limit,
    ...(search && { search }),
    ...(type && { type }),
    ...(category && { category }),
    ...(filterCity && { city: filterCity }),
    ...(dateRange.startDate && {
      startDate: dateRange.startDate.toISOString(),
    }),
    ...(dateRange.endDate && { endDate: dateRange.endDate.toISOString() }),
    ...(appliedFilters?.rooms !== "Any" && { rooms: appliedFilters?.rooms }),
    ...(appliedFilters?.beds !== "Any" && { beds: appliedFilters?.beds }),
    ...(appliedFilters?.bathrooms !== "Any" && {
      bathrooms: appliedFilters?.bathrooms,
    }),
    ...(appliedFilters?.areaRange?.min && {
      minArea: appliedFilters.areaRange.min,
    }),
    ...(appliedFilters?.areaRange?.max && {
      maxArea: appliedFilters.areaRange.max,
    }),
    ...(appliedFilters?.amenities?.length > 0 && {
      amenities: appliedFilters.amenities,
    }),
  };

  const { data, isLoading, isError, error } = useGetPropertiesQuery(params);

  const SALES = data?.data?.properties ?? [];
  const pagination = data?.data?.pagination;
   const total = pagination?.total ?? 0;
  
  const totalPages = pagination?.totalPages ?? 0;

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    setIsFilterModalOpen(false);
    setPage(0);
  };

  const handleApplyDates = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange(range);
    setIsDatePickerOpen(false);
    setPage(0);
  };

  const filterChips = [
    { label: "Bangalore, Karnataka", active: true },
    { label: "May 23 - June 15", active: true },
    { label: "2 Beds", active: true },
    { label: "Apartment", active: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

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

      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* Top Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-3 bg-slate-50 border border-slate-100 rounded-full text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
               {total} Places in <br className="md:hidden" />
              {filterCity || "All"}
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Easily book site visits and search properties quickly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-slate-50 border border-slate-100 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-slate-50 border border-slate-100 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-3 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-4">

            {/* Price Slider Section */}
            <div className="w-full lg:w-[35%] px-4">
              <PriceRangeSlider
              min={0}
                max={50000000}
                step={50000}
                value={priceRange as [number, number]}
                onChange={(val) => setPriceRange(val)}
                onAfterChange={() => setPage(0)}
              />
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-10 bg-slate-100"></div>

            {/* Location Search Input */}
            <div className="flex-1 w-full relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF5A3C]">
                <MapPin size={20} className="fill-[#FF5A3C]/10" />
              </div>
              <input
                type="text"
                placeholder="Bangalore, Karnataka"
                className="w-full pl-12 pr-4 py-3 bg-white outline-none text-slate-900 font-semibold placeholder:text-slate-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full lg:w-auto">
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-full font-bold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal size={18} />
                Filter
              </button>
              <button className="flex-1 lg:flex-none px-10 py-3 bg-[#FF5A3C] hover:bg-orange-600 text-white rounded-full font-bold transition-all shadow-lg shadow-orange-100">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips & Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            {filterChips.map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-50 text-[#FF5A3C] rounded-full text-xs font-bold transition-colors cursor-pointer hover:bg-red-50"
              >
                {chip.label}
                <X size={14} className="text-[#FF5A3C]" />
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-1.5 rounded-full flex gap-1">
            <button
              onClick={() => setSortBy('highest')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${sortBy === 'highest' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
            >
              Highest Price
            </button>
            <button
              onClick={() => setSortBy('lowest')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${sortBy === 'lowest' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
            >
              Lowest Price
            </button>
          </div>
        </div>

        {/* Properties List */}
        <div className="space-y-8 mb-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-[#2D5BFF]" size={40} />
              <p className="font-bold text-slate-400">Finding the best properties...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-500">
              <p className="font-bold text-xl mb-4">Oops! Something went wrong.</p>
              <button onClick={() => window.location.reload()} className="text-[#FF5A3C] font-bold underline">Retry</button>
            </div>
          ) : SALES.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="font-bold text-xl mb-2">No properties found</p>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            SALES.map(property => (
              <SalesCard key={property._id} sales={property} />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="flex justify-center mb-24">
          <button className="bg-[#2D5BFF] hover:bg-blue-700 text-white px-20 py-4 rounded-full font-bold shadow-xl shadow-blue-100 transition-all transform active:scale-95">
            Load More
          </button>
        </div>

        {/* CTA Section */}
        <CTASection />

      </main>

     
    </div>
  );
};

export default Sales;
