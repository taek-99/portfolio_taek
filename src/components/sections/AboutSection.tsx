import { TechItem } from "../TechStackIcon";

export function SectionAbout() {
  return (
    <section
      id="about"
      className="min-h-screen bg-white flex items-center"
    >
      <div className="max-w-5xl mx-auto px-6 w-full space-y-10">

        <h1 className="text-4xl font-bold">About Me!</h1>

        <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-1">

          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">
              Languages
            </h3>
            <div className="flex flex-wrap gap-6">
              {[
                { src: "/techstack/JavaScript.svg", name: "JavaScript" },
                { src: "/techstack/TypeScript.svg", name: "TypeScript" },
                { src: "/techstack/Python.svg", name: "Python" },
              ].map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">
              Frameworks
            </h3>
            <div className="flex flex-wrap gap-6">
              {[
                { src: "/techstack/NextJS.svg", name: "Next.js" },
                { src: "/techstack/Vue.svg", name: "Vue" },
                { src: "/techstack/Django.svg", name: "Django" },
                { src: "/techstack/TailwindCSS.svg", name: "Tailwind CSS" },
              ].map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">
              Libraries
            </h3>
            <div className="flex flex-wrap gap-6">
              {[
                { src: "/techstack/React.svg", name: "React" },
                { src: "/techstack/ThreeJS.svg", name: "Three.js" },
              ].map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </div>

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

        <div>
          <h2 className="text-2xl font-semibold mb-4">Awards</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>SSAFY 14기 특화 프로젝트 서울 7반 1위</li>
            <li>2017 전국 기능경기대회 1위</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Licence</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>OPIC (IL)</li>
            <li>컴퓨터활용능력 1급</li>
            <li>전자기기 기능사</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="text-gray-600">
              Samsung Software AI Academy For Youth (SSAFY)
            </li>
            <li className="text-gray-600">
              충북반도체고등학교 반도체 전공
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
