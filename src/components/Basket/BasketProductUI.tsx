import styles from './Basket.module.css'
import deleteIcon from '../../images/BasketProduct/delete.svg'

interface Props {
	id: string,
	image: string
	description: string
	price: string
	handleDeleteItem: () => void

}

export const BasketProductUI = ({image, description, price, handleDeleteItem}:Props) => {
	return (
		<div className={styles.basketProduct}>
		<img className={styles.basketImage} src={image} alt="" />
		<div className={styles.basketText}>
			<p>{description}</p>
			<p>{price}</p>
		</div>
		<button onClick={handleDeleteItem}>
			<img className={styles.deleteIcon} src={deleteIcon} alt="" />
		</button>
	</div>
	)
}