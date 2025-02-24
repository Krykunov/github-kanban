import { useState, useCallback } from 'react';
import { useIssuesStore } from '@/store/issues';
import { useRepoStore } from '@/store/repo';
import { fetchIssues } from '@/services/githubApi';
import { groupIssues } from '@/utils/groupIssues';
import { findRandomRepoWithIssues } from '@/services/randomRepo';
import { RepoFormData } from '@/components/InputForm';
import { toaster } from '@/components/ui/toaster';
import { Notification } from '@/types/issue';

export const useRepo = () => {
  const { setRepos, getIssues } = useIssuesStore();
  const { setCurrentRepoUrl, setCurrentRepoName, setRepoInfo, currentRepoUrl } =
    useRepoStore();

  const [value, setValue] = useState(currentRepoUrl || '');
  const [isDisabled, setIsDisabled] = useState(false);

  const extractRepoDetails = (repoUrl: string) => {
    const parts = repoUrl.split('/');
    return { owner: parts[3], repoName: parts[4] };
  };

  const fetchAndStoreRepoData = useCallback(
    async (repoUrl: string) => {
      if (!repoUrl) return;

      const { owner, repoName } = extractRepoDetails(repoUrl);
      const repoId = `${owner}/${repoName}`;

      if (getIssues(repoId)) return;

      try {
        const result = await fetchIssues(owner, repoName);
        if (!result) throw new Error('No issues found');

        const { issues, repoInfo } = result;

        setRepoInfo({
          url: repoUrl,
          name: repoInfo.name,
          owner: repoInfo.owner,
          stars: repoInfo.stars,
        });

        setRepos({
          id: repoId,
          name: repoName,
          owner,
          issues: groupIssues(issues),
        });

        setCurrentRepoName(repoName);

        toaster.create({
          description: `Fetched ${issues.length} issues from ${repoName} of ${owner}`,
          type: Notification.info,
        });
      } catch (error) {
        toaster.create({
          description: (error as Error).message,
          type: Notification.error,
        });
      }
    },
    [getIssues, setRepos, setRepoInfo, setCurrentRepoName],
  );

  const onSubmit = useCallback(
    async ({ repoUrl }: RepoFormData) => {
      if (!repoUrl) return;

      setCurrentRepoUrl(repoUrl);
      setValue(repoUrl);

      await fetchAndStoreRepoData(repoUrl);
    },
    [fetchAndStoreRepoData, setCurrentRepoUrl],
  );

  const randomRepoHandler = useCallback(async () => {
    setIsDisabled(true);
    const randomRepo = await findRandomRepoWithIssues();
    if (randomRepo?.html_url) {
      await onSubmit({ repoUrl: randomRepo.html_url });
    } else {
      toaster.create({
        description: 'No suitable repository found',
        type: 'warning',
      });
    }
  }, [onSubmit]);

  const resetForm = useCallback(() => {
    setRepoInfo(null);
    setCurrentRepoUrl(null);
    setValue('');
    setIsDisabled(true);
  }, [setRepoInfo, setCurrentRepoUrl]);

  return {
    value,
    setValue,
    onSubmit,
    randomRepoHandler,
    resetForm,
    isDisabled,
    setIsDisabled,
  };
};
