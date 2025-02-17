import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RepoStore {
  savedRepoUrl: string | null;
  setRepoUrl: (url: string) => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      savedRepoUrl: null,
      setRepoUrl: (url) => set({ savedRepoUrl: url }),
    }),
    {
      name: 'repo-storage',
    },
  ),
);
