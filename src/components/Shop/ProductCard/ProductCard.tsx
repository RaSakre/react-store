import { NavLink } from 'react-router-dom'
import styles from './ProductCard.module.css'
import { useSelector, useDispatch } from 'src/utils/store'
import { fetchBasket } from 'src/slice/storeSlice'

export const ProductCard = (props:any) => {
	const dispatch = useDispatch();
	const handleAddToBasket = () => {
		fetch('http://localhost:3001/basket', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: props.id,
				description: props.description,
				price: props.price,
				image: props.image
			})
		})
		.then(() => {
			// После успешного добавления товара в корзину, обновляем состояние корзины
			dispatch(fetchBasket());
		})
		.catch(error => {
			console.error('Ошибка при добавлении товара в корзину:', error);
		});
	};
	return (
		<div className={styles.productCard}>
			<NavLink to={`/shop/${props.id}`}><img className={styles.productImage} src={props.image} alt="" /></NavLink>
			<p>{props.description}</p>
			<p>{props.price}</p>
			<button onClick={handleAddToBasket} className={styles.productButton}>Добавить в корзину</button>
		</div>
	)
}