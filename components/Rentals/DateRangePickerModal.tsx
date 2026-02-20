"use client";

import React, { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface DateRangePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (range: DateRange) => void;
    initialRange?: DateRange;
}

const DateRangePickerModal: React.FC<DateRangePickerModalProps> = ({
    isOpen,
    onClose,
    onApply,
    initialRange,
}) => {
    const [startDate, setStartDate] = useState<Date | null>(initialRange?.startDate || null);
    const [endDate, setEndDate] = useState<Date | null>(initialRange?.endDate || null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (initialRange) {
                setStartDate(initialRange.startDate);
                setEndDate(initialRange.endDate);
            }
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, initialRange]);

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const generateDays = (monthDate: Date) => {
        const days = [];
        const totalDays = daysInMonth(monthDate);
        const startDay = startDayOfMonth(monthDate);

        // Padding for start of month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Actual days
        for (let i = 1; i <= totalDays; i++) {
            days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), i));
        }

        return days;
    };

    const handleDateClick = (date: Date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (date < startDate) {
            setStartDate(date);
            setEndDate(null);
        } else if (date.getTime() === startDate.getTime()) {
            setStartDate(null);
        } else {
            setEndDate(date);
        }
    };

    const isSelected = (date: Date) => {
        if (!date) return false;
        return (
            (startDate && date.getTime() === startDate.getTime()) ||
            (endDate && date.getTime() === endDate.getTime())
        );
    };

    const isInRange = (date: Date) => {
        if (!date || !startDate || !endDate) return false;
        return date > startDate && date < endDate;
    };

    const isToday = (date: Date) => {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isPast = (date: Date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const formatMonth = (date: Date) => {
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    };

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1001] flex md:items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white md:rounded-[40px] shadow-2xl h-[92vh] md:h-auto overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 rounded-t-[40px] mt-auto md:mt-0">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Select Dates</h2>
                        {startDate && (
                            <p className="text-sm text-gray-500 mt-1">
                                {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                {endDate ? ` - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : " - Select end date"}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Calendar 1 */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                    className="p-2 hover:bg-gray-50 rounded-full border border-gray-100"
                                >
                                    <ChevronLeft size={20} className="text-gray-600" />
                                </button>
                                <h3 className="font-bold text-gray-900">{formatMonth(currentMonth)}</h3>
                                <div className="w-9 lg:hidden md:hidden" /> {/* Spacer for balance */}
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                    className="p-2 hover:bg-gray-50 rounded-full border border-gray-100 lg:hidden md:hidden"
                                >
                                    <ChevronRight size={20} className="text-gray-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-bold text-gray-400 mb-4">
                                {weekDays.map(day => <div key={day}>{day}</div>)}
                            </div>

                            <div className="grid grid-cols-7 gap-y-1">
                                {generateDays(currentMonth).map((date, idx) => (
                                    <div key={idx} className="relative py-1">
                                        {date && (
                                            <button
                                                disabled={isPast(date)}
                                                onClick={() => handleDateClick(date)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all relative z-10
                          ${isPast(date) ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}
                          ${isSelected(date) ? "bg-black text-white hover:bg-black shadow-lg" : ""}
                        `}
                                            >
                                                {date.getDate()}
                                            </button>
                                        )}
                                        {date && isInRange(date) && (
                                            <div className="absolute inset-0 bg-gray-50 z-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendar 2 (Desktop only) */}
                        <div className="flex-1 hidden md:block">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-9" />
                                <h3 className="font-bold text-gray-900">{formatMonth(nextMonth)}</h3>
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                    className="p-2 hover:bg-gray-50 rounded-full border border-gray-100"
                                >
                                    <ChevronRight size={20} className="text-gray-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-bold text-gray-400 mb-4">
                                {weekDays.map(day => <div key={day}>{day}</div>)}
                            </div>

                            <div className="grid grid-cols-7 gap-y-1">
                                {generateDays(nextMonth).map((date, idx) => (
                                    <div key={idx} className="relative py-1">
                                        {date && (
                                            <button
                                                disabled={isPast(date)}
                                                onClick={() => handleDateClick(date)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all relative z-10
                          ${isPast(date) ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}
                          ${isSelected(date) ? "bg-black text-white hover:bg-black shadow-lg" : ""}
                        `}
                                            >
                                                {date.getDate()}
                                            </button>
                                        )}
                                        {date && isInRange(date) && (
                                            <div className="absolute inset-0 bg-gray-50 z-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 md:p-8 border-t border-gray-50 flex items-center justify-between bg-white">
                    <button
                        onClick={() => {
                            setStartDate(null);
                            setEndDate(null);
                        }}
                        className="text-gray-900 font-bold text-sm hover:underline"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => {
                            onApply({ startDate, endDate });
                            onClose();
                        }}
                        className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
                    >
                        Apply Dates
                    </button>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
        </div>
    );
};

export default DateRangePickerModal;
