import HeroSection from "@/components/Herosec";
import PricingPlans from "@/components/Pricing";
import InfiniteMovingCardsDemo from "@/components/Clint";
import Card from "@/components/Topblog";
import DashboardSection from "@/components/Ctasec";
import TrendingTopics from "@/components/Tranding-topic";
import NewsletterForm from "@/components/Stay-updated";
import TopAuther from "@/components/Top-auther";

export default function Home() {
  return (
   <div>
    <HeroSection/>
    <PricingPlans/>
    <TrendingTopics/>
    <InfiniteMovingCardsDemo/>
    <Card/>
    <NewsletterForm/>
    <TopAuther/>
    <DashboardSection/>
   
   </div>
  );
}
