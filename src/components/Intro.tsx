"use client";

import { useEffect, useState } from "react";

const TEXT = "Hello! I'm Taek-99";

export default function IntroOverlay({ onDone }: { onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(TEXT.slice(0, i + 1));
      i++;
      if (i === TEXT.length) {
        clearInterval(interval);
        setTimeout(() => onDone?.(), 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <h1 className="text-white text-5xl font-semibold tracking-wide">
        {displayed}
      </h1>
    </div>
  );
}
