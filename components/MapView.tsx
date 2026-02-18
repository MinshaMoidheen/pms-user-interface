
import React from 'react';
import { Maximize2, Plus, Minus } from 'lucide-react';

 const PROPERTIES = [
  {
    id: '1',
    title: 'Studio room in Bommanahalli',
    description: 'Cozy Studio Apartment 4 @ Hole in the Wall Cafe',
    price: 5900,
    currency: '₹',
    discount: '25% OFF!',
    dates: 'Feb 14 - 15',
    rating: 5,
    reviews: 25,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    lat: 40.7300,
    lng: -73.8650
  },
  {
    id: '2',
    title: 'Studio room in Bommanahalli',
    description: 'Cozy Studio Apartment 4 @ Hole in the Wall Cafe',
    price: 5900,
    currency: '₹',
    discount: '25% OFF!',
    dates: 'Feb 14 - 15',
    rating: 5,
    reviews: 25,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    lat: 40.7350,
    lng: -73.8600
  },
  {
    id: '3',
    title: 'Premium Suite near HSR',
    description: 'Luxury Living with panoramic views of the city',
    price: 7500,
    currency: '₹',
    dates: 'Feb 16 - 18',
    rating: 4.8,
    reviews: 12,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    lat: 40.7250,
    lng: -73.8750
  },
  {
    id: '4',
    title: 'Modern Loft in Koramangala',
    description: 'Stylish urban retreat in the heart of the action',
    price: 5400,
    currency: '₹',
    dates: 'Feb 20 - 22',
    rating: 5,
    reviews: 42,
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800',
    lat: 40.7380,
    lng: -73.8850
  }
];
const MapView: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-full rounded-3xl overflow-hidden shadow-sm bg-[#E5E7EB]">
      {/* Background Styled Map Layer */}
      <div 
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/rentalsdesktopmap.png')` }}
      />
    </div>
  );
};

export default MapView;
