import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import { Status, Issue } from '@/types/issue';
import IssueCard from '@/components/IssueCard';

const Column = ({ state, issues }: { state: Status; issues: Issue[] }) => {
  const { setNodeRef, isOver } = useDroppable({ id: state });

  return (
    <Box
      ref={setNodeRef}
      bg={isOver ? 'gray.700' : 'gray.800'}
      p={4}
      borderRadius="md"
    >
      <Heading size="md" mb={2} textAlign="center">
        {state}
      </Heading>
      <VStack align="stretch">
        {issues.length > 0 ?
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        : <Text textAlign="center" fontSize="sm" color="gray.600">
            No issues
          </Text>
        }
      </VStack>
    </Box>
  );
};
export default Column;
