import { useSelector, useDispatch } from "src/utils/store"
import { OrderItem } from "./Orders/OrderItem"
import { useEffect } from "react"
import { fetchUserOrders } from "src/slice/ordersSlice"

import React, { ErrorInfo } from "react";

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log('Возникла ошибка!', error, info);
    }

    render() {
        if (this.state.hasError) {
            // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
            return (
                <section>
                    <h1>Что-то пошло не так :</h1>
                    <p>
                        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                    </p>
                </section>
            );
        }
        // если всё работает штатно, рендерим дочерние компоненты
        return this.props.children;
    }
}

export const Profile = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchUserOrders())
	},[dispatch])

	const orders = useSelector(state => state.orders.userOrders)
	return (
		<ErrorBoundary>
		<div>
		{orders.map(order => (
			<div key={order.id}>
				<h3>Заказ #{order.id}</h3>
				<h4>Товары:</h4>
				<ul>
					{order.data.items.map((item, index) => (
						<OrderItem key={index} image={item.image} description={item.description} price={item.price} /> 
					))}
				</ul>
			</div>
		))}
	</div>
	</ErrorBoundary>
	)
}