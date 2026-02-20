
import React from 'react';
import { Mail, Phone, MessageCircle, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-16 mb-12 lg:mb-20">
          <div className="max-w-md">
            <div className="text-2xl font-bold mb-6 lg:mb-8">
              <span className="text-slate-900">PMS</span>
              <span className="text-slate-400 font-normal">Club</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6 lg:mb-8">
              Our mission is to empower people to buy, sell, rent, and list properties with ease while connecting them to genuine opportunities and careers in real estate.
            </p>
            <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-8 text-sm font-semibold text-slate-600 mb-0 lg:mb-8">
              <a href="/" className="hover:text-slate-900 transition-colors">Homepage</a>
              <a href="/for-sale" className="hover:text-slate-900 transition-colors">For Sale</a>
              <a href="/rentals" className="hover:text-slate-900 transition-colors">Rental</a>
              <a href="/jobs" className="hover:text-slate-900 transition-colors">Jobs</a>
              <a href="/contact-us" className="hover:text-slate-900 transition-colors">Contact Us</a>
            </div>
          </div>


          <div className="bg-[#F8F9FB] p-8 md:p-10 rounded-[40px] flex-1 max-w-xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Want to Sell, Rent or Hire?</h3>
            <h4 className="text-2xl font-bold text-slate-900 mb-4">Contact Us.</h4>
            <p className="text-slate-500 mb-8">Contact us through any one of the following medium</p>

            <div className="flex flex-col gap-4 mb-8">
              <button className="w-full flex items-center justify-center gap-3 border border-blue-100 text-[#2D5BFF] bg-blue-50/30 py-4 rounded-2xl text-base font-bold hover:bg-blue-50 transition-colors">
                <Mail className="w-5 h-5" /> Email
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-red-100 text-[#FF5A3C] bg-red-50/30 py-4 rounded-2xl text-base font-bold hover:bg-red-50 transition-colors">
                <Phone className="w-5 h-5" /> Call
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-emerald-100 text-emerald-600 bg-emerald-50/30 py-4 rounded-2xl text-base font-bold hover:bg-emerald-50 transition-colors">
                <MessageCircle className="w-5 h-5" /> Whatsapp
              </button>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 cursor-pointer" />
            </div>

          </div>


        </div>



        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs">Copyright 2026 © PMSClub, All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Facebook className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-slate-400 hover:text-pink-600 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-slate-400 hover:text-blue-700 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
