"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { type LeaveStatus } from "@/lib/leave-status";
import {
  emptyLeaveRequestFormValues,
  getLeaveRequestValues,
  type LeaveRequestFormState,
  validateLeaveRequestInput
} from "@/lib/leave-validation";

export async function createLeaveRequest(
  _previousState: LeaveRequestFormState,
  formData: FormData
): Promise<LeaveRequestFormState> {
  const values = getLeaveRequestValues(formData);
  const validation = validateLeaveRequestInput(values);

  if (!validation.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      values,
      errors: validation.errors
    };
  }

  await prisma.leaveRequest.create({
    data: {
      name: validation.data.name,
      startDate: validation.data.startDate,
      endDate: validation.data.endDate,
      reason: validation.data.reason,
      status: "PENDING"
    }
  });

  revalidatePath("/");

  return {
    status: "success",
    message: "Leave request submitted.",
    values: emptyLeaveRequestFormValues,
    errors: {}
  };
}

async function updateLeaveRequestStatus(id: number, status: LeaveStatus) {
  await prisma.leaveRequest.update({
    where: {
      id
    },
    data: {
      status
    }
  });

  revalidatePath("/");
}

export async function approveLeaveRequest(id: number) {
  await updateLeaveRequestStatus(id, "APPROVED");
}

export async function rejectLeaveRequest(id: number) {
  await updateLeaveRequestStatus(id, "REJECTED");
}
