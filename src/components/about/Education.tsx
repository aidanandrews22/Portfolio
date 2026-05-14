import type { ReactNode } from "react";
import {
  BarChart3,
  Calculator,
  ClipboardList,
  BrainCircuit,
  FlaskConical,
  GraduationCap,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";

const pillIconProps = {
  className: "h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]",
  strokeWidth: 2,
  "aria-hidden": true as const,
};

function AchievementPill({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
      {icon}
      {children}
    </span>
  );
}

const rowIconClass = "h-5 w-5 text-[var(--color-primary)] mt-0.5 shrink-0";
const rowIconStroke = 2;

export default function EducationSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Education</h2>

      <div
        id="education"
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-[border-color,box-shadow] duration-200 hover:shadow-lg"
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
            <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-[280px] md:max-w-none">
              <AchievementPill icon={<BarChart3 {...pillIconProps} />}>3.9 GPA</AchievementPill>
              <AchievementPill icon={<GraduationCap {...pillIconProps} />}>
                James Scholar
              </AchievementPill>
              <AchievementPill icon={<ClipboardList {...pillIconProps} />}>
                Dean&apos;s List
              </AchievementPill>
              <AchievementPill icon={<TrendingUp {...pillIconProps} />}>
                Top 5% of Class
              </AchievementPill>
              <AchievementPill icon={<Star {...pillIconProps} />}>Honors</AchievementPill>
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
                <ShieldCheck
                  className={rowIconClass}
                  strokeWidth={rowIconStroke}
                  aria-hidden
                />
                <div>
                  <p className="font-medium">Graduated in 3 Years</p>
                  <p className="text-sm opacity-75">
                    Came in with 0 credits, petitioned exemption from maximum credit hours every semester, traditional 4-year program.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BrainCircuit className={rowIconClass} strokeWidth={rowIconStroke} aria-hidden />
                  <p className="font-medium pt-0.5">Minor in Computer Science</p>
                </div>
                <div className="flex items-start gap-3">
                  <Calculator className={rowIconClass} strokeWidth={rowIconStroke} aria-hidden />
                  <p className="font-medium pt-0.5">Minor in Mathematics</p>
                </div>
                <div className="flex items-start gap-3">
                  <FlaskConical className={rowIconClass} strokeWidth={rowIconStroke} aria-hidden />
                  <div>
                    <p className="font-medium">Research Focus</p>
                    <p className="text-sm opacity-75">
                      Spent most of my time doing research in AI, machine learning, vision, and robotics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
