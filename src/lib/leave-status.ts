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
