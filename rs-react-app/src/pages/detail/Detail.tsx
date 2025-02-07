import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItemListModel } from '../../types/itemListModel';

export const DetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<ItemListModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div>
      <h3>{item?.name}</h3>
      <p>{item?.description}</p>
    </div>
  );
};
