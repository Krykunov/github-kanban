import { Container, SimpleGrid } from '@chakra-ui/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import { Status } from '@/types/issue';
import Column from '@/components/Column';
import { groupIssues } from '@/utils/groupIssues';
import InputForm from '@/components/InputForm';
import { useIssuesStore } from '@/store/issues';
import { useRepoStore } from '@/store/repo';
import Profile from './Profile';

const IssuesBoard = () => {
  const { getIssues, updateIssues } = useIssuesStore();
  const { currentRepoUrl } = useRepoStore();

  const repoId = currentRepoUrl?.split('/').slice(-2).join('/') || '';
  const issues = getIssues(repoId) || [];

  const groupedIssues = groupIssues(issues);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !repoId) return;

    const issueId = Number(active.id);
    const newStatus = over.id as Status;

    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    if (issue.state !== newStatus) {
      const updatedIssues = issues.map((i) =>
        i.id === issueId ? { ...i, state: newStatus } : i,
      );
      updateIssues(repoId, updatedIssues);
    } else {
      // TODO: Handle reordering
      return null;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Container maxW="container.lg" py={8}>
        <InputForm />
        <Profile />
        <SimpleGrid columns={3} gap={4}>
          {Object.entries(groupedIssues).map(([state, issues]) => (
            <Column key={state} state={state as Status} issues={issues} />
          ))}
        </SimpleGrid>
      </Container>
    </DndContext>
  );
};

export default IssuesBoard;
