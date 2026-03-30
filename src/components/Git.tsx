import React from "react";

interface GitHubChartProps {
  username?: string;
  color?: string;
  className?: string;
  alt?: string;
}

const GitHubChart: React.FC<GitHubChartProps> = ({
  username = "aidanandrews22",
  color = "15803d",
  className = "github-chart",
  alt = `${username}'s GitHub contribution chart`,
}) => {
  const baseUrl = "https://ghchart.rshah.org";
  const chartUrl = color
    ? `${baseUrl}/${color}/${username}`
    : `${baseUrl}/${username}`;
  const profileUrl = `https://github.com/${username}`;

  return (
    <div className="github-chart-container min-w-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 px-1">
        <div className="flex items-center gap-3 min-w-0">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color-mix(in_oklch,currentColor_80%,var(--color-primary))] hover:text-[var(--color-primary)] transition-colors duration-200 relative group flex items-center gap-2 min-h-11 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            title="GitHub"
          >
            <span className="sr-only">GitHub profile for {username}</span>
            <svg
              className="w-5 h-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span aria-hidden>{username}</span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left motion-reduce:transition-none" />
          </a>
        </div>

        <div
          className="flex items-center gap-2 text-xs text-[color-mix(in_oklch,var(--color-text)_55%,transparent)] shrink-0"
          aria-hidden
        >
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-[color-mix(in_oklch,var(--color-text)_12%,transparent)]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[color-mix(in_oklch,oklch(0.75_0.12_145)_70%,transparent)]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[color-mix(in_oklch,oklch(0.65_0.14_145)_85%,transparent)]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[color-mix(in_oklch,oklch(0.55_0.15_145)_90%,transparent)]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-[color-mix(in_oklch,oklch(0.45_0.12_145)_95%,transparent)]" />
          </div>
          <span>More</span>
        </div>
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center w-full rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        aria-label={`Open ${username} on GitHub — contribution chart`}
      >
        <img
          src={chartUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} w-full h-auto max-w-full`}
        />
      </a>
    </div>
  );
};

export default GitHubChart;
