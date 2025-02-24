import { Issue, Status, IssuesByStatus } from '@/types/issue';

export const groupIssues = (issues: Issue[]): IssuesByStatus => {
  return issues.reduce<IssuesByStatus>(
    (acc, issue) => {
      acc[issue.state].push(issue);
      return acc;
    },
    {
      [Status.open]: [],
      [Status.inProgress]: [],
      [Status.closed]: [],
    },
  );
};
