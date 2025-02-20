import { Container, SimpleGrid } from '@chakra-ui/react';
import { IssuesByStatus, Status } from '@/types/issue';
import Column from '@/components/Column';
import InputForm from '@/components/InputForm';
import { useIssuesStore } from '@/store/issues';
import { useRepoStore } from '@/store/repo';
import Profile from './Profile';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { useEffect, useState } from 'react';

const IssuesBoard = () => {
  const { getIssues, updateIssues } = useIssuesStore();
  const { currentRepoUrl, currentRepoName } = useRepoStore();

  const repoId = currentRepoUrl?.split('/').slice(-2).join('/') || '';

  const [items, setItems] = useState<IssuesByStatus>(
    getIssues(repoId) || ({} as IssuesByStatus),
  );

  useEffect(() => {
    setItems(getIssues(repoId) || ({} as IssuesByStatus));
  }, [currentRepoUrl, getIssues, repoId, currentRepoName]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
      onDragEnd={() => {
        updateIssues(repoId, items);
      }}
    >
      <Container maxW="container.lg" py={8}>
        <InputForm />
        <Profile />
        <SimpleGrid columns={3} gap={4}>
          {Object.entries(items).map(([state, issues]) => (
            <Column key={state} state={state as Status} issues={issues} />
          ))}
        </SimpleGrid>
      </Container>
    </DragDropProvider>
  );
};

export default IssuesBoard;
