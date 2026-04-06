"use client";

import { useEffect, useState } from "react";

const TEXT = "Hello! I'm Taek-99";
const HOLD_DURATION_MS = 700;
const FADE_DURATION_MS = 900;

export default function IntroOverlay({ onDone }: { onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let i = 0;
    let holdTimeout: ReturnType<typeof setTimeout> | undefined;
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setDisplayed(TEXT.slice(0, i + 1));
      i++;
      if (i === TEXT.length) {
        clearInterval(interval);
        holdTimeout = setTimeout(() => {
          setIsFadingOut(true);
          fadeTimeout = setTimeout(() => onDone?.(), FADE_DURATION_MS);
        }, HOLD_DURATION_MS);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (holdTimeout) {
        clearTimeout(holdTimeout);
      }
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-[900ms] ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-white text-5xl font-semibold tracking-wide">
        {displayed}
      </h1>
    </div>
  );
}
