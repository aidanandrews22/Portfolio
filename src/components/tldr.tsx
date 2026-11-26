import type { ReactNode } from "react";
import { Link } from "react-router-dom";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.closest("details")?.setAttribute("open", "");
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "center",
  });
}

const linkClass =
  "text-[var(--color-primary)] hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

function Jump({ to, children }: { to: string; children: ReactNode }) {
  return (
    <a
      href={`#${to}`}
      className={linkClass}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(to);
      }}
    >
      {children}
    </a>
  );
}

function Internal({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={linkClass}>
      {children}
    </Link>
  );
}

const accomplishments: { year: string; item: ReactNode }[] = [
  {
    year: "2025–now",
    item: (
      <>
        Co-founder & CTO,{" "}
        <External href="https://aganswers.ai">AgAnswers</External>
      </>
    ),
  },
  { year: "2026–now", item: <>Solo AI and robotics research</> },
  {
    year: "2023–26",
    item: (
      <>
        <Jump to="education">BS Physics in 3 years, highest honors</Jump> (CS &
        math minors)
      </>
    ),
  },
  {
    year: "2026",
    item: (
      <>
        <External href="https://landuyt.illinois.edu/news/82729">
          Illinois Innovation Award
        </External>{" "}
        (sole recipient)
      </>
    ),
  },
  {
    year: "2025–26",
    item: (
      <>
        AI research, <Jump to="berkeley">Berkeley (BAIR)</Jump>; IEEE CDC paper
        (accepted)
      </>
    ),
  },
  {
    year: "2024–26",
    item: (
      <>
        Research at <Jump to="aifarms">UIUC</Jump>: AI agents,{" "}
        <Internal to="/research/g1">humanoid robotics</Internal> (Unitree G1)
      </>
    ),
  },
  {
    year: "2024–26",
    item: (
      <>
        14k+{" "}
        <External href="https://www.youtube.com/@aidanandrews">YouTube</External>{" "}
        subscribers, 1.7M+ views, 1k+ Discord
      </>
    ),
  },
  {
    year: "2023–25",
    item: (
      <>
        Founded <External href="https://voxed.ai">voxed.ai</External>{" "}
        (acqui-hired),{" "}
        <External href="https://www.illiniplan.com">IlliniPlan</External> (1k+
        users), <Jump to="nvralone">NVRALONE</Jump> ($10K a month)
      </>
    ),
  },
  {
    year: "2024–25",
    item: <>NYC Marathon, 2000-rated chess (OTB), D1 ACHA hockey</>,
  },
];

export default function TLDR() {
  return (
    <div className="p-6 max-w-xl mx-auto min-w-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pretty">TL;DR</h2>
      <ul className="space-y-1.5 text-sm sm:text-base leading-relaxed text-pretty">
        {accomplishments.map(({ year, item }, index) => (
          <li key={index} className="flex items-baseline gap-3">
            <span className="w-[4.5rem] shrink-0 whitespace-nowrap text-center rounded-full border border-current px-1.5 text-[11px] leading-5 tabular-nums opacity-45">
              {year}
            </span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
