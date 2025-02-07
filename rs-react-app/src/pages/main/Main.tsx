import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { List } from '../../components/list/List';
import { Pagination } from '../../components/pagination/Pagination';
import { Search } from '../../components/search/Search';
import { ItemListModel } from '../../types/itemListModel';

import styles from './main.module.css';

export const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    navigate(`/main/?page=1&search=${trimmedTerm}`);
    fetchResults(searchTerm, currentPage);
  };

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/main/?page=${newPage}`);
    fetchResults(searchTerm, currentPage);
  };

  useEffect(() => {
    fetchResults(searchTerm, currentPage);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <Search
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <List results={results} />
          <Pagination changePage={changePage} currentPage={currentPage} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
