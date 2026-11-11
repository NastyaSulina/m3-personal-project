# m3-personal-project: Bookmark Library

My personal project for the Advanced JS and TypeScript course at Harbour.Space.

I save links to shops, books, courses and tools in different places. I built Bookmark Library to keep them together. Each bookmark has a title and tags. For a product, I can also save the price and currency.

## Run

Node.js 24 and pnpm 12.

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

The project is a pnpm workspace. Nx runs commands across the packages.

- `apps/bookmark-api` serves the bookmarks with Fastify and saves changes to a JSON file.
- `apps/bookmark-cli` contains the terminal commands. Commander reads the arguments and Inquirer asks for any missing details.
- `apps/bookmark-web` is the React and Vite app. Its main view is a list of bookmark cards.
- `features/bookmark-library` contains the `Library` class, bookmark types, type guards and shared API services.
- `internal/dev-config` holds the shared TypeScript, ESLint and Prettier settings.

## Current state

**What works**

- In the CLI, I can add a website or product, list my bookmarks and remove one by URL or pick one from the list.
- In the browser, I can open a bookmark, delete it and mark or unmark it as a favorite. These changes are saved.
- Both apps use the same API. It supports `GET` for the list or a single bookmark, `POST` to add one, `DELETE` to remove one and `PATCH` to change its favorite status.

**What's still missing**

We worked with JSON files in class, so I started with one here. The API loads it into memory at startup and writes changes back to disk. This works for my local setup. Two API processes writing to the same file could overwrite each other's changes.

I'm happy with the CLI. The web app is still a single list built from a few components. I use the terminal when I want to save a new link.

**What I'd do next**

- Move the bookmarks to a database and handle concurrent updates so one change can't silently overwrite another.
- Work out a design I'd enjoy using every day. Start with adding and editing bookmarks in the browser, then add filters by tag, category and favorite status.
- Add sign-in so each person has their own library. As the web app grows, split it into pages and group the related components in modlets.
- Add pagination to `GET /api/bookmarks` so a large library can load one page at a time.
