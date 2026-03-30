import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";

interface ReadingListItem {
  id: string;
  title: string;
  url: string;
  tags: string[];
  dateAdded: string;
}

export default function ReadingList() {
  const reduceMotion = useReducedMotion();
  const [papers, setPapers] = useState<ReadingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchParams] = useSearchParams();

  // Initialize selected tag from URL parameters
  useEffect(() => {
    const tagFromUrl = searchParams.get("filter") || "";
    setSelectedTag(tagFromUrl);
  }, [searchParams]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/reading_list.json",
    )
      .then((res) => res.json())
      .then((data) => {
        try {
          // Sort papers by date added, newest first
          const sortedPapers = data.sort(
            (a: ReadingListItem, b: ReadingListItem) => {
              try {
                return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
              } catch (err) {
                console.error("Error sorting paper dates:", err);
                return 0;
              }
            },
          );
          setPapers(sortedPapers);
        } catch (err) {
          console.error("Error processing reading list data:", err);
          setPapers([]);
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching reading list:", error);
        setError("Failed to load reading list. Please try again later.");
        setLoading(false);
      });
  }, []);

  const availableTags = useMemo(() => {
    try {
      const tags = new Set<string>();
      papers.forEach((paper) => {
        try {
          if (paper.tags && Array.isArray(paper.tags) && paper.tags.length > 0) {
            paper.tags.forEach((tag) => {
              if (tag && typeof tag === "string") {
                tags.add(tag);
              }
            });
          }
        } catch (err) {
          console.error("Error processing tags for paper:", paper.id, err);
        }
      });
      return Array.from(tags).sort();
    } catch (err) {
      console.error("Error generating available tags:", err);
      return [];
    }
  }, [papers]);

  const filteredPapers = useMemo(() => {
    try {
      return papers.filter((paper) => {
        const matchesTag =
          !selectedTag ||
          (paper.tags &&
            Array.isArray(paper.tags) &&
            paper.tags.includes(selectedTag));

        return matchesTag;
      });
    } catch (err) {
      console.error("Error filtering papers:", err);
      return papers;
    }
  }, [papers, selectedTag]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex justify-center items-center min-h-[50vh] opacity-80"
      >
        Loading reading list…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
      className="max-w-3xl mx-auto space-y-8 w-full min-w-0"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-balance">
          Reading List
        </h1>
        <div className="flex flex-wrap gap-3">
          {availableTags.length > 0 && (
            <FilterDropdown
              options={availableTags}
              selectedOption={selectedTag}
              onSelect={setSelectedTag}
              label="Tag"
              paramName="filter"
            />
          )}
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="text-center py-10">
          <p>
            No papers found
            {selectedTag ? ` with tag "${selectedTag}"` : ""}.
          </p>
          {selectedTag && (
            <button
              type="button"
              onClick={() => setSelectedTag("")}
              className="mt-4 min-h-11 px-4 py-2 text-sm rounded-lg bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] transition-colors duration-200"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : index * 0.06,
              }}
              className="p-6 rounded-lg border border-transparent hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-[border-color,box-shadow] duration-200 hover:shadow-sm"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:text-[var(--color-primary)] transition-colors group"
                  >
                    {paper.title}
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </a>
                  <div className="text-sm text-[color-mix(in_oklch,var(--color-primary)_60%,transparent)] shrink-0">
                    Added: {new Date(paper.dateAdded).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] text-[color-mix(in_oklch,var(--color-primary)_80%,transparent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
