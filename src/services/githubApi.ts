import axios from 'axios';
import { Issue, IssueWithAssignee } from '@/types/issue';
import { normalizeIssues } from '@/utils/normalizeIssues';

export const fetchIssues = async (
  owner: string,
  repo: string,
): Promise<Issue[]> => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
    );

    return response.data.map((issue: IssueWithAssignee) => ({
      ...normalizeIssues(issue),
    }));
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    return [];
  }
};
