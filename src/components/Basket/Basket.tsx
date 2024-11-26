import { BasketProduct } from "./BasketProduct";
import { useSelector, useDispatch } from "src/utils/store";
import styles from "./Basket.module.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import success from "../../images/SuccessPurchase/success.svg";
import { addOrder, orderThunk } from "src/slice/ordersSlice";

export const Basket = () => {
  const basket = useSelector((state) => state.webStore.basketProducts);
  const dispatch = useDispatch();
  const newOrder = {
    id: Date.now(), // Уникальный идентификатор заказа
    items: basket, // Массив товаров из корзины
    createdAt: new Date().toLocaleDateString() + new Date().toLocaleTimeString(), // Дата создания
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalAndOrder = () => {
    dispatch(addOrder(newOrder));
		dispatch(orderThunk(newOrder));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isAuth = useSelector((state) => state.auth.isAuth);
  const calculateTotalPrice = () => {
    return basket.reduce((total, product) => {
      const price = parseFloat(product.price.replace("$", ""));
      return total + price;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className={styles.basketSection}>
      <div className={styles.basketWrapper}>
        {basket.map((el) => (
          <BasketProduct
            key={el.id}
            id={el.id}
            image={el.image}
            description={el.description}
            price={el.price}
          />
        ))}
      </div>
      <div className={styles.basketPrice}>
        <p>Стоимость товаров: ${totalPrice}$</p>
        <button
          disabled={!isAuth}
          className={styles.basketBuy}
          onClick={handleModalAndOrder}
        >
          Купить
        </button>
        <p>{!isAuth ? "Войдите, чтобы оформить заказ" : ""}</p>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2>Поздравляем с успешной покупкой!</h2>
          <img className={styles.modalImage} src={success} alt="" />
          <button onClick={handleCloseModal}>Закрыть</button>
        </Modal>
      )}
    </div>
  );
};
