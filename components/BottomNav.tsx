"use client";

import { Home, Heart, User, Search, MapPinHouse, Weight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

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
      href: "/sales",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-50 safe-area-bottom">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive
                  ? "text-[#FF5A3C]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`w-6 h-6 ${isActive ? "fill-current" : ""}`}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
