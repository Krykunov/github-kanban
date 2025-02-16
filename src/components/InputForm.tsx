import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useCallback } from 'react';
import { useGithubIssues } from '@/hooks/useGithubIssues';
import { useIssueStore } from '@/store/issues';
import { useRepoStore } from '@/store/repo';

const repoSchema = z.object({
  repoUrl: z
    .string()
    .min(1, 'Repository URL is required')
    .regex(
      /^https?:\/\/github\.com\/([^/]+)\/([^/]+)$/,
      'Invalid GitHub repository URL',
    ),
});

type RepoFormData = z.infer<typeof repoSchema>;

const InputForm = () => {
  const { repoUrl, setRepoUrl } = useRepoStore();
  const { setIssues } = useIssueStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RepoFormData>({
    resolver: zodResolver(repoSchema),
    defaultValues: { repoUrl: repoUrl || '' },
  });

  const { data: fetchedIssues, refetch } = useGithubIssues(repoUrl ?? '');

  const onSubmit = useCallback(
    ({ repoUrl }: RepoFormData) => {
      setRepoUrl(repoUrl);
      refetch();
    },
    [refetch, setRepoUrl],
  );

  useEffect(() => {
    if (fetchedIssues) setIssues(fetchedIssues);
  }, [fetchedIssues, setIssues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mb={4} gap={4} align="center">
        <Field invalid={!!errors.repoUrl}>
          <Input
            {...register('repoUrl')}
            placeholder="Enter GitHub repo URL"
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
