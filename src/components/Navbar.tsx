"use client";

import Image from "next/image";
import { withBasePath } from "../lib/site";

const navItems = [
  {
    href: "#Home",
    label: "Home",
    imageSrc: withBasePath("/planet/planet_0_2_clean.png"),
    sizeClassName: "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20",
  },
  {
    href: "#about",
    label: "About Me",
    imageSrc: withBasePath("/planet/planet_0_0_clean.png"),
    sizeClassName: "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20",
  },
  {
    href: "#projects",
    label: "Project",
    imageSrc: withBasePath("/planet/saturn_full 1.png"),
    sizeClassName: "h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24",
  },
  {
    href: "#contact",
    label: "Contact",
    imageSrc: withBasePath("/planet/planet_2_2_clean.png"),
    sizeClassName: "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20",
  },
];

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-full max-w-[1400px] justify-end px-3 pt-4 sm:px-4 sm:pt-6 md:px-8 md:pt-8 lg:px-12">
        <nav className="flex max-w-full items-start gap-3 sm:gap-4 md:gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex min-w-0 flex-col items-center gap-1 text-center sm:gap-1.5"
            >
              <div className="flex h-16 items-center justify-center sm:h-20 md:h-28">
                <div
                  className={`relative transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 ${item.sizeClassName}`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.label}
                    fill
                    className="object-contain drop-shadow-[0_10px_20px_rgba(255,255,255,0.12)]"
                  />
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-300 transition group-hover:text-white sm:text-xs sm:tracking-[0.18em] md:text-sm md:tracking-[0.22em]">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
