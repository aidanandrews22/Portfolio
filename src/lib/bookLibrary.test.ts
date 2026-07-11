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
    assert.deepEqual(getBookCategories(library), [
      "book",
      "scripture",
      "textbook",
    ]);
  });
});
