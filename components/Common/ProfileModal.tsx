"use client";

import React, { useState, useEffect } from "react";
import { User, Briefcase, Upload, FileText, Plus, ChevronRight, CheckCircle2, X } from "lucide-react";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<"personal" | "applied">("personal");
    const [currentPage, setCurrentPage] = useState(1);

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

    const tabs = [
        { name: "Personal", icon: User },
        { name: "Applied Jobs", icon: Briefcase },
    ];

    const resumes = [
        { title: "Professional Resume", size: "128 KB" },
        { title: "Product Designer", size: "128 KB" },
        { title: "UI/UX Designer", size: "128 KB" },
    ];

    const appliedJobs = [
        { title: "Networking Engineer", company: "Upwork", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Upwork-logo.svg", type: "WFO", date: "Dec 2, 2025 19:28", status: "Active" },
        { title: "Frontend Developer", company: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", type: "Remote", date: "Dec 5, 2025 10:15", status: "Active" },
        { title: "Backend Architect", company: "Dribbble", logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/Dribbble_logo.svg", type: "Hybrid", date: "Dec 8, 2025 14:30", status: "Active" },
        { title: "Product Designer", company: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", type: "WFO", date: "Dec 10, 2025 09:00", status: "Active" },
        { title: "DevOps Specialist", company: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", type: "Remote", date: "Dec 12, 2025 16:45", status: "Active" },
        { title: "Security Analyst", company: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg", type: "WFO", date: "Dec 15, 2025 11:20", status: "Active" },
        { title: "Data Scientist", company: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", type: "Remote", date: "Dec 18, 2025 13:10", status: "Active" },
        { title: "Cloud Architect", company: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", type: "Hybrid", date: "Dec 20, 2025 15:55", status: "Active" },
        { title: "UI Researcher", company: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", type: "Remote", date: "Dec 22, 2025 08:40", status: "Active" },
        { title: "React Developer", company: "Vercel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg", type: "WFO", date: "Dec 25, 2025 12:00", status: "Active" },
        { title: "Golang Dev", company: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Uber_logo_2018.svg", type: "Hybrid", date: "Dec 28, 2025 14:15", status: "Active" },
        { title: "iOS Engineer", company: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg", type: "Remote", date: "Dec 30, 2025 10:30", status: "Active" },
        { title: "Node.js Developer", company: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", type: "WFO", date: "Jan 2, 2026 09:45", status: "Active" },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 fade-in duration-300">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
                    <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">Profile Settings</h1>
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
                                className={`flex items-center gap-2 pb-4 text-sm font-semibold transition-all relative ${activeTab === tab.name ? "text-[#2D5BFF]" : "text-slate-400 hover:text-slate-600"
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
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-[#2D5BFF] rounded-full" />
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                    {/* Photo Upload */}
                                    <div className="md:col-span-4 flex flex-col items-center">
                                        <div className="w-full aspect-square max-w-[160px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center group hover:border-[#2D5BFF] transition-colors cursor-pointer">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#2D5BFF]" />
                                            </div>
                                            <p className="text-[10px] text-slate-500 leading-tight uppercase font-bold tracking-wider">
                                                Upload photo
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-1">
                                                Max 2MB, JS/PNG
                                            </p>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="md:col-span-8 space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">First name</label>
                                                <input
                                                    type="text"
                                                    placeholder="John"
                                                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Doe"
                                                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">Experience</label>
                                                <input
                                                    type="text"
                                                    placeholder="5+ Years"
                                                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">Education</label>
                                                <input
                                                    type="text"
                                                    placeholder="Bachelors"
                                                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1">Personal Website</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="https://example.com"
                                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#2D5BFF]/10 focus:border-[#2D5BFF] focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <button className="w-full sm:w-auto bg-[#2D5BFF] text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                            Save Changes
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
                                        <div
                                            key={idx}
                                            className="p-4 border border-slate-50 bg-slate-50/30 rounded-2xl flex items-center gap-3 group hover:border-[#2D5BFF] hover:bg-white hover:shadow-md hover:shadow-blue-500/5 transition-all cursor-pointer"
                                        >
                                            <div className="w-10 h-10 bg-[#2D5BFF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2D5BFF] transition-colors">
                                                <FileText className="w-5 h-5 text-[#2D5BFF] group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-900 truncate">{resume.title}</p>
                                                <p className="text-[11px] text-slate-500">{resume.size}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center gap-3 group hover:border-[#2D5BFF] hover:bg-white transition-all cursor-pointer">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-[#2D5BFF]/10 transition-colors">
                                            <Plus className="w-5 h-5 text-slate-400 group-hover:text-[#2D5BFF]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-400 group-hover:text-[#2D5BFF]">Add New</p>
                                            <p className="text-[11px] text-slate-400">PDF, Max 5MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Applied Jobs</h2>
                                <span className="text-xl font-medium text-slate-400">({appliedJobs.length})</span>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                                {/* Table Header - Hidden on Mobile */}
                                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-100">
                                    <div className="col-span-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Jobs</div>
                                    <div className="col-span-3 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Date Applied</div>
                                    <div className="col-span-2 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</div>
                                    <div className="col-span-2 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Action</div>
                                </div>

                                {/* Table Body / Mobile Card List */}
                                <div className="divide-y divide-slate-100">
                                    {appliedJobs.slice((currentPage - 1) * 5, currentPage * 5).map((job, idx) => {
                                        const globalIdx = (currentPage - 1) * 5 + idx;
                                        return (
                                            <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-5 md:gap-4 px-6 md:px-8 py-8 items-start md:items-center hover:bg-slate-50/50 transition-colors group">
                                                {/* Job Info */}
                                                <div className="md:col-span-5 flex items-start gap-4 md:gap-5 w-full">
                                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 p-3 shadow-sm ${globalIdx % 4 === 0 ? "bg-[#8BC34A]" :
                                                        globalIdx % 4 === 1 ? "bg-black" :
                                                            globalIdx % 4 === 2 ? "bg-[#E91E63]" :
                                                                "bg-white border border-slate-100"
                                                        }`}>
                                                        {globalIdx % 4 === 0 ? <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Upwork-logo.svg" alt="Upwork" className="w-full h-full object-contain filter invert" />
                                                            : globalIdx % 4 === 1 ? <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-full h-full object-contain filter invert brightness-0" />
                                                                : globalIdx % 4 === 2 ? (
                                                                    <div className="w-full h-full border-2 border-white/30 rounded-full flex items-center justify-center">
                                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                                    </div>
                                                                )
                                                                    : <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-full h-full object-contain" />
                                                        }
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                            <h3 className="text-base md:text-lg font-extrabold text-slate-900 truncate">Networking Engineer</h3>
                                                            <span className="px-2 py-0.5 bg-purple-50 text-purple-400 text-[10px] font-extrabold rounded uppercase tracking-tighter">WFO</span>
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-slate-400 font-bold">
                                                            <span className="flex items-center gap-1.5 leading-none">
                                                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                                    <circle cx="12" cy="10" r="3" />
                                                                </svg>
                                                                Chennai
                                                            </span>
                                                            <span className="leading-none">₹50k-80k/month</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Date Applied */}
                                                <div className="md:col-span-3 text-xs md:text-sm font-bold text-slate-500 md:text-center w-full md:w-auto">
                                                    <span className="md:hidden block text-[10px] text-slate-300 font-extrabold uppercase mb-1">Date Applied</span>
                                                    Dec 2, 2025 19:28
                                                </div>

                                                {/* Status */}
                                                <div className="md:col-span-2 flex md:justify-center w-full md:w-auto">
                                                    <div className="flex items-center gap-2 text-[#4CAF50] font-extrabold text-sm leading-none">
                                                        <div className="p-0.5 bg-[#4CAF50]/10 rounded-full">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                        </div>
                                                        Active
                                                    </div>
                                                </div>

                                                {/* Action */}
                                                <div className="md:col-span-2 flex md:justify-center w-full md:w-auto mt-1 md:mt-0">
                                                    <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl md:rounded-full text-slate-500 font-extrabold text-sm hover:border-[#2D5BFF] hover:text-[#2D5BFF] hover:bg-blue-50/50 transition-all w-full md:w-auto shadow-sm md:shadow-none">
                                                        View Details
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`p-3 transition-colors ${currentPage === 1 ? "text-slate-200" : "text-slate-300 hover:text-slate-600"}`}
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-2">
                                    {[...Array(Math.ceil(appliedJobs.length / 5))].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-10 h-10 rounded-full font-extrabold text-sm transition-all ${currentPage === i + 1
                                                ? "bg-[#2042C8] text-white shadow-xl shadow-blue-500/30"
                                                : "text-slate-400 hover:bg-white hover:text-slate-600"
                                                }`}
                                        >
                                            {String(i + 1).padStart(2, '0')}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(appliedJobs.length / 5), prev + 1))}
                                    disabled={currentPage === Math.ceil(appliedJobs.length / 5)}
                                    className={`p-3 transition-all shadow-md active:scale-90 rounded-full ${currentPage === Math.ceil(appliedJobs.length / 5)
                                        ? "bg-slate-100 text-slate-300"
                                        : "bg-[#E9EFFF] text-[#2D5BFF] hover:bg-blue-100"
                                        }`}
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
