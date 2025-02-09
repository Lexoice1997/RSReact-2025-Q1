import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useResults } from '../../hooks/useResults';
import { List } from './List';

vi.mock('../../hooks/useResults.ts');

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('List component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the correct number of list items', () => {
    (useResults as vi.Mock).mockReturnValue({
      results: [
        { name: 'bulbasaur', description: 'A grass-type Pokemon' },
        { name: 'charmander', description: 'A fire-type Pokemon' },
      ],
    });

    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  test('should display a message when no results are found', () => {
    (useResults as vi.Mock).mockReturnValue({ results: [] });

    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );

    expect(screen.getAllByText('No items found'));
  });
});
