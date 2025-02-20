import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useGithubIssues } from '@/hooks/useGithubIssues';
import { fetchIssues } from '@/services/githubApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@/services/githubApi', () => ({
  fetchIssues: vi.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('useGithubIssues Hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches issues correctly', async () => {
    (fetchIssues as Mock).mockResolvedValue([
      { id: 1, title: 'Issue 1' },
      { id: 2, title: 'Issue 2' },
    ]);

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useGithubIssues('user/repo'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      { id: 1, title: 'Issue 1' },
      { id: 2, title: 'Issue 2' },
    ]);
    expect(fetchIssues).toHaveBeenCalledWith('user', 'repo');
  });

  it('handles API errors', async () => {
    (fetchIssues as Mock).mockRejectedValue(new Error('API Error'));

    const queryClient = createTestQueryClient();
    const { result } = renderHook(() => useGithubIssues('user/repo'), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('API Error');
  });
});
