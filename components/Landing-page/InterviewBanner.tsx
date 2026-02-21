import React from 'react';
import Image from 'next/image';

const InterviewBanner: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#E8EBF7] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">



          {/* Left Content */}
          <div className="max-w-xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-4">
              Gain Priority Access to 6 Guaranteed Interviews !!
            </h2>
            <p className="text-[#706565] text-lg mb-8">
              Join our premium plan and unlock guaranteed interview opportunities every month. Less applying, more interviewing.
            </p>
            <button className="bg-[#1A3EB5] text-white px-8 py-4 rounded-4xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
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
      </div>
    </section>
  );
};

export default InterviewBanner;