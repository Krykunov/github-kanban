export type Issue = {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: { login: string };
  comments: number;
  state: Status;
};

export enum Status {
  Open = 'open',
  InProgress = 'In Progress',
  Done = 'closed',
}

export type IssuesByStatus = Record<Status, Issue[]>;
