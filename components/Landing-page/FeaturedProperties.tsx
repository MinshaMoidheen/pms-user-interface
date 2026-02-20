"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Mail,
  Phone,
  MessageCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
  Ruler,
} from "lucide-react";
import Link from "next/link";
import {
  GetPropertiesParams,
  useGetPropertiesQuery,
} from "@/store/services/propertiesApiSlice";
import { IProperty } from "@/types/properties";

const FeaturedProperties: React.FC = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<GetPropertiesParams["type"]>("SALE");
  const [category, setCategory] =
    useState<GetPropertiesParams["category"]>(undefined);
  const [city, setCity] = useState<GetPropertiesParams["city"]>("Bangalore");

  const params: GetPropertiesParams = {
    page: page + 1,
    limit,
    ...(search && { search }),
    ...(type && { type }),
    ...(category && { category }),
    ...(city && { city }),
  };

  const { data, isLoading, isError, error } = useGetPropertiesQuery(params);

  const properties = data?.data?.properties ?? [];
  const pagination = data?.data?.pagination;
  const total = pagination?.total ?? 0;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800; // Width of one card
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[#FF5A3C] text-md mb-1">
              Only the best properties in Bangalore for sale!
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Best Properties in Bangalore
            </h2>
          </div>
          <button className="hidden md:block text-sm font-semibold border border-orange-200 text-[#FF5A3C] px-4 py-1.5 rounded-full hover:bg-orange-50 transition-colors">
            View All
          </button>
        </div>

        {/* Horizontal Scroll Container with Navigation */}
        <div className="relative group">
          {/* Left Navigation Arrow - Appears on hover */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-50 -ml-4"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>

          {/* Right Navigation Arrow - Appears on hover */}
          <button
            onClick={() => scroll("right")}
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
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {properties.map((prop: IProperty) => (
              <div
                onClick={() => router.push(`/for-sale/${prop._id}`)}
                key={prop._id}
                className="flex-none w-[340px] md:w-[750px] bg-white overflow-hidden relative group/card block cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-5 h-full">
                  {/* Image Container */}
                  <div className="relative w-full h-64 md:w-80 md:h-full rounded-xl overflow-hidden shrink-0">
                    <img
                      src={prop.images?.[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-[#4ADE80] text-white text-xs px-3 py-1 rounded font-bold tracking-wide">
                      {prop.type}
                    </div>
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col py-2">
                    <div className="mb-3">
                      <h3 className="text-slate-700 font-medium text-base mb-1 truncate">
                        {prop.title}
                      </h3>
                      <p className="text-2xl md:text-3xl font-bold text-slate-900">
                        {prop.price}{" "}
                        <span className="text-sm font-normal text-slate-500">
                          {`/${prop.priceUnit}`}
                        </span>
                      </p>
                    </div>

                    <p className="text-sm font-medium text-slate-500 mb-3">
                      {prop.category}
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-5 text-sm font-medium text-slate-600 mb-3">
                      {prop.flexibleFields?.bedrooms && (
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4 text-slate-500" />
                          <span>{prop.flexibleFields.bedrooms} Bedroom</span>
                        </div>
                      )}
                      {prop.flexibleFields?.bathrooms && (
                        <div className="flex items-center gap-2">
                          <Bath className="w-4 h-4 text-slate-500" />
                          <span>{prop.flexibleFields.bathrooms} Baths</span>
                        </div>
                      )}
                      {prop.area && (
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-slate-500 rotate-90" />
                          <span>
                            {prop.area.value} {prop.area.unit}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-700 text-sm font-semibold mb-3 line-clamp-2 md:line-clamp-2">
                      {prop.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{`${prop.location?.address}, ${prop.location?.city}, ${prop.location?.state}`}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                      {/* Email */}
                      <a
                        href={`mailto:${prop.contact.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 border border-blue-200 text-blue-600 bg-blue-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                      >
                        <Mail className="w-4 h-4" /> Email
                      </a>

                      {/* Call */}
                      <a
                        href={prop.contact.call} // already has tel:
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
                      >
                        <Phone className="w-4 h-4" /> Call
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={prop.contact.whatsapp}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 border border-green-200 text-green-600 bg-green-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center">
            <button className="bg-[#FF5A3C] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
