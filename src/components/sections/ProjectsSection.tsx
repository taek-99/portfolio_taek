"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectImage = {
  src: string;
  alt: string;
};

type Project = {
  id: string;
  name: string;
  period: string;
  team: string;
  category: string;
  summary: string;
  features: string[];
  contributions: string[];
  stack: string[];
  images?: ProjectImage[];
  note?: string;
};

const projects: Project[] = [
  {
    id: "hairddae",
    name: "헤어때",
    period: "2026.03.03 - 2026.04.03",
    team: "5인 팀 프로젝트 · FE 2 / BE 1 / AI 2",
    category: "AI Hair Styling Web App",
    summary:
      "스타일 탐색부터 실시간 가상 피팅, 결과 저장, 디자이너 상담까지 이어지는 흐름을 가진 서비스입니다. 프론트엔드에서는 인증 진입 흐름과 WebRTC 기반 카메라 체험 UX를 중심으로 구현했습니다.",
    features: [
      "실시간 가상 헤어 피팅 카메라 화면",
      "캡처, 다운로드, AI 보정 연결",
      "디자이너 탐색과 상담 요청 흐름",
    ],
    contributions: [
      "TanStack Router 기반 인증/비인증 라우트 분리와 보호 라우트 구성",
      "API 401 응답 시 refresh token 재발급을 포함한 세션 유지 로직 구현",
      "카메라, 캡처, 보정, 상담 연결까지 이어지는 연속 사용자 플로우 설계",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite 7",
      "TanStack Router",
      "TanStack Query",
      "Tailwind CSS v4",
      "Storybook",
      "Playwright",
      "WebRTC",
      "PWA",
    ],
    images: [
      {
        src: "/projects/hairddae-main.png",
        alt: "헤어때 메인 화면",
      },
      {
        src: "/projects/hairddae-camera.png",
        alt: "헤어때 카메라 화면",
      },
    ],
  },
  {
    id: "see-sun",
    name: "See:Sun",
    period: "2026.01.05 - 2026.01.28",
    team: "4인 팀 프로젝트 · FE 2 / BE 2",
    category: "Accessibility Voice Interface Service",
    summary:
      "시각장애인과 저시력자를 위한 음성 중심 인터페이스 서비스입니다. 화면 의존도를 낮추고 STT, TTS 기반 상호작용을 강화하는 방향으로 접근성 중심 FE 구조를 설계했습니다.",
    features: [
      "음성 입력 기반 사용자 명령 처리",
      "TTS 중심 안내 흐름과 접근성 강화",
      "시각 의존도를 낮춘 단순한 인터랙션 구조",
    ],
    contributions: [
      "Web Speech API 기반 STT 입력 기능과 명령 트리거 흐름 구현",
      "음성 인식 실패와 예외 상황을 고려한 인터랙션 처리",
      "기획과 협업하며 접근성을 고려한 UI 구조와 UX 단순화 설계",
    ],
    stack: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "STT", "TTS"],
    note:
      "이 프로젝트는 문서와 이력서 기준으로 정리했습니다. 포트폴리오에는 FE 역할과 접근성 설계 관점만 반영했습니다.",
  },
  {
    id: "smart-er",
    name: "Smart 응급실 추천 서비스",
    period: "2025.11.17 - 2025.12.26",
    team: "2인 팀 프로젝트 · FE 1 / BE 1",
    category: "Emergency Room Recommendation Web App",
    summary:
      "위치, 증상, 병상 상태를 결합해 더 빠르게 갈 수 있는 응급실을 탐색하는 서비스입니다. 프론트엔드에서는 3D 증상 선택, 지도 기반 탐색, 추천 결과 전달 경험을 담당했습니다.",
    features: [
      "Three.js 기반 3D 신체 부위 선택 UI",
      "위치 기반 응급실 탐색과 거리 계산",
      "추천 결과, 병상 상태, 상세 정보 시각화",
    ],
    contributions: [
      "3D 마네킹 렌더링과 Raycasting 기반 신체 부위 선택 인터랙션 구현",
      "GeoLocation과 거리 계산 로직을 이용한 추천 흐름 구성",
      "응급실 리스트, 상세 페이지, 병상 상태 시각화 UI 설계",
    ],
    stack: [
      "Vue 3",
      "JavaScript",
      "Axios",
      "Vite",
      "Tailwind CSS",
      "Vue Router",
      "Pinia",
      "Three.js",
      "PWA",
    ],
    images: [
      {
        src: "/projects/smart-er-ai.jpg",
        alt: "응급실 추천 서비스 AI 소개 화면",
      },
      {
        src: "/projects/smart-er-emergency.jpg",
        alt: "응급실 추천 서비스 대표 화면",
      },
    ],
  },
];

export function SectionProjects() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id);
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  return (
    <section id="projects" className="min-h-screen bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gray-400">
            Projects
          </p>
          <h1 className="text-4xl font-bold text-black md:text-5xl">
            Frontend Project
          </h1>
          <p className="max-w-2xl text-base leading-7 text-gray-600">
            프로젝트 목록에서 선택하면 FE 중심의 역할과 구현 포인트를 확인할 수
            있습니다.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[28px] border border-gray-200 bg-[#faf8f4] p-3">
            <div className="space-y-2">
              {projects.map((project) => {
                const isSelected = project.id === selectedProject.id;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                      isSelected
                        ? "border-black bg-white shadow-sm"
                        : "border-transparent bg-transparent hover:border-gray-200 hover:bg-white/70"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                      {project.period}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-black">
                      {project.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {project.category}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          <article className="rounded-[28px] border border-gray-200 bg-[#faf8f4] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium tracking-wide text-gray-500">
                    {selectedProject.period}
                  </p>
                  <div>
                    <h2 className="text-3xl font-bold text-black md:text-4xl">
                      {selectedProject.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      {selectedProject.team}
                    </p>
                    <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gray-400">
                      {selectedProject.category}
                    </p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
                    {selectedProject.summary}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-black">
                      핵심 기능
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                      {selectedProject.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-black">
                      FE 기여
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                      {selectedProject.contributions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedProject.note ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-500">
                    {selectedProject.note}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {selectedProject.images?.length ? (
                  selectedProject.images.map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={960}
                        height={720}
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                      FE Focus
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-black">
                      접근성 중심 인터페이스 설계
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      이력서와 프로젝트 문서 기준으로, 음성 중심 인터페이스와
                      접근성 설계 경험을 포트폴리오에 반영했습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
