"use client";

import { gsap } from "gsap";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "../lib/site";

const TEXT = "Hello! I'm Taek-99";
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
  const [threeReady, setThreeReady] = useState(false);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const shipRef = useRef<HTMLDivElement | null>(null);
  const shipGlowRef = useRef<HTMLDivElement | null>(null);
  const exhaustRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const warpRef = useRef<HTMLDivElement | null>(null);
  const atmosphereRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<{ destroy?: () => void } | null>(null);
  const hasFinishedRef = useRef(false);
  const canProceedRef = useRef(false);

  function finishIntro() {
    if (hasFinishedRef.current) {
      return;
    }

    hasFinishedRef.current = true;
    onDone?.();
  }

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(TEXT.slice(0, i + 1));
      i += 1;
      if (i === TEXT.length) {
        clearInterval(interval);
        canProceedRef.current = true;
        setCanProceed(true);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!canProceed) {
      return;
    }

    const interval = setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      if (canProceedRef.current && !isLaunching && !hasFinishedRef.current) {
        handleProceed();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [canProceed, isLaunching]);

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
      backgroundColor: 0x050816,
      skyColor: 0x3b82f6,
      cloudColor: 0xcbd5e1,
      cloudShadowColor: 0x0f172a,
      sunColor: 0xfef3c7,
      sunGlareColor: 0xfdba74,
      sunlightColor: 0xffedd5,
    });

    return () => {
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
    };
  }, [scriptsReady]);

  useEffect(() => {
    if (!shipGlowRef.current) {
      return;
    }

    const tween = gsap.to(shipGlowRef.current, {
      scaleY: 1.18,
      scaleX: 0.88,
      opacity: 0.85,
      duration: 0.24,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  function handleProceed() {
    if (!canProceedRef.current || isLaunching || hasFinishedRef.current) {
      return;
    }

    if (
      !rootRef.current ||
      !contentRef.current ||
      !shipRef.current ||
      !starsRef.current ||
      !warpRef.current ||
      !atmosphereRef.current ||
      !vignetteRef.current
    ) {
      finishIntro();
      return;
    }

    setIsLaunching(true);
    gsap.killTweensOf([
      contentRef.current,
      shipRef.current,
      exhaustRef.current,
      starsRef.current,
      warpRef.current,
      atmosphereRef.current,
      vignetteRef.current,
      rootRef.current,
    ]);

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: finishIntro,
    });

    timeline
      .to(
        rootRef.current,
        {
          x: 4,
          y: -3,
          duration: 0.08,
          repeat: 7,
          yoyo: true,
          ease: "power1.inOut",
        },
        0.18
      )
      .to(
        contentRef.current,
        {
          y: 24,
          autoAlpha: 0,
          duration: 0.35,
        },
        0
      )
      .to(
        atmosphereRef.current,
        {
          autoAlpha: 0.18,
          scaleY: 1.15,
          duration: 0.7,
        },
        0
      )
      .fromTo(
        starsRef.current,
        {
          autoAlpha: 0,
          scale: 1.18,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
        },
        0.15
      )
      .fromTo(
        warpRef.current,
        {
          autoAlpha: 0,
          backgroundPosition: "0px 0px",
        },
        {
          autoAlpha: 1,
          backgroundPosition: "0px 560px",
          duration: 0.95,
          ease: "power2.in",
        },
        0.28
      )
      .to(
        vignetteRef.current,
        {
          autoAlpha: 1,
          duration: 0.8,
        },
        0.1
      )
      .to(
        exhaustRef.current,
        {
          scaleY: 2.1,
          scaleX: 1.18,
          autoAlpha: 1,
          duration: 0.48,
          ease: "power2.in",
        },
        0.22
      )
      .to(
        shipRef.current,
        {
          y: -540,
          scale: 0.36,
          rotate: -6,
          duration: 1.45,
          ease: "power4.in",
        },
        0.2
      )
      .to(
        exhaustRef.current,
        {
          y: 120,
          autoAlpha: 0,
          duration: 1,
          ease: "power4.in",
        },
        0.3
      )
      .to(
        rootRef.current,
        {
          x: 0,
          y: 0,
          autoAlpha: 0,
          duration: 0.45,
        },
        1.15
      );
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setThreeReady(true)}
      />
      {threeReady ? (
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds2.min.js"
          strategy="afterInteractive"
          onLoad={() => setScriptsReady(true)}
        />
      ) : null}
      <div
        ref={rootRef}
        role="button"
        tabIndex={0}
        onClick={handleProceed}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleProceed();
          }
        }}
        className="fixed inset-0 z-50 overflow-hidden bg-[#040712]"
      >
        <div ref={backgroundRef} className="absolute inset-0" />
        <div
          ref={starsRef}
          className="invisible absolute inset-0 opacity-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.95) 0 1px, transparent 1.5px), radial-gradient(circle at 76% 22%, rgba(255,255,255,0.85) 0 1px, transparent 1.5px), radial-gradient(circle at 60% 72%, rgba(255,255,255,0.95) 0 1.2px, transparent 1.8px), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.8) 0 1px, transparent 1.5px), radial-gradient(circle at 84% 68%, rgba(255,255,255,0.9) 0 1px, transparent 1.6px), radial-gradient(circle at 48% 42%, rgba(148,163,184,0.9) 0 1px, transparent 1.5px), radial-gradient(circle at 12% 64%, rgba(255,255,255,0.9) 0 1px, transparent 1.5px)",
            backgroundColor: "#020617",
            backgroundSize: "340px 340px, 420px 420px, 380px 380px, 460px 460px, 400px 400px, 360px 360px, 480px 480px",
          }}
        />
        <div
          ref={warpRef}
          className="invisible absolute inset-0 opacity-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(148,163,184,0) 0%, rgba(148,163,184,0.7) 50%, rgba(148,163,184,0) 100%), linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 100%)",
            backgroundSize: "2px 160px, 1px 120px, 1px 180px",
            backgroundPosition: "12% 0%, 56% 0%, 84% 0%",
            backgroundRepeat: "repeat-y",
            mixBlendMode: "screen",
          }}
        />
        <div
          ref={vignetteRef}
          className="invisible absolute inset-0 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 72%, rgba(99,102,241,0.18), transparent 28%), radial-gradient(circle at 50% 50%, transparent 36%, rgba(2,6,23,0.68) 100%)",
          }}
        />
        <div
          ref={atmosphereRef}
          className="absolute inset-x-[-12%] bottom-[-24%] h-[56%] rounded-[50%] opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(125,211,252,0.8), rgba(59,130,246,0.42) 34%, rgba(12,18,34,0) 74%)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative flex h-full flex-col items-center justify-center">
          <div ref={contentRef} className="absolute top-[14%] px-6 text-center">
            <h1 className="text-white text-6xl font-semibold tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.22)] md:text-7xl">
              {displayed}
            </h1>
            <p
              className={`mt-6 text-sm uppercase tracking-[0.35em] text-white/80 transition-opacity duration-500 ${
                canProceed ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: canProceed ? "intro-blink 1.4s ease-in-out infinite" : "none",
              }}
            >
              Launch To Enter
            </p>
            {canProceed ? (
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60">{countdown}</p>
            ) : null}
          </div>

          <div
            ref={shipRef}
            className="relative mt-28 flex flex-col items-center justify-center"
          >
            <div
              ref={shipGlowRef}
              className="absolute bottom-[-8px] h-32 w-24 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.85)_0%,rgba(239,68,68,0.6)_42%,rgba(239,68,68,0)_74%)] blur-xl"
            />
            <div
              ref={exhaustRef}
              className="invisible absolute bottom-[-132px] h-44 w-16 origin-top rounded-full bg-[linear-gradient(180deg,rgba(255,247,237,0.95)_0%,rgba(253,186,116,0.92)_24%,rgba(249,115,22,0.72)_58%,rgba(220,38,38,0)_100%)] opacity-0 blur-md"
            />
            <img
              src={withBasePath("/intro/spaceship.svg")}
              alt="Spaceship"
              className="relative w-[220px] drop-shadow-[0_24px_48px_rgba(15,23,42,0.35)] md:w-[280px]"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes intro-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.38;
          }
        }
      `}</style>
    </>
  );
}
