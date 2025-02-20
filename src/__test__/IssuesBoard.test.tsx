import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import IssuesBoard from '@/components/IssuesBoard';
import { ChakraProvider, createSystem, defineConfig } from '@chakra-ui/react';

import { IssuesStore, useIssuesStore } from '@/store/issues';
import { RepoStore, useRepoStore } from '@/store/repo';

vi.mock('@/store/issues', () => ({
  useIssuesStore: vi.fn(),
}));

vi.mock('@/store/repo', () => ({
  useRepoStore: vi.fn(),
}));

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(config);

describe('IssuesBoard Component', () => {
  let mockUseIssuesStore: Partial<IssuesStore>;
  let mockUseRepoStore: Partial<RepoStore>;

  beforeEach(() => {
    vi.resetAllMocks();

    mockUseIssuesStore = {
      getIssues: vi.fn(() => ({
        open: [
          {
            id: 1,
            title: 'Fix login bug',
            number: 101,
            created_at: '2024-02-10T12:34:56Z',
            state: 'open' as const,
            user: 'dev-user',
            comments: 5,
          },
        ],
        inProgress: [],
        closed: [],
      })),
      updateIssues: vi.fn(),
    };

    mockUseRepoStore = {
      currentRepoUrl: 'https://github.com/user/repo',
      currentRepoName: 'repo',
    };

    (useIssuesStore as unknown as Mock).mockReturnValue(mockUseIssuesStore);
    (useRepoStore as unknown as Mock).mockReturnValue(mockUseRepoStore);
  });

  interface RenderWithChakra {
    (ui: React.ReactElement): ReturnType<typeof render>;
  }

  const renderWithChakra: RenderWithChakra = (ui) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

  it('renders issue columns correctly', async () => {
    renderWithChakra(<IssuesBoard />);

    expect(screen.getByText('open')).toBeInTheDocument();

    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
  });
});
