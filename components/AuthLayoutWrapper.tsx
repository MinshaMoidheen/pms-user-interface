"use client";

import Image from "next/image";
import Link from "next/link";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-900 z-10" />
        {/* Placeholder for an actual image if allowed/available */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Building"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="relative z-20 p-12 text-white max-w-lg">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <span className="text-4xl font-bold tracking-tight">PMSClub</span>
          </Link>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Find your dream property with us.
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join thousands of users who trust PMSClub for their real estate
            needs. Whether you are buying, selling, or renting, we have got you
            covered.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white p-8 md:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-gray-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
