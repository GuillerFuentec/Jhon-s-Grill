'use client'

import React from "react";
import { usePathname } from "next/navigation";
import { LandingNavbar } from "./landingNavbar";
import { AppNavbar } from "./appNavbar";

export function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") return <LandingNavbar />;

  return <AppNavbar />;
}
