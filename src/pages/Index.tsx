import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProblemMatrix from "@/components/ProblemMatrix";
import OfferEcosystem from "@/components/OfferEcosystem";
import ComparisonTable from "@/components/ComparisonTable";
import AudioDemo from "@/components/AudioDemo";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <ProblemMatrix />
        <OfferEcosystem />
        <ComparisonTable />
        <AudioDemo />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
