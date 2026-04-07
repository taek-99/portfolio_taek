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

type Award = {
  title: string;
  date: string;
  description: string;
  imageSrcs: string[];
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
        description: "Vue 기반 프로젝트에서 추천 결과, 페이지 흐름, 사용자 인터랙션을 직접 구현했습니다.",
      },
      {
        name: "TypeScript",
        level: 76,
        iconSrc: withBasePath("/techstack/TypeScript.svg"),
        description: "See:Sun 프로젝트에서 타입 안정성을 바탕으로 기능 구조를 정리하고 유지보수성을 높였습니다.",
      },
      {
        name: "Python",
        level: 54,
        iconSrc: withBasePath("/techstack/Python.svg"),
        description: "AI 및 백엔드 연동 과정에서 데이터 흐름과 기능 연결을 이해하며 활용했습니다.",
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
        description: "정적 사이트와 인터랙션 중심 화면을 구성하며 포트폴리오와 서비스형 UI를 구현했습니다.",
      },
      {
        name: "Vue",
        level: 68,
        iconSrc: withBasePath("/techstack/Vue.svg"),
        description: "추천 서비스에서 탐색 흐름과 상세 UI를 직접 구성하며 사용자 경험을 다듬었습니다.",
      },
      {
        name: "Django",
        level: 48,
        iconSrc: withBasePath("/techstack/Django.svg"),
        description: "프로젝트 진행 중 API 연동과 서비스 구조를 이해하는 기반으로 활용했습니다.",
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
        description: "사용자 흐름 중심 화면 설계와 상태 기반 인터랙션 구현에 가장 익숙합니다.",
      },
      {
        name: "Three.js",
        level: 60,
        iconSrc: withBasePath("/techstack/ThreeJS.svg"),
        description: "Raycasting 기반 3D 선택 인터랙션과 시각적 피드백을 구현한 경험이 있습니다.",
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
        description: "빠른 화면 구성과 일관된 디자인 시스템 정리에 익숙합니다.",
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
        description: "개발 환경을 맞추고 서비스 실행 흐름을 공유하는 용도로 사용했습니다.",
      },
      {
        name: "AWS",
        level: 45,
        iconSrc: withBasePath("/techstack/AWS-Dark.svg"),
        description: "배포와 인프라 구조를 이해하며 프로젝트 운영 흐름을 파악했습니다.",
      },
      {
        name: "Figma",
        level: 62,
        iconSrc: withBasePath("/techstack/Figma.svg"),
        description: "기획과 디자이너 의도를 화면 구조로 옮기기 위한 협업 도구로 활용했습니다.",
      },
    ],
  },
];

const aboutPages: AboutPage[] = ["Tech Stack", "Awards", "Licence", "Education"];

const awards: Award[] = [
  {
    title: "SSAFY 14기 특화 프로젝트 서울 7반 1위",
    date: "2026.04.03",
    description: "SSAFY 프로젝트 발표회 1등 수상",
    imageSrcs: [withBasePath("/awards/IMG_8715.JPG")],
  },
  {
    title: "SSAFY 14기 싸피레이스 베이직맵, 스피드맵 1위",
    date: "2026.01.09",
    description: "베이직맵과 스피드맵에서 모두 1위를 기록했습니다.",
    imageSrcs: [
      withBasePath("/awards/rn_image_picker_lib_temp_1b7c3b07-111d-46ae-bbe8-f77ba11f4eb6 (1).jpg"),
      withBasePath("/awards/image (42).png"),
    ],
  },
  {
    title: "SSAFY 14기 배틀싸피 전국 대항전 1위",
    date: "2025.10.02",
    description: "전국 대항전 최우수 탱커, 서울 1반 1위",
    imageSrcs: [withBasePath("/awards/image (41).png")],
  },
  {
    title: "전국 기능경기대회 1위(산업용 로봇 직종)",
    date: "2017.09.11",
    description: "제52회 전국기능경기대회 1위",
    imageSrcs: [withBasePath("/awards/PHOTO_0295.JPG")],
  },
];

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
    <div className="rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(100,116,139,0.18),rgba(30,41,59,0.55))] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur">
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
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [activePage, animateBars]);

  let skillIndex = 0;

  return (
    <section id="about" className="min-h-screen py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white md:text-5xl">About Me</h1>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(148,163,184,0.14),rgba(30,41,59,0.72))] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.22)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 rounded-[24px] border border-white/8 bg-slate-800/45 px-5 pb-6 pt-5 md:flex-row md:items-center md:justify-between">
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
                  <div
                    key={group.title}
                    className="space-y-4 rounded-[28px] border border-white/8 bg-slate-800/35 p-5 md:p-6"
                  >
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
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {awards.map((award) => (
                  <div
                    key={award.title}
                    className={`overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(100,116,139,0.18),rgba(30,41,59,0.55))] shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur ${
                      award.imageSrcs.length > 1 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`grid gap-2 p-2 ${
                        award.imageSrcs.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {award.imageSrcs.map((imageSrc, imageIndex) => (
                        <div
                          key={`${award.title}-${imageIndex}`}
                          className="relative aspect-[4/3] overflow-hidden rounded-[20px]"
                        >
                          <Image
                            src={imageSrc}
                            alt={award.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {award.date}
                      </p>
                      <h3 className="text-lg font-semibold text-white">{award.title}</h3>
                      <p className="text-sm text-slate-300">{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePage === "Licence" && (
              <div className="space-y-4">
                {[
                  { name: "OPIC (IL)", date: "2026.03.08" },
                  { name: "컴퓨터활용능력 1급", date: "2023.08.25" },
                  { name: "전자기기 기능사", date: "2017.06.23" },
                  { name: "공유압 기능사", date: "2017.05.23" },
                  { name: "생산자동화 기능사", date: "2017.05.23" },
                ].map((item) => (
                  <div
                    key={`${item.name}-${item.date}`}
                    className="flex flex-col gap-2 rounded-[22px] border border-white/10 bg-slate-800/35 px-5 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <p className="text-lg font-medium text-white">{item.name}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activePage === "Education" && (
              <div className="space-y-4">
                {[
                  {
                    name: "Samsung Software AI Academy For Youth (SSAFY)",
                    date: "2025.07 - 현재 진행 중",
                  },
                  {
                    name: "충북반도체고등학교 반도체과 전공",
                    date: "2015.03 - 2018.02",
                  },
                ].map((item) => (
                  <div
                    key={`${item.name}-${item.date}`}
                    className="flex flex-col gap-2 rounded-[22px] border border-white/10 bg-slate-800/35 px-5 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <p className="text-lg font-medium text-white">{item.name}</p>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
