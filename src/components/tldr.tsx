export default function TLDR() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">TL;DR</h2>
      <p>
        Studying
        <a
          onClick={() => scrollToSection("education")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          {" "}
          physics at UIUC
        </a>
        , research
        <a
          onClick={() => scrollToSection("berkeley")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          {" "}
          AI/ML at UC Berkeley
        </a>
        ,
        <a
          onClick={() => scrollToSection("aifarms")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          {" "}
          AI/ML Engineer at AIFARMS and NCSA
        </a>
        , building
        <a
          onClick={() => scrollToSection("voxed")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          {" "}
          voxed.ai
        </a>
        ,
        <a
          href="https://www.illinihockey.com/roster/aidan-andrews-m0o81et2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
        >
          {" "}
          play hockey for UIUC d1
        </a>
        ,
        <a
          onClick={() => scrollToSection("aaxiom")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          {" "}
          founder of aaxiom.org
        </a>
        , and play competitive chess
      </p>
    </div>
  );
}
