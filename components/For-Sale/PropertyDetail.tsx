"use client";

import React, { useState } from 'react';
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    Share2,
    Phone,
    Mail,
    MessageCircle,
    ArrowLeft,
    CheckCircle,
    Calendar,
    Star,
    Bookmark,
    Wifi,
    Laptop,
    Wind,
    Monitor,
    ShieldCheck,
    ParkingCircle,
    Dumbbell,
    Droplets,
    Trophy
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetPropertyQuery } from '@/store/services/propertiesApiSlice';
import Header from '../Common/Header';
import Link from 'next/link';
import Footer from '../Common/Footer';
import FeaturedProperties from '../Landing-page/FeaturedProperties';
import { SALES } from './Sales';
import { IProperty } from '@/types/properties';

interface PropertyDetailProps {
    id: string;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ id }) => {
    const router = useRouter();
    const { data: property, isLoading, isError } = useGetPropertyQuery(id);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Mock data for development if API returns incomplete data
    // const property = data; 

    // Check if we have static data for this ID
    const staticSale = SALES.find(s => s.id === id);

    // Construct a compatible property object from static data if available
    const displayedProperty: IProperty | undefined = property || (staticSale ? {
        _id: staticSale.id,
        title: staticSale.title,
        description: "Experience modern living in this beautifully designed studio apartment, located in the vibrant neighborhood of Bommanahalli. This unit offers a perfect blend of comfort and style, featuring large windows that flood the space with natural light and a balcony with stunning views of the surrounding area.\n\nThe space\nThis brand new apartment is ready to be moved into and comes with premium finishes, high-end fixtures, and all the necessary appliances. Whether you're a young professional or a small family, this space provides the perfect urban retreat with its clever layout and excellent use of space.",
        price: 5010900,
        priceUnit: 'Est Settlement Value',
        type: 'Apartment',
        category: 'Residential',
        location: {
            address: "Bommanahalli",
            city: "Bangalore",
            state: "Karnataka",
            coordinates: {
                latitude: staticSale.lat || 12.9023,
                longitude: staticSale.lng || 77.6242
            }
        },
        area: {
            value: 1200,
            unit: 'sqft'
        },
        flexibleFields: {
            bedrooms: 2,
            bathrooms: 2,
            furnishing: "Fully Furnished",
            parking: "1 Private",
            floor: "5th of 12",
            facing: "East"
        },
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071",
            "https://images.unsplash.com/photo-1613977252468-91776a97964a?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1512918766673-45520e189871?auto=format&fit=crop&q=80&w=2070",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=2070"
        ],
        contact: {
            name: "Rohit Mishra",
            call: "+91 9876543210",
            mobileNumber: "+91 9876543210",
            email: "rohit@example.com",
            whatsapp: "https://wa.me/919876543210",
            whatsappNumber: "919876543210"
        },
        postedBy: "Verified Property",
        createdBy: "admin",
        isDeleted: { status: false },
        isFeatured: false,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    } as IProperty : undefined);

    const [showMore, setShowMore] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    if (isLoading && !displayedProperty) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5A3D]"></div>
            </div>
        );
    }

    if (!displayedProperty) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
                <button
                    onClick={() => router.back()}
                    className="text-[#FF5A3D] hover:underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Header />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 mt-20">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold bg-white">{displayedProperty.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Share2 size={20} className="text-gray-600" />
                        </button>
                        <button
                            onClick={() => setIsSaved(!isSaved)}
                            className={`p-2 rounded-lg transition-all ${isSaved ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                            <Bookmark size={20} className={isSaved ? 'fill-blue-600' : ''} />
                        </button>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-10 overflow-hidden rounded-2xl md:rounded-3xl">
                    <div className="md:col-span-2 aspect-[4/3] md:aspect-auto h-full min-h-[400px]">
                        <img
                            src={displayedProperty.images[0]}
                            alt="Main view"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 gap-2 md:gap-4 h-full">
                        {displayedProperty.images.slice(1, 5).map((img, idx) => (
                            <div key={idx} className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-lg md:rounded-xl">
                                <img
                                    src={img}
                                    alt={`Property view ${idx + 2}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {idx === 3 && (
                                    <button className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white/90 backdrop-blur px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold shadow-lg flex items-center gap-1 md:gap-2">
                                        <Maximize size={14} className="md:w-4 md:h-4" />
                                        <span className="whitespace-nowrap">Show More</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left Column: Content */}
                    <div className="flex-1 space-y-12">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-1">Studio Room in {displayedProperty.location.address}</h2>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-extrabold text-gray-900">₹{displayedProperty.price.toLocaleString()}</span>
                                <span className="text-sm text-gray-500 font-medium whitespace-nowrap">{displayedProperty.priceUnit}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100">
                                <div className="flex items-center gap-2">
                                    <BedDouble size={20} className="text-gray-400" />
                                    <span className="text-sm font-semibold">{displayedProperty.flexibleFields?.bedrooms} Bedroom</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath size={20} className="text-gray-400" />
                                    <span className="text-sm font-semibold">{displayedProperty.flexibleFields?.bathrooms} Bath</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Maximize size={20} className="text-gray-400" />
                                    <span className="text-sm font-semibold">{displayedProperty.area.value} {displayedProperty.area.unit}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin size={18} />
                                    <span className="text-sm">{displayedProperty.location.address}, {displayedProperty.location.city}</span>
                                </div>
                            </div>
                        </div>

                        {/* Compact Agent Card */}
                        <div className="flex flex-col sm:flex-row items-center justify-between p-4 md:p-6 bg-white border border-gray-100 rounded-2xl md:rounded-[32px] shadow-sm gap-4">
                            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/32.jpg"
                                        alt="Agent"
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="space-y-0.5 md:space-y-1">
                                    <h4 className="font-bold text-sm md:text-base text-[#1E293B]">Property Listed by {displayedProperty.contact.name}</h4>
                                    <div className="flex items-center gap-1 text-[#3B82F6] font-semibold text-[10px] md:text-xs">
                                        <CheckCircle size={12} className="fill-[#3B82F6] text-white" />
                                        <span>Verified Property</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-10 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                                <div className="text-center">
                                    <span className="text-lg md:text-xl font-bold text-[#1E293B]">4.5</span>
                                    <div className="flex gap-0.5 mt-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className={i < 4 ? 'fill-orange-400 text-orange-400' : 'text-gray-200'} />
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center border-l pl-6 md:pl-10 border-gray-100">
                                    <span className="text-lg md:text-xl font-bold text-[#1E293B]">25</span>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider">Reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* About/Space */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-[#1E293B]">About This Space</h3>
                            <p className="text-[#64748B] leading-relaxed font-medium">
                                Located just 1 km from Technopark Phase 1, Milestone Suites offers 4 uniquely designed rooms featuring elegant French-style wall panels and soft, neutral-toned interiors creating a peaceful setting for work or relaxation.
                            </p>
                            <div className="space-y-2">
                                <h4 className="font-bold text-[#1E293B]">The space</h4>
                                <p className="text-[#64748B] leading-relaxed font-medium">
                                    {showMore ? displayedProperty.description : `${displayedProperty.description.slice(0, 200)}...`}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="px-8 py-3 bg-white border border-gray-200 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                {showMore ? 'Show Less' : 'Show More'}
                            </button>
                        </div>

                        {/* Property Details Grid */}
                        <div className="space-y-6">
                            <h3 className="text-xl md:text-2xl font-bold text-[#1E293B]">Price Negotiable | Handed Over | Multiple Options</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                                {[
                                    { label: "Type", value: displayedProperty.type },
                                    { label: "Purpose", value: "Sale" },
                                    { label: "Property Age", value: "1 year" },
                                    { label: "Furnishing", value: displayedProperty.flexibleFields?.furnishing || "Fully Furnished" },
                                    { label: "Average Mortage", value: "₹ 10,00,000" },
                                    { label: "Plot", value: "450 sqft" },
                                    { label: "Completion Status", value: "Ready" },
                                    { label: "Updated", value: "16/02/26" },
                                ].map((detail, idx) => (
                                    <div key={idx} className="flex justify-between sm:justify-start gap-4 sm:gap-8 group border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-50 last:border-0">
                                        <span className="text-[#64748B] font-medium w-24 md:w-32 text-sm md:text-base">{detail.label}</span>
                                        <span className="hidden sm:inline text-[#64748B] font-medium">:</span>
                                        <span className="text-[#1E293B] font-bold text-sm md:text-base">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="space-y-6 md:space-y-8">
                            <h3 className="text-xl md:text-2xl font-bold text-[#1E293B]">What this place offers</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-6">
                                {[
                                    { icon: <Wifi size={20} className="text-gray-600" />, label: "Free Wifi" },
                                    { icon: <Laptop size={20} className="text-gray-600" />, label: "Dedicated workspace" },
                                    { icon: <Wind size={20} className="text-gray-600" />, label: "Air conditioning" },
                                    { icon: <Monitor size={20} className="text-gray-600" />, label: "TV" },
                                    { icon: <ShieldCheck size={20} className="text-gray-600" />, label: "Exterior security cameras on property" },
                                    { icon: <ParkingCircle size={20} className="text-gray-600" />, label: "Dedicated Parking slots" },
                                    { icon: <Dumbbell size={20} className="text-gray-600" />, label: "Gym in building" },
                                    { icon: <Droplets size={20} className="text-gray-600" />, label: "Drinking water supply" },
                                    { icon: <Trophy size={20} className="text-gray-600" />, label: "Sports activity spaces" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        {item.icon}
                                        <span className="text-[#64748B] font-medium text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Validated Information */}
                        <div className="space-y-6 md:space-y-8">
                            <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] flex items-center gap-3">
                                <CheckCircle size={24} className="text-[#3B82F6] md:w-7 md:h-7 fill-[#3B82F6] text-white" />
                                Validated Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
                                <div className="flex justify-between sm:justify-start gap-4 sm:gap-8 border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-50">
                                    <span className="text-[#64748B] font-medium w-24 md:w-32 text-sm md:text-base">Developer</span>
                                    <span className="hidden sm:inline text-[#64748B] font-medium">:</span>
                                    <span className="text-[#1E293B] font-bold text-sm md:text-base text-right sm:text-left">Sugee Developers Pvt Ltd</span>
                                </div>
                                <div className="flex justify-between sm:justify-start gap-4 sm:gap-8 border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-50">
                                    <span className="text-[#64748B] font-medium w-24 md:w-32 text-sm md:text-base">Ownership</span>
                                    <span className="hidden sm:inline text-[#64748B] font-medium">:</span>
                                    <span className="text-[#1E293B] font-bold text-sm md:text-base text-right sm:text-left">Freehold</span>
                                </div>
                                <div className="flex justify-between sm:justify-start gap-4 sm:gap-8 border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-50">
                                    <span className="text-[#64748B] font-medium w-24 md:w-32 text-sm md:text-base">Usage</span>
                                    <span className="hidden sm:inline text-[#64748B] font-medium">:</span>
                                    <span className="text-[#1E293B] font-bold text-sm md:text-base text-right sm:text-left">Residential</span>
                                </div>
                                <div className="flex justify-between sm:justify-start gap-4 sm:gap-8 border-b sm:border-b-0 pb-2 sm:pb-0 border-gray-50">
                                    <span className="text-[#64748B] font-medium w-24 md:w-32 text-sm md:text-base">Property Area</span>
                                    <span className="hidden sm:inline text-[#64748B] font-medium">:</span>
                                    <span className="text-[#1E293B] font-bold text-sm md:text-base text-right sm:text-left">450 sqft</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold mb-2">Where the property is located</h3>
                            <p className="text-sm text-gray-500 font-semibold mb-6">{displayedProperty.location.address}, {displayedProperty.location.city}</p>
                            <div className="w-full aspect-video rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group">
                                <img
                                    src="/images/GoogleMapsWidget.png"
                                    className="w-full h-full object-cover"
                                    alt="Location map"
                                />

                            </div>
                        </div>

                        {/* Meet Agent Section */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-bold mb-8 text-gray-900">Meet Property Agent</h3>
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                {/* Left Side Card */}
                                <div className="w-full md:w-[340px] bg-[#FFF5F2] p-8 rounded-[40px] flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <img
                                            src="https://randomuser.me/api/portraits/men/32.jpg"
                                            alt="Agent"
                                            className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                        <div className="absolute bottom-1 right-1 w-6 h-6 border-4 border-white rounded-full flex items-center justify-center">
                                            <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                                                <CheckCircle size={12} className="text-white fill-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold text-[#1E293B] mb-1">{displayedProperty.contact.name}</h4>
                                    <div className="flex items-center gap-1.5 text-[#3B82F6] font-semibold text-xs mb-8">
                                        <div className="p-0.5 bg-[#3B82F6] rounded-full">
                                            <CheckCircle size={10} className="text-white fill-white" />
                                        </div>
                                        <span>Verified Agent</span>
                                    </div>

                                    <div className="grid grid-cols-2 w-full mb-8 relative">
                                        <div className="flex flex-col items-end pr-6 border-r border-[#FED7AA]/30">
                                            <span className="text-2xl font-bold text-[#1E293B]">4.5</span>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} className={i < 4 ? 'fill-orange-400 text-orange-400' : 'fill-orange-400/50 text-orange-400/50'} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start pl-6">
                                            <span className="text-2xl font-bold text-[#1E293B]">25</span>
                                            <span className="text-sm font-medium text-gray-500">Reviews</span>
                                        </div>
                                    </div>

                                    <div className="w-full text-center">
                                        <p className="text-sm font-bold text-[#1E293B] mb-4">Message {displayedProperty.contact.name}</p>
                                        <button className="w-full py-4 bg-white rounded-full font-bold text-gray-900 shadow-sm hover:shadow-md transition-all">
                                            Message Agent
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side Content */}
                                <div className="flex-1 space-y-6 md:space-y-10 pt-2 w-full">
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-4 text-center md:text-left">About {displayedProperty.contact.name}</h4>
                                        <p className="text-[#64748B] leading-relaxed font-medium text-sm md:text-base text-center md:text-left">
                                            {displayedProperty.contact.name} is a verified real estate agent known for closing high value deals and matching clients with the right properties faster than the market average. With 8+ years in real estate, he has helped 300+ families find homes and assisted numerous owners in selling and renting their properties at competitive prices.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-4 md:mb-6 text-center md:text-left">Properties</h4>
                                        <div className="space-y-3 md:space-y-4 max-w-lg mx-auto md:mx-0">
                                            <div className="flex justify-between md:grid md:grid-cols-[140px_20px_1fr] items-center border-b md:border-b-0 pb-2 md:pb-0 border-gray-50">
                                                <span className="text-[#64748B] font-medium text-sm md:text-base">For Sale</span>
                                                <span className="hidden md:inline text-[#64748B] font-medium">:</span>
                                                <span className="text-[#1E293B] font-bold text-sm md:text-base">12</span>
                                            </div>
                                            <div className="flex justify-between md:grid md:grid-cols-[140px_20px_1fr] items-center border-b md:border-b-0 pb-2 md:pb-0 border-gray-50">
                                                <span className="text-[#64748B] font-medium text-sm md:text-base">For Rent</span>
                                                <span className="hidden md:inline text-[#64748B] font-medium">:</span>
                                                <span className="text-[#1E293B] font-bold text-sm md:text-base">4</span>
                                            </div>
                                            <div className="flex justify-between md:grid md:grid-cols-[140px_20px_1fr] items-center border-b md:border-b-0 pb-2 md:pb-0 border-gray-50">
                                                <span className="text-[#64748B] font-medium text-sm md:text-base">Property Types</span>
                                                <span className="hidden md:inline text-[#64748B] font-medium">:</span>
                                                <span className="text-[#1E293B] font-bold text-sm md:text-base">Villa, Land, Apartment</span>
                                            </div>
                                            <div className="flex justify-between md:grid md:grid-cols-[140px_20px_1fr] items-center border-b md:border-b-0 pb-2 md:pb-0 border-gray-50">
                                                <span className="text-[#64748B] font-medium text-sm md:text-base">Service Areas</span>
                                                <span className="hidden md:inline text-[#64748B] font-medium">:</span>
                                                <span className="text-[#1E293B] font-bold text-sm md:text-base">Bangalore, Ernakulam, Goa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Sidebar */}
                    <div className="lg:w-[380px] w-full sticky top-28">
                        <div className="bg-[#F8FAFC] p-8 rounded-[32px] border border-gray-100/50 shadow-sm">
                            <h3 className="text-2xl font-bold mb-2 text-[#1E293B]">Want to know more ?</h3>
                            <p className="text-sm font-medium text-[#64748B] mb-8 leading-snug">
                                Contact the owner through any one of the following medium
                            </p>
                            <div className="space-y-4">
                                <button
                                    onClick={() => window.location.href = `mailto:${displayedProperty.contact.email}`}
                                    className="w-full py-4 bg-[#EBF3FF] text-[#3B82F6] rounded-xl font-bold text-sm hover:bg-[#D9EAFF] transition-all flex items-center justify-center gap-3"
                                >
                                    <Mail size={18} />
                                    Email
                                </button>
                                <button
                                    onClick={() => window.location.href = `tel:${displayedProperty.contact.call}`}
                                    className="w-full py-4 bg-[#FFE5E5] text-[#FF5A3D] rounded-xl font-bold text-sm hover:bg-[#FFD9D9] transition-all flex items-center justify-center gap-3"
                                >
                                    <Phone size={18} />
                                    Call
                                </button>
                                <button
                                    onClick={() => window.open(displayedProperty.contact.whatsapp, '_blank')}
                                    className="w-full py-4 bg-[#E6F8E6] text-[#22C55E] rounded-xl font-bold text-sm hover:bg-[#D4F5D4] transition-all flex items-center justify-center gap-3"
                                >
                                    <MessageCircle size={18} />
                                    Whatsapp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Similar Properties */}
                <div className="mt-12 md:mt-20 border-t pt-10 md:pt-20">
                    <div className="flex items-center justify-between mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl font-black text-gray-900">More Similar Properties</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SALES.slice(0, 4).map((sale) => (
                            <Link key={sale.id} href={`/for-sale/${sale.id}`} className="group relative block overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#FF5A3D]/5 transition-all duration-300">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={sale.imageUrl}
                                        alt={sale.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-[#22C55E] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">Popular</span>
                                    </div>
                                    <button className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/20">
                                        <Bookmark size={16} />
                                    </button>
                                </div>
                                <div className="p-4 space-y-2">
                                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{sale.title}</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-black text-[#FF5A3D]">₹{sale.price.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{displayedProperty.type}</p>
                                    <div className="flex items-center gap-4 py-2 border-y border-gray-50">
                                        <div className="flex items-center gap-1.5">
                                            <BedDouble size={14} className="text-gray-400" />
                                            <span className="text-[10px] font-bold">2 Bedrooms</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 border-l pl-4 border-gray-100">
                                            <Maximize size={14} className="text-gray-400" />
                                            <span className="text-[10px] font-bold">1200 sq.ft</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-orange-400 text-orange-400" />
                                            <Star size={14} className="fill-orange-400 text-orange-400" />
                                            <Star size={14} className="fill-orange-400 text-orange-400" />
                                            <Star size={14} className="fill-orange-400 text-orange-400" />
                                            <span className="text-[10px] font-black ml-1">(42)</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>


            </main>


        </div>
    );
};

export default PropertyDetail;
