import { describe, expect, it } from "vitest";
import { prepareLeaveRequestQueue } from "./leave-request-queue";

const baseDate = new Date("2026-06-12T00:00:00");

const requests = [
  {
    id: 1,
    name: "Daniel Lim",
    reason: "Medical appointment",
    status: "APPROVED",
    createdAt: new Date("2026-06-12T09:00:00")
  },
  {
    id: 2,
    name: "Aina Rahman",
    reason: "Family trip",
    status: "PENDING",
    createdAt: new Date("2026-06-12T08:00:00")
  },
  {
    id: 3,
    name: "Priya Nair",
    reason: "Project recovery day",
    status: "PENDING",
    createdAt: new Date("2026-06-12T10:00:00")
  },
  {
    id: 4,
    name: "Marcus Tan",
    reason: "Personal matter",
    status: "REJECTED",
    createdAt: baseDate
  }
];

describe("prepareLeaveRequestQueue", () => {
  it("sorts pending requests first, then newest first", () => {
    const result = prepareLeaveRequestQueue(requests, "");

    expect(result.map((request) => request.id)).toEqual([3, 2, 1, 4]);
  });

  it("searches staff names and reasons case-insensitively", () => {
    const byName = prepareLeaveRequestQueue(requests, "aina");
    const byReason = prepareLeaveRequestQueue(requests, "RECOVERY");

    expect(byName.map((request) => request.id)).toEqual([2]);
    expect(byReason.map((request) => request.id)).toEqual([3]);
  });
});
