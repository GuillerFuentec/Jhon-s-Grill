import { Navbar } from "@/app/components/common/navbar";
import { Footer } from "@/app/components/common/footer";
import { Hero } from "./components/website/hero";
import { Video } from "./components/website/video-section";
import { Infosection } from "./components/website/info-section";
import Image from "next/image";
import { Menu } from "./components/website/menu";
import AboutUs from "./components/website/about-us";
import { Contact } from "./components/website/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
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
