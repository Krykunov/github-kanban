import { Container, SimpleGrid } from '@chakra-ui/react';

import { Status } from '@/types/issue';
import Column from '@/components/Column';
import { groupIssues } from '@/utils/groupIssues';
import InputForm from '@/components/InputForm';
import { useIssuesStore } from '@/store/issues';
import { useRepoStore } from '@/store/repo';
import Profile from './Profile';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import { useEffect, useState } from 'react';

const IssuesBoard = () => {
  const { getIssues, updateIssues } = useIssuesStore();
  const { currentRepoUrl } = useRepoStore();

  const repoId = currentRepoUrl?.split('/').slice(-2).join('/') || '';
  const issues = getIssues(repoId) || [];

  const groupedIssues = groupIssues(issues);

  const [items, setItems] = useState(groupedIssues);
  useEffect(() => {
    const allIssues = Object.values(items).flat();
    updateIssues(repoId, allIssues);
  }, [items, repoId, updateIssues, currentRepoUrl]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        // const activeItem = event.operation.source?.id;
        // const targetColumnState = event.operation.target?.data.state;
        // console.log(event.operation.source?.id);
        // console.log(event.operation.target?.data.state);
        // console.log(activeItem, targetColumnState);
        console.log(items);
        setItems((items) => move(items, event));
      }}
      // onDragEnd={(event) => {}}
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
