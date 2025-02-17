import { Button, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { Toaster, toaster } from '@/components/ui/toaster';

import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useIssuesStore } from '@/store/issues';
import { fetchIssues } from '@/services/githubApi';
import { useRepoStore } from '@/store/repo';
import { findRandomRepoWithIssues } from '@/services/randomRepo';
import { IoCloseOutline } from 'react-icons/io5';

const repoSchema = z.object({
  repoUrl: z
    .string()
    .min(1, 'Repository URL is required')
    .regex(
      /^https:\/\/github\.com\/([^/]+)\/([^/]+)$/,
      'Invalid GitHub repository URL',
    ),
});

type RepoFormData = z.infer<typeof repoSchema>;

const InputForm = () => {
  const { setRepos, getIssues } = useIssuesStore();
  const { setCurrentRepoUrl, repoInfo, setRepoInfo } = useRepoStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RepoFormData>({
    resolver: zodResolver(repoSchema),
  });

  const onSubmit = async ({ repoUrl }: RepoFormData) => {
    setCurrentRepoUrl(repoUrl);
    const owner = repoUrl.split('/')[3];
    const repoName = repoUrl.split('/')[4];
    const repoId = `${owner}/${repoName}`;

    const savedIssues = getIssues(repoId);
    if (savedIssues) {
      return;
    }

    const result = await fetchIssues(owner, repoName);

    if (result) {
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
        issues,
      });
      toaster.create({
        description: `Fetched ${issues.length} issues from ${repoName} of ${owner}`,
        type: 'info',
      });
    }
  };

  const randomRepoHandler = async () => {
    const randomRepo = await findRandomRepoWithIssues();
    onSubmit({ repoUrl: randomRepo?.html_url || '' });
  };

  const resetForm = () => {
    setRepoInfo(null);
    setCurrentRepoUrl(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={4} align="center" mb="4">
        <Field invalid={!!errors.repoUrl}>
          <Input
            {...register('repoUrl')}
            placeholder="Enter GitHub repo URL"
            defaultValue={repoInfo?.url || ''}
            rounded="md"
          />
        </Field>
        <IconButton bg="red.500" type="reset" rounded="md" onClick={resetForm}>
          <IoCloseOutline />
        </IconButton>
        <Button type="submit" bg="blue.600" loading={isSubmitting} rounded="md">
          Load Issues
        </Button>
        <Button
          bg="teal.600"
          loading={isSubmitting}
          rounded="md"
          onClick={randomRepoHandler}
        >
          I&apos;m lazy, find random repo
        </Button>
        <Toaster />
      </Flex>

      {errors.repoUrl && <Text color="red.500">{errors.repoUrl.message}</Text>}
    </form>
  );
};

export default InputForm;
