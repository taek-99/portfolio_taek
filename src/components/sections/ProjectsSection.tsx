"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";

type DisplayProject = {
  id: string;
  name: string;
  period: string;
  team: string;
  oneLiner: string;
  accentClass: string;
  iconSrc?: string;
  iconAlt?: string;
};

export function SectionProjects() {
  const displayProjects: DisplayProject[] = [
    ...projects.map((project) => ({
      id: project.id,
      name: project.name,
      period: project.period,
      team: project.team,
      oneLiner: project.oneLiner,
      accentClass: project.accentClass,
      iconSrc: project.iconSrc,
      iconAlt: project.iconAlt,
    })),
  ];

  const [activeProjectId, setActiveProjectId] = useState(displayProjects[0]?.id);
  const activeProject =
    displayProjects.find((project) => project.id === activeProjectId) ?? displayProjects[0];

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(trackRef.current?.children ?? [], {
        y: 24,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    cards.forEach((card) => {
      const isActive = card?.dataset.projectId === activeProjectId;
      gsap.to(card, {
        y: isActive ? -8 : 0,
        scale: isActive ? 1 : 0.96,
        opacity: 1,
        duration: 0.24,
        ease: "power2.out",
      });
    });
  }, [activeProjectId]);

  function animateCardHover(index: number, isEntering: boolean) {
    const card = cardRefs.current[index];
    const overlay = overlayRefs.current[index];
    const logo = logoRefs.current[index];
    const title = titleRefs.current[index];

    if (!card || !overlay || !logo || !title) {
      return;
    }

    gsap.killTweensOf([card, overlay, logo, title]);

    if (isEntering) {
      gsap.to(card, {
        y: -12,
        scale: 1.01,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(overlay, {
        autoAlpha: 1,
        y: 0,
        duration: 0.18,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(logo, {
        scale: 0.88,
        y: -12,
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.out",
        overwrite: true,
      });

      gsap.to(title, {
        y: -10,
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.out",
        overwrite: true,
      });
      return;
    }

    const isActive = card.dataset.projectId === activeProjectId;

    gsap.to(card, {
      y: isActive ? -8 : 0,
      scale: isActive ? 1 : 0.96,
      duration: 0.22,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(overlay, {
      autoAlpha: 0,
      y: 4,
      duration: 0.16,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(logo, {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration: 0.18,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(title, {
      y: 0,
      autoAlpha: 1,
      duration: 0.18,
      ease: "power2.out",
      overwrite: true,
    });
  }

  function moveProject(direction: -1 | 1) {
    if (!trackRef.current || displayProjects.length === 0) {
      return;
    }

    const currentIndex = Math.max(
      0,
      displayProjects.findIndex((project) => project.id === activeProjectId),
    );
    const nextIndex = Math.min(displayProjects.length - 1, Math.max(0, currentIndex + direction));
    const nextProject = displayProjects[nextIndex];
    const nextCard = cardRefs.current[nextIndex];

    if (!nextProject || !nextCard) {
      return;
    }

    setActiveProjectId(nextProject.id);
    trackRef.current.scrollTo({
      left: nextCard.offsetLeft - (trackRef.current.clientWidth - nextCard.clientWidth) / 2,
      behavior: "smooth",
    });
  }

  function renderCardBody(project: DisplayProject, index: number) {
    return (
      <>
        <div className={`absolute inset-0 rounded-[36px] bg-gradient-to-br ${project.accentClass}`} />

        <div className="relative flex min-h-[320px] flex-col items-center justify-center gap-8 text-center md:min-h-[420px]">
          <div
            ref={(node) => {
              logoRefs.current[index] = node;
            }}
            className="flex items-center justify-center py-2"
          >
            <div className="flex h-36 w-36 items-center justify-center rounded-[32px] border border-black/5 bg-white shadow-[0_20px_40px_rgba(2,6,23,0.18)] md:h-52 md:w-52">
              <Image
                src={project.iconSrc ?? ""}
                alt={project.iconAlt ?? project.name}
                width={136}
                height={136}
                className={`object-contain ${
                  project.name === "See:Sun"
                    ? "h-28 w-28 md:h-40 md:w-40"
                    : "h-24 w-24 md:h-36 md:w-36"
                }`}
              />
            </div>
          </div>

          <div
            ref={(node) => {
              titleRefs.current[index] = node;
            }}
            className="space-y-3"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              {project.name}
            </h3>
            <p className="text-sm font-semibold tracking-[0.14em] text-slate-500 md:text-base">
              {project.period}
            </p>
          </div>

          <div
            ref={(node) => {
              overlayRefs.current[index] = node;
            }}
            className="pointer-events-none invisible absolute inset-0 flex translate-y-2 flex-col items-center justify-center rounded-[36px] bg-[rgba(255,255,255,0.97)] p-6 text-center opacity-0 md:p-8"
          >
            <div className="flex max-w-[18rem] flex-col items-center gap-5 md:max-w-[20rem]">
              <p className="whitespace-pre-line text-xl font-bold leading-8 text-black md:text-2xl md:leading-9">
                {project.oneLiner}
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-black md:text-base">
                <span className="whitespace-pre-line rounded-[20px] border border-black/10 bg-black/5 px-4 py-2 text-center">
                  {project.team}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 text-base font-bold text-black md:text-lg">
                <span>더보기</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Project</h1>
          </div>
        </div>

        <div
          ref={trackRef}
          className="scrollbar-none -mx-2 flex gap-4 overflow-hidden px-2 pb-6 pt-4 sm:-mx-3 sm:gap-6 sm:px-3"
        >
          {displayProjects.map((project, index) => {
            const isActive = project.id === activeProject.id;
            const className = `group relative min-w-[78vw] max-w-[82vw] rounded-[30px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_22px_48px_rgba(2,6,23,0.36)] transition sm:min-w-[300px] sm:max-w-none sm:rounded-[36px] sm:p-6 md:min-w-[340px] md:p-8 ${
              isActive ? "ring-1 ring-white/20" : ""
            }`;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-project-id={project.id}
                onPointerEnter={() => {
                  setActiveProjectId(project.id);
                  animateCardHover(index, true);
                }}
                onPointerLeave={() => animateCardHover(index, false)}
                onFocus={() => {
                  setActiveProjectId(project.id);
                  animateCardHover(index, true);
                }}
                onBlur={() => animateCardHover(index, false)}
                className={className}
              >
                {renderCardBody(project, index)}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => moveProject(-1)}
            disabled={activeProject?.id === displayProjects[0]?.id}
            aria-label="이전 프로젝트"
            className="flex h-13 w-16 items-center justify-center rounded-full border border-sky-200/70 bg-sky-400 text-2xl font-black text-slate-950 shadow-[0_14px_32px_rgba(56,189,248,0.32)] transition hover:border-white hover:bg-sky-300 hover:shadow-[0_18px_42px_rgba(56,189,248,0.45)] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:opacity-45"
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => moveProject(1)}
            disabled={activeProject?.id === displayProjects[displayProjects.length - 1]?.id}
            aria-label="다음 프로젝트"
            className="flex h-13 w-16 items-center justify-center rounded-full border border-sky-200/70 bg-sky-400 text-2xl font-black text-slate-950 shadow-[0_14px_32px_rgba(56,189,248,0.32)] transition hover:border-white hover:bg-sky-300 hover:shadow-[0_18px_42px_rgba(56,189,248,0.45)] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none disabled:opacity-45"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
