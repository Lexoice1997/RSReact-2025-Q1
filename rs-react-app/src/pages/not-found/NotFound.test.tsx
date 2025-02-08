import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { NotFound } from './NotFound';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFound component', () => {
  test('calls navigate with -1 when "Go back" is clicked', () => {
    const mockNavigate = vi.fn();
    (vi.mocked(useNavigate) as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Go back/i));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
