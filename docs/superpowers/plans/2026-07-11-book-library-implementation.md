# Book Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded bookshelf with the backend book library JSON, with scripture pinned as an unrated top category and all other books sorted by rating.

**Architecture:** The backend content repo owns `content/book_library.json`. The frontend fetches that JSON, validates its high-level shape, transforms it through a pure tested helper, and renders sectioned display data in `Bookshelf.tsx`. URL and cover enrichment is stored in the JSON as `url` and `image_url` fields so the frontend does not need title-specific lookup logic for every book.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Node 26 built-in test runner with `--experimental-strip-types`, GitHub raw content hosting.

## Global Constraints

- Canonical library path: `backend/content/book_library.json`.
- Frontend fetch URL: `https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/book_library.json`.
- Scripture appears in its own top section and displays no numeric rating.
- Non-scripture rated books sort by `rating_100` descending.
- Non-scripture unrated books sort after rated books.
- Rating ties preserve `id` order.
- Preserve existing local covers and descriptions for `Outliers`, `Mathematics for Machine Learning`, and `The Power of Habit`.
- Do not revert unrelated user edits, including the existing modified `frontend/src/components/tldr.tsx`.

---

## File Structure

- `backend/content/book_library.json`: canonical enriched book library.
- `frontend/book_library.json`: provided input artifact; leave it untouched unless the user explicitly asks to remove it.
- `frontend/src/lib/bookLibrary.ts`: pure types and transformation helpers for fetched book library data.
- `frontend/src/lib/bookLibrary.test.ts`: Node test-runner coverage for transformation behavior.
- `frontend/src/pages/Bookshelf.tsx`: fetches backend JSON and renders transformed sections.
- `frontend/package.json`: adds a focused `test:book-library` script using Node's built-in runner.

---

### Task 1: Add Pure Book Library Transformation

**Files:**
- Create: `frontend/src/lib/bookLibrary.test.ts`
- Create: `frontend/src/lib/bookLibrary.ts`
- Modify: `frontend/package.json`

**Interfaces:**
- Produces:
  - `BOOK_LIBRARY_URL: string`
  - `RawBook` type with `id`, `title`, `authors`, `category`, `reading_status`, `status_as_of`, `rating_100`, `rating_basis`, `notes`, `url`, and `image_url`.
  - `DisplayBook` type for rendering.
  - `BookSection` type with `category`, `title`, and `books`.
  - `getBookCategories(library: BookLibrary): string[]`
  - `getBookSections(library: BookLibrary, selectedCategory?: string): BookSection[]`

- [ ] **Step 1: Write the failing transformation tests**

Create `frontend/src/lib/bookLibrary.test.ts`:

```ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getBookCategories,
  getBookSections,
  type BookLibrary,
} from "./bookLibrary.ts";

const library: BookLibrary = {
  schema_version: "1.0",
  library_as_of: "2026-07-11",
  rating_scale: { minimum: 0, maximum: 100 },
  summary: { active_titles: 6, removed_titles: 0 },
  reading_status_definitions: {},
  books: [
    {
      id: 1,
      title: "Scripture Rated In Source",
      authors: [],
      category: "scripture",
      reading_status: "currently_reading",
      status_as_of: "2026-07-11",
      rating_100: 100,
      rating_basis: "overall",
      notes: "Should render unrated.",
      url: "https://example.com/scripture",
      image_url: "https://example.com/scripture.jpg",
    },
    {
      id: 4,
      title: "Rated Lower",
      authors: ["Author B"],
      category: "book",
      reading_status: "read",
      status_as_of: null,
      rating_100: 70,
      rating_basis: "overall",
      notes: null,
      url: null,
      image_url: null,
    },
    {
      id: 2,
      title: "Rated Higher",
      authors: ["Author A"],
      category: "book",
      reading_status: "read",
      status_as_of: null,
      rating_100: 90,
      rating_basis: "overall",
      notes: null,
      url: "https://example.com/higher",
      image_url: "https://example.com/higher.jpg",
    },
    {
      id: 3,
      title: "Rated Tie First",
      authors: ["Author C"],
      category: "textbook",
      reading_status: "read",
      status_as_of: null,
      rating_100: 80,
      rating_basis: "textbook",
      notes: null,
      url: null,
      image_url: null,
    },
    {
      id: 5,
      title: "Rated Tie Second",
      authors: ["Author D"],
      category: "book",
      reading_status: "read",
      status_as_of: null,
      rating_100: 80,
      rating_basis: "overall",
      notes: null,
      url: null,
      image_url: null,
    },
    {
      id: 6,
      title: "Unrated Non Scripture",
      authors: ["Author E"],
      category: "book",
      reading_status: "unread",
      status_as_of: null,
      rating_100: null,
      rating_basis: null,
      notes: null,
      url: null,
      image_url: null,
    },
  ],
};

describe("book library transformations", () => {
  it("separates scripture into an unrated top section", () => {
    const sections = getBookSections(library);

    assert.equal(sections[0]?.category, "scripture");
    assert.equal(sections[0]?.title, "Scripture");
    assert.equal(sections[0]?.books[0]?.title, "Scripture Rated In Source");
    assert.equal(sections[0]?.books[0]?.displayRating, null);
  });

  it("sorts rated non-scripture books by rating and leaves unrated books last", () => {
    const sections = getBookSections(library);
    const titles = sections[1]?.books.map((book) => book.title);

    assert.deepEqual(titles, [
      "Rated Higher",
      "Rated Tie First",
      "Rated Tie Second",
      "Rated Lower",
      "Unrated Non Scripture",
    ]);
  });

  it("filters to scripture only when scripture is selected", () => {
    const sections = getBookSections(library, "scripture");

    assert.equal(sections.length, 1);
    assert.equal(sections[0]?.category, "scripture");
    assert.equal(sections[0]?.books.length, 1);
  });

  it("filters non-scripture categories without adding an empty scripture section", () => {
    const sections = getBookSections(library, "textbook");

    assert.equal(sections.length, 1);
    assert.equal(sections[0]?.category, "textbook");
    assert.deepEqual(
      sections[0]?.books.map((book) => book.title),
      ["Rated Tie First"],
    );
  });

  it("applies legacy featured metadata to matching titles", () => {
    const featuredLibrary: BookLibrary = {
      ...library,
      books: [
        {
          id: 10,
          title: "Outliers",
          authors: ["Malcolm Gladwell"],
          category: "book",
          reading_status: "read",
          status_as_of: null,
          rating_100: 90,
          rating_basis: "overall",
          notes: null,
          url: null,
          image_url: null,
        },
      ],
    };

    const sections = getBookSections(featuredLibrary);
    const book = sections[0]?.books[0];

    assert.equal(book?.imageUrl, "/assets/Book/book1.jpg");
    assert.match(book?.description ?? "", /10,000 hour rule/);
  });

  it("returns sorted category labels", () => {
    assert.deepEqual(getBookCategories(library), ["book", "scripture", "textbook"]);
  });
});
```

- [ ] **Step 2: Add the test script**

Modify `frontend/package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test:book-library": "node --experimental-strip-types --test src/lib/bookLibrary.test.ts"
  }
}
```

- [ ] **Step 3: Run the test and verify it fails**

Run from `frontend`:

```bash
pnpm run test:book-library
```

Expected: FAIL because `src/lib/bookLibrary.ts` does not exist.

- [ ] **Step 4: Implement the transformation helper**

Create `frontend/src/lib/bookLibrary.ts`:

```ts
export const BOOK_LIBRARY_URL =
  "https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/book_library.json";

export interface RawBook {
  id: number;
  title: string;
  authors: string[];
  category: string;
  reading_status: string;
  status_as_of: string | null;
  completed_reads?: number;
  rating_100: number | null;
  rating_basis: string | null;
  notes: string | null;
  url?: string | null;
  image_url?: string | null;
}

export interface BookLibrary {
  schema_version: string;
  library_as_of: string;
  rating_scale: {
    minimum: number;
    maximum: number;
  };
  summary: {
    active_titles: number;
    removed_titles: number;
  };
  reading_status_definitions: Record<string, string>;
  books: RawBook[];
}

export interface DisplayBook {
  id: number;
  title: string;
  authors: string;
  category: string;
  readingStatus: string;
  statusAsOf: string | null;
  rating: number | null;
  displayRating: number | null;
  ratingBasis: string | null;
  notes: string | null;
  url: string | null;
  imageUrl: string | null;
  description: string | null;
}

export interface BookSection {
  category: string;
  title: string;
  books: DisplayBook[];
}

const FEATURED_METADATA: Record<string, Pick<DisplayBook, "imageUrl" | "description">> = {
  Outliers: {
    imageUrl: "/assets/Book/book1.jpg",
    description:
      "Exploring what it means to be successful in a world that rewards hard work and luck. Gladwell discusses the factors that contribute to a high-level of success. Gladwell proposes that personal achievements are not solely caused by an individual traits such as hard-work and intelligence. Rather, success is often molded by external factors such as family, culture, and idiosyncratic opportunities that individuals encounter by chance. One thing that stuck with me from this book was the 10,000 hour rule, Gladwell claims that to achieve word-class expertise in any field an individual must spend around 10,000 hours on their skills. However, he also mentions that external factors such as timing, culture, upbringing, and even birthdates significantly affect an individuals success potential.",
  },
  "Mathematics for Machine Learning": {
    imageUrl: "/assets/Book/book2.jpg",
    description:
      "This textbook teaches complex mathematics with a hyperfocus on machine-learning. Usually the math taught in this book is dispersed between an array of classes, but this book teaches them in a succinct and concise manner so the reader is only introduced to topics specifically needed to understand machine-learning. Deisenroth introduces you to the fundamental mathematical tools needed to understand machine-learning; this includes linear algebra, analytic geometry, matrix decomposition, vector calc, optimization, probability and statistics.",
  },
  "The Power of Habit": {
    imageUrl: "/assets/Book/book3.jpg",
    description:
      "This book is one of those that you read and end up citing it hundreds of times a week in conversation. A lot of the practices of my life have been directly altered because I read this book. I would say other factors contributed to me altering the patterns of my life however, this book provided me with anecdotes and case studies that support my actions.",
  },
};

function formatCategory(category: string): string {
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function toDisplayBook(book: RawBook): DisplayBook {
  const featured = FEATURED_METADATA[book.title];
  const isScripture = book.category === "scripture";

  return {
    id: book.id,
    title: book.title,
    authors: book.authors.length > 0 ? book.authors.join(", ") : "Various",
    category: book.category,
    readingStatus: book.reading_status,
    statusAsOf: book.status_as_of,
    rating: book.rating_100,
    displayRating: isScripture ? null : book.rating_100,
    ratingBasis: book.rating_basis,
    notes: book.notes,
    url: book.url ?? null,
    imageUrl: featured?.imageUrl ?? book.image_url ?? null,
    description: featured?.description ?? null,
  };
}

function compareBooks(a: RawBook, b: RawBook): number {
  if (a.rating_100 === null && b.rating_100 !== null) return 1;
  if (a.rating_100 !== null && b.rating_100 === null) return -1;
  if (a.rating_100 !== null && b.rating_100 !== null && a.rating_100 !== b.rating_100) {
    return b.rating_100 - a.rating_100;
  }
  return a.id - b.id;
}

export function getBookCategories(library: BookLibrary): string[] {
  return Array.from(new Set(library.books.map((book) => book.category))).sort();
}

export function getBookSections(
  library: BookLibrary,
  selectedCategory = "",
): BookSection[] {
  const filteredBooks = selectedCategory
    ? library.books.filter((book) => book.category === selectedCategory)
    : library.books;

  if (selectedCategory) {
    const books = [...filteredBooks].sort(compareBooks).map(toDisplayBook);
    return books.length > 0
      ? [
          {
            category: selectedCategory,
            title: formatCategory(selectedCategory),
            books,
          },
        ]
      : [];
  }

  const scripture = filteredBooks
    .filter((book) => book.category === "scripture")
    .sort((a, b) => a.id - b.id)
    .map(toDisplayBook);

  const nonScripture = filteredBooks
    .filter((book) => book.category !== "scripture")
    .sort(compareBooks)
    .map(toDisplayBook);

  return [
    ...(scripture.length > 0
      ? [{ category: "scripture", title: "Scripture", books: scripture }]
      : []),
    ...(nonScripture.length > 0
      ? [{ category: "library", title: "Library", books: nonScripture }]
      : []),
  ];
}

export function isBookLibrary(value: unknown): value is BookLibrary {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as BookLibrary).books)
  );
}
```

- [ ] **Step 5: Run the test and verify it passes**

Run from `frontend`:

```bash
pnpm run test:book-library
```

Expected: PASS for all six tests.

- [ ] **Step 6: Commit Task 1**

```bash
git -C frontend add package.json src/lib/bookLibrary.ts src/lib/bookLibrary.test.ts
git -C frontend commit -m "Add book library transformation"
```

---

### Task 2: Move And Enrich Backend Content

**Files:**
- Create: `backend/content/book_library.json`
- Read: `frontend/book_library.json`

**Interfaces:**
- Consumes: the provided `frontend/book_library.json` input artifact.
- Produces: enriched backend JSON with the same top-level schema plus optional per-book `url` and `image_url` fields.

- [ ] **Step 1: Copy the provided library to backend content**

Run from `/Users/aidan/Documents/Code/Portfolio`:

```bash
cp frontend/book_library.json backend/content/book_library.json
```

- [ ] **Step 2: Enrich every active book**

For each object in `backend/content/book_library.json.books`, add:

```json
{
  "url": "https://...",
  "image_url": "https://..."
}
```

Use these rules:

- `url` should point to a stable book information, publisher, Open Library, Google Books, Project Gutenberg, Bible Gateway, or official product page.
- `image_url` should point to a stable cover image URL.
- If a trustworthy cover cannot be found, use `null` for `image_url` rather than guessing.
- Preserve all existing fields and values.
- Keep scripture unrated; do not change scripture `rating_100` values in this task because the frontend suppresses scripture ratings.
- Do not add removed inventory titles to `books`.

- [ ] **Step 3: Validate the enriched JSON**

Run:

```bash
jq empty backend/content/book_library.json
jq '[.books[] | select(has("url") | not or has("image_url") | not)] | length' backend/content/book_library.json
```

Expected:

```text
0
```

for the second command.

- [ ] **Step 4: Commit Task 2**

```bash
git -C backend add content/book_library.json
git -C backend commit -m "Add enriched book library content"
```

---

### Task 3: Wire Bookshelf To Backend JSON

**Files:**
- Modify: `frontend/src/pages/Bookshelf.tsx`

**Interfaces:**
- Consumes:
  - `BOOK_LIBRARY_URL`
  - `getBookCategories(library, selectedCategory?)`
  - `getBookSections(library, selectedCategory?)`
  - `isBookLibrary(value)`
- Produces: `/bookshelf` UI backed by fetched JSON.

- [ ] **Step 1: Replace the hardcoded `books` array with fetched state**

Update imports at the top of `frontend/src/pages/Bookshelf.tsx`:

```ts
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import {
  BOOK_LIBRARY_URL,
  getBookCategories,
  getBookSections,
  isBookLibrary,
  type BookLibrary,
} from "../lib/bookLibrary";
```

Remove the local `Book` interface and `const books: Book[] = [...]`.

Inside `Bookshelf`, add fetch state:

```ts
const [library, setLibrary] = useState<BookLibrary | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

Add the fetch effect:

```ts
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
        throw new Error("Book library response did not include a books array.");
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
```

- [ ] **Step 2: Use transformed categories and sections**

Replace category and filtering memo blocks with:

```ts
const categories = useMemo(() => {
  if (!library) return [];
  return getBookCategories(library);
}, [library]);

const sections = useMemo(() => {
  if (!library) return [];
  return getBookSections(library, selectedCategory);
}, [library, selectedCategory]);
```

- [ ] **Step 3: Add loading and error branches**

Before the main return:

```tsx
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
```

- [ ] **Step 4: Render sections instead of one flat grid**

Replace the existing grid mapping with:

```tsx
{sections.length === 0 ? (
  <div className="text-center py-10">
    <p>No books found{selectedCategory ? ` in "${selectedCategory}"` : ""}.</p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-lg border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-colors"
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
                    <h3 className="text-xl font-semibold text-balance">{book.title}</h3>
                    <p className="text-sm text-[color-mix(in_oklch,var(--color-primary)_70%,transparent)]">
                      {book.authors}
                    </p>
                    <p className="text-xs mt-1">{book.category}</p>
                  </div>
                </div>
                {typeof book.displayRating === "number" && (
                  <div className="text-sm font-medium text-[var(--color-primary)] shrink-0">
                    {book.displayRating}/100
                  </div>
                )}
              </div>

              {book.description && (
                <blockquote className="my-4 text-sm italic">
                  "{book.description}"
                </blockquote>
              )}

              {book.notes && <p className="my-4 text-sm">{book.notes}</p>}

              <div className="flex justify-between items-center mt-4 text-sm gap-4">
                <span className="capitalize">
                  {book.readingStatus.replaceAll("_", " ")}
                </span>
                {book.url && (
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    View Book →
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    ))}
  </div>
)}
```

- [ ] **Step 5: Run verification**

Run from `frontend`:

```bash
pnpm run test:book-library
pnpm run build
```

Expected: both commands pass.

- [ ] **Step 6: Commit Task 3**

```bash
git -C frontend add src/pages/Bookshelf.tsx
git -C frontend commit -m "Use backend book library on bookshelf"
```

---

### Task 4: Final Verification

**Files:**
- Read only unless verification exposes a defect.

**Interfaces:**
- Consumes all previous task outputs.
- Produces verified local behavior.

- [ ] **Step 1: Check worktree status in both repos**

```bash
git -C frontend status --short
git -C backend status --short
```

Expected: only known user changes remain, or no changes.

- [ ] **Step 2: Run focused and full frontend checks**

```bash
pnpm -C frontend run test:book-library
pnpm -C frontend run lint
pnpm -C frontend run build
```

Expected: all pass.

- [ ] **Step 3: Inspect content JSON**

```bash
jq '.books | length' backend/content/book_library.json
jq '[.books[] | select(.category == "scripture")] | length' backend/content/book_library.json
jq '[.books[] | select(has("url") | not or has("image_url") | not)] | length' backend/content/book_library.json
```

Expected:

```text
69
3
0
```

- [ ] **Step 4: Summarize final state**

Report:

- frontend commits made
- backend commits made
- verification commands and results
- any remaining user-owned dirty files, especially `frontend/src/components/tldr.tsx`
