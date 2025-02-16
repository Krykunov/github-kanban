import { Container, SimpleGrid } from '@chakra-ui/react';
import { Status } from '@/types/issue';
import Column from '@/components/Column';
import { useIssueStore } from '@/store/issues';
import { normalizeIssues } from '@/utils/normalizeIssues';
import InputForm from '@/components/InputForm';

const IssuesBoard = () => {
  const { issues } = useIssueStore();
  const categorizedIssues = normalizeIssues(issues);

  return (
    <Container fluid py={8}>
      <InputForm />
      <SimpleGrid columns={3} gap={4}>
        {Object.entries(categorizedIssues).map(([state, issues]) => (
          <Column key={state} state={state as Status} issues={issues} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default IssuesBoard;
