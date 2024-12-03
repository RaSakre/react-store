import { useSelector, useDispatch } from "src/utils/store";
import { OrderItem } from "./Orders/OrderItem";
import { useEffect } from "react";
import { fetchUserOrders, IResponse } from "src/slice/ordersSlice";
import styles from "./Profile.module.css";

type TOrder = {
  orders: IResponse[];
};

const ProfileUI = (props: TOrder) => {
  return (
    <div className={styles.profilePage}>
      {props.orders.length === 0 ? (
        <div>
          <p>У вас нет заказов</p>
        </div>
      ) : (
        props.orders.map((order: any) => (
          <div key={order.id}>
            <h3>Заказ #{order.id}</h3>
            <h4>Товары:</h4>
            <ul className={styles.profileOrder}>
              {order.data?.items?.map((item: any, index: number) => (
                <OrderItem
                  key={index}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                />
              )) || <p>Нет товаров в заказе</p>}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.userOrders) || [];

  return <ProfileUI orders={orders} />;
};
