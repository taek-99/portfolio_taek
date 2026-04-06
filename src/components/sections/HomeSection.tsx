

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
            문제를 구조로 풀어내는<br />
            <span className="text-blue-600">프론트엔드 개발자</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            사용자 경험을 중심으로 설계하고,<br />
            복잡한 요구사항도 명확한 구조로 구현하는 것을 좋아합니다.
          </p>

          <ul className="space-y-2 text-gray-700">
            <li>• React / Next.js 기반 서비스 개발</li>
            <li>• 접근성과 UX를 고려한 인터페이스 설계</li>
            <li>• 음성(STT/TTS) 기반 인터랙션 경험</li>
            <li>• Three.js를 활용한 3D 인터랙션 경험</li>
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
          <div className="w-64 h-64 rounded-full bg-gray-200" />

          <p className="mt-4 text-3xl font-semibold tracking-wide">
            신건하 <span className="text-lg text-gray-500 tracking-wide">Taek-99</span>
          </p>

          <p className="text-lg text-gray-500 tracking-wide">
            I&apos;m trying to get better
          </p>
        </div>

      </div>
    </section>
  );
}
