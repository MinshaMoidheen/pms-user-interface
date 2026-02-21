
import React from 'react';

const stats = [
  { value: '10K+', label: 'Active Listings', desc: 'Verified properties available for buying and renting across prime locations.' },
  { value: '94%', label: 'Successful Deals', desc: 'Helping owners and seekers close property deals with confidence.' },
  { value: '50K+', label: 'Happy Users', desc: 'Home seekers, sellers, and professionals who trust our platform.' },
  { value: '2K+', label: 'Trusted Agents & Employers', desc: 'Connect with certified agents and real estate companies hiring near you.' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="bg-white mt-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Property Journey Starts Here</h2>
          <p className="text-slate-500 leading-relaxed">
            Buy, rent, sell, or list your property with ease. Connect with genuine buyers and renters, explore verified listings, and even discover career opportunities in real estate all in one place.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-1/2">
            <img 
              src="/images/Frame.png" 
              alt="Building Architecture" 
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>
          
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:mt-24 sm:mt-10 ">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-[#FF5A3C] text-5xl font-extrabold mb-4">{stat.value}</div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">{stat.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
