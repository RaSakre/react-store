type Props = {
	key: number,
	image: string,
	description: string,
	price: number

}

export const OrderItem = ({ image, description, price}:Props) => {
	return (
		<div >
			<li>
				<img src={image} alt="" />
				{description} - {price}₽
			</li>
	</div>

	)
}