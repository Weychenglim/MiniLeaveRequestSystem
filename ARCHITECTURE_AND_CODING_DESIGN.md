# Architecture And Coding Design

## Application Structure

- `app/page.tsx` renders the dashboard, request form area, metrics, filters, and request list.
- `src/app/actions.ts` contains server actions for creating, approving, and rejecting leave requests.
- `src/components/leave-request-form.tsx` contains the client form and inline validation display.
- `src/lib/leave-validation.ts` contains Zod-backed server validation.
- `src/lib/leave-status.ts` contains status values, labels, and badge styling helpers.
- `src/lib/prisma.ts` provides a shared Prisma Client instance.
- `prisma/schema.prisma` defines the leave request model.
- `prisma/setup.ts` creates and seeds the local SQLite database.

## Data Model

`LeaveRequest` stores staff name, start date, end date, reason, status, and timestamps. Status is stored as a string for SQLite compatibility and constrained in TypeScript as `PENDING`, `APPROVED`, or `REJECTED`.

## Validation And Error Handling

Submission validation runs in the server action before database writes. Required fields return field-specific messages, and invalid date ranges attach the error to `endDate`.

## Testing Strategy

Vitest covers validation rules and allowed status values. Next.js lint and build are used as integration checks for component, server action, and type safety.

## Security Notes

Secrets are not committed. `.env` is ignored, and `.env.example` documents the expected local `DATABASE_URL`.
