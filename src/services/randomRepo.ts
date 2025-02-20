import axios from 'axios';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN || '';

export const findRandomRepoWithIssues = async () => {
  try {
    const headers =
      GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};
    const searchResponse = await axios.get(
      'https://api.github.com/search/repositories',
      {
        headers,
        params: {
          q: 'stars:>200 issues:>1',
          sort: 'stars',
          order: 'desc',
          per_page: 100,
        },
      },
    );

    const repos = searchResponse.data.items;
    if (!repos || repos.length === 0) {
      console.error('No repositories found with issues.');
      return null;
    }

    const randomIndex = Math.floor(Math.random() * repos.length);
    const randomRepo = repos[randomIndex];

    return randomRepo;
  } catch (error) {
    console.error('Failed to fetch a random repo with issues:', error);
    return null;
  }
};
