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

const FEATURED_METADATA: Record<
  string,
  Pick<DisplayBook, "imageUrl" | "description">
> = {
  Outliers: {
    imageUrl: "/assets/Book/book1.jpg",
    description:
      "Exploring what it means to be successful in a world that rewards hard work and luck. Gladwell discusses the factors that contribute to a high-level of success. Gladwell proposes that personal achievements are not solely caused by an individual traits such as hard-work and intelligence. Rather, success is often molded by external factors such as family, culture, and idiosyncratic opportunities that individuals encounter by chance. One thing that stuck with me from this book was the 10,000 hour rule, Gladwell claims that to achieve world-class expertise in any field an individual must spend around 10,000 hours on their skills. However, he also mentions that external factors such as timing, culture, upbringing, and even birthdates significantly affect an individuals success potential.",
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

  if (
    a.rating_100 !== null &&
    b.rating_100 !== null &&
    a.rating_100 !== b.rating_100
  ) {
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
    const books = [...filteredBooks]
      .sort(
        selectedCategory === "scripture"
          ? (a, b) => a.id - b.id
          : compareBooks,
      )
      .map(toDisplayBook);

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
