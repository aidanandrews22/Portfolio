import { Link } from "react-router-dom";
import ProjectCard, { Project as ProjectType } from "../ProjectCard";

export default function ProjectsSection({
  projects,
  loading,
  error,
}: {
  projects: ProjectType[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Current Projects</h2>
        <Link
          to="/projects"
          className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-6">
        <div className="prose prose-adaptive prose-lg max-w-none">
          <p className="leading-relaxed">
            Building meaningful projects is how I translate my ideas into
            reality. Each project represents a problem I found worth solving or
            a question I wanted to explore. While I have many interests, these
            featured projects showcase my current focus on creating practical
            tools that help people learn, work, and research more effectively.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : error ? (
          <div className="p-6 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            <p>Error: {error}</p>
            <p className="mt-2 text-sm">
              Please try refreshing the page or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                compact={true}
              />
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <p className="text-sm opacity-80 italic">
            These projects are just a small sample of my work. I'm constantly
            building and experimenting with new ideas. Check out my GitHub for
            more or reach out if you'd like to collaborate!
          </p>
        </div>
      </div>
    </section>
  );
}
