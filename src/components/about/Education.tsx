export default function EducationSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Education</h2>

      <div
        id="education"
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Logo/Icon */}
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              {/* Logo placeholder */}
              <img
                src="/assets/About/uiuc-logo.png"
                alt="UIUC Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  // Add a fallback text element
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const text = document.createElement("div");
                    text.className =
                      "absolute inset-0 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)]";
                    text.textContent = "UIUC";
                    parent.appendChild(text);
                  }
                }}
              />
            </div>
            <div className="mt-4 text-center">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                3.9 GPA
              </span>
            </div>
          </div>

          {/* Right side - Details */}
          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
              University of Illinois Urbana-Champaign
            </h3>
            <p className="text-lg font-semibold mt-1">
              B.S. in Physics, The Grainger College of Engineering
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Accelerated Program</p>
                  <p className="text-sm opacity-75">
                    On track to graduate in 3 years instead of the traditional
                    4-year program.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Research Focus</p>
                  <p className="text-sm opacity-75">
                    Emphasis on machine learning applications in physics and
                    computational methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
