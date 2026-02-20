"use client";

import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { Job } from '@/data/jobs';

interface ApplyJobModalProps {
    job: Job;
    isOpen: boolean;
    onClose: () => void;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ job, isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        cv: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Close modal after showing success message
        setTimeout(() => {
            onClose();
            setIsSuccess(false);
            setFormData({ fullName: '', email: '', phone: '', cv: null });
        }, 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, cv: e.target.files[0] });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl transform transition-all flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">
                        Apply Job: {job.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-6">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <Check className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Application Sent!</h3>
                            <p className="text-slate-500">Your application for {job.title} has been submitted successfully.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Contact Info</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                placeholder="Name"
                                                className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                                                value={formData.fullName}
                                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Email</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email address"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <div className="flex">
                                        <div className="flex items-center justify-center px-3 border border-r-0 border-slate-200 rounded-l-lg bg-slate-50 min-w-[80px]">
                                            <span className="text-sm font-medium text-slate-600">🇮🇳 +91</span>
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="Phone number"
                                            className="w-full px-4 py-2.5 rounded-r-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700">Upload your Cv/Resume</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 transition-colors hover:border-blue-400 group cursor-pointer relative">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                    />
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
                                            <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {formData.cv ? formData.cv.name : 'Browse File or drop here'}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Only PDF format available. Max file size 12 MB.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Applying...' : 'Apply Now'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;
