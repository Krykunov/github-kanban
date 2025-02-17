import axios from 'axios';

export const findRandomRepoWithIssues = async () => {
  try {
    const searchResponse = await axios.get(
      'https://api.github.com/search/repositories',
      {
        params: {
          q: 'stars:>100 issues:>1',
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
