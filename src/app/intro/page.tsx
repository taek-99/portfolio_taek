"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IntroOverlay from "../../components/Intro";

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    window.sessionStorage.removeItem("hasSeenIntro");
  }, []);

  return (
    <IntroOverlay
      onDone={() => {
        window.sessionStorage.setItem("hasSeenIntro", "true");
        router.replace("/");
      }}
    />
  );
}
