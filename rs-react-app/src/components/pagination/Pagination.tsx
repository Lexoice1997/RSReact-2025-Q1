import { useResults } from '../../hooks/useResults';

import styles from './pagination.module.css';

export const Pagination = () => {
  const { changePage, currentPage } = useResults();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span> Page {currentPage} </span>
      <button onClick={() => changePage(currentPage + 1)}>Next</button>
    </div>
  );
};
