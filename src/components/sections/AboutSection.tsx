import Image from "next/image";
import { TechItem } from "../TechStackIcon"

export function SectionAbout() {
  return (
    <section
      id="about"
      className="min-h-screen bg-white flex items-center"
    >
      <div className="max-w-5xl mx-auto px-6 w-full space-y-10">

        {/* SECTION TITLE */}
        <h1 className="text-4xl font-bold">About Me!</h1>

        {/* TECH STACK */}
        <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-1">
        
        {/* LANGUAGES */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Languages
          </h3>
          <div className="flex flex-wrap gap-6">
            {[
              { src: "/techstack/JavaScript.svg", name: "JavaScript" },
              { src: "/techstack/typescript.svg", name: "TypeScript" },
              { src: "/techstack/Python.svg", name: "Python" },
            ].map((tech) => (
              <TechItem key={tech.name} {...tech} />
            ))}
          </div>
        </div>

        {/* FRAMEWORKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Frameworks
          </h3>
          <div className="flex flex-wrap gap-6">
            {[
              { src: "/techstack/Nextjs.svg", name: "Next.js" },
              { src: "/techstack/Vue.svg", name: "Vue" },
              { src: "/techstack/django.svg", name: "Django" },
              { src: "/techstack/Tailwindcss.svg", name: "Tailwind CSS" },
            ].map((tech) => (
              <TechItem key={tech.name} {...tech} />
            ))}
          </div>
        </div>

        {/* LIBRARIES */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Libraries
          </h3>
          <div className="flex flex-wrap gap-6">
            {[
              { src: "/techstack/react.svg", name: "React" },
              { src: "/techstack/ThreeJS.svg", name: "Three.js" },
            ].map((tech) => (
              <TechItem key={tech.name} {...tech} />
            ))}
          </div>
        </div>

        {/* INFRA & ETC */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Infra & ETC
          </h3>
          <div className="flex flex-wrap gap-6">
            {[
              { src: "/techstack/Docker.svg", name: "Docker" },
              { src: "/techstack/AWS-Dark.svg", name: "AWS" },
              { src: "/techstack/Figma.svg", name: "Figma" },
            ].map((tech) => (
              <TechItem key={tech.name} {...tech} />
            ))}
          </div>
        </div>

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
            <li>OPIC (IM3)</li>
            <li>정보처리기사</li>
            <li>컴활 1급</li>
          </ul>
        </div>

        {/* EDUCATION */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <ul className="list-disc list-inside text-gray-600">
          <li className="text-gray-600">
            Samsung Software AI Academy For Youth (SSAFY)
          </li>
          {/* <li className="text-gray-600">
            서울 과학기술 대학교 (융합기계공학과)
          </li> */}
          </ul>
        </div>

      </div>
    </section>
  );
}
