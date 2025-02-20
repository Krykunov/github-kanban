import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchIssues } from '@/services/githubApi';

const mock = new MockAdapter(axios);

describe('fetchIssues', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mock.reset();

    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('fetches issues and repo details correctly', async () => {
    mock
      .onGet(
        'https://api.github.com/repos/user/repo/issues?state=all&per_page=10',
      )
      .reply(200, [
        {
          id: 1,
          title: 'Issue 1',
          number: 101,
          state: 'open',
          user: { login: 'dev-user' },
          comments: 5,
        },
        {
          id: 2,
          title: 'Issue 2',
          number: 102,
          state: 'closed',
          user: { login: 'another-dev' },
          comments: 3,
        },
      ]);

    mock.onGet('https://api.github.com/repos/user/repo').reply(200, {
      name: 'repo',
      owner: { login: 'user' },
      stargazers_count: 42,
    });

    const result = await fetchIssues('user', 'repo');

    expect(result).toBeTruthy();
    expect(result?.issues.length).toBe(2);
    expect(result?.issues[0].title).toBe('Issue 1');
    expect(result?.repoInfo).toEqual({
      name: 'repo',
      owner: 'user',
      stars: 42,
    });
  });

  it('returns null if API request fails', async () => {
    mock
      .onGet(
        'https://api.github.com/repos/user/repo/issues?state=all&per_page=10',
      )
      .reply(500);
    mock.onGet('https://api.github.com/repos/user/repo').reply(500);

    const result = await fetchIssues('user', 'repo');

    expect(result).toBeNull();
  });
});
