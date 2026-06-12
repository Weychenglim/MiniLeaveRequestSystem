import { describe, expect, it } from "vitest";
import { getLeaveDurationDays } from "./leave-dates";

describe("getLeaveDurationDays", () => {
  it("counts a same-day leave request as one day", () => {
    expect(
      getLeaveDurationDays(
        new Date("2026-06-22T00:00:00"),
        new Date("2026-06-22T00:00:00")
      )
    ).toBe(1);
  });

  it("counts leave days inclusively across a date range", () => {
    expect(
      getLeaveDurationDays(
        new Date("2026-06-17T00:00:00"),
        new Date("2026-06-19T00:00:00")
      )
    ).toBe(3);
  });
});
