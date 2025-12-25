import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export interface Research {
  id: string;
  title: string;
  graphic: string | null;
  description: string;
  link: string | null;
  githubLink: string | null;
  paper: string | null;
  tags: string[];
}

interface ResearchCardProps {
  research: Research;
  index?: number;
}

// List of research IDs that have dedicated pages
const RESEARCH_PAGES = ["g1"];

const ResearchCard = ({ research, index = 0 }: ResearchCardProps) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const isVideo = (url: string | null): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg|mov)$/i.test(url) || url.includes("video");
  };

  const getMediaUrl = (url: string | null): string | null => {
    if (!url) return null;
    if (url.includes("github.com") && url.includes("/blob/")) {
      // Convert GitHub blob URL to raw content URL
      // From: https://github.com/user/repo/blob/hash/path/file.gif
      // To: https://raw.githubusercontent.com/user/repo/hash/path/file.gif
      return url
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");
    }
    return url;
  };

  const mediaUrl = getMediaUrl(research.graphic);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]
                  hover:shadow-lg transition-all relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Graphic on the left */}
          {mediaUrl && (
            <div className="md:w-1/3 shrink-0">
              {isVideo(mediaUrl) ? (
                <video
                  loop
                  autoPlay
                  muted
                  playsInline
                  src={mediaUrl}
                  className="w-full max-h-[300px] object-contain rounded-lg"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt={research.title}
                  className="w-full max-h-[300px] object-contain rounded-lg"
                />
              )}
            </div>
          )}

          {/* Content on the right */}
          <div className={`flex-1 ${!mediaUrl ? "md:w-full" : ""}`}>
            {RESEARCH_PAGES.includes(research.id) ? (
              <Link
                to={`/research/${research.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-primary hover:underline transition-colors mb-3 block"
              >
                {research.title}
              </Link>
            ) : research.link ? (
              <a
                href={research.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="text-2xl font-bold text-primary hover:underline transition-colors mb-3 block"
              >
                {research.title}
              </a>
            ) : (
              <h3 className="text-2xl font-bold mb-3">{research.title}</h3>
            )}

            <p className="text-sm/relaxed mb-4">{research.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {research.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {research.githubLink && (
                <a
                  href={research.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                  aria-label={`View ${research.title} on GitHub`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}

              {research.paper && (
                <a
                  href={research.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                  aria-label={`Read ${research.title} paper`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Paper
                </a>
              )}

              {research.link && (
                <a
                  href={research.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                  aria-label={`Visit ${research.title} website`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResearchCard;

