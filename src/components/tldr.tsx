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

const jumpClass =
  "text-[var(--color-primary)] hover:underline cursor-pointer text-left bg-transparent border-0 p-0 font-inherit rounded-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]";

export default function TLDR() {
  return (
    <div className="p-6 max-w-xl mx-auto min-w-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pretty">
        TL;DR
      </h2>
      <p className="text-sm sm:text-base leading-relaxed text-pretty">
        Co-founder & CTO of{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("aganswers")}>
          AgAnswers
        </button>{" "}
        (
        <button type="button" className={jumpClass} onClick={() => scrollToSection("innovation-award")}>
          Illinois Innovation Award 2026
        </button>
        ), researching AI/ML, playing competitive chess and tennis,{" "}
        <Link
          to="/reading-list?filter=Berkeley+Research"
          className="text-[var(--color-primary)] hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        >
          reading
        </Link>
        , and learning piano — after{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("education")}>
          graduating UIUC in 3 years
        </button>{" "}
        with highest honors in physics (CS & math minors),{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("work-experience")}>
          years of work experience
        </button>{" "}
        including research at{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("aifarms")}>
          UIUC
        </button>{" "}
        and{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("berkeley")}>
          Berkeley (BAIR)
        </button>
        , D1 ACHA hockey,{" "}
        <a href="https://voxed.ai" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
          voxed.ai
        </a>{" "}
        (acquired), the NYC marathon, robotics,{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("nvralone")}>
          NVRALONE
        </button>
        , an 11k-subscriber{" "}
        <a href="https://www.youtube.com/@aidanandrews" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
          YouTube channel
        </a>
        , and many more{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("projects")}>
          projects
        </button>{" "}
        and startups.
      </p>
    </div>
  );
}
