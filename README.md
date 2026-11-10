# m3-personal-project: Bookmark Library

My personal project for the Advanced JS and TypeScript course at Harbour.Space.

I save links to shops, books, courses and tools in different places. I built Bookmark Library to keep them together. Each bookmark has a title and tags. For a product, I can also save the price and currency.

## Run

From the project root, run `pnpm install`.

### API

Keep the API running and use a second terminal for the CLI or web app:

```bash
pnpm dev:api
```

### CLI

Run `pnpm dev:cli add` to answer the prompts or `pnpm dev:cli remove` to pick a bookmark from the list.

```bash
pnpm dev:cli add https://example.com/notebook --title Notebook --kind product \
    --category shopping --tags paper --price 8.50 --currency EUR --note Sketches --favorite
pnpm dev:cli remove https://example.com/notebook
pnpm dev:cli list
```

### Web

```bash
pnpm dev:web
```

## Linting

TypeScript, ESLint and Prettier checks:

```bash
pnpm lint
```

## Monorepo structure

- `apps/bookmark-api` handles requests with Fastify and saves bookmarks in `data/bookmarks.json`.
- `apps/bookmark-cli` contains the `add`, `list` and `remove` commands.
- `apps/bookmark-web` shows the bookmarks in a React app built with Vite.
- `features/bookmark-library` contains the bookmark types, validation, library class and API calls
- `internal/dev-config` holds the shared TypeScript, ESLint and Prettier settings.

## What's next

`GET /api/bookmarks` returns the whole collection. As the list grows, I'd like to fetch it a page at a time.
