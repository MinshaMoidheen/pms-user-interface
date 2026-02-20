"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Bookmark } from 'lucide-react';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { Job } from '@/data/jobs';

// Extend Job for props, though JobCard likely receives Job properties directly
// The interface in jobs.ts matches what we need. We can import it or defineProps here.
// Let's reuse the Job interface from data/jobs.ts to be safe, or redefine compatible props.
// The file previously defined JobProps locally. I will update it to match the new data structure.

interface JobProps {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    logo: string;
    workMode?: 'WFO' | 'Remote' | 'Hybrid';
}

const JobCard: React.FC<JobProps> = ({ id, title, company, location, type, salary, logo, workMode }) => {
    const { isSaved, toggleSave } = useSavedJobs();
    return (
        <Link href={`/jobs/${id}`} className="block relative group cursor-pointer">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow duration-300">

                {/* Header: Title and Work Mode Badge */}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-snug">{title}</h3>
                    {workMode && (
                        <span className="shrink-0 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-100 rounded-md">
                            {workMode}
                        </span>
                    )}
                </div>

                {/* Middle Row: Job Type and Salary */}
                <div className="flex items-center gap-3 mb-6 text-sm">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md font-medium text-xs">
                        {type}
                    </span>
                    <span className="text-gray-500 font-medium">
                        Salary: <span className="text-blue-700 font-semibold">{salary}</span>
                    </span>
                </div>

                {/* Bottom Row: Company Info and Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Company Logo */}
                        <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 flex items-center justify-center border border-gray-100">
                            <img src={logo} alt={`${company} logo`} className="w-full h-full object-contain" />
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{company}</h4>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span>{location}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`transition-colors ${isSaved(id) ? 'text-blue-600 fill-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSave(id);
                        }}
                    >
                        <Bookmark className={`w-5 h-5 ${isSaved(id) ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
