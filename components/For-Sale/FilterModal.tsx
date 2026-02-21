"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Home,
  Building2,
  Store,
  Factory,
  Briefcase,
  Wifi,
  Laptop,
  Wind,
  Eye,
  Car,
  Dumbbell,
  Droplets,
  Trophy,
  Plus,
  Minus,
  ShoppingBag,
  Building,
  Building2Icon,
} from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [propertyCategory, setPropertyCategory] = useState("All Type");
  const [propertyType, setPropertyType] = useState<string[]>(["APARTMENT"]);

  const [rooms, setRooms] = useState<number | "Any">("Any");
  const [beds, setBeds] = useState<number | "Any">("Any");
  const [bathrooms, setBathrooms] = useState<number | "Any">("Any");

  const [areaRange, setAreaRange] = useState({ min: 500, max: 10000 });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Free Wifi",
  ]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const SLIDER_MAX = 10000;
  const MIN_DIFF = 100; // Minimum gap between handles

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const togglePropertyType = (type: string) => {
    setPropertyType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!dragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = Math.min(Math.max(0, clientX - rect.left), rect.width);
      const newValue = Math.round((offsetX / rect.width) * SLIDER_MAX);

      setAreaRange((prev) => {
        if (dragging === "min") {
          const updatedMin = Math.min(newValue, prev.max - MIN_DIFF);
          return { ...prev, min: updatedMin };
        } else {
          const updatedMax = Math.max(newValue, prev.min + MIN_DIFF);
          return { ...prev, max: updatedMax };
        }
      });
    },
    [dragging],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onEnd = () => setDragging(null);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
  }, [dragging, handleMove]);

  const Counter = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number | "Any";
    onChange: (val: number | "Any") => void;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-900 font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (value === "Any") return;
            if (value === 1) onChange("Any");
            else onChange((value as number) - 1);
          }}
          className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${value === "Any" ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}`}
        >
          <Minus size={16} className="text-gray-400" />
        </button>
        <span className="w-8 text-center font-bold text-gray-900">{value}</span>
        <button
          onClick={() => {
            if (value === "Any") onChange(1);
            else onChange((value as number) + 1);
          }}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );

  const handleApply = () => {
    onApply({
      category: propertyCategory,
      type: propertyType,
      rooms,
      beds,
      bathrooms,
      areaRange,
      amenities: selectedAmenities,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white md:rounded-[40px] shadow-2xl h-[92vh] md:h-auto md:max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500 rounded-t-[40px] mt-auto md:mt-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 border-b border-gray-50 sticky top-0 bg-white z-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-8 md:space-y-10 custom-scrollbar">
          {/* Property Type Section */}
          <section className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Property Type
            </h3>

            {/* Category Toggle */}
            <div className="grid grid-cols-3 p-1.5 bg-gray-50 border border-gray-100 rounded-full w-full max-w-lg">
              {["All Type", "Residential", "Commercial"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPropertyCategory(cat)}
                  className={`py-2 md:py-2.5 px-3 md:px-4 rounded-full font-bold text-xs md:text-sm transition-all duration-300 ${
                    propertyCategory === cat
                      ? "bg-black text-white shadow-lg"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Icons Grid */}
            <div className="flex flex-wrap gap-3">
              {[
                { name: "HOUSE_VILLA", icon: <Home size={18} /> },
                { name: "APARTMENT", icon: <Building2 size={18} /> },
                { name: "STUDIO", icon: <Store size={18} /> },
                { name: "PG", icon: <Factory size={18} /> },
                { name: "COMMERCIAL_BUILDING", icon: <Briefcase size={18} /> },
                { name: "COMMERCIAL_PROJECT", icon: <Building2Icon size={18} /> },
                { name: "COWORKING_SPACE", icon: <Building size={18} /> },
                { name: "SHOP_ROOM", icon: <ShoppingBag size={18} /> },
              ].map((type) => (
                <button
                  key={type.name}
                  onClick={() => togglePropertyType(type.name)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full border transition-all duration-300 font-bold text-xs md:text-sm ${
                    propertyType.includes(type.name)
                      ? "bg-white border-gray-900 text-gray-900 shadow-md ring-1 ring-gray-900"
                      : "bg-white border-gray-100 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {type.icon}
                  {type.name}
                </button>
              ))}
            </div>
          </section>

          {/* Rooms and Beds */}
          <section className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Rooms and Beds
            </h3>
            <div className="space-y-2">
              <Counter label="Rooms" value={rooms} onChange={setRooms} />
              <Counter label="Beds" value={beds} onChange={setBeds} />
              <Counter
                label="Bathroom"
                value={bathrooms}
                onChange={setBathrooms}
              />
            </div>
          </section>

          {/* Area and Size */}
          <section className="space-y-6 md:space-y-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Area and Size
            </h3>

            <div className="px-2 pt-10 pb-4 pr-10 md:pr-12">
              <div
                ref={sliderRef}
                className="relative h-1 bg-gray-100 rounded-full cursor-pointer select-none"
                onClick={(e) => {
                  if (dragging) return;
                  const rect = sliderRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  const offsetX = e.clientX - rect.left;
                  const val = (offsetX / rect.width) * SLIDER_MAX;
                  const distMin = Math.abs(val - areaRange.min);
                  const distMax = Math.abs(val - areaRange.max);
                  if (distMin < distMax) {
                    setAreaRange((prev) => ({
                      ...prev,
                      min: Math.min(Math.round(val), prev.max - MIN_DIFF),
                    }));
                  } else {
                    setAreaRange((prev) => ({
                      ...prev,
                      max: Math.max(Math.round(val), prev.min + MIN_DIFF),
                    }));
                  }
                }}
              >
                {/* Active range indicator */}
                <div
                  className="absolute h-full bg-[#FF5A3D] rounded-full"
                  style={{
                    left: `${(areaRange.min / SLIDER_MAX) * 100}%`,
                    right: `${100 - (areaRange.max / SLIDER_MAX) * 100}%`,
                  }}
                />

                {/* Left Handle */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FF5A3D] border-4 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 z-20 transition-transform ${dragging === "min" ? "scale-125" : "hover:scale-110"}`}
                  style={{ left: `${(areaRange.min / SLIDER_MAX) * 100}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDragging("min");
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setDragging("min");
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1E293B] text-white text-[12px] font-bold rounded-lg shadow-xl whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-[#1E293B] pointer-events-none">
                    {areaRange.min} - {areaRange.max}
                  </div>
                </div>

                {/* Right Handle */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FF5A3D] border-4 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 z-20 transition-transform ${dragging === "max" ? "scale-125" : "hover:scale-110"}`}
                  style={{ left: `${(areaRange.max / SLIDER_MAX) * 100}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDragging("max");
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setDragging("max");
                  }}
                />

                {/* Label */}
                <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-gray-900 font-bold text-sm">
                  sqft
                </span>
              </div>
            </div>
          </section>

          {/* Amenities */}
          <section className="space-y-4 md:space-y-6 pb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Free Wifi", icon: <Wifi size={18} /> },
                { name: "Workspace", icon: <Laptop size={18} /> },
                { name: "AC", icon: <Wind size={18} /> },
                { name: "Surveillance", icon: <Eye size={18} /> },
                { name: "Parking Area", icon: <Car size={18} /> },
                { name: "Gym", icon: <Dumbbell size={18} /> },
                { name: "Drinking Water", icon: <Droplets size={18} /> },
                { name: "Sports Area", icon: <Trophy size={18} /> },
              ].map((amenity) => (
                <button
                  key={amenity.name}
                  onClick={() => toggleAmenity(amenity.name)}
                  className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full border transition-all duration-300 font-bold text-xs md:text-sm ${
                    selectedAmenities.includes(amenity.name)
                      ? "bg-white border-gray-900 text-gray-900 shadow-md ring-1 ring-gray-900"
                      : "bg-white border-gray-100 text-gray-500 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  {amenity.icon}
                  {amenity.name}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 border-t border-gray-50 flex items-center justify-between bg-white mb-2">
          <button
            onClick={() => {
              setPropertyCategory("All Type");
              setPropertyType([]);
              setRooms("Any");
              setBeds("Any");
              setBathrooms("Any");
              setSelectedAmenities([]);
            }}
            className="text-gray-900 font-bold text-sm hover:underline"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="px-6 md:px-10 py-3 md:py-4 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
          >
            Show results
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default FilterModal;
