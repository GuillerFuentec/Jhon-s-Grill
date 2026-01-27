import { AppNavbar } from "@/components/common/appNavbar";
import { Footer } from "@/components/common/footer";
import { Menu } from "@/components/website/menu";
import React from "react";

export default function page() {
  return (
    <>
      <AppNavbar />
      <Menu />
      <Footer />
    </>
  );
}
