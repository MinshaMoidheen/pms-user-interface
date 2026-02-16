
import CTASection from '@/components/CTASection';
import FeaturedProperties from '@/components/FeaturedProperties';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InterviewBanner from '@/components/InterviewBanner';
import StatsSection from '@/components/StatsSection';
import StaysSection from '@/components/StaysSection';
import React from 'react';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="pt-20">
        <Hero />
        <FeaturedProperties />
        <InterviewBanner />
        <StaysSection city="Bangalore" />
        <StaysSection city="Kochi" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center">
            <button className="bg-[#FF5A3C] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
                Load More
            </button>
        </div>
        <CTASection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
