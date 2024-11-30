import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { ICloth } from 'src/slice/storeSlice'

interface Product {
	product: ICloth
}

export const CardUI = ({product}:Product) => {
	return (
		<div className={styles.detailsWrapper}>
		<Link className={styles.detailsButton} to={'/shop'}>	&larr; Назад в магазин</Link>
		{product ? ( 
			<div className={styles.productDetails}>
				<img className={styles.detailsImage} src={product.image} alt="" />
				<div className={styles.detailsTexts}>
					<p>{product.description}</p>
					<p>{product.price}</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae et, ipsum ut, voluptates aliquid nihil quis earum, incidunt deserunt fuga qui reiciendis rem ea veniam sunt exercitationem. Sequi, dolore quis?</p>
				</div>
			</div>
		) : (
			<p>Товар не найден</p> 
		)}
	</div>
	)
}