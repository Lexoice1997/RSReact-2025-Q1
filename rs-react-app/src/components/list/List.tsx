import { useNavigate } from 'react-router-dom';

import { ItemListModel } from '../../types/itemListModel';

import styles from './list.module.css';

type Props = {
  results: ItemListModel[];
};

export const List = ({ results }: Props) => {
  const navigate = useNavigate();

  const selectItem = (name: string) => {
    navigate(`/main/${name}`);
  };

  return (
    <ul className={styles.list}>
      {results?.map((item) => (
        <li key={item.name} onClick={() => selectItem(item.name)}>
          <strong>{item.name}</strong>: {item.description}
        </li>
      ))}
    </ul>
  );
};
