import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { Pagination } from './Pagination';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: () => ({ search: '?page=1' }),
  };
});

describe('Pagination component', () => {
  test('updates URL query parameter when page changes', () => {
    const mockNavigate = vi.fn();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(mockNavigate).toHaveBeenCalledWith('?page=2');
  });
});
