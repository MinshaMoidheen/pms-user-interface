"use client";

import React, { useRef, useState } from "react";
import {
  Star,
  ChevronRight,
  Heart,
  ChevronLeft,
  Ruler,
  Bath,
  BedDouble,
} from "lucide-react";
import {
  GetPropertiesParams,
  useGetPropertiesQuery,
} from "@/store/services/propertiesApiSlice";
import { IProperty } from "@/types/properties";
import { getFlexibleField } from "@/utility/propertyUtils";

interface StaysSectionProps {
  city: string;
}

const StaysSection: React.FC<StaysSectionProps> = ({ city }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of one card
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<GetPropertiesParams["type"]>("RENT");
  const [category, setCategory] =
    useState<GetPropertiesParams["category"]>(undefined);
  const [filterCity, setFilterCity] =
    useState<GetPropertiesParams["city"]>(city);

  const params: GetPropertiesParams = {
    page: page + 1,
    limit,
    ...(search && { search }),
    ...(type && { type }),
    ...(category && { category }),
    ...(filterCity && { city: filterCity }),
  };

  const { data, isLoading, isError, error } = useGetPropertiesQuery(params);

  const stays = data?.data?.properties ?? [];
  const pagination = data?.data?.pagination;
  const total = pagination?.total ?? 0;

  return (
    <section className="md:py-12 sm:py-1 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="bg-[#FFEDE9] text-[#FF5A3C] text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">
              Rentals
            </span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <h2 className="text-2xl font-bold text-slate-900">
                Stays in {city}
              </h2>
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={() => scroll("right")}
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
          {stays.length > 0 ? (
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {stays.map((stay) => (
                <div
                  key={stay._id}
                  className="flex-none w-[280px] sm:w-[300px] md:w-[320px] group cursor-pointer"
                >
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={stay.images[0]}
                      alt="Stay"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* <div className="absolute top-4 left-4 bg-[#FF5A3C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {stay.discount}
                  </div> */}
                    <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md p-1.5 rounded-full hover:bg-white/60 transition-colors">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">
                    {stay.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-2 line-clamp-2 truncate">
                    {stay.description}
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-slate-900 text-lg">
                      ₹{stay.price}{" "}
                      <span className="text-xs font-normal text-slate-400">{`/ ${stay.priceUnit}`}</span>
                    </p>
                  </div>

                  {/* <p className="text-xs text-slate-400 mb-3">Feb 14-15</p> */}

                  <div className="flex flex-wrap gap-4 md:gap-5 text-sm font-medium text-slate-600 mb-3">
                    {getFlexibleField(stay.flexibleFields, [
                      "bedrooms",
                      "bedroom",
                    ]) && (
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-slate-500" />
                        <span>
                          {getFlexibleField(stay.flexibleFields, [
                            "bedrooms",
                            "bedroom",
                          ])}{" "}
                          Bedroom
                        </span>
                      </div>
                    )}
                    {getFlexibleField(stay.flexibleFields, [
                      "bathrooms",
                      "bathroom",
                    ]) && (
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-slate-500" />
                        <span>
                          {getFlexibleField(stay.flexibleFields, [
                            "bathrooms",
                            "bathroom",
                          ])}{" "}
                          Baths
                        </span>
                      </div>
                    )}
                    {stay.area && (
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-slate-500 rotate-90" />
                        <span>
                          {stay.area.value} {stay.area.unit}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          stay.averageRating >= star
                            ? "fill-[#FBBC05] text-[#FBBC05]"
                            : "text-slate-200"
                        }
                      />
                    ))}

                    <span className="text-sm font-bold text-slate-900 ml-1">
                      {stay.reviewCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h5 className="text-center text-black">No stays found!</h5>
          )}
        </div>
      </div>
    </section>
  );
};

export default StaysSection;
