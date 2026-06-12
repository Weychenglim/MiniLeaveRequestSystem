type QueueRequest = {
  name: string;
  reason: string;
  status: string;
  createdAt: Date;
};

function matchesSearch(request: QueueRequest, query: string) {
  if (!query) {
    return true;
  }

  const haystack = `${request.name} ${request.reason}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function compareQueueRequests(a: QueueRequest, b: QueueRequest) {
  if (a.status === "PENDING" && b.status !== "PENDING") {
    return -1;
  }

  if (a.status !== "PENDING" && b.status === "PENDING") {
    return 1;
  }

  return b.createdAt.getTime() - a.createdAt.getTime();
}

export function prepareLeaveRequestQueue<T extends QueueRequest>(
  requests: T[],
  query: string
) {
  const trimmedQuery = query.trim();

  return requests
    .filter((request) => matchesSearch(request, trimmedQuery))
    .toSorted(compareQueueRequests);
}
