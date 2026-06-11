import { approveLeaveRequest, rejectLeaveRequest } from "@/app/actions";
import { LeaveRequestForm } from "@/components/leave-request-form";
import {
  getStatusBadgeClass,
  getStatusLabel,
  isLeaveStatus,
  leaveStatuses,
  type LeaveStatus
} from "@/lib/leave-status";
import { prisma } from "@/lib/prisma";
import {
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Filter,
  XCircle
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

type FilterStatus = LeaveStatus | "ALL";

const filterOptions: Array<{ label: string; value: FilterStatus }> = [
  { label: "All", value: "ALL" },
  ...leaveStatuses.map((status) => ({
    label: getStatusLabel(status),
    value: status
  }))
];

function getSelectedStatus(status?: string): FilterStatus {
  if (status && isLeaveStatus(status)) {
    return status;
  }

  return "ALL";
}

export default async function Home({
  searchParams
}: {
  searchParams?: {
    status?: string;
  };
}) {
  const selectedStatus = getSelectedStatus(searchParams?.status);
  const requests = await prisma.leaveRequest.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  const filteredRequests =
    selectedStatus === "ALL"
      ? requests
      : requests.filter((request) => request.status === selectedStatus);

  const pendingCount = requests.filter(
    (request) => request.status === "PENDING"
  ).length;
  const approvedCount = requests.filter(
    (request) => request.status === "APPROVED"
  ).length;
  const rejectedCount = requests.filter(
    (request) => request.status === "REJECTED"
  ).length;

  return (
    <main className="min-h-screen px-5 py-8 text-ink sm:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-md border border-moss/15 bg-white/80 shadow-panel backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="p-8 sm:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-clay">
                NaiBnB Operations
              </p>
              <h1 className="mt-4 max-w-3xl font-[var(--font-display)] text-5xl font-semibold leading-[1.02] sm:text-6xl">
                Leave desk for quick manager decisions
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-moss">
                A compact staff leave workflow with a focused review queue,
                persistent request history, and clear decision states.
              </p>
            </div>
            <div className="border-t border-moss/10 bg-ink p-8 text-linen lg:border-l lg:border-t-0">
              <div className="flex items-center gap-3">
                <CalendarCheck2 className="h-6 w-6 text-clay" />
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-linen/70">
                  Today
                </span>
              </div>
              <p className="mt-8 font-[var(--font-display)] text-6xl font-semibold">
                {pendingCount}
              </p>
              <p className="mt-2 text-sm font-semibold text-linen/70">
                pending requests need a decision
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <MetricCard
            icon={<Clock3 className="h-5 w-5" />}
            label="Pending"
            value={pendingCount}
          />
          <MetricCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Approved"
            value={approvedCount}
          />
          <MetricCard
            icon={<XCircle className="h-5 w-5" />}
            label="Rejected"
            value={rejectedCount}
          />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="rounded-md border border-moss/15 bg-white/95 p-6 shadow-panel">
            <h2 className="font-[var(--font-display)] text-3xl font-semibold">
              New request
            </h2>
            <p className="mt-2 text-sm leading-6 text-moss">
              Capture the staff member, leave dates, and reason in one pass.
            </p>
            <div className="mt-6">
              <LeaveRequestForm />
            </div>
          </section>

          <RequestList
            requests={filteredRequests}
            selectedStatus={selectedStatus}
            totalCount={requests.length}
          />
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-md border border-moss/15 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between text-moss">
        <span className="text-sm font-bold uppercase tracking-[0.16em]">
          {label}
        </span>
        {icon}
      </div>
      <p className="mt-4 font-[var(--font-display)] text-4xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function RequestList({
  requests,
  selectedStatus,
  totalCount
}: {
  requests: Awaited<ReturnType<typeof prisma.leaveRequest.findMany>>;
  selectedStatus: FilterStatus;
  totalCount: number;
}) {
  return (
    <section className="rounded-md border border-moss/15 bg-white/95 p-6 shadow-panel">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-[var(--font-display)] text-3xl font-semibold">
            Review queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-moss">
            {requests.length} of {totalCount} requests shown
          </p>
        </div>
        <span className="rounded-md bg-linen px-3 py-2 text-sm font-bold text-moss">
          SQLite backed
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <div className="mr-1 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-moss">
          <Filter className="h-4 w-4" />
          Filter
        </div>
        {filterOptions.map((option) => {
          const href =
            option.value === "ALL" ? "/" : `/?status=${encodeURIComponent(option.value)}`;
          const isActive = selectedStatus === option.value;

          return (
            <Link
              key={option.value}
              href={href}
              className={`rounded-md border px-3 py-2 text-sm font-bold transition ${
                isActive
                  ? "border-ink bg-ink text-linen"
                  : "border-moss/15 bg-linen/70 text-moss hover:border-clay hover:text-clay"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-moss/10">
        {requests.length === 0 ? (
          <div className="bg-linen/60 px-5 py-12 text-center text-moss">
            No requests match this filter.
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
                    <span
                      className={`rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] ${getStatusBadgeClass(
                        request.status
                      )}`}
                    >
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
