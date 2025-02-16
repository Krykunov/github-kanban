import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RepoStore {
  repoUrl: string | null;
  setRepoUrl: (url: string) => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      repoUrl: null,
      setRepoUrl: (url) => set({ repoUrl: url }),
    }),
    {
      name: 'repo-storage',
    },
  ),
);
