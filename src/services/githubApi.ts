import { Issue } from '@/types/issue';
import axios from 'axios';

export const fetchIssues = async (repoUrl: string): Promise<Issue[]> => {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error('Invalid GitHub Repo URL');

  const [, owner, repo] = match;
  const issuesUrl = `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`;

  const response = await axios.get<Issue[]>(issuesUrl, {
    // headers: {
    //   Accept: 'application/vnd.github.v3+json',
    // },
  });

  // console.log(response.data);

  return response.data;
};
