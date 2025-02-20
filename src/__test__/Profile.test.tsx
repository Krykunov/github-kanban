import { render, screen } from '@testing-library/react';
import { ChakraProvider, createSystem, defineConfig } from '@chakra-ui/react';
import { vi } from 'vitest';
import Profile from '@/components/Profile';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(config);

vi.mock('@/store/repo', () => ({
  useRepoStore: vi.fn(() => ({
    repoInfo: {
      url: 'https://github.com/facebook/react',
      owner: 'facebook',
      name: 'react',
      stars: 172000,
    },
  })),
}));

describe('Profile Component', () => {
  interface RenderWithChakra {
    (ui: React.ReactElement): ReturnType<typeof render>;
  }

  const renderWithChakra: RenderWithChakra = (ui) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

  it('renders the repository owner and name correctly', () => {
    renderWithChakra(<Profile />);

    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /react/i })).toBeInTheDocument();
  });

  it('checks if the links have correct href attributes', () => {
    renderWithChakra(<Profile />);

    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute(
      'href',
      'https://github.com/facebook',
    );
    expect(screen.getByRole('link', { name: /react/i })).toHaveAttribute(
      'href',
      'https://github.com/facebook/react',
    );
  });
});
