
import React from 'react';
import { Maximize2, Plus, Minus } from 'lucide-react';

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
