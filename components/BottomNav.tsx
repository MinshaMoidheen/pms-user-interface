"use client";

import { Home, Heart, User, Search, MapPinHouse, Weight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openProfileModal } from "@/store/uiSlice";
import { RootState } from "@/store/store";

const BottomNav = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isProfileModalOpen = useSelector((state: RootState) => state.ui.isProfileModalOpen);

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Rental",
      icon: MapPinHouse,
      href: "/rentals",
    },
    {
      label: "Sales",
      icon: Weight,
      href: "/for-sale",
    },

    {
      label: "Jobs",
      icon: Weight,
      href: "/jobs",
    },
    {
      label: "Profile",
      icon: User,
      onClick: () => dispatch(openProfileModal()),
      isActive: isProfileModalOpen
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-50 safe-area-bottom">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          if (item.onClick) {
            const isActive = item.isActive;
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`flex flex-col items-center gap-1 transition-colors ${isActive
                  ? "text-[#FF5A3C]"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? "fill-[#FF5A3C]" : ""}`} />
                <span className="text-[11px] font-bold">{item.label}</span>
              </button>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive
                ? "text-[#FF5A3C]"
                : "text-slate-400 hover:text-slate-600"
                }`}
            >
              <item.icon
                className={`w-6 h-6 ${isActive ? "fill-[#FF5A3C]" : ""}`}
              />
              <span className="text-[11px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
