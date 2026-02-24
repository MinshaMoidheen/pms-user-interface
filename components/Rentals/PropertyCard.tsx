import React, { useState, useCallback, useEffect } from "react";
import { Heart, Star, MapPin } from "lucide-react";
import { IProperty } from "@/types/properties";
import { useRouter } from "next/navigation";
import { useToggleBookmarkMutation } from "@/store/services/propertiesApiSlice";

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter();
  const [toggleBookmark] = useToggleBookmarkMutation();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUserId(user.id || user._id);
    }
  }, []);

  const handleToggleBookmark = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await toggleBookmark(property._id).unwrap();
      } catch (error) {
        console.error("Failed to toggle bookmark:", error);
      }
    },
    [property._id, toggleBookmark, router],
  );

  return (
    <div
      onClick={() => router.push(`/rentals/${property._id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3">
        <img
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* {property.discount && (
          <div className="absolute top-4 left-4 bg-[#FF5A3C] text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
            {property.discount}
          </div>
        )} */}

        {/* Heart Button with Toggle */}
        <button
          onClick={handleToggleBookmark}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors z-10"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              property.bookmarks?.includes(userId || "")
                ? "fill-red-500 text-red-500"
                : "fill-transparent text-white"
            }`}
          />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {property.description}
        </p>

        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-xl font-bold text-gray-900">
            ₹{property.price}
          </span>
          <span className="text-sm text-gray-500 font-medium">
            / {property.priceUnit}
          </span>
        </div>

        {/* <p className="text-sm text-gray-500 font-medium">{property.dates}</p>*/}

        <div className="flex items-center gap-1 pt-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={
                  property.averageRating >= star
                    ? "fill-[#FBBC05] text-[#FBBC05]"
                    : "text-slate-200"
                }
              />
            ))}
          </div>

          <span className="text-sm font-bold text-slate-900 ml-1">
            {property.reviewCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
