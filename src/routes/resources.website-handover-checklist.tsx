import { createFileRoute } from "@tanstack/react-router";
import { ProjectGuidePage, projectGuideHead } from "@/components/project-guide-page";
import { projectGuides } from "@/lib/project-guides";

const guide = projectGuides.handover;

export const Route = createFileRoute("/resources/website-handover-checklist")({
  head: () => projectGuideHead(guide),
  component: () => <ProjectGuidePage guide={guide} />,
});
