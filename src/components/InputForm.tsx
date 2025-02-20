import { Button, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';
import { IoCloseOutline } from 'react-icons/io5';

import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRepo } from '@/hooks/useRepo';

const repoSchema = z.object({
  repoUrl: z
    .string()
    .min(1, 'Repository URL is required')
    .regex(
      /^https:\/\/github\.com\/([^/]+)\/([^/]+)$/,
      'Invalid GitHub repository URL',
    ),
});

export type RepoFormData = z.infer<typeof repoSchema>;

const InputForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RepoFormData>({
    resolver: zodResolver(repoSchema),
  });

  const {
    value,
    setValue,
    onSubmit,
    randomRepoHandler,
    resetForm,
    isDisabled,
    setIsDisabled,
  } = useRepo();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap={4} align="center" mb="4">
        <Field invalid={!!errors.repoUrl}>
          <Input
            {...register('repoUrl')}
            placeholder="Enter GitHub repo URL"
            value={value}
            rounded="md"
            onChange={(e) => {
              setIsDisabled(false);
              setValue(e.target.value);
            }}
          />
        </Field>
        <IconButton bg="red.500" type="reset" rounded="md" onClick={resetForm}>
          <IoCloseOutline />
        </IconButton>
        <Button
          type="submit"
          bg="blue.600"
          loading={isSubmitting}
          rounded="md"
          disabled={isDisabled}
        >
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
