import Image from "next/image";

export function SectionHome() {
  return (
    <section
      id="Home"
      className="min-h-screen bg-white flex items-center"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="flex flex-col justify-center space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            사용자 경험을 설계하는<br />
            <span className="text-blue-600">프론트엔드 개발자</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            단순히 화면을 만드는 것을 넘어,<br />
            사용자의 진입부터 행동까지 이어지는 서비스 흐름을 설계하고 구현합니다.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• UX 중심의 서비스 플로우 설계 및 구현</li>
            <li>• TanStack Router 기반 인증/보호 라우트 구성</li>
            <li>• refresh token을 활용한 끊김 없는 세션 유지 경험</li>
            <li>• WebRTC 기반 실시간 가상 피팅 인터랙션 구현</li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a
              href="#about"
              className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition"
            >
              About Me
            </a>

            <a
              href="#projects"
              className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition"
            >
              Project
            </a>

            <a
              href="#contact"
              className="inline-block px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition"
            >
              Contact
            </a>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gray-200">
            <Image
              src="/projects/image.png"
              alt="신건하 프로필 사진"
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className="mt-4 text-3xl font-semibold tracking-wide">
            신건하 <span className="text-lg text-gray-500 tracking-wide">Taek-99</span>
          </p>

          <p className="text-lg text-gray-500 tracking-wide">
            Designing flows that lead users to action
          </p>
        </div>

      </div>
    </section>
  );
}
