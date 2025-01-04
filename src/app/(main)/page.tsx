import Hero from "@/home/components/hero/Hero";
import PopularProductsSection from "@/home/components/popularProductsSection/PopularProductsSection";
import RecentSection from "@/home/components/recentSection/RecentSection";
import SalesSection from "@/home/components/salesSection/SalesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <RecentSection />
      <SalesSection />
      <PopularProductsSection />
    </>
  );
}
