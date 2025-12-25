export default function WorkExperienceSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Work Experience</h2>

      <div className="grid grid-cols-1 gap-8">
        {/* Berkeley */}
        <div
          id="berkeley"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                <img
                  src="/assets/About/berkeley.jpg"
                  alt="Berkeley Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <p className="text-sm mt-2 opacity-75">March 2025 - Present</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">Berkeley AI Research</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                AI/ML Research Intern
              </p>

              <p className="mt-3 text-sm/relaxed">
                Currently researching the use of a GPT-2-style causal transformer
                to learn control policies for various systems via sequence
                modeling. The model is trained on full system trajectories,
                learning to output the correct control action at each step given
                the history of states and actions. We employ methods such as
                in-context learning,{" "}
                <a
                  href="https://arxiv.org/pdf/2410.23916v1"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline">
                    DAgger
                </a>, and model-based control to improve the model's performance.
                <br />
                Lab: Ranade Research Lab (Prof. Gireeja Ranade)
                <br />
                Sitting Lab:{" "}
                <a
                  href="https://citris-uc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline"
                >
                  CITRIS and the Banatao Institute
                </a>{" "}
                (Prof. Claire Tomlin)                
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://people.eecs.berkeley.edu/~gireeja/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>Prof. Gireeja Ranade</span>
                </a>
                <a
                  href="https://www2.eecs.berkeley.edu/Faculty/Homepages/tomlin.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>Prof. Claire Tomlin</span>
                </a>
                <a 
                  href="/reading-list?filter=Berkeley+Research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>Reading List →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* AGANSWERS */}
        <div
          id="aganswers"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="inline-flex items-center justify-center w-16 h-16">
                <img
                  src="/assets/About/aganswers.jpg"
                  alt="AgAnswers Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm mt-2 opacity-75">May 2025 - Present</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">AgAnswers.ai</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                Founding Engineer
              </p>

              <p className="mt-3 text-sm/relaxed">
                AgAnswers.ai is a startup that provides AI-powered solutions for
                the agriculture industry. More later.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://aganswers.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>View Site →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* AIFARMS */}
        <div
          id="aifarms"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                <img
                  src="/assets/About/ncsa.png"
                  alt="NCSA Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <p className="text-sm mt-2 opacity-75">Nov 2024 - Present</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">AIFARMS and NCSA</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                AI/ML Research Intern
              </p>

              <p className="mt-3 text-sm/relaxed">
                Building agents for large scale agriculture:{" "}
                <a
                  href="https://aifarms.illinois.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline"
                >
                  aifarms.illinois.edu
                </a>{" "}
                <br />
                Building platform for agent building:{" "}
                <a
                  href="https://uiuc.chat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)] hover:underline"
                >
                  uiuc.chat
                </a>
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://vikram.cs.illinois.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>Prof. Vikram S. Adve</span>
                </a>

                <a
                  href="https://www.aidanandrews.info/projects/work/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>View Code →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* BRIGHTTECH */}
        <div
          id="brighttech"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                <img
                  src="/assets/About/bright.jpeg"
                  alt="Brighttech Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <p className="text-sm mt-2 opacity-75">May 2025 - Aug 2025</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">Brighttech AI</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                AI Engineer
              </p>

              <p className="mt-3 text-sm/relaxed">
                Building enterprise-grade AI systems (primarily agentic) for
                internal workflows at industry-leading organizations.
                <br />
                Examples:
                <br />
                - Research agent systems for pharma drug discovery workflows
                <br />
                - Customer acquisition agents leveraging proprietary data and
                tools for Fortune 500 companies
                <br />
                - Agent-powered sales platforms for personalized outreach
                optimization
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://brighttech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>View Site →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* AAXIOM */}
        <div
          id="aaxiom"
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="inline-flex items-center justify-center w-16 h-16">
                <img
                  src="/assets/About/AAXIOM-02.png"
                  alt="AAXIOM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm mt-2 opacity-75">Nov 2024 - Aug 2025</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">AAXIOM</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                Founder & Sole Developer
              </p>

              <p className="mt-3 text-sm/relaxed">
                AAXIOM is a parent company for a multitude of projects,
                including a clothing brand, 3 web apps, an ios app, and much
                much more...
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.aaxiom.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>View Site →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Startup */}
        <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[var(--color-primary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <p className="text-sm mt-2 opacity-75">May 2024 - Aug 2024</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">
                Startup{" "}
                <span className="text-sm font-normal opacity-75">
                  (signed an NDA)
                </span>
              </h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                Machine Learning Researcher/Engineer
              </p>

              <p className="mt-3 text-sm/relaxed">
                I developed advanced Natural Language Processing (NLP) systems,
                focusing on optimizing Retrieval-Augmented Generation (RAG) and
                enhancing intent classification. I designed and implemented a
                novel "wavular" RAG approach and a hybrid embedding-based
                classification system.
              </p>

              <div className="mt-4">
                <a
                  href="https://aidanandrews.info/blog/ml130824"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>Research Paper →</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other experiences as expandable section */}
        <div className="p-6 rounded-xl border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
          <details className="group">
            <summary className="cursor-pointer list-none flex justify-between items-center">
              <h3 className="text-xl font-semibold">Other Experiences</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <div className="mt-4 space-y-6 pl-4 border-l-2 border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
              {/* Dr. Andrews */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">
                  Dr. Andrews Plastic Surgery
                </h4>
                <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                  Machine Learning Researcher/Intern{" "}
                  <span className="opacity-75">• 2024 - Present</span>
                </p>
                <p className="text-sm/relaxed">
                  Researching machine learning models to predict the
                  effectiveness of procedures based off of a generalized score
                  given to patients. The model takes variables like age, gender,
                  resting heart rate, and a plethera of other medically derived
                  data, then uses previous patient data to predict
                  effectiveness, quantifying results as a normalized score.
                </p>
              </div>

              {/* Grainger */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">
                  The Grainger College of Engineering
                </h4>
                <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                  Project Manager & Course Assistant{" "}
                  <span className="opacity-75">• December 2023 - May 2024</span>
                </p>
                <p className="text-sm/relaxed">
                  Managing projects and assisting courses within the CS
                  department, focusing on enhancing the educational experiences
                  of undergraduate students through innovative approaches and
                  technologies.
                </p>
              </div>

              {/* NVRALONE */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">NVRALONE</h4>
                <p className="text-sm font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                  Founder & CEO{" "}
                  <span className="opacity-75">• 2023 - Present</span>
                </p>
                <p className="text-sm/relaxed">
                  Successfully led a clothing brand to $10,000 in profit per
                  month, raised money for suicide prevention, managed teams of
                  over 20 employees, orchestrated pop-up shops, and developed
                  the website including customer acquisition algorithms.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
