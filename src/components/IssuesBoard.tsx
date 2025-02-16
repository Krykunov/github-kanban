import { Button, Container, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import { Status } from '@/types/issue';
import Column from '@/components/Column';
import { useEffect, useState } from 'react';
import { useGithubIssues } from '@/hooks/useGithubIssues';
import { useIssueStore } from '@/store/issues';
import { normalizeIssues } from '@/utils/normalizeIssues';

const IssuesBoard = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [currentRepo, setCurrentRepo] = useState('');
  const { issues, setIssues } = useIssueStore();

  const {
    data: fetchedIssues,

    refetch,
  } = useGithubIssues(currentRepo);

  useEffect(() => {
    if (fetchedIssues) setIssues(fetchedIssues);
  }, [fetchedIssues, setIssues]);

  const handleLoadIssues = () => {
    console.log('handleLoadIssues');
    setCurrentRepo(repoUrl);
    refetch();
  };

  const categorizedIssues = normalizeIssues(issues);

  return (
    <Container fluid py={8}>
      <Flex mb={4} align="center">
        <Input
          placeholder="Enter repo URL"
          mr={2}
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button bg="blue.600" onClick={handleLoadIssues}>
          Load issues
        </Button>
      </Flex>
      <SimpleGrid columns={3} gap={4}>
        {Object.entries(categorizedIssues).map(([state, issues]) => (
          <Column key={state} state={state as Status} issues={issues} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default IssuesBoard;
