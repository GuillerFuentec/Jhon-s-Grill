import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Menu } from "@/components/website/menu";
import React from "react";

export default function page() {
  return (
    <>
      <Navbar />
      <Menu />
      <Footer />
    </>
  );
}
