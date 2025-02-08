import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { useResults } from '../hooks/useResults';

vi.mock('axios');

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: () => ({ search: '?page=2&search=pikachu' }),
  };
});

describe('useResults hook', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch results and update state', async () => {
    const mockData = {
      data: { results: [{ name: 'bulbasaur' }, { name: 'charmander' }] },
    };
    (axios.get as vi.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useResults(), {
      wrapper: BrowserRouter,
    });

    await waitFor(() => {
      expect(result.current.results).toEqual(mockData.data.results);
      expect(result.current.loading).toBe(false);
    });
  });

  test('should handle errors when fetching data', async () => {
    (axios.get as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useResults(), {
      wrapper: BrowserRouter,
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch');
      expect(result.current.loading).toBe(false);
    });
  });
});
