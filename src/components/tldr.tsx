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
        <b>Currently I am...</b> <br /> studying
        {" "}
        <a
          onClick={() => scrollToSection("education")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          physics at UIUC
        </a>
        , researching
        {" "}
        <a
          onClick={() => scrollToSection("berkeley")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          AI/ML at UC Berkeley
        </a>
        , an AI Engineer at
        {" "}
        <a
          onClick={() => scrollToSection("aifarms")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          NCSA
        </a>
        , building
        {" "}
        <a
          onClick={() => scrollToSection("aganswers")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          AgAnswers.ai
        </a>
        ,
        {" "}
        <a
          className="text-adaptive"
        >
          researching robotics at UIUC
        </a>
        , and
        {" "}
        <a
          href="/reading-list?filter=Berkeley+Research"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
        >
          reading
        </a>
        <br /><b>Not so currently, I am...</b><br />
        {" "}
        <a
          // href="https://www.illinihockey.com/roster/aidan-andrews-m0o81et2"
          // target="_blank"
          // rel="noopener noreferrer"
          // className="text-[var(-µ-color-primary)] hover:underline"
        >
          playing hockey for UIUC d1
        </a>
        ,
        {" "}
        <a
          onClick={() => scrollToSection("aaxiom")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
         the founder of aaxiom.org
        </a>
        , and playing competitive chess (although I do currently play a lot of blitz)
      </p>
    </div>
  );
}
