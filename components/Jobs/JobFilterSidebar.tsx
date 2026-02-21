"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterGroupProps {
  title: string;
  options: { label: string; count?: number; value: string }[];
  type?: "checkbox" | "radio";
  onChange?: (type: string, value: string) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  type = "checkbox",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-3 text-slate-900 font-semibold hover:text-blue-600 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-2">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center group cursor-pointer">
              <input
                type={type}
                name={title}
                value={option.value}
                onChange={(e) => onChange?.(title, e.target.value)}
                className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-slate-600 group-hover:text-slate-900 transition-colors text-sm">
                {option.label}
                {option.count && (
                  <span className="text-slate-400 text-xs ml-1">
                    ({option.count})
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

interface JobFilterSidebarProps {
  onChange?: (type: string, value: string) => void;
}

const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({ onChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100">
      {/* Row 1: Experience and Salary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <FilterGroup
          title="Experience"
          options={[
            { label: "Freshers", value: "freshers" },
            { label: "1 - 2 Years", value: "1-2" },
            { label: "2 - 4 Years", value: "2-4" },
            { label: "4 - 6 Years", value: "4-6" },
            { label: "6 - 8 Years", value: "6-8" },
            { label: "8 - 10 Years", value: "8-10" },
            { label: "10 - 15 Years", value: "10-15" },
            { label: "15+ Years", value: "15+" },
          ]}
          type="radio"
          onChange={onChange}
        />

        <FilterGroup
          title="Salary"
          options={[
            { label: "₹5000 - ₹10000", value: "5-10k" },
            { label: "₹10000 - ₹20000", value: "10-20k" },
            { label: "₹20000 - ₹50000", value: "20-50k" },
            { label: "₹50000 - ₹75000", value: "50-75k" },
            { label: "₹75000 - ₹100000", value: "75-100k" },
            { label: "₹1L - ₹2L", value: "1-2l" },
            { label: "₹2L+", value: "2l+" },
          ]}
          type="radio"
          onChange={onChange}
        />
      </div>

      {/* Row 2: Job Type and Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <FilterGroup
          title="Job Type"
          options={[
            { label: "All", value: "all" },
            { label: "Full Time", value: "FULL_TIME" },
            { label: "Part Time", value: "PART_TIME" },
            { label: "Internship", value: "INTERNSHIP" },
            { label: "Remote", value: "REMOTE" },
            { label: "Temporary", value: "TEMPORARY" },
            { label: "Contract Base", value: "CONTRACT" },
          ]}
          onChange={onChange}
        />

        <FilterGroup
          title="Education"
          options={[
            { label: "All", value: "all" },
            { label: "High School", value: "high-school" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Graduation", value: "graduation" },
            { label: "Master Degree", value: "master" },
            { label: "Bachelor Degree", value: "bachelor" },
            { label: "PhD", value: "phd" },
          ]}
          onChange={onChange}
        />
      </div>

      {/* Row 3: Job Level (full width on mobile, half width on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <FilterGroup
            title="Job Level"
            options={[
              { label: "Entry Level", value: "entry" },
              { label: "Mid Level", value: "mid" },
              { label: "Expert Level", value: "expert" },
            ]}
            type="radio"
            onChange={onChange}
          />
        </div>
        {/* Empty div for layout balance on desktop */}
        <div className="hidden md:block"></div>
      </div>
    </div>
  );
};

export default JobFilterSidebar;
