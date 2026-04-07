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
  const dragStateRef = useRef({
    isDragging: false,
    hasMoved: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
  });

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

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!trackRef.current) {
      return;
    }

    dragStateRef.current = {
      isDragging: true,
      hasMoved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: trackRef.current.scrollLeft,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!trackRef.current || !dragStateRef.current.isDragging) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    if (!dragStateRef.current.hasMoved && Math.abs(deltaX) < 8) {
      return;
    }

    if (!dragStateRef.current.hasMoved) {
      dragStateRef.current.hasMoved = true;
      trackRef.current.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    trackRef.current.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
    syncProjectFromScroll();
  }

  function handlePointerUpOrCancel(event: React.PointerEvent<HTMLDivElement>) {
    if (!trackRef.current || !dragStateRef.current.isDragging) {
      return;
    }

    if (
      dragStateRef.current.hasMoved &&
      trackRef.current.hasPointerCapture(dragStateRef.current.pointerId)
    ) {
      trackRef.current.releasePointerCapture(dragStateRef.current.pointerId);
    }

    dragStateRef.current = {
      isDragging: false,
      hasMoved: false,
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
    };
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
              <p className="text-xl font-bold leading-8 text-black md:text-2xl md:leading-9">
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
          onWheel={handleTrackWheel}
          onScroll={syncProjectFromScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          className="scrollbar-none -mx-3 flex cursor-grab gap-6 overflow-x-auto px-3 pb-6 pt-4 active:cursor-grabbing"
        >
          {displayProjects.map((project, index) => {
            const isActive = project.id === activeProject.id;
            const className = `group relative min-w-[260px] rounded-[36px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_22px_48px_rgba(2,6,23,0.36)] transition md:min-w-[340px] md:p-8 ${
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
      </div>
    </section>
  );
}
