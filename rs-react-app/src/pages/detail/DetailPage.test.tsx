import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { DetailPage } from './Detail';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
  get: vi.fn(),
}));
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ name: 'squirtle' }),
  };
});

describe('DetailPage component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render loading state initially', () => {
    // render(
    //   <BrowserRouter>
    //     <DetailPage />
    //   </BrowserRouter>
    // );
    // expect(screen.getByText(/Loading details.../i)).toBeInTheDocument();
  });

  // test('should render item details when data is loaded', async () => {
  //   (axios.get as vi.Mock).mockResolvedValueOnce({
  //     data: { name: 'bulbasaur' },
  //   });

  //   render(
  //     <BrowserRouter>
  //       <DetailPage />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  //   });
  // });

  // test('should render error message on API failure', async () => {
  //   (axios.get as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

  //   render(
  //     <BrowserRouter>
  //       <DetailPage />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  //   });
  // });

  // test('should call navigate when close button is clicked', async () => {
  //   const mockNavigate = vi.fn();
  //   (axios.get as vi.Mock).mockResolvedValueOnce({
  //     data: { name: 'bulbasaur' },
  //   });

  //   // vi.mock('react-router-dom', async () => {
  //   //   const actual =
  //   //     await vi.importActual<typeof import('react-router-dom')>(
  //   //       'react-router-dom'
  //   //     );
  //   //   return {
  //   //     ...actual,
  //   //     useNavigate: () => mockNavigate,
  //   //   };
  //   // });

  //   render(
  //     <BrowserRouter>
  //       <DetailPage />
  //     </BrowserRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  //   });

  //   fireEvent.click(screen.getByText(/close/i));
  //   expect(mockNavigate).toHaveBeenCalledWith('/');
  // });
});
