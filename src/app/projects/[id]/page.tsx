import { notFound } from "next/navigation";
import { ProjectShowcase } from "../../../components/projects/ProjectShowcase";
import { getProjectById, projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.95) 0 1px, transparent 1.5px), radial-gradient(circle at 76% 14%, rgba(255,255,255,0.82) 0 1px, transparent 1.6px), radial-gradient(circle at 62% 68%, rgba(255,255,255,0.88) 0 1.2px, transparent 1.8px), radial-gradient(circle at 28% 78%, rgba(255,255,255,0.78) 0 1px, transparent 1.5px), radial-gradient(circle at 86% 62%, rgba(148,163,184,0.95) 0 1px, transparent 1.6px), radial-gradient(circle at 42% 38%, rgba(255,255,255,0.85) 0 1px, transparent 1.6px), radial-gradient(circle at 10% 58%, rgba(255,255,255,0.9) 0 1px, transparent 1.5px)",
          backgroundColor: "#030712",
          backgroundSize:
            "360px 360px, 420px 420px, 400px 400px, 480px 480px, 430px 430px, 390px 390px, 520px 520px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.08),transparent_28%)]"
      />

      <div className="relative z-10">
        <ProjectShowcase project={project} />
      </div>
    </div>
  );
}
