import React from "react";
import { Heart, Star } from "lucide-react";
import { Sales } from "./Sales";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface SalesCardProps {
  sales: Sales;
}

const SalesCard: React.FC<SalesCardProps> = ({ sales }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/for-sale/${sales.id}`)}
      className="block group cursor-pointer"
    >
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-3">
        <img
          src={sales.imageUrl}
          alt={sales.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {sales.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
            {sales.discount}
          </div>
        )}
        <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors">
          <Heart size={20} className="fill-transparent stroke-white" />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {sales.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {sales.description}
        </p>

        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-xl font-bold text-gray-900">
            {sales.currency}
            {sales.price}
          </span>
          <span className="text-sm text-gray-500 font-medium">/ per night</span>
        </div>

        <p className="text-sm text-gray-500 font-medium">{sales.dates}</p>

        <div className="flex items-center gap-1 pt-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(sales.rating)
                    ? "fill-orange-400 text-orange-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900 ml-1">
            ({sales.reviews})
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
