import { PageMeta } from "@/components/PageMeta";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { StatsGallery } from "@/components/site/StatsGallery";
import { TotalVisibility } from "@/components/site/TotalVisibility";
import { Bento } from "@/components/site/Bento";
import { Services } from "@/components/site/Services";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Showcase } from "@/components/site/Showcase";
import { Faq } from "@/components/site/Faq";
import { CtaFooter } from "@/components/site/CtaFooter";

const Index = () => (
  <>
    <PageMeta
      title="Home Construction + 3D Walkthrough | Prestoliv"
      description="Build your home in Hyderabad with Prestoliv. Transparent construction with 3D/VR walkthroughs, live site tracking & on-time delivery. Book a free consult."
      ogUrl="https://www.prestoliv.com/"
    />
    <main id="page-home" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <StatsGallery />
      <TotalVisibility />
      <Bento />
      <Services />
      <WhyChooseUs />
      <Showcase />
      <Faq />
      <CtaFooter />
    </main>
  </>
);

export default Index;
