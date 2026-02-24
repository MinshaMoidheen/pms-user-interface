"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Bookmark } from "lucide-react";
import { useToggleJobBookmarkMutation } from "@/store/services/jobApiSlice";
import { IJobPost } from "@/types/jobs";

// Extend Job for props, though JobCard likely receives Job properties directly
// The interface in jobs.ts matches what we need. We can import it or defineProps here.
// Let's reuse the Job interface from data/jobs.ts to be safe, or redefine compatible props.
// The file previously defined JobProps locally. I will update it to match the new data structure.

const JobCard: React.FC<IJobPost> = ({
  _id,
  title,
  companyName,
  location,
  employmentType,
  salary,
  contact,
  bookmarks,
}) => {
  const router = useRouter();
  const [toggleBookmark] = useToggleJobBookmarkMutation();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUserId(user.id || user._id);
    }
  }, []);

  const handleToggleBookmark = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        await toggleBookmark(_id).unwrap();
      } catch (error) {
        console.error("Failed to toggle bookmark:", error);
      }
    },
    [_id, toggleBookmark, router],
  );

  const getBadgeStyles = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "full-time") {
      return "bg-blue-50 text-blue-600";
    }
    if (lowerType === "part-time" || lowerType === "internship") {
      return "bg-emerald-50 text-emerald-600";
    }
    return "bg-slate-50 text-slate-600";
  };

  return (
    <div
      onClick={() => router.push(`/jobs/${_id}`)}
      className="block relative group cursor-pointer"
    >
      <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300">
        {/* Header: Title and Work Mode Badge */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-[17px] font-bold text-slate-900 pr-4 leading-snug">
            {title}
          </h3>
        </div>

        {/* Middle Row: Job Type and Salary */}
        <div className="flex items-center gap-3 mb-6 text-sm">
          <span
            className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase tracking-wide ${getBadgeStyles(employmentType)}`}
          >
            {employmentType}
          </span>
          <span className="text-slate-400 font-medium text-sm">
            Salary:{" "}
            <span className="text-slate-600 font-semibold">
              {salary?.max ? `₹${salary.max}` : "Not Specified"}
            </span>
          </span>
        </div>

        {/* Bottom Row: Company Info and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Company Logo */}
            <div className="w-12 h-12 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100 italic text-[10px] text-slate-400 text-center uppercase">
              {companyName ? companyName.charAt(0) : "J"}
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-[15px]">
                {companyName}
              </h4>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span>
                  {location?.address ? `${location.address}, ` : ""}
                  {location?.city}, {location?.state}
                </span>
              </div>
            </div>
          </div>

          <button
            className={`p-2 rounded-xl transition-colors z-10 ${
              bookmarks?.includes(userId || "")
                ? "bg-blue-50 text-blue-600"
                : "text-slate-300 hover:text-slate-400 bg-slate-50/50"
            }`}
            onClick={handleToggleBookmark}
          >
            <Bookmark
              className={`w-5 h-5 ${
                bookmarks?.includes(userId || "") ? "fill-current" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
