interface PdfFile {
  name: string;
  label: string;
  lastUpdated: string;
  group: "transcript" | "other";
}
export default function AboutSection() {
  const pdfFiles: PdfFile[] = [
    {
      name: "Aidan_Andrews_Official_Transcript.pdf",
      label: "Official-Transcript",
      lastUpdated: "2024-12-25",
      group: "transcript",
    },
    {
      name: "Aidan_Andrews_Unofficial_Transcript.pdf",
      label: "Unofficial-Transcript",
      lastUpdated: "2025-01-06",
      group: "transcript",
    },
    {
      name: "Aidan_Andrews_Resume.pdf",
      label: "Resume",
      lastUpdated: "2025-01-06",
      group: "other",
    },
    {
      name: "cover-letter.pdf",
      label: "Cover Letter",
      lastUpdated: "2024-10-08",
      group: "other",
    },
  ];

  return (
    <section className="relative">
      {/* Documents quick links */}
      <div className="mt-8 mb-8 pb-6 border-b border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
        <h3 className="text-lg font-semibold mb-4">Important Documents</h3>
        <div className="flex flex-wrap gap-3">
          {pdfFiles.map((pdf) => (
            <a
              key={pdf.name}
              href={`https://aidanandrews22.github.io/content/pdf/${pdf.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] transition-colors"
            >
              {pdf.label}
            </a>
          ))}
        </div>
      </div>
      {/* Hero section with background */}
      <div className="relative mb-12 rounded-2xl overflow-hidden">
        <div className="">
          <img
            src="/assets/About/call.jpg"
            alt="Aidan Andrews"
            className="w-full h-full object-cover dark:brightness-75"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Overlay with intro text - adjusted to start from top-left */}
        <div className="absolute inset-0 flex flex-col justify-start items-start py-4 px-4 md:px-12 bg-gradient-to-r from-[color-mix(in_oklch,black_25%,transparent)] to-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white custom-outline">
            Aidan Andrews
          </h1>
          <div className="flex flex-row space-x-2">
            <p className="text-xl md:text-2xl opacity-90 font-light text-orange-400 custom-outline">
              Student.
            </p>
            <p className="text-xl md:text-2xl opacity-90 font-light text-blue-400 custom-outline">
              Researcher.
            </p>
            <p className="text-xl md:text-2xl opacity-90 font-light text-white custom-outline">
              Builder.
            </p>
          </div>
        </div>
      </div>

      {/* Personal introduction */}
      <div className="space-y-6">
        <div className="prose prose-adaptive prose-lg max-w-none">
          <p className="text-xl leading-relaxed">
            I'm passionate about solving difficult, thought-provoking problems
            at the intersection of machine learning, computer vision, and their
            applications to fields like physics, bio, and every day life.
          </p>

          <p className="text-lg leading-relaxed">
            At my core, I believe in trying my absolute hardest in every facet
            of life. This philosophy extends to my academic pursuits,
            entrepreneurial ventures, athletic endeavors, and personal projects.
            I'm constantly seeking to learn and grow — not for personal
            accolades, but because I genuinely believe that becoming the best
            version of myself allows me to better serve those around me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
            <h3 className="text-xl font-semibold mb-3">Tech Expertise</h3>
            <p className="text-sm/relaxed">
              Full-stack development, machine learning algorithms, computer
              vision systems, and LLM applications for practical solutions.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
            <h3 className="text-xl font-semibold mb-3">Athletics</h3>
            <p className="text-sm/relaxed">
              I play D1 hockey for the University of Illinois, tennis
              semi-competitively, and run occasionally (training for nyc
              marathon in Nov).
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]">
            <h3 className="text-xl font-semibold mb-3">In my free time</h3>
            <p className="text-sm/relaxed">
              I am an avid chess player. Currently working toward becoming a
              titled master (most realistically, a CM). Also, occassionally a
              hackathon winner.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://www.youtube.com/@aidanandrews/streams"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_25%,transparent)] transition-colors text-[var(--color-primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            Watch me work on Youtube
          </a>
        </div>
      </div>
    </section>
  );
}
