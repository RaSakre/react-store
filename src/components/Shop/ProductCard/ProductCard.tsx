import { useDispatch } from "src/utils/store";
import { fetchBasket, ICloth } from "src/slice/storeSlice";
import { ProductCardUI } from "./ProductCardUI";

type Props = {
  id: string;
  description: string;
  price: string;
  image: string;
  product: ICloth;
};

export const ProductCard = (props: Props) => {
  const dispatch = useDispatch();
  const handleAddToBasket = () => {
    fetch("http://localhost:3001/basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        description: props.description,
        price: props.price,
        image: props.image,
      }),
    })
      .then(() => {
        // После успешного добавления товара в корзину, обновляем состояние корзины
        dispatch(fetchBasket());
      })
      .catch((error) => {
        console.error("Ошибка при добавлении товара в корзину:", error);
      });
  };
  return (
    <ProductCardUI
      id={props.id}
      description={props.description}
      price={props.price}
      image={props.image}
      handleAddToBasket={handleAddToBasket}
    />
  );
};
