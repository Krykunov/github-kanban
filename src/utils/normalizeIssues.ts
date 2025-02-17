import { Issue, IssueWithAssignee } from '@/types/issue';

export const normalizeIssues = (issue: IssueWithAssignee): Issue => ({
  id: issue.id ?? 0,
  title: issue.title ?? 'Untitled',
  number: issue.number ?? 0,
  created_at: issue.created_at ?? new Date().toISOString(),
  user: issue.user?.login ?? 'Unknown',
  comments: issue.comments ?? 0,
  state:
    issue.state === 'closed' ? 'closed'
    : (
      issue.assignee !== null || (issue.assignees && issue.assignees.length > 0)
    ) ?
      'inProgress'
    : 'open',
});
