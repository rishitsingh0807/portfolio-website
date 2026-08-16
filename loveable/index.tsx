import { createFileRoute } from "@tanstack/react-router";
import { SelectedProjects } from "@/components/SelectedProjects";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Selected Projects" },
      { name: "description", content: "A curated showcase of hardware and optics engineering projects." },
      { property: "og:title", content: "Selected Projects" },
      { property: "og:description", content: "A curated showcase of hardware and optics engineering projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-black">
      <SelectedProjects />
    </main>
  );
}
