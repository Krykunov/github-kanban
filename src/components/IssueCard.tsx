import { Issue } from '@/types/issue';
import { Box, Text } from '@chakra-ui/react';

const IssueCard = ({ issue }: { issue: Issue }) => (
  <Box p={3} bg="blue.800" borderRadius="md" boxShadow="sm">
    <Text fontWeight="bold">{issue.title}</Text>
    <Text fontSize="sm">
      #{issue.number} opened {new Date(issue.created_at).toDateString()}
    </Text>
    <Text fontSize="sm">
      {issue.user.login} | Comments: {issue.comments}
    </Text>
  </Box>
);

export default IssueCard;
