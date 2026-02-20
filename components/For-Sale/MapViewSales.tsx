"use client";

import React from 'react';
import { Maximize2, Plus, Minus } from 'lucide-react';

// Import the Sales interface from your Sales component or define it here
interface Sales {
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

interface MapViewSalesProps {
  sales: Sales[]; // Accept sales data as props
}

const MapViewSales: React.FC<MapViewSalesProps> = ({ sales }) => {
  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)}L`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(1)}K`;
    }
    return price.toString();
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-sm bg-[#E5E7EB]">
      {/* Background Map Layer - Using a more realistic map background */}
   <div 
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/rentalsdesktopmap.png')` }}
      />
    </div>
  );
};

export default MapViewSales;