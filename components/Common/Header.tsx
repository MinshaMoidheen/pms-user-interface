"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Rental", href: "/rentals" },
    { name: "For Sale", href: "/for-sale" },
    { name: "Jobs", href: "/jobs" },
  ];

  React.useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!(user && token));
    };

    checkAuth();

    // Listen for storage changes or custom auth events
    window.addEventListener("storage", checkAuth);
    window.addEventListener("tokenExpired", () => setIsLoggedIn(false));

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("tokenExpired", () => setIsLoggedIn(false));
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 group">
          <div className="text-2xl font-bold">
            <span className="text-slate-900 group-hover:text-blue-600 transition-colors">PMS</span>
            <span className="text-slate-400 font-normal group-hover:text-slate-500 transition-colors">Club</span>
          </div>
        </Link>

        {/* Centered Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-8 font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${pathname === link.href
                ? `${link.href === "/jobs" ? "bg-[#FF5A3C]" : "bg-[#FF5A3C]" } text-white`
                : "hover:text-slate-900"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="bg-[#2D5BFF] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                  List Property
                </button>
                <button className="bg-[#FF5A3C] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap">
                  List Jobs
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#2D5BFF] text-white px-8 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-black"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4">
          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-4 font-medium text-slate-600 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-2xl transition-colors whitespace-nowrap ${pathname === link.href
                  ? "bg-[#FF5A3C] text-white"
                  : "hover:text-slate-900"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <button className="w-full bg-[#2D5BFF] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                  List Property
                </button>
                <button className="w-full bg-[#FF5A3C] text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
                  List Jobs
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-[#2D5BFF] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
