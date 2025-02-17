import { Issue, Status, IssuesByStatus } from '@/types/issue';

export const groupIssues = (issues: Issue[]): IssuesByStatus => {
  return {
    [Status.open]: issues.filter((issue) => issue.state === 'open'),
    [Status.inProgress]: issues.filter((issue) => issue.state === 'inProgress'),
    [Status.closed]: issues.filter((issue) => issue.state === 'closed'),
  };
};
