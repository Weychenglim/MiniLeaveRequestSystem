import { describe, expect, it } from "vitest";
import { validateLeaveRequestInput } from "./leave-validation";

describe("validateLeaveRequestInput", () => {
  it("returns clear errors when required fields are missing", () => {
    const result = validateLeaveRequestInput({
      name: "",
      startDate: "",
      endDate: "",
      reason: ""
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toMatchObject({
        name: ["Name is required."],
        startDate: ["Start date is required."],
        endDate: ["End date is required."],
        reason: ["Reason is required."]
      });
    }
  });

  it("rejects leave requests where the end date is before the start date", () => {
    const result = validateLeaveRequestInput({
      name: "Aina Rahman",
      startDate: "2026-06-20",
      endDate: "2026-06-18",
      reason: "Family event"
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors.endDate).toContain(
        "End date must be on or after the start date."
      );
    }
  });

  it("accepts a valid same-day leave request and trims text fields", () => {
    const result = validateLeaveRequestInput({
      name: "  Daniel Lim  ",
      startDate: "2026-06-22",
      endDate: "2026-06-22",
      reason: "  Medical appointment  "
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toMatchObject({
        name: "Daniel Lim",
        reason: "Medical appointment"
      });
      expect(result.data.startDate).toEqual(new Date("2026-06-22T00:00:00"));
      expect(result.data.endDate).toEqual(new Date("2026-06-22T00:00:00"));
    }
  });
});
