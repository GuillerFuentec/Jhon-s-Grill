import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { Hero } from "@/components/website/hero";
import { Video } from "@/components/website/video-section";
import { Infosection } from "@/components/website/info-section";
import { Menu } from "@/components/website/menu";
import AboutUs from "@/components/website/about-us";
import { Contact } from "@/components/website/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-16"></div>
      <main>
        <Hero />
        <Video />
        <Infosection />
        <Menu />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
