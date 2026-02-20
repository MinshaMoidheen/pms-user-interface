import React from 'react';
import { MapPin, Bookmark } from 'lucide-react';

export interface JobProps {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    logo: string; // URL or path to image
    isNew?: boolean;
}

const JobCard: React.FC<JobProps> = ({ title, company, location, type, salary, logo, isNew }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300 relative group">
            {isNew && (
                <span className="absolute top-6 right-6 px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-md">
                    New
                </span>
            )}

            <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100 flex items-center justify-center bg-white">
                    <img src={logo} alt={`${company} logo`} className="w-full h-full object-contain p-2" />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Job Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate pr-8">{title}</h3>

                    {/* Tags & Salary */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-sm mb-3">
                        <span className={`px-3 py-1 rounded-md text-xs font-medium uppercase
              ${type === 'Full-Time' ? 'bg-blue-50 text-blue-600' :
                                type === 'Part-Time' ? 'bg-green-50 text-green-600' :
                                    type === 'Internship' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                            {type}
                        </span>
                        <span className="text-slate-500">Salary: {salary}</span>
                    </div>

                    {/* Company & Location */}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-2 font-medium text-slate-700">
                            {company}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span className="truncate">{location}</span>
                        </div>
                    </div>
                </div>

                {/* Bookmark Button */}
                <button className="text-slate-400 hover:text-blue-600 transition-colors mt-1">
                    <Bookmark className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default JobCard;
