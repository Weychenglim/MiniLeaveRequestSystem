import { z } from "zod";

export type LeaveRequestFormValues = {
  name: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export type ValidatedLeaveRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  reason: string;
};

export type LeaveRequestFormErrors = Partial<
  Record<keyof LeaveRequestFormValues, string[]>
>;

export type LeaveRequestValidationResult =
  | {
      success: true;
      data: ValidatedLeaveRequest;
    }
  | {
      success: false;
      errors: LeaveRequestFormErrors;
    };

export type LeaveRequestFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  values: LeaveRequestFormValues;
  errors: LeaveRequestFormErrors;
};

export const emptyLeaveRequestFormValues: LeaveRequestFormValues = {
  name: "",
  startDate: "",
  endDate: "",
  reason: ""
};

export const initialLeaveRequestFormState: LeaveRequestFormState = {
  status: "idle",
  values: emptyLeaveRequestFormValues,
  errors: {}
};

const rawLeaveRequestSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  startDate: z.string().trim().min(1, "Start date is required."),
  endDate: z.string().trim().min(1, "End date is required."),
  reason: z.string().trim().min(1, "Reason is required.")
});

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function toLocalDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function isDateInput(value: string) {
  return datePattern.test(value) && !Number.isNaN(toLocalDate(value).getTime());
}

export function getLeaveRequestValues(formData: FormData): LeaveRequestFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    startDate: String(formData.get("startDate") ?? ""),
    endDate: String(formData.get("endDate") ?? ""),
    reason: String(formData.get("reason") ?? "")
  };
}

export function validateLeaveRequestInput(
  values: LeaveRequestFormValues
): LeaveRequestValidationResult {
  const parsed = rawLeaveRequestSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    };
  }

  const fieldErrors: LeaveRequestFormErrors = {};

  if (!isDateInput(parsed.data.startDate)) {
    fieldErrors.startDate = ["Start date must be a valid date."];
  }

  if (!isDateInput(parsed.data.endDate)) {
    fieldErrors.endDate = ["End date must be a valid date."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      errors: fieldErrors
    };
  }

  const startDate = toLocalDate(parsed.data.startDate);
  const endDate = toLocalDate(parsed.data.endDate);

  if (endDate < startDate) {
    return {
      success: false,
      errors: {
        endDate: ["End date must be on or after the start date."]
      }
    };
  }

  return {
    success: true,
    data: {
      name: parsed.data.name,
      startDate,
      endDate,
      reason: parsed.data.reason
    }
  };
}
