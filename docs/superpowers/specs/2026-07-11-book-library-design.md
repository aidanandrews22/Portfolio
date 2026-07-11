# Book Library Backend Content Design

Date: 2026-07-11

## Goal

Update the portfolio bookshelf so it uses the provided JSON book library as backend content instead of a hardcoded React array. The bookshelf should rank rated books by the new 0-100 ratings while treating scripture as a separate unrated category shown first.

## Current State

- `frontend/src/pages/Bookshelf.tsx` contains a hardcoded `books` array and renders it directly.
- `frontend/book_library.json` contains the new source library with metadata, status fields, categories, ratings, and removed-title metadata.
- Other portfolio pages fetch JSON content from `https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/...`.
- The backend content repo is available at `backend/content`.

## Data Ownership

The canonical book library will live at:

```text
backend/content/book_library.json
```

The frontend should fetch this file from:

```text
https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/main/content/book_library.json
```

`frontend/book_library.json` is treated as the provided input artifact, not the long-term source of truth.

## Display Rules

The bookshelf page will derive display sections from `library.books`.

1. Scripture titles appear in a dedicated `Scripture` section at the top.
2. Scripture is displayed without numeric ratings, even when `rating_100` exists.
3. Non-scripture titles appear after scripture.
4. Non-scripture titles with `rating_100` sort by rating descending.
5. Non-scripture titles without `rating_100` sort after rated titles.
6. Ties preserve the library order by `id`.
7. Removed titles from `removed_from_active_inventory` are not displayed as active books.

## Category Filtering

The existing category filter remains. Categories come from active books in the JSON.

When no category is selected, the page shows scripture first, then the rest of the library in rating order. When a category is selected, the page shows only that category. Selecting scripture shows the scripture section by itself.

## Legacy Featured Metadata

The current bookshelf has local covers and personal descriptions for:

- `Outliers`
- `Mathematics for Machine Learning`
- `The Power of Habit`

The implementation should preserve those covers and descriptions by enriching matching JSON titles in the frontend. The JSON library remains the canonical content for title, authors, category, status, notes, and ratings.

## Loading And Error Handling

The bookshelf page should follow the same client-side loading pattern used by the reading list:

- Show a loading state while fetching.
- Show a user-visible error if fetching or parsing fails.
- Avoid rendering an empty page if malformed data is returned.

## Testing

Add focused tests for the pure book-library transformation logic before changing production behavior:

- Scripture is separated and unrated.
- Rated non-scripture books sort by `rating_100` descending.
- Unrated non-scripture books sort after rated books.
- Rating ties preserve `id` order.
- Featured metadata is applied to matching titles.

The React page can consume this tested transformation function rather than embedding sort rules directly in component rendering.

## Acceptance Criteria

- `backend/content/book_library.json` exists and contains the provided library.
- `/bookshelf` fetches the backend content URL instead of using a hardcoded book array.
- Scripture appears as its own top category and does not show ratings.
- The main library list is sorted by rating descending, with unrated titles last.
- The existing top book covers/descriptions still appear for their matching books.
- Build and relevant tests pass.
