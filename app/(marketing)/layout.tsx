import { Metadata } from "next";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Tres Lenguajes - Inspired by Code With Antonio",
  description: "Tres Lenguajes - Inspired by Code With Antonio",
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
