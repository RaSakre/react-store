import { NavLink } from "react-router-dom"
import styles from './ProductCard.module.css'

type Props = {
	id: string,
	image: string,
	description: string,
	price: string,
	handleAddToBasket: () => void,
}

export const ProductCardUI = ({id, image, description, price, handleAddToBasket}:Props) => {
	return (
		<div className={styles.productCard}>
			<NavLink to={`/shop/${id}`}><img className={styles.productImage} src={image} alt="" /></NavLink>
			<p>{description}</p>
			<p>{price}</p>
			<button onClick={handleAddToBasket} className={styles.productButton}>Добавить в корзину</button>
		</div>
	)
}