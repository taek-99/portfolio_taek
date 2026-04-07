"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { SectionAbout } from "../components/sections/AboutSection";
import { SectionContact } from "../components/sections/ContactSection";
import { SectionHome } from "../components/sections/HomeSection";
import { SectionProjects } from "../components/sections/ProjectsSection";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem("hasSeenIntro");

    if (!hasSeenIntro) {
      router.replace("/intro");
      return;
    }

    setIsReady(true);
  }, [router]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const target = document.querySelector(hash);
    if (!target) {
      return;
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.95) 0 1px, transparent 1.5px), radial-gradient(circle at 76% 14%, rgba(255,255,255,0.82) 0 1px, transparent 1.6px), radial-gradient(circle at 62% 68%, rgba(255,255,255,0.88) 0 1.2px, transparent 1.8px), radial-gradient(circle at 28% 78%, rgba(255,255,255,0.78) 0 1px, transparent 1.5px), radial-gradient(circle at 86% 62%, rgba(148,163,184,0.95) 0 1px, transparent 1.6px), radial-gradient(circle at 42% 38%, rgba(255,255,255,0.85) 0 1px, transparent 1.6px), radial-gradient(circle at 10% 58%, rgba(255,255,255,0.9) 0 1px, transparent 1.5px)",
          backgroundColor: "#030712",
          backgroundSize:
            "360px 360px, 420px 420px, 400px 400px, 480px 480px, 430px 430px, 390px 390px, 520px 520px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.08),transparent_28%)]"
      />

      <main className="relative min-h-screen">
        <Navbar />
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-12">
          <SectionHome />
          <SectionAbout />
          <SectionProjects />
          <SectionContact />
        </div>
      </main>
    </div>
  );
}
