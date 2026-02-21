import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import BottomNav from "@/components/BottomNav";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col pb-16 md:pb-0 relative bg-white">
            <Header />

            <main className="grow flex flex-col items-center justify-center pt-2 px-2">
                <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 py-12">
                    {/* Illustration */}
                    <div className="relative w-full max-w-2xl aspect-[16/9]">
                        <Image
                            src="/images/illustration.png"
                            alt="Feature Under Construction"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                        <h1 className="text-xl md:text-4xl font-bold text-slate-700 tracking-tight">
                            UNDER CONSTRUCTION
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-400 font-medium">
                            PLEASE COME BACK LATER
                        </p>
                    </div>

                    {/* Action Button */}
                    <div>
                        <Link
                            href="/"
                            className="inline-block bg-[#FF5A3C] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg shadow-orange-200"
                        >
                            Go back to Home
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
            <BottomNav />
        </div>
    );
}
