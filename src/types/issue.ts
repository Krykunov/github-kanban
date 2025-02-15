export type Issue = {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: { login: string };
  comments: number;
  status: Status;
};

export enum Status {
  ToDo = 'ToDo',
  InProgress = 'In Progress',
  Done = 'Done',
}

export type IssuesByStatus = Record<Status, Issue[]>;
