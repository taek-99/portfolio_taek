"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { Project } from "../../data/projects";
import { getStackBadgeLabel, getStackLogoSrc } from "../../data/stackLogos";

export function ProjectShowcase({ project }: { project: Project }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-slide-header]", {
        y: 26,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.from("[data-slide-panel]", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`min-h-screen ${project.panelClass} px-6 py-10 text-black md:px-8 lg:px-10`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col rounded-[40px] border border-black/10 bg-white/80 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur md:p-8 lg:p-10">
        <div
          data-slide-header
          className="mb-8 flex flex-col gap-6 border-b border-black/10 pb-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="space-y-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
            >
              <span>&larr;</span>
              <span>Back To Projects</span>
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-black/10 bg-white px-4 py-1 text-xs uppercase tracking-[0.22em] text-gray-500">
                {project.period}
              </span>
              <span className="rounded-full border border-black/10 bg-white px-4 py-1 text-xs uppercase tracking-[0.22em] text-gray-500">
                {project.team}
              </span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gray-400">
                {project.category}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-black md:text-6xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
                {project.summary}
              </p>
            </div>
          </div>

          <div className="max-w-sm rounded-[28px] border border-black/10 bg-white/90 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
              Outcome
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {project.outcome}
            </p>
          </div>
        </div>

        <div className="grid flex-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <div
              data-slide-panel
              className="rounded-[32px] border border-black/10 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
                Slide Summary
              </p>
              <p className="mt-4 text-2xl font-semibold leading-tight text-black md:text-3xl">
                {project.oneLiner}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div
                data-slide-panel
                className="rounded-[32px] border border-black/10 bg-white p-6"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
                  Core Features
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-gray-700">
                  {project.features.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                data-slide-panel
                className="rounded-[32px] border border-black/10 bg-white p-6"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
                  FE Contribution
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-7 text-gray-700">
                  {project.contributions.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-black" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              data-slide-panel
              className="rounded-[32px] border border-black/10 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
                Stack Note
              </p>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                보유 중인 기술 로고는 실제 아이콘으로 표시했고, 없는 항목은 프로젝트용 배지 형태로 생성해 정리했습니다.
              </p>
              {project.note ? (
                <p className="mt-5 text-sm leading-7 text-gray-500">{project.note}</p>
              ) : null}
            </div>
          </div>

          <div
            data-slide-panel
            className="rounded-[32px] border border-black/10 bg-white p-6 md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">
                  Tech Stack Logos
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-black md:text-3xl">
                  Stack Board
                </h2>
              </div>
              <div className="rounded-full border border-black/10 bg-[#f7f7f5] px-4 py-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                {project.stack.length} Items
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.stack.map((item) => {
                const logoSrc = getStackLogoSrc(item);

                return (
                  <div
                    key={item}
                    className="rounded-[28px] border border-black/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f5_100%)] p-5"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-black/10 bg-white shadow-sm">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={`${item} logo`}
                          className="h-11 w-11 object-contain"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-semibold tracking-[0.14em] text-white">
                          {getStackBadgeLabel(item)}
                        </div>
                      )}
                    </div>
                    <p className="mt-5 text-base font-medium text-black">{item}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gray-400">
                      {logoSrc ? "Logo Asset" : "Generated Badge"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
