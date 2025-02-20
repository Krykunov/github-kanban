import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Repo } from '@/types/repo';
import { IssuesByStatus } from '@/types/issue';

export interface IssuesStore {
  repos: Repo[];
  setRepos: (newRepo: Repo) => void;
  getIssues: (repoId: string) => IssuesByStatus | null;
  updateIssues: (repoId: string, updatedIssues: IssuesByStatus) => void;
}

export const useIssuesStore = create<IssuesStore>()(
  persist(
    (set, get) => ({
      repos: [],

      setRepos: (newRepo) =>
        set((state) => {
          const exists = state.repos.some((repo) => repo.id === newRepo.id);
          if (exists) return state;

          return { repos: [...state.repos, newRepo] };
        }),

      getIssues: (repoId) => {
        const repo = get().repos.find((repo) => repo.id === repoId);
        return repo ? repo.issues : null;
      },

      updateIssues: (repoId, updatedIssues) => {
        set((state) => ({
          repos: state.repos.map((repo) =>
            repo.id === repoId ? { ...repo, issues: updatedIssues } : repo,
          ),
        }));
      },
    }),
    {
      name: 'repos-storage',
    },
  ),
);
