import HeroSection from "@/components/Herosec";
import PricingPlans from "@/components/Pricing";
import InfiniteMovingCardsDemo from "@/components/Clint";
import Card from "@/components/Topblog";
import DashboardSection from "@/components/Ctasec";

export default function Home() {
  return (
   <div>
    <HeroSection/>
    <PricingPlans/>
    <InfiniteMovingCardsDemo/>
    <Card/>
    <DashboardSection/>
   
   </div>
  );
}
