"use client";

import React, { useState } from "react";
import Header from "../Common/Header";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import Footer from "../Common/Footer";
import PropertyCard from "./PropertyCard";
import MapView from "./MapView";
import {
  GetPropertiesParams,
  useGetPropertiesQuery,
} from "@/store/services/propertiesApiSlice";
import FilterModal from "./FilterModal";
import DateRangePickerModal from "./DateRangePickerModal";

const Rentals = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: new Date(2026, 4, 23), // May 23
    endDate: new Date(2026, 5, 15),   // June 15
  });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<GetPropertiesParams["type"]>("RENT");
  const [category, setCategory] =
    useState<GetPropertiesParams["category"]>(undefined);
  const [filterCity, setFilterCity] =
    useState<GetPropertiesParams["city"]>("Bangalore");

  const params: GetPropertiesParams = {
    page: page + 1,
    limit,
    ...(search && { search }),
    ...(type && { type }),
    ...(category && { category }),
    ...(filterCity && { city: filterCity }),
  };

  const { data, isLoading, isError, error } = useGetPropertiesQuery(params);

  const PROPERTIES = data?.data?.properties ?? [];
  const pagination = data?.data?.pagination;
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 0;

  // Handle filter apply
  const handleApplyFilters = (filters: any) => {
    // Update your filter states here based on the filters from modal
    console.log("Applied filters:", filters);
    // You can update your filter states like category, price range, etc.
    setIsFilterModalOpen(false);
    setPage(0); // Reset to first page when filters change
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
      {/* Filter Modal */}
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

      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-14">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {total} Places in <br className="md:hidden" />
              {filterCity}, Karnataka
            </h1>
            <p className="text-gray-500 font-medium">
              Easily book site visits and search properties quickly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Filter Button - Now opens the modal */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2.5 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold text-gray-900 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
            >
              <SlidersHorizontal size={18} />
              <span>Filter</span>
            </button>

            <div
              onClick={() => setIsDatePickerOpen(true)}
              className="flex items-center gap-3 px-6 py-3 bg-[#F8FAFC] rounded-full cursor-pointer hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            >
              <Calendar size={18} className="text-gray-500" />
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Date
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {formatDateRange()}
                </span>
              </div>
              <ChevronDown size={18} className="text-gray-500 ml-2" />
            </div>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-500 gap-3">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-medium text-lg">
                  Finding the best places for you...
                </p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-red-500 text-center gap-4">
                <p className="font-bold text-xl text-gray-900">
                  Oops! Something went wrong.
                </p>
                <p className="text-gray-500 max-w-xs capitalize">
                  {(error as any)?.data?.message ||
                    "Failed to load properties. Please try again later."}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-[#FF5A3C] text-white rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-[#ff4a2d] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : PROPERTIES.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 text-center">
                <p className="font-bold text-xl text-gray-900 mb-2">
                  No properties found
                </p>
                <p className="mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Adjust Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                  {PROPERTIES.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16 border-t border-gray-100 pt-10">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i)}
                          className={`w-10 h-10 rounded-full font-bold transition-all ${page === i
                              ? "bg-gray-900 text-white shadow-md"
                              : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages - 1, p + 1))
                      }
                      disabled={page === totalPages - 1}
                      className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Map View - Hidden on mobile when list view is active */}
          <div className={`w-full lg:w-1/2 h-[500px] lg:h-auto lg:sticky lg:top-24 ${viewMode === 'list' ? 'hidden lg:block' : 'block'
            }`}>
            <MapView />
          </div>
        </div>

        {/* Mobile-only section spacer to prevent bottom nav overlap */}
        <div className="h-24 md:hidden" />
      </main>

      <Footer />
    </div>
  );
};

export default Rentals;