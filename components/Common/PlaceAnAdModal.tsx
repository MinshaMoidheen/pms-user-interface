"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, User, Briefcase, Mail, ChevronDown, Palette, Wallet, TrendingUp, Monitor, Code, Users, Megaphone, MoreHorizontal, ChevronRight } from "lucide-react";

interface PlaceAnAdModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlaceAnAdModal: React.FC<PlaceAnAdModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedJobSubCategory, setSelectedJobSubCategory] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [role, setRole] = useState<"Landlord" | "Agent" | null>(null);
    const [contactInfo, setContactInfo] = useState({
        fullName: "",
        email: "",
        phone: ""
    });



    const jobSubCategories = [
        { id: "design", name: "Design", icon: Palette },
        { id: "business", name: "Business", icon: Briefcase },
        { id: "finance", name: "Finance", icon: Wallet },
        { id: "sales", name: "Sales", icon: TrendingUp },
        { id: "technology", name: "Technology", icon: Monitor },
        { id: "engineering", name: "Engineering", icon: Code },
        { id: "hr", name: "Human Resources", icon: Users },
        { id: "marketing", name: "Marketing", icon: Megaphone },
        { id: "other", name: "Other", icon: MoreHorizontal },
    ];

    const categories = [
        { id: "sale", name: "Property For Sale", image: "/images/propertysale.png" },
        { id: "rent", name: "Property For Rent", image: "/images/propertyrent.png" },
        { id: "jobs", name: "Jobs", image: "/images/jobs.png" },
    ];

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setStep(2);
    };

    const handleJobSubCategorySelect = (subId: string) => {
        setSelectedJobSubCategory(subId);
        setStep(3);
    };

    const handleBack = () => {
        if (step === 3 && selectedCategory !== 'jobs') {
            setStep(2);
        } else if (step === 3 && selectedCategory === 'jobs') {
            setStep(2); // Job sub-cat
        } else if (step === 4 && selectedCategory === 'jobs') {
            setStep(3); // Title entry
        } else {
            setStep(prev => Math.max(1, prev - 1));
        }
    };

    const handleContinueToNext = () => {
        if (step === 2 && selectedCategory !== 'jobs') {
            setStep(3); // Role Select for Property
        } else if (step === 3) {
            if (selectedCategory === 'jobs') {
                setStep(4); // Contact Info for Jobs
            } else {
                setStep(4); // Contact Info for Property (already at role)
            }
        }
    };

    const handleRoleSelect = (selectedRole: "Landlord" | "Agent") => {
        setRole(selectedRole);
        setStep(4);
    };

    const handleComplete = () => {
        setStep(5);
    };

    const isLastStep = step === 5;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full ${step === 5 ? "max-w-2xl" : "max-w-2xl"} bg-[#F8F9FA] rounded-[40px] shadow-2xl p-8 md:p-10 animate-in zoom-in-95 fade-in duration-300`}>
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-6">
                    {step > 1 && !isLastStep ? (
                        <button
                            onClick={handleBack}
                            className="p-3 bg-slate-200/50 hover:bg-slate-200 text-slate-600 rounded-full transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="w-12 h-12" /> // Spacer
                    )}
                    <button
                        onClick={onClose}
                        className="p-3 bg-slate-200/50 hover:bg-slate-200 text-slate-600 rounded-full transition-all active:scale-95"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {step === 1 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">

    {/* Heading */}
    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
        What are you planning to list today?
    </h2>


    {/* Description */}
    <p className="text-slate-500 text-sm mb-6 font-medium">
        Choose what would you like to place today
    </p>


    {/* Categories */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {categories.map((cat) => (

            <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-all group"
            >

                {/* Image */}
                <div className="w-14 h-14 flex items-center justify-center">

                    <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />

                </div>


                {/* Text */}
                <span className="text-sm font-semibold text-slate-900 text-center leading-tight">

                    {cat.name}

                </span>


            </button>

        ))}

    </div>

</div>
                ) : step === 2 && selectedCategory === 'jobs' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">

    {/* Heading */}
    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
        Select the category
    </h2>

    {/* Description */}
    <p className="text-slate-500 text-sm mb-5 font-medium">
        Select what category of talent you want to hire
    </p>


    {/* Category List */}
    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">

        {jobSubCategories.map((sub) => {

            const Icon = sub.icon;

            return (

                <button
                    key={sub.id}
                    onClick={() => handleJobSubCategorySelect(sub.id)}
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-all group"
                >

                    <div className="flex items-center gap-4">

                        {/* Icon */}
                        <div className="w-8 h-8 flex items-center justify-center text-blue-600">

                            <Icon className="w-5 h-5" />

                        </div>


                        {/* Text */}
                        <span className="text-sm font-semibold text-slate-900">
                            {sub.name}
                        </span>

                    </div>


                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />

                </button>

            );

        })}

    </div>

</div>
                ) : (step === 2 && selectedCategory !== 'jobs') || (step === 3 && selectedCategory === 'jobs') ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center max-w-xl mx-auto">

    {/* Heading */}
    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
        Enter a short title to describe your listing
    </h2>


    {/* Description */}
    <p className="text-slate-500 text-sm mb-6 font-medium">
        Make sure that the title is informative and attractive
    </p>



    <div className="w-full space-y-4">

        {/* Input */}
       <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder={
        selectedCategory === 'jobs'
            ? "e.g. Software Engineer with 2+ years experience"
            : "e.g. 1 Bedroom apartment in Bangalore"
    }
    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-[#2D5BFF] outline-none text-sm font-medium text-left"
/>



        {/* Button */}
        <button
            onClick={handleContinueToNext}
            disabled={!title.trim()}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]
            ${
                title.trim()
                ? "bg-[#FF5A3C] text-white shadow-md hover:bg-blue-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >

            Continue

        </button>


    </div>

</div>
                ) : step === 3 && selectedCategory !== 'jobs' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-lg md:text-3xl font-black text-slate-900 mb-4 leading-tight">
    Are you a Landlord or Agent?
</h2>

                        <div className="grid grid-cols-2 gap-6 mt-8">

    {/* Landlord */}
    <button
        onClick={() => handleRoleSelect("Landlord")}
        className="p-6 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
    >
        <span className="text-lg font-bold text-slate-900">Landlord</span>

        <div className="w-32 h-32 flex items-center justify-center">
            <div className="relative">

                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <svg className="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </div>

                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#FF5A3C] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition">
                    <User className="w-5 h-5 text-white" />
                </div>

            </div>
        </div>
    </button>


    {/* Agent */}
    <button
        onClick={() => handleRoleSelect("Agent")}
        className="p-6 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
    >
        <span className="text-lg font-bold text-slate-900">Agent</span>

        <div className="w-32 h-32 flex items-center justify-center">
            <div className="relative">

                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <svg className="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                </div>

                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#2D5BFF] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition">
                    <Briefcase className="w-5 h-5 text-white" />
                </div>

            </div>
        </div>
    </button>

</div>
                    </div>
                ) : step === 4 ? (
                   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">

    {/* Heading */}
    <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
        Fill out your contact info
    </h2>

    <p className="text-sm text-slate-500 mb-6 font-medium">
        Make sure that the contact is correct and reachable
    </p>


    <div className="space-y-5">

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div className="space-y-2">

                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Full Name
                </label>

                <input
                    type="text"
                    placeholder="Name"
                    value={contactInfo.fullName}
                    onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-[#2D5BFF] outline-none text-sm font-medium"
                />

            </div>


            {/* Email */}
            <div className="space-y-2">

                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Email
                </label>

                <div className="relative">

                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                        type="email"
                        placeholder="Email address"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-[#2D5BFF] outline-none text-sm font-medium"
                    />

                </div>

            </div>

        </div>


        {/* Phone */}
        <div className="space-y-2">

            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Phone
            </label>

            <div className="flex gap-3">

                {/* Country */}
                <div className="px-4 py-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2">

                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                        className="w-5 h-4"
                    />

                    <span className="font-semibold text-slate-700 text-sm">
                        +91
                    </span>

                    <ChevronDown className="w-4 h-4 text-slate-400" />

                </div>


                {/* Phone input */}
                <input
                    type="tel"
                    placeholder="Phone number"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-[#2D5BFF] outline-none text-sm font-medium"
                />

            </div>

        </div>


        {/* Button */}
        <button
            onClick={handleComplete}
            disabled={!contactInfo.fullName || !contactInfo.email || !contactInfo.phone}
            className={`w-full py-3 rounded-xl text-sm font-bold mt-4 transition-all active:scale-[0.98]
            ${
                contactInfo.fullName && contactInfo.email && contactInfo.phone
                ? "bg-[#FF5A3C] text-white hover:bg-orange-600"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
        >
            Complete
        </button>


    </div>

</div>
                ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-xl mx-auto">

    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">

        {/* Image */}
        <div className="w-full md:w-1/2 max-w-[220px]">
            <img
                src="/images/inquiry.png"
                alt="Inquiry Received"
                className="w-full h-auto object-contain"
            />
        </div>


        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                Your Inquiry has been received
            </h2>

            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                We will be reaching out to you soon for further details
            </p>

        </div>

    </div>


    {/* Button */}
    <button
        onClick={onClose}
        className="w-full py-3 bg-[#FF5A3C] text-white rounded-xl text-sm font-bold shadow-md hover:bg-orange-600 transition active:scale-[0.98]"
    >
        Okay notify me
    </button>

</div>
                )}
            </div>
        </div>
    );
};

export default PlaceAnAdModal;
