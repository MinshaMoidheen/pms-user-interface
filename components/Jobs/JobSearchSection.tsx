"use client";

import React from 'react';
import { Search, MapPin, Crosshair } from 'lucide-react';

const JobSearchSection: React.FC = () => {
    return (
        <div className="flex flex-row gap-2 md:gap-4 w-full items-center p-1.5 bg-white rounded-[32px] shadow-sm border border-slate-100">
            {/* Search Box Inputs Container */}
            <div className="flex-1 flex flex-row items-center overflow-hidden">
                {/* Search Input */}
                <div className="flex-1 flex items-center px-2 md:px-6 h-11 md:h-14 border-r border-slate-100">
                    <Search className="w-3.5 h-3.5 md:w-5 md:h-5 text-blue-600 shrink-0 mr-1.5 md:mr-3" />
                    <input
                        type="text"
                        placeholder="Jobs..."
                        className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-[10px] md:text-sm min-w-0"
                    />
                </div>

                {/* Location Input */}
                <div className="flex-1 flex items-center px-2 md:px-6 h-11 md:h-14">
                    <MapPin className="w-3.5 h-3.5 md:w-5 md:h-5 text-blue-600 shrink-0 mr-1.5 md:mr-3" />
                    <input
                        type="text"
                        placeholder="Location..."
                        className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-[10px] md:text-sm min-w-0"
                    />
                    <button className="hidden sm:block text-slate-400 hover:text-slate-600 ml-1 md:ml-2">
                        <Crosshair className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

            {/* Button */}
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full transition-colors whitespace-nowrap shadow-sm shadow-blue-200 flex items-center justify-center h-11 md:h-14 w-11 md:w-auto md:px-8">
                <span className="hidden md:block">Find Job</span>
                <Search className="w-5 h-5 md:hidden" />
            </button>
        </div>
    );
};

export default JobSearchSection;
