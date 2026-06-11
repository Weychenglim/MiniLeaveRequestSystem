import { approveLeaveRequest, rejectLeaveRequest } from "@/app/actions";
import { LeaveRequestForm } from "@/components/leave-request-form";
import { getStatusLabel } from "@/lib/leave-status";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export default function Home() {
  const requestsPromise = prisma.leaveRequest.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <main className="min-h-screen bg-linen px-5 py-8 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-md border border-moss/15 bg-white/70 p-8 shadow-panel backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-clay">
            NaiBnB Practical Task
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold">
            Mini Leave Request System
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-moss">
            Submit staff leave, validate dates server-side, and review current
            requests from a persistent SQLite database.
          </p>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
          <section className="rounded-md border border-moss/15 bg-white p-6 shadow-panel">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold">
              New request
            </h2>
            <p className="mt-2 text-sm leading-6 text-moss">
              All fields are checked on the server before the request is saved.
            </p>
            <div className="mt-6">
              <LeaveRequestForm />
            </div>
          </section>

          <RequestList requestsPromise={requestsPromise} />
        </div>
      </div>
    </main>
  );
}

async function RequestList({
  requestsPromise
}: {
  requestsPromise: ReturnType<typeof prisma.leaveRequest.findMany>;
}) {
  const requests = await requestsPromise;

  return (
    <section className="rounded-md border border-moss/15 bg-white p-6 shadow-panel">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl font-semibold">
            Leave requests
          </h2>
          <p className="mt-2 text-sm leading-6 text-moss">
            Showing all requests saved in the local database.
          </p>
        </div>
        <span className="rounded-md bg-linen px-3 py-2 text-sm font-bold text-moss">
          {requests.length} total
        </span>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-moss/10">
        {requests.length === 0 ? (
          <div className="bg-linen/60 px-5 py-12 text-center text-moss">
            No leave requests yet.
          </div>
        ) : (
          <div className="divide-y divide-moss/10">
            {requests.map((request) => (
              <article
                key={request.id}
                className="grid gap-4 bg-white px-5 py-5 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-extrabold">{request.name}</h3>
                    <span className="rounded-md bg-linen px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-moss">
                      {getStatusLabel(request.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-clay">
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-moss">
                    {request.reason}
                  </p>
                </div>
                <div className="flex gap-2 md:items-start">
                  <form action={approveLeaveRequest.bind(null, request.id)}>
                    <button
                      type="submit"
                      className="rounded-md border border-fern/25 bg-fern/10 px-3 py-2 text-sm font-bold text-moss transition hover:bg-fern/20 disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={request.status === "APPROVED"}
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectLeaveRequest.bind(null, request.id)}>
                    <button
                      type="submit"
                      className="rounded-md border border-clay/25 bg-clay/10 px-3 py-2 text-sm font-bold text-clay transition hover:bg-clay/20 disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={request.status === "REJECTED"}
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
