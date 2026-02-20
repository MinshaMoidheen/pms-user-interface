
import CTASection from '@/components/Landing-page/CTASection';
import FeaturedProperties from '@/components/Landing-page/FeaturedProperties';
import Hero from '@/components/Landing-page/Hero';
import InterviewBanner from '@/components/Landing-page/InterviewBanner';
import StatsSection from '@/components/Landing-page/StatsSection';
import StaysSection from '@/components/Landing-page/StaysSection';
import React from 'react';


const App: React.FC = () => {
  return (
    <div className="flex flex-col bg-white mt-20">
     
   <div className="order-1">
        <Hero />
      </div>
        <div className="order-3 md:order-2">
        <FeaturedProperties />
        </div>
         <div className="order-2 md:order-3">
        <InterviewBanner />
        </div>
         <div className="order-5 md:order-4">
        <StaysSection city="Bangalore" />
        <StaysSection city="Kochi" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center">
            <button className="bg-[#FF5A3C] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
                Load More
            </button>
        </div>
        </div>
         <div className="order-4 md:order-5">
        <CTASection />
        </div>
          <div className="order-6">
        <StatsSection />
      </div>
     
    </div>
  );
};

export default App;
