export type Issue = {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: string;
  comments: number;
  state: 'open' | 'inProgress' | 'closed';
};

export type IssueWithAssignee = Partial<
  Issue & {
    assignee?: { login: string } | null;
    assignees?: { login: string }[];
    user: { login: string };
  }
>;

export enum Status {
  open = 'open',
  inProgress = 'inProgress',
  closed = 'closed',
}

export enum Notification {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

export type IssuesByStatus = Record<Status, Issue[]>;
