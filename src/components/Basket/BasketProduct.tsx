import { BasketProductUI } from './BasketProductUI'
import { useDispatch } from 'src/utils/store'
import { fetchBasket } from 'src/slice/storeSlice'

type Props = {
	id: string
	description: string
	price: string
	image: string
}

export const BasketProduct = (props:Props) => {
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
		<BasketProductUI
		id={props.id}
		description={props.description}
		price={props.price}
		handleDeleteItem={handleDeleteItem}
		image={props.image}
		/>
	)
}