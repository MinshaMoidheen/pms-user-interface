"use client";
import React from "react";
import JobSearchSection from "@/components/Jobs/JobSearchSection";
import JobFilterSidebar from "@/components/Jobs/JobFilterSidebar";
import JobCard from "@/components/Jobs/JobCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import BottomNav from "@/components/BottomNav";

import { EmploymentType } from "@/types/jobs";
import { useGetJobPostsQuery } from "@/store/services/jobApiSlice";

export default function JobsPage() {
  const ITEMS_PER_PAGE = 4;

  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [city, setCity] = React.useState("");
  const [employmentType, setEmploymentType] = React.useState<
    EmploymentType | undefined
  >(undefined);

  const {
    data: jobPosts,
    isLoading,
    error,
  } = useGetJobPostsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: search || undefined,
    city: city || undefined,
    employmentType: employmentType,
  });

  const totalPages = jobPosts?.data.pagination.pages || 1;
  const currentJobs = jobPosts?.data.jobs || [];
  const totalResults = jobPosts?.data.pagination.total || 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (searchTerm: string, locationTerm: string) => {
    setSearch(searchTerm);
    setCity(locationTerm);
    setCurrentPage(1);
  };

  const handleFilterChange = (type: string, value: string) => {
    if (type === "Job Type") {
      setEmploymentType(
        value === "all" ? undefined : (value as EmploymentType),
      );
      setCurrentPage(1);
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
              <JobSearchSection
                onSearch={handleSearch}
                initialSearch={search}
                initialLocation={city}
              />
            </div>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">
                Top job picks for you ...
              </h1>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-[85%]">
                Based on your profile, preferences, and activity like applies,
                searches, and saves
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
            {(search || city || employmentType) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCity("");
                  setEmploymentType(undefined);
                }}
                className="px-4 py-1.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 flex items-center gap-2"
              >
                Clear Filters <span className="text-slate-400">×</span>
              </button>
            )}
            <span className="text-sm font-bold text-slate-900 ml-auto md:ml-0">
              {totalResults} Results
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job List */}
          <div className="flex flex-col space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="p-8 text-center bg-red-50 rounded-2xl text-red-600">
                <p className="font-semibold">Error loading jobs</p>
                <p className="text-sm mt-1">Please try again later</p>
              </div>
            ) : currentJobs.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">
                  No jobs found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {currentJobs.map((job) => (
                  <JobCard key={job._id} {...job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isLoading && !error && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${currentPage === 1 ? "text-slate-300 cursor-not-allowed" : "hover:bg-slate-100 text-slate-400"}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  // Basic pagination logic to show around current page
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                          : "hover:bg-slate-50 text-slate-400"
                      }`}
                    >
                      {pageNum.toString().padStart(2, "0")}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 transition-colors ${currentPage === totalPages ? "text-blue-200 cursor-not-allowed opacity-50" : "hover:bg-blue-100 text-blue-600"}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Filters - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <JobFilterSidebar onChange={handleFilterChange} />
          </div>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}
