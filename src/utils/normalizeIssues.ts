import { groupBy } from 'lodash';
import { Issue, Status, IssuesByStatus } from '@/types/issue';

export const normalizeIssues = (issues: Issue[]): IssuesByStatus => {
  return Object.fromEntries(
    Object.values(Status).map((state) => [
      state,
      groupBy(issues || [], 'state')[state] ?? [],
    ]),
  ) as IssuesByStatus;
};
