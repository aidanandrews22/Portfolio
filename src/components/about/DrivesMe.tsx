export function WhatDrivesMe() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">What Drives Me</h2>

      <div className="relative">
        {/* Quote block */}
        <div className="pl-6 border-l-4 border-[var(--color-primary)] py-1">
          <p className="text-xl italic font-light">
            "I approach every challenge with a dedication to positive impact,
            safety, and a deep respect for the nuance of research."
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - text */}
          <div className="space-y-4">
            <p className="leading-relaxed">
              This mindset has guided me through developing various apps that
              help people solve real world issues, building ML systems that
              support tens of thousands of users, and creating a clothing brand
              focused on mental health awareness.
            </p>

            <p className="leading-relaxed">
              I'm constantly working toward my long-term goals of advancing my
              education, expanding my research capabilities, and creating
              technology that makes a meaningful difference. I believe in the
              transformative potential of AI when developed responsibly, and I'm
              committed to being part of that positive transformation.
            </p>
          </div>

          {/* Right column - image */}
          <div className="relative rounded-xl overflow-hidden">
            {/* Placeholder for a personal image - perhaps working on a project */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
            <img
              src="/assets/header.jpeg"
              alt="Aidan working on a project"
              className="w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.classList.add(
                  "bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]",
                );
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoDrivesMe() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Who Drives Me</h2>

      <div className="relative">
        {/* Quote block */}
        <div className="pl-6 border-l-4 border-[var(--color-primary)] py-1">
          <p className="text-xl italic font-light">
            "Family is not an important thing. It's everything."
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - text */}
          <div className="space-y-4">
            <p className="leading-relaxed">
              My family has always been my foundation - their belief in me and
              unwavering support drives me to become the best version of myself.
            </p>

            <p className="leading-relaxed">
              Beyond that, I'm motivated by a simple yet powerful desire: to
              improve the lives of those around me. Every app I build, research
              paper I contribute to, or problem I solve is fueled by this core
              mission; I genuinely believe that using my skills to create
              meaningful solutions isn't just fulfilling — it's my
              responsibility.
            </p>
          </div>

          {/* Right column - image */}
          <div className="relative rounded-xl overflow-hidden">
            {/* Placeholder for a personal image - perhaps working on a project */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
            <img
              src="/assets/About/drive.jpg"
              alt="Aidan working on a project"
              className="w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.classList.add(
                  "bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]",
                );
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
