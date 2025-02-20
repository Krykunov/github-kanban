import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RepoStore {
  currentRepoUrl: string | null;
  currentRepoName: string | null;
  setCurrentRepoUrl: (url: string | null) => void;
  setCurrentRepoName: (url: string | null) => void;
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
      currentRepoName: null,
      setCurrentRepoName: (name) => set({ currentRepoName: name }),
      setCurrentRepoUrl: (url) => set({ currentRepoUrl: url }),
      repoInfo: null,
      setRepoInfo: (info) => set({ repoInfo: info }),
    }),
    {
      name: 'repoUrl-storage',
    },
  ),
);
