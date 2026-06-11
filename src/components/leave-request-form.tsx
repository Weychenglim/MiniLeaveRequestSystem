"use client";

import { useFormState } from "react-dom";
import { createLeaveRequest } from "@/app/actions";
import {
  initialLeaveRequestFormState,
  type LeaveRequestFormErrors
} from "@/lib/leave-validation";
import { SubmitButton } from "./submit-button";

function FieldError({
  errors,
  field
}: {
  errors: LeaveRequestFormErrors;
  field: keyof LeaveRequestFormErrors;
}) {
  const messages = errors[field];

  if (!messages?.length) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-red-700">{messages[0]}</p>;
}

export function LeaveRequestForm() {
  const [state, formAction] = useFormState(
    createLeaveRequest,
    initialLeaveRequestFormState
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <div
          className={`rounded-md border px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "border-fern/30 bg-fern/10 text-moss"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="name"
          className="text-sm font-bold uppercase tracking-[0.16em] text-moss"
        >
          Staff name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={state.values.name}
          className="mt-2 w-full rounded-md border border-moss/20 bg-white px-4 py-3 text-ink outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/15"
          placeholder="e.g. Aina Rahman"
        />
        <FieldError errors={state.errors} field="name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startDate"
            className="text-sm font-bold uppercase tracking-[0.16em] text-moss"
          >
            Start date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={state.values.startDate}
            className="mt-2 w-full rounded-md border border-moss/20 bg-white px-4 py-3 text-ink outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/15"
          />
          <FieldError errors={state.errors} field="startDate" />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="text-sm font-bold uppercase tracking-[0.16em] text-moss"
          >
            End date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={state.values.endDate}
            className="mt-2 w-full rounded-md border border-moss/20 bg-white px-4 py-3 text-ink outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/15"
          />
          <FieldError errors={state.errors} field="endDate" />
        </div>
      </div>

      <div>
        <label
          htmlFor="reason"
          className="text-sm font-bold uppercase tracking-[0.16em] text-moss"
        >
          Reason
        </label>
        <textarea
          id="reason"
          name="reason"
          defaultValue={state.values.reason}
          className="mt-2 min-h-28 w-full resize-y rounded-md border border-moss/20 bg-white px-4 py-3 text-ink outline-none transition focus:border-clay focus:ring-4 focus:ring-clay/15"
          placeholder="Briefly explain the leave request"
        />
        <FieldError errors={state.errors} field="reason" />
      </div>

      <SubmitButton
        idleLabel="Submit request"
        pendingLabel="Submitting..."
        className="w-full rounded-md bg-ink px-5 py-3 font-bold text-linen transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-65"
      />
    </form>
  );
}
