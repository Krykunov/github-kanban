import { Button, Container, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import { groupBy } from 'lodash';
import { IssuesBystate, Status } from '@/types/issue';
import Column from '@/components/Column';
import { useState } from 'react';
import { useGithubIssues } from '@/hooks/useGithubIssues';

const IssuesBoard = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [currentRepo, setCurrentRepo] = useState('');

  const {
    data: issues,

    refetch,
  } = useGithubIssues(currentRepo);

  const handleLoadIssues = () => {
    console.log('handleLoadIssues');
    setCurrentRepo(repoUrl);
    refetch();
  };

  const categorizedIssues: IssuesBystate = Object.fromEntries(
    Object.values(Status).map((state) => [
      state,
      groupBy(issues || [], 'state')[state] ?? [],
    ]),
  ) as IssuesBystate;
  console.log('IssuesBoard', { categorizedIssues });

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
