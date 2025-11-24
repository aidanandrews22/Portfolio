export default function TechnicalExpertiseSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Technical Expertise</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column - Primary skills */}
        <div className="col-span-2 p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all">
          <h3 className="text-xl font-semibold mb-4">Core Skills</h3>

          <div className="space-y-6">
            {/* Machine Learning */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Machine Learning & AI</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                  Advanced
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "CNNs",
                  "Transformers",
                  "RAG",
                  "LLMs",
                  "Computer Vision",
                  "NLP",
                  "PyTorch",
                  "TensorFlow",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Software Development */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Software Development</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                  Advanced
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "JavaScript/TypeScript",
                  "React",
                  "Node.js",
                  "SQL",
                  "Git",
                  "Docker",
                  "System Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Physics & Math */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Physics & Mathematics</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                  Advanced
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Quantum Mechanics",
                  "Statistical Mechanics",
                  "Linear Algebra",
                  "Calculus",
                  "Differential Equations",
                  "Data Analysis",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Progress bars for languages */}
        <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]">
          <h3 className="text-xl font-semibold mb-4">Languages</h3>

          <div className="space-y-6">
            {/* Python */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Python</span>
                <span className="text-xs">95%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>

            {/* JavaScript/TypeScript */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">C++</span>
                <span className="text-xs">90%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>

            {/* C++ */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">TypeScript</span>
                <span className="text-xs">85%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            {/* Java */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Rust</span>
                <span className="text-xs">60%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            {/* SQL */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Java</span>
                <span className="text-xs">50%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
