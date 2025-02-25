import axios from 'axios';
import { Issue, IssueWithAssignee } from '@/types/issue';
import { normalizeIssues } from '@/utils/normalizeIssues';
import { BASE_URL, GITHUB_API_TOKEN } from '@/constants';

export const fetchIssues = async (
  owner: string,
  repo: string,
): Promise<{
  issues: Issue[];
  repoInfo: { name: string; owner: string; stars: number };
} | null> => {
  try {
    const headers =
      GITHUB_API_TOKEN ? { Authorization: `Bearer ${GITHUB_API_TOKEN}` } : {};
    const issuesResponse = await axios.get(
      `${BASE_URL}/repos/${owner}/${repo}/issues?state=all&per_page=10`,
      { headers },
    );
    const repoResponse = await axios.get(`${BASE_URL}/repos/${owner}/${repo}`, {
      headers,
    });

    const issues = issuesResponse.data.map((issue: IssueWithAssignee) => ({
      ...normalizeIssues(issue),
    }));

    const repoInfo = {
      name: repoResponse.data.name,
      owner: repoResponse.data.owner.login,
      stars: repoResponse.data.stargazers_count,
    };

    return { issues, repoInfo };
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    return null;
  }
};
