# Project Status

## Completed

- Next.js TypeScript app scaffolded.
- Prisma SQLite model and local setup script added.
- Leave request form implemented.
- Server-side validation implemented.
- Request list implemented.
- Approve and reject workflow implemented.
- Status filter and polished dashboard UI added.
- Unit tests added for validation and status helpers.
- README and scenario answers added.

## Verification Status

- `npm run test` passes for the current unit tests.
- `npm run lint` passes.
- `npm run build` passes with a longer timeout on this Windows machine.
- Local SQLite setup has been verified with seeded rows.

## Pending

- Add final working screenshot under `screenshots/`.
- Run final end-to-end smoke test in the browser.

## Known Notes

- The SQLite database and `.env` file are local-only and ignored by Git.
- `npm run db:setup` is the supported local database setup command for this submission.
