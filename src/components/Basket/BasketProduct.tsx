import styles from './Basket.module.css'
import deleteIcon from '../../images/BasketProduct/delete.svg'
import { useDispatch } from 'src/utils/store'
import { fetchBasket } from 'src/slice/storeSlice'

export const BasketProduct = (props:any) => {
	const dispatch = useDispatch()
	const handleDeleteItem = () => {
		fetch(`http://localhost:3001/basket/${props.id}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
			}
		}).then(() => {
			dispatch(fetchBasket());
		})
	}
	return (
		<div className={styles.basketProduct}>
			<img className={styles.basketImage} src={props.image} alt="" />
			<div className={styles.basketText}>
				<p>{props.description}</p>
				<p>{props.price}</p>
			</div>
			<button onClick={handleDeleteItem}>
				<img className={styles.deleteIcon} src={deleteIcon} alt="" />
			</button>
		</div>
	)
}