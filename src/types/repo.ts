import { IssuesByStatus } from '@/types/issue';

export type Repo = {
  id: string;
  name: string;
  owner: string;
  issues: IssuesByStatus;
};
