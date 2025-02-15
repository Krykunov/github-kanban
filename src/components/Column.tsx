import { Issue, Status } from '@/types/issue';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import IssueCard from '@/components/IssueCard';

const Column = ({ state, issues }: { state: Status; issues: Issue[] }) => (
  <Box bg="gray.800" p={4} borderRadius="md">
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

export default Column;
