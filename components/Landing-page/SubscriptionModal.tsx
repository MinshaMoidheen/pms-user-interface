"use client";

import React, { useState } from 'react';
import { X, Check, ArrowLeft, Phone, Mail, User } from 'lucide-react';
import Image from 'next/image';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubscriptionSuccess?: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscriptionSuccess }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const [selectedCountry, setSelectedCountry] = useState({ code: 'IN', prefix: '+91', flag: '🇮🇳', name: 'India' });
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

    const countries = [
        { code: 'IN', prefix: '+91', flag: '🇮🇳', name: 'India' },
        { code: 'US', prefix: '+1', flag: '🇺🇸', name: 'USA' },
        { code: 'GB', prefix: '+44', flag: '🇬🇧', name: 'UK' },
        { code: 'AE', prefix: '+971', flag: '🇦🇪', name: 'UAE' },
        { code: 'SA', prefix: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
        { code: 'QA', prefix: '+974', flag: '🇶🇦', name: 'Qatar' },
    ];

    if (!isOpen) return null;

    const nextStep = () => {
        const next = Math.min(step + 1, 4);
        if (next === 4 && onSubscriptionSuccess) {
            onSubscriptionSuccess();
        }
        setStep(next);
    };
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="flex flex-col md:flex-row gap-8 items-stretch h-full">
                        <div className="flex-1">
                            <h2 className="text-2xl font-extrabold text-[#1A3EB5] mb-2 leading-tight">
                                Monthly subscription <br /> plan for <span className="text-[#1A3EB5]">₹699</span>
                            </h2>
                            <p className="text-gray-500 text-sm mb-6">
                                Subscribe to our monthly plan for 6 guaranteed interview chances
                            </p>

                            <h3 className="font-bold text-black mb-4">What you'll get with this subscription</h3>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-700">Minimum of 6 interview calls to the applied job vacancies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-700">Dedicated PMS Club support throughout the interview process</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-700">Direct contact with the hiring recruiters</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-blue-100 rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-700">Increased chances for getting shortlisted</span>
                                </li>
                            </ul>

                            <button
                                onClick={nextStep}
                                className="w-full bg-[#1A3EB5] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors mb-2"
                            >
                                Subscribe
                            </button>
                            <div className="text-center">
                                <button className="text-xs text-blue-600 underline">Terms and Conditions</button>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 items-center justify-center relative bg-gray-50 rounded-2xl overflow-hidden p-8">
                            <Image
                                src="/images/illustartion.png"
                                alt="Subscription Illustration"
                                width={300}
                                height={300}
                                className="object-contain"
                            />
                        </div>
                    </div>
                );
            case 2:
                const handleContinue = (e: React.FormEvent) => {
                    e.preventDefault();
                    nextStep();
                };

                return (
                    <form onSubmit={handleContinue} className="h-full flex flex-col">
                        <div className="mb-6 flex items-center gap-2">
                            <button type="button" onClick={prevStep} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-extrabold text-black">Fill out your contact info</h2>
                                <p className="text-gray-500 text-sm">Make sure that the contact is correct and reachable</p>
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-tight">Contact info</label>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Name"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Email address"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-1">Phone</label>
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                                    className="flex items-center gap-2 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl min-w-[100px] hover:bg-gray-100 transition-colors"
                                                >
                                                    <span className="text-lg leading-none">{selectedCountry.flag}</span>
                                                    <span className="text-sm font-medium text-black">{selectedCountry.prefix}</span>
                                                    <svg className={`w-3 h-3 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {isCountryDropdownOpen && (
                                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-30 py-2 max-h-60 overflow-y-auto">
                                                        {countries.map((c) => (
                                                            <button
                                                                type="button"
                                                                key={c.code}
                                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                                                                onClick={() => {
                                                                    setSelectedCountry(c);
                                                                    setIsCountryDropdownOpen(false);
                                                                }}
                                                            >
                                                                <span className="text-lg">{c.flag}</span>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-bold text-black">{c.prefix}</span>
                                                                    <span className="text-[10px] text-gray-400">{c.name}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="Phone number"
                                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1A3EB5] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors mt-8"
                        >
                            Continue
                        </button>
                    </form>
                );
            case 3:
                return (
                    <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                        <div className="flex-1 w-full bg-[#F5F7FF] rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                            <div className="relative flex items-center justify-center">
                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg relative">
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-md">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.411-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                                            ))}
                                        </div>
                                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-1"></div>
                                        <div className="w-8 h-1.5 bg-gray-100 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="absolute -left-12 top-0 p-3 bg-white rounded-xl shadow-md rotate-12">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="absolute -right-8 bottom-0 p-3 bg-white rounded-xl shadow-md rotate-12">
                                    <Mail className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-extrabold text-black mb-4">
                                Payment through Whatsapp
                            </h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Please continue to whatsapp to complete your payment
                            </p>

                            <button
                                onClick={nextStep}
                                className="w-full bg-[#1A3EB5] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
                            >
                                Redirect me
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                        <div className="w-full bg-[#1A3EB5] rounded-3xl p-12 mb-8 relative overflow-hidden">
                            {/* Decorative elements to mimic the "Success" design */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="absolute bg-white rounded-full" style={{
                                        width: Math.random() * 8 + 4 + 'px',
                                        height: Math.random() * 8 + 4 + 'px',
                                        top: Math.random() * 100 + '%',
                                        left: Math.random() * 100 + '%',
                                    }}></div>
                                ))}
                            </div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                                    You are now our <br /> Subscribed Member.
                                </h2>
                                <p className="text-blue-100 text-sm mb-4">
                                    You have unlocked 6 interview calls for this month
                                </p>
                                <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-white text-xs border border-white/20">
                                    Subscription valid till 17/03/2026
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full max-w-sm bg-white text-[#1A3EB5] py-4 rounded-xl font-bold text-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Great !
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className={`relative w-full ${step === 4 ? 'max-w-lg' : 'max-w-4xl'} bg-white rounded-[32px] p-6 md:p-10 shadow-2xl transform transition-all overflow-hidden max-h-[95vh]`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-20"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Content */}
                <div className="h-full overflow-y-auto scrollbar-hide">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
