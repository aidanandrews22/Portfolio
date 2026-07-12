import { motion, useReducedMotion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import {
  BOOK_LIBRARY_URL,
  getBookCategories,
  getBookSections,
  isBookLibrary,
  type BookLibrary,
  type StatusTone,
} from "../lib/bookLibrary";

function formatCategory(category: string) {
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

const statusToneClasses: Record<StatusTone, string> = {
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  sky: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  amber: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
  slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
  stone: "bg-stone-500/10 text-stone-700 dark:text-stone-300",
};

export default function Bookshelf() {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams] = useSearchParams();
  const [library, setLibrary] = useState<BookLibrary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "";
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    fetch(BOOK_LIBRARY_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch book library: ${res.status}`);
        }

        return res.json();
      })
      .then((data: unknown) => {
        if (!isBookLibrary(data)) {
          throw new Error("Book library response did not include books.");
        }

        if (!cancelled) {
          setLibrary(data);
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching book library:", fetchError);
        if (!cancelled) {
          setError("Failed to load bookshelf. Please try again later.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    if (!library) return [];
    return getBookCategories(library);
  }, [library]);

  const sections = useMemo(() => {
    if (!library) return [];
    return getBookSections(library, selectedCategory);
  }, [library, selectedCategory]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex justify-center items-center min-h-[50vh] opacity-80"
      >
        Loading bookshelf...
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
      className="max-w-4xl mx-auto space-y-8 p-4"
    >
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">My Bookshelf</h1>
          {categories.length > 0 && (
            <FilterDropdown
              options={categories}
              selectedOption={selectedCategory}
              onSelect={setSelectedCategory}
              label="Category"
              paramName="category"
            />
          )}
        </div>
        <p className="text-lg">
          A curated collection of books that have shaped my thinking and
          learning journey.
        </p>
      </section>

      {sections.length === 0 ? (
        <div className="text-center py-10">
          <p>
            No books found
            {selectedCategory
              ? ` in "${formatCategory(selectedCategory)}"`
              : ""}
            .
          </p>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="mt-4 min-h-11 px-4 py-2 text-sm rounded-lg bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] transition-colors duration-200"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.category} className="space-y-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {section.books.map((book, index) => (
                  <motion.article
                    key={book.id}
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : index * 0.05,
                      duration: reduceMotion ? 0 : 0.35,
                    }}
                    className="p-6 rounded-lg border border-transparent hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <div className="flex gap-4 min-w-0">
                        {book.imageUrl && (
                          <img
                            src={book.imageUrl}
                            alt={`Cover of ${book.title}`}
                            className="w-16 h-20 object-cover rounded shrink-0"
                            loading="lazy"
                          />
                        )}
                        <div className="min-w-0">
                          <h3 className="text-xl font-semibold text-balance">
                            {book.url ? (
                              <a
                                href={book.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--color-primary)] transition-colors"
                              >
                                {book.title}
                              </a>
                            ) : (
                              book.title
                            )}
                          </h3>
                          {book.authors !== "Various" && (
                            <p className="text-sm text-[color-mix(in_oklch,var(--color-primary)_70%,transparent)]">
                              {book.authors}
                            </p>
                          )}
                          <p className="text-xs mt-1">
                            {formatCategory(book.category)}
                          </p>
                        </div>
                      </div>
                      {typeof book.displayRating === "number" && (
                        <div className="text-sm font-medium text-[var(--color-primary)] shrink-0">
                          {book.displayRating}/100
                        </div>
                      )}
                      {typeof book.displayRating !== "number" && book.category !== "scripture" && (
                        <div className="text-sm font-medium text-[var(--color-primary)] shrink-0">
                          not yet rated
                        </div>
                      )}
                    </div>

                    {/* {book.description && (
                      <blockquote className="my-4 text-sm italic">
                        "{book.description}"
                      </blockquote>
                    )} */}

                    {/* {book.notes && <p className="my-4 text-sm">{book.notes}</p>} */}

                    {/* {(book.statusLabel || book.url) && (
                      <div
                        className={`flex items-center mt-4 text-sm gap-4 ${
                          book.statusLabel ? "justify-between" : "justify-end"
                        }`}
                      >
                        {book.statusLabel && book.statusTone && (
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusToneClasses[book.statusTone]}`}
                          >
                            {book.statusLabel}
                          </span>
                        )}
                        {book.url && (
                          <a
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--color-primary)] transition-colors shrink-0"
                          >
                            View Book
                          </a>
                        )}
                      </div>
                    )} */}
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </motion.div>
  );
}
