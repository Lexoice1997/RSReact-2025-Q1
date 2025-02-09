import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ItemListModel } from '../types/itemListModel';

export const useResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ItemListModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(urlParams.get('page')) || 1
  );

  const fetchResults = (term: string, page: number) => {
    setLoading(true);
    setError(null);
    const query = term
      ? `?search=${term}&offset=${page}&limit=10`
      : `?offset=${page}&limit=10`;

    axios
      .get(`https://pokeapi.co/api/v2/pokemon${query}`)
      .then((response) => {
        setResults(response.data?.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    setCurrentPage(1);
    navigate(`?page=1&search=${trimmedTerm}`);
    fetchResults(searchTerm, currentPage);
  };

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`?page=${newPage}`);
    fetchResults(searchTerm, currentPage);
  };

  useEffect(() => {
    fetchResults(searchTerm, currentPage);
  }, []);

  return {
    results,
    loading,
    error,
    searchTerm,
    currentPage,
    handleSearch,
    handleSearchChange,
    changePage,
  };
};
