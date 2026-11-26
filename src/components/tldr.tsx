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

const pools: { label: string; text: ReactNode }[] = [
  {
    label: "Now",
    text: (
      <>
        Co-founder & CTO of{" "}
        <External href="https://aganswers.ai">AgAnswers</External>, doing solo
        AI and robotics research, playing competitive chess (2000 OTB) and
        tennis,{" "}
        <Internal to="/reading-list?filter=Berkeley+Research">reading</Internal>
        , and learning piano.
      </>
    ),
  },
  {
    label: "2023–26",
    text: (
      <>
        <Jump to="education">Graduated UIUC in 3 years</Jump> with highest
        honors in physics (CS & math minors), sole recipient of the 2026{" "}
        <External href="https://landuyt.illinois.edu/news/82729">
          Illinois Innovation Award
        </External>
        , <Jump to="work-experience">years of work experience</Jump> including AI
        research at <Jump to="berkeley">Berkeley (BAIR)</Jump> with a paper
        accepted to IEEE CDC, AI agents and{" "}
        <Internal to="/research/g1">humanoid robotics</Internal> research at{" "}
        <Jump to="aifarms">UIUC</Jump>, D1 ACHA hockey, the NYC Marathon,
        founding <External href="https://voxed.ai">voxed.ai</External>{" "}
        (acqui-hired),{" "}
        <External href="https://www.illiniplan.com">IlliniPlan</External> (1k+
        users) and <Jump to="nvralone">NVRALONE</Jump> ($10K a month), a
        14k-subscriber{" "}
        <External href="https://www.youtube.com/@aidanandrews">
          YouTube channel
        </External>{" "}
        (1.7M+ views), a 1k+ Discord, and many more{" "}
        <Jump to="projects">projects</Jump> and startups.
      </>
    ),
  },
];

export default function TLDR() {
  return (
    <div className="p-6 max-w-xl mx-auto min-w-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pretty">TL;DR</h2>
      <div className="space-y-4 text-sm sm:text-base leading-relaxed text-pretty">
        {pools.map(({ label, text }) => (
          <div key={label}>
            <span className="inline-block rounded-full border border-current px-2 text-[11px] leading-5 tabular-nums opacity-45">
              {label}
            </span>
            <p className="mt-1">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
