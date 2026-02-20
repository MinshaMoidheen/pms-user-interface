"use client";
import React from 'react';
import JobSearchSection from '@/components/Jobs/JobSearchSection';
import JobFilterSidebar from '@/components/Jobs/JobFilterSidebar';
import JobCard from '@/components/Jobs/JobCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import BottomNav from '@/components/BottomNav';

import { mockJobs } from '@/data/jobs';

export default function JobsPage() {
    const ITEMS_PER_PAGE = 4;

    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(mockJobs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentJobs = mockJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                {/* Header Section: Search and Navigation */}
                <div className="flex flex-col gap-6 mb-8">
                    <div className="flex items-center gap-4 w-full">
                        <button className="p-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex-1">
                            <JobSearchSection />
                        </div>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-slate-900">Top job picks for you ...</h1>
                            <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-[85%]">
                                Based on your profile, preferences, and activity like applies, searches, and saves
                            </p>
                        </div>
                        <div className="shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                alt="User Profile"
                                className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 w-full">
                        <button className="px-4 py-1.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 flex items-center gap-2">
                            UX/UI <span className="text-slate-400">×</span>
                        </button>
                        <span className="text-sm font-bold text-slate-900 ml-auto md:ml-0">{mockJobs.length} Results</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Job List */}
                    <div className="flex flex-col space-y-4">
                        <div className="grid gap-4">
                            {currentJobs.map((job, index) => (
                                <JobCard key={job.id} {...job} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-100 text-slate-400'}`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${currentPage === page
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : 'hover:bg-slate-50 text-slate-400'
                                            }`}
                                    >
                                        {page.toString().padStart(2, '0')}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 transition-colors ${currentPage === totalPages ? 'text-blue-200 cursor-not-allowed opacity-50' : 'hover:bg-blue-100 text-blue-600'}`}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Filters - Hidden on mobile, visible on desktop */}
                    <div className="hidden lg:block">
                        <JobFilterSidebar />
                    </div>
                </div>
            </div>

            <Footer />
            <BottomNav />
        </div>
    );
}
