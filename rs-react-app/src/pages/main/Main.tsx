import { Outlet, useNavigate } from 'react-router-dom';

import { List } from '../../components/list/List';
import { Pagination } from '../../components/pagination/Pagination';
import { Search } from '../../components/search/Search';
import { useResults } from '../../hooks/useResults';

import styles from './main.module.css';

export const MainPage = () => {
  const navigate = useNavigate();
  const { loading, error } = useResults();

  const onMainPage = () => {
    navigate('/');
  };

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <Search />
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <h3 onClick={onMainPage}>Main page</h3>
          <List />
          <Pagination />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
