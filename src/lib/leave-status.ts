export const leaveStatuses = ["PENDING", "APPROVED", "REJECTED"] as const;

export type LeaveStatus = (typeof leaveStatuses)[number];

export function isLeaveStatus(value: string): value is LeaveStatus {
  return leaveStatuses.includes(value as LeaveStatus);
}

export function getStatusLabel(status: string) {
  if (!isLeaveStatus(status)) {
    return "Unknown";
  }

  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function getStatusBadgeClass(status: string) {
  if (status === "APPROVED") {
    return "border-fern/30 bg-fern/15 text-moss";
  }

  if (status === "REJECTED") {
    return "border-clay/30 bg-clay/15 text-clay";
  }

  return "border-ink/15 bg-linen text-ink";
}
