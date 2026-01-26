import Image from "next/image";

export function SectionAbout() {
  return (
    <section
      id="about"
      className="min-h-screen bg-white flex items-center"
    >
      <div className="max-w-5xl mx-auto px-6 w-full space-y-16">

        {/* SECTION TITLE */}
        <h1 className="text-4xl font-bold">About Me!</h1>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-6">
        {[
          { src: "/techstack/react.svg", name: "React" },
          { src: "/techstack/Vue.svg", name: "Vue" },
          { src: "/techstack/ThreeJS.svg", name: "ThreeJS" },
          { src: "/techstack/Nextjs.svg", name: "Next.js" },
          { src: "/techstack/typescript.svg", name: "TypeScript" },
          { src: "/techstack/JavaScript.svg", name: "JavaScript" },
          { src: "/techstack/Tailwindcss.svg", name: "Tailwind CSS" },
          { src: "/techstack/django.svg", name: "Django" },
          { src: "/techstack/Python.svg", name: "Python" },
        ].map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center gap-2"
          >
            <Image
              src={tech.src}
              alt={tech.name}
              width={48}
              height={48}
            />
            <span className="text-sm text-gray-600">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

        {/* EMPLOYMENT */}
        {/* <div>
          <h2 className="text-2xl font-semibold mb-4">Employment History</h2>
          <p className="text-gray-600">
            SSAFY Creator Team (Frontend / World-building)
          </p>
        </div> */}

        {/* AWARDS */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Awards</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>SSAFY Project Excellence Award</li>
            <li>2017 전국기능 경기대회 금상</li>
          </ul>
        </div>

        {/* CREDENTIAL */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Licence</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>OPIC (IH)</li>
            <li>정보처리기사</li>
            <li>컴활 1급</li>
          </ul>
        </div>

        {/* EDUCATION */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <li className="text-gray-600">
            Samsung Software AI Academy For Youth (SSAFY)
          </li>
          <li className="text-gray-600">
            서울 과학기술 대학교 (융합기계공학과)
          </li>
        </div>

      </div>
    </section>
  );
}
