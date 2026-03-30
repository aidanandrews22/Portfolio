import { Link } from "react-router-dom";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
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
        <b>Currently I am…</b> <br /> studying{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("education")}>
          physics at UIUC
        </button>
        , an AI Engineer at{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("aifarms")}>
          NCSA
        </button>
        , building{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("aganswers")}>
          AgAnswers.ai
        </button>
        , <span className="text-[color-mix(in_oklch,var(--color-text)_90%,transparent)]">researching robotics at UIUC</span>, playing competitive chess, and{" "}
        <Link
          to="/reading-list?filter=Berkeley+Research"
          className="text-[var(--color-primary)] hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        >
          reading
        </Link>
        <br />
        <b>Previously, I was…</b>
        <br />
        researching{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("berkeley")}>
          AI for robotics at UC Berkeley
        </button>
        ,{" "}
        <span className="text-[color-mix(in_oklch,var(--color-text)_85%,transparent)]">
          playing hockey for UIUC D1
        </span>
        ,{" "}
        <button type="button" className={jumpClass} onClick={() => scrollToSection("aaxiom")}>
          the founder of aaxiom.org
        </button>
        ,  running the nyc marathon (Nov 2025)
      </p>
    </div>
  );
}
