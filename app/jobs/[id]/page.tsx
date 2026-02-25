"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  DollarSign,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Home,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import ApplyJobModal from "@/components/Jobs/ApplyJobModal";
import {
  useGetJobByIdQuery,
  useToggleJobBookmarkMutation,
  useGetSimilarJobsQuery,
} from "@/store/services/jobApiSlice";

const getTimeRemaining = (expiresAt: string | Date) => {
  const diff = new Date(expiresAt).getTime() - new Date().getTime();
  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  if (days > 0) return `${days} days ${hours} hours`;
  return `${hours} hours`;
};

export default function JobDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [toggleBookmark] = useToggleJobBookmarkMutation();
  const [userId, setUserId] = useState<string | null>(null);
  const [similarJobsPage, setSimilarJobsPage] = useState(1);
  const SIMILAR_JOBS_PER_PAGE = 6;

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUserId(user.id || user._id);
    }
  }, []);

  const handleToggleBookmark = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await toggleBookmark(id).unwrap();
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  }, [id, toggleBookmark, router]);

  const { data: jobResponse, isLoading, error } = useGetJobByIdQuery(id);
  const { data: similarJobsResponse, isLoading: isLoadingSimilar } =
    useGetSimilarJobsQuery(id);

  const job = jobResponse?.data.job;
  const similarJobs = similarJobsResponse?.data.jobs || [];

  const totalSimilarPages = Math.ceil(
    similarJobs.length / SIMILAR_JOBS_PER_PAGE,
  );
  const paginatedSimilarJobs = similarJobs.slice(
    (similarJobsPage - 1) * SIMILAR_JOBS_PER_PAGE,
    similarJobsPage * SIMILAR_JOBS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 pt-32 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Job Not Found</h2>
          <p className="text-slate-500 mt-2">
            The job you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl"
          >
            Back to Jobs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApplyClick = () => {
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8 text-sm bg-slate-50 p-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <div className="flex items-center text-slate-400">
            <span
              onClick={() => router.push("/")}
              className="hover:text-slate-600 cursor-pointer"
            >
              Home
            </span>
            <span className="mx-2">/</span>
            <span
              onClick={() => router.push("/jobs")}
              className="hover:text-slate-600 cursor-pointer"
            >
              Find Job
            </span>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-medium truncate max-w-[150px]">
              {job.title}
            </span>
          </div>
        </div>

        {/* Job Header Card */}
        <div className="bg-white ">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Logo */}
              <div className="w-20 h-20 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm shrink-0 uppercase font-black text-2xl text-slate-300 italic">
                {job.companyName ? job.companyName.charAt(0) : "J"}
              </div>

              {/* Basic Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {job.companyName}
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location.city}, {job.location.state}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {job.employmentType}
                  </div>
                  <div className="flex items-center gap-1 text-slate-900 font-medium">
                    <DollarSign className="w-4 h-4" />
                    {job.salary
                      ? `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`
                      : "Salary Not Disclosed"}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  {job.contact.email && (
                    <a
                      href={`mailto:${job.contact.email}`}
                      className="text-slate-500 hover:text-slate-900 flex items-center gap-1"
                    >
                      {job.contact.email}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button
                onClick={handleToggleBookmark}
                className={`p-3 border rounded-xl transition-colors ${
                  job.bookmarks?.includes(userId || "")
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    job.bookmarks?.includes(userId || "") ? "fill-current" : ""
                  }`}
                />
              </button>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                {job.expiresAt && (
                  <div className="text-sm font-medium text-slate-500 flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Job expire in :{" "}
                    <span className="text-orange-600">
                      {getTimeRemaining(job.expiresAt)}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleApplyClick}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full sm:w-auto disabled:opacity-50"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-50">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Job Description
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8">
                    Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8">
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="flex items-center gap-4 py-6 mt-6 border-t border-slate-50">
                <span className="font-semibold text-slate-900">
                  Share this job:
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-pink-600 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-sky-500 bg-sky-50 rounded-full hover:bg-sky-100 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Job Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Job Overview
              </h3>

              <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                <OverviewItem
                  icon={<Calendar />}
                  label="Job Posted"
                  value={new Date(job.createdAt).toLocaleDateString()}
                />
                <OverviewItem
                  icon={<Clock />}
                  label="Job expire In"
                  value={
                    job.expiresAt
                      ? new Date(job.expiresAt).toLocaleDateString()
                      : "No expiry"
                  }
                />
                <OverviewItem
                  icon={<Briefcase />}
                  label="Education"
                  value={job.education ? job.education : "Not Specified"}
                />

                <OverviewItem
                  icon={<DollarSign />}
                  label="Salary"
                  value={
                    job.salary
                      ? `${job.salary.min}-${job.salary.max}`
                      : "Negotiable"
                  }
                />
                <OverviewItem
                  icon={<MapPin />}
                  label="Location"
                  value={job.location.city}
                />
                <OverviewItem
                  icon={<Briefcase />}
                  label="Job Type"
                  value={job.employmentType}
                />

                <OverviewItem
                  icon={<Briefcase />}
                  label="Experience"
                  value={job.experience ? job.experience : "Not Specified"}
                />
                <OverviewItem
                  icon={<Briefcase />}
                  label="Applications"
                  value={`${job.applicationCount} Applicants`}
                />
              </div>
            </div>

            {/* Company Profile Integration */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center p-2 uppercase font-bold text-slate-300">
                  {job.companyName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    {job.companyName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Contact Person: {job.contact.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-medium text-slate-900">
                    {job.contact.mobileNumber}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="font-medium text-slate-900">
                    {job.contact.whatsappNumber}
                  </span>
                </div>
                {job.contact.email && (
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-medium text-slate-900 truncate max-w-[150px]">
                      {job.contact.email}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs Section */}
        {similarJobs.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Related Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSimilarJobs.map((similarJob) => (
                <div
                  key={similarJob._id}
                  onClick={() => router.push(`/jobs/${similarJob._id}`)}
                  className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Company Logo/Icon */}
                      <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-white p-2">
                        {/* Mockup shows a generic pink icon, using a sphere-like lucide icon or company initial */}
                        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {similarJob.companyName}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="w-3 h-3" />
                          {similarJob.location.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {similarJob.title}.
                  </h3>

                  <div className="mt-auto flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg">
                      {similarJob.employmentType
                        .toLowerCase()
                        .replace("_", "-")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {similarJob.salary
                        ? `₹${similarJob.salary.min / 1000}k-₹${similarJob.salary.max / 1000}k/month`
                        : "Salary Not Disclosed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Related Jobs Pagination */}
            {totalSimilarPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12 pb-8">
                <button
                  onClick={() =>
                    setSimilarJobsPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={similarJobsPage === 1}
                  className="p-3 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-blue-600 disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSimilarPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSimilarJobsPage(idx + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                        similarJobsPage === idx + 1
                          ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                          : "text-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      {(idx + 1).toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setSimilarJobsPage((prev) =>
                      Math.min(prev + 1, totalSimilarPages),
                    )
                  }
                  disabled={similarJobsPage === totalSimilarPages}
                  className="p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
      <ApplyJobModal
        job={job}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}

function OverviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-blue-600 mb-1 w-5 h-5">{icon}</div>
      <span className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}
