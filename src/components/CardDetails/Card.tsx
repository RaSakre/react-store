import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/store';
import { CardUI } from './CardUI';

export const Card = () => {
  const { id } = useParams();
  const clothes = useSelector(state => state.webStore.clothes);
  
  const productId = Number(id) - 1;
  const product = clothes[productId];

  return (
		<CardUI product={product} />
  );
}