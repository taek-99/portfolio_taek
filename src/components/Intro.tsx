"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const TEXT = "Hello! I'm Taek-99";
const FADE_DURATION_MS = 900;
const CLOUDS_TEXTURE_URL =
  "https://cdn.jsdelivr.net/npm/vanta@latest/dist/gallery/noise.png";

declare global {
  interface Window {
    VANTA?: {
      CLOUDS2: (options: Record<string, unknown>) => { destroy?: () => void };
    };
  }
}

export default function IntroOverlay({ onDone }: { onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(TEXT.slice(0, i + 1));
      i++;
      if (i === TEXT.length) {
        clearInterval(interval);
        setCanProceed(true);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!scriptsReady || !backgroundRef.current || !window.VANTA?.CLOUDS2) {
      return;
    }

    vantaRef.current?.destroy?.();
    vantaRef.current = window.VANTA.CLOUDS2({
      el: backgroundRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      speed: 3,
      zoom: 1.15,
      texturePath: CLOUDS_TEXTURE_URL,
      backgroundColor: 0x000000,
      skyColor: 0x2d4566,
      cloudColor: 0x7aa2d6,
      cloudShadowColor: 0x1a2233,
      sunColor: 0xffb56b,
      sunGlareColor: 0xffd7a8,
      sunlightColor: 0xffe2b8,
    });

    return () => {
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
    };
  }, [scriptsReady]);

  useEffect(() => {
    if (!isFadingOut) {
      return;
    }

    const fadeTimeout = setTimeout(() => onDone?.(), FADE_DURATION_MS);
    return () => clearTimeout(fadeTimeout);
  }, [isFadingOut, onDone]);

  function handleProceed() {
    if (!canProceed || isFadingOut) {
      return;
    }

    setIsFadingOut(true);
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds2.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsReady(true)}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleProceed}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleProceed();
          }
        }}
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-opacity duration-[900ms] ${
          isFadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div ref={backgroundRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative flex flex-col items-center gap-6 px-6 text-center">
          <h1 className="text-white text-6xl font-semibold tracking-wide md:text-7xl">
            {displayed}
          </h1>
          <p
            className={`text-sm uppercase tracking-[0.35em] text-white/75 transition-opacity duration-500 ${
              canProceed ? "opacity-100" : "opacity-0"
            }`}
          >
            Click To Enter
          </p>
        </div>
      </div>
    </>
  );
}
