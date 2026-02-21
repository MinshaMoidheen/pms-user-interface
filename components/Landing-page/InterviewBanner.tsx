"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';

const InterviewBanner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <section className=" mt-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {isSubscribed ? (
          <div className="bg-[#1A3EB5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden text-white">

            {/* Left Content */}
            <div className="max-w-xl relative z-10 w-full">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
                You are now our <br /> subscribed member.
              </h2>

              <div className="space-y-6">
                <h3 className="text-lg font-bold opacity-90 uppercase tracking-wider">What it means</h3>
                <ul className="space-y-4">
                  {[
                    "Minimum of 6 interview calls to the applied job vacancies",
                    "Dedicated PMS Club support throughout the interview process",
                    "Direct contact with the hiring recruiters",
                    "Increased chances for getting shortlisted"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-white/20 rounded-full p-1 shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-base text-white/90 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-10 bg-white text-[#1A3EB5] px-10 py-4 rounded-4xl font-extrabold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 cursor-pointer flex items-center gap-2 group"
              >
                Upgrade Now !
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Illustration - Spotlight effect */}
            <div className="w-full md:w-[45%] relative z-10 h-[300px] md:h-[400px] flex items-end justify-center">
              <div className="relative w-full h-full flex items-end justify-center">
                {/* Background Group of People */}
                <div className="absolute inset-0 flex items-end justify-center opacity-40">
                  <div className="flex gap-1 md:gap-2 items-end">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`w-6 md:w-8 h-20 md:h-32 bg-white/20 rounded-t-full relative ${i % 2 === 0 ? 'h-24 md:h-36' : ''}`}>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 md:w-6 h-4 md:h-6 bg-white/20 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-group behind the spotlighted person */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="flex gap-2 items-end pb-0">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className={`w-8 md:w-10 h-28 md:h-40 bg-black/40 rounded-t-full relative ${i === 1 ? 'z-0 border-x-4 border-[#1A3EB5]' : ''}`}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 md:w-8 h-6 md:h-8 bg-black/40 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spotlight Beam */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-full bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10 clip-spotlight"></div>

                {/* The Subscribed Person (In the spotlight) */}
                <div className="relative z-20 flex flex-col items-center mb-0 scale-110">
                  <div className="w-10 md:w-14 h-10 md:h-14 bg-[#FF7D61] rounded-full mb-[-2px] relative shadow-lg">
                    <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                  </div>
                  <div className="w-12 md:w-16 h-32 md:h-44 bg-blue-400 rounded-t-full relative shadow-2xl border-x-2 border-white/10">
                    {/* Hands on hips pose logic */}
                    <div className="absolute -left-4 top-8 w-6 md:w-8 h-4 bg-blue-400 rounded-full rotate-[-45deg] origin-right"></div>
                    <div className="absolute -right-4 top-8 w-6 md:w-8 h-4 bg-blue-400 rounded-full rotate-[45deg] origin-left"></div>
                  </div>
                </div>

                {/* Decorative Plants */}
                <div className="absolute bottom-0 left-0 md:left-4 z-30 transform rotate-[-15deg]">
                  <div className="flex gap-1 items-end">
                    <div className="w-3 md:w-4 h-12 md:h-20 bg-pink-400 rounded-full opacity-60"></div>
                    <div className="w-3 md:w-4 h-10 md:h-16 bg-yellow-400 rounded-full opacity-80"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 md:right-4 z-30 transform rotate-[15deg]">
                  <div className="flex gap-1 items-end">
                    <div className="w-3 md:w-4 h-10 md:h-16 bg-blue-300 rounded-full opacity-80"></div>
                    <div className="w-3 md:w-4 h-12 md:h-20 bg-pink-400 rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>

            <style jsx>{`
              .clip-spotlight {
                clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
              }
            `}</style>
          </div>
        ) : (
          <div className="bg-[#E8EBF7] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Left Content */}
            <div className="max-w-xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-4">
                Gain Priority Access to 6 Guaranteed Interviews !!
              </h2>
              <p className="text-[#706565] text-lg mb-8">
                Join our premium plan and unlock guaranteed interview opportunities every month. Less applying, more interviewing.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1A3EB5] text-white px-8 py-4 rounded-4xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
              >
                Subscribe Now !
              </button>
            </div>

            {/* Right Image - Local file */}
            <div className="w-full md:w-1/3 relative z-10">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#1A3A6F] to-[#2D5BFF] rounded-4xl"></div>
                <div className="relative w-full h-64 md:h-72">
                  <Image
                    src="/images/illustartion.png"
                    alt="Interview Illustration"
                    fill
                    className="object-contain rounded-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubscriptionSuccess={() => setIsSubscribed(true)}
      />
    </section>
  );
};

export default InterviewBanner;