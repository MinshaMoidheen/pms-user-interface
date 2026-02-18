import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';

interface Property {
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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {property.discount && (
          <div className="absolute top-4 left-4 bg-[#FF5A3C] text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
            {property.discount}
          </div>
        )}
        
        {/* Heart Button with Toggle */}
        <button 
          onClick={handleLikeClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
        >
          <Heart 
            size={20} 
            className={`transition-colors ${
              isLiked 
                ? 'fill-red-500 text-red-500' 
                : 'fill-transparent text-white'
            }`} 
          />
        </button>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{property.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{property.description}</p>
        
        <div className="flex items-baseline gap-1 pt-1">
          <span className="text-xl font-bold text-gray-900">{property.currency}{property.price}</span>
          <span className="text-sm text-gray-500 font-medium">/ per night</span>
        </div>
        
        <p className="text-sm text-gray-500 font-medium">{property.dates}</p>
        
        <div className="flex items-center gap-1 pt-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(property.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900 ml-1">({property.reviews})</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;