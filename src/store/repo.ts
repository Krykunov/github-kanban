import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RepoStore {
  currentRepoUrl: string | null;
  setCurrentRepoUrl: (url: string | null) => void;
  repoInfo: {
    url: string;
    name: string;
    owner: string;
    stars: number;
  } | null;
  setRepoInfo: (
    info: {
      url: string;
      name: string;
      owner: string;
      stars: number;
    } | null,
  ) => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      currentRepoUrl: null,
      setCurrentRepoUrl: (url) => set({ currentRepoUrl: url }),
      repoInfo: null,
      setRepoInfo: (info) => set({ repoInfo: info }),
    }),
    {
      name: 'repo-storage',
    },
  ),
);
