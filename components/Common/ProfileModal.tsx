"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  Upload,
  FileText,
  Plus,
  ChevronRight,
  CheckCircle2,
  X,
  CreditCard,
  Clock,
  ShieldCheck,
  Zap,
  LogOut,
} from "lucide-react";
import SubscriptionModal from "../Landing-page/SubscriptionModal";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/services/usersApiSlice";
import { useGetMyApplicationsQuery } from "@/store/services/jobApiSlice";
import { useLogoutMutation } from "@/store/services/authApiSlice";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/store/constants";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
     const [currentPage, setCurrentPage] = useState(1);
       const [activeTab, setActiveTab] = useState<
    "Personal" | "Applied Jobs" | "Subscription"
  >("Personal");
 

  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const router = useRouter();

  const { data: applicationsData, isLoading: isApplicationsLoading } =
    useGetMyApplicationsQuery({
      page: currentPage,
      limit: 5,
    });



  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true); // Defaulting for demo

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [personalWebsite, setPersonalWebsite] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    if (profileData?.data?.user?.profile) {
      const p = profileData.data.user.profile;
      setFirstName(p.firstName || "");
      setLastName(p.lastName || "");
      setExperience(p.experience?.years?.toString() || "");
      setEducation(p.education?.degree || "");
      setProfilePictureUrl(`${BASE_URL}${p.profilePicture}`);
    }
  }, [profileData]);

  const handleSaveProfile = async () => {
    if (!profileData?.data?.user?._id) return;

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("experience[years]", experience);
      formData.append("education[degree]", education);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      await updateProfile({
        body: formData,
      }).unwrap();

      // You might want to show a success message here
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePictureUrl(URL.createObjectURL(file));
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const tabs: {
    name: "Personal" | "Applied Jobs" | "Subscription";
    icon: typeof User;
  }[] = [
    { name: "Personal", icon: User },
    { name: "Applied Jobs", icon: Briefcase },
    { name: "Subscription", icon: CreditCard },
  ];

  const resumes = [
    ...(profileData?.data?.user?.profile?.cv
      ? [
          {
            title: "CV",
            size: "View Link",
            url: profileData.data.user.profile.cv,
          },
        ]
      : []),
    ...(profileData?.data?.user?.profile?.resume
      ? [
          {
            title: "Resume",
            size: "View Link",
            url: profileData.data.user.profile.resume,
          },
        ]
      : []),
  ];

  const appliedJobs = applicationsData?.data?.applications || [];
  const pagination = applicationsData?.data?.pagination;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      onClose();
      router.push("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
            Profile Settings
          </h1>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all relative ${
                  activeTab === tab.name
                    ? "text-[#2D5BFF]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                {activeTab === tab.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D5BFF]" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "Personal" ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#2D5BFF] rounded-full" />
                    Basic Information
                  </h2>
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                    onClick={handleLogout}
                    disabled={isLogoutLoading}
                  >
                    <LogOut className="w-4 h-4" />
                    {isLogoutLoading ? "Logging out..." : "Logout"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Photo Upload */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <label className="w-full aspect-square max-w-[160px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center group hover:border-[#2D5BFF] transition-colors cursor-pointer overflow-hidden">
                      {profilePictureUrl ? (
                        <img
                          src={profilePictureUrl}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#2D5BFF]" />
                          </div>
                          <p className="text-[10px] text-slate-500 leading-tight uppercase font-bold tracking-wider">
                            Upload photo
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            Max 2MB, JS/PNG
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  </div>

                  {/* Form Fields */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                          First name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full px-4 py-3.5  text-black bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full px-4 py-3.5 text-black bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                          Experience (Years)
                        </label>
                        <input
                          type="number"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="5"
                          className="w-full px-4 py-3.5 text-black bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                          Education
                        </label>
                        <input
                          type="text"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          placeholder="Bachelors"
                          className="w-full px-4 py-3.5 text-black bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                        Personal Website
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={personalWebsite}
                          onChange={(e) => setPersonalWebsite(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full pl-11 pr-4 py-3.5  text-black bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      disabled={isUpdating}
                      className="w-full sm:w-auto bg-[#2D5BFF] text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>

              {/* CV/Resume */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#FF5A3C] rounded-full" />
                  Your CV/Resume
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resumes.map((resume, idx) => (
                    <a
                      key={idx}
                      href={resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-slate-50 bg-slate-50/30 rounded-2xl flex items-center gap-3 group hover:border-[#2D5BFF] hover:bg-white hover:shadow-md hover:shadow-blue-500/5 transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-[#2D5BFF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2D5BFF] transition-colors">
                        <FileText className="w-5 h-5 text-[#2D5BFF] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {resume.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {resume.size}
                        </p>
                      </div>
                    </a>
                  ))}

                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 group hover:border-[#2D5BFF] hover:bg-white transition-all cursor-pointer">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-[#2D5BFF]/10 transition-colors">
                      <Plus className="w-5 h-5 text-slate-400 group-hover:text-[#2D5BFF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-400 group-hover:text-[#2D5BFF]">
                        Add New
                      </p>
                      <p className="text-[11px] text-slate-400">PDF, Max 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "Subscription" ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Subscription Management
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Plan Info */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                    {/* Background Gradient Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D5BFF]/5 rounded-bl-full -mr-8 -mt-8" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="p-3 bg-blue-50 rounded-2xl">
                          <Zap className="w-6 h-6 text-[#2D5BFF]" />
                        </div>
                        <span
                          className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isSubscribed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                        >
                          {isSubscribed ? "Active Account" : "Expired"}
                        </span>
                      </div>

                      <div className="mb-8">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                          Current Plan
                        </p>
                        <h3 className="text-3xl font-black text-slate-900">
                          Silver Monthly
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                          ₹699 / per month
                        </p>
                      </div>

                      <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              Renews on
                            </p>
                            <p className="text-xs font-bold text-slate-800">
                              17 March, 2026
                            </p>
                          </div>
                        </div>
                        <div className="w-px h-8 bg-slate-200" />
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              Payment
                            </p>
                            <p className="text-xs font-bold text-slate-800">
                              WhatsApp Pay
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setIsSubscriptionModalOpen(true)}
                      className="bg-white border border-slate-200 text-slate-700 py-4 px-6 rounded-2xl font-bold hover:border-[#2D5BFF] hover:text-[#2D5BFF] transition-all flex items-center justify-center gap-2 group"
                    >
                      Renew Plan
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => setIsSubscriptionModalOpen(true)}
                      className="bg-[#2D5BFF] text-white py-4 px-6 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group active:scale-95"
                    >
                      Upgrade Plan
                      <Zap className="w-4 h-4 fill-white" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Features/Benefits */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden h-full">
                    {/* Decorative Element */}
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

                    <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-[#2D5BFF] rounded-full" />
                      Plan Benefits
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Minimum 6 interview calls",
                        "Dedicated PMS Club support",
                        "Direct recruiter contact",
                        "Priority shortlisting",
                        "WhatsApp support line",
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="p-1 bg-white/10 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <span className="text-sm font-medium text-slate-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
                        Need help?
                      </p>
                      <p className="text-xs text-slate-300">
                        Contact our support team anytime via WhatsApp for
                        subscription queries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Applied Jobs
                </h2>
                <span className="text-xl font-medium text-slate-400">
                  ({pagination?.total || 0})
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                {/* Table Header - Hidden on Mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-100">
                  <div className="col-span-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Jobs
                  </div>
                  <div className="col-span-3 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Date Applied
                  </div>
                  <div className="col-span-2 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Status
                  </div>
                  <div className="col-span-2 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Action
                  </div>
                </div>

                {/* Table Body / Mobile Card List */}
                <div className="divide-y divide-slate-100">
                  {appliedJobs.map((application, idx) => {
                    const job = application.jobPost;
                    const globalIdx = (currentPage - 1) * 5 + idx;
                    return (
                      <div
                        key={application._id}
                        className="flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-4 px-6 md:px-8 py-8 items-start md:items-center hover:bg-slate-50/50 transition-colors group"
                      >
                        {/* Job Info */}
                        <div className="md:col-span-5 flex items-start gap-4 md:gap-5 w-full">
                          <div
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 p-3 shadow-sm ${
                              globalIdx % 4 === 0
                                ? "bg-[#8BC34A]"
                                : globalIdx % 4 === 1
                                  ? "bg-black"
                                  : globalIdx % 4 === 2
                                    ? "bg-[#E91E63]"
                                    : "bg-white border border-slate-100"
                            }`}
                          >
                            <Briefcase className="w-full h-full text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h3 className="text-base md:text-lg font-extrabold text-slate-900 truncate">
                                {job?.title || "Untitled Job"}
                              </h3>
                              <span className="px-2 py-0.5 bg-purple-50 text-purple-400 text-[10px] font-extrabold rounded uppercase tracking-tighter">
                                {job?.employmentType || "Full Time"}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-slate-400 font-bold">
                              <span className="flex items-center gap-1.5 leading-none">
                                <svg
                                  className="w-3 h-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3.5"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                {job?.location?.city || "Unknown City"}
                              </span>
                              <span className="leading-none">
                                {job?.salary?.min && job?.salary?.max
                                  ? `₹${job.salary.min}k-${job.salary.max}k / month`
                                  : "Salary Not Disclosed"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Date Applied */}
                        <div className="md:col-span-3 text-xs md:text-sm font-bold text-slate-500 md:text-center w-full md:w-auto">
                          <span className="md:hidden block text-[10px] text-slate-300 font-extrabold uppercase mb-1">
                            Date Applied
                          </span>
                          {new Date(application.appliedAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </div>

                        {/* Status */}
                        <div className="md:col-span-2 flex md:justify-center w-full md:w-auto">
                          <div
                            className={`flex items-center gap-2 font-extrabold text-sm leading-none ${
                              application.status === "ACCEPTED"
                                ? "text-green-500"
                                : application.status === "SHORTLISTED"
                                  ? "text-blue-500"
                                  : application.status === "REJECTED"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                            }`}
                          >
                            <div
                              className={`p-0.5 rounded-full ${
                                application.status === "ACCEPTED"
                                  ? "bg-green-50"
                                  : application.status === "SHORTLISTED"
                                    ? "bg-blue-50"
                                    : application.status === "REJECTED"
                                      ? "bg-red-50"
                                      : "bg-yellow-50"
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            {application.status}
                          </div>
                        </div>

                        {/* Action */}
                        <div className="md:col-span-2 flex md:justify-center w-full md:w-auto mt-1 md:mt-0">
                          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl md:rounded-full text-slate-500 font-extrabold text-sm hover:border-[#2D5BFF] hover:text-[#2D5BFF] hover:bg-blue-50/50 transition-all w-full md:w-auto shadow-sm md:shadow-none">
                            View Details
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination */}
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`p-3 transition-colors ${currentPage === 1 ? "text-slate-200" : "text-slate-300 hover:text-slate-600"}`}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(pagination?.pages || 0)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-extrabold text-sm transition-all ${
                        currentPage === i + 1
                          ? "bg-[#2042C8] text-white shadow-xl shadow-blue-500/30"
                          : "text-slate-400 hover:bg-white hover:text-slate-600"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(pagination?.pages || 1, prev + 1),
                    )
                  }
                  disabled={currentPage === (pagination?.pages || 1)}
                  className={`p-3 transition-all shadow-md active:scale-90 rounded-full ${
                    currentPage === (pagination?.pages || 1)
                      ? "bg-slate-100 text-slate-300"
                      : "bg-[#E9EFFF] text-[#2D5BFF] hover:bg-blue-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default ProfileModal;
