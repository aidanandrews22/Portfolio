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

  it("keeps selected scripture unrated and ordered by id", () => {
    const scriptureLibrary: BookLibrary = {
      ...library,
      books: [
        {
          id: 3,
          title: "Second Scripture",
          authors: [],
          category: "scripture",
          reading_status: "not_specified",
          status_as_of: null,
          rating_100: 100,
          rating_basis: "withheld",
          notes: null,
          url: null,
          image_url: null,
        },
        {
          id: 1,
          title: "First Scripture",
          authors: [],
          category: "scripture",
          reading_status: "not_specified",
          status_as_of: null,
          rating_100: null,
          rating_basis: "unrated",
          notes: null,
          url: null,
          image_url: null,
        },
      ],
    };

    const sections = getBookSections(scriptureLibrary, "scripture");

    assert.deepEqual(
      sections[0]?.books.map((book) => [book.title, book.displayRating]),
      [
        ["First Scripture", null],
        ["Second Scripture", null],
      ],
    );
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

  it("applies legacy featured covers and descriptions to matching titles", () => {
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
        {
          id: 11,
          title: "Mathematics for Machine Learning",
          authors: ["Marc Peter Deisenroth"],
          category: "textbook",
          reading_status: "read",
          status_as_of: null,
          rating_100: 95,
          rating_basis: "overall",
          notes: null,
          url: null,
          image_url: null,
        },
        {
          id: 12,
          title: "The Power of Habit",
          authors: ["Charles Duhigg"],
          category: "book",
          reading_status: "read",
          status_as_of: null,
          rating_100: 89,
          rating_basis: "overall",
          notes: null,
          url: null,
          image_url: null,
        },
      ],
    };

    const sections = getBookSections(featuredLibrary);
    const booksByTitle = new Map(
      sections[0]?.books.map((book) => [book.title, book]) ?? [],
    );

    assert.equal(booksByTitle.get("Outliers")?.imageUrl, "/assets/Book/book1.jpg");
    assert.match(
      booksByTitle.get("Outliers")?.description ?? "",
      /word-class expertise/,
    );
    assert.equal(
      booksByTitle.get("Mathematics for Machine Learning")?.imageUrl,
      "/assets/Book/book2.jpg",
    );
    assert.match(
      booksByTitle.get("Mathematics for Machine Learning")?.description ?? "",
      /fundamental mathematical tools/,
    );
    assert.equal(
      booksByTitle.get("The Power of Habit")?.imageUrl,
      "/assets/Book/book3.jpg",
    );
    assert.match(
      booksByTitle.get("The Power of Habit")?.description ?? "",
      /citing it hundreds of times/,
    );
  });

  it("returns sorted category labels", () => {
    assert.deepEqual(getBookCategories(library), [
      "book",
      "scripture",
      "textbook",
    ]);
  });

  it("formats status labels and tones for display", () => {
    const statusLibrary: BookLibrary = {
      ...library,
      books: [
        {
          id: 1,
          title: "Second Read",
          authors: ["Author A"],
          category: "book",
          reading_status: "currently_rereading",
          completed_reads: 1,
          status_as_of: null,
          rating_100: 90,
          rating_basis: "overall",
          notes: null,
          url: null,
          image_url: null,
        },
        {
          id: 2,
          title: "Current First Read",
          authors: ["Author B"],
          category: "book",
          reading_status: "currently_reading",
          completed_reads: 0,
          status_as_of: null,
          rating_100: 80,
          rating_basis: "overall",
          notes: null,
          url: null,
          image_url: null,
        },
        {
          id: 3,
          title: "Unspecified",
          authors: ["Author C"],
          category: "book",
          reading_status: "not_specified",
          status_as_of: null,
          rating_100: 70,
          rating_basis: "overall",
          notes: null,
          url: null,
          image_url: null,
        },
      ],
    };

    const books = getBookSections(statusLibrary)[0]?.books ?? [];

    assert.deepEqual(
      books.map((book) => [book.title, book.statusLabel, book.statusTone]),
      [
        ["Second Read", "Reading for a second time", "violet"],
        ["Current First Read", "Currently reading", "sky"],
        ["Unspecified", null, null],
      ],
    );
  });
});
