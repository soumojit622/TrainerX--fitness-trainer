import Footer from "@/components/Footer";
import AIPowered from "@/components/landing/ai-powered";
import AppPreview from "@/components/landing/app-preview";
import BenefitsSection from "@/components/landing/benefits-section";
import CallToAction from "@/components/landing/call-to-action";
import CommunityFeed from "@/components/landing/community-feed";
import FAQ from "@/components/landing/faq";
import FeatureGrid from "@/components/landing/feature-grid";
import Hero from "@/components/landing/hero";
import MockupShowcase from "@/components/landing/mockup-showcase";
import Pricing from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonials";
import WorkoutPrograms from "@/components/landing/workout-programs";
import MainNavbar from "@/components/MainNavbar";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <section className="relative z-10 py-24 flex-grow">

        {/* <BackgroundSpots/> */}
        <MainNavbar />
        {/* CORNER DECORATION */}
        <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />
        <Hero />
        <FeatureGrid />

        <MockupShowcase />

        <WorkoutPrograms />

        <AIPowered />

        <BenefitsSection />

        <CommunityFeed />

        <Testimonials />

        <Pricing />

        <AppPreview />

        <FAQ />

        <CallToAction />
      </section>


      <Footer />
    </div>
  );
};
export default HomePage;