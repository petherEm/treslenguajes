import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Tres Lenguajes - Inspired by Code With Antonio",
  description: "Tres Lenguajes - Inspired by Code With Antonio",
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
