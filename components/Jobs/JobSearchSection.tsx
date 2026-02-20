import React from 'react';
import { Search, MapPin, Crosshair } from 'lucide-react';

const JobSearchSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-2 w-full max-w-4xl mx-auto items-center">
            {/* Search Input */}
            <div className="flex-1 flex items-center px-4 w-full md:w-auto h-12 border-b md:border-b-0 md:border-r border-slate-200">
                <Search className="w-5 h-5 text-blue-600 shrink-0 mr-3" />
                <input
                    type="text"
                    placeholder="Search by: Job title, Position, Keyword..."
                    className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
                />
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center px-4 w-full md:w-auto h-12">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mr-3" />
                <input
                    type="text"
                    placeholder="City, state or zip code"
                    className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
                />
                <button className="text-slate-400 hover:text-slate-600 ml-2">
                    <Crosshair className="w-5 h-5" />
                </button>
            </div>

            {/* Button */}
            <button className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
                Find Job
            </button>
        </div>
    );
};

export default JobSearchSection;
