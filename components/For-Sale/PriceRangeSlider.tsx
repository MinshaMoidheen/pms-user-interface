"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface PriceRangeSliderProps {
    min: number;
    max: number;
    step: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
    onAfterChange?: (value: [number, number]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
    min,
    max,
    step,
    value,
    onChange,
    onAfterChange,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<"min" | "max" | null>(null);
    const MIN_DIFF = step * 2;

    const handleMove = useCallback(
        (clientX: number) => {
            if (!dragging || !sliderRef.current) return;

            const rect = sliderRef.current.getBoundingClientRect();
            const offsetX = Math.min(Math.max(0, clientX - rect.left), rect.width);
            const percentage = offsetX / rect.width;
            const rawValue = min + percentage * (max - min);
            const steppedValue = Math.round(rawValue / step) * step;

            onChange(dragging === "min"
                ? [Math.min(steppedValue, value[1] - MIN_DIFF), value[1]]
                : [value[0], Math.max(steppedValue, value[0] + MIN_DIFF)]
            );
        },
        [dragging, min, max, step, value, onChange, MIN_DIFF]
    );

    useEffect(() => {
        if (!dragging) return;

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
        const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
        const onEnd = () => {
            setDragging(null);
            if (onAfterChange) onAfterChange(value);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mouseup", onEnd);
        window.addEventListener("touchend", onEnd);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mouseup", onEnd);
            window.removeEventListener("touchend", onEnd);
        };
    }, [dragging, handleMove, onAfterChange, value]);

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const formatCurrency = (val: number) => `₹${val.toLocaleString()}`;

    return (
        <div className="relative pt-6 pb-2 px-2">
            {/* Tooltip Label */}
            <div className="absolute -top-3 left-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-30">
                {formatCurrency(value[0])} - {formatCurrency(value[1])}
            </div>

            <div
                ref={sliderRef}
                className="relative h-1.5 bg-slate-100 rounded-full cursor-pointer select-none"
                onClick={(e) => {
                    if (dragging) return;
                    const rect = sliderRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    const offsetX = e.clientX - rect.left;
                    const percentage = offsetX / rect.width;
                    const val = Math.round((min + percentage * (max - min)) / step) * step;

                    const distMin = Math.abs(val - value[0]);
                    const distMax = Math.abs(val - value[1]);

                    let newValue: [number, number];
                    if (distMin < distMax) {
                        newValue = [Math.min(val, value[1] - MIN_DIFF), value[1]];
                    } else {
                        newValue = [value[0], Math.max(val, value[0] + MIN_DIFF)];
                    }
                    onChange(newValue);
                    if (onAfterChange) onAfterChange(newValue);
                }}
            >
                {/* Track */}
                <div
                    className="absolute h-full bg-[#FF5A3C] rounded-full"
                    style={{
                        left: `${getPercentage(value[0])}%`,
                        right: `${100 - getPercentage(value[1])}%`,
                    }}
                />

                {/* Min Handle */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#FF5A3C] rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 z-20 transition-transform ${dragging === "min" ? "scale-125" : "hover:scale-110"
                        }`}
                    style={{ left: `${getPercentage(value[0])}%` }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        setDragging("min");
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                        setDragging("min");
                    }}
                />

                {/* Max Handle */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#FF5A3C] rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 z-20 transition-transform ${dragging === "max" ? "scale-125" : "hover:scale-110"
                        }`}
                    style={{ left: `${getPercentage(value[1])}%` }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        setDragging("max");
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                        setDragging("max");
                    }}
                />
            </div>
        </div>
    );
};

export default PriceRangeSlider;
