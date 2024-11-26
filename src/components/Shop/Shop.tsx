import { ProductCard } from "./ProductCard/ProductCard"
import { useSelector } from "src/utils/store"
import styles from './Shop.module.css'

export const Shop = () => {
	const clothes = useSelector(state => state.webStore.clothes)
	return (
		<div className={styles.shop}>
			{clothes.map(el => {
				return <ProductCard product={el} key={el.id} id={el.id} description={el.description} image={el.image} price={el.price} />
			})}
		</div>
	)
}