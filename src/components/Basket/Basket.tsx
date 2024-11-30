import { useSelector, useDispatch } from "src/utils/store";
import { useState } from "react";
import { BasketUI } from "./BasketUI";
import { orderThunk } from "src/slice/ordersSlice";

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
