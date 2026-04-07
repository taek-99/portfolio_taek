import Image from "next/image";
import { withBasePath } from "../../lib/site";

export function SectionHome() {
  return (
    <section id="Home" className="relative min-h-screen flex items-center py-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-3 md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex max-w-3xl flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            사용자 경험 흐름을 설계하는
            <br />
            <span className="text-sky-300">프론트엔드 개발자</span>
          </h1>

          <p className="text-lg leading-relaxed text-slate-300">
            단순히 화면을 만드는 데서 그치지 않고,
            <br />
            사용자의 진입부터 행동, 전환까지 이어지는 흐름을
            <br />
            설계하고 구현합니다.
          </p>

          <ul className="space-y-2 text-slate-200">
            <li>• 사용자 행동 흐름을 고려한 UX 중심 서비스 구조 설계 및 구현</li>
            <li>• WebRTC 기반 실시간 영상 처리로 지연 없는 인터랙션 경험 제공</li>
            <li>• Web Speech API를 활용한 음성 입력 기능으로 사용자 입력 편의성 향상</li>
            <li>• Three.js를 활용한 3D 인터랙션 구현으로 서비스 몰입도 강화</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border border-white/15 bg-slate-800/80">
            <Image
              src={withBasePath("/projects/image.png")}
              alt="신건하 프로필 사진"
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className="mt-4 text-3xl font-semibold tracking-wide text-white">
            신건하
            <span className="text-lg tracking-wide text-slate-400"> Taek-99</span>
          </p>

          <p className="text-lg tracking-wide text-slate-400">
            Designing flows that lead users to action
          </p>
        </div>
      </div>
    </section>
  );
}
