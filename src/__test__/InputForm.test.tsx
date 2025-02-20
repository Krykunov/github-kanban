/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider, createSystem, defineConfig } from '@chakra-ui/react';

import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import InputForm from '@/components/InputForm';
import { useRepo } from '@/hooks/useRepo';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(config);

vi.mock('@/hooks/useRepo', () => ({
  useRepo: vi.fn(),
}));

describe('InputForm Component', () => {
  let mockUseRepo: any;

  beforeEach(() => {
    vi.resetAllMocks();

    mockUseRepo = {
      value: '',
      setValue: vi.fn(),
      onSubmit: vi.fn(),
      randomRepoHandler: vi.fn(),
      resetForm: vi.fn(),
      isDisabled: false,
      setIsDisabled: vi.fn(),
    };

    (useRepo as Mock).mockReturnValue(mockUseRepo);
  });

  interface RenderWithChakra {
    (ui: React.ReactElement): ReturnType<typeof render>;
  }

  const renderWithChakra: RenderWithChakra = (ui) =>
    render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

  it('renders input field and buttons', () => {
    renderWithChakra(<InputForm />);

    expect(
      screen.getByPlaceholderText('Enter GitHub repo URL'),
    ).toBeInTheDocument();

    expect(screen.getByText('Load Issues')).toBeInTheDocument();
    expect(screen.getByText("I'm lazy, find random repo")).toBeInTheDocument();
  });

  it('shows validation error for invalid URL', async () => {
    renderWithChakra(<InputForm />);
    const input = screen.getByPlaceholderText('Enter GitHub repo URL');
    const submitButton = screen.getByText('Load Issues');

    await userEvent.clear(input);
    await userEvent.type(input, 'invalid-url'); // Type invalid URL
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          (content) =>
            content.includes('Invalid GitHub repository URL') ||
            content.includes('Repository URL is required'),
        ),
      ).toBeInTheDocument();
    });
  });

  it('calls resetForm when clicking the reset button', async () => {
    renderWithChakra(<InputForm />);

    const resetButton = screen.getByRole('button', { name: '' });

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(useRepo().resetForm).toHaveBeenCalled();
    });
  });

  it('calls randomRepoHandler when clicking the "Find Random Repo" button', async () => {
    renderWithChakra(<InputForm />);
    const randomRepoButton = screen.getByText("I'm lazy, find random repo");

    fireEvent.click(randomRepoButton);

    expect(mockUseRepo.randomRepoHandler).toHaveBeenCalled();
  });
});
