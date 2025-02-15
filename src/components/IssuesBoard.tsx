import { SimpleGrid } from '@chakra-ui/react';
import { groupBy } from 'lodash';
import { Issue, IssuesByStatus, Status } from '@/types/issue';
import Column from '@/components/Column';

const dummyIssues: Issue[] = [
  {
    id: 1,
    title: 'Fix bug',
    number: 101,
    created_at: '2023-01-01T00:00:00Z',
    user: { login: 'user1' },
    comments: 3,
    status: Status.ToDo,
  },
  {
    id: 2,
    title: 'Implement feature',
    number: 102,
    created_at: '2023-01-02T00:00:00Z',
    user: { login: 'user2' },
    comments: 5,
    status: Status.InProgress,
  },
  {
    id: 3,
    title: 'Refactor code',
    number: 103,
    created_at: '2023-01-03T00:00:00Z',
    user: { login: 'user3' },
    comments: 2,
    status: Status.Done,
  },
  {
    id: 4,
    title: 'Write tests',
    number: 104,
    created_at: '2023-01-04T00:00:00Z',
    user: { login: 'user4' },
    comments: 1,
    status: Status.ToDo,
  },
];
const categorizedIssues = groupBy(dummyIssues, 'status') as IssuesByStatus;

const IssuesBoard = () => {
  return (
    <SimpleGrid columns={3} gap={4}>
      {Object.entries(categorizedIssues).map(([status, issues]) => (
        <Column key={status} status={status as Status} issues={issues} />
      ))}
    </SimpleGrid>
  );
};

export default IssuesBoard;
