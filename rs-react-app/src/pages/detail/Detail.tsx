import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ItemListModel } from '../../types/itemListModel';

import styles from './detail.module.css';

export const DetailPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [item, setItem] = useState<ItemListModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onMainPage = () => {
    navigate('/');
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.detail}>
      <h3>{item?.name}</h3>
      <button onClick={onMainPage}>close</button>
    </div>
  );
};
