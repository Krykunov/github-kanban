import { Box, Text } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import { Issue } from '@/types/issue';

const IssueCard = ({ issue }: { issue: Issue }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id.toString(),
  });

  const style =
    transform ?
      {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      p={3}
      bg="blue.800"
      borderRadius="md"
      boxShadow="sm"
    >
      <Text fontWeight="bold">{issue.title}</Text>
      <Text fontSize="sm">
        #{issue.number} opened {new Date(issue.created_at).toDateString()}
      </Text>
      <Text fontSize="sm">{issue.state}</Text>
      <Text fontSize="sm">
        {issue.user} | Comments: {issue.comments}
      </Text>
    </Box>
  );
};

export default IssueCard;
