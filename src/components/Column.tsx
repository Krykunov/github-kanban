import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Status, Issue } from '@/types/issue';
import IssueCard from '@/components/IssueCard';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';

const Column = ({ state, issues }: { state: Status; issues: Issue[] }) => {
  const { isDropTarget, ref } = useDroppable({
    id: state,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
    data: { state },
  });

  return (
    <Box
      ref={ref}
      bg={isDropTarget ? 'gray.700' : 'gray.800'}
      p={4}
      borderRadius="md"
    >
      <Heading size="md" mb={2} textAlign="center">
        {state}
      </Heading>
      <VStack align="stretch">
        {issues.length > 0 ?
          issues.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))
        : <Text textAlign="center" fontSize="sm" color="gray.600">
            No issues
          </Text>
        }
      </VStack>
    </Box>
  );
};
export default Column;
