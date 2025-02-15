import { useQuery } from '@tanstack/react-query';
import { fetchIssues } from '@/services/githubApi';

export const useGithubIssues = (repoUrl: string) => {
  return useQuery({
    queryKey: ['issues', repoUrl],
    queryFn: () => fetchIssues(repoUrl),
    enabled: !!repoUrl,
    staleTime: 1000 * 60 * 10,
  });
};
