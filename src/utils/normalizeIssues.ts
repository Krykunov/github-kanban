import { Issue, IssueWithAssignee, Status } from '@/types/issue';

export const normalizeIssues = (issue: IssueWithAssignee): Issue => {
  const id = issue.id ?? 0;
  const title = issue.title ?? 'Untitled';
  const number = issue.number ?? 0;
  const created_at = issue.created_at ?? new Date().toISOString();
  const user = issue.user?.login ?? 'Unknown';
  const comments = issue.comments ?? 0;

  let state: Status.open | Status.inProgress | Status.closed;
  if (issue.state === Status.closed) {
    state = Status.closed;
  } else if (
    issue.assignee !== null ||
    (issue.assignees && issue.assignees.length > 0)
  ) {
    state = Status.inProgress;
  } else {
    state = Status.open;
  }

  return { id, title, number, created_at, user, comments, state };
};
