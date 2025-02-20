import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChakraProvider, createSystem, defineConfig } from '@chakra-ui/react';

import Column from '@/components/Column';
import { Status, Issue } from '@/types/issue';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(config);

vi.mock('@dnd-kit/react', () => ({
  useDroppable: vi.fn(() => ({
    isDropTarget: false,
    ref: vi.fn(),
  })),
}));

describe('Column Component', () => {
  const mockIssues: Issue[] = [
    {
      id: 1,
      title: 'Fix login bug',
      number: 101,
      created_at: '2024-02-10T12:34:56Z',
      state: 'open',
      user: 'dev-user',
      comments: 5,
    },
    {
      id: 2,
      title: 'Improve UI performance',
      number: 102,
      created_at: '2024-02-11T08:30:00Z',
      state: 'open',
      user: 'frontend-guy',
      comments: 2,
    },
  ];

  interface RenderWithChakra {
    (ui: React.ReactElement): ReturnType<typeof render>;
  }

  const renderWithChakra: RenderWithChakra = (ui) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the column with a title', () => {
    renderWithChakra(<Column state={Status.open} issues={mockIssues} />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('renders issues correctly', () => {
    renderWithChakra(<Column state={Status.open} issues={mockIssues} />);

    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.getByText('Improve UI performance')).toBeInTheDocument();
  });

  it('displays "No issues" when the column is empty', () => {
    renderWithChakra(<Column state={Status.closed} issues={[]} />);
    expect(screen.getByText('No issues')).toBeInTheDocument();
  });

  it('does not display "No issues" when there are issues', () => {
    renderWithChakra(<Column state={Status.open} issues={mockIssues} />);
    expect(screen.queryByText('No issues')).not.toBeInTheDocument();
  });

  it('changes background color when the column is a drop target', () => {
    vi.mock('@dnd-kit/react', () => ({
      useDroppable: vi.fn(() => ({
        isDropTarget: true,
        ref: vi.fn(),
      })),
    }));

    const { container } = renderWithChakra(
      <Column state={Status.open} issues={mockIssues} />,
    );

    expect(container.firstChild).toHaveStyle({ backgroundColor: 'gray.700' });
  });
});
