import styles from './pagination.module.css';

type Props = {
  changePage: (newPage: number) => void;
  currentPage: number;
};

export const Pagination = ({ changePage, currentPage }: Props) => {
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
