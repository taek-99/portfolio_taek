import { withBasePath } from "../lib/site";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  iconSrc: string;
  iconAlt: string;
  period: string;
  team: string;
  category: string;
  summary: string;
  oneLiner: string;
  outcome: string;
  accentClass: string;
  panelClass: string;
  features: string[];
  contributions: string[];
  stack: string[];
  images?: ProjectImage[];
  links?: ProjectLink[];
  note?: string;
};

export const projects: Project[] = [
  {
    id: "hairddae",
    name: "헤어때",
    iconSrc: withBasePath("/projectslogo/hairddae_logo.png"),
    iconAlt: "헤어때 로고",
    period: "2026.03.03 - 2026.04.03",
    team: "5인 프로젝트 · FE 2 / BE 1 / AI 2",
    category: "AI Hair Styling Web App",
    summary:
      "헤어 스타일 탐색부터 실시간 가상 피팅, 결과 저장, 디자이너 상담 연결까지 이어지는 흐름을 설계한 프로젝트입니다. 프론트엔드에서는 인증 진입 구조, 세션 유지, WebRTC 기반 카메라 체험 UX를 중심으로 구현했습니다.",
    oneLiner: "AI 헤어 시뮬레이션 경험을 서비스 흐름으로 묶은 프로젝트",
    outcome: "인증 진입부터 카메라 체험, 결과 확인, 상담 연결까지 하나의 끊기지 않는 여정으로 정리했습니다.",
    accentClass: "from-rose-100 via-orange-50 to-white",
    panelClass: "bg-[linear-gradient(135deg,#fff7ed_0%,#fffbeb_45%,#ffffff_100%)]",
    features: [
      "실시간 가상 헤어 피팅 카메라 화면",
      "캡처, 다운로드, AI 보정 연결",
      "디자이너 탐색과 상담 요청 흐름",
    ],
    contributions: [
      "TanStack Router 기반 인증 분기와 보호 라우트 구성",
      "401 응답 처리와 refresh token 세션 유지 로직 구현",
      "카메라 체험부터 상담 연결까지 이어지는 FE 흐름 설계",
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
        src: withBasePath("/projects/hairddae-main.png"),
        alt: "헤어때 메인 화면",
      },
      {
        src: withBasePath("/projects/hairddae-camera.png"),
        alt: "헤어때 카메라 화면",
      },
    ],
  },
  {
    id: "see-sun",
    name: "See:Sun",
    iconSrc: withBasePath("/projectslogo/See_Sun_logo.png"),
    iconAlt: "See:Sun 로고",
    period: "2026.01.05 - 2026.01.28",
    team: "4인 프로젝트 · FE 2 / BE 2",
    category: "Accessibility Voice Interface Service",
    summary:
      "시각 약자와 고령 사용자를 위한 음성 중심 인터페이스 서비스입니다. 화면 요소를 단순화하고 STT, TTS 기반 상호작용이 자연스럽게 이어지도록 FE 구조를 정리했습니다.",
    oneLiner: "접근성과 안내 흐름을 음성 인터페이스 중심으로 재설계한 서비스",
    outcome: "시각 정보 의존도를 낮추고, 명령 처리와 안내 흐름이 직관적으로 이어지도록 인터랙션 구조를 조정했습니다.",
    accentClass: "from-amber-100 via-yellow-50 to-white",
    panelClass: "bg-[linear-gradient(135deg,#eff6ff_0%,#ecfeff_50%,#ffffff_100%)]",
    features: [
      "음성 입력 기반 명령 처리",
      "TTS 안내와 탐색 보조 흐름",
      "시각적 부담을 줄인 단순 인터랙션",
    ],
    contributions: [
      "Web Speech API 기반 STT 입력 및 명령 라우팅 구현",
      "오인식과 예외 상황을 고려한 인터랙션 처리",
      "접근성 중심 UI 구조와 흐름 설계",
    ],
    stack: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "STT", "TTS"],
    note:
      "이 프로젝트는 문서와 회고 기준으로 정리했습니다. 포트폴리오에서는 FE 역할과 접근성 설계 관점을 중심으로 재구성했습니다.",
  },
  {
    id: "smart-er",
    name: "Smart 응급실 추천",
    iconSrc: withBasePath("/projectslogo/smart_er_logo.png"),
    iconAlt: "Smart 응급실 추천 로고",
    period: "2025.11.17 - 2025.12.26",
    team: "2인 프로젝트 · FE 1 / BE 1",
    category: "Emergency Room Recommendation Web App",
    summary:
      "위치, 증상, 병상 상태를 결합해 빠르게 갈 수 있는 응급실을 탐색하는 서비스입니다. 프론트엔드에서는 3D 신체 선택, 위치 기반 탐색, 추천 결과 전달 경험을 구현했습니다.",
    oneLiner: "응급 탐색 흐름을 빠르게 판단하도록 설계한 위치 기반 서비스",
    outcome: "3D 증상 입력부터 결과 비교와 병상 상태 확인까지 판단 시간을 줄이는 화면 흐름을 구성했습니다.",
    accentClass: "from-emerald-100 via-lime-50 to-white",
    panelClass: "bg-[linear-gradient(135deg,#ecfdf5_0%,#f0fdfa_50%,#ffffff_100%)]",
    features: [
      "Three.js 기반 3D 신체 부위 선택 UI",
      "위치 기반 응급실 탐색과 거리 계산",
      "추천 결과, 병상 상태, 상세 정보 시각화",
    ],
    contributions: [
      "Raycasting 기반 신체 부위 선택 인터랙션 구현",
      "GeoLocation과 거리 계산을 이용한 추천 흐름 구성",
      "리스트와 상세 페이지, 상태 UI 설계",
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
        src: withBasePath("/projects/smart-er-ai.jpg"),
        alt: "응급실 추천 서비스 AI 소개 화면",
      },
      {
        src: withBasePath("/projects/smart-er-emergency.jpg"),
        alt: "응급실 추천 서비스 대표 화면",
      },
    ],
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
