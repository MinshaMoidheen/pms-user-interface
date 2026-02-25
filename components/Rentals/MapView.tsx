import React from "react";
import { Maximize2, Plus, Minus } from "lucide-react";
import { IProperty } from "@/types/properties";

interface MapViewProps {
  properties: IProperty[];
}

const MapView: React.FC<MapViewProps> = ({ properties }) => {
  const displayedProperty = properties[0];

  return (
    <div className="relative w-full h-[500px] md:h-full rounded-3xl overflow-hidden shadow-sm bg-[#E5E7EB]">
      {/* Background Styled Map Layer */}
      {displayedProperty?.location?.coordinates?.latitude &&
      displayedProperty?.location?.coordinates?.longitude ? (
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${displayedProperty.location.coordinates.latitude},${displayedProperty.location.coordinates.longitude}&hl=en&z=15&output=embed`}
        />
      ) : (
        <p className="flex items-center justify-center h-full text-gray-400">
          Location not available
        </p>
      )}
    </div>
  );
};

export default MapView;
