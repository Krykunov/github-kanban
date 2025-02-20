import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { findRandomRepoWithIssues } from '@/services/randomRepo';

const mock = new MockAdapter(axios);

describe('findRandomRepoWithIssues', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mock.reset();

    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('fetches a list of repositories and selects a random one', async () => {
    const mockRepos = [
      { id: 1, name: 'Repo1', html_url: 'https://github.com/user/repo1' },
      { id: 2, name: 'Repo2', html_url: 'https://github.com/user/repo2' },
      { id: 3, name: 'Repo3', html_url: 'https://github.com/user/repo3' },
    ];

    mock.onGet('https://api.github.com/search/repositories').reply(200, {
      items: mockRepos,
    });

    const result = await findRandomRepoWithIssues();

    expect(result).toBeTruthy();
    expect(mockRepos).toContainEqual(result);
  });

  it('returns null if no repositories are found', async () => {
    mock.onGet('https://api.github.com/search/repositories').reply(200, {
      items: [],
    });

    const result = await findRandomRepoWithIssues();

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      'No repositories found with issues.',
    );
  });
});
