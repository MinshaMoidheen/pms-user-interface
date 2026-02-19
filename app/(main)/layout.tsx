import Header from '@/components/Header';
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

import { StoreProvider } from '@/store/storeProvider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <div className="min-h-screen flex flex-col pb-16 md:pb-0 relative">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
      <BottomNav />
    </div>
 
  );
}
