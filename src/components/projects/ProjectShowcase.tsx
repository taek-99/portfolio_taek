"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { Project } from "../../data/projects";
import { getStackBadgeLabel, getStackLogoSrc } from "../../data/stackLogos";
import { withBasePath } from "../../lib/site";

const troubleshootingByProjectId: Record<
  string,
  { title: string; summary: string; details: string[] }[]
> = {
  hairddae: [
    {
      title: "실시간 통신 성능 이슈",
      summary:
        "MediaPipe 랜드마크 좌표 전송 방식과 WebRTC 영상 스트림 방식을 모두 검토한 뒤, 추론 안정성이 유지되는 고정 입력 조건으로 최적화했습니다.",
      details: [
        "초기에는 MediaPipe로 얼굴 랜드마크를 추출하고 WebSocket으로 좌표만 전달하는 방식을 시도했습니다.",
        "하지만 프레임 단위 누적 전송량이 50KB 이상으로 커지면서 통신이 불안정해졌고, 실시간 응답 속도 유지가 어려웠습니다.",
        "이후 WebRTC 기반 영상 스트림 구조로 전환했지만, 사용자별 네트워크 환경과 디바이스 성능 차이로 FPS가 최대 5 수준까지 떨어지고 해상도 역시 일정하지 않게 저하되는 문제가 발생했습니다.",
        "입력 영상의 FPS를 13으로 고정하고, 해상도를 288×512로 통일하는 방식으로 최적화를 진행했습니다.",
        "그 결과 추론 서버가 고정된 조건에서 연산할 수 있게 되었고, 네트워크 사용량과 처리 부하도 함께 줄어들면서 보다 안정적인 실시간 통신 환경을 구축할 수 있었습니다.",
      ],
    },
    {
      title: "실시간 채팅 구현 방식 선정",
      summary:
        "채팅 기능은 초저지연 양방향 실시간성이 필수는 아니라고 판단해, 구현 복잡도와 유지보수성을 고려한 폴링 방식을 선택했습니다.",
      details: [
        "후보로는 폴링, SSE, WebSocket 세 가지 방식을 검토했습니다.",
        "WebSocket은 실시간성은 뛰어나지만, 금융 서비스나 게임처럼 초저지연 양방향 구조가 필수인 수준은 아니라고 판단했습니다.",
        "SSE 역시 서버에서 지속적으로 이벤트를 push하는 구조를 만들기에는 기능 요구사항 대비 다소 과한 선택이었습니다.",
        "결국 서비스 규모와 복잡도, 유지보수 편의성을 함께 고려해 안정적인 폴링 방식을 채택했습니다.",
        "구현 복잡도를 낮추면서도 사용자 입장에서는 충분히 자연스러운 채팅 경험을 제공할 수 있었습니다.",
      ],
    },
  ],
};

const contributionRolesByProjectId: Record<
  string,
  { title: string; details: string[] }[]
> = {
  hairddae: [
    {
      title: "1. 인증 및 사용자 진입 흐름 구현",
      details: [
        "TanStack Router 기반으로 인증/비인증 라우트를 분리하고 보호 라우트 구성",
        "로그인 후 메인 페이지로 자연스럽게 연결되도록 사용자 진입 흐름 설계",
        "API 401 응답 발생 시 refresh token 재발급을 시도하는 세션 유지 로직 구현",
      ],
    },
    {
      title: "2. 실시간 헤어 피팅 카메라 기능 구현",
      details: [
        "카메라 입력과 헤어 선택 상태를 연동해 실시간 가상 피팅 화면 구현",
        "헤어 적용 중 상태 변화가 명확히 보이도록 모달과 UI 피드백 구성",
        "프레임 고정, 캡처, 다운로드 기능을 추가해 실제 사용 가능한 체험 흐름 완성",
      ],
    },
    {
      title: "3. 후속 행동 유도를 위한 AI 보정 및 디자이너 연결 구현",
      details: [
        "캡처 결과물을 AI 보정 기능과 연결해 체험 결과의 완성도 향상",
        "현재 위치 기반 디자이너 탐색 기능을 구현해 상담으로 이어지는 흐름 구성",
        "디자이너 선택 후 채팅방 생성 및 상담 요청 기능까지 연결",
      ],
    },
  ],
};

const mediaByProjectId: Record<
  string,
  {
    references?: { label: string; href: string }[];
    videoSrc?: string;
    imageSrcs?: { src: string; alt: string }[];
  }
> = {
  hairddae: {
    references: [
      {
        label: "SSAFY Lab Repository",
        href: "https://lab.ssafy.com/s14-ai-image-sub1/S14P21M101",
      },
    ],
    videoSrc: withBasePath("/projects/헤어때 시연영상.mp4"),
    imageSrcs: [
      {
        src: withBasePath("/projects/hairddae-overview.png"),
        alt: "헤어때 서비스 소개 화면",
      },
    ],
  },
};

export function ProjectShowcase({ project }: { project: Project }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const troubleshootingItems = troubleshootingByProjectId[project.id] ?? [];
  const contributionRoles = contributionRolesByProjectId[project.id] ?? [];
  const media = mediaByProjectId[project.id];
  const visibleStackItems = project.stack.filter((item) => getStackLogoSrc(item));
  const textOnlyStackItems = project.stack.filter((item) => !getStackLogoSrc(item));

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
    <div ref={rootRef} className="min-h-screen px-6 py-10 text-white md:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col rounded-[40px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_100px_rgba(2,6,23,0.4)] backdrop-blur md:p-8 lg:p-10">
        <div
          data-slide-header
          className="mb-8 flex flex-col gap-6 border-b border-white/10 pb-6"
        >
          <div className="space-y-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <span>&larr;</span>
              <span>Back To Projects</span>
            </Link>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                {project.name}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-slate-900 px-4 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                  {project.period}
                </span>
                <span className="whitespace-pre-line rounded-[20px] border border-white/10 bg-slate-900 px-4 py-1 text-center text-xs uppercase tracking-[0.22em] text-slate-300">
                  {project.team}
                </span>
              </div>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
                {project.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="grid flex-1 gap-6">
          {media ? (
            <div
              data-slide-panel
              className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6"
            >
              <p className="text-lg font-bold text-white md:text-xl">
                산출물
              </p>

              {media.references?.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {media.references.map((reference) => (
                    <a
                      key={reference.href}
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:border-white/20 hover:text-sky-300"
                    >
                      <span>{reference.label}</span>
                      <span>&rarr;</span>
                    </a>
                  ))}
                </div>
              ) : null}

              {media.videoSrc ? (
                <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="h-full w-full"
                    src={media.videoSrc}
                  />
                </div>
              ) : null}

              {media.imageSrcs?.length ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {media.imageSrcs.map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-950"
                    >
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <div
            data-slide-panel
            className="rounded-[32px] border border-white/10 bg-slate-900/80 p-5 md:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-white md:text-xl">
                  기술 스택
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                {visibleStackItems.length} Items
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {visibleStackItems.map((item) => {
                const logoSrc = getStackLogoSrc(item);

                return (
                  <div
                    key={item}
                    className="rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.72)_100%)] p-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-slate-950 shadow-sm">
                      <img
                        src={logoSrc}
                        alt={`${item} logo`}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <p className="mt-3 text-xs font-medium text-white">{item}</p>
                  </div>
                );
              })}
            </div>

            {textOnlyStackItems.length > 0 ? (
              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {textOnlyStackItems.map((item) => (
                    <span key={item} className="text-[11px] text-slate-400">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {contributionRoles.length > 0 ? (
            <div
              data-slide-panel
              className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6"
            >
              <p className="text-lg font-bold text-white md:text-xl">
                기여 역할
              </p>
              <div className="mt-6 space-y-6">
                {contributionRoles.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-300" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {troubleshootingItems.length > 0 ? (
            <div
              data-slide-panel
              className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6"
            >
              <p className="text-lg font-bold text-white md:text-xl">
                트러블 슈팅
              </p>
              <div className="mt-6 space-y-6">
                {troubleshootingItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5"
                  >
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-300" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
