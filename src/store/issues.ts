import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Issue } from '@/types/issue';

interface IssueStore {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
}

export const useIssueStore = create<IssueStore>()(
  persist(
    (set) => ({
      issues: [],
      setIssues: (issues) => set({ issues }),
    }),
    {
      name: 'issues-store',
    },
  ),
);
