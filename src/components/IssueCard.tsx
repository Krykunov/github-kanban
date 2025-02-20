import { Box, Text } from '@chakra-ui/react';
import { Issue } from '@/types/issue';
import { useSortable } from '@dnd-kit/react/sortable';

const IssueCard = ({ issue, index }: { issue: Issue; index: number }) => {
  const { ref, isDragging } = useSortable({
    id: issue.id,
    index: index,
    type: 'item',
    accept: 'item',
    group: issue.state,
  });

  return (
    <Box
      ref={ref}
      data-dragging={isDragging}
      p={3}
      bg="blue.800"
      borderRadius="md"
      boxShadow="sm"
    >
      <Text fontWeight="bold">{issue.title}</Text>
      <Text fontSize="sm">
        #{issue.number} opened {new Date(issue.created_at).toDateString()}
      </Text>
      <Text fontSize="md">{issue.id}</Text>
      <Text fontSize="sm">{issue.state}</Text>
      <Text fontSize="sm">
        {issue.user} | Comments: {issue.comments}
      </Text>
    </Box>
  );
};

export default IssueCard;
