import { Container, SimpleGrid } from '@chakra-ui/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Status } from '@/types/issue';
import Column from '@/components/Column';
import { groupIssues } from '@/utils/groupIssues';
import InputForm from '@/components/InputForm';
import { useIssuesStore } from '@/store/issues';
import { useRepoStore } from '@/store/repo';

const IssuesBoard = () => {
  const { getIssues, updateIssues } = useIssuesStore();
  const { savedRepoUrl } = useRepoStore();

  const repoId = savedRepoUrl?.split('/').slice(-2).join('/') || '';
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
      const columnIssues = [...groupedIssues[newStatus]];
      const oldIndex = columnIssues.findIndex((i) => i.id === issueId);
      // console.log(oldIndex);
      const newIndex = columnIssues.findIndex(
        (i) => i.id.toString() === over.id.toString(),
      );
      console.log(over);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newOrder = arrayMove(columnIssues, oldIndex, newIndex);

        const updatedIssues = issues.map(
          (i) => newOrder.find((ni) => ni.id === i.id) || i,
        );

        updateIssues(repoId, updatedIssues);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Container maxW="container.lg" py={8}>
        <InputForm />
        <SimpleGrid columns={3} gap={4}>
          {Object.entries(groupedIssues).map(([state, issues]) => (
            <SortableContext
              key={state}
              items={issues.map((i) => i.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              <Column state={state as Status} issues={issues} />
            </SortableContext>
          ))}
        </SimpleGrid>
      </Container>
    </DndContext>
  );
};

export default IssuesBoard;
