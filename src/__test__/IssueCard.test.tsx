import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defineConfig } from '@chakra-ui/react';
import { vi } from 'vitest';
import IssueCard from '@/components/IssueCard';
import { Issue } from '@/types/issue';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(config);

describe('IssueCard', () => {
  const mockIssue: Issue = {
    id: 12345,
    title: 'Fix broken layout',
    number: 101,
    created_at: '2024-02-10T12:34:56Z',
    state: 'open',
    user: 'test-user',
    comments: 3,
  };

  interface RenderWithChakra {
    (ui: React.ReactElement): ReturnType<typeof render>;
  }

  const renderWithChakra: RenderWithChakra = (ui) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

  it('renders the issue title', () => {
    renderWithChakra(<IssueCard issue={mockIssue} index={0} />);
    expect(screen.getByText('Fix broken layout')).toBeInTheDocument();
  });

  it('displays the issue number and creation date', () => {
    renderWithChakra(<IssueCard issue={mockIssue} index={0} />);
    expect(screen.getByText('#101 opened Sat Feb 10 2024')).toBeInTheDocument();
  });

  it('shows the issue ID', () => {
    renderWithChakra(<IssueCard issue={mockIssue} index={0} />);
    expect(screen.getByText('12345')).toBeInTheDocument();
  });

  it('displays the issue state', () => {
    renderWithChakra(<IssueCard issue={mockIssue} index={0} />);
    expect(screen.getByText('open')).toBeInTheDocument();
  });

  it('renders the user and comments count', () => {
    renderWithChakra(<IssueCard issue={mockIssue} index={0} />);
    expect(screen.getByText('test-user | Comments: 3')).toBeInTheDocument();
  });

  it('applies correct styles when dragging', () => {
    vi.mock('@dnd-kit/react/sortable', () => ({
      useSortable: () => ({
        ref: vi.fn(),
        isDragging: true,
      }),
    }));

    const { container } = renderWithChakra(
      <IssueCard issue={mockIssue} index={0} />,
    );
    expect(container.firstChild).toHaveAttribute('data-dragging', 'true');
  });
});
