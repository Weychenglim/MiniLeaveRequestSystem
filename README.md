# Mini Leave Request System

NaiBnB Stage 2 practical task built with Next.js, Prisma, SQLite, Zod, and Tailwind CSS.

## Features

- List all leave requests from a local SQLite database
- Submit a leave request with name, start date, end date, and reason
- Server-side validation for required fields and date ranges
- Approve or reject each request
- Filter by All, Pending, Approved, or Rejected
- Polished responsive dashboard UI

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma Client
- SQLite
- Zod
- Vitest

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create the environment file:

```bash
copy .env.example .env
```

On macOS/Linux, use:

```bash
cp .env.example .env
```

3. Generate Prisma Client:

```bash
npm run prisma:generate
```

4. Create and seed the SQLite database:

```bash
npm run db:setup
```

5. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
npm run test
npm run lint
npm run build
```

## Screenshot

The working app screenshot is saved at:

```text
screenshots/leave-request-system.png
```

## Notes

- `.env` and the SQLite database are intentionally ignored by Git.
- `.env.example` is included so reviewers can set up the local database quickly.
- The app uses `npm run db:setup` to create and seed the SQLite table through Prisma Client.
