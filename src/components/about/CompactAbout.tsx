import { useState } from "react";
import { Project as ProjectType } from "../ProjectCard";

interface CompactAboutProps {
  projects: ProjectType[];
  loading: boolean;
  error: string | null;
  profileData?: {
    name: string;
    email: string;
    bio: string[];
    links: { label: string; url: string }[];
    video?: string;
  };
}

export default function CompactAbout({
  projects,
  loading,
  error,
  profileData = {
    name: "Aidan Andrews",
    email: "aidana4 at illinois dot edu",
    bio: [
      "I'm a fourth year undergraduate Physics student at University of Illinois Urbana-Champaign.",
      "I like building AI systems that solve real-world problems.",
    ],
    links: [
      { label: "Twitter", url: "https://twitter.com/aidanandrews22" },
      { label: "GitHub", url: "https://github.com/aidanandrews22" },
      { label: "LinkedIn", url: "https://linkedin.com/in/aidanandrews22" },
    ],
  },
}: CompactAboutProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Video Section (if available) */}
      {profileData.video && (
        <div style={{ marginBottom: "3rem" }}>
          <video
            loop
            autoPlay
            muted
            src={profileData.video}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {/* Projects Section */}
      <div id="projects" style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Projects
        </h1>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div
              className="animate-spin"
              style={{
                width: "3rem",
                height: "3rem",
                border: "2px solid var(--color-primary)",
                borderTopColor: "transparent",
                borderRadius: "50%",
                margin: "0 auto",
              }}
            />
          </div>
        ) : error ? (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
            }}
          >
            Error: {error}
          </div>
        ) : (
          <>
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  marginBottom: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => (window.location.href = `/projects/${project.id}`)}
              >
                <a
                  href={`/projects/${project.id}`}
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                  className="hover:underline"
                >
                  {project.title}
                </a>
                <p style={{ marginBottom: "0.75rem", lineHeight: "1.6" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem" }}>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "var(--color-primary)", textDecoration: "none" }}
                      className="hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "var(--color-primary)", textDecoration: "none" }}
                      className="hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}

            {projects.length > 3 && (
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--color-primary)",
                  backgroundColor: "transparent",
                  color: "var(--color-primary)",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
                className="hover:bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
              >
                {showAllProjects ? "Show Less" : "View All Projects"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

