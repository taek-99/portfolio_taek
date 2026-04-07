"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import type { Project } from "../../data/projects";
import { getStackLogoSrc } from "../../data/stackLogos";
import { withBasePath } from "../../lib/site";

const troubleshootingByProjectId: Record<
  string,
  { title: string; summary: string; details: string[] }[]
> = {
  hairddae: [
    {
      title: "실시간 통신 성능 이슈",
      summary:
        "MediaPipe 랜드마크 좌표 전송 방식과 WebRTC 영상 스트림 방식을 모두 검토한 뒤, 추론 안정성이 유지되도록 고정 입력 조건으로 최적화했습니다.",
      details: [
        "초기에는 MediaPipe로 얼굴 랜드마크를 추출하고 WebSocket으로 좌표만 전달하는 방식을 시도했습니다.",
        "하지만 프레임 단위 누적 전송량이 50KB 이상으로 커지면서 통신이 불안정해졌고, 실시간 응답 속도를 유지하기 어려웠습니다.",
        "이후 WebRTC 기반 영상 스트림 구조로 전환했지만, 사용자별 네트워크 환경과 디바이스 성능 차이로 인해 FPS가 최대 5 수준까지 떨어지고 해상도도 일정하지 않게 저하되는 문제가 발생했습니다.",
        "입력 영상의 FPS를 13으로 고정하고, 해상도를 288x512로 통일하는 방식으로 최적화를 진행했습니다.",
        "그 결과 추론 서버가 고정된 조건에서 연산할 수 있게 되었고, 네트워크 사용량과 처리 부하도 함께 줄어들면서 보다 안정적인 실시간 통신 환경을 구축할 수 있었습니다.",
      ],
    },
    {
      title: "실시간 채팅 구현 방식 선정",
      summary:
        "채팅 기능은 초저지연 양방향 통신이 필수인 구조가 아니라고 판단하여, 구현 복잡도와 유지보수성을 고려해 폴링 방식을 선택했습니다.",
      details: [
        "후보로는 폴링, SSE, WebSocket 세 가지 방식을 검토했습니다.",
        "WebSocket은 실시간성이 뛰어나지만 금융 서비스나 게임처럼 초저지연 응답이 필수인 구조가 아니라고 판단했습니다.",
        "SSE 역시 서버에서 지속적으로 이벤트를 push하는 구조를 만들기에는 기능 요구사항 대비 다소 과한 선택이라고 보았습니다.",
        "결국 서비스 규모와 복잡도, 유지보수 편의성을 함께 고려해 안정적인 폴링 방식을 채택했습니다.",
        "이를 통해 구현 복잡도를 낮추면서도 사용자 입장에서는 충분히 자연스러운 채팅 경험을 제공할 수 있었습니다.",
      ],
    },
  ],
  "see-sun": [
    {
      title: "STT 트러블 슈팅 (폼 입력 UX 개선)",
      summary:
        "기존에는 녹음 후 생성된 webm 파일을 서버로 업로드하는 방식이었지만, 폼 입력 UX에 맞지 않아 발화 단위와 입력 문맥을 함께 처리하는 구조로 개선했습니다.",
      details: [
        "기존 STT는 녹음이 끝난 후 생성된 webm 파일을 서버로 업로드하는 방식이었습니다.",
        "구현은 단순했지만, 사용자 정보 입력과 같은 폼 기반 UX에서는 발화 시작과 종료 시점을 프론트엔드에서 정확히 파악하기 어려웠습니다.",
        "또한 무음 처리와 발화 종료 판정이 단순하여 짧은 발화나 끊어 말하는 상황에서 인식 안정성이 떨어지는 문제가 있었습니다.",
        "기존 구조는 '녹음 1회 -> 업로드 1회' 방식으로 동작했기 때문에 발화 단위 제어가 어렵고, 입력 문맥을 함께 전달하거나 결과를 구조화하기도 어려웠습니다.",
        "이를 해결하기 위해 '상시 녹음 + VAD 기반 발화 단위 처리 + 통합 STT API' 구조로 개선했습니다.",
        "MediaRecorder로 음성을 지속적으로 수집하고, AudioContext와 AnalyserNode를 활용해 음성 활동(VAD)을 감지하도록 구성했습니다.",
        "이후 발화 시작과 종료를 자동으로 판별하고, 발화 단위로 분리한 오디오 데이터와 입력 필드 정보(field)를 함께 서버로 전달했습니다.",
        "그 결과 STT가 단순 음성 인식을 넘어 폼 입력에 최적화된 구조로 개선되었고, 짧은 발화도 보다 안정적으로 인식되면서 전체 UX가 자연스러워졌습니다.",
      ],
    },
  ],
  "smart-er": [
    {
      title: "응급 상황 입력 UX 개선",
      summary:
        "텍스트 중심 입력 구조의 한계를 줄이기 위해 GUI 기반 3D 마네킹 인터페이스를 도입했고, 응급 상황에서도 더 빠르고 직관적인 입력이 가능하도록 개선했습니다.",
      details: [
        "기존 응급 상황 대응 과정에서는 사용자가 상처 부위와 증상을 직접 텍스트로 입력해야 했습니다.",
        "하지만 긴급한 상황에서는 사용자가 의료 용어를 정확히 알기 어렵고, 부위나 상태를 일관되게 표현하기도 쉽지 않았습니다.",
        "특히 상처 위치를 구체적으로 설명하기 어렵고, 증상을 정확히 구분하지 못하는 경우가 발생해 입력 과정이 번거롭고 시간 소요도 커지는 문제가 있었습니다.",
        "기존 방식은 텍스트 중심 입력 구조였기 때문에 사용자의 표현 능력에 의존했고, 입력 데이터가 비정형 형태로 수집되면서 필수 정보 누락 가능성도 높았습니다.",
        "이를 개선하기 위해 GUI 기반 3D 마네킹 인터페이스를 도입했습니다.",
        "사용자는 시각화된 인체 모델에서 상처 부위를 직접 선택할 수 있도록 했고, 텍스트 입력 없이도 핵심 정보를 전달할 수 있도록 구성했습니다.",
        "또한 증상 입력은 강제하지 않고 선택적으로 처리하여, 최소 입력만으로도 시스템이 정보를 활용할 수 있도록 구조를 설계했습니다.",
        "그 결과 상처 부위 입력 속도와 정확도가 향상되었고, 비전문 사용자도 직관적으로 사용할 수 있게 되면서 응급 상황 대응 속도와 실용성을 함께 개선할 수 있었습니다.",
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
      title: "1. 실시간 헤어 피팅 카메라 기능 구현",
      details: [
        "카메라 입력과 헤어 선택 상태를 연동하여 실시간 가상 피팅 화면을 구현했습니다.",
        "헤어 적용 중 상태 변화가 명확히 보이도록 모달과 UI 피드백을 구성했습니다.",
        "프레임 고정, 캡처, 다운로드 기능을 추가하여 실제 사용 가능한 체험 흐름을 완성했습니다.",
      ],
    },
    {
      title: "2. AI 보정 및 디자이너 연결 구현",
      details: [
        "캡처 결과물을 AI 보정 기능과 연결해 체험 결과의 완성도를 높였습니다.",
        "현재 위치 기반 디자이너 탐색 기능을 구현하여 상담으로 이어지는 흐름을 구성했습니다.",
        "디자이너 선택 후 채팅방 생성 및 상담 요청 기능까지 연결했습니다.",
      ],
    },
  ],
  "see-sun": [
    {
      title: "1. 음성 기반 사용자 인터랙션 구현",
      details: [
        "Web Speech API 기반 STT 기능을 활용하여 음성 입력을 처리했습니다.",
        "사용자 명령을 텍스트로 변환한 뒤 기능 트리거 로직을 구현했습니다.",
        "음성 입력 실패 및 인식 오류에 대한 예외 처리 UI를 구성했습니다.",
      ],
    },
    {
      title: "2. 접근성 중심 UI/UX 개선",
      details: [
        "시각 의존도를 낮춘 음성 중심 인터페이스를 설계했습니다.",
        "버튼 크기, 색상 대비, 인터랙션 단순화 등 접근성을 고려한 화면을 구성했습니다.",
        "사용자 행동 흐름을 최소화하는 방향으로 UX 구조를 개선했습니다.",
      ],
    },
  ],
  "smart-er": [
    {
      title: "1. 3D 기반 신체 부위 인터랙션 구현",
      details: [
        "Three.js를 활용하여 웹 환경에서 3D 마네킹 렌더링을 구현했습니다.",
        "glTF 모델을 로드하여 Scene에 배치하고 Camera, Light, Renderer를 구성했습니다.",
        "OrbitControls를 활용하여 사용자 시점 이동(회전, 줌, 패닝)을 지원했습니다.",
        "Raycasting을 활용하여 마우스 클릭 기반 3D 객체 선택 기능을 구현하고, 특정 신체 부위를 클릭하면 해당 부위 데이터와 매핑되도록 연결했습니다.",
        "Blender를 활용하여 3D 모델의 신체 부위를 분리하고 Mesh 단위로 라벨링하여 부위별 식별이 가능하도록 구조를 개선했습니다.",
        "선택된 부위에 대해 Highlight 처리와 상태 관리 로직을 구현하여 UI, 3D, 데이터 흐름이 자연스럽게 이어지도록 구성했습니다.",
      ],
    },
    {
      title: "2. 응급실 상세 페이지 및 병상 상태 시각화",
      details: [
        "병원별 병상 수(응급실, 입원실)와 운영 가능 진료과목 UI를 구현했습니다.",
        "병상 상태에 따라 색상과 뱃지로 가시성을 강화했습니다.",
        "인터랙티브 리스트와 지도 연동이 가능하도록 구조를 설계했습니다.",
      ],
    },
  ],
};

const mediaByProjectId: Record<
  string,
  {
    repository?: string;
    videoSrc?: string;
    heroImage?: { src: string; alt: string };
  }
> = {
  hairddae: {
    repository: "https://lab.ssafy.com/s14-ai-image-sub1/S14P21M101",
    videoSrc: withBasePath("/projects/헤어때 시연영상.mp4"),
    heroImage: {
      src: withBasePath("/projects/hairddae-overview.png"),
      alt: "헤어때 서비스 소개 화면",
    },
  },
  "see-sun": {
    repository: "https://github.com/SeeSun-YS-SSAFY/See-Sun/tree/dev",
    videoSrc: withBasePath("/projects/시선 시연영상.MP4"),
    heroImage: {
      src: withBasePath("/projects/ChatGPT Image 2026년 4월 7일 오후 03_35_14.png"),
      alt: "시선 서비스 소개 화면",
    },
  },
  "smart-er": {
    repository: "https://github.com/smart-er-match/frontend_ec2",
    videoSrc: withBasePath("/projects/응급실 시연영상.mp4"),
    heroImage: {
      src: withBasePath("/projects/화면 캡처 2026-04-07 162810.png"),
      alt: "Smart 응급실 추천 서비스 화면",
    },
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
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.12,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen px-4 py-8 text-white sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_30px_100px_rgba(2,6,23,0.4)] backdrop-blur sm:rounded-[40px] sm:p-6 md:p-8 lg:p-10">
        <div data-slide-header className="border-b border-white/10 pb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <span>&larr;</span>
            <span>뒤로가기</span>
          </Link>

          <div className="mt-5">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-4xl whitespace-pre-line text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              {project.summary}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          <div data-slide-panel className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            {media?.heroImage ? (
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80">
                <img
                  src={media.heroImage.src}
                  alt={media.heroImage.alt}
                  className="aspect-video w-full object-contain bg-slate-950"
                />
              </div>
            ) : null}

            <div className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 sm:rounded-[32px] sm:p-6">
              <p className="text-lg font-bold text-white md:text-xl">프로젝트 정보</p>
              <div className="mt-5 space-y-4">
                <div className="rounded-[22px] border border-white/10 bg-slate-950/70 px-4 py-3">
                  <p className="text-base font-bold uppercase tracking-[0.18em] text-white">기간</p>
                  <p className="mt-2 text-sm font-medium text-white">{project.period}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-slate-950/70 px-4 py-3">
                  <p className="text-base font-bold uppercase tracking-[0.18em] text-white">인원</p>
                  <p className="mt-2 whitespace-pre-line text-sm font-medium text-white">
                    {project.team}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {media?.videoSrc ? (
            <div
              data-slide-panel
              className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/80 sm:rounded-[32px]"
            >
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-lg font-bold text-white md:text-xl">시연 영상</p>
              </div>
              <div className="bg-slate-950 p-4 md:p-5">
                <video
                  controls
                  preload="metadata"
                  className="mx-auto aspect-video w-full max-w-4xl rounded-[20px] bg-black object-contain"
                  src={media.videoSrc}
                />
              </div>
            </div>
          ) : null}

          <div
            data-slide-panel
            className="rounded-[24px] border border-white/10 bg-slate-900/80 p-4 sm:rounded-[32px] sm:p-5 md:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg font-bold text-white md:text-xl">기술 스택</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
              {visibleStackItems.map((item) => {
                const logoSrc = getStackLogoSrc(item);

                return (
                  <div
                    key={item}
                    className="flex min-w-[86px] flex-1 basis-[86px] flex-col items-center justify-center rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.72)_100%)] p-2.5 text-center sm:min-w-[94px] sm:flex-none sm:basis-auto"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/10 bg-slate-950 shadow-sm">
                      <img src={logoSrc} alt={`${item} logo`} className="h-8 w-8 object-contain" />
                    </div>
                    <p className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-medium leading-4 text-white">
                      {item}
                    </p>
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
              className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 sm:rounded-[32px] sm:p-6"
            >
              <p className="text-lg font-bold text-white md:text-xl">기여 역할</p>
              <div className="mt-6 space-y-6">
                {contributionRoles.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4 sm:rounded-[24px] sm:p-5"
                  >
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
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
              className="rounded-[24px] border border-white/10 bg-slate-900/80 p-5 sm:rounded-[32px] sm:p-6"
            >
              <p className="text-lg font-bold text-white md:text-xl">트러블 슈팅</p>
              <div className="mt-6 space-y-6">
                {troubleshootingItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4 sm:rounded-[24px] sm:p-5"
                  >
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{item.title}</h3>
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
