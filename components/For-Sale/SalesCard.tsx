import React from "react";
import {
  Heart,
  Star,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { IProperty } from "@/types/properties";
import { useRouter } from "next/navigation";

interface SalesCardProps {
  sales: IProperty;
}

const SalesCard: React.FC<SalesCardProps> = ({ sales }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isSaved, setIsSaved] = React.useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % (sales.images.length || 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + (sales.images.length || 1)) % (sales.images.length || 1),
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div
      onClick={() => router.push(`/for-sale/${sales._id}`)}
      className="group bg-white rounded-[2.5rem] border border-slate-100 p-4 transition-all hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Image Carousel Area */}
        <div className="relative w-full md:w-[320px] aspect-4/3 rounded-[2rem] overflow-hidden shrink-0">
          <img
            src={sales.images[currentImageIndex] || "/images/placeholder.png"}
            alt={sales.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
              Popular
            </span>
          </div>

          {/* Heart/Bookmark */}
          <button
            onClick={handleSave}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? "bg-red-500 text-white opacity-100"
                : "bg-white/30 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart size={20} className={isSaved ? "fill-white" : ""} />
          </button>

          {/* Carousel Arrows */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {sales.images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1 flex flex-col py-2 px-2 md:px-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-2">
                {sales.title}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-black text-slate-900">
                  ₹{sales.price?.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-slate-400">
                  /{sales.priceUnit || "total"}
                </span>
              </div>
              <p className="text-slate-400 font-semibold mb-3">
                {sales?.category}
              </p>
            </div>

            {/* Rating - Hidden on mobile, shown on desktop */}
            <div className="hidden md:flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < 5 ? "fill-[#FBBC05] text-[#FBBC05]" : "text-slate-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900 ml-1">
                (25)
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium text-sm mb-4">
            <div className="flex items-center gap-2">
              <Bed size={18} className="text-slate-400" />
              <span> {sales.flexibleFields?.bedrooms} Bedroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={18} className="text-slate-400" />
              <span> {sales.flexibleFields?.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 size={18} className="text-slate-400" />
              <span>
                {sales.area.value} {sales.area.unit}
              </span>
            </div>
          </div>

          {/* Tagline/Description */}
          <p className="text-slate-900 font-bold mb-3 line-clamp-1">
            {sales.description}
          </p>

          {/* Address & Rating (Mobile) */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-start gap-2 text-slate-450 text-sm max-w-sm">
              <MapPin size={18} className="shrink-0 mt-0.5 text-[#FF5A3C]" />
              <span className="line-clamp-2 leading-relaxed text-slate-500 font-medium">
                {sales.location.address}, {sales.location.city},{" "}
                {sales.location.state}, {sales.location.pincode}
              </span>
            </div>

            {/* Rating on Mobile */}
            <div className="flex md:hidden items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < 5 ? "fill-[#FBBC05] text-[#FBBC05]" : "text-slate-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900 ml-1">
                (25)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-auto">
            <button
              onClick={() =>
                (window.location.href = `mailto:${sales.contact.email}`)
              }
              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 bg-[#2D5BFF] hover:bg-blue-700 text-white py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95"
            >
              <Mail size={18} />
              Email
            </button>
            <button
              onClick={() =>
                (window.location.href = `tel:${sales.contact.mobileNumber}`)
              }
              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 bg-[#FFEBEE] hover:bg-red-100 text-[#FF5A3C] py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95"
            >
              <Phone size={18} />
              Call
            </button>
            <button
              onClick={() =>
                (window.location.href = `${sales.contact.whatsapp}`)
              }
              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 bg-[#E8F5E9] hover:bg-green-100 text-[#22C55E] py-3 rounded-2xl text-sm font-bold transition-all transform active:scale-95"
            >
              <MessageCircle size={18} />
              Whatsapp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
