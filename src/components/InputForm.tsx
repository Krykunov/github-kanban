import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useIssuesStore } from '@/store/issues';
import { fetchIssues } from '@/services/githubApi';
import { useRepoStore } from '@/store/repo';

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
  const { savedRepoUrl, setRepoUrl } = useRepoStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RepoFormData>({
    resolver: zodResolver(repoSchema),
  });

  const onSubmit = async ({ repoUrl }: RepoFormData) => {
    setRepoUrl(repoUrl);

    const owner = repoUrl.split('/')[3];
    const repoName = repoUrl.split('/')[4];
    const repoId = `${owner}/${repoName}`;

    const savedIssues = getIssues(repoId);
    if (savedIssues) {
      return;
    }

    const issues = await fetchIssues(owner, repoName);

    setRepos({
      id: repoId,
      name: repoName,
      owner,
      issues,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mb={4} gap={4} align="center">
        <Field invalid={!!errors.repoUrl}>
          <Input
            {...register('repoUrl')}
            placeholder="Enter GitHub repo URL"
            defaultValue={savedRepoUrl || ''}
            rounded="md"
          />
        </Field>
        <Button type="submit" bg="blue.600" loading={isSubmitting} rounded="md">
          Load Issues
        </Button>
      </Flex>

      {errors.repoUrl && <Text color="red.500">{errors.repoUrl.message}</Text>}
    </form>
  );
};

export default InputForm;
