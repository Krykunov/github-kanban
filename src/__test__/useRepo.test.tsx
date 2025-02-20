import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useRepo } from '@/hooks/useRepo';
import { IssuesStore, useIssuesStore } from '@/store/issues';
import { RepoStore, useRepoStore } from '@/store/repo';
import { fetchIssues } from '@/services/githubApi';
import { findRandomRepoWithIssues } from '@/services/randomRepo';
import { toaster } from '@/components/ui/toaster';

vi.mock('@/store/issues', () => ({
  useIssuesStore: vi.fn(),
}));

vi.mock('@/store/repo', () => ({
  useRepoStore: vi.fn(),
}));

vi.mock('@/services/githubApi', () => ({
  fetchIssues: vi.fn(),
}));

vi.mock('@/services/randomRepo', () => ({
  findRandomRepoWithIssues: vi.fn(),
}));

vi.mock('@/components/ui/toaster', () => ({
  toaster: { create: vi.fn() },
}));

describe('useRepo Hook', () => {
  let mockUseIssuesStore: Partial<IssuesStore>;
  let mockUseRepoStore: Partial<RepoStore>;

  beforeEach(() => {
    vi.resetAllMocks();

    mockUseIssuesStore = {
      setRepos: vi.fn(),
      getIssues: vi.fn(() => null),
    };

    mockUseRepoStore = {
      setCurrentRepoUrl: vi.fn(),
      setCurrentRepoName: vi.fn(),
      setRepoInfo: vi.fn(),
      currentRepoUrl: '',
    };

    (useIssuesStore as unknown as Mock).mockReturnValue(mockUseIssuesStore);
    (useRepoStore as unknown as Mock).mockReturnValue(mockUseRepoStore);
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useRepo());

    expect(result.current.value).toBe('');
    expect(result.current.isDisabled).toBe(false);
  });

  it('sets repository value when onSubmit is called', async () => {
    const { result } = renderHook(() => useRepo());

    await act(async () => {
      await result.current.onSubmit({
        repoUrl: 'https://github.com/user/repo',
      });
    });

    expect(mockUseRepoStore.setCurrentRepoUrl).toHaveBeenCalledWith(
      'https://github.com/user/repo',
    );
    expect(result.current.value).toBe('https://github.com/user/repo');
  });

  it('fetches and stores repo data correctly', async () => {
    (fetchIssues as Mock).mockResolvedValue({
      issues: [{ id: 1, title: 'Test Issue' }],
      repoInfo: { name: 'repo', owner: 'user', stars: 42 },
    });

    const { result } = renderHook(() => useRepo());

    await act(async () => {
      await result.current.onSubmit({
        repoUrl: 'https://github.com/user/repo',
      });
    });

    expect(fetchIssues).toHaveBeenCalledWith('user', 'repo');
    expect(mockUseIssuesStore.setRepos).toHaveBeenCalled();
    expect(mockUseRepoStore.setRepoInfo).toHaveBeenCalled();
  });

  it('handles randomRepoHandler correctly', async () => {
    (findRandomRepoWithIssues as Mock).mockResolvedValue({
      html_url: 'https://github.com/random/repo',
    });

    const { result } = renderHook(() => useRepo());

    await act(async () => {
      await result.current.randomRepoHandler();
    });

    expect(mockUseRepoStore.setCurrentRepoUrl).toHaveBeenCalledWith(
      'https://github.com/random/repo',
    );
  });

  it('handles resetForm correctly', () => {
    const { result } = renderHook(() => useRepo());

    act(() => {
      result.current.resetForm();
    });

    expect(mockUseRepoStore.setRepoInfo).toHaveBeenCalledWith(null);
    expect(mockUseRepoStore.setCurrentRepoUrl).toHaveBeenCalledWith(null);
    expect(result.current.value).toBe('');
  });

  it('shows toaster error on fetch failure', async () => {
    (fetchIssues as Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useRepo());

    await act(async () => {
      await result.current.onSubmit({
        repoUrl: 'https://github.com/user/repo',
      });
    });

    expect(toaster.create).toHaveBeenCalledWith({
      description: 'Failed to fetch',
      type: 'error',
    });
  });
});
