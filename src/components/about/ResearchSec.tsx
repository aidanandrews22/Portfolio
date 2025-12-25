import { Link } from "react-router-dom";
import ResearchCard, { type Research } from "../ResearchCard";

export default function ResearchSection({
  research,
  loading,
  error,
}: {
  research: Research[];
  loading: boolean;
  error: string | null;
}) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Research</h2>
        <Link
          to="/research"
          className="px-4 py-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] text-sm transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-6">
        <div className="prose prose-adaptive prose-lg max-w-none">
          <p className="leading-relaxed">
            My research focuses on applying machine learning and AI to solve
            real-world problems. I'm particularly interested in vision-language
            models, transformers, and building intelligent systems that enhance
            human capabilities.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : error ? (
          <div className="p-6 rounded-xl border border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            <p>Error: {error}</p>
            <p className="mt-2 text-sm">
              Please try refreshing the page or check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {research.map((item, index) => (
              <ResearchCard key={item.id} research={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

