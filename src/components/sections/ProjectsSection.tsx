"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";

export function SectionProjects() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id);
  const activeProject =
    projects.find((project) => project.id === activeProjectId) ?? projects[0];

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
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
        opacity: 0,
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
        opacity: isActive ? 1 : 0.62,
        duration: 0.45,
        ease: "power3.out",
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

    if (isEntering) {
      gsap.to(card, {
        y: -12,
        scale: 1.02,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.to(overlay, {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(logo, {
        scale: 0.82,
        y: -18,
        autoAlpha: 0,
        duration: 0.32,
        ease: "power3.out",
      });

      gsap.to(title, {
        y: -14,
        autoAlpha: 0,
        duration: 0.32,
        ease: "power3.out",
      });
      return;
    }

    const isActive = card.dataset.projectId === activeProjectId;

    gsap.to(card, {
      y: isActive ? -8 : 0,
      scale: isActive ? 1 : 0.96,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(overlay, {
      autoAlpha: 0,
      y: 8,
      duration: 0.28,
      ease: "power2.out",
    });

    gsap.to(logo, {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(title, {
      y: 0,
      autoAlpha: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }

  function syncProjectFromScroll() {
    if (!trackRef.current) {
      return;
    }

    const track = trackRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;

    let closestId = activeProjectId;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card) => {
      if (!card?.dataset.projectId) {
        return;
      }

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = card.dataset.projectId;
      }
    });

    if (closestId && closestId !== activeProjectId) {
      setActiveProjectId(closestId);
    }
  }

  function handleTrackWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (!trackRef.current) {
      return;
    }

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    event.preventDefault();
    trackRef.current.scrollLeft += event.deltaY;
    syncProjectFromScroll();
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f3efe7_46%,#ffffff_100%)] px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gray-400">
              Projects
            </p>
            <h1 className="text-4xl font-bold text-black md:text-5xl">
              Select A Project
            </h1>
          </div>

          <p className="text-xs uppercase tracking-[0.28em] text-gray-400">
            Swipe Horizontally
          </p>
        </div>

        <div
          ref={trackRef}
          onWheel={handleTrackWheel}
          onScroll={syncProjectFromScroll}
          className="scrollbar-none -mx-3 flex gap-6 overflow-x-auto px-3 pb-6 pt-4"
        >
          {projects.map((project, index) => {
            const isActive = project.id === activeProject.id;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-project-id={project.id}
                onMouseEnter={() => {
                  setActiveProjectId(project.id);
                  animateCardHover(index, true);
                }}
                onMouseLeave={() => animateCardHover(index, false)}
                onFocus={() => {
                  setActiveProjectId(project.id);
                  animateCardHover(index, true);
                }}
                onBlur={() => animateCardHover(index, false)}
                className={`group relative min-w-[260px] rounded-[36px] border border-black/10 bg-white/90 p-6 shadow-[0_22px_48px_rgba(15,23,42,0.08)] transition md:min-w-[340px] md:p-8 ${
                  isActive ? "ring-1 ring-black/15" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-[36px] bg-gradient-to-br ${project.accentClass} opacity-85`}
                />
                <div className="relative flex min-h-[320px] flex-col items-center justify-center gap-8 text-center md:min-h-[420px]">
                  <div
                    ref={(node) => {
                      logoRefs.current[index] = node;
                    }}
                    className="flex items-center justify-center py-2"
                  >
                    <div className="flex h-36 w-36 items-center justify-center rounded-[32px] border border-white/70 bg-white/90 shadow-[0_20px_40px_rgba(255,255,255,0.45)] md:h-52 md:w-52">
                      <Image
                        src={project.iconSrc}
                        alt={project.iconAlt}
                        width={136}
                        height={136}
                        className="h-24 w-24 object-contain md:h-36 md:w-36"
                      />
                    </div>
                  </div>

                  <div
                    ref={(node) => {
                      titleRefs.current[index] = node;
                    }}
                    className="space-y-3"
                  >
                    <h3 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                      {project.name}
                    </h3>
                  </div>

                  <div
                    ref={(node) => {
                      overlayRefs.current[index] = node;
                    }}
                    className="pointer-events-none invisible absolute inset-0 flex translate-y-2 flex-col items-center justify-center rounded-[36px] bg-[rgba(8,8,8,0.94)] p-6 text-center opacity-0 md:p-8"
                  >
                    <div className="flex max-w-[18rem] flex-col items-center gap-5 md:max-w-[20rem]">
                    <p className="text-xl font-bold leading-8 text-white md:text-2xl md:leading-9">
                      {project.oneLiner}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-white md:text-base">
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                        {project.team}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                        {project.period}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-base font-bold text-white md:text-lg">
                      <span>더보기</span>
                      <span>→</span>
                    </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
