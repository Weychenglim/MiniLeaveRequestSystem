import { describe, expect, it } from "vitest";
import { isLeaveStatus, leaveStatuses } from "./leave-status";

describe("leave status helpers", () => {
  it("accepts only supported leave request statuses", () => {
    expect(leaveStatuses).toEqual(["PENDING", "APPROVED", "REJECTED"]);
    expect(isLeaveStatus("PENDING")).toBe(true);
    expect(isLeaveStatus("APPROVED")).toBe(true);
    expect(isLeaveStatus("REJECTED")).toBe(true);
    expect(isLeaveStatus("ARCHIVED")).toBe(false);
  });
});
