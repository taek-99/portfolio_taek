"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "../../lib/site";

type Skill = {
  name: string;
  level: number;
  description: string;
  iconSrc: string;
};

type SkillGroup = {
  title: string;
  skills: Skill[];
};

type AboutPage = "Tech Stack" | "Awards" | "Licence" | "Education";

const skillGroups: SkillGroup[] = [
  {
    title: "Language",
    skills: [
      {
        name: "JavaScript",
        level: 68,
        iconSrc: withBasePath("/techstack/JavaScript.svg"),
        description:
          "Vue 기반 프로젝트에서 지도, 추천 결과, 페이지 흐름을 직접 구현했습니다.",
      },
      {
        name: "TypeScript",
        level: 76,
        iconSrc: withBasePath("/techstack/TypeScript.svg"),
        description:
          "헤어때와 See:Sun에서 타입 안정성을 기반으로 기능 구조를 정리했습니다.",
      },
      {
        name: "Python",
        level: 54,
        iconSrc: withBasePath("/techstack/Python.svg"),
        description:
          "AI 및 백엔드 협업 맥락에서 데이터 흐름과 기능 연동을 이해하며 활용했습니다.",
      },
    ],
  },
  {
    title: "Framework",
    skills: [
      {
        name: "Next.js",
        level: 72,
        iconSrc: withBasePath("/techstack/NextJS.svg"),
        description:
          "서비스형 UI 구성과 음성 기반 인터랙션 프로젝트를 구현하며 활용했습니다.",
      },
      {
        name: "Vue",
        level: 68,
        iconSrc: withBasePath("/techstack/Vue.svg"),
        description:
          "응급실 추천 서비스에서 탐색 흐름과 상세 UI를 직접 구현했습니다.",
      },
      {
        name: "Django",
        level: 48,
        iconSrc: withBasePath("/techstack/Django.svg"),
        description:
          "프론트엔드 중심 프로젝트에서 API 연동과 서비스 구조를 이해하는 기반으로 다뤘습니다.",
      },
    ],
  },
  {
    title: "Library",
    skills: [
      {
        name: "React",
        level: 80,
        iconSrc: withBasePath("/techstack/React.svg"),
        description:
          "사용자 흐름 중심 화면 설계와 상태 기반 인터랙션 구현에 가장 익숙합니다.",
      },
      {
        name: "Three.js",
        level: 60,
        iconSrc: withBasePath("/techstack/ThreeJS.svg"),
        description:
          "Raycasting 기반 3D 신체 부위 선택 인터랙션과 시각적 피드백을 구현했습니다.",
      },
    ],
  },
  {
    title: "Styling",
    skills: [
      {
        name: "Tailwind CSS",
        level: 78,
        iconSrc: withBasePath("/techstack/TailwindCSS.svg"),
        description:
          "빠른 화면 구성과 일관된 디자인 시스템 정리에 익숙합니다.",
      },
    ],
  },
  {
    title: "Infra & Collaboration",
    skills: [
      {
        name: "Docker",
        level: 50,
        iconSrc: withBasePath("/techstack/Docker.svg"),
        description:
          "개발 환경을 맞추고 서비스 실행 흐름을 안정적으로 공유하는 데 활용했습니다.",
      },
      {
        name: "AWS",
        level: 45,
        iconSrc: withBasePath("/techstack/AWS-Dark.svg"),
        description:
          "배포 및 인프라 구조를 이해하고 프로젝트 운영 흐름을 파악하는 데 사용했습니다.",
      },
      {
        name: "Figma",
        level: 62,
        iconSrc: withBasePath("/techstack/Figma.svg"),
        description:
          "기획과 디자인 의도를 화면 구조로 옮기기 위한 협업 도구로 익숙하게 사용했습니다.",
      },
    ],
  },
];

const aboutPages: AboutPage[] = ["Tech Stack", "Awards", "Licence", "Education"];

function SkillBar({
  skill,
  isVisible,
  index,
}: {
  skill: Skill;
  isVisible: boolean;
  index: number;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center">
            <Image
              src={skill.iconSrc}
              alt={`${skill.name} logo`}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
          </div>
        </div>
        <p className="text-sm font-semibold text-slate-400">{skill.level}%</p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-300 transition-[width] duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 120}ms`,
          }}
        />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{skill.description}</p>
    </div>
  );
}

export function SectionAbout() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [animateBars, setAnimateBars] = useState(false);
  const [activePage, setActivePage] = useState<AboutPage>("Tech Stack");

  const activePageIndex = aboutPages.indexOf(activePage);

  useEffect(() => {
    const node = stackRef.current;
    if (!node || animateBars || activePage !== "Tech Stack") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) {
          return;
        }

        setAnimateBars(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [activePage, animateBars]);

  let skillIndex = 0;

  return (
    <section id="about" className="min-h-screen py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            About
          </p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">About Me</h1>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_28px_80px_rgba(15,23,42,0.22)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">{activePage}</h2>

            </div>

            <div className="flex flex-wrap gap-2">
              {aboutPages.map((page) => {
                const isActive = page === activePage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setActivePage(page)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-sky-300 bg-sky-300 text-slate-950"
                        : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-8">
            {activePage === "Tech Stack" && (
              <div ref={stackRef} className="space-y-10">
                {skillGroups.map((group) => (
                  <div key={group.title} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">{group.title}</h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {group.skills.map((skill) => {
                        const currentIndex = skillIndex;
                        skillIndex += 1;

                        return (
                          <SkillBar
                            key={skill.name}
                            skill={skill}
                            isVisible={animateBars}
                            index={currentIndex}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePage === "Awards" && (
              <ul className="list-disc list-inside space-y-3 text-lg text-slate-300">
                <li>SSAFY 14기 특화 프로젝트 서울 7반 1위</li>
                <li>2017 전국 기능경기대회 1위</li>
              </ul>
            )}

            {activePage === "Licence" && (
              <ul className="list-disc list-inside space-y-3 text-lg text-slate-300">
                <li>OPIC (IL)</li>
                <li>컴퓨터활용능력 1급</li>
                <li>전자기기 기능사</li>
              </ul>
            )}

            {activePage === "Education" && (
              <ul className="list-disc list-inside space-y-3 text-lg text-slate-300">
                <li>Samsung Software AI Academy For Youth (SSAFY)</li>
                <li>충북반도체고등학교 반도체 전공</li>
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
