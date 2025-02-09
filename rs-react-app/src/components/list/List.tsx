import { useNavigate } from 'react-router-dom';

import { useResults } from '../../hooks/useResults';

import styles from './list.module.css';

export const List = () => {
  const navigate = useNavigate();
  const { results } = useResults();

  const selectItem = (name: string) => {
    navigate(`/${name}`);
  };

  return (
    <ul className={styles.list}>
      {results?.length > 0 ? (
        results?.map((item) => (
          <li key={item.name} onClick={() => selectItem(item.name)}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))
      ) : (
        <p>No items found</p>
      )}
    </ul>
  );
};
