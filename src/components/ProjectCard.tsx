import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  compact?: boolean;
}

const cardTransition =
  "transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none";

const ProjectCard = ({
  project,
  index = 0,
  compact = false,
}: ProjectCardProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.1,
      }}
      className="group h-full relative flex flex-col"
    >
      <div
        className={`relative flex flex-col h-full p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]
                  hover:shadow-lg ${cardTransition} overflow-hidden`}
      >
        <Link
          to={`/projects/${project.id}`}
          className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          aria-label={`View project: ${project.title}`}
        />

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] to-transparent rounded-bl-full opacity-50 pointer-events-none z-[1]" />

        <div className="relative z-[1] flex flex-col flex-1 min-h-0 pointer-events-none">
          <h3 className="text-xl font-bold group-hover:text-[var(--color-primary)] transition-colors duration-200 mb-2">
            {project.title}
          </h3>

          <p
            className={`text-sm/relaxed mb-4 ${compact ? "line-clamp-3" : "line-clamp-2"}`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-auto pointer-events-auto relative z-10">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1"
                aria-label={`View ${project.title} on GitHub`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}

            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1"
                aria-label={`View ${project.title} live demo`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}

            <span className="text-sm text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto inline-flex items-center gap-1 pointer-events-none">
              View Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
