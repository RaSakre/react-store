import { useSelector, useDispatch } from "src/utils/store";
import { useState } from "react";
import { BasketUI } from "./BasketUI";
import { orderThunk } from "src/slice/ordersSlice";
import { fetchBasket } from "src/slice/storeSlice";

export const Basket = () => {
  const basket = useSelector((state) => state.webStore.basketProducts);
  const dispatch = useDispatch();
  const newOrder = {
    items: basket,
    createdAt:
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(), // Дата создания
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalAndOrder = () => {
    dispatch(orderThunk(newOrder));
    setIsModalOpen(true);
  };
  const handleCloseModal = async () => {
    setIsModalOpen(false);
    try {
      const response = await fetch("http://localhost:3001/basket");
      const basketItems = await response.json();
      await Promise.all(
        basketItems.map((item: { id: string }) =>
          fetch(`http://localhost:3001/basket/${item.id}`, {
            method: "DELETE",
          })
        )
      );
      dispatch(fetchBasket());
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error);
    }
  };
  const isAuth = useSelector((state) => state.auth.isAuth);
  const calculateTotalPrice = () => {
    return basket.reduce((total, product) => {
      const price = parseFloat(product.price.replace("$", ""));
      return Math.ceil(total + price);
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <BasketUI
      basket={basket}
      isAuth={isAuth}
      handleCloseModal={handleCloseModal}
      handleModalAndOrder={handleModalAndOrder}
      isModalOpen={isModalOpen}
      totalPrice={totalPrice}
    />
  );
};
