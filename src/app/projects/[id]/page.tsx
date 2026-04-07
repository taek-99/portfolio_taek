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

  return <ProjectShowcase project={project} />;
}
