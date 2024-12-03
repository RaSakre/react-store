import { ICloth } from "src/slice/storeSlice";
import styles from './Basket.module.css'
import { BasketProduct } from "./BasketProduct";
import { Modal } from "../Modal/Modal";
import success from "../../images/SuccessPurchase/success.svg";

type Props = {
	basket:  ICloth[];
	totalPrice: number;
	isAuth: boolean;
	handleCloseModal: () => void;
	handleModalAndOrder: () => void;
	isModalOpen: boolean;
}

export const BasketUI = ({basket, totalPrice, isAuth, handleCloseModal, handleModalAndOrder, isModalOpen}:Props) => {
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
        <p>Стоимость товаров: {totalPrice}$</p>
        <button
          disabled={!isAuth || basket.length === 0}
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
	)
}