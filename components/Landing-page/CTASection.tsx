"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { openPlaceAnAdModal } from '@/store/uiSlice';

const CTASection: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <section className="mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-[#FFEDEB] rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-16 flex-1">
            <h2 className="text-4xl md:text-4xl font-bold text-slate-900 mb-6">
              Want to Rent or Sell your Property?
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-lg leading-relaxed">
              List your property in minutes and reach trusted buyers and renters through our curated network.
            </p>
            <button
              onClick={() => dispatch(openPlaceAnAdModal())}
              className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold shadow-xl shadow-orange-100 hover:shadow-orange-200 transition-all transform hover:-translate-y-1"
            >
              Place an Ad
            </button>
          </div>
          <div className="w-full md:w-1/2 h-[400px] md:h-auto self-stretch">
            <img
              src="/images/ad.png"
              alt="Modern House"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
