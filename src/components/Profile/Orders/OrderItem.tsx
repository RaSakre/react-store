

export const OrderItem = (props:any) => {
	return (
		<div key={props.order}>
			<li>
				<img src={props.image} alt="" />
				{props.description} - {props.price}₽
			</li>
	</div>

	)
}